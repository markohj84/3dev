import { mkdir, readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { generateWithGemini } from '../src/lib/campaign-gemini.mjs';
import { summarizeResults } from '../src/lib/campaign-metrics.mjs';
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

async function execute() {
  if (command === 'report') {
    const input = JSON.parse(await readFile(version, 'utf8'));
    console.log(JSON.stringify(summarizeResults(input), null, 2));
    return;
  }
  if (command === 'init') {
    if (!process.env.THREEDEV_CAMPAIGN_STATE || !version) throw new Error('Indica el brief y una ruta THREEDEV_CAMPAIGN_STATE para este cliente');
    const campaign = createCampaign(JSON.parse(await readFile(version, 'utf8')));
    await writeFile(statePath, JSON.stringify(campaign, null, 2), { flag: 'wx', mode: 0o600 });
    console.log('Brief guardado en ' + statePath);
    return;
  }
  if (!['draft', 'draft-ai', 'show', 'approve'].includes(command)) {
    throw new Error('Uso: node scripts/campaign-pilot.mjs draft | draft-ai | show | approve <versión> <revisor> | report <archivo.json>');
  }
  let campaign;
  try {
    campaign = JSON.parse(await readFile(statePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT' || !['draft', 'draft-ai'].includes(command)) throw error;
    campaign = createCampaign(brief);
  }
  if (command === 'show') {
    console.log(JSON.stringify(campaign, null, 2));
    return;
  }
  if (command === 'draft' || command === 'draft-ai') {
    if (command === 'draft' && (campaign.clientId !== brief.clientId || campaign.brief.offer !== brief.offer)) {
      throw new Error('Los ejemplos corresponden al piloto 3DEV. Usa draft-ai para este brief.');
    }
    const model = process.env.THREEDEV_GEMINI_MODEL;
    const generate = command === 'draft-ai'
      ? input => generateWithGemini(input, { model, apiKey: process.env.GEMINI_API_KEY })
      : async () => examples;
    const next = await draftCampaign(campaign, generate);
    next.versions.at(-1).generator = command === 'draft-ai' ? 'gemini/' + model : 'examples';
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

async function run() {
  if (!['init', 'draft', 'draft-ai', 'approve'].includes(command)) return execute();
  await mkdir(dirname(statePath), { recursive: true });
  const lock = statePath + '.lock';
  try {
    await writeFile(lock, String(process.pid), { flag: 'wx', mode: 0o600 });
  } catch (error) {
    if (error.code === 'EEXIST') throw new Error('El historial tiene otra escritura en curso. Reintenta al terminar.');
    throw error;
  }
  try {
    return await execute();
  } finally {
    await unlink(lock);
  }
}

run().catch(error => { console.error(error.message); process.exitCode = 1; });
