# CasosAgentes

Directorio de casos reales de agentes de IA para autónomos y pymes en España: **https://casosagentes.es/**.

- Stack: Astro estático. Datos en `src/data/casos.json` (campos: slug, titulo, tituloSeo opcional, resumen, resultado, resultadoNota, sector, tarea, herramienta, herramientas[], ciudad, prompt, adaptacion, fuente, fuenteUrl, fuenteTipo [proveedor|prensa|red social|cliente], fecha, publicado).
- Facetas (sector/tarea/ciudad/herramienta) con menos de 3 casos: `noindex,follow` y fuera del sitemap (`src/data/facets.mjs`).
- Publicar: `bash deploy/publish-gh-pages.sh` · con dominio: `DOMAIN=casosagentes.es bash deploy/publish-gh-pages.sh`.
- Metodología editorial: `/metodologia/`.

## Captación y monetización

Todo se configura en **un único archivo: `src/data/config.mjs`**. Mientras un valor esté vacío, esa parte no se activa: los formularios muestran «Próximamente» (o un `mailto:` si hay `CONTACT_EMAIL`) y nunca fingen que envían; las páginas legales muestran `[PLACEHOLDER]` y van en `noindex` y fuera del sitemap.

Estado 2026-10-30: el grupo y formulario de MailerLite y los dos formularios de Tally están creados. Tally avisa por email de nuevas respuestas. Umami Cloud tiene registrado `casosagentes.es` en la región UE (Frankfurt). Sus identificadores públicos están configurados en la rama `codex/activar-captacion`; aún falta integrar esa rama en la web pública.

| Qué crear | Dónde | Valor que hay que pegar en `config.mjs` |
|---|---|---|
| Email de contacto (p. ej. hola@casosagentes.es) | Proveedor de correo del dominio | `CONTACT_EMAIL` |
| Datos del titular (LSSI art. 10) | — | `TITULAR.nombre`, `TITULAR.nif`, `TITULAR.direccion`, `TITULAR.email` |
| Grupo «CasosAgentes» y formulario embebido con **doble opt-in** | MailerLite → Forms → Embedded form (asignado al grupo) | De su código HTML, la URL `https://assets.mailerlite.com/jsonp/<accountId>/forms/<formId>/subscribe` → `MAILERLITE.accountId` y `MAILERLITE.formId` |
| Formulario «Envía un caso» | Tally (gratis). Campos: negocio, ciudad, URL de la fuente, herramienta, qué hicieron, resultado, email (opcional), **casilla obligatoria de consentimiento RGPD**. La web enlaza a /privacidad justo antes del formulario. | ID de `tally.so/r/<ID>` → `TALLY.enviarCaso` |
| Formulario «Plaza de fundador» | Tally. Campos: empresa, web, nombre, email, producto, formato de interés, mensaje, **casilla obligatoria de consentimiento RGPD** | ID → `TALLY.patrocinar` |
| Afiliación (opcional, más adelante) | Make (Wise), n8n en PartnerStack (PayPal), Lovable en Impact | `AFILIADOS.<clave>.url` y `activo: true`; además, en `casos.json`, `"afiliado": "<clave>"` solo en casos cuya herramienta ya está en `herramientas[]` |

**Candado legal.** Mientras falte cualquiera de los 4 campos de `TITULAR`:
- la newsletter y los dos formularios de Tally no se activan aunque estén sus IDs (no se recoge ningún dato);
- `/patrocinar` sigue indexable pero dice «Aún no aceptamos patrocinios» y no muestra formulario;
- `npm run build` / `npx astro build` (y por tanto `deploy/publish-gh-pages.sh` y el workflow de GitHub Pages) **fallan** con un mensaje que lista los campos que faltan;
- para revisar el sitio sin desplegar: `npm run build:preview` (equivale a `PREVIEW=1 npx astro build`). Ese `dist/` es solo de revisión: no se publica.

Notas:
- En MailerLite, el texto de consentimiento y la casilla GDPR ya los pinta nuestro formulario; el doble opt-in está activo. La dirección postal de la cuenta coincide con el aviso legal de la web.
- En Tally, las notificaciones por email están activas para ambos formularios. La marca de Tally se mantiene en el plan gratuito.
- Tras pegar los valores: `npm run build` y desplegar. La newsletter pasa a `index` y entra en el sitemap; aviso legal, privacidad y transparencia pasan a `index` cuando los 4 campos de `TITULAR` estén rellenos.
- Campo opcional nuevo en `casos.json`: `afiliado` (clave de `AFILIADOS`). Hoy ningún caso lo usa.
