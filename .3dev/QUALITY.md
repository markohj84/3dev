# Calidad y entrega

Parte de [HARNESS.md](HARNESS.md). Ajusta las comprobaciones al riesgo y alcance, explicando los casos no aplicables. No afirmes cobertura, rendimiento o conformidad que no se hayan medido.

## Producto y UX/UI

- Vincula cada decisión a usuarios, tareas y criterios de aceptación. Cubre navegación, jerarquía, contenido, carga, vacío, error, éxito, confirmación y recuperación cuando existan esos estados.
- Diseña con identidad profesional y contenido del producto: composición, tipografía, ritmo, imágenes y microcopy coherentes. Evita apariencia genérica de IA, componentes decorativos sin propósito y estructuras repetidas que no respondan al contenido.
- Consume tokens semánticos y medidas del design system; conserva primitivas, temas y componentes compartidos en sus fuentes. Justifica extensiones antes de introducir valores o variantes aisladas.
- Verifica responsive en tamaños representativos móvil/tablet/escritorio y con contenido largo; comprueba desbordamiento, lectura, controles táctiles y cambios de orientación pertinentes.

## Matriz de verificación

| Área afectada | Evidencia mínima según el cambio |
| --- | --- |
| Documentación/instrucciones | Rutas y enlaces válidos, reglas sin conflicto, cobertura de requisitos y diff dentro de alcance |
| Lógica/backend | Caso válido, entradas inválidas, límites y errores; autorización y aislamiento si aplica; regresión reproducible para defectos |
| Integraciones/automatización | Contratos, timeout, indisponibilidad, duplicados/reintentos, permisos denegados y recuperación; sandbox o mocks sin efectos reales |
| IA/tools | Evaluaciones y casos adversariales definidos por [AI-AGENTS.md](AI-AGENTS.md); controles de [SECURITY.md](SECURITY.md) |
| Interfaz | Recorrido principal, estados afectados, revisión visual, consola y responsive; evidencia manual además de automatización pertinente |
| Accesibilidad | Objetivo [WCAG 2.2](https://www.w3.org/TR/WCAG22/) AA salvo requisito más exigente: semántica, nombres/labels, teclado, foco visible/orden, contraste, errores asociados, zoom/reflow, reduced motion y lector de pantalla cuando afecte interacción; un escáner solo no prueba conformidad |
| SEO | Títulos/descripciones, canonical, encabezados, idioma, enlaces, indexación, sitemap/robots y datos estructurados si corresponden; datos reales, nunca reseñas o métricas inventadas |
| Performance | Comparación antes/después sobre el mismo escenario; JS, imágenes, fuentes, carga y Core Web Vitals pertinentes; fijar presupuesto en PLAN y registrar entorno/método; distinguir laboratorio de datos de campo |
| Seguridad | Revisar controles aplicables de [SECURITY.md](SECURITY.md) y registrar riesgos; no convertir alcance de una mejora en una auditoría certificada |

La accesibilidad y performance se validan en las superficies cambiadas; no se exige inventar un resultado Lighthouse para una edición documental.

## Comprobaciones del repositorio

1. Descubre scripts y herramientas existentes en su configuración; usa el gestor y lockfile del repo. Ejecuta tests, build, lint y checks disponibles que correspondan; si el usuario pide todos, ejecuta todos los disponibles.
2. Prueba comportamiento observable, riesgos y regresiones. Evita pruebas que sólo repliquen la implementación o tests nuevos para documentación reversible de bajo impacto.
3. Registra comando exacto, entorno relevante, código de salida, resultados y warnings. Un script inexistente o herramienta ausente se reporta como **no disponible**, nunca como aprobado; no instales dependencias sólo para simular cobertura.
4. Revisa `git diff`, archivos nuevos y `git diff --check`; distingue cambios propios, previos y artefactos generados. No elimines trabajo previo para obtener un estado limpio.

## Autocorrección

**DETECT → DIAGNOSE → FIX → TEST → VERIFY**:

1. **DETECT:** captura el criterio fallido y la evidencia reproducible.
2. **DIAGNOSE:** localiza la causa y distingue defecto del cambio, fallo previo o limitación del entorno.
3. **FIX:** aplica la corrección mínima que resuelve la causa; si queda fuera de alcance, documenta impacto y siguiente acción antes de ampliar el trabajo.
4. **TEST:** repite la comprobación que falló y las regresiones afectadas.
5. **VERIFY:** lee los resultados, confirma el criterio y revisa el diff resultante. Ante nuevo fallo vuelve a diagnóstico; comunica bloqueos sin ocultarlos ni repetir intentos sin hipótesis.

## Definition of Done

- [ ] Criterios de aceptación cubiertos; alcance entregado y comportamiento preservado fuera de él.
- [ ] Reutilización revisada; módulos y contratos claros; complejidad añadida justificada.
- [ ] Matriz aplicable comprobada con evidencia y casos no aplicables justificados.
- [ ] Tests/build/lint/checks disponibles ejecutados según alcance; fallos corregidos o límites identificados. Un bloqueo obligatorio pendiente impide declarar validación completa.
- [ ] Diff y archivos nuevos revisados; sin secretos ni cambios accidentales.
- [ ] Documentación, contexto y decisiones pertinentes actualizados en su fuente única.
- [ ] Hallazgos importantes resueltos o claramente pendientes con responsable; no se declara terminado lo que depende de ellos.
- [ ] [Delivery report](templates/delivery-report.md) con cambios, decisiones, validaciones, riesgos y próximos pasos; indicar si sólo existe localmente.

Completar la entrega no concede autorización de commit, push, despliegue o acciones externas. Consulta el límite vigente del proyecto y los controles de seguridad antes de ejecutarlos.
