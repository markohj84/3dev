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
