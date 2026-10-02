# ADR-0001 · Adoptar una fuente única de ingeniería

Fecha: 2026-10-01. Estado: adoptada para la implementación local solicitada; no implica aprobación de publicación. Especificación y límites: [Discovery](../product/harness-v1-discovery.md).

## Contexto

El sitio 3DEV 3.0 ya está integrado en HEAD y el usuario informa que fue publicado. El repositorio no tiene entradas propias para agentes y conserva documentación de versiones anteriores. Codex y Claude Code necesitan compartir una metodología sin mantener copias divergentes ni alterar el producto.

## Alternativas

| Opción | Consecuencia | Decisión |
| --- | --- | --- |
| Harness completo en cada adaptador | Lectura inicial grande y cambios duplicados | Descartada |
| Una metodología Markdown con referencias por alcance | Una autoridad por regla, lectura portable y revisión con Git | Elegida |
| Generador de reglas, plugins obligatorios o servicio central | Añade dependencias, mantenimiento y estados de sincronización | Descartada: no hay necesidad que lo justifique |

## Decisión

- `.3dev/HARNESS.md` dirige el workflow y las referencias temáticas. Cada documento temático es dueño de sus reglas; las plantillas las aplican por enlace.
- `AGENTS.md` y `CLAUDE.md` son entradas equivalentes y mínimas; no dependen de sintaxis de importación de un proveedor ni copian políticas.
- `docs/product/` conserva Discovery y entrega, `docs/architecture/` el contexto del repo y `docs/decisions/` las decisiones. El plan es evidencia de esta adopción, no una regla global.
- Las cinco capas pertenecen al modelo conceptual. No se añade gateway MCP, LLM, n8n, Google Cloud ni otro runtime. La conexión necesaria para este caso son referencias entre documentos.
- Se trabaja sobre el HEAD inspeccionado sin incorporar el commit adicional de contacto de la referencia remota local. La divergencia es independiente del Harness.

## Consecuencias y validación

El coste es mantener referencias y contexto actualizados cuando cambie el repo. A cambio, la metodología puede adoptarse en otros proyectos creando contexto nuevo y conservando sus convenciones. Markdown orienta conducta; no implementa técnicamente OAuth, RBAC, aprobaciones o aislamiento: los productos que incorporen tools deben materializar los controles de [SECURITY](../../.3dev/SECURITY.md).

La validación comprueba cobertura, enlaces, lectura desde ambos adaptadores, diff limitado a documentación, tests y build. Ver [entrega](../product/harness-v1-delivery.md) para resultados reales. No hay migración de datos ni efecto sobre solicitudes del sitio.

Reconsiderar si otro agente requiere adaptación específica, aparecen contradicciones frecuentes, hay varios repos que necesitan sincronizar versiones o se demuestra necesidad de validación automática adicional. La aprobación humana de operaciones externas sigue siendo independiente de esta decisión.
