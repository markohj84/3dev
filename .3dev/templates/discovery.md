# Discovery · [iniciativa]

Plantilla de [HARNESS](../HARNESS.md). Copiar a `docs/product/[iniciativa]-discovery.md`, completar y ajustar enlaces relativos. Distinguir hechos, hipótesis y decisiones; usar «no aplica» con motivo. No almacenar secretos o datos personales reales de prueba.

## Contexto y resultado

- Proyecto / cliente / responsable / fecha:
- Tipo de producto y descripción:
- Problema, usuarios, tarea y conversión principal:
- Objetivo de negocio, línea base, resultado medible y plazo:
- Evidencia disponible (investigación, analítica, referencias) e hipótesis pendientes:
- Alcance / fuera de alcance / restricciones / autorizaciones vigentes:

## Search → Understand → Reuse → Modify → Create

- Rama/revisión, estado local y fuentes inspeccionadas:
- Arquitectura, flujos principales, tecnologías y convenciones actuales:
- Componentes, contratos, contenido y pruebas reutilizables:
- Qué mejorar; por qué algo existente no cubre la necesidad, si se propone crear:
- Riesgos técnicos/UX, contradicciones e información faltante que cambia la decisión:

## Experiencia

- Recorrido e información necesaria en cada paso:
- Fricciones, navegación, jerarquía y estados (carga/vacío/error/éxito):
- Design system y requisitos responsive, accesibilidad, SEO y rendimiento:
- Roles de HARNESS pertinentes y responsable de revisión:

## Solution Design y AI Opportunity Map

- Opciones de solución, incluida la mejora de código/proceso actual, y criterio para elegir:
- Procesos con oportunidad de IA, automatización o ninguna; enlace al [AI Opportunity Map](ai-opportunity-map.md) inicial:
- Qué se necesita demostrar antes de seleccionar una tecnología:

## Automation Discovery e integración

Aplicar [INTEGRATIONS](../INTEGRATIONS.md): inventariar externos, internos, APIs, Google Workspace/Cloud, CRM/ERP/ecommerce/DB, eventos y tools necesarias. Una ausencia de oportunidad también debe quedar explicada.

| Sistema | Integración | Datos | Permisos | Acción | Resultado esperado |
| --- | --- | --- | --- | --- | --- |
| [sistema o ninguno justificado] | [contrato/canal] | [categorías] | [alcance] | [lectura/escritura] | [medida] |

| Proceso actual | Problema | Tiempo utilizado | Sistemas involucrados | Posible automatización | Impacto esperado |
| --- | --- | --- | --- | --- | --- |
| [pasos y frecuencia] | [fricción] | [medición o estimación] | [sistemas] | [opción simple] | [métrica] |

- Cambios al mapa tras observar tareas manuales, volumen, fallos y responsables:
- Decisión API / Webhook / Workflow / MCP / AI Agent y alternativa más simple:
- Si se propone IA: respuestas a [AI-AGENTS](../AI-AGENTS.md), aprobaciones y límites de [SECURITY](../SECURITY.md):

## Technology Fit, arquitectura y gobierno

- Resultado código/workflow/LLM/agente y Build vs Buy según [TECHNOLOGY-FIT](../TECHNOLOGY-FIT.md), con alternativa descartada y evidencia:
- Cinco capas afectadas, datos, contratos y [ADR](architecture-decision.md) pertinente:
- Permisos, secretos, aislamiento, riesgos y aprobación conforme a [SECURITY](../SECURITY.md):
- Observabilidad: eventos, correlación, coste, dueño, alerta y recuperación según [QUALITY](../QUALITY.md):

## Plan y aceptación

| Criterio observable | Comprobación | Responsable |
| --- | --- | --- |
| [resultado] | [test/inspección/medición] | [rol/persona] |

- Capas de arquitectura afectadas y capas no necesarias:
- Cambios previstos, secuencia, dependencias y recuperación:
- Riesgos/desconocidos: evidencia necesaria, siguiente acción y responsable:
- Decisiones duraderas: enlaces a ADR; decisiones pendientes que bloquean ejecución:
