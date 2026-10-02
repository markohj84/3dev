# Contexto del proyecto · 3DEV 3.0

Contexto específico del sitio 3dev.mx; no trasladar sus decisiones a otros clientes como reglas globales. La metodología está en [HARNESS](../../.3dev/HARNESS.md). Snapshot inspeccionado el **2026-10-01** en `bc68aa3`; vuelve a comprobar las fuentes antes de cambiar el producto.

## Producto y alcance vigente

Estudio mexicano Brand · Product · AI. El sitio presenta capacidades y casos, y recibe consultas de proyectos mediante contacto. La adopción del Harness es documental: no autoriza modificar UI, rutas, contenido público, formulario o infraestructura.

**Límite de esta entrega:** no realizar commit, push, deploy ni cambios remotos sin autorización explícita de Marco. La edición y validación local del Harness sí están autorizadas. La publicación de 3DEV 3.0 es contexto proporcionado por el usuario; esta inspección no verifica producción.

## Fuentes de implementación

| Área | Fuente y comportamiento observado |
| --- | --- |
| Stack | [package.json](../../package.json), [package-lock.json](../../package-lock.json), [astro.config.mjs](../../astro.config.mjs): Astro 6, Tailwind 4, adapter Vercel, Resend; [tsconfig.json](../../tsconfig.json) extiende strict de Astro |
| Páginas | [src/pages](../../src/pages): inicio, capacidades, contacto, índice y detalle de casos; no hay rutas de Insights actualmente |
| Colecciones | [src/content.config.ts](../../src/content.config.ts): `casos` e `insights`; `draft` forma parte de los esquemas; verifica su aplicación en la ruta que publica cada colección |
| Casos | [casos/[slug].astro](../../src/pages/casos/%5Bslug%5D.astro): resultados/testimonios condicionados por `resultsVerified` y `testimonialApproved`; preservar aprobación y evidencia, no inventar cifras |
| Layout/SEO | [BaseLayout.astro](../../src/layouts/BaseLayout.astro): idioma español, canonical, title/description, OG/Twitter, skip link, Google Fonts y script externo Quetzal |
| Contacto | [contacto.astro](../../src/pages/contacto.astro) → [validateContact](../../src/lib/contact.ts) → [api/contact.ts](../../src/pages/api/contact.ts); endpoint de servidor con Resend y respuesta JSON o HTML |
| Redirecciones | [vercel.json](../../vercel.json) contiene redirecciones heredadas; conservarlas al cambiar rutas |

En la revisión base, el validador requiere `nombre`, `empresa`, `email`, `tipo_proyecto`, `timing` y `descripcion`; `presupuesto` es opcional. El código es la autoridad para límites y opciones permitidas, que pueden cambiar. `RESEND_API_KEY` se lee del entorno servidor; nunca copiar su valor a documentación, cliente o logs.

## Diseño vigente y antecedentes

La fuente activa es [src/styles/tokens.css](../../src/styles/tokens.css), importada por [globals.css](../../src/styles/globals.css), con estilos compartidos en [editorial.css](../../src/styles/editorial.css).

- Mantener las tres capas: primitivas → roles semánticos → medidas. Los componentes consumen semánticos y medidas; extender el sistema antes de añadir excepciones aisladas.
- Oscuro por defecto y superficies paper/ink. Space Grotesk y JetBrains Mono; acentos jade/amber/blue. Los valores vigentes se consultan en el stylesheet.
- Radios ordinarios hasta `--r-lg` (8px); `--r-full` para elementos circulares/píldoras pertinentes. La versión actual no define `--r-xl`, `--r-2xl`, glass ni los gradientes descritos por documentos anteriores.
- Conservar lectura sin scripts, foco visible, skip link y `prefers-reduced-motion`; hay reglas existentes en globals.

[handoff.md](../../handoff.md), [build-plan.md](../../build-plan.md), [content-inventory.md](../../content-inventory.md), [copy.md](../../copy.md), [mockups](../../mockups) y [design-system/tokens.css](../../design-system/tokens.css) son antecedentes. Incluyen Astro 5, tokens v2.1 y alcance anterior. No son instrucciones para restaurar ese diseño. Las guías del directorio padre también mencionan rutas Insights y tokens ausentes hoy; este contexto aclara la evidencia vigente sin editar dichas guías.

## Integraciones y cinco capas en este repo

| Sistema | Integración | Datos | Permisos | Acción | Resultado esperado |
| --- | --- | --- | --- | --- | --- |
| Resend | SDK/API desde endpoint servidor | Datos enviados por el visitante | Clave servidor; scopes del proveedor no verificados aquí | Enviar consulta a buzón configurado | Recepción de consulta; este trabajo no envía mensajes reales |
| Google Fonts | CSS/fuentes desde navegador | Solicitud de recursos | Recurso público; sin OAuth Workspace | Cargar tipografías | Presentación del sitio |
| Quetzal | Script externo en BaseLayout | Flujo posterior no verificable desde este repo | Backend/permisos no inspeccionados | Cargar embed | Widget externo; requiere análisis propio antes de cambiarlo |

**Implementado:** Experience (Astro/estilos/componentes), Integration (Resend y recursos externos), Infrastructure & Data (configuración de despliegue Vercel y contenido local). **No acreditado localmente:** Intelligence propia, MCP Gateway, n8n, orquestación de agentes, Google Workspace/Cloud, CRM, ERP o base de datos de aplicación. [AssistantDemo.astro](../../src/components/home/AssistantDemo.astro) se identifica como demo conceptual; no demuestra una integración LLM. El servicio externo Quetzal puede tener capacidades que no se ven en este repositorio.

Las [cinco capas del Harness](../../.3dev/ARCHITECTURE.md) y Google Ecosystem orientan futuras evaluaciones; no cambian el proveedor actual ni exigen implementar capas faltantes.

## Ejecución y validación local

Instala con el lockfile y usa una versión compatible con `engines` de package.json (mínimo declarado Node 22.12). La validación de esta entrega usa Node 24.14.1/npm 11.11.0; el script de tests ejecuta TypeScript directamente en Node, por lo que no basta asumir soporte sólo por el mínimo declarado.

| Comando actual | Uso |
| --- | --- |
| `npm run dev` | Servidor local Astro |
| `npm test` | Tests locales de `validateContact`; no cubren entrega real de email |
| `npm run build` | Build Astro y salida del adapter Vercel; no despliega |
| `npm run preview` | Preview según soporte del adapter; comprobar disponibilidad antes de depender de él |
| `npm run astro -- --help` | Comandos instalados de Astro |

No existen scripts lint, check ni typecheck en la revisión inspeccionada, ni `@astrojs/check` instalado como dependencia del proyecto. El build no sustituye ese análisis. Descubre de nuevo los scripts antes de futuras tareas; documenta ausencias, no instales herramientas ni actualices dependencias para ocultarlas. Los artefactos `.astro/`, `dist/` y `.vercel/` están ignorados por Git.
