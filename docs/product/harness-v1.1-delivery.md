# Entrega · 3DEV AI Stack en Harness v1.1.0

Fecha: 2026-10-06 · Base inspeccionada: `81a9c35` en `main` · Alcance: metodología y diseño del piloto, sin implementación del Sales OS.

## Resultado

- [HARNESS](../../.3dev/HARNESS.md) incorpora el proceso de diseño solicitado y conserva el workflow de implementación y entrega.
- [TECHNOLOGY-FIT](../../.3dev/TECHNOLOGY-FIT.md) es la autoridad única del catálogo AI Stack, selección progresiva y Build vs Buy. [ADR-0002](../decisions/0002-adopt-ai-stack-technology-fit.md) registra su adopción compatible.
- Los adaptadores Codex/Claude, arquitectura, integración, agentes, calidad, contexto y cuatro plantillas apuntan a esas reglas sin instalar dependencias.
- El [piloto Sales OS](3dev-sales-os-v0.1.md), su [mapa inicial](3dev-sales-os-v0.1-ai-opportunity-map.md) y [arquitectura](../architecture/3dev-sales-os-v0.1.md) distinguen recorrido objetivo, hipótesis y decisiones pendientes. No se realizaron consultas a leads ni envíos.

## Validaciones

| Comprobación | Resultado |
| --- | --- |
| `npm test` | 6 pruebas aprobadas, 0 fallos; comprueban el validador de contacto local |
| `ASTRO_TELEMETRY_DISABLED=1 NO_UPDATE_NOTIFIER=1 npm run build` | Build Astro/Vercel completado; 5 rutas prerenderizadas, sin despliegue |
| Enlaces, anclas y espacios finales de los 19 documentos | 150 referencias locales resueltas; sin errores |
| `git diff --check` y revisión de alcance | Sin errores; 13 documentos actualizados y 6 nuevos; sin cambios de código, dependencias ni configuración |

Lint, check y typecheck no están configurados en esta base; no se declaran aprobados. El build y las pruebas existentes no validan el futuro Sales OS, integraciones reales, calidad de modelos ni controles de seguridad ejecutables. La revisión documental comprobó que el principio rector conserva un solo propietario y que el proceso nuevo convive con el ciclo BUILD → TEST → REVIEW → IMPROVE → DELIVER.

## Decisiones y pendientes

La arquitectura de cinco capas y la aprobación humana siguen siendo reglas vigentes. LangGraph es un candidato preferente para orquestación agéntica con estado, no una instalación automática; Hermes Agent queda en 3DEV Lab experimental. Las capacidades y el coste de proveedores se revalidan por proyecto.

Sales OS v0.1 requiere confirmar fuente/permiso de leads, herramientas actuales, responsables de aprobación, canales de salida, presupuesto y línea base antes de escoger proveedor o ejecutar acciones reales. Productizar para clientes depende de resultados del piloto y de otra decisión explícita.

Estado al cierre de la preparación documental (2026-10-06): cambios **locales sin commit, push ni despliegue**. El sitio publicado aún no había cambiado. Próximo trabajo del piloto: Discovery operativo, medición de línea base, Technology Fit con sistemas confirmados y ADR de selección; requiere un encargo independiente de implementación.
