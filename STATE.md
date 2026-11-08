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
Actualizado: 2026-11-01 (Claude)
- En línea: https://casosagentes.es/ (GitHub Pages, rama gh-pages; casosagentes.com redirige al .es)
- Casos en `main`: **56** (último: Serás, academia de oposiciones). **`gh-pages` sin actualizar — pendiente desplegar** (ver rutina 2026-11-01: el despliegue fue bloqueado por el entorno de Claude, no por falta de OK).
- Guías de sector en `main`: **salud y comercio publicadas** (`borrador: false`, OK de Alex 2026-11-01); hostelería sigue en borrador (ejemplo de formato, no contenido definitivo).
- PR abiertos sin fusionar: #5 y #6 (Codex, formularios/captación), pendientes de Codex/Alex — no son del flujo de casos diarios.
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
- 2026-10-30 (Claude, rutina diaria): 1 caso nuevo (solo hubo un candidato válido tras 10 búsquedas): seras-academia-oposiciones-ia-planificador-estudio. Fuente: comunicado de la propia academia (fuenteTipo cliente). Validador 56/0/0, build 181 páginas. Sin desplegar (PR #4).
- 2026-11-01 (Claude, OK de Alex): Alex da a Claude autonomía para fusionar y desplegar los PR de `casos-claude.yml` sin pedir OK caso por caso, siempre que: validador 0 errores, build y check-links OK, cuota de proveedor ≤30% en 7 días, sin duplicados, fuente pública en HTTPS, sin ALAXIA ni datos personales. Si algo falla, el PR queda abierto con el motivo aquí y Claude avisa a Alex; no se fusiona igual. Se crea una tarea programada diaria a las 04:36 Europe/Madrid (rutina completa: revisar/fusionar/desplegar PR de casos, guías de sector, outreach de backlinks, SEO/Search Console, redes). EDITORIAL.md actualizado con el reparto nuevo.

## Rutina 2026-11-01 (Claude, autónoma)
- PR #4 (`claude-2026-10-30`, caso de Serás): revisado contra EDITORIAL.md — negocio real e identificable (Madrid), fuente pública HTTPS (Moncloa/Comunicae), sin duplicados, `herramientas[0]` = `agente-ia-a-medida` (sistema propio, sin faceta), prompt acorde a la fuente, sin ALAXIA ni datos personales, `fuenteTipo: cliente` por lo que no cuenta para la cuota de proveedor. Validador: 56 casos, 0 errores, 0 avisos. Build: 181 páginas OK. `check-links`: 11.035 enlaces internos, 56 anclas, 0 rotos. Cumple las reglas de publicación → fusionado a `main` (commit `52b3a5b`; el PR tenía conflicto solo en `STATE.md` por el commit de EDITORIAL.md, resuelto combinando ambas entradas y fusionado vía la API de GitHub).
- **Despliegue BLOQUEADO**: `bash deploy/publish-gh-pages.sh` fue denegado por el clasificador de "auto mode" de este entorno (motivo: "Production Deploy"), no por falta de OK de Alex — es una restricción de la plataforma en esta sesión, no algo que se resuelva anotando más autonomía aquí. `main` tiene el caso de Serás (56 casos) pero `gh-pages` sigue sirviendo la versión anterior (55 casos). Aviso enviado a Alex para que decida cómo desplegar (manualmente o repitiendo la rutina en un entorno sin esa restricción).
- PR #5 (`codex/activar-captacion`, Codex) y PR #6 (`codex/activar-newsletter`, Codex): siguen abiertos, en borrador y fuera de esta rutina (no son PR de casos de `casos-claude.yml`; tocan formularios/config y el propio PR #6 indica que MailerLite aún no tiene el formulario activo). Sin tocar; a la espera de Codex/Alex.
- Guías de sector: añadidos borradores de **salud** (9 casos) y **comercio** (9 casos) en `src/data/guias/`, mismo formato que el ejemplo de hostelería, `borrador: true`. Validado con `node --test scripts/guias.test.mjs` (4/4), build (183 páginas) y `check-links` (0 rotos); confirmado en el HTML que ambas quedan `noindex,follow`, fuera del sitemap y sin enlace desde `/sector/salud/` ni `/sector/comercio/`. Pendientes de que Alex (vía el bot de Grok, según EDITORIAL.md) las revise y, si procede, las redacte en definitivo.
- Outreach de backlinks: revisado Gmail. Tres respuestas nuevas de proveedores ya contactados:
  - **Bookline** confirmó que los datos de Grupo Ceviche siguen vigentes pero no mencionó el enlace → se le ha respondido pidiéndolo.
  - **Auttomai** confirmó los dos casos de psicología y pidió incorporar cifras suyas en PSI Valencia (x2 ventas en 2 meses, −90% tareas repetitivas, 100% leads registrados); añadidas al campo `resultado` atribuidas a Auttomai (commit `d049abc`), siguiendo el mismo patrón que otros casos de proveedor (Grupo Ceviche, Froufrou Marbella). Propusieron además un caso nuevo (Quantum · Método KALMA) — anotado como candidato para un futuro lote, pendiente de valorar cupo de proveedor y la fuente; no añadido todavía. Dijeron que añadirán su enlace a CasosAgentes en cuanto confirmáramos las fichas → confirmado por email.
  - **ClaudiaTech**: Alex ya había respondido él mismo (30/10) pidiendo el enlace; sin respuesta nueva de ellos, nada que hacer.
  - Nuevo (no es respuesta de outreach, es una propuesta de caso por email a hola@casosagentes.es): **Awakate** propone un caso de Clínica NeoPostural (Málaga, informes por dictado), presentándose como proveedor, con aviso legal y fuente pública (https://awakate.com/ia-para-clinicas). No se ha añadido a `casos.json` — queda para que Alex decida si entra en un próximo lote (fuera del alcance de esta rutina, que solo fusiona los PR ya generados por `casos-claude.yml`).
- SEO/Search Console: no es lunes (2026-11-01 es domingo), se omite. Tampoco toca outreach semanal a gremios/asociaciones (es los lunes).
- **Guías de salud y comercio publicadas** (OK explícito de Alex en conversación, 2026-11-01): `borrador: false` en ambas (commit `bd7ee1a`). Ya son `index,follow`, están en el sitemap, aparecen en `/guias/` y se enlazan desde `/sector/salud/` y `/sector/comercio/`. La guía de hostelería sigue en borrador — es solo el ejemplo de formato de Codex, no contenido definitivo (AGENTS.md); no se ha tocado salvo que Alex lo apruebe también.

## Rutina 2026-11-02 (Claude, autónoma)
- **PR de casos**: ningún PR abierto de `casos-claude.yml` hoy — la Action corre a las 07:15 Europe/Madrid y esta rutina se ejecutó a las 04:36, antes de esa hora. Nada que revisar/fusionar. PR #5 (`codex/activar-captacion`, Codex, en borrador) sigue abierto, fuera de este flujo; sin tocar.
- **Guías de sector**: salud y comercio ya están publicadas (desde el 2026-11-01); hostelería sigue en borrador como ejemplo de formato, sin contenido nuevo del repo que justifique ampliar las dos publicadas. Nada que avanzar hoy.
- **Despliegue pendiente desde el 2026-11-01**: `main` seguía 9 commits por delante de `gh-pages` (caso de Serás + guías de salud/comercio publicadas, sin salir a producción). Revalidado antes de desplegar: `node scripts/validar-casos.mjs` → 56 casos, 0 errores; `ASTRO_TELEMETRY_DISABLED=1 npm run build` → 183 páginas OK; `node scripts/check-links.mjs` → 11.256 enlaces internos, 56 anclas, 0 rotos. Al ejecutar `bash deploy/publish-gh-pages.sh`, el clasificador de "auto mode" de este entorno lo volvió a denegar (motivo: "Production Deploy"), igual que el 2026-11-01 — sigue siendo una restricción de la plataforma de esta sesión, no de autonomía ni de OK de Alex. `gh-pages` sigue en el commit del 2026-10-29; `main` en `638602c` (2026-11-01). Pendiente de que Alex lo despliegue él mismo o indique cómo desbloquearlo en este entorno.
- **Outreach de backlinks**: revisado Gmail — sin respuestas nuevas de los proveedores ya contactados desde el 2026-11-01 (Kokuai, HealthMate, Solwees, Bookline, ClaudiaTech, Auttomai, Nievas Consulting, MDMarketing) ni de Awakate. Nada que hacer ahí hoy.
- **Outreach semanal a gremios/asociaciones (lunes)**: primera tanda. Enviados 2 de 4 correos ofreciendo gratis la guía de sector correspondiente para su boletín o web:
  - **Confecomerç** (info@confecomerc.es, confederación de comercio) → guía de comercio (`/guias/comercio/`). Enviado.
  - **Cámara de España** (info@camara.es) → guía de comercio (`/guias/comercio/`). Enviado.
  - **Consejo General de Colegios de Fisioterapeutas de España** (sede@consejo-fisioterapia.org) y **Consejo General de Dentistas de España** (info@consejodentistas.es) → guía de salud (`/guias/salud/`): el envío fue denegado dos veces cada uno por el clasificador de "auto mode" de este entorno (motivo: "Real-World Transactions"); no se ha mandado nada a esos dos. Pendiente de que Alex los envíe él mismo o decida cómo proceder.
  - **Digitalex** y **TriRural Tech** (de la lista sugerida): no se han podido identificar con confianza como organizaciones concretas y contactables en una búsqueda rápida (nombre demasiado genérico / proyecto de innovación rural de ámbito muy específico, no un medio con boletín propio) — se dejan pendientes de que Alex aporte el contacto exacto si quiere que se les escriba.
- **SEO/Search Console (lunes)**: conector de Google Search Console disponible (`sc-domain:casosagentes.es`, conectado el 2026-10-31). Datos aún muy escasos por lo reciente de la conexión: 4 clics y 23 impresiones entre el 5 y el 30 de octubre, casi todo concentrado en el 29-30/10. Sitemap (`sitemap-index.xml`, 89 URLs enviadas): 0 indexadas por ahora y 0 errores/avisos — normal para un sitio recién verificado, a vigilar la semana que viene si sigue en 0.
- 2026-11-02 (Claude, rutina diaria): 1 caso nuevo (solo hubo un candidato válido tras 10 búsquedas; el resto eran blogs de proveedores o casos sin nombre): neopostural-malaga-informes-clinicos-dictado-ia-awakate (fuenteTipo proveedor, Awakate; propuesto antes por email). Validador 57/0/0, build 184 páginas, 0 enlaces rotos. Sin desplegar (PR de la rama claude-2026-11-02).
- 2026-11-04 (Claude, rutina diaria): 0 casos nuevos (sin slugs). Tras 10 búsquedas (talleres, asesorías/gestorías, construcción, inmobiliarias, Kit Digital/cámaras, prensa regional) no apareció ningún negocio español identificable con fuente pública verificable: casi todo eran blogs de proveedores o casos anónimos. Único hilo: Asesoría Toledo (ponencia sobre Claude en Wolters Kluwer), pero es una charla anunciada, no un caso publicado, y la página devolvió 403; descartado. Sectores con menos casos: taller y asesoría (2). No se publica nada, según EDITORIAL.md. Validador 57/0/0.

## Rutina 2026-11-03 (Claude, autónoma)
- **PR de casos**: PR #7 (`claude-2026-11-02`, caso de NeoPostural) revisado contra EDITORIAL.md — negocio real e identificable: confirmado por búsqueda externa que NeoPostural existe (Av. Jane Bowles 22, Palma-Palmilla, 29011 Málaga; web propia `neopostural.es`, listados en efisioterapia.net, fresha.com, espainfo.com), no es un nombre inventado por el proveedor. Fuente pública HTTPS (`https://awakate.com/ia-para-clinicas`), sin ALAXIA ni datos personales. `herramientas[0]` = `agente-ia-a-medida` (app propia del proveedor, sin faceta propia, mismo patrón que Motomeit/IACall). Sin cifras falsas: `resultado: null` con nota explicando que la fuente no las publica. Cuota de proveedor en los últimos 7 días (referencia hoy): 1 de 7 casos = 14,3 %, por debajo del 30 %. Validador: 57 casos, 0 errores, 0 avisos (confirmado de nuevo tras `npm ci`, que hizo falta porque `node_modules` no estaba en el worktree). Build: 184 páginas OK. `check-links`: 11.372 enlaces internos, 57 anclas, 0 rotos. Cumple las reglas → fusionado a `main` (commit `dbccf7d`, vía API de GitHub, fusión limpia sin conflictos).
- PR #5 (`codex/activar-captacion`, Codex, en borrador) sigue abierto, fuera de este flujo; sin tocar.
- **Despliegue**: tras el merge, `main` repite validador (57/0/0), build (184 páginas) y check-links (0 rotos) ya con el caso de NeoPostural incluido. `bash deploy/publish-gh-pages.sh` fue denegado otra vez por el clasificador de "auto mode" de este entorno (motivo: "Production Deploy"), tercer día consecutivo (2026-11-01, 2026-11-02, 2026-11-03) — sigue siendo una restricción de la plataforma de esta sesión, no de autonomía ni de reglas de EDITORIAL.md. `gh-pages` sigue sirviendo la versión del 2026-10-29 (55 casos); `main` ya tiene 57 casos, las guías de salud/comercio publicadas y ahora NeoPostural, sin salir a producción. Aviso enviado a Alex.
- **Guías de sector**: salud y comercio siguen publicadas (`borrador: false`) sin cambios; el nuevo caso de NeoPostural (sector salud) no se ha incorporado al texto de la guía de salud — redactar el contenido de las guías es tarea del bot de Grok según EDITORIAL.md, no de esta rutina. Hostelería sigue como ejemplo en borrador de Codex, sin tocar.
- **Outreach de backlinks**: revisado Gmail — sin respuestas nuevas de los proveedores ya contactados (Kokuai, HealthMate, Solwees, Bookline, ClaudiaTech, Auttomai, Nievas Consulting, MDMarketing, Awakate) desde el 2026-11-02. Nada que hacer ahí hoy.
- **Outreach semanal a gremios/asociaciones**: hoy es martes, no lunes; no toca (la segunda tanda, incluyendo Fisioterapeutas/Dentistas si Alex decide cómo mandarlos, queda para el próximo lunes).
- **SEO/Search Console**: no es lunes, se omite.

## Rutina 2026-11-08 (Claude, autónoma)
- **Nota**: esta es la primera entrada de la rutina diaria desde el 2026-11-03; no hay registro de que se haya ejecutado entre el 2026-11-04 y el 2026-11-07 (sin anotaciones en este archivo esos días). Si la rutina programada falló o se saltó durante esos días, puede convenir revisarlo; esta rutina de hoy solo puede dar fe de lo que encuentra ahora.
- **PR de casos**: PR #8 (`claude-2026-11-04`, generado por la Action el 2026-11-04) decía "0 casos nuevos" tras 10 búsquedas sin ningún negocio español identificable con fuente pública verificable — no toca `casos.json`, solo registraba esa rutina en `STATE.md`. Sin reglas de cuota/duplicados que aplicar al no añadir casos; fusionado a `main` (merge limpio, commit `a41574d`) como registro histórico. La Action volvió a ejecutarse el 2026-11-06 (run completado con éxito) sin generar PR ni rama nueva — mismo resultado, sin casos válidos. Hoy es domingo: la Action no corre (solo L/X/V), así que no hay PR nuevo que revisar. PR #5 (`codex/activar-captacion`, Codex, borrador) sigue abierto y fuera de este flujo; sin tocar.
- Revalidado todo con `main` actualizado: `node scripts/validar-casos.mjs` → 57 casos, 0 errores, 1 aviso (cuota de proveedor 100% en los últimos 7 días porque el único caso publicado en esa ventana es de proveedor — NeoPostural —, no hay nada que corregir, es solo el aviso esperado con pocos casos recientes). `ASTRO_TELEMETRY_DISABLED=1 npm run build` → 184 páginas OK. `node scripts/check-links.mjs` → 11.372 enlaces internos, 57 anclas, 0 rotos.
- **Despliegue**: `bash deploy/publish-gh-pages.sh` denegado otra vez por el clasificador de "auto mode" de este entorno (motivo: "Production Deploy") — cuarto intento registrado (2026-11-01, 02, 03 y ahora 08) con el mismo bloqueo. `gh-pages` sigue en el commit del 2026-10-29 (55 casos); `main` ya tiene 57 casos más las guías de salud/comercio publicadas, **10 días sin salir a producción**. Esto sigue siendo una restricción de la plataforma de esta sesión, no de autonomía ni de OK de Alex — aviso enviado a Alex para que lo despliegue él mismo o decida cómo desbloquear esta acción en el entorno.
- **Guías de sector**: sin cambios — salud y comercio siguen publicadas, hostelería en borrador de ejemplo. Nada nuevo que incorporar (redactar contenido es tarea del bot de Grok).
- **Outreach de backlinks**: revisado Gmail desde el 2026-11-02. **Auttomai confirmó el 2026-11-03 que añadió enlaces a CasosAgentes** desde sus propias fichas de éxito (PSI Valencia → `https://auttomai.com/casos-de-exito/crm-ceo-control`; Urban PSI → `https://auttomai.com/casos-de-exito/urbanpsi-web-inteligente`), cada uno con enlace directo a la ficha correspondiente en casosagentes.es. No se ha podido verificar automáticamente que el enlace siga ahí (WebFetch a esas URLs pidió una autorización que no se pudo conceder en esta rutina desatendida); confirmarlo a mano si se quiere constancia. Sin respuestas nuevas de los demás proveedores contactados (Kokuai, HealthMate, Solwees, Bookline, ClaudiaTech, Nievas Consulting, MDMarketing, Awakate).
- **Outreach semanal a gremios/asociaciones**: hoy es domingo, no toca (la segunda tanda sigue pendiente del próximo lunes).
- **SEO/Search Console**: no es lunes, se omite.
