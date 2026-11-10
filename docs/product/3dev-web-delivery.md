# Entrega · Presentación 3dev Web

Fecha: 2026-11-09 · Base: `de8b483` · Rama local: `main` · Estado: implementado y validado localmente; publicación autorizada por Marco el 2026-11-09.

## Resultado

La propuesta visual `mockups/3DEV WEB - propuesta 02.html` se integró como `/web`, enlazada desde la navegación principal y el pie. Presenta el demo de Clínica Dental Nogal, tres planes, comparación, proceso y contacto. El botón de WhatsApp permanece visible, usa el número 222 357 6770 y adapta su mensaje al plan seleccionado. La vista aclara que el demo incluye elementos fuera de Web Esencial y que la pasarela de pago se cotiza aparte.

## Cambios y decisiones

| Área | Cambio | Motivo |
| --- | --- | --- |
| `src/pages/web.astro` | Ruta con SEO, contenido, interacción y precios tomados de `docs/strategy/oferta.json` | Convertir el mockup en una página real sin duplicar importes |
| `public/images/web/` | Cinco imágenes locales del prototipo | Evitar dependencias de imágenes externas en la presentación |
| `src/components/Nav.astro`, `src/components/Footer.astro` | Enlace Web | Hacer encontrable la ruta desde todo el sitio |
| `src/layouts/BaseLayout.astro` | Opción para omitir Quetzal en `/web` | Evitar superposición con el CTA fijo de WhatsApp |
| `docs/architecture/project-context.md` | Nota fechada sobre la ruta nueva | Distinguir el estado actual del snapshot anterior |

No se añadieron dependencias, proveedores, APIs ni flujos con IA. El demo externo es una referencia visual; los dos escenarios adicionales son conceptuales. El contacto por WhatsApp abre un mensaje prellenado y no envía mensajes automáticamente.

## Validación

Entorno: Node 24.14.1, npm 11.11.0, Astro 6.4.2. `npm run build` terminó correctamente y prerenderizó `/web`; `npm test` pasó 6/6; `npm run check:strategy` confirmó la oferta v2.1.0; `git diff --check` no reportó errores. Se revisó `/web` en navegador local a 1280 px y 390 px: selección de planes, contenido visible, CTA actualizado, modo presentación, menú móvil y ausencia de desbordamiento horizontal. El build muestra los tres importes del catálogo y omite Quetzal en esta ruta. El build no verifica el funcionamiento de WhatsApp ni de demo. No hay scripts lint o typecheck configurados.

## Estado y pendientes

La publicación se activa mediante push a `main` en GitHub y despliegue automático de Vercel; el resultado remoto se registra en la entrega final. Para volver atrás, revertir el commit de esta página, preservando los mockups previos y cualquier trabajo posterior. Marco autorizó la publicación el 2026-11-09 con la instrucción «pasalo a prod».
