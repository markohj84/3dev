# 3DEV AI Stack · Technology Fit / Build vs Buy

Parte de [HARNESS](HARNESS.md). Este documento es la autoridad para **seleccionar tecnología**; [ARCHITECTURE](ARCHITECTURE.md) define las cinco capas, [INTEGRATIONS](INTEGRATIONS.md) define los contratos de conexión, [AI-AGENTS](AI-AGENTS.md) define los agentes y [SECURITY](SECURITY.md) define permisos y aprobación. El principio de elección está en INTEGRATIONS. El catálogo siguiente contiene **candidatos**, no dependencias instaladas ni decisiones universales.

## Decisión por necesidad

Antes de agregar una pieza, compara la capacidad actual y una solución sin nueva plataforma. Avanza sólo si la anterior no satisface los criterios de aceptación:

1. **Código tradicional:** reglas y entradas conocidas → implementar o extender código mantenible.
2. **Workflow:** pasos previsibles y eventos → automatización determinística; evaluar n8n cuando simplifique integración y operación frente a código existente.
3. **LLM:** interpretación o generación que no puede resolverse bien con reglas → probar un modelo en un conjunto representativo; conservar validación y efectos en código.
4. **Agente:** razonamiento **más** herramientas, estado y decisiones variables → evaluar agente y, como primera opción de orquestación con estado, LangGraph. Comparar también una secuencia de workflow con llamadas LLM; no elegir un framework por su nombre.
5. **Acción sensible:** aplicar la aprobación humana obligatoria de [SECURITY](SECURITY.md#aprobación-humana) antes del efecto, independientemente de la tecnología elegida.

Esta secuencia no convierte cada problema en un agente: el primer nivel que cumple el resultado con seguridad y coste aceptable es suficiente. Documenta por qué no bastan niveles anteriores. Para cada paso guarda entradas, salidas, responsabilidad y comprobación observable.

## Build vs Buy

Compara **reutilizar/extender**, **construir**, **comprar/contratar** y **composición mínima** cuando sean opciones reales. Decide con evidencia, no con una puntuación inventada. Antes de BUILD registra:

| Criterio | Evidencia que se debe reunir |
| --- | --- |
| Simplicidad y riesgo de sobrearquitectura | Componentes nuevos, pasos operativos, capacidades sin uso y alternativa menor que satisface el caso |
| Seguridad y gobierno | Datos, identidad, scopes, residencia/retención, aprobación y posibilidad de revocar o aislar |
| Observabilidad y recuperación | Eventos y trazas disponibles, errores, intervención humana, soporte y salida de incidentes |
| Costo total | Implementación, licencias/uso, inferencia, almacenamiento, operación, mantenimiento y capacitación; registrar supuestos y horizonte |
| Portabilidad y salida | Contratos, formatos de exportación, sustitución de proveedor, dependencia de APIs y coste de migración |
| Calidad y rendimiento | Pruebas con casos reales o sintéticos permitidos, latencia, precisión, límites y capacidad del equipo |

Una opción comprada debe poder operarse bajo permisos y métricas del proyecto; una construida debe justificar su mantenimiento. Registra alternativa elegida y descartadas en un [ADR](templates/architecture-decision.md), incluyendo fuente y fecha para capacidades, precios y términos que pueden cambiar. Define una prueba pequeña y un criterio de abandono antes de comprometer la arquitectura.

## Catálogo a evaluar según el proyecto

| Área | Candidatos y criterio de entrada |
| --- | --- |
| Orquestación agéntica | [LangGraph](https://docs.langchain.com/oss/python/langgraph/overview): **opción principal a evaluar** para estado persistente, recorridos complejos y pausas de revisión humana; sólo si el flujo lo necesita. |
| Componentes LLM | [LangChain](https://docs.langchain.com/oss/python/langchain/overview): integraciones y componentes cuando reduzcan trabajo y mantengan contratos claros; LangGraph puede usarse sin LangChain. |
| Automatización determinística | [n8n](https://docs.n8n.io/) o workflows existentes: comparar conectores, operación y coste con código simple. Selección y contratos en [INTEGRATIONS](INTEGRATIONS.md). |
| Integración | MCP, APIs y Webhooks: elegir por la necesidad de tools, comunicación directa o eventos; ver [INTEGRATIONS](INTEGRATIONS.md), no asumir un gateway. |
| Modelos | GPT, Gemini, Claude o modelos locales: comparar resultados por tarea, privacidad, residencia, latencia, coste, disponibilidad y portabilidad; validar restricciones actuales de cada proveedor antes de elegir. |
| Google | Google Workspace (Gmail, Drive, Docs, Sheets, Calendar) y Google Cloud (Cloud Run, Cloud Functions, BigQuery, Vertex AI, Firebase): inventario y decisión por caso en [INTEGRATIONS](INTEGRATIONS.md#evaluar-el-ecosistema-google). |
| Datos | PostgreSQL, almacenamiento de objetos y Vector DB **sólo** si el tipo, volumen, consulta y ciclo de vida de los datos lo justifican; una base existente o búsqueda simple puede bastar. |
| 3DEV Lab | [Hermes Agent](https://hermes-agent.nousresearch.com/docs/) permanece **experimental**: comparar en un entorno aislado con datos no sensibles o autorizados, presupuesto y evaluación; fuera del núcleo obligatorio y de acciones de cliente hasta decidirlo expresamente. |
| Desarrollo | Codex y Claude Code son herramientas de ingeniería que leen el mismo Harness; no implican que el producto en ejecución dependa de ellas. |

Los enlaces del catálogo orientan la comprobación de capacidades; el proyecto debe registrar fuente, fecha, versión y resultado de su propia evaluación. Un proveedor o framework elegido para un cliente no se convierte por ello en estándar obligatorio de 3DEV.

## Salida de Technology Fit

Para cada capacidad propuesta documenta: problema y métrica; código/workflow/LLM/agente comparados; build vs buy; candidato seleccionado; razones de rechazo; datos y permisos; coste estimado y supuestos; observabilidad; responsable operativo; prueba de aceptación; reversibilidad. Si la evidencia falta, el estado es **por validar**, no «seleccionado». Guarda el resultado en el ADR del proyecto y enlaza su Discovery y AI Opportunity Map.
