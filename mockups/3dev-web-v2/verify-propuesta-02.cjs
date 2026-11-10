// Run with JSDOM_PACKAGE pointing at an existing package.json that has jsdom installed.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { createRequire } = require('node:module');
const { JSDOM, VirtualConsole } = createRequire(process.env.JSDOM_PACKAGE || path.resolve(__dirname, '../../package.json'))('jsdom');
const file = process.env.PROPOSAL_FILE || path.resolve(__dirname, '../3DEV WEB - propuesta 02.html');
const html = fs.readFileSync(file, 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const canonical = JSON.parse(fs.readFileSync(path.resolve(path.dirname(file), '../docs/strategy/oferta.json'))).lines.find(line => line.id === 'web').items;
assert.deepEqual(JSON.parse(script.match(/const plans = (.*);\n/)[1]), canonical, 'Oferta canónica');
const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => errors.push(error.message));
const dom = new JSDOM(html, {runScripts: 'outside-only', url: 'https://example.invalid/propuesta.html', virtualConsole});
const w = dom.window;
const d = w.document;
const $ = s => d.querySelector(s);
const $$ = s => [...d.querySelectorAll(s)];
const media = {matches: false, addEventListener(type, fn) { this.change = fn; }};
w.matchMedia = () => media;
let scrollTarget, scrollBehavior, animations = 0, cancelled = 0;
w.HTMLElement.prototype.scrollIntoView = function(options) { scrollTarget = this.id; scrollBehavior = options.behavior; };
w.HTMLElement.prototype.animate = function() { animations++; return {cancel() { cancelled++; }}; };
w.requestAnimationFrame = callback => callback();
const scenes = $$('main > section');
let scene = 0;
scenes.forEach((element, i) => { element.getBoundingClientRect = () => ({top: (i - scene) * 1000}); });
const click = element => element.dispatchEvent(new w.MouseEvent('click', {bubbles: true, cancelable: true, detail: 1}));
const key = (element, value) => element.dispatchEvent(new w.KeyboardEvent('keydown', {key: value, bubbles: true, cancelable: true}));
assert.equal($$('.plan-panel:not([hidden])').length, 3, 'Contenido sin JS');
const ids = $$('[id]').map(element => element.id);
assert.equal(ids.length, new Set(ids).size, 'IDs únicos');
for (const link of $$('a[href^="#"]')) assert(d.getElementById(link.getAttribute('href').slice(1)), 'Ancla válida');
for (const image of $$('img')) assert(fs.existsSync(path.resolve(path.dirname(file), image.getAttribute('src'))), 'Imagen local');
function assertWhatsApp(link, plan) {
  const uri = new URL(link.href);
  assert.equal(uri.origin, 'https://wa.me');
  assert.equal(uri.pathname, '/522223576770', 'WhatsApp de Marco con código de México');
  assert.equal(link.target, '_blank');
  assert(link.relList.contains('noopener'));
  const message = uri.searchParams.get('text');
  if (plan) {
    assert(message.includes(plan.name));
    assert(message.includes('$' + plan.setup.toLocaleString('es-MX') + ' MXN'));
  } else {
    assert(message.includes('¿Me ayudan a elegir un plan?'));
  }
}
assertWhatsApp($('#contact-link'));
assertWhatsApp($('#whatsapp-float'));
assert(!$('#whatsapp-float').hidden && !$('#whatsapp-float').classList.contains('enhancement'), 'CTA disponible sin JavaScript');
for (const plan of canonical) assertWhatsApp($(`[data-choose="${plan.id}"]`), plan);
w.eval(script);
assert(!d.body.classList.contains('no-js'));
assert.equal($$('.plan-panel:not([hidden])').length, 1);
assert.equal($('#chosen').value, '', 'Explorar no preselecciona compra al cargar');
assert.equal($('[role="tab"][aria-selected="true"]').dataset.plan, 'web-esencial', 'Web Esencial abre primero');
assert.equal($('#reveal').value, '0', 'El hero muestra el demo completo al entrar');
assert.equal($('#transform').getAttribute('aria-pressed'), 'true');
assert.equal($('#inicio .nogal-hero-capture').getAttribute('src'), '3dev-web-v2/nogal-desktop.jpg');
assert($('#panel-web-esencial .demo-caption').textContent.includes('se cotizan por separado'));
for (const link of $$('#inicio a[href^="https://"], #panel-web-esencial .nogal-preview')) {
  assert.equal(link.href, 'https://demo.3dev.mx/');
  assert.equal(link.target, '_blank');
  assert(link.relList.contains('noopener'));
}
click($('#transform'));
assert.equal($('#reveal').value, '32');
assert.equal($('#transform').getAttribute('aria-pressed'), 'false');
assert.equal(animations, 1);
click($('#transform'));
assert.equal($('#reveal').value, '0');
assert.equal($('#transform').getAttribute('aria-pressed'), 'true');
$('#reveal').value = '100';
$('#reveal').dispatchEvent(new w.Event('input', {bubbles: true}));
assert.equal($('#comparison').style.getPropertyValue('--reveal'), '100%');
assert(cancelled > 0, 'El arrastre cancela la animación');
media.matches = true;
media.change();
const before = animations;
click($('#transform'));
assert.equal(animations, before, 'Reduced motion sin animación');
media.matches = false;
for (const plan of canonical) {
  click($(`[data-plan="${plan.id}"]`));
  assert.equal($('[role="tab"][aria-selected="true"]').dataset.plan, plan.id);
  assert.equal($$('.plan-panel:not([hidden])').length, 1);
  assert.equal($('[role="tabpanel"]:not([hidden])').id, 'panel-' + plan.id);
  assert.equal($('#chosen').value, plan.id);
  assert.equal($('[data-select-plan][aria-pressed="true"]').dataset.selectPlan, plan.id);
  assertWhatsApp($('#contact-link'), plan);
  assertWhatsApp($('#whatsapp-float'), plan);
  assert.equal($('#contact-link').href, $('#whatsapp-float').href);
  assert.equal($('#contact-link').href, $(`[data-choose="${plan.id}"]`).href, 'CTA del plan y flotante sincronizados');
  assert($('#whatsapp-context').textContent.includes(plan.name));
  const panel = $('#panel-' + plan.id);
  for (const device of ['mobile', 'desktop']) {
    click(panel.querySelector(`[data-device-button="${device}"]`));
    assert.equal(panel.querySelector('.demo-frame').dataset.device, device);
    assert.equal(panel.querySelectorAll('[data-device-button][aria-pressed="true"]').length, 1);
  }
}
key($('#tab-tienda-en-linea'), 'ArrowRight');
assert.equal(d.activeElement.id, 'tab-web-esencial', 'Teclado circular');
key(d.activeElement, 'End');
assert.equal(d.activeElement.id, 'tab-tienda-en-linea');
key(d.activeElement, 'Home');
assert.equal(d.activeElement.id, 'tab-web-esencial');
for (const view of ['services', 'contact', 'home']) {
  click($(`[data-preview-view="${view}"]`));
  assert.equal($$('[data-view]:not([hidden])').length, 1);
  assert.equal($('[data-view]:not([hidden])').dataset.view, view);
}
for (const category of ['objetos', 'espacios', 'todos']) {
  click($(`[data-category-button="${category}"]`));
  assert.equal($$('[data-category]:not([hidden])').length, category === 'todos' ? 2 : 1);
}
click($('[data-select-plan="web-completa"]'));
assert.equal($('#chosen').value, 'web-completa');
const directLink = $('[data-choose="web-esencial"]');
let wasPrevented;
directLink.addEventListener('click', event => {
  wasPrevented = event.defaultPrevented;
  event.preventDefault(); // La prueba verifica el enlace sin abrir WhatsApp.
}, {once: true});
click(directLink);
assert.equal(wasPrevented, false, 'El CTA permite la navegación nativa a WhatsApp');
assert.equal($('#chosen').value, 'web-esencial');
assert.equal($('#whatsapp-float').href, directLink.href);
const floatingCta = $('#whatsapp-float');
const originalHref = floatingCta.href;
floatingCta.addEventListener('click', event => {
  assert.equal(event.defaultPrevented, false, 'El cambio de color no bloquea WhatsApp');
  event.preventDefault();
}, {once: true});
click(floatingCta);
assert(floatingCta.classList.contains('is-activated'), 'El CTA cambia de estado al hacer clic');
assert.equal(floatingCta.href, originalHref, 'El feedback conserva el destinatario y mensaje');
$('#chosen').value = '';
$('#chosen').dispatchEvent(new w.Event('change', {bubbles: true}));
assertWhatsApp($('#contact-link'));
assertWhatsApp($('#whatsapp-float'));
assert.equal($('#whatsapp-context').textContent, 'Tu próximo sitio empieza aquí');
assert(!floatingCta.classList.contains('is-activated'), 'Nueva selección restablece el estado glass');
click($('#presentation'));
assert.equal($('#deck').hidden, false);
assert.equal($('#previous').disabled, true);
click($('#next'));
assert.equal(scrollTarget, 'explora');
scene = 4;
w.dispatchEvent(new w.Event('scroll'));
assert.equal($('#next').disabled, true);
assert.equal($('#scene-label').textContent, '05 / Demos el primer paso');
media.matches = true;
click($('#previous'));
assert.equal(scrollBehavior, 'instant');
assert.equal(scrollTarget, 'proceso');
click($('#presentation'));
assert.equal($('#deck').hidden, true);
assert.deepEqual(errors, [], 'Sin errores DOM');
dom.window.close();
console.log('PASS: demo Nogal en hero y Web Esencial, oferta, recursos, sin JS, transformación, reduced motion, 3 planes, teclado, 6 cambios de dispositivo, 3 páginas de demo, 3 filtros, WhatsApp fijo y por plan (con/sin JS), contacto y presentación.');
