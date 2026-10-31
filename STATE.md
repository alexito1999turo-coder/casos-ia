# STATE — CasosAgentes (casosagentes.es)
Actualizado: 2026-10-28 22:50 Europe/Madrid

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
Actualizado: 2026-10-28 22:50 Europe/Madrid (Claude)
- En línea: https://casosagentes.es/ (GitHub Pages, rama gh-pages; casosagentes.com redirige al .es)
- Casos publicados: **52**
- Producción: desplegada desde main 4e8ebca. En main sin desplegar, pendiente del OK de Alex: campos opcionales de la ficha (PR #1), validador de casos.json en prebuild y en el despliegue (PR #2), infraestructura de guías con hostelería en borrador (PR #3). Los tres PR de Codex, revisados por Claude.
- Siguiente para el bot de Grok: redactar las guías de hostelería, salud y comercio (ver EDITORIAL.md).
- Equipo: bot de Grok (casos), Codex (código, en ramas codex/*), Claude (revisión y coordinación). Reparto en EDITORIAL.md.
- Search Console: propiedad de dominio verificada; sitemap enviado.
- Formularios: MailerLite, Tally y analítica pendientes de que Alex cree las cuentas.

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

## 2026-10-28 · Codex — validación de casos
- En curso (Codex): rama `codex/validar-casos` desde main `587a20f`; validador previo al build, errores y avisos editoriales sin modificar casos.json.
- Completado (Codex): `scripts/validar-casos.mjs` comprueba estructura, obligatorios, slug, catálogos, HTTPS y fechas reales; avisa de prompts repetidos, cuota semanal de proveedor >30 % y costes sin «Estimación». Mensajes en español con número y slug; no modifica datos.
- `prebuild` en package.json ejecuta el validador antes de `npm run build`. `SECTORES` y `TAREAS` pasan a facets.mjs, reexportados por meta.js sin cambiar claves ni etiquetas. AGENTS.md documenta comandos, formatos, ventana de 7 días y frase acordada para futuros costes.
- Los 52 casos actuales: 0 errores, 0 avisos; casos.json intacto. Se respetan fechas parciales y «no indicado» en fecha de la fuente; publicado/revisado requieren AAAA-MM-DD.
- Pruebas: 7 grupos con `node --test --test-isolation=none scripts/validar-casos.test.mjs` OK (aislamiento desactivado porque este entorno no permite subprocesos del runner). CLI verificada con copias temporales: avisos salen con 0, errores y JSON roto con 1; prebuild detiene el build ante datos inválidos.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build` OK con prebuild (173 páginas); `node scripts/check-links.mjs`: 10.290 enlaces internos, 52 anclas y 0 rotos; `git diff --check` OK.
- Main actualizado desde el conector GitHub por fallo de conexión del proxy Git; objeto firmado 587a20f recuperado y verificado por su SHA antes de crear la rama. Rama rebasada después sobre main `bb545c4`, incorporando la actualización de STATE.md de Claude. Entrega para PR contra main, pendiente de revisión. Sin merge ni despliegue.

## 2026-10-28 · Codex — infraestructura de guías
- En curso (Codex): `codex/guias` desde main `fd766cc`; Markdown por sector, páginas e índice, exclusión de borradores del sitemap y enlaces desde sectores solo a guías publicadas.
- Completado (Codex): contenido `src/data/guias/<sector>.md`, cargador compartido con validación de frontmatter, rutas `/guias/<sector>/` e índice `/guias/`. Landing incorpora un slot y opciones de descripción/robots/título de casos; la lista reutiliza Lista/Card. Sin CSS nuevo.
- Borradores: URL para revisión con noindex,follow; excluidos del sitemap, índice y enlaces desde sector. Mientras no haya guías publicadas, el índice también queda en noindex y fuera del sitemap. Solo se enlaza una guía desde su propio sector si existe y está publicada.
- Ejemplo de hostelería con `borrador: true`, basado exclusivamente en los 13 casos de hostelería actuales, todos citados mediante enlace interno; sin añadir cifras. Texto definitivo a cargo del bot de Grok.
- gray-matter 4.0.3, ya presente en el lock como transitiva de Astro, declarado dependencia directa para leer frontmatter también desde astro.config. Enlaces Markdown adaptados a BASE_PATH sin modificar los de otras páginas. Instrucciones añadidas a AGENTS.md.
- Validación: 52 casos, 0 errores y 0 avisos; 11 grupos de pruebas OK (4 de guías y 7 del validador). Build final con prebuild OK: 175 páginas; check-links: 10.478 enlaces internos, 52 anclas, 0 rotos. git diff --check OK.
- Comprobado HTML/sitemap con el borrador: noindex y ausencia en índice/sector/sitemap; texto antes de las 13 tarjetas. Prueba temporal local con borrador false y BASE_PATH=/casos-ia: indexación, índice y enlace sector activos, sitemap correcto y 0 enlaces rotos (10.479). Restaurado borrador true y recompilado al finalizar.
- Rama desde main fd766cc actualizado mediante conector GitHub por el fallo del proxy Git; conserva la validación añadida al despliegue. Sin cambios en casos.json ni despliegue ni merge. Entrega para PR contra main y revisión.
- 2026-10-29 11:45 (Grok): revisados los cambios de Claude y Codex (9793244..ed510b0). Técnicamente OK: validador 52/0/0, tests 11/11, build de 175 páginas, 0 enlaces rotos, buscador 53/53, la web en vivo = main, .net/.tech/.com con 301, SPF y DMARC OK, guía de hostelería en noindex. Avisos para Alex: /sobre sin declarar el conflicto de intereses del editor, afirmaciones de /sobre y /contacto que debe confirmar, rutina diaria fallida por falta de uso.
- 2026-10-29 11:50 (Grok, OK de Alex): /sobre declara que los casos de clientes de Alex se marcarán en la ficha y que Alex aprueba cada lote; /contacto sin plazo fijo de respuesta.
- 2026-10-29 (Grok): rama revision-2026-10-29 con el lote 10 (3 casos de prensa: B1 B2 Academy, Puyol Abogados, L35 Architects) con esParaTi, costeOrientativo, primerPaso y revisado. Validador 55/0/0, build 180 páginas, 0 enlaces rotos. Pendiente: Director y OK de Alex; sin desplegar.
- 2026-10-29 (Grok, OK de Alex): rutina de casos pasada a GitHub Actions (casos-claude.yml, L-X-V 07:15, Sonnet, ~0,18 $ por ejecución). casos-diarios.yml desactivada. Rutina de Grok pausada.

## 2026-10-31 · Codex — activación de la newsletter
- En curso (Codex): rama `codex/activar-newsletter` desde main `6e20850`; conectar el formulario embebido «CasosAgentes · Los 5 del lunes», evitar mensajes de éxito ante respuestas ambiguas y validar el flujo local sin desplegar.
- Completado (Codex): configurados los identificadores públicos de MailerLite para que `/newsletter/` muestre el formulario real y vuelva a `index,follow`; el mensaje de confirmación solo se muestra si MailerLite responde explícitamente con `success: true`.
- Estado externo comprobado por Windsor.ai: formulario con contenido, grupo asociado y doble opt-in, pero todavía `active: false`; 1 alta sin confirmar y 0 activas en el grupo. No se ha enviado ninguna alta de prueba ni campaña.
- Validación: 55 casos, 0 errores y 0 avisos; build OK (180 páginas); `check-links` con 10.927 enlaces internos, 55 anclas y 0 rotos. HTML verificado con endpoint, consentimiento obligatorio, `index,follow` e inclusión en sitemap. Pendiente activar el formulario en MailerLite y probar el recorrido real antes de fusionar o desplegar.
