import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { createCampaign, draftCampaign, approveCampaign } from '../src/lib/campaign-pilot.mjs';

const brief = {
  id: 'cotizaciones-whatsapp',
  clientId: '3dev',
  offer: 'Página de cotización por WhatsApp por $5,900 MXN',
  audience: 'Negocios de distintos giros que venden por cotización',
  zone: 'Puebla y Cholula',
  destination: 'WhatsApp Business de 3DEV pendiente de confirmar',
  budgetCents: 100000,
};

const examples = [
  {
    headline: 'Recibe solicitudes más completas',
    body: '¿Cada cotización empieza con las mismas preguntas? En 3DEV creamos una página donde tus clientes pueden ver tus servicios y enviarte por WhatsApp qué necesitan, en qué zona y para cuándo.',
    creative: 'Conversación ilustrada, marcada como Ejemplo, con servicio, zona y fecha.',
    greeting: '¿Qué ofrece tu negocio y cómo te piden cotizaciones hoy?',
  },
  {
    headline: 'Tu página de cotización por $5,900 MXN',
    body: 'En 3DEV diseñamos una página móvil para mostrar tus servicios y recibir solicitudes por WhatsApp. Escríbenos y revisamos en 10 minutos si encaja con tu negocio.',
    creative: 'Gráfica 3DEV con el precio piloto, servicios, preguntas frecuentes y cotización.',
    greeting: '¿Qué producto o servicio te gustaría presentar en tu página?',
  },
];

const [command, version, reviewer] = process.argv.slice(2);
const statePath = resolve(process.env.THREEDEV_CAMPAIGN_STATE ?? '.local/campaigns/3dev-cotizaciones-whatsapp.json');

async function run() {
  if (!['draft', 'show', 'approve'].includes(command)) {
    throw new Error('Uso: node scripts/campaign-pilot.mjs draft | show | approve <versión> <revisor>');
  }
  let campaign;
  try {
    campaign = JSON.parse(await readFile(statePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT' || command !== 'draft') throw error;
    campaign = createCampaign(brief);
  }
  if (command === 'show') {
    console.log(JSON.stringify(campaign, null, 2));
    return;
  }
  if (command === 'draft') {
    const next = await draftCampaign(campaign, async () => examples);
    next.versions.at(-1).generator = 'examples';
    campaign = next;
  } else {
    campaign = approveCampaign(campaign, { version: Number(version), reviewer });
  }
  await mkdir(dirname(statePath), { recursive: true });
  const temporary = statePath + '.' + randomUUID();
  await writeFile(temporary, JSON.stringify(campaign, null, 2) + '\n', { mode: 0o600 });
  await rename(temporary, statePath);
  const current = campaign.versions.at(-1);
  console.log(JSON.stringify({ statePath, version: current.number, generator: current.generator, approval: current.approval }, null, 2));
}

run().catch(error => { console.error(error.message); process.exitCode = 1; });
