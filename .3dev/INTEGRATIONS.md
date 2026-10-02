# 3DEV — Integration, Automation & AI Agent Layer

Lee este documento en DISCOVER y PLAN cuando el producto consulte sistemas externos, mueva datos, automatice procesos o necesite tools para agentes. Usa [HARNESS](HARNESS.md) para el workflow y [ARCHITECTURE](ARCHITECTURE.md) para ubicar cada componente en las cinco capas.

**Deterministic when possible. Agentic when valuable. Human approval when necessary.**

Esta capa aporta criterios de diseño; la existencia de este documento no implica tener agentes, MCP, n8n o infraestructura desplegada. La arquitectura híbrida de referencia está en [ARCHITECTURE](ARCHITECTURE.md); documenta por separado qué existe, qué se propone y qué se descarta.

## Discovery de sistemas y procesos

1. Identifica con evidencia del repositorio, documentación y responsables: APIs, Google Workspace/Google Cloud, CRM, ERP, ecommerce, bases de datos, servicios internos y sistemas del cliente. Registra propietario, consumidores, restricciones y fuente; marca como pendiente lo que falta confirmar.
2. Busca tareas descritas como **copiar, descargar, subir, mandar, revisar, actualizar, capturar, buscar, generar reporte y dar seguimiento**. Observa el proceso antes de recomendar tecnología.
3. Documenta cada oportunidad mediante **Proceso actual → Problema → Tiempo utilizado → Sistemas involucrados → Posible automatización → Impacto esperado**. Incluye frecuencia, volumen, errores, coste operativo y responsable. Distingue medición de estimación; explicita supuestos.
4. Para cada conexión propuesta registra **Sistema → integración → datos → permisos → acción → resultado esperado**. Añade dirección del flujo, identidad ejecutora, lectura/escritura, clasificación de datos, límites, dependencias y criterio verificable de éxito.
5. Completa el [AI Opportunity Map](templates/ai-opportunity-map.md). Cierra Discovery cuando cada oportunidad tenga evidencia, responsable, beneficio esperado, riesgos y decisión; usa `N/A` con motivo en lo que no aplica. Una incógnita es pendiente, no `N/A`.

Guarda los resultados del cliente/proyecto en `docs/product/`; documenta contratos y flujos concretos en `docs/architecture/`. Registra decisiones de arquitectura significativas siguiendo [ARCHITECTURE](ARCHITECTURE.md). Mantén aquí la metodología común.

## Elegir la arquitectura más simple

Compara primero la mejora del proceso y las capacidades ya disponibles. Selecciona sólo los componentes que aporten un resultado comprobable; se pueden combinar cuando cumplen funciones distintas.

| Opción | Elegir cuando | Evidencia exigida para decidir |
| --- | --- | --- |
| API | Una aplicación necesita consultar o ejecutar una operación definida. | Contrato disponible, autenticación, permisos y manejo de fallos. |
| Webhook | Un evento debe avisar a otro sistema sin sondeos continuos. | Emisor, evento, entrega, verificación, duplicados y recuperación. |
| Workflow / Automation | Los pasos y reglas son conocidos y repetibles. | Flujo, excepciones, responsables y operación. Evaluar n8n cuando sus conectores y mantenimiento reduzcan trabajo frente a lo existente. |
| MCP | Uno o más agentes necesitan descubrir y usar tools mediante una interfaz estandarizada. | Consumidores reales, tools necesarias y ventaja frente a una integración directa. MCP no reemplaza necesariamente las APIs que ejecutan las operaciones; consulta la [arquitectura del protocolo](https://modelcontextprotocol.io/docs/learn/architecture). |
| AI Agent | El valor depende de interpretar contexto, lenguaje o decidir entre pasos variables. | Beneficio frente a reglas/workflows, evaluación del modelo, límites de autonomía y criterios de [AI-AGENTS](AI-AGENTS.md). |

Para cada decisión compara alternativas, coste total, latencia, fiabilidad, datos/permisos, reversibilidad y capacidad de mantenimiento. Documenta por qué una opción más simple no basta antes de añadir otra capa. Una solución sin IA o sin MCP es un resultado válido.

Separa dos recorridos: las APIs, Webhooks y workflows ejecutan reglas determinísticas; los LLM, MCP y tools gestionan la parte agéntica justificada. Conserva autorizaciones y reglas del negocio fuera de las decisiones del modelo. La arquitectura de referencia no obliga a introducir un gateway o un motor de automatización en todos los proyectos.

## Contratos y operación

Antes de BUILD, cada integración debe tener propietario, datos de entrada/salida, contrato y versión compatibles, autenticación/autorización referenciada a [SECURITY](SECURITY.md), errores, límites, observabilidad y plan de recuperación. Para una tool expuesta a un agente, usa el contrato canónico de [AI-AGENTS](AI-AGENTS.md#contrato-obligatorio-de-cada-tool).

- **APIs:** valida respuestas, define timeouts y reintentos acotados con espera; distingue errores transitorios de permanentes. Para escrituras, define idempotencia o detección de duplicados antes de reintentar. Limita concurrencia según las cuotas y verifica resultados reales.
- **Webhooks:** documenta evento, esquema, identificador, orden esperado y política de entrega. Verifica autenticidad y protección contra replay según [SECURITY](SECURITY.md). Deduplica por identificador estable; diseña procesamiento idempotente, reintentos y recuperación de entregas fallidas. Acepta un evento sólo cuando exista una forma fiable de conservarlo/procesarlo.
- **Workflows:** explicita disparador, pasos, condiciones, excepciones, caducidad y quién retoma un fallo. Las aprobaciones son estados persistidos del flujo según [SECURITY](SECURITY.md#aprobación-humana), no instrucciones informales al modelo. Define compensación o recuperación manual cuando una secuencia quede a medias.
- **Operación:** registra correlación entre evento, workflow, tool y operación externa; mide éxito, fallos, duración y coste con datos minimizados. Define quién recibe incidentes y cómo pausar o desactivar el flujo. Conserva documentación suficiente para operarlo sin depender del autor.

Valida fallos de proveedor, duplicados, límites, permisos y recuperación según [QUALITY](QUALITY.md). No declares una integración operativa por la sola existencia de configuración, un mock o una respuesta de éxito sin comprobar su efecto.

## Evaluar el ecosistema Google

Evalúa estas opciones en Discovery; seleccionarlas requiere un caso de uso, disponibilidad confirmada, acceso autorizado y coste razonable. No son dependencias predeterminadas ni una lista para instalar.

| Área a evaluar | Servicios candidatos | Pregunta de decisión |
| --- | --- | --- |
| Colaboración y procesos | Google Workspace: Gmail, Drive, Docs, Sheets, Calendar; Google APIs | ¿Dónde trabaja hoy el usuario y qué lectura/escritura reduce pasos manuales? |
| Datos y analítica | Google Cloud, BigQuery, bases de datos existentes | ¿Dónde residen los datos y qué consultas/controles hacen falta? |
| Aplicaciones y ejecución | Cloud Run, Cloud Functions, Firebase | ¿Qué opción encaja con la carga, el equipo, los límites y la operación existentes? |
| Inteligencia | Gemini, Vertex AI | ¿Qué tarea necesita IA y cómo se medirán calidad, coste y tratamiento de datos? |

Verifica capacidades vigentes, disponibilidad, cuotas, precios y requisitos de acceso en documentación oficial al elegir una implementación. Registra fuente y fecha en la decisión del proyecto. Aplica los mismos criterios a proveedores alternativos; el Harness permanece agnóstico al proveedor y al agente.
