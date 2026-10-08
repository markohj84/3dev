// Verifies that the canonical offer catalog (docs/strategy/oferta.json) and
// the strategy document agree: every package name and every price in the
// catalog must appear in the document. Prices drift silently otherwise.
import { readFile } from 'node:fs/promises';

const catalogPath = new URL('../docs/strategy/oferta.json', import.meta.url);
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const doc = await readFile(new URL(`../${catalog.strategy}`, import.meta.url), 'utf8');

const fmt = (n) => n.toLocaleString('en-US');
const errors = [];

if (!/^\d+\.\d+\.\d+$/.test(catalog.version ?? '')) errors.push('oferta.json: version debe ser semver');

for (const line of catalog.lines ?? []) {
  for (const item of line.items ?? []) {
    if (!doc.includes(item.name)) errors.push(`${item.id}: el nombre "${item.name}" no aparece en la estrategia`);
    for (const key of ['setup', 'monthly', 'from']) {
      const value = item[key];
      if (value == null) continue;
      if (!Number.isInteger(value) || value <= 0) { errors.push(`${item.id}.${key}: debe ser entero positivo o null`); continue; }
      const variants = line.currency === 'USD' ? [`USD ${fmt(value)}`] : [`$${fmt(value)}`];
      if (!variants.some((v) => doc.includes(v))) errors.push(`${item.id}.${key}: ${variants[0]} no aparece en la estrategia`);
    }
  }
}

if (errors.length) {
  console.error(`check:strategy — ${errors.length} problema(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`check:strategy — oferta v${catalog.version} y estrategia coinciden.`);
