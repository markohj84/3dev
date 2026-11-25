import test from 'node:test';
import assert from 'node:assert/strict';
import { generateWithGemini } from '../src/lib/campaign-gemini.mjs';
import { summarizeResults } from '../src/lib/campaign-metrics.mjs';

test('envía el brief y lee salida JSON del proveedor simulado', async () => {
  const brief = { offer: 'Página móvil' };
  const ads = [{ headline: 'A' }, { headline: 'B' }];
  const request = async (url, options) => {
    assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/models/test:generateContent');
    assert.equal(options.headers['x-goog-api-key'], 'test-key');
    assert.deepEqual(JSON.parse(JSON.parse(options.body).contents[0].parts[0].text), brief);
    return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(ads) }] } }] });
  };
  assert.deepEqual(await generateWithGemini(brief, { model: 'test', apiKey: 'test-key', request }), ads);
});

test('requiere credenciales y propaga fallos de generación', async () => {
  await assert.rejects(generateWithGemini({}, {}), /Configura/);
  await assert.rejects(generateWithGemini({}, { model: 'test', apiKey: 'k', request: async () => new Response('', {status: 429}) }), /429/);
});

test('calcula costo por prospecto y flujo de efectivo dentro del periodo', () => {
  const row = { spendCents: 50000, conversations: 10, qualified: 4, proposals: 2, receivedCents: 100000 };
  assert.equal(summarizeResults(row).costPerQualifiedCents, 12500);
  assert.equal(summarizeResults(row).receivedLessSpendCents, 50000);
  assert.equal(summarizeResults({...row, qualified:0, proposals:0}).costPerQualifiedCents, null);
  assert.throws(()=>summarizeResults({...row, qualified:11}), /embudo/);
  assert.throws(()=>summarizeResults({}), /entero/);
});

test('la importación conserva revisiones por cliente, anuncio y día', async () => {
  const { importDailyResults } = await import('../src/lib/campaign-metrics.mjs');
  const campaign = { clientId: 'prueba', id: 'piloto', versions: [{ number: 1, approval: { reviewer: 'Prueba' } }] };
  const row = { clientId: 'prueba', campaignId: 'piloto', version: 1, variant: 'A', date: '2026-11-23', source: 'fixture', spendCents: 100, conversations: 1, qualified: 1, proposals: 0, receivedCents: 0 };
  const first = importDailyResults(campaign, row, 'Prueba');
  assert.equal(importDailyResults(first, row, 'Prueba'), first);
  const revised = importDailyResults(first, { ...row, spendCents: 200 }, 'Prueba');
  assert.deepEqual(revised.results.map(item => item.revision), [1, 2]);
  assert.equal(importDailyResults(revised, { ...row, variant: 'B' }, 'Prueba').results.at(-1).revision, 1);
  assert.throws(() => importDailyResults(first, { ...row, clientId: 'otro' }, 'Prueba'), /cliente/);
  assert.throws(() => importDailyResults(first, { ...row, version: 2 }, 'Prueba'), /aprobación/);
  assert.throws(() => importDailyResults(first, { ...row, date: '2026-02-31' }, 'Prueba'), /Fecha/);
});

test('la revisión utiliza la última corrección y evita decidir con datos escasos', async () => {
  const { reviewCampaign } = await import('../src/lib/campaign-metrics.mjs');
  const campaign = { results: [
    { version: 1, variant: 'A', date: '2026-11-23', totals: { spendCents: 1000, conversations: 1, qualified: 1, proposals: 0, receivedCents: 0 } },
    { version: 1, variant: 'A', date: '2026-11-23', totals: { spendCents: 2000, conversations: 2, qualified: 1, proposals: 0, receivedCents: 0 } },
  ] };
  const review = reviewCampaign(campaign);
  assert.equal(review.evidence[0].spendCents, 2000);
  assert.equal(review.evidence[0].conversations, 2);
  assert.match(review.recommendation, /más conversaciones/);
  assert.equal(reviewCampaign({}).evidence.length, 0);
});
