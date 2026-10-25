# Entrega · selección de skills de diseño en Harness v1.2.0

Fecha: 2026-10-25 · Estado al cerrar la preparación: cambios locales, pendientes de publicación.

## Cambio

- [DESIGN-SKILLS.md](../../.3dev/DESIGN-SKILLS.md) enruta las skills de diseño disponibles según la tarea, con el contexto y design system de cada proyecto como fuente de decisión.
- [HARNESS.md](../../.3dev/HARNESS.md) incorpora el enlace por alcance y sube a v1.2.0. [README.md](../../README.md) actualiza su referencia. [ADR-0004](../decisions/0004-route-design-skills-by-task.md) registra la decisión.
- `AGENTS.md` y `CLAUDE.md` ya conducen al Harness compartido; se conservan como adaptadores ligeros.

## Validación y límites

Se comprobaron las rutas Markdown de los cinco documentos de esta actualización y la disponibilidad en Claude de los 16 identificadores de skills listados. `git diff --check` no reportó errores. `npm test` pasó 6/6; `npm run check:strategy` confirmó la oferta v2.0.0; `npm run build` terminó correctamente. No se modificaron UI, código, dependencias ni configuración. Estas comprobaciones no verifican el uso real de cada skill en una tarea futura; la disponibilidad de skills y plugins debe comprobarse de nuevo en cada entorno/proyecto.
