# Content Inventory — 3dev
## Qué contenido tienes, qué falta y dónde va cada pieza

---

## Estado: qué está listo

| Contenido | Estado | Ubicación |
|---|---|---|
| Copy del home (hero, capacidades, proceso, manifesto, CTA) | ✅ Aprobado | `copy.md` |
| Copy de Capacidades (todas las secciones) | ✅ Aprobado | `copy.md` |
| Copy de Contacto | ✅ Aprobado | `copy.md` |
| Estrategia de marca | ✅ Aprobado | `3dev_estrategia_marca.docx` |
| Design tokens v2.1 | ✅ Listo | `design-system/tokens.css` |
| Mockups en alta fidelidad | ✅ 5 archivos | `mockups/` |
| Caso: Las Cholulas (estructura) | ✅ Template listo | `mockups/caso-individual.html` |
| Logo: concepto `3/dev` | ✅ Definido | Sistema tipográfico en JetBrains Mono |

---

## Estado: qué falta

### 🔴 Crítico — el sitio no puede lanzarse sin esto

| Contenido | Responsable | Dónde va | Notas |
|---|---|---|---|
| Métricas reales de Las Cholulas | CEO | `content/casos/las-cholulas.md` | Confirmar o ajustar: +184% conversión, -72% gestión, 8x ROI |
| Cita del cliente con permiso | CEO + Carlos Ramírez | `content/casos/las-cholulas.md` | Permiso escrito o email confirmando uso |
| Nombre del cliente citado | CEO | `content/casos/las-cholulas.md` | "Carlos Ramírez" es placeholder — confirmar nombre real |
| Cargo del cliente citado | CEO | `content/casos/las-cholulas.md` | "Director · Las Cholulas Group" — confirmar |
| Fotos del proyecto Las Cholulas | CEO | `public/images/casos/las-cholulas/` | Min. 4 imágenes: sitio, panel, marca, detalle |
| URL del calendario (Cal.com o Calendly) | CEO | `contacto.astro` + footer | Reemplaza el placeholder en el botón "Agendar 30 min" |
| Email de destino del formulario | CEO | Formspree o Resend config | A dónde llegan los leads del formulario |

---

### 🟡 Importante — afecta credibilidad pero se puede lanzar sin ello

| Contenido | Responsable | Dónde va | Notas |
|---|---|---|---|
| Foto del CEO | CEO | `pages/sobre-nosotros.astro` | Profesional, fondo neutro o contexto de trabajo |
| Bio del CEO | CEO | `pages/sobre-nosotros.astro` | 3-4 líneas: qué hace, qué construyó, por qué 3dev |
| Logo de Las Cholulas (SVG o PNG) | CEO | `public/images/logos/` | Para la sección de prueba social en el home |
| Logos de otros clientes (opcionales) | CEO | `public/images/logos/` | SIA Neumática, Propiedades MX, etc. — solo si son buenos |
| Primer artículo de Insights | CEO | `content/insights/` | Cualquiera de los 3 títulos propuestos en los mockups |

---

### 🟢 Puede esperar — agregar después del lanzamiento

| Contenido | Notas |
|---|---|
| Segundo y tercer caso | Para Q3/Q4 2026 — los placeholders del índice lo comunican |
| Página Manifiesto | Texto completo del manifiesto de marca |
| Página Sobre nosotros | Bio + foto del CEO + filosofía del estudio |
| Segundo artículo de Insights | Después del lanzamiento |
| Video de producto Las Cholulas | Si el cliente lo autoriza |

---

## Dónde van los archivos de imagen

```
public/
├── images/
│   ├── logos/
│   │   ├── las-cholulas.svg       ← o .png con fondo transparente
│   │   ├── sia-neumatica.svg
│   │   └── [otros-clientes].svg
│   ├── casos/
│   │   └── las-cholulas/
│   │       ├── hero.jpg           ← imagen principal del caso (16:9 o 21:9)
│   │       ├── panel.jpg          ← screenshot del panel de control
│   │       ├── marca.jpg          ← sistema de marca / identidad
│   │       ├── cms.jpg            ← screenshot del CMS
│   │       └── chat.jpg           ← screenshot del chat IA
│   └── team/
│       └── ceo.jpg               ← foto del fundador
└── favicon.svg                   ← ícono "3/" en jade
```

**Formatos recomendados:**
- Fotos del proyecto: JPG, máximo 2000px ancho, calidad 85%
- Logos de clientes: SVG preferido, PNG transparente como fallback
- Foto del CEO: JPG, mínimo 800x800px para que aguante zoom

---

## Primero instala, luego escala

El sitio puede lanzar con:
- Caso de Las Cholulas completo (con métricas reales + cita + fotos)
- Tres placeholders de "coming soon" (ya están en el mockup)
- Sin foto del CEO ni página Sobre nosotros
- Sin artículos de Insights (la sección puede omitirse del home hasta tener uno)

Eso es suficiente para P1 y P2. El portafolio crece orgánicamente.

---

*Inventario v1.0 · Mayo 2026 · 3dev*
