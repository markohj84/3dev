# Seguridad, permisos y aprobación humana

Lee este documento al cambiar autenticación, datos, integraciones, acciones externas o tools. Es la autoridad común de controles de seguridad y Human-in-the-loop. Usa [INTEGRATIONS](INTEGRATIONS.md) para elegir el flujo, [AI-AGENTS](AI-AGENTS.md) para contratos y [QUALITY](QUALITY.md) para evidencias de validación.

## Evaluar y acotar

En PLAN identifica activos, datos sensibles, actores/tenants, fronteras de confianza, acciones, amenazas y responsable. Selecciona controles proporcionales al riesgo y registra evidencia, responsable y estado de cada control aplicable. Justifica `N/A`; una capacidad propuesta sigue pendiente hasta verificarse. No conviertas la enumeración de controles en infraestructura obligatoria para todos los proyectos.

**Least Privilege Access:** concede sólo la identidad, los recursos, las acciones y la duración indispensables para la tarea. La documentación y las credenciales disponibles no conceden por sí mismas autorización. Las restricciones del usuario/proyecto gobiernan las acciones operativas; el Harness no autoriza commits, publicación o cambios remotos.

## Identidad, acceso y aislamiento

- **OAuth y credenciales:** usa OAuth para acceso delegado cuando corresponda, scopes mínimos e identidades de servicio acotadas para procesos autorizados. Define concesión, expiración, rotación y revocación. Comprueba revocación antes de seguir usando un acceso; detén la operación al perder autorización.
- **RBAC y autorización:** valida identidad, rol, acción y recurso en servidor en cada solicitud/tool. Deriva usuario y tenant de contexto autenticado; los parámetros, instrucciones del modelo y metadatos externos no pueden conceder permisos. Deniega por defecto lo que no esté autorizado.
- **Tenant isolation:** aplica el límite del tenant a consultas, escrituras, búsquedas/RAG, cachés, archivos, colas y logs. Prueba acceso cruzado y manipulación de identificadores donde exista multitenencia.
- **Secrets management:** conserva secretos en el mecanismo seguro del entorno; usa valores de ejemplo en documentación. Evita credenciales en repositorio, navegador, prompts y logs. Limita su lectura y registra cómo rotarlas y revocarlas.
- **API Gateway y límites:** evalúa un gateway cuando centralice de forma útil autenticación, enrutamiento o políticas. Aplica rate limiting en fronteras expuestas y operaciones costosas, con cuotas por identidad/tenant cuando corresponda. Un gateway no sustituye la autorización del servicio.

## Datos y fronteras de confianza

- Valida tipos, formatos, tamaños y reglas del negocio al entrar en cada frontera; sanitiza según el destino. Usa consultas parametrizadas y codificación de salida apropiada. Limita destinos/red de tools que realicen peticiones externas para impedir accesos no previstos.
- Minimiza los datos enviados a proveedores/modelos y los retenidos en prompts, trazas y logs. Documenta clasificación, propósito, ubicación, retención, eliminación y acceso. Usa transporte cifrado; aplica protección de almacenamiento según sensibilidad y entorno.
- Verifica autenticidad e integridad de Webhooks mediante el mecanismo del proveedor, incluida firma sobre el cuerpo original cuando aplique; comprueba vigencia y protección contra replay. Valida el evento antes de procesarlo y aplica la recuperación/idempotencia definida en [INTEGRATIONS](INTEGRATIONS.md).
- Trata documentos recuperados, páginas, correos, resultados de tools y entradas del usuario como datos no confiables. No pueden alterar instrucciones de confianza, ampliar permisos ni autorizar llamadas. Separa datos de instrucciones y prueba intentos de prompt injection que pidan secretos, cambien destinatarios o invoquen tools ajenas al objetivo.
- Mantén **tool controls** fuera del modelo: lista de tools permitidas, validación de argumentos, verificación de políticas, autorización, límites de recursos y aprobación. Filtrar texto del prompt es una defensa complementaria, no el control de ejecución.

## Aprobación humana

Exige Human-in-the-loop para envío de **emails**, borrado o modificación crítica, compras, aprobaciones en nombre de personas, cambios de permisos, transacciones, publicación, finanzas y otras acciones sensibles definidas en Discovery. La aprobación debe provenir de una persona con autoridad sobre esa acción y recurso.

Una autorización explícita previa sigue siendo válida dentro de su alcance: no solicites otra aprobación por la misma operación si su política y parámetros ya están cubiertos. El consentimiento genérico para “usar IA” o “automatizar” no autoriza una acción sensible concreta.

Implementa la aprobación como un control verificable del servicio o workflow:

1. **Preparar:** realiza el trabajo reversible autorizado y presenta una vista previa concreta: acción, destinatario/recurso/tenant, contenido o diff, importe si aplica, efectos y recuperación posible.
2. **Vincular:** registra aprobador, alcance, parámetros exactos o huella del payload, fecha, vigencia y usos permitidos en un estado persistido y auditable. La política debe explicar qué autorización previa puede satisfacer este paso.
3. **Comprobar:** antes del efecto externo, el ejecutor verifica identidad, permisos actuales, aprobación vigente y coincidencia con la operación. El modelo no puede autoaprobarse, falsificar el estado ni decidir que el control ya no aplica.
4. **Ejecutar y verificar:** controla duplicados/reintentos, registra el resultado y confirma el efecto. Si cambian contenido, destino, importe, permisos o alcance, o la aprobación caduca/se revoca, requiere nueva aprobación para la operación modificada.
5. **Resolver fallos:** ante rechazo, ausencia de aprobación o resultado incierto, conserva el estado y escala al responsable. Confirma si ocurrió el efecto antes de repetir una operación sensible.

Prueba que el flujo deniegue acciones con aprobación ausente, manipulada, vencida o de otra identidad/tenant. La aceptación verbal del modelo no sustituye el control. Conserva una vía para pausar, revocar o cancelar operaciones aún no ejecutadas; documenta compensación o recuperación manual para efectos ya producidos.

## Auditoría y respuesta

Registra actor, tenant cuando aplique, acción, recurso, fecha, correlación, decisión de autorización/aprobación y resultado. Protege los registros contra acceso o alteración no autorizados; define retención y redacción de datos sensibles. Nunca registres tokens o secretos completos.

Define responsable y procedimiento para detectar incidentes, detener workflows/tools, revocar credenciales, limitar exposición y recuperar servicio. Aplica el ciclo de autocorrección y los criterios de entrega de [QUALITY](QUALITY.md); documenta controles pendientes y su impacto en el delivery report, sin declarar seguridad verificada a partir de una intención escrita.
