# STATE — CasosAgentes (casosagentes.es)
Actualizado: 2026-10-16 03:00 Europe/Madrid

## 2026-10-28 · Claude — LEER ANTES DE LA PRÓXIMA RUTINA
- Nuevo acuerdo de trabajo entre el bot de Grok, Claude y Alex: **EDITORIAL.md** (reglas de publicación, reparto de tareas, cómo no pisarnos). Manda sobre instrucciones anteriores.
- Datos corregidos (commit 9793244): herramienta principal de HealthMate (4), Kokuai (2) y FaceStylist ahora es el producto, no WhatsApp; Motomeit y Lemme's pasan a `agente-ia-a-medida`; prompts de HealthMate diferenciados por clínica; prompt de Christina Puder alineado con la búsqueda de ofertas.
- Contadores unificados: ticker = todas las herramientas del caso; franja de portada = casos de los últimos 7 días.
- Publicado (commit 92fe975, aprobado por Alex): /sobre/ ampliada, /contacto/ nueva, conflicto de intereses ALAXIA en /transparencia/, enlace a Contacto en el pie.
- Search Console: enviado `https://casosagentes.es/sitemap-index.xml`.
- Decisión de Alex (28/10, 22:26): CasosAgentes y ALAXIA separadas. Retiradas de la web las menciones a ALAXIA (Sobre, Contacto, Cómo nos financiamos). Ver EDITORIAL.md.
- Codex se suma al proyecto: instrucciones en AGENTS.md (trabaja en ramas `codex/<tarea>`, Claude revisa). Reparto de tareas en EDITORIAL.md.
- Pendiente de Alex: cuenta nueva de MailerLite, acceso a Tally, cuenta de Umami.

## Estado actual
- En línea: https://alexito1999turo-coder.github.io/casos-ia/ (GitHub Pages)
- Casos publicados: **39** (32 sólidos + lote 4)
- Diseño: barra inferior tipo marcador (ticker) fusionada
- Main: `42796f1`

## Decisiones vigentes
- Solo negocios identificables (anónimos/NDA retirados; Alex OK 2026-10-16)
- Patrocinados fuera de Destacados
- Política autonomía V3 (presupuesto limitado; mín. agentes)

## Trabajo completado
- Lote 4 (7 casos) + 8 ciudades + correcciones Director
- Málaga y Terrassa: páginas reales (ya no redirect)
- Ticker diseño-4 fusionado
- HERR: citaflow + claudia

## Próxima tarea
- Conectar dominio **casosagentes.es** (Alex compra / DNS)

## Bloqueos
- Dominio pendientes de Alex

## Evidencias
- Repo: /workspace/casos-ia-main (worktree main)
- Deploy: deploy/publish-gh-pages.sh

## Rutina 2026-10-23
- Sin lotes nuevos en inbox; lote 5 pedido al Investigador (lote-5.json). Web en línea (200). Nada que publicar.

- Lote 5: 43 casos, publicado 2026-10-23, aprobado por el Director.

## Rutina 2026-10-24
- Inbox sin lote nuevo. Web en línea (200) con lote 5 (43 casos). Lote 6 pedido al Investigador (lote-6.json). Nada que publicar.
- Lote 6: 46 casos, publicado 2026-10-24, aprobado por el Director; Destacados excluye contenido de proveedor

## Rutina 2026-10-25
- Inbox sin lote nuevo (lote 6 ya publicado). Web en línea (200, 46 casos). Lote 7 pedido al Investigador (lote-7.json). Nada que publicar.
- Lote 7: 48 casos, publicado 2026-10-25, aprobado por el Director; VivelaVita descartado (contenido adulto)

## Rutina 2026-10-26
- Inbox sin lote nuevo (lote 7 ya publicado). Web en línea (200, 48 casos). Lote 8 pedido al Investigador (lote-8.json). Auditoría SEO del lunes pedida (seo-audit-3.md). Nada que publicar.

## Rutina 2026-10-28
- Lote 9 revisado: rama revision-2026-10-28 (2909299, apilada sobre revision-seo-2026-10-26), 52 casos, build OK. Enviado al Director; pedido lote 10 al Investigador.
- Producción sin cambios: origin/main 7a3459d (48 casos), 200.
- Nota: node_modules faltaba en el worktree; reinstalado con npm ci.
- SEO 3 + lotes 8 y 9: 52 casos, publicado 2026-10-28, aprobado por el Director y por Alex

## 2026-10-28 · Codex — campos opcionales de la ficha
- En curso (Codex): rama `codex/campos-caso`; mostrar `esParaTi`, `costeOrientativo` y `primerPaso` cuando tengan contenido, con el estilo existente y tres casos de prueba.
- `git fetch origin main` falló por conexión al proxy; comprobado con el conector GitHub que main coincide con el HEAD local (`97e581f`).
- Completado (Codex): tres secciones independientes antes del prompt, omitidas si el campo falta, es null, está vacío o solo contiene espacios. Reutiliza h2/p y los estilos existentes; sin CSS nuevo.
- Añadidos únicamente los tres campos a Moviltecno, RC15 Academy e Il Figlio di Emiliano: orientación editorial, costes estimados de piloto (no cifras de la fuente) y pruebas con herramientas gratuitas y revisión humana.
- Validación: `ASTRO_TELEMETRY_DISABLED=1 npm run build` OK (173 páginas); `node scripts/check-links.mjs` OK (10.290 enlaces internos, 52 anclas, 0 rotos). HTML comprobado en las 52 fichas: presencia en 3 y ausencia en 49. `git diff --check` OK.
- Entrega en `codex/campos-caso` para PR contra main y revisión de Claude/Alex. Sin merge ni despliegue. Git por terminal sin acceso al proxy; entrega mediante el conector GitHub.
