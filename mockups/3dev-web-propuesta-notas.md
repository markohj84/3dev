# Propuesta 3dev Web

Archivo: `3DEV WEB - propuesta.html`. Prototipo local, separado del original `3DEV WEB.html` y de las rutas públicas Astro.

## Dirección y alcance

Una persona presenta los planes a un cliente en pantalla y el cliente puede volver a consultarlos desde su teléfono. Se conservan el mensaje «Tu negocio merece una web a otro nivel», las tres ofertas y el cierre del original. Se condensan sus 11 escenas en cinco bloques; características comunes se explican una sola vez. No se añaden servicios, promesas de resultados ni precios nuevos.

Identidad tomada de `src/styles/tokens.css`: tinta, papel, jade, Space Grotesk y JetBrains Mono. Skill principal: frontend-design. Implementación HTML/CSS con JavaScript nativo, sin dependencias nuevas. Se reemplaza el export empaquetado por HTML legible en el navegador sin necesitar su runtime. La captura existente de Las Cholulas muestra criterio visual y está marcada como un proyecto de alcance distinto.

## Verificación

- `node mockups/verify-3dev-web.mjs`: catálogo canónico, sintaxis, navegación, modo presentación y cuatro opciones de contacto.
- `npm run check:strategy`: correcto.
- Inspección visual en navegador de escritorio y vistas embebidas de 375 y 768 px.
- Verificados en navegador: botón siguiente, selección Web Completa con correo prellenado, apertura de pregunta de pasarela de pago. Sin errores de consola observados.
- `git diff --check`: correcto para los cambios rastreados; nuevos archivos inspeccionados por separado.

## Límites

No publicado ni integrado al sitio. No se enviaron correos. No se ejecutó build de Astro porque esta entrega no modifica la aplicación. No se hizo auditoría completa de accesibilidad ni pruebas en teléfonos físicos.

El archivo conserva una copia de los tokens y la oferta: revisar contra las fuentes antes de publicar o modificar precios. La captura usa una ruta relativa al repositorio y las tipografías cargan desde Google Fonts; para compartir el HTML aislado habrá que empaquetar sus recursos. Renovación anual: precio pendiente en el catálogo original.
