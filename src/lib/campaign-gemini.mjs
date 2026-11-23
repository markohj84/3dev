const fields = ['headline', 'body', 'creative', 'greeting'];
const instructions = [
  'Escribe dos anuncios distintos para una campaña de Meta en español mexicano.',
  'Devuelve un arreglo JSON de dos objetos. Cada objeto tiene cuatro campos de texto: ' + fields.join(', '),
  'El primero presenta un problema del cliente y el segundo presenta la oferta.',
  'Usa solo los hechos del brief. Omite números de contacto, testimonios, descuentos y resultados inventados.',
  'Usa el presupuesto de pauta solo como contexto interno.',
].join('\n');

export async function generateWithGemini(brief, { apiKey, model, request = fetch }) {
  if (!apiKey || !/^[\w.-]+$/.test(model ?? '')) {
    throw new Error('Configura GEMINI_API_KEY y THREEDEV_GEMINI_MODEL para generar con IA.');
  }
  const response = await request(
    'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
      signal: AbortSignal.timeout(45000),
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions }] },
        contents: [{ role: 'user', parts: [{ text: JSON.stringify(brief) }] }],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    },
  );
  if (!response.ok) throw new Error('Gemini respondió con HTTP ' + response.status);
  const payload = await response.json();
  const candidate = payload.candidates?.[0];
  if (candidate?.finishReason !== 'STOP') throw new Error('Gemini no completó los anuncios');
  const content = candidate.content?.parts?.filter(part => !part.thought).map(part => part.text ?? '').join('');
  return JSON.parse(content);
}
