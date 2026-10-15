# CasosAgentes

Directorio de casos reales de agentes de IA para autónomos y pymes en España → futuro dominio **casosagentes.es** (hoy: https://alexito1999turo-coder.github.io/casos-ia/).

- Stack: Astro estático. Datos en `src/data/casos.json` (campos: slug, titulo, tituloSeo opcional, resumen, resultado, resultadoNota, sector, tarea, herramienta, herramientas[], ciudad, prompt, adaptacion, fuente, fuenteUrl, fuenteTipo [proveedor|prensa|red social|cliente], fecha, publicado).
- Facetas (sector/tarea/ciudad/herramienta) con menos de 3 casos: `noindex,follow` y fuera del sitemap (`src/data/facets.mjs`).
- Publicar: `bash deploy/publish-gh-pages.sh` · con dominio: `DOMAIN=casosagentes.es bash deploy/publish-gh-pages.sh`.
- Metodología editorial: `/metodologia/`.
