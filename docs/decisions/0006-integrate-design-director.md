# ADR-0006 · Integrar 3dev-design-director

Fecha: 2026-11-09 · Estado: aceptada; publicación autorizada por Marco el 2026-11-09.

## Contexto

El Harness 1.2 selecciona skills externas mediante ADR-0004, pero necesita una dirección propia para UX/UI, frontend visual, referencias, tipografía, sistema y QA con puertas humanas. El ZIP mencionado no está disponible y el historial recuperado sólo contiene referencias sin el texto de las respuestas; esta versión se reconstruye desde el alcance solicitado y el repositorio en `cfdb8f4`.

## Decisión

Añadir una skill canónica en [.3dev/skills/3dev-design-director](../../.3dev/skills/3dev-design-director/SKILL.md). DESIGN-SKILLS la activa como coordinadora y conserva los especialistas existentes. Enlaces locales de directorio para Codex y Claude permiten descubrimiento sin copias. El enrutamiento explícito por Harness funciona aunque el host no descubra enlaces.

Conservar adaptadores, siete fases, cinco capas y propietarios de calidad, seguridad y Technology Fit. Las puertas de dirección y aceptación visual pertenecen a la skill; los efectos externos siguen SECURITY y el contexto. Reutilizar aprobaciones vigentes y preparar una propuesta concreta antes de pedir decisiones. No introducir dependencias ni cambiar interfaz, fuentes o tokens activos.

## Consecuencias

Harness 1.3.0 incorpora una capacidad compatible. ADR-0004 sigue vigente para especialistas externos; se incorpora una skill propia, sin copiar skills de terceros. Al copiar el Harness se debe incluir su directorio skills; los enlaces nativos son opcionales porque existe el enrutamiento documental. El descubrimiento automático depende del host y debe comprobarse en una nueva sesión; la validación estática no demuestra ejecución conductual ni aceptación humana de una futura interfaz.
