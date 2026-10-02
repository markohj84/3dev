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

## Integration, Automation & AI Agent Layer

Aplicar [INTEGRATIONS](../INTEGRATIONS.md): inventariar externos, internos, APIs, Google Workspace/Cloud, CRM/ERP/ecommerce/DB, eventos y tools necesarias. Una ausencia de oportunidad también debe quedar explicada.

| Sistema | Integración | Datos | Permisos | Acción | Resultado esperado |
| --- | --- | --- | --- | --- | --- |
| [sistema o ninguno justificado] | [contrato/canal] | [categorías] | [alcance] | [lectura/escritura] | [medida] |

| Proceso actual | Problema | Tiempo utilizado | Sistemas involucrados | Posible automatización | Impacto esperado |
| --- | --- | --- | --- | --- | --- |
| [pasos y frecuencia] | [fricción] | [medición o estimación] | [sistemas] | [opción simple] | [métrica] |

- Enlace al [AI Opportunity Map](ai-opportunity-map.md) completado cuando haya oportunidades:
- Decisión API / Webhook / Workflow / MCP / AI Agent y alternativa más simple:
- Si se propone IA: respuestas a [AI-AGENTS](../AI-AGENTS.md), aprobaciones y límites de [SECURITY](../SECURITY.md):

## Plan y aceptación

| Criterio observable | Comprobación | Responsable |
| --- | --- | --- |
| [resultado] | [test/inspección/medición] | [rol/persona] |

- Capas de arquitectura afectadas y capas no necesarias:
- Cambios previstos, secuencia, dependencias y recuperación:
- Riesgos/desconocidos: evidencia necesaria, siguiente acción y responsable:
- Decisiones duraderas: enlaces a ADR; decisiones pendientes que bloquean ejecución:
