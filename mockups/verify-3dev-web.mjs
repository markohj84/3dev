import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { Script, runInNewContext } from 'node:vm';
const page = readFileSync(new URL('./3DEV WEB - propuesta.html', import.meta.url), 'utf8');
const offer = JSON.parse(readFileSync(new URL('../docs/strategy/oferta.json', import.meta.url))).lines.find(line => line.id === 'web');
for (const plan of offer.items) {
  assert(page.includes(plan.name));
  assert(page.includes('$' + plan.setup.toLocaleString('en-US')));
  assert(page.includes(plan.delivery));
}
const script = page.match(/<script>([\s\S]*?)<\/script>/)[1];
new Script(script);
const elements = Object.fromEntries(['mode', 'deck', 'prev', 'next', 'position', 'plan-select', 'contact-link'].map(id => ['#' + id, {
  handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; }, setAttribute(name, value) { this[name] = value; }
}]));
const sections = Array.from({length: 5}, (_, i) => ({getBoundingClientRect: () => ({top: i * 900}), scrollIntoView() { this.visited = true; }}));
runInNewContext(script, {document: {querySelector: key => elements[key], querySelectorAll: () => sections, body: {classList: {toggle() {}}}}, window: {addEventListener() {}}, innerHeight: 800, encodeURIComponent});
assert.equal(elements['#prev'].disabled, true);
elements['#mode'].handlers.click();
assert.equal(elements['#deck'].hidden, false);
assert.equal(elements['#mode']['aria-pressed'], 'true');
elements['#next'].handlers.click();
assert(sections[1].visited);
for (const name of ['', ...offer.items.map(plan => plan.name)]) {
  elements['#plan-select'].handlers.change({target: {value: name}});
  const link = new URL(elements['#contact-link'].href);
  assert.equal(link.protocol, 'mailto:');
  assert.equal(link.pathname, 'contacto@3dev.mx');
  assert.equal(link.searchParams.get('subject'), name ? 'Me interesa ' + name : 'Quiero mi sitio web');
  assert(link.searchParams.get('body').includes('\n\n'));
}
console.log('OK: catálogo, sintaxis, navegación, modo presentación y cuatro opciones de contacto.');
