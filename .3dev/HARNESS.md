# 3DEV AI Development Harness

Versión **1.0.0** · Metodología compartida por agentes y personas.

Crear mejores productos digitales con menos complejidad. No generar más código por generar. La dirección estratégica es **Web Development → Digital Products + Cloud + Automation + AI Agents**; cada capacidad se incorpora cuando resuelve una necesidad comprobable.

## Inicio de cada tarea

1. Lee la solicitud y el contexto del proyecto enlazado por el adaptador. Identifica resultado esperado, límites y autorizaciones vigentes.
2. Inspecciona instrucciones aplicables, rama, `git status`, diferencias locales, configuración y código afectado. Conserva trabajo ajeno. Una referencia remota almacenada localmente no acredita el estado remoto actual.
3. Sigue **Search → Understand → Reuse → Modify → Create**: busca implementación, componentes, documentación y pruebas; entiende las decisiones; reutiliza; modifica lo suficiente; crea sólo si hay una necesidad sin cubrir. Mejora antes que reescribir y justifica cualquier reemplazo.
4. Selecciona los documentos de la tabla. Verifica hechos del proyecto en sus fuentes; registra contradicciones y evita trasladar decisiones históricas a la implementación actual sin evidencia.

## Fuente única y lectura por alcance

Cada regla tiene un documento propietario; los otros documentos enlazan a él. Los adaptadores no contienen una copia del Harness.

| Cuándo leer | Documento propietario |
| --- | --- |
| Trabajo importante, límites entre componentes, datos o decisiones de stack | [ARCHITECTURE.md](ARCHITECTURE.md): cinco capas y decisiones |
| Cada cambio: validación proporcional y cierre | [QUALITY.md](QUALITY.md): UX/UI, calidad, autocorrección y Definition of Done |
| Datos, autenticación, acciones externas, tools, permisos o publicación | [SECURITY.md](SECURITY.md): seguridad y aprobación humana |
| Discovery/arquitectura de trabajo importante; sistemas externos o procesos manuales | [INTEGRATIONS.md](INTEGRATIONS.md): Integration, Automation & AI Agent Layer |
| Evaluar, construir o modificar IA, RAG, MCP o herramientas para agentes | [AI-AGENTS.md](AI-AGENTS.md): decisión de IA y contratos de tools |

El código y la configuración acreditan el comportamiento actual; el contexto y los ADR explican su intención. Una discrepancia no autoriza una migración. Aplica las instrucciones vigentes del usuario y los límites del entorno; ante conflicto material que no pueda resolverse con evidencia, pide la decisión necesaria y continúa el trabajo independiente.

## Workflow

**DISCOVER → PLAN → BUILD → TEST → REVIEW → IMPROVE → DELIVER** es obligatorio para trabajo importante: funcionalidades, integraciones, cambios de UX/arquitectura, seguridad, datos o refactorizaciones de alcance. Las correcciones pequeñas y documentación recorren el mismo razonamiento con evidencia breve; no exigen siete archivos ni diez agentes.

| Fase | Acción y condición para terminar |
| --- | --- |
| DISCOVER | Entender problema, usuarios, conversión, recorrido, repositorio, reutilización y riesgos. Evaluar integraciones y automatización. Termina con criterios de aceptación verificables, alcance y desconocidos explícitos; usar [discovery](templates/discovery.md). |
| PLAN | Elegir la solución más simple, archivos afectados, secuencia, validación y recuperación. Registrar alternativas relevantes con [ADR](templates/architecture-decision.md). Termina cuando cada criterio tiene una comprobación y cada acción sensible tiene su control identificado. |
| BUILD | Implementar incrementos pequeños usando componentes y contratos existentes. Coordinar responsabilidades de agentes sin edición simultánea de los mismos archivos. Termina cuando el alcance acordado está implementado y listo para probar. |
| TEST | Ejecutar las comprobaciones disponibles pertinentes; documentar comando, resultado y límites. Termina con evidencia reproducible, o bloqueos expresos sin afirmar éxito. |
| REVIEW | Revisar diff completo, requisitos, seguridad, UX y regresiones según el alcance. Usar revisión independiente para cambios importantes cuando esté disponible. Termina con hallazgos clasificados por impacto. |
| IMPROVE | Corregir causas con el ciclo de QUALITY; retirar complejidad innecesaria. Termina cuando se han verificado las correcciones y los riesgos restantes tienen estado y responsable. |
| DELIVER | Aplicar Definition of Done y [delivery report](templates/delivery-report.md). Diferenciar implementado, validado, pendiente y publicado. Termina con entrega revisable y límites explícitos. |

Las fases permiten volver atrás si aparece evidencia nueva. Un fallo de validación no se resuelve rebajando el criterio de aceptación.

## Roles y responsabilidad

Son perspectivas que deben cubrirse según impacto, no una obligación de crear equipos o ceremonias.

| Rol | Aporte verificable |
| --- | --- |
| Product Strategist | Problema, alcance, resultado de negocio y métrica de éxito |
| UX Researcher | Necesidades, recorridos, fricciones y evidencia; separar hipótesis de investigación real |
| UX/UI Designer | Jerarquía, identidad, estados, responsive y uso del design system |
| Frontend | Interacciones accesibles, componentes reutilizables y entrega eficiente al navegador |
| Backend | Contratos, validación, autorización, persistencia y errores recuperables |
| Software Architect | Límites, alternativas, dependencias, operación y coste de complejidad |
| QA | Casos de aceptación, regresiones, evidencia y gravedad de defectos |
| Accessibility | Teclado, semántica, foco, contraste y tecnologías de asistencia |
| SEO/Performance | Indexación y metadatos, carga, recursos y métricas pertinentes |
| AI Engineer | Necesidad de IA, evaluación, herramientas, permisos, coste y supervisión |

## Mantener y reutilizar

- `.3dev/` contiene metodología global y plantillas vacías. `docs/product/`, `docs/architecture/` y `docs/decisions/` contienen descubrimientos, contexto, resultados y decisiones de este cliente/proyecto. Los comandos ejecutables siguen siendo autoridad de `package.json` y la configuración correspondiente.
- Al adoptar el Harness en otro repo, copia `.3dev/` y los adaptadores, inspecciona sus instrucciones existentes y crea contexto propio. No copies datos de clientes, decisiones o informes como si fueran universales.
- Para cambiar reglas, edita su propietario y actualiza referencias/plantillas afectadas. Usa versión mayor para incompatibilidades del workflow/contratos, menor para capacidades compatibles y parche para aclaraciones; registra cambios relevantes en un ADR del proyecto que las adopta.
- Adapta sin añadir infraestructura por defecto: este Harness no exige MCP, n8n, agentes en producción, nuevas dependencias ni servicios concretos.
