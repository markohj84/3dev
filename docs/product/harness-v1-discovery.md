# Discovery · Adopción del Harness v1.0

Fecha: 2026-10-01. Responsable de implementación: Codex; propietario del producto: Marco. Especificación: solicitud de implementación del 3DEV AI Development Harness v1.0, continuando «Evolución 3DEV 3.0».

## Problema y resultado

Centralizar ingeniería de producto para que Codex y Claude Code sigan la misma metodología, con contexto por cliente y mínima complejidad. Usuarios: equipo 3DEV y sus agentes de desarrollo. Resultado: entradas pequeñas que conducen a reglas con una sola autoridad, plantillas reutilizables y validación local verificable.

La experiencia aquí es la navegación del repositorio: entrada → metodología → referencia por alcance → evidencia del proyecto. UX pública, responsive, SEO y funcionalidad del sitio quedan fuera de esta adopción.

## Evidencia y reutilización

- Estado inicial limpio, rama `main`, HEAD `bc68aa3`; `origin/main` almacenado localmente en `4f91df5`, un commit adelante. No se ejecuta fetch/pull ni se altera esa diferencia.
- No hay adaptadores en el repo; sí guías del directorio padre. README aún es el starter de Astro.
- Reutilizar tests/build, estructura Astro, tokens activos y documentación histórica como evidencia. Conservar código, dependencias y configuración.
- [Contexto inspeccionado](../architecture/project-context.md) registra diseño v3, rutas e integraciones reales. Resuelve diferencias respecto de documentación previa sin restaurar funcionalidades antiguas.

## Discovery de integración y automatización

El inventario Sistema → integración → datos → permisos → acción → resultado está en el contexto, evitando duplicarlo aquí. Para este cambio no se requieren nuevas conexiones a Resend, Quetzal, Workspace, Cloud, CRM, ERP ni DB.

| Proceso actual | Problema | Tiempo utilizado | Sistemas involucrados | Posible automatización | Impacto esperado |
| --- | --- | --- | --- | --- | --- |
| Repetir contexto y criterios entre agentes | Deriva y reglas inconsistentes | Sin medición; no se afirma ahorro cuantificado | Repo, Codex, Claude Code | Entradas Markdown hacia fuente común; no necesita runtime adicional | Una edición por regla y criterios de entrega consistentes |
| Revisar cambios y ejecutar validaciones | Posibilidad de omitir comprobaciones | Sin medición | Git, scripts locales | Reutilizar scripts existentes guiados por QUALITY | Evidencia explícita de tests, build y alcance |

| Proceso | API | Webhook | Automation | AI | MCP | Human Approval |
| --- | --- | --- | --- | --- | --- | --- |
| Adoptar metodología compartida | No | No | Lectura de instrucciones por agente | Agentes de desarrollo existentes; sin nueva IA de producto | No necesario | Edición local autorizada; commit/push/deploy requieren autorización explícita |
| Validar entrega documental | No | No | Scripts locales existentes | Revisión asistida, no nueva función | No necesario | Sin efectos externos; no realizar envíos reales |

## Plan y criterios verificables

1. `.3dev/` contiene workflow, roles, arquitectura, calidad, seguridad, integraciones, IA y cuatro plantillas; comprobar cobertura y referencias.
2. AGENTS/CLAUDE remiten al mismo Harness; comprobar que no duplican políticas ni exigen plugins.
3. El modelo de cinco capas, selección determinística/agéntica, Google Ecosystem y controles humanos se documentan como criterios; comprobar que no se presentan como infraestructura existente.
4. Contexto del sitio separado de metodología; ADR registra decisión y coste; informe conserva validaciones y pendientes.
5. Ningún cambio en aplicación/configuración/dependencias; comprobar diff y archivos nuevos. Ejecutar tests y build existentes; señalar lint/typecheck ausentes.
6. Sin commit, push, deploy ni cambios remotos; entrega local revisable.

Roles pertinentes: Software Architect, Product Strategist, QA y AI Engineer; las perspectivas UX/Frontend/Backend/Accessibility/SEO/Performance se incorporan a las reglas para futuras tareas. No se simula investigación de usuarios o auditoría completa del sitio.

Plan: [implementación](../superpowers/plans/2026-10-01-harness-v1.md). Decisión: [ADR-0001](../decisions/0001-adopt-ai-development-harness.md). Recuperación: revertir únicamente el README de esta entrega y retirar los archivos documentales añadidos tras comprobar cambios posteriores.
