# AI Agents y contratos de tools

Lee este documento al proponer o modificar un agente, RAG, acceso del modelo a datos externos o tools. Sigue [HARNESS](HARNESS.md); decide primero si hace falta IA con [INTEGRATIONS](INTEGRATIONS.md). Este documento define el diseño del agente y el contrato de tools; [SECURITY](SECURITY.md) es la autoridad de permisos, aprobación y controles de seguridad.

## Justificación antes de implementar

Responde por escrito, con evidencia o pendientes explícitos:

1. ¿Necesita IA? ¿Qué resultado medible mejora y cuál es la línea base?
2. ¿Sería mejor una automatización tradicional? ¿Por qué las reglas o workflows no bastan?
3. ¿Consulta información externa? ¿Qué fuentes, frescura y trazabilidad necesita?
4. ¿Ejecuta acciones? ¿Cuáles son sus efectos y cómo se verifica el resultado?
5. ¿Qué tools necesita y qué componente determinístico ejecuta cada operación?
6. ¿Qué datos puede consultar y cuáles quedan fuera de su alcance?
7. ¿Qué requiere aprobación humana y quién está autorizado para aprobar?
8. ¿Qué puede automatizarse dentro del alcance concedido y con qué límites?
9. ¿Hay acciones irreversibles? ¿Cómo se previenen errores y se recupera el proceso?

Registra las respuestas en `docs/architecture/` y enlázalas desde la decisión correspondiente. Cierra PLAN cuando existan objetivo, alternativas, contratos, responsable, límites, riesgos y evaluación acordada; una incertidumbre crítica de autorización o datos bloquea la acción dependiente. Usa `N/A` con motivo en las preguntas no aplicables.

## Diseño del agente

- Define tarea, usuario/tenant, fuentes permitidas, criterio de éxito, condiciones de parada y alternativa manual. Registra modelo/proveedor elegidos y sus restricciones en el contexto del proyecto, no en la metodología común.
- Separa interpretación/planificación del modelo de validación, autorización y ejecución determinísticas. Mantén las reglas del negocio y los efectos externos en servicios controlados. Ubica los componentes en las capas de [ARCHITECTURE](ARCHITECTURE.md).
- Limita pasos, tiempo, tokens, coste, concurrencia y reintentos. Al alcanzar un límite, devuelve estado y trabajo pendiente; evita bucles o delegación sin presupuesto.
- Para RAG, define procedencia, actualización, eliminación y autorización de cada fuente. Conserva trazabilidad de las respuestas; ante evidencia insuficiente, identifica la incertidumbre o escala al responsable.
- Maneja errores y resultados parciales explícitamente. Un texto del modelo que diga “completado” no demuestra ejecución: confirma el resultado mediante la respuesta validada de la tool y, donde corresponda, una lectura posterior.

## Contrato obligatorio de cada tool

Cada tool debe ser **específica, predecible, limitada, auditable y segura**. Prefiere una operación del negocio con entradas tipadas y efectos acotados. Una interfaz general de comandos o consultas necesita una justificación y controles adicionales por su alcance.

Documenta los siguientes campos antes de exponerla; todos son obligatorios, aceptando `N/A` razonado cuando proceda. Guarda el contrato concreto en `docs/architecture/` y enlázalo desde la integración. No copies esta definición de campos a otros documentos normativos.

| Campo | Contenido verificable |
| --- | --- |
| **Name** | Nombre estable, propósito único y versión del contrato cuando cambie su compatibilidad. |
| **Description** | Cuándo usarla, precondiciones, límites y efectos de lectura/escritura. |
| **Inputs** | Esquema, campos obligatorios, tipos, formatos, límites y validación; origen confiable del contexto de usuario/tenant. |
| **Outputs** | Esquema, estados de éxito/parcial/fallo, identificadores verificables y datos mínimos necesarios. |
| **Authentication** | Identidad ejecutora, mecanismo de autenticación, origen/rotación/revocación de credenciales y referencia a su configuración segura. |
| **Permissions** | Roles/scopes, recursos/tenants autorizados y lugar donde se comprueba autorización por llamada. |
| **Errors** | Códigos y condiciones, recuperación, timeouts, reintentos permitidos e idempotencia; distinguir resultado desconocido de fallo confirmado. |
| **Rate limits** | Cuotas del proveedor, límites por usuario/tenant, concurrencia, presupuesto y respuesta al agotamiento. |
| **Logging** | Eventos y correlación, actor, objetivo, resultado, redacción de datos, retención y acceso a auditoría. |
| **Human approval requirements** | Acciones y condiciones que exigen aprobación, responsable, vista previa exacta y mecanismo de verificación según [SECURITY](SECURITY.md#aprobación-humana). |

El contrato debe permitir predecir qué puede hacer la tool sin leer su implementación. Su código valida entradas, aplica la política de seguridad y devuelve una salida consistente con el contrato. Cambios de permisos o efectos exigen revisar ambos.

## Evaluación y entrega

Aplica [QUALITY](QUALITY.md) con casos representativos del objetivo, resultado esperado y evidencia. Incluye cuando corresponda: tarea normal; entrada ambigua; respuesta inválida; fuente insuficiente; prompt injection; acceso a otro tenant; tool no autorizada; aprobación ausente/caducada; proveedor caído; operación duplicada; resultado parcial; límite de coste o pasos.

Compara calidad, tiempo/coste y errores con la línea base determinística o manual. Define umbral de aceptación antes de ajustar el agente; registra fallos conocidos y recuperación humana. Cierra la entrega con contratos actualizados, controles comprobados, responsable operativo y evidencia enlazada en el delivery report. Distingue pruebas simuladas de pruebas sobre una integración real autorizada.
