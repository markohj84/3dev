# 3DEV Sales OS v0.1 · Discovery del piloto interno

Fecha: 2026-10-06 · Estado: **propuesto, no implementado**. Primer usuario: equipo 3DEV. Objetivo: comprobar internamente si una secuencia de investigación, auditoría y propuesta mejora la calidad y el tiempo del trabajo comercial; productizar para clientes sólo después de medir el piloto y decidirlo por separado. Método: [HARNESS](../../.3dev/HARNESS.md), [Technology Fit](../../.3dev/TECHNOLOGY-FIT.md), [AI Opportunity Map inicial](3dev-sales-os-v0.1-ai-opportunity-map.md) y [arquitectura propuesta](../architecture/3dev-sales-os-v0.1.md).

## Recorrido objetivo

| Paso | Salida observable | Control inicial |
| --- | --- | --- |
| Lead | Identificador, fuente, responsable, propósito y estado de contacto | Confirmar procedencia y datos que pueden utilizarse |
| Investigación de empresa | Ficha con fuentes, fechas y hechos separados de inferencias | Revisión de calidad y permisos de fuentes |
| Auditoría Web/UX/UI/SEO/tecnología | Evidencia por hallazgo, gravedad e incertidumbre | Revisión humana antes de usarla comercialmente |
| Oportunidades de automatización e IA | [AI Opportunity Map](../../.3dev/templates/ai-opportunity-map.md) y alternativa sin IA | Technology Fit por oportunidad |
| Lead scoring | Criterios explicables, señales y razonamiento registrados | Equipo comercial valida pesos/umbrales; no usar rasgos sensibles |
| Estrategia comercial y propuesta | Borrador trazable a hallazgos y necesidades del lead | Aprobación humana del contenido, precio, alcance y destinatario |
| Gmail/WhatsApp | Envío sólo por canal disponible y autorizado | Aprobación vinculada al mensaje exacto; confirmar resultado |
| Seguimiento | Próximo paso, fecha, dueño, estado y respuesta | Envíos posteriores bajo la política de aprobación aplicable |
| CRM/analytics | Registro de cambios, conversión, tiempo, coste y resultados | Minimización, control de acceso y retención definidos |

Este es el **flujo objetivo**. La versión v0.1 empieza con un recorrido interno de extremo a extremo usando entradas de prueba o autorizadas y revisión humana; integra sistemas reales por incrementos cuando Discovery confirme acceso y caso de uso. No asume que exista un CRM, proveedor de WhatsApp, API de auditoría, licencia de n8n o agente operativo.

## Hipótesis, medición y límites

- Hipótesis: concentrar datos, hallazgos y propuestas reduce trabajo repetido y mejora consistencia. Medir tiempo por etapa, porcentaje de hallazgos aceptados/corregidos, calidad de propuesta, aprobaciones, coste por lead y seguimiento. Fijar línea base y umbrales **antes** de automatizar el envío.
- Comparar preparación manual, código/workflow y asistencia LLM sobre el mismo conjunto de casos autorizados. Registrar citas o URLs de investigación, fechas, errores y revisiones; no inventar resultados SEO ni datos de empresa.
- Definir reglas de lead scoring con el equipo comercial; cada puntuación debe ser explicable y corregible. La decisión de contactar pertenece a personas autorizadas.
- Usar datos mínimos y permisos por función. Para canales externos, validar identidad, disponibilidad, reglas del proveedor, destinatario, consentimiento/alcance y control de aprobación de [SECURITY](../../.3dev/SECURITY.md). No enviar mensajes durante esta formalización documental.
- Registrar acciones, tiempos, fallos, coste, aprobaciones y resultado sin guardar secretos ni más datos del lead de los necesarios. Determinar retención y eliminación antes de usar datos reales.

## Preguntas que bloquean elecciones técnicas

¿De dónde vendrán los leads y con qué autorización se investigarán? ¿Qué CRM y cuentas de Workspace usa hoy 3DEV? ¿Qué canal/proveedor de WhatsApp, si lo hay, está disponible? ¿Quién aprueba propuestas y envíos? ¿Qué volumen y presupuesto se esperan? ¿Qué datos de auditoría son propios o de terceros? ¿Qué evidencia basta para productizar? Registrar respuestas, responsables y fuentes en el Discovery operativo antes de construir conexiones.

## Criterio para cerrar v0.1

Un recorrido de prueba produce ficha, auditoría con fuentes, mapa de oportunidades, scoring explicable, propuesta revisada, estado de aprobación, seguimiento y registro analítico. Las pruebas deben cubrir datos faltantes, información contradictoria, rechazo de propuesta, aprobación ausente, fallo del canal, duplicados y recuperación. El alcance de envío real se habilita sólo cuando permisos, contrato de la tool, revisión humana y verificación del resultado estén implementados y probados. Un piloto útil no implica por sí mismo que esté listo para clientes.
