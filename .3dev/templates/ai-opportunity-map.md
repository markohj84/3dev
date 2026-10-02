# AI Opportunity Map — [proyecto / proceso]

> Copia esta plantilla a `docs/product/ai-opportunity-map-[tema].md`. Ajusta sus enlaces al destino: desde `docs/product/`, los documentos comunes se enlazan con `../../.3dev/…`. Completa cada campo con evidencia o un pendiente con responsable; usa `N/A` justificado cuando no aplique. Borra estas instrucciones al finalizar.

- **Responsable / participantes:**
- **Fecha / estado:** borrador | validado | descartado
- **Objetivo del negocio y métrica de éxito:**
- **Fuentes y evidencia:** observaciones, entrevistas, documentación, rutas del repositorio.
- **Discovery relacionado:** [enlace]
- **Criterios de análisis:** [INTEGRATIONS](../INTEGRATIONS.md)

## Proceso actual y oportunidad

Incluye actividades de copiar, descargar, subir, mandar, revisar, actualizar, capturar, buscar, generar reportes o dar seguimiento que se hayan observado. Distingue mediciones de estimaciones.

| Proceso actual | Problema | Tiempo utilizado y frecuencia | Sistemas involucrados | Posible automatización | Impacto esperado y supuestos |
| --- | --- | --- | --- | --- | --- |
| [Actividad / responsable] | [Fricción / error] | [Minutos × frecuencia; medido/estimado] | [Sistemas / propietarios] | [Mejora propuesta] | [Métrica, ahorro neto y método de validación] |

## Mapa de opciones

En cada celda registra `Sí — función`, `No — motivo` o `Pendiente — evidencia faltante`. Las columnas representan capacidades que pueden combinarse; no son una lista obligatoria de implementación.

| Proceso | API | Webhook | Automation | AI | MCP | Human Approval |
| --- | --- | --- | --- | --- | --- | --- |
| [Proceso] | [Uso / motivo] | [Evento / motivo] | [Reglas / motor justificado] | [Valor frente a reglas] | [Tools / consumidores] | [Acción, aprobador y control] |

## Sistemas, datos y permisos

| Sistema | Integración | Datos | Permisos | Acción | Resultado esperado |
| --- | --- | --- | --- | --- | --- |
| [Nombre / propietario] | [Mecanismo / dirección] | [Campos / clasificación] | [Identidad, scopes/roles, tenant] | [Lectura/escritura / disparador] | [Criterio observable] |

- **Restricciones:** volumen, latencia, cuotas, coste, residencia/retención y dependencias.
- **Situación actual:** capacidades implementadas y evidencia.
- **Propuesta:** componentes nuevos y ubicación en [ARCHITECTURE](../ARCHITECTURE.md).
- **Separación determinística/agéntica:** qué ejecuta reglas y qué decisiones requieren interpretación.

## Decisión y validación

- **Opción elegida y razón:**
- **Alternativa más simple evaluada:** mejora manual / capacidad existente / API / workflow; motivo para aceptarla o descartarla.
- **Beneficio esperado:** línea base, objetivo, coste operativo y cómo se medirá.
- **Preguntas previas de agentes y contratos de tools:** [enlace al análisis y contratos, según AI-AGENTS](../AI-AGENTS.md); `N/A` con motivo si no hay agente.
- **Controles, aprobaciones y riesgos:** [enlace al análisis conforme a SECURITY](../SECURITY.md).
- **Fallos, recuperación y responsable operativo:**
- **Pruebas y criterios de aceptación:** [enlace conforme a QUALITY](../QUALITY.md).
- **Decisión de arquitectura:** [enlace en `docs/decisions/`, si corresponde].
- **Recomendación:** implementar | validar primero | posponer | descartar, con justificación.

| Pendiente / incertidumbre | Evidencia necesaria | Responsable | Fecha / condición para resolver | ¿Bloquea implementación? |
| --- | --- | --- | --- | --- |
| [Pregunta] | [Fuente / prueba] | [Persona] | [Fecha / condición] | [Sí/No y alcance] |
