import assert from 'node:assert/strict';
import test from 'node:test';
import { createCampaign, draftCampaign, approveCampaign, approvedCampaign } from '../src/lib/campaign-pilot.mjs';

const brief = {
  id: 'cotizaciones-whatsapp',
  clientId: '3dev',
  offer: 'Página de cotización por WhatsApp por $5,900 MXN',
  audience: 'Negocios de servicios de distintos giros',
  zone: 'Puebla y Cholula',
  destination: 'WhatsApp Business de 3DEV por confirmar',
  budgetCents: 100000,
};
const ads = [
  { headline: 'Recibe solicitudes más completas', body: 'Pide servicio, zona y fecha en el primer mensaje.', creative: 'Conversación ilustrada con la etiqueta Ejemplo.', greeting: '¿Qué ofrece tu negocio?' },
  { headline: 'Página de cotización por $5,900 MXN', body: 'Muestra tus servicios y facilita la cotización por WhatsApp.', creative: 'Gráfica de la oferta con tres elementos del paquete.', greeting: '¿Cómo te piden cotización hoy?' },
];

test('un borrador requiere revisión y una revisión anterior no autoriza la nueva versión', async () => {
  const original = createCampaign(brief);
  assert.deepEqual(original.versions, []);
  const draft = await draftCampaign(original, async input => {
    assert.equal(input.budgetCents, 100000);
    return ads;
  });
  assert.throws(() => approvedCampaign(draft), /requiere revisión/);
  const first = approveCampaign(draft, { version: 1, reviewer: 'Marco', now: new Date(0) });
  assert.equal(approvedCampaign(first).approval.reviewer, 'Marco');
  const second = await draftCampaign(first, async () => ads);
  assert.throws(() => approveCampaign(second, { version: 1, reviewer: 'Marco' }), /última versión/);
  assert.throws(() => approvedCampaign(second), /requiere revisión/);
  assert.equal(second.versions[0].approval.reviewer, 'Marco');
});

test('rechaza presupuestos inválidos y anuncios duplicados', async () => {
  assert.throws(() => createCampaign({ ...brief, budgetCents: -1 }), /presupuesto/);
  await assert.rejects(draftCampaign(createCampaign(brief), async () => [ads[0], ads[0]]), /distintos/);
});
