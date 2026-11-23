# Piloto de campañas de 3DEV

Ejecuta estos comandos desde la raíz del repositorio. Define THREEDEV_CAMPAIGN_STATE con una ubicación fuera del repositorio para guardar el historial local.

```sh
export THREEDEV_CAMPAIGN_STATE=/tmp/3dev-campaign.json
node scripts/campaign-pilot.mjs draft
node scripts/campaign-pilot.mjs show
node scripts/campaign-pilot.mjs approve 1 Marco
node --test tests/campaign-pilot.test.ts
```

El comando draft genera dos ejemplos precargados y los identifica como examples. show permite revisar el brief, los anuncios y el historial. approve registra la revisión de la última versión. La aprobación local tampoco autoriza gasto ni ejecuta publicaciones. Si vuelves a generar un borrador, revisa y aprueba el número nuevo.

El módulo recibe un generador como función. El siguiente paso es conectar un proveedor de IA autorizado a esa interfaz. Confirma también el WhatsApp de 3DEV y el presupuesto antes de montar la campaña en Meta. Los anuncios de prueba están pensados para una campaña de siete días con un tope propuesto de $1,000 MXN.
