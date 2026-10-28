# AGENTS.md

Instrucciones para asistentes de código (Codex y otros) que trabajen en este repo.

**Antes de nada, lee `EDITORIAL.md`**: es el acuerdo de trabajo entre el bot de Grok, Claude, Codex y Alex (quién hace qué, reglas de publicación y cómo no pisarnos). Después, lee la última sección de `STATE.md`.

## Proyecto

CasosAgentes (https://casosagentes.es): directorio estático en Astro de casos reales de IA en pymes y autónomos de España. Datos en `src/data/casos.json`; facetas en `src/data/facets.mjs`; configuración de formularios y legal en `src/data/config.mjs`.

## Comandos

- Instalar: `npm ci`
- Compilar con validación previa: `npm run build` (si faltan datos del titular, usar `npm run build:preview`, validando antes manualmente)
- Comprobar enlaces internos tras compilar: `node scripts/check-links.mjs`
- Desplegar: `bash deploy/publish-gh-pages.sh` — **solo con OK de Alex**.

## Reglas para Codex

- Trabaja en una rama `codex/<tarea>`, nunca directamente en `main`.
- Anota en `STATE.md` la tarea como «en curso (Codex)» al empezar y su resultado al terminar.
- No cambies el diseño (CSS, maquetación) sin OK explícito de Alex.
- No menciones ALAXIA en la web: CasosAgentes es un medio independiente.
- Antes de proponer el cambio, compila y pasa `check-links` sin enlaces rotos.

## Validación de casos

- Ejecutar: `node scripts/validar-casos.mjs`. `npm run build` lo ejecuta automáticamente mediante `prebuild`; `npx astro build` y `npm run build:preview` requieren ejecutarlo antes manualmente.
- Falla (salida 1) con el número y slug del caso ante slugs duplicados o inválidos, campos obligatorios vacíos o de tipo incorrecto, claves ajenas a `SECTORES`, `TAREAS`, `FUENTE_TIPOS` o `HERR` de `facets.mjs`, URLs de fuente sin HTTPS y fechas inválidas. No modifica los datos.
- `publicado` y el opcional `revisado` usan fechas reales `AAAA-MM-DD`. La fecha de la fuente (`fecha`), si existe, admite `AAAA`, `AAAA-MM`, `AAAA-MM-DD` o `no indicado`, respetando su precisión original.
- Solo avisa (salida 0 si no hay errores) de prompts idénticos tras quitar espacios en los extremos, cuota de proveedor superior al 30 % entre los publicados en los últimos 7 días y `costeOrientativo` sin la palabra «Estimación» (sin distinguir mayúsculas).
- La ventana temporal usa fechas de publicación a medianoche UTC y una antigüedad desde 0 hasta menos de 7 días; excluye fechas futuras. Sin casos recientes no hay aviso de cuota.
- Pruebas del validador: `node --test scripts/validar-casos.test.mjs`. En el entorno restringido de Codex (Node 24), usar `node --test --test-isolation=none scripts/validar-casos.test.mjs` si no permite crear subprocesos.
- Para futuros costes: «Estimación de CasosAgentes: X € de puesta en marcha y Y €/mes; no es un dato de la fuente.»

## Guías de sector

- Archivos Markdown en `src/data/guias/<sector>.md`. Frontmatter obligatorio: `titulo`, `descripcion`, `sector` (clave de `SECTORES` igual al nombre del archivo), `actualizado` (fecha real `"AAAA-MM-DD"` entre comillas) y `borrador` (booleano true/false sin comillas). Usar encabezados desde `##`: la página ya muestra el título principal.
- `cargarGuias()` valida estos metadatos al compilar y los comparte con las páginas y el sitemap. `gray-matter` es una dependencia directa para leer el frontmatter.
- `/guias/<sector>/` muestra el texto y después los casos de ese sector con `Landing` y `Lista`/`Card`. Los enlaces Markdown internos usan rutas absolutas como `/casos/<slug>/`; el build los adapta a `BASE_PATH`.
- Los borradores tienen URL de revisión con `noindex,follow`, quedan fuera del sitemap y no aparecen en `/guias/` ni se enlazan desde `/sector/<sector>/`. El índice también queda en noindex y fuera del sitemap mientras no haya guías publicadas.
- El bot de Grok redacta el contenido definitivo; Alex aprueba la publicación. La guía de hostelería es solo un ejemplo en borrador basado en los casos del repo. Cambiar `borrador` a false únicamente dentro de ese proceso editorial.
- Pruebas de metadatos y enlaces: `node --test scripts/guias.test.mjs` (en el entorno restringido de Codex: añadir `--test-isolation=none`).
