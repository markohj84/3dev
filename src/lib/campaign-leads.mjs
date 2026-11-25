const stages = ['consulta', 'calificado', 'propuesta', 'anticipo_confirmado', 'cerrado'];

export function recordLeadEvent(campaign, input, operator, now = new Date()) {
  if (input?.clientId !== campaign.clientId || input.campaignId !== campaign.id) {
    throw new Error('El prospecto debe corresponder al cliente y la campaña');
  }
  if (typeof input.leadId !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(input.leadId)) {
    throw new Error('Usa un identificador interno de prospecto');
  }
  if (!stages.includes(input.stage) || typeof operator !== 'string' || !operator.trim()) {
    throw new Error('Indica una etapa válida y el responsable');
  }
  if (typeof input.source !== 'string' || !input.source.trim()) {
    throw new Error('Indica de dónde procede este registro');
  }
  const history = campaign.leadEvents ?? [];
  const previous = history.findLast(event => event.leadId === input.leadId);
  if (previous && previous.stage === input.stage) return campaign;
  if (!previous && input.stage !== 'consulta') throw new Error('Registra primero la consulta');
  if (input.stage === 'anticipo_confirmado') {
    if (previous?.stage !== 'propuesta' || !Number.isSafeInteger(input.amountCents) || input.amountCents <= 0 ||
      typeof input.paymentReference !== 'string' || !input.paymentReference.trim()) {
      throw new Error('El anticipo requiere propuesta, importe y referencia de pago confirmada');
    }
  }
  if (!previous && input.version != null) {
    const version = campaign.versions.find(item => item.number === input.version);
    if (!version?.approval || !['A', 'B'].includes(input.variant)) {
      throw new Error('La atribución del anuncio requiere una versión aprobada y una variante');
    }
  }
  const event = {
    leadId: input.leadId,
    stage: input.stage,
    source: input.source.trim(),
    operator: operator.trim(),
    at: now.toISOString(),
    ...(previous ? {} : { version: input.version ?? null, variant: input.variant ?? null }),
    ...(input.stage === 'anticipo_confirmado' ? {
      amountCents: input.amountCents,
      paymentReference: input.paymentReference.trim(),
    } : {}),
  };
  return { ...campaign, leadEvents: [...history, event] };
}

export function leadSummary(campaign) {
  const latest = new Map();
  for (const event of campaign.leadEvents ?? []) latest.set(event.leadId, event);
  return {
    byStage: Object.fromEntries(stages.map(stage => [stage, [...latest.values()].filter(event => event.stage === stage).length])),
    confirmedCents: (campaign.leadEvents ?? []).filter(event => event.stage === 'anticipo_confirmado')
      .reduce((total, event) => total + event.amountCents, 0),
  };
}
