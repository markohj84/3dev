import test from 'node:test';
import assert from 'node:assert/strict';
import { leadSummary, recordLeadEvent } from '../src/lib/campaign-leads.mjs';

test('sigue una consulta hasta el anticipo sin contar dinero antes de confirmar', () => {
  const campaign = { id: 'piloto', clientId: '3dev', versions: [{ number: 1, approval: { reviewer: 'Marco' } }] };
  const input = { clientId: '3dev', campaignId: 'piloto', leadId: 'prospecto-1', source: 'WhatsApp, anuncio A', version: 1, variant: 'A' };
  const first = recordLeadEvent(campaign, { ...input, stage: 'consulta' }, 'Marco');
  assert.equal(leadSummary(first).confirmedCents, 0);
  assert.equal(recordLeadEvent(first, { ...input, stage: 'consulta' }, 'Marco'), first);
  const qualified = recordLeadEvent(first, { ...input, stage: 'calificado' }, 'Marco');
  const proposal = recordLeadEvent(qualified, { ...input, stage: 'propuesta' }, 'Marco');
  assert.throws(() => recordLeadEvent(proposal, { ...input, stage: 'anticipo_confirmado', amountCents: 295000 }, 'Marco'), /referencia/);
  const paid = recordLeadEvent(proposal, { ...input, stage: 'anticipo_confirmado', amountCents: 295000, paymentReference: 'pago-confirmado-1' }, 'Marco');
  assert.equal(leadSummary(paid).confirmedCents, 295000);
  assert.equal(leadSummary(paid).byStage.anticipo_confirmado, 1);
});

test('rechaza atribución no aprobada y eventos de otro cliente', () => {
  const campaign = { id: 'piloto', clientId: '3dev', versions: [] };
  const input = { clientId: '3dev', campaignId: 'piloto', leadId: 'prospecto-2', stage: 'consulta', source: 'WhatsApp' };
  assert.throws(() => recordLeadEvent(campaign, { ...input, clientId: 'otro' }, 'Marco'), /cliente/);
  assert.throws(() => recordLeadEvent(campaign, { ...input, version: 1, variant: 'A' }, 'Marco'), /versión aprobada/);
  assert.throws(() => recordLeadEvent(campaign, { ...input, stage: 'anticipo_confirmado' }, 'Marco'), /primero/);
});
