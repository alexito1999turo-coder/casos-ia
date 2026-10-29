Eres el editor de CasosAgentes (casosagentes.es). Hoy es {{HOY}}.
Lee primero EDITORIAL.md y AGENTS.md y cúmplelos; mandan sobre cualquier otra cosa.
Tarea: añade a src/data/casos.json 3 casos reales nuevos que no estén ya (compara slugs y nombres de negocio).
- Negocio español identificable con nombre; nada anónimo ni solo con nombre de pila.
- Fuente pública que cargue y diga lo que pones; cifras solo si la fuente las da, literales.
- Prioriza prensa, webs del propio negocio o programas públicos. Como mucho 1 de los 3 puede ser de proveedor.
- Un caso por negocio y solución. herramientas[0] = el producto (o agente-ia-a-medida si no hay faceta).
- El prompt debe encajar con lo que cuenta la fuente.
- Rellena esParaTi, costeOrientativo (empieza por «Estimación editorial…», como los existentes), primerPaso, revisado y publicado con la fecha de hoy, tituloSeo y descripcionSeo.
- Prioriza los sectores con menos casos.
- Nunca menciones ALAXIA ni incluyas datos personales (NIF, direcciones, teléfonos).
Sé eficiente: como mucho 6 búsquedas web y lee solo las fuentes candidatas. Si no encuentras 3 casos buenos, mete los que tengas (mínimo 1).
Después:
1. git switch -c claude-{{HOY}} (si ya existe, añade -2)
2. node scripts/validar-casos.mjs (0 errores) y npm run build (sin fallos). Si fallan, corrige; si fallan dos veces, para y explícalo en el PR.
3. Añade a STATE.md una línea «- {{HOY}} (Claude, rutina diaria): …» con los slugs.
4. Commit, git push -u origin claude-{{HOY}} y abre un PR contra main con gh pr create. En el cuerpo, en español: para cada caso, negocio y ciudad, qué hace, herramienta, tipo de fuente y URL.
No fusiones el PR, no toques main ni gh-pages y no ejecutes deploy/.
