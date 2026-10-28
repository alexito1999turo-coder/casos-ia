# Cómo trabajamos en CasosAgentes

Este repo lo mantienen tres asistentes de IA (el bot de Grok, Claude y Codex) y Alex. Este archivo es el acuerdo entre todos. **Léelo antes de cada rutina.** Si algo de aquí choca con una instrucción antigua, manda este archivo. La estrategia completa está en el doc de Alex «Estrategia CasosAgentes».

## Quién hace qué

| Quién | Qué hace | Qué no hace |
| --- | --- | --- |
| Bot de Grok (Investigador + Director) | Busca casos cada día, prepara lotes, los revisa y los publica cuando Alex lo aprueba. Redacta las guías de sector. | Cambiar el diseño, las páginas legales o la configuración sin OK de Alex. |
| Claude | Revisión semanal de calidad, cambios de código y estructura, cuentas y formularios (MailerLite, Tally, Umami), Search Console, promoción y estrategia. | Publicar casos nuevos (eso es del bot). |
| Codex | Desarrollo de funciones y cambios de código que Alex le encargue (por ejemplo, mostrar los campos nuevos de los casos), siempre en una rama propia `codex/<tarea>` y con descripción del cambio para que Claude lo revise. | Publicar casos, tocar `casos.json` en masa, cambiar el diseño sin OK de Alex o desplegar. |
| Alex | Aprueba lo que se publica y lo que habla en su nombre. | — |

## Reglas para publicar casos

1. **Negocio real e identificable en España**, con fuente pública enlazable. Nada de particulares sin negocio, ni anónimos, ni contenido adulto.
2. **Proveedores: máximo el 30 % de los casos nuevos de cada semana.** Prioridad: prensa, el propio negocio (`cliente`) y programas públicos (`institucional`). Si no hay casos buenos, no se publica.
3. **Un caso por negocio y solución.** Si un proveedor tiene varios testimonios casi iguales, se publica el mejor; no cuatro fichas gemelas.
4. **La herramienta principal (`herramientas[0]`) es el producto que hace el trabajo, no el canal.** Ejemplo: `["healthmate","whatsapp-business"]`, no al revés. Si es un producto de un proveedor sin faceta propia, se usa `agente-ia-a-medida` (como IACall o Motomeit).
5. **El prompt tiene que corresponder a lo que hizo ese negocio** según la fuente, no a otro uso de la misma herramienta. Si un proveedor tiene varios casos, cada uno con su prompt.
6. Las cifras, solo si la fuente las publica, y diciendo quién las da.

## Campos nuevos en `casos.json` (opcionales, todavía no se muestran)

Rellenarlos en los casos nuevos; Claude activará su visualización cuando haya bastantes:

- `esParaTi`: una línea con el tipo y tamaño de negocio donde encaja.
- `costeOrientativo`: rango de puesta en marcha y mensual, marcado como estimación.
- `primerPaso`: lo mínimo que se puede probar mañana con una herramienta gratuita.
- `revisado`: fecha `AAAA-MM-DD` de la última comprobación de que la fuente sigue en pie.

## Guías de sector (tarea del bot de Grok)

- Cada guía vive en `src/data/guias/<sector>.md` (formato en `AGENTS.md`). Ya hay un ejemplo de hostelería en borrador hecho por Codex: úsalo como modelo y reescríbelo.
- Solo con lo que dicen los casos del repo, enlazando cada caso; sin cifras que no estén en `casos.json`.
- Empezar por hostelería, salud y comercio. Se entregan con `borrador: true`; el paso a `false` lo aprueba Alex.

## Cómo tocar el repo sin pisarnos

- Antes de cambiar nada: `git fetch origin main` y partir de lo último. Nunca revertir cambios de otro sin preguntar a Alex.
- Commits pequeños, con un mensaje que diga qué y por qué.
- **No desplegar sin OK de Alex.** Despliegue: `bash deploy/publish-gh-pages.sh` desde `main` actualizado.
- Cada cambio relevante se anota en `STATE.md`, con fecha y autor (Grok, Claude o Codex).
- **Una tarea, un dueño.** Antes de empezar algo, mira en `STATE.md` si otro asistente lo tiene en curso; si no, anótalo como «en curso (autor)». Así no trabajamos dos en lo mismo.
- Claude y Codex trabajan en ramas; solo se fusiona a `main` lo revisado. El bot de Grok sigue con sus lotes de casos como hasta ahora.
- No tocar el diseño (CSS, maquetación, componentes visuales) sin OK explícito de Alex.

## Cosas que ya están decididas (no deshacer)

- Contadores: la barra «En el directorio» cuenta todas las herramientas de cada caso, igual que el filtro. La franja de la portada cuenta los casos de los últimos 7 días, igual que la etiqueta «Nuevo».
- Páginas `/sobre/` (ampliada) y `/contacto/` (nueva).
- **CasosAgentes y ALAXIA (la agencia de Alex) van separadas.** La web no menciona ALAXIA ni vende servicios; Alex usa los casos por su cuenta en su prospección. No añadir enlaces, bloques ni menciones a ALAXIA.
- Search Console: propiedad de dominio `casosagentes.es`, sitemap `https://casosagentes.es/sitemap-index.xml`.
