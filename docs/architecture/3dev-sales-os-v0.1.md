# 3DEV Sales OS v0.1 · Arquitectura conceptual

Estado: propuesta para el [piloto interno](../product/3dev-sales-os-v0.1.md), **sin componentes instalados por este documento**. La decisión de infraestructura se toma después de [Technology Fit](../../.3dev/TECHNOLOGY-FIT.md) y queda en un ADR propio del piloto. Aplicar las [cinco capas](../../.3dev/ARCHITECTURE.md) sin crear servicios vacíos.

| Capa | Responsabilidad prevista | Decisión pendiente |
| --- | --- | --- |
| Experience | Vista para revisar lead, evidencias, score, propuesta, aprobación y seguimiento | ¿Interfaz nueva o herramientas actuales? |
| Intelligence | Investigación asistida, síntesis de auditoría y borrador de estrategia/propuesta donde un LLM supere reglas | Modelo y evaluación por tarea; no asignar decisión comercial final al modelo |
| Orchestration | Proceso de estados, reanudación, revisión y seguimiento | Código/workflow existente primero; LangGraph si se justifica agente con estado |
| Integration | Fuentes permitidas, APIs/Webhooks/MCP, Gmail/WhatsApp y CRM cuando haya contratos reales | ¿Qué sistemas y permisos existen? MCP sólo si hay consumidores de tools |
| Infrastructure & Data | Fichas, evidencias, aprobaciones, auditoría, almacenamiento y métricas | Reutilizar infraestructura actual; evaluar PostgreSQL, Storage o Vector DB sólo por necesidad |

## Límite entre decisiones y efectos

El camino determinístico registra el lead, valida entradas, calcula reglas de score acordadas, controla estados/aprobaciones y ejecuta envíos autorizados. Una etapa LLM puede investigar fuentes permitidas, resumir, proponer hallazgos y redactar; entrega datos estructurados y evidencia para revisión. Un agente con tools sólo entra si el recorrido variable y el estado justifican su coste. No se otorgan permisos por una respuesta del modelo.

```text
Lead → investigación/evidencia → auditoría → oportunidad → scoring → propuesta
                                             ↓
                              revisión y aprobación humana
                                             ↓
                          canal autorizado → seguimiento → CRM/analytics
```

Gmail/WhatsApp, CRM y cualquier fuente externa son **integraciones propuestas, no verificadas**. Cada conexión debe cumplir Sistema → integración → datos → permisos → acción → resultado y el contrato operativo de [INTEGRATIONS](../../.3dev/INTEGRATIONS.md). Cada tool agéntica requiere los campos de [AI-AGENTS](../../.3dev/AI-AGENTS.md). [SECURITY](../../.3dev/SECURITY.md) gobierna límites, secretos, aislamiento y aprobación; los envíos se bloquean si la autorización falta o cambian mensaje/destinatario.

## Observabilidad y recuperación

Correlacionar lead, versión de evidencia, etapa, decisión, aprobación, llamada de tool y efecto externo. Medir duración, coste, errores, duplicados, revisión de hallazgos, aceptación de propuestas y respuesta comercial. Redactar datos personales de trazas; definir acceso y retención. Si falla una etapa, conservar estado y permitir reanudación o intervención humana sin duplicar envíos. Verificar estos controles con [QUALITY](../../.3dev/QUALITY.md) antes de operaciones reales.

Primera prueba técnica: recorrer casos internos o datos autorizados sin envío real, comparar calidad/tiempo/coste con el proceso actual y registrar el ADR de selección. El piloto puede seguir siendo manual o semiautomatizado si Technology Fit demuestra que cumple el objetivo con menos riesgo.
