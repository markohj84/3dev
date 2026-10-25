# ADR-0004 · Seleccionar skills de diseño por tarea

Fecha: 2026-10-25 · Estado: aceptada.

## Contexto

Claude tiene skills de diseño instaladas con funciones solapadas. El Harness ya fija roles y calidad, pero no indicaba cómo escoger una skill según el trabajo. Copiar sus instrucciones al repositorio duplicaría reglas, acoplaría los proyectos a una instalación local y dificultaría mantenerlas al día.

## Decisión

Añadir [DESIGN-SKILLS.md](../../.3dev/DESIGN-SKILLS.md) como guía reutilizable de selección y enlazarla desde [HARNESS.md](../../.3dev/HARNESS.md). Codex y Claude Code conservan sus adaptadores ligeros. El agente comprueba disponibilidad, lee la skill elegida y subordina sus recetas al contexto y design system del proyecto. La selección no instala dependencias ni autoriza cambios remotos.

## Consecuencias

Cada proyecto puede reutilizar el mismo criterio sin llevarse las skills ni rutas personales. Una skill ausente no bloquea el trabajo; se aplican las convenciones del proyecto y se informa la limitación cuando afecta el resultado. La primera adopción no cambia la interfaz ni el runtime de 3dev.mx.
