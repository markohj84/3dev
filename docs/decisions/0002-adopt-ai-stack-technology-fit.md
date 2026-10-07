# ADR-0002 · Formalizar 3DEV AI Stack y Technology Fit

Fecha: 2026-10-06 · Estado: aceptada como **metodología** por solicitud del propietario del proyecto; las tecnologías individuales requieren decisiones por proyecto. Complementa [ADR-0001](0001-adopt-ai-development-harness.md).

## Contexto y alternativas

El Harness v1.0 ya define cinco capas, integración y controles humanos. Faltaba una puerta explícita de Technology Fit / Build vs Buy y un lugar único para las opciones del AI Stack. Se compararon: copiar la lista de tecnologías a cada documento, convertirla en dependencias del sitio, o mantener un catálogo evaluable enlazado desde el flujo. Se elige la tercera opción para conservar portabilidad y evitar reglas divergentes.

## Decisión

- Mantener [las cinco capas](../../.3dev/ARCHITECTURE.md), el principio de [INTEGRATIONS](../../.3dev/INTEGRATIONS.md) y la autoridad de [SECURITY](../../.3dev/SECURITY.md) sobre aprobación. Agregar [Technology Fit](../../.3dev/TECHNOLOGY-FIT.md) como autoridad de selección y Build vs Buy.
- Integrar la nueva secuencia de diseño a DISCOVER/PLAN y preservar BUILD → TEST → REVIEW → IMPROVE → DELIVER. El resultado de Technology Fit debe estar antes de adoptar una nueva tecnología, no antes de cualquier corrección pequeña.
- LangGraph es el **primer candidato** para agentes con estado y control humano, sujeto a evidencia de valor. Hermes Agent queda en 3DEV Lab experimental. Ninguna herramienta se instala en el sitio por adoptar esta decisión.
- [3DEV Sales OS v0.1](../product/3dev-sales-os-v0.1.md) es el primer piloto interno propuesto. Su arquitectura y proveedores concretos quedan por validar en su propio Discovery.

## Consecuencias y verificación

El catálogo exige mantener enlaces y criterios vigentes, pero limita la deriva entre agentes y evita compra o construcción prematura. La evolución del Harness es compatible y sube de 1.0.0 a **1.1.0**. La validación comprueba referencias, cobertura del flujo, separación metodología/piloto y que no cambió el runtime del sitio.

Revisar esta decisión si el piloto demuestra una alternativa más simple, cambian capacidades/costos de proveedores o la selección causa dependencia operativa difícil de sostener. La aprobación de acciones externas se evalúa por operación, no queda concedida por este ADR.
