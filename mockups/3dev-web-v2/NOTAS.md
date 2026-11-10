# 3dev Web · propuesta 02

Entrada: `../3DEV WEB - propuesta 02.html`.

## Intención

Recuperar del original la transformación, las demostraciones por plan y la presentación guiada. La primera propuesta permanece disponible para comparar. Se mantiene la identidad actual de tinta, papel, jade, Space Grotesk y JetBrains Mono.

- Primer clic: transición de sitio básico a propuesta editorial con fotografía; también se compara mediante un control de rango operable con teclado.
- Explorador: tres planes con vista de escritorio/celular, navegación de ejemplo en Web Completa y filtros en Tienda en línea.
- Comparación: selección sincronizada con el plan y con el mensaje de WhatsApp.
- Presentación: cinco etapas, controles anterior/siguiente, progreso y atajos que no interfieren con inputs o pestañas.
- Reducción de movimiento: CSS y JavaScript respetan la preferencia. Sin JavaScript siguen disponibles los tres planes y los enlaces de contacto.

Casa Alba y Alba Objetos son ejemplos conceptuales; no se presentan como clientes. El catálogo no incluye cobro en línea. Renovación anual sin importe definido: se conserva como pendiente. Datos de la línea Web tomados de `docs/strategy/oferta.json` v2.1.0.

## Reutilización y decisión

HTML/CSS y JavaScript nativo; sin nuevas dependencias de producción. Tokens copiados desde `src/styles/tokens.css` para este prototipo. Skills: frontend-design para composición y emil-design-eng para respuesta, transiciones y reducción de movimiento. Los archivos públicos Astro no cambian.

## Recursos

Fotografías de Unsplash, usadas únicamente dentro de las vistas conceptuales:

- Interior: https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85
- Objetos: https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=80

Las dos imágenes se guardaron localmente y se inspeccionaron. Las fuentes se cargan desde Google Fonts con fallback. Para mover la propuesta, conservar este directorio junto al HTML.

## Verificación del 30 de octubre de 2026

Comando reproducible con jsdom ya instalado en el equipo:

```sh
JSDOM_PACKAGE=/Users/marcohernandez/uigen/package.json node mockups/3dev-web-v2/verify-propuesta-02.cjs
npm run check:strategy
```

Pasaron: oferta canónica, recursos, contenido sin JS, transformación/reinicio/arrastre, preferencia de movimiento reducido, tres planes, selección por teclado, seis cambios de dispositivo, tres páginas de ejemplo, tres filtros, selección/correo y presentación. Se corrigió una etiqueta mal cerrada en el selector de Web Esencial durante estas pruebas.

El CSS pasó el parser PostCSS disponible en el repo. Sin cambios rastreados fuera del alcance; archivos nuevos inspeccionados por separado.

## Alcance de la revisión

La revisión visual inicial del 30 de octubre se bloqueó por un límite de uso. El 3 de noviembre se pudo revisar el CTA en navegador a 1073 × 864 y 375 × 812 px: posición fija, mensaje por plan y controles de presentación separados en móvil, sin desbordamiento horizontal a ese ancho. Se guardaron capturas de escritorio y móvil. No se realizó una auditoría visual integral ni de rendimiento. Sigue como propuesta local, sin publicación, commit ni push; no se ejecutó build de Astro porque no cambió la aplicación.

## CTA de WhatsApp · 3 de noviembre de 2026

Botón fijo en toda la propuesta al número +52 222 357 6770. El mensaje incluye el plan y precio seleccionados; sin selección ofrece ayuda para elegir. Los CTA de cada plan y el cierre abren WhatsApp directamente. Funcionan también sin JavaScript. El control de presentación se coloca sobre el botón en pantallas de hasta 1000 px, con espacio para el área segura del dispositivo.

Verificación del cambio: pasaron las pruebas DOM existentes, los enlaces de WhatsApp con/sin JavaScript (número, mensaje general, tres planes y reinicio de selección), navegación nativa sin bloqueo y parser CSS. No se abrió WhatsApp ni se enviaron mensajes.

### Refinamiento glass del CTA

Solicitud: mejorar el ícono y el acabado del botón fijo, con cambio de color al hacer clic. Se reemplazó el dibujo manual por el [SVG de WhatsApp de Bootstrap Icons](https://icons.getbootstrap.com/icons/whatsapp/), con licencia en `bootstrap-icons-LICENSE.txt`. El único elemento glass de la propuesta usa roles semánticos, desenfoque de fondo y radio de 16 px; el fondo sólido queda como fallback si el navegador no admite backdrop-filter. No se añadieron dependencias.

La skill emil-design-eng orientó el feedback: transición breve, compresión al pulsar y estado jade después del clic, sin interceptar el enlace ni afirmar que se envió un mensaje. Cambiar de plan restaura el glass. La regla existente de reduced motion elimina transiciones.

Validación: las pruebas DOM y PostCSS terminaron con código 0; se comprobó activación, reinicio, preservación de destino y mensajes, además de las regresiones existentes. Revisión visual en 375 × 812, 768 × 1024 y 1073 × 864 px; sin cruce con los controles de presentación ni desbordamiento horizontal en móvil. Consola de la propuesta sin errores registrados. El clic abrió la página de WhatsApp con el número y texto correctos; se cerró esa pestaña sin enviar el mensaje. `git diff --no-index --check` contra la versión previa del CTA pasó. La aplicación Astro y la publicación no cambian.

## Demo principal · 9 de noviembre de 2026

El hero muestra desde la carga una captura de la [Clínica Dental Nogal](https://demo.3dev.mx/), demo público de 3dev. Conserva el control de comparación; el estado básico del otro lado es ilustrativo, no una versión previa de la clínica. Web Esencial abre primero en el explorador y usa capturas de escritorio y celular del mismo demo, con enlace al sitio interactivo. El alcance del plan se aclara junto a las capturas: Web Esencial incluye una sección; las secciones extra del demo y Lía se cotizan por separado. Web Completa y Tienda en línea conservan sus ejemplos conceptuales.

Recursos locales: `nogal-desktop.jpg` (captura del demo a 1280 × 920), `nogal-mobile.jpg` (390 × 1100) y `nogal-dental.jpg` (fotografía servida por el demo desde https://images.unsplash.com/photo-1777331903190-341a3dd0441b). Los tres fueron observados y guardados el 9 de noviembre. La vista del demo es una captura; el enlace abre la versión viva, que puede cambiar. No se incrusta el sitio externo.

Prueba DOM existente: plan inicial, hero completo, comparación, enlaces al demo, recursos locales y regresión de planes/WhatsApp pasaron. El CSS pasó PostCSS; en navegador se comprobó el hero a 1280 px y el cambio de captura de escritorio a celular dentro del plan. La revisión visual del hero a 375 px quedó pendiente por una falla posterior del navegador de la herramienta. Sólo cambió esta propuesta local; la aplicación Astro no se publicó ni se modificó.
