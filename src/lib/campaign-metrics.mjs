// Inputs are cumulative totals for a single reporting window, in MXN cents.
export function summarizeResults(input) {
  for (const key of ['spendCents', 'conversations', 'qualified', 'proposals', 'receivedCents']) {
    if (!Number.isSafeInteger(input?.[key]) || input[key] < 0) {
      throw new Error('Falta un entero no negativo en ' + key);
    }
  }
  if (input.qualified > input.conversations || input.proposals > input.qualified) {
    throw new Error('Revisa los totales del mismo embudo y periodo');
  }
  return {
    ...Object.fromEntries(['spendCents','conversations','qualified','proposals','receivedCents'].map(key=>[key,input[key]])),
    costPerQualifiedCents: input.qualified ? Math.round(input.spendCents / input.qualified) : null,
    receivedLessSpendCents: input.receivedCents - input.spendCents,
  };
}

export function importDailyResults(campaign, input, operator, now = new Date()) {
  if (input?.clientId !== campaign.clientId || input.campaignId !== campaign.id) {
    throw new Error('El archivo debe corresponder al cliente y la campaña activos');
  }
  const version = campaign.versions.find(item => item.number === input.version);
  if (!version?.approval) throw new Error('La versión indicada requiere aprobación');
  const { date, variant, source } = input;
  if (!['A', 'B'].includes(variant)) throw new Error('Indica la variante A o B');
  const day = new Date(date + 'T12:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== date) {
    throw new Error('Fecha de resultados inválida');
  }
  if (typeof operator !== 'string' || !operator.trim() || typeof source !== 'string' || !source.trim()) {
    throw new Error('Indica responsable y referencia del reporte');
  }
  const totals = summarizeResults(input);
  const history = campaign.results ?? [];
  const previous = history.findLast(row => row.date === date && row.variant === variant && row.version === input.version);
  if (previous?.source === source.trim() && Object.keys(totals).every(key => previous.totals[key] === totals[key])) {
    return campaign;
  }
  const entry = {
    version: input.version, variant, date, totals, source: source.trim(),
    revision: (previous?.revision ?? 0) + 1,
    operator: operator.trim(), importedAt: now.toISOString(),
  };
  return { ...campaign, results: [...history, entry] };
}

export function reviewCampaign(campaign) {
  const latest = new Map();
  for (const row of campaign.results ?? []) {
    latest.set(`${row.version}:${row.variant}:${row.date}`, row);
  }
  const rows = [...latest.values()];
  if (rows.length === 0) {
    return { evidence: [], recommendation: 'Espera resultados verificados de anuncios aprobados antes de proponer ajustes.' };
  }
  const evidence = ['A', 'B'].map(variant => {
    const totals = rows.filter(row => row.variant === variant).reduce((sum, row) => ({
      spendCents: sum.spendCents + row.totals.spendCents,
      conversations: sum.conversations + row.totals.conversations,
      qualified: sum.qualified + row.totals.qualified,
      proposals: sum.proposals + row.totals.proposals,
      receivedCents: sum.receivedCents + row.totals.receivedCents,
    }), { spendCents: 0, conversations: 0, qualified: 0, proposals: 0, receivedCents: 0 });
    return { variant, ...summarizeResults(totals) };
  });
  const total = evidence.reduce((sum, row) => sum + row.conversations, 0);
  let recommendation = 'Conserva ambas variantes mientras reúnes más conversaciones calificadas y revisa manualmente cada consulta.';
  if (total >= 10 && evidence.every(row => row.qualified >= 3)) {
    const [a, b] = evidence;
    const lower = a.costPerQualifiedCents <= b.costPerQualifiedCents ? a : b;
    recommendation = `Revisa la variante ${lower.variant} para priorizarla por costo por conversación calificada. Confirma calidad y cobros antes de cambiar la pauta.`;
  } else if (total >= 10 && evidence.every(row => row.qualified === 0)) {
    recommendation = 'Revisa el texto, el público y las conversaciones para explicar por qué ninguna consulta resultó calificada.';
  }
  return { evidence, recommendation };
}
