# 3dev — Handoff para Claude Code
## Fase 5: Implementación del sitio en Astro

---

## Contexto del proyecto

3dev es un estudio mexicano de Brand · Product · AI reposicionándose en 2026. El sitio actual (3dev.mx) es HTML/CSS estático de 2018. Este proyecto lo reemplaza completamente con un sitio en Astro que refleja el nuevo posicionamiento premium.

**Propietario:** CEO de 3dev (Puebla, México)
**Stack decidido:** Astro 5 + Tailwind 4 + TypeScript + Markdown/Git + Vercel
**Estado al comenzar:** mockups completos aprobados, design system v2.1 listo, contenido parcialmente definido

---

## Tu tarea como Claude Code

Construir el sitio completo de 3dev desde cero usando los mockups HTML, el design system, y el copy documentado en este paquete. El resultado final debe:

1. Verse y sentirse exactamente como los mockups HTML de referencia
2. Estar deployado y funcionando en Vercel
3. Ser mantenible — el CEO puede agregar casos e insights editando archivos Markdown
4. Ser rápido — Lighthouse 90+ en Performance y Accessibility

---

## Archivos en este paquete

```
3dev-handoff/
├── handoff.md                 ← este archivo
├── build-plan.md              ← instrucciones técnicas de implementación
├── copy.md                    ← todo el copy aprobado por sección
├── content-inventory.md       ← qué contenido falta y dónde va
├── design-system/
│   └── tokens.css             ← design system v2.1 completo
└── mockups/                   ← 5 archivos HTML de referencia visual
    ├── home.html              ← home con Grid Infinito motion
    ├── capacidades.html       ← página de capacidades
    ├── casos-indice.html      ← índice de proyectos
    ├── caso-individual.html   ← template del caso (Las Cholulas)
    └── contacto.html          ← página de contacto con form calificado
```

---

## Arquitectura del sitio

```
src/
├── pages/
│   ├── index.astro            ← home
│   ├── capacidades.astro      ← página de capacidades
│   ├── casos/
│   │   ├── index.astro        ← índice de proyectos
│   │   └── [slug].astro       ← template dinámico de caso
│   ├── insights/
│   │   ├── index.astro        ← índice de insights
│   │   └── [slug].astro       ← template de artículo
│   └── contacto.astro         ← página de contacto
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── HeroGrid.astro         ← el Grid Infinito animado
│   ├── Badge.astro
│   ├── Button.astro
│   ├── BentoCard.astro
│   ├── ProjectCard.astro
│   ├── CaseMetrics.astro
│   ├── ProcessTimeline.astro
│   ├── TestimonialCard.astro
│   ├── FilterChips.astro      ← client:load para interactividad
│   ├── ContactForm.astro      ← client:load para chips + submit
│   └── RevealOnScroll.astro   ← wrapper con IntersectionObserver
├── content/
│   ├── config.ts              ← Zod schemas para collections
│   ├── casos/
│   │   └── las-cholulas.md    ← primer caso
│   └── insights/
│       └── placeholder.md     ← primer artículo
├── layouts/
│   └── BaseLayout.astro       ← head, nav, footer, tokens.css
└── styles/
    └── globals.css            ← @import tokens.css + base styles
```

---

## Decisiones técnicas cerradas

No replantear estas decisiones. Están tomadas y documentadas:

| Decisión | Elección | Razón |
|---|---|---|
| Framework | Astro 5 | Performance, SSG, Content Collections nativas |
| Styling | Tailwind 4 + CSS custom props | Velocidad dev + theming runtime |
| Fuentes | Google Fonts en dev, self-hosted en prod | Performance |
| CMS | Markdown + Git | CEO publica solo, sin dashboard externo |
| Deploy | Vercel | DX, previews automáticos, analytics |
| Iconos | Lucide Astro | Outline, consistente, tree-shakeable |
| Animaciones | CSS + IntersectionObserver nativo | Sin overhead de librerías |
| Motion hero | CSS puro (grid-perspective + gridScroll keyframe) | Definido en design system |

---

## Componentes con interactividad (client:load)

Solo estos componentes necesitan JavaScript en el cliente:

- `FilterChips.astro` — Casos índice, toggle activo entre brand/product/ai/todos
- `ContactForm.astro` — Chips de tipo/presupuesto/timing + validación + submit
- `CounterAnimation.astro` — Números que cuentan al entrar en viewport (sección stats)
- `RevealOnScroll.astro` — IntersectionObserver para .reveal y .reveal-stagger

Todo lo demás es HTML/CSS estático. Astro SSG por defecto.

---

## Content Collections schema (Zod)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const casos = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    client:      z.string(),
    industry:    z.string(),
    year:        z.number(),
    duration:    z.string(),
    stack:       z.array(z.string()),
    ai:          z.array(z.string()),
    team:        z.number(),
    siteUrl:     z.string().optional(),
    tags:        z.array(z.enum(['brand', 'product', 'ai'])),
    featured:    z.boolean().default(false),
    metrics:     z.array(z.object({
      label:     z.string(),
      value:     z.string(),
      accent:    z.boolean().default(false),
    })),
    testimonial: z.object({
      quote:     z.string(),
      name:      z.string(),
      role:      z.string(),
      initials:  z.string(),
    }).optional(),
    draft:       z.boolean().default(false),
  }),
});

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    date:        z.date(),
    tag:         z.enum(['brand', 'product', 'ai']),
    summary:     z.string(),
    draft:       z.boolean().default(false),
  }),
});

export const collections = { casos, insights };
```

---

## Orden de implementación recomendado

Construir en este orden — cada fase es verificable antes de la siguiente:

### Fase A — Base (día 1)
1. `npm create astro@latest 3dev --template minimal`
2. Instalar Tailwind 4, Lucide Astro
3. Copiar `tokens.css` a `src/styles/`
4. Crear `BaseLayout.astro` con head correcto, fuentes, tokens importados
5. Verificar que tokens funcionan en una página de prueba

### Fase B — Componentes base (día 1-2)
6. `Nav.astro` — glass sticky, links, btn-nav
7. `Footer.astro` — grid 4 cols, status dot pulsante
8. `Button.astro` — variantes primary/secondary/ghost
9. `Badge.astro` — pill glass con dot pulsante

### Fase C — Home (día 2-3)
10. `HeroGrid.astro` — grid 3D en perspectiva + horizon line + parallax scroll
11. `pages/index.astro` — todas las secciones del home
12. `CounterAnimation.astro` — para la sección de stats
13. `RevealOnScroll.astro` — wrapper para reveals

### Fase D — Capacidades + Contacto (día 3)
14. `pages/capacidades.astro`
15. `pages/contacto.astro` + `ContactForm.astro` (con chips interactivos)

### Fase E — Content Collections (día 4)
16. `src/content/config.ts` — schemas Zod
17. `src/content/casos/las-cholulas.md` — caso inicial
18. `pages/casos/index.astro` — con FilterChips
19. `pages/casos/[slug].astro` — template dinámico

### Fase F — Deploy (día 4-5)
20. Vercel deploy
21. Dominio 3dev.mx conectado
22. Redirects 301 del sitio viejo
23. Lighthouse audit + fixes

---

## Variables de entorno

No se necesitan variables de entorno para el MVP. El formulario de contacto puede:
- Opción A (más simple): Netlify Forms o Formspree — sin backend
- Opción B (control total): Resend API con `RESEND_API_KEY` en Vercel

Implementar Opción A primero. Si el CEO quiere historial de leads en dashboard, escalar a Opción B.

---

## Preguntas que el CEO puede responder mientras construyes

No bloquees la implementación esperando estas respuestas. Usa placeholders y continúa:

1. **Métricas reales de Las Cholulas** — los mockups dicen +184%, -72%, 8x. Confirmar o actualizar.
2. **Cita del cliente** — la frase de Carlos Ramírez es placeholder. Confirmar y obtener permiso escrito.
3. **Nombre/cargo del CEO** — para página Sobre nosotros
4. **Foto del CEO** — para Sobre nosotros
5. **URL del calendario** — Cal.com o Calendly para el botón de Contacto
6. **Email de destino** — a dónde llegan los formularios

---

## Lo que NO hacer

- No usar Tailwind sin tokens CSS — los tokens son la fuente de verdad
- No hardcodear colores hex en componentes — siempre `var(--token)`
- No instalar Framer Motion o GSAP — las animaciones están en CSS puro
- No crear componentes de shadcn/ui — sistema propio del design system
- No usar WordPress, Webflow, Framer, o cualquier builder
- No cambiar el stack sin consultar

---

*Paquete generado como cierre de Fase 4 — Diseño. Versión: 1.0 · Mayo 2026*
