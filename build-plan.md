# Build Plan — 3dev Sitio Astro
## Instrucciones técnicas para implementación

---

## Setup inicial

```bash
# 1. Crear proyecto Astro
npm create astro@latest 3dev -- --template minimal --typescript strict --no-git

# 2. Entrar al proyecto
cd 3dev

# 3. Instalar dependencias
npm install @astrojs/tailwind tailwindcss lucide-astro

# 4. Agregar integración de Tailwind en astro.config.mjs
# integrations: [tailwind({ applyBaseStyles: false })]

# 5. Inicializar git
git init
git add .
git commit -m "chore: init astro project"
```

---

## Estructura de carpetas a crear

```bash
mkdir -p src/components src/layouts src/styles src/content/casos src/content/insights
touch src/styles/globals.css
touch src/content/config.ts
touch src/layouts/BaseLayout.astro
```

---

## globals.css

```css
/* src/styles/globals.css */
/* Primero: copiar el contenido completo de tokens.css */
/* Luego agregar: */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
a { color: inherit; text-decoration: none; }
button { background: none; border: none; cursor: pointer; color: inherit; font: inherit; }
input, textarea { font-family: inherit; }
```

---

## BaseLayout.astro

El layout base incluye:
- `<head>` con meta tags, favicon, preconnect a Google Fonts
- Import de `globals.css`
- Componente `<Nav />`
- `<slot />` para el contenido de página
- Componente `<Footer />`
- Script global de RevealOnScroll

```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description?: string;
}
const { title, description = '3dev — Brand · Product · AI' } = Astro.props;
---
<!DOCTYPE html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <!-- Reemplazar con @font-face self-hosted en producción -->
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body>
  <Nav />
  <main>
    <slot />
  </main>
  <Footer />
  <script>
    // IntersectionObserver global para .reveal y .reveal-stagger
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal, .reveal-stagger')
      .forEach(el => io.observe(el));
  </script>
</body>
</html>
```

---

## Nav.astro

Características:
- Sticky, `position: fixed`, `top: 16px`, centrado con transform
- Glass: `var(--glass-bg-strong)`, `var(--glass-blur)`, `var(--glass-border)`
- `border-radius: var(--r-xl)` (14px)
- Logo: fuente mono, slash en `var(--accent-default)`
- Links: underline que escala en hover (scaleX 0→1, transform-origin direction-aware)
- Btn "Contacto": `var(--grad-accent)`, radius 6px, shine pass en hover
- Entrada: `animation: navIn 700ms var(--ease-out) 200ms both`
- Responsive: links ocultos en mobile, solo logo + btn-nav

---

## HeroGrid.astro

El efecto visual clave del home. CSS puro, sin JS externo.

```css
/* La grid en perspectiva */
.grid-perspective {
  position: absolute;
  bottom: -10%;
  left: 50%;
  transform: translateX(-50%) translateY(var(--scroll-y, 0px)) perspective(900px) rotateX(60deg);
  transform-origin: center top;
  width: 220%;
  height: 75%;
  background-image:
    linear-gradient(rgba(93,196,164,0.20) 1px, transparent 1px),
    linear-gradient(90deg, rgba(93,196,164,0.20) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: linear-gradient(to top, black 0%, black 30%, transparent 85%);
  animation: gridScroll 14s linear infinite;
  will-change: transform, background-position;
}

.horizon-line {
  position: absolute;
  bottom: 32%;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(93,196,164,0.5) 50%, transparent 100%);
  animation: horizonBreathe 6s ease-in-out infinite;
}
```

Script de parallax (inline en el componente):
```javascript
// Solo afecta al hero — se desactiva cuando el usuario pasa del fold
const grid = document.querySelector('.grid-perspective');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > window.innerHeight) return;
  grid?.style.setProperty('--scroll-y', (scrollY * 0.4) + 'px');
}, { passive: true });
```

---

## ContactForm.astro (client:load)

El form tiene chips interactivos. Necesita JS en cliente.

Estructura:
1. Campos de texto: nombre, empresa, email, linkedin (opcional)
2. Chips de tipo de proyecto (selección única)
3. Chips de presupuesto (selección única)
4. Chips de timing (selección única)
5. Textarea de descripción
6. Botón submit

Para el submit, dos opciones:
- **Formspree**: `action="https://formspree.io/f/[id]"` — cero backend, gratuito hasta 50/mes
- **Resend**: API route en Astro con `export const prerender = false`

Usar Formspree para MVP. El CEO puede escalar cuando quiera.

```astro
<!-- src/components/ContactForm.astro -->
<form action="https://formspree.io/f/PLACEHOLDER_ID" method="POST" id="contact-form">
  <!-- campos aquí -->
</form>

<!-- Los chips son botones que actualizan hidden inputs -->
<script>
document.querySelectorAll('.chips').forEach(group => {
  const input = group.previousElementSibling; // hidden input
  group.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (input) input.value = chip.textContent.trim();
    });
  });
});
</script>
```

---

## casos/[slug].astro — template dinámico

```astro
---
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const casos = await getCollection('casos', ({ data }) => !data.draft);
  return casos.map(caso => ({
    params: { slug: caso.slug },
    props: { caso },
  }));
}

const { caso } = Astro.props;
const { Content } = await caso.render();
---

<BaseLayout title={`${caso.data.client} — caso 3/dev`}>
  <!-- Hero del caso con caso.data.title, caso.data.client -->
  <!-- MetaBar con caso.data props -->
  <!-- <Content /> para el cuerpo Markdown -->
  <!-- Metrics desde caso.data.metrics -->
  <!-- Testimonial desde caso.data.testimonial -->
</BaseLayout>
```

---

## Redirects 301 del sitio viejo

Crear `public/_redirects` (Vercel lo procesa automáticamente):

```
# Páginas del sitio viejo que pueden tener tráfico
/index.html           /                 301
/portfolio            /casos            301
/portfolio.html       /casos            301
/servicios            /capacidades      301
/contacto.html        /contacto         301
/contact              /contacto         301
```

Si hay URLs específicas del portafolio viejo, agregar según corresponda.

---

## Checklist de deploy

### Antes de conectar dominio
- [ ] `npm run build` sin errores
- [ ] `npm run preview` — sitio funciona local
- [ ] Lighthouse en preview: Performance ≥85, Accessibility ≥90
- [ ] Formulario de contacto funciona (Formspree test)
- [ ] Todos los links internos apuntan a páginas reales
- [ ] Mobile responsive verificado en Chrome DevTools

### En Vercel
- [ ] Conectar repositorio de GitHub
- [ ] Build command: `npm run build`
- [ ] Output dir: `dist`
- [ ] Variables de entorno: ninguna para MVP (agregar RESEND_API_KEY si se escala)
- [ ] Dominio: conectar 3dev.mx (requiere actualizar DNS en proveedor)

### Después de conectar dominio
- [ ] HTTPS activo (automático en Vercel)
- [ ] Redirects 301 funcionando
- [ ] Sitio viejo (3dev.mx actual) redirige correctamente
- [ ] Google Search Console — agregar propiedad nueva, enviar sitemap

---

## Performance targets

| Métrica | Target | Estrategia |
|---|---|---|
| LCP | < 2.5s | Imagen hero en formato AVIF/WebP, preload |
| FID / INP | < 200ms | Mínimo JS, `client:load` solo donde es necesario |
| CLS | < 0.1 | Font display: swap, dimensiones explícitas en imágenes |
| TBT | < 300ms | Sin librerías pesadas de animación |

Self-hosting de fuentes en producción — descarga `Space Grotesk` y `JetBrains Mono` en `.woff2` y reemplaza el Google Fonts import con `@font-face` local.

---

*Build Plan v1.0 · Mayo 2026 · 3dev*
