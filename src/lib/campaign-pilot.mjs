// A campaign draft and its review are scoped to a single client.
function required(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new TypeError(label + ' es obligatorio');
  return value.trim();
}

export function createCampaign({ id, clientId, offer, audience, zone, destination, budgetCents }) {
  if (!Number.isSafeInteger(budgetCents) || budgetCents <= 0) {
    throw new RangeError('El presupuesto debe ser un importe positivo en centavos');
  }
  return {
    id: required(id, 'Campaña'),
    clientId: required(clientId, 'Cliente'),
    brief: {
      offer: required(offer, 'Oferta'),
      audience: required(audience, 'Público'),
      zone: required(zone, 'Zona'),
      destination: required(destination, 'Destino'),
      budgetCents,
      currency: 'MXN',
    },
    versions: [],
  };
}

export async function draftCampaign(campaign, generate) {
  const brief = structuredClone(campaign.brief);
  const ads = await generate(brief);
  if (!Array.isArray(ads) || ads.length !== 2) {
    throw new TypeError('Se requieren dos anuncios');
  }
  const normalized = ads.map(ad => ({
    headline: required(ad?.headline, 'Título'),
    body: required(ad?.body, 'Texto'),
    creative: required(ad?.creative, 'Pieza visual'),
    greeting: required(ad?.greeting, 'Saludo de WhatsApp'),
  }));
  if (normalized[0].body === normalized[1].body) {
    throw new TypeError('Los anuncios deben tener textos distintos');
  }
  const version = { number: campaign.versions.length + 1, brief, ads: normalized, approval: null };
  return { ...campaign, versions: [...campaign.versions, version] };
}

export function approveCampaign(campaign, { version, reviewer, now = new Date() }) {
  const current = campaign.versions.at(-1);
  if (!current || current.number !== version || current.approval) {
    throw new Error('Solo se puede aprobar la última versión pendiente');
  }
  const approved = {
    ...current,
    approval: { reviewer: required(reviewer, 'Revisor'), at: now.toISOString() },
  };
  return { ...campaign, versions: [...campaign.versions.slice(0, -1), approved] };
}

export function approvedCampaign(campaign) {
  const current = campaign.versions.at(-1);
  if (!current?.approval) throw new Error('La versión actual requiere revisión');
  return structuredClone(current);
}
