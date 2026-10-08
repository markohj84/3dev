# Protocolo de propagación de la estrategia

Cómo un cambio de estrategia u oferta llega a todos los lugares que dependen de él sin que alguno se quede atrás. Aplica a personas y a agentes (Claude Code, Codex) en los dos repositorios.

## Mapa de dependencias

```
docs/strategy/estrategia-marca-v2.md   (el porqué)
docs/strategy/oferta.json              (nombres y precios — canónico)
        │
        ├─► 3dev-quetzal/clients/3dev/offer.lock.json     copia fija del catálogo (npm run check:offer)
        │        └─► clients/3dev/knowledge/*.md          lo que Quetzal puede afirmar (curado a mano)
        │        └─► clients/3dev/voice.md                reglas de prioridad y ejemplos
        │        └─► clients/3dev/assistant.config.ts     chips de apertura
        │        └─► clients/3dev/evals.ts                regresión de enrutamiento y precios
        │
        ├─► 3dev.mx (este repo)                            hero, capacidades, contacto, futura página de planes
        │
        └─► Project "3dev" en claude.ai                    copia de la estrategia para chats y propuestas
```

## Cuando cambie algo

| Si cambia… | Edita primero | Después actualiza | Verifica con |
| --- | --- | --- | --- |
| Un precio, nombre de paquete u oferta | `oferta.json` (sube `version`) y la tabla en la estrategia | Quetzal: `offer.lock.json` (copia exacta), `knowledge/ofertas.md` o `knowledge/sitios-web.md` | `npm run check:strategy` aquí; `npm run check:offer -- --remote` en Quetzal |
| Qué se vende y a quién (posicionamiento, audiencias, prioridad) | `estrategia-marca-v2.md` + ADR nuevo en `docs/decisions/` | Quetzal: `voice.md` (regla de prioridad, ejemplos), `knowledge/servicios.md`, `que-hacemos.md`; chips en `assistant.config.ts` | `npm run eval:3dev` en Quetzal |
| Una regla de voz | `estrategia-marca-v2.md` §7 | `voice.md` de Quetzal (sube versión) | `npm run eval:3dev` |
| Algo público del sitio | Discovery propio según el Harness | Páginas de este repo | `npm test`, `npm run build` |
| Cualquiera de los anteriores | — | Subir `estrategia-marca-v2.md` al Project "3dev" en claude.ai (reemplaza la copia anterior) | Revisar que el Project no tenga dos versiones vigentes |

## Reglas

1. **El catálogo manda.** Si `oferta.json` y un texto difieren, el texto está mal.
2. **Quetzal no lee este repo en tiempo de ejecución.** Su conocimiento se cura a mano; la conexión es la copia `offer.lock.json` y el check que la compara con el canónico.
3. **Un precio "pendiente" es `null`.** Quetzal nunca lo estima; responde que se define en la cotización.
4. **Versionado:** mayor si cambia la estructura de la oferta (se agrega o quita una línea), menor si cambia un precio o un paquete, parche para redacción.
5. **Antecedentes no son fuente.** `3dev_estrategia_marca.docx` (v1.0) y la tabla de precios del *Proyecto Maestro* quedan como historia; no se usan para responder ni para cotizar.
