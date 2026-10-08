# ADR-0003 · Estrategia v2: escalera PyME, 3dev Web y fuente única de la oferta

Fecha: 2026-10-07 · Estado: **aceptada** por Marco (propietario). Sustituye la dirección comercial de la Estrategia de marca v1.0 (mayo 2026); no cambia identidad visual, nombre ni arquetipos.

## Contexto

La Estrategia v1.0 posicionó a 3dev como estudio premium (desde USD 50,000) y rechazaba clientes pequeños y sitios brochure. En agosto, el *Proyecto Maestro de Arranque PyMEs* reorientó el arranque hacia PyMEs con Quetzal, y en septiembre los precios de Quetzal bajaron (Oferta 0/1/2). Marco decide ahora sumar paquetes de desarrollo web para el mismo cliente PyME. Había tres fuentes en conflicto (docx v1.0, Proyecto Maestro, conocimiento de Quetzal), y Quetzal decía "no hacemos sitios de una sola página".

## Alternativas

1. Mantener v1.0 y tratar web/PyME como excepción privada — contradice lo que Quetzal ya vende y obliga a esconder la oferta activa.
2. Reescribir la estrategia en un documento suelto (docx) — vuelve a dejar a Quetzal y al sitio sin forma de detectar diferencias.
3. **Estrategia v2 en el repo + catálogo canónico `oferta.json` + checks en ambos repos.** Elegida.

## Decisión

- La oferta activa es una escalera: **3dev Web** (Web Esencial $4,900, Web Completa $8,900, Tienda en línea $12,900 MXN; hospedaje y dominio el primer año) y **3dev AI · Quetzal** (Oferta 0/1/2). El **estudio integrado** sigue existiendo como oferta reactiva.
- [docs/strategy/estrategia-marca-v2.md](../strategy/estrategia-marca-v2.md) es la fuente estratégica; [oferta.json](../strategy/oferta.json) la fuente de nombres y precios.
- Quetzal conserva su conocimiento curado a mano; se conecta mediante una copia `clients/3dev/offer.lock.json` y `npm run check:offer`, que falla si un precio del catálogo no aparece en su conocimiento y, con `--remote`, si su copia difiere del canónico publicado.
- Este repo valida catálogo contra estrategia con `npm run check:strategy`.
- El runtime de 3dev.mx no cambia con esta decisión; la página de planes y el ajuste del hero requieren su propio Discovery.

## Consecuencias

Una sola edición de precio exige tocar dos archivos por repo, pero los checks lo hacen visible en vez de silencioso. La verificación remota depende de que `main` de este repo sea público y esté actualizado. Revisar esta decisión tras el 3.er cliente pagador o si la línea web no genera prospectos en 90 días.
