# Piloto de campañas de 3DEV

## Campaña para revisar

La oferta piloto es una página móvil de cotización por WhatsApp por $5,900 MXN, con 50% de anticipo. El primer público propuesto son negocios de distintos giros que ya cotizan en Puebla y Cholula. El tope sugerido es $1,000 MXN para siete días. La oferta de esta campaña está pendiente de aprobación comercial. El catálogo vigente distingue Web Esencial y Quetzal Local; confirma el alcance del piloto, el WhatsApp y la pauta antes de publicar.

| Variante | Texto principal | Pieza |
|---|---|---|
| ¿Me mandas una cotización? | Una página web para que tus clientes te digan qué necesitan desde el primer mensaje. Cotiza por WhatsApp. | Taller de rotulación recreado en blanco y negro. Luz de ventana, titular condensado y firma 3DEV. |
| Tu negocio ya cotiza. Dale una página. | Diseño web para recibir solicitudes por WhatsApp. $5,900 MXN. Hablemos por WhatsApp. | Hoja de cotización tipográfica en papel hueso. Precio de $5,900 MXN legible, filetes finos y acento verde pino. |

Primera respuesta sugerida: “Hola, soy Marco de 3DEV. ¿Qué vendes u ofreces y cómo te piden cotización hoy?”

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