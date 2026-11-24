# Piloto de campañas de 3DEV

## Campaña para revisar

La oferta piloto es una página móvil de cotización por WhatsApp por $5,900 MXN, con 50% de anticipo. El primer público propuesto son negocios de distintos giros que ya cotizan en Puebla y Cholula. El tope sugerido es $1,000 MXN para siete días. La oferta de esta campaña está pendiente de aprobación comercial. El catálogo vigente distingue Web Esencial y Quetzal Local; confirma el alcance del piloto, el WhatsApp y la pauta antes de publicar.

| Variante | Texto principal | Dirección visual |
|---|---|---|
| Página web para recibir cotizaciones por WhatsApp | Creamos una página para mostrar tus servicios y facilitar que tus clientes te escriban con los datos de su solicitud. Piloto de 3DEV por $5,900 MXN. Escríbenos para revisar el alcance. | Arte editorial sobre fondo papel con oferta, explicación, precio y llamada a escribir. |
| ¿Tus clientes te piden cotización por WhatsApp? | En 3DEV creamos una página web para mostrar tus servicios y recibir solicitudes de cotización por WhatsApp. Piloto de $5,900 MXN. Cuéntanos qué ofrece tu negocio. | Arte editorial oscuro con pregunta, solución, precio y llamada a conversar. |

Primera respuesta sugerida: “Hola, soy Marco de 3DEV. La página piloto muestra tus servicios y ayuda a recibir solicitudes por WhatsApp. ¿Qué tipo de negocio tienes y qué datos necesitas para dar una cotización?”

El anticipo propuesto es de $2,950 MXN. El alcance final del piloto se confirma con cada cliente antes de enviar la propuesta. Los artes visuales quedan para revisión antes de publicar.

## Operar el piloto

Desde la raíz del repositorio, usa un archivo privado por cliente y campaña. El historial contiene los textos completos. Guarda la clave del proveedor en el gestor de secretos de tu entorno.

```sh
export THREEDEV_CAMPAIGN_STATE="$HOME/3dev-campanas/primera-campana.json"
node scripts/campaign-pilot.mjs draft
node scripts/campaign-pilot.mjs show
node scripts/campaign-pilot.mjs approve 1 "Nombre del revisor"
node --test tests/campaign*.test.ts
```

El comando draft usa ejemplos del piloto. Para generar con Gemini, configura GEMINI_API_KEY y THREEDEV_GEMINI_MODEL con un modelo habilitado en tu cuenta y ejecuta `node scripts/campaign-pilot.mjs draft-ai`. La orden envía el brief al proveedor y puede consumir cuota. Si el proveedor falla, el historial conserva su última versión. El revisor aprueba la versión completa que contiene ambos anuncios. La publicación se realiza manualmente después de confirmar destino y gasto.

Para un cliente nuevo, define otra ruta en THREEDEV_CAMPAIGN_STATE, crea un brief JSON y ejecuta `node scripts/campaign-pilot.mjs init brief.json`. El comando requiere una ruta de estado nueva. El brief contiene id, clientId, offer, audience, zone, destination y budgetCents. Los primeros seis campos son textos y budgetCents es un entero positivo en centavos de MXN. Usa draft-ai para generar para ese cliente. Si el proceso termina abruptamente durante una escritura, verifica que el proceso indicado en el archivo .lock haya terminado antes de retirar ese archivo y reintentar.

## Medir las primeras conversaciones

Registra cada contacto real en el tablero comercial. Cuenta una conversación como calificada cuando identificas el negocio y su necesidad, y acepta revisar una solución. Registra el anticipo únicamente al confirmar el pago.

Para revisar un periodo o una variante, prepara un JSON con los totales de ese mismo grupo. Los campos son spendCents (pauta en centavos), conversations (conversaciones únicas), qualified (conversaciones calificadas), proposals (prospectos calificados que recibieron propuesta) y receivedCents (cobros confirmados en centavos). Ejecuta `node scripts/campaign-pilot.mjs report resultados.json`. Un cero indica que verificaste el dato. Si falta un dato, obténlo antes de calcular el resumen.

El reporte devuelve costo por prospecto calificado y cobros menos pauta, antes de costos de entrega. Con cero prospectos calificados, el costo unitario queda sin calcular. Registra la procedencia del prospecto solo cuando puedas atribuirla.

Ejecuta `node scripts/campaign-pilot.mjs review` para ver la última corrección de cada corte por anuncio y una sugerencia de revisión. El comando solicita más evidencia cuando hay pocas conversaciones. La sugerencia se revisa antes de cambiar cualquier anuncio o presupuesto.
## Guardar resultados diarios por anuncio

Después de una publicación manual autorizada, usa `node scripts/campaign-pilot.mjs import-results resultados.json "Nombre del responsable"`. El archivo debe contener los cinco totales del apartado anterior y los campos clientId, campaignId, version (número aprobado), variant (A o B, según el orden de los anuncios), date (AAAA-MM-DD, día local) y source (referencia al corte utilizado). Incluye solo datos atribuibles a esa variante en ese día. El comando guarda el corte en el historial privado de la campaña; puedes consultarlo con show.

Reimportar el mismo corte es idempotente. Si corriges un dato, el historial conserva ambas revisiones. Para comparar anuncios usa la última revisión de cada día y variante. El dato receivedCents requiere confirmación de pago independiente del anuncio.
