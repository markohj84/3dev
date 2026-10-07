# AI Opportunity Map · 3DEV Sales OS v0.1

Fecha: 2026-10-06 · Estado: **hipótesis de Discovery**, sin métricas de línea base ni sistemas externos confirmados. Propietario funcional: equipo comercial 3DEV. Contexto en [piloto](3dev-sales-os-v0.1.md); método en [INTEGRATIONS](../../.3dev/INTEGRATIONS.md) y decisión en [TECHNOLOGY-FIT](../../.3dev/TECHNOLOGY-FIT.md). «Candidato» indica algo por evaluar, no instalado.

| Proceso | API | Webhook | Automation | AI | MCP | Human Approval |
| --- | --- | --- | --- | --- | --- | --- |
| Capturar lead | Candidato si existe fuente/CRM con contrato | Candidato para evento de lead | Validación y registro determinísticos | No necesaria de entrada | No justificado | Confirmar fuente y uso de datos |
| Investigar empresa | Candidato para fuentes permitidas | No se ve evento necesario | Recolección y deduplicación | Candidato para síntesis con citas | Sólo si agentes deben descubrir varias tools | Revisar fuentes, datos y afirmaciones |
| Auditar Web/UX/UI/SEO/tecnología | Candidato para comprobaciones disponibles | No necesario de entrada | Checks reproducibles | Candidato para interpretación de hallazgos | Pendiente de tools reales | Validar hallazgos antes de comunicarlos |
| Detectar automatización/IA | Según sistemas confirmados | Según eventos confirmados | Mapear proceso y ahorro | Candidato para generar opciones | No justificado aún | Aprobar prioridades y supuestos |
| Puntuar lead | Datos vía contrato si hay CRM | No necesario de entrada | Reglas explicables a definir | Sólo si mejora frente a reglas | No necesario de entrada | Equipo comercial valida criterio y excepciones |
| Crear estrategia/propuesta | Candidato para datos y documentos autorizados | No necesario de entrada | Plantilla, cálculos y versión | Candidato para borrador basado en evidencia | Sólo si hay tools justificadas | Aprobar contenido, precio, alcance y destinatario |
| Enviar y dar seguimiento | Gmail/WhatsApp/CRM según acceso real | Candidato para respuestas/estado | Programación y registro con límites | No necesaria para disparar envíos | No justificado para envío directo | **Obligatoria** antes de cada acción sensible según política |

**Automation Discovery pendiente:** observar quién copia, descarga, sube, manda, revisa, actualiza, captura, busca, reporta y da seguimiento; medir minutos/frecuencia, errores, sistemas involucrados y efecto esperado. Sin esa observación no se puede calcular ahorro.

**Sistema → integración → datos → permisos → acción → resultado esperado:** fuentes de leads, Gmail, WhatsApp y CRM siguen por confirmar. Para cada uno registrar titular, contrato, categorías de datos, identidad/scopes, lectura/escritura, autorización y comprobación del resultado antes de construir. No hay permiso implícito para investigar o contactar personas reales.

**Technology Fit / Build vs Buy pendiente:** comparar proceso manual, código, workflow, LLM y agente sobre casos internos autorizados; evaluar simplicidad, seguridad, trazabilidad, coste, portabilidad y riesgo de sobrearquitectura. LangGraph entra sólo si el recorrido necesita estado y decisiones variables; n8n sólo si reduce mantenimiento. Registrar ADR después de obtener la línea base y accesos.

**Observabilidad y éxito:** medir tiempo por paso, coste por lead, proporción de hallazgos aceptados, cambios de score/propuesta, aprobación, envíos confirmados y resultado comercial. Correlacionar eventos por identificador interno sin exponer datos personales en logs. Definir umbrales, responsables, retención y recuperación antes de operar con datos reales.
