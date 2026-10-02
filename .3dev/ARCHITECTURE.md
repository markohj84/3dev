# Arquitectura de producto

Parte de [HARNESS.md](HARNESS.md). Documenta intención y límites antes de introducir infraestructura. Evalúa las cinco capas en Discovery y arquitectura; marca las no necesarias con su motivo. No necesitas cinco servicios, carpetas ni despliegues.

## Modelo conceptual permanente

| Capa | Responsabilidad | Pregunta de diseño |
| --- | --- | --- |
| EXPERIENCE | UX/UI, Web, Mobile, Conversational UI | ¿Quién realiza qué tarea y cómo percibe estados, errores y resultados? |
| INTELLIGENCE | LLM, Gemini, AI Agents, RAG | ¿Qué capacidad incierta necesita razonamiento o recuperación y cómo se evaluará? |
| ORCHESTRATION | MCP, Workflows, n8n, Agent orchestration | ¿Qué coordina herramientas y pasos, con qué límites y recuperación? |
| INTEGRATION | APIs, Webhooks, Connectors | ¿Qué contrato conecta cada sistema y valida sus datos? |
| INFRASTRUCTURE & DATA | Google Cloud, Databases, CRM, ERP, Enterprise Systems | ¿Dónde vive la información y quién la posee, opera y puede consultar? |

**EXPERIENCE → INTELLIGENCE → ORCHESTRATION → INTEGRATION → INFRASTRUCTURE & DATA** organiza responsabilidades; una interacción determinística puede ir directamente de la experiencia a la integración. Las políticas de seguridad atraviesan todas las capas.

## Referencia híbrida

La siguiente es una arquitectura posible, no una afirmación de servicios instalados ni una topología obligatoria.

```text
Usuario/Empleado
  → Web App/Dashboard/Chat
  → AI Agent/LLM
  → 3DEV MCP Gateway
  → Tools & Services
  → APIs
  → Workspace/Cloud/CRM/ERP/DB/sistemas cliente

Eventos → Webhooks → Automation Engine → Workflows → APIs/sistemas
```

Separa el camino determinístico (APIs + Webhooks + workflows) del agéntico (LLM + MCP + tools). Comparte contratos y controles cuando sea útil; el modelo propone y la capa de ejecución aplica autorización. La elección de los mecanismos y la justificación de MCP se documentan conforme a [INTEGRATIONS.md](INTEGRATIONS.md).

## Decisiones que deben quedar explícitas

1. Revisa los límites, módulos y contratos existentes antes de proponer otros. Prefiere cohesión por responsabilidad y una interfaz pequeña; extrae abstracciones cuando haya reutilización o complejidad real.
2. Identifica entradas, salidas, propietarios, flujos de datos y dependencias externas. Evalúa sistemas y oportunidades siguiendo [INTEGRATIONS.md](INTEGRATIONS.md).
3. Compara al menos la extensión del sistema actual y la alternativa más simple. Incluye coste operativo, latencia, mantenibilidad, acceso a datos y fallos de terceros; introducir tecnología exige un beneficio concreto.
4. Define validación en las fronteras, errores esperables, compatibilidad, recuperación y observabilidad. Las restricciones de permisos, datos y aprobación proceden de [SECURITY.md](SECURITY.md).
5. Si interviene IA, completa la decisión previa y contratos de [AI-AGENTS.md](AI-AGENTS.md); un diagrama no acredita viabilidad ni calidad.
6. Registra decisiones duraderas en un ADR basado en [architecture-decision](templates/architecture-decision.md). Una modificación pequeña puede dejar su razón en el informe de entrega. Identifica migraciones, reversibilidad y condiciones para reconsiderar.

El contexto del proyecto debe distinguir **implementado**, **propuesto** y **no evaluado**. Enlaza fuentes de código/configuración para los hechos implementados y registra validaciones necesarias para lo propuesto.
