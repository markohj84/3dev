# ADR-0005 · Oferta 1 pasa a Quetzal / Local (landing + asistente) para el negocio local

Fecha: 2026-10-30 · Estado: **aceptada** por Marco (propietario). Sustituye a "Oferta 1 — Quetzal / Asistente" ($7,900 + $2,490) de [ADR-0003](0003-estrategia-v2-escalera-pyme-y-web.md); no cambia Oferta 0, Oferta 2, 3dev Web ni el estudio integrado.

## Contexto

La Oferta 1 costaba $2,490 al mes, alto para un negocio local, y no incluía agenda ni sitio, aunque ambas cosas ya existen en Quetzal. Muchos negocios locales no tienen sitio: viven en Facebook, Instagram y WhatsApp, y el asistente web necesita una página donde vivir. Costo medido en Quetzal (tabla `usage`, octubre 2026): unos $0.09 MXN por conversación típica; con 5 a 10 clientes, el costo directo por cliente (modelo, parte de la infraestructura y dominio) ronda $200–350 MXN al mes. Desde el 1 de octubre de 2026 Meta cobra cada respuesta por WhatsApp. Existe una plantilla de landing por cliente (`clients/_plantilla/home.html` en Quetzal) que hace barata la entrega.

## Alternativas

1. Bajar el precio de la Oferta 1 sin cambiar qué incluye — no resuelve que el negocio no tenga dónde poner el asistente.
2. Un cuarto peldaño junto a la Oferta 1 — se canibalizan: las dos serían "asistente web".
3. **Reemplazar la Oferta 1 por dos variantes: Quetzal / Local (landing + asistente web + agenda) y Quetzal / Local + WhatsApp.** Elegida.

## Decisión

- **Quetzal / Local:** $5,900 + $490 al mes. **Quetzal / Local + WhatsApp:** $7,900 + $790 al mes, con el costo de Meta aparte, a costo.
- Volumen fijo en los dos: 300 conversaciones (personas distintas) al mes, $99 por cada bloque extra de 300; un cambio de información al mes incluido y $150 por cambio extra. El servicio nunca se corta al pasar el tope; el excedente se cobra el mes siguiente.
- La regla 2 de la escalera cambia: Local incluye una landing de una página; un sitio de varias secciones con Quetzal sigue cotizándose como dos productos.
- **Lanzamiento:** primeros 5 negocios, hasta el 31 de diciembre de 2026: $4,900 / $6,900 de implementación, sin mensualidad de 3dev 6 meses y luego $299 / $599 al mes congelados. La regla 3 se conserva: Quetzal no comunica el lanzamiento; lo ofrece el equipo.

## Consecuencias

El ingreso fuerte es la implementación; la mensualidad de lanzamiento casi solo cubre costos, así que el soporte debe quedarse en el cambio incluido al mes. El tope se revisa a mano en `/admin` (personas por cliente) mientras no se automatice. El precio de lanzamiento queda congelado para esos 5 negocios: subirlo después requiere renegociar. Revisar con los primeros 3 clientes: horas reales de alta, conversaciones al mes y cuántos piden WhatsApp.
