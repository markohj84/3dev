# Skills de diseño · selección por tarea

Parte de [HARNESS.md](HARNESS.md). Esta guía decide **cuándo consultar** una skill de diseño disponible en Codex o Claude Code; no instala skills ni copia sus instrucciones. [QUALITY.md](QUALITY.md) conserva los criterios de calidad y el contexto de cada proyecto conserva sus decisiones de producto, stack, tokens y componentes.

## Antes de usar una skill

1. Lee el contexto del proyecto y las fuentes activas de diseño y código. Define la tarea concreta: identidad, exploración, construcción, revisión o verificación.
2. Comprueba las skills disponibles en el agente actual. Elige **una skill principal** de la tabla; añade otra sólo si cubre una necesidad distinta. Lee su `SKILL.md` antes de aplicarla. Si falta, continúa con las convenciones del proyecto y registra la limitación cuando importe.
3. Adapta sus propuestas al producto existente. Conserva tokens, componentes, stack, contenido y restricciones del proyecto; una receta genérica no justifica reemplazarlos. Evalúa nuevas dependencias con [TECHNOLOGY-FIT.md](TECHNOLOGY-FIT.md).
4. Para trabajo importante, anota en PLAN qué skill se eligió y por qué; en DELIVER indica qué se aplicó y cómo se comprobó. No crees documentos adicionales para una corrección pequeña.

## Enrutamiento

| Tarea | Skill a consultar | Condición |
| --- | --- | --- |
| Identidad, voz o coherencia de marca | `ckm:brand` | `ckm:design` sólo para piezas o identidad visual solicitadas. |
| Explorar estilos, paletas o patrones antes de decidir | `ui-ux-pro-max` | Usa sus opciones como referencias; la dirección final debe responder al usuario y la marca. |
| Construir una interfaz o página nueva | `frontend-design` | En React/Next.js, `design-taste-frontend` puede ser alternativa cuando importan sus reglas de ingeniería; elige una como principal. |
| Revisar, rediseñar o pulir una interfaz existente | `impeccable` | Contrasta hallazgos con el producto y el código actual. |
| Definir o ampliar tokens y componentes compartidos | `ckm:design-system` | Mantén la arquitectura de tokens que el proyecto ya utiliza. |
| Afinar interacciones, transiciones y detalles de uso | `emil-design-eng` | Aplica movimiento sólo donde aporta claridad; respeta reducción de movimiento. |
| Resolver patrones de interacción web | `user-experience` | Consulta la guía específica que corresponda al componente o estado. |
| Trabajar sobre un diseño de Figma | Skill `figma:*` correspondiente | Sólo con archivo o nodo disponible y el plugin habilitado; sigue sus prerrequisitos. |
| Añadir o ajustar componentes shadcn/ui | `shadcn` o `ckm:ui-styling` | Sólo si el proyecto ya usa shadcn/ui o el alcance autoriza incorporarlo. |
| Crear recursos visuales nuevos | `higgsfield-generate` | Sólo cuando la tarea necesita imágenes o vídeo y hay acceso autorizado. |
| Auditar accesibilidad, rendimiento, SEO o pautas web | `accessibility`, `performance`, `seo-audit` o `web-design-guidelines` | Elige la disciplina afectada y comprueba resultados con evidencia; pueden complementar la skill principal. |

La investigación UX y las decisiones de producto siguen los roles y el Discovery del [HARNESS.md](HARNESS.md); una skill visual no sustituye entrevistas, datos de usuarios ni validación. Los nombres de la tabla son identificadores, no rutas locales: al reutilizar `.3dev/` en otro proyecto, comprueba disponibilidad y el contexto de ese repositorio. `AGENTS.md` y `CLAUDE.md` llegan aquí por el mismo Harness.
