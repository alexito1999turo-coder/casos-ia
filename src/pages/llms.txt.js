import casos from '../data/casos.json'; import { SITE, SECTORES, TAREAS, DESC_SECTOR, DESC_TAREA, HERR, MIN_INDEX, NOINDEX_FACETS } from '../data/meta.js';
const punto = s => String(s).trim().replace(/[.\s]+$/,'') + '.';
const cuenta = f => Object.entries(casos.reduce((a,c)=>(f(c).forEach(k=>a[k]=(a[k]||0)+1),a),{})).filter(([,n])=>n>=MIN_INDEX).sort((a,b)=>b[1]-a[1]);
export function GET(){
  const hoy = [...casos].map(c=>c.publicado).sort().pop();
  const sec = cuenta(c=>[c.sector]).map(([k,n])=>`- [IA para ${SECTORES[k].toLowerCase()}](${SITE.url}/sector/${k}/): ${n} casos. ${punto(DESC_SECTOR[k])}`).join('\n');
  const tar = cuenta(c=>[c.tarea]).map(([k,n])=>`- [${TAREAS[k]} con IA](${SITE.url}/tarea/${k}/): ${n} casos. ${punto(DESC_TAREA[k])}`).join('\n');
  const her = cuenta(c=>c.herramientas).filter(([k])=>!NOINDEX_FACETS.includes(`/herramientas/${k}/`)).map(([k,n])=>`- [${HERR[k]}](${SITE.url}/herramientas/${k}/): ${n} casos.`).join('\n');
  const body=`# ${SITE.nombre}\n\n> ${SITE.desc}\n\nActualizado: ${hoy}. ${casos.length} casos. Las cifras son las publicadas por cada fuente. Los prompts son ejemplos de CasosAgentes.\n\n## Sectores\n\n${sec}\n\n## Tareas\n\n${tar}\n\n## Herramientas\n\n${her}\n\n## Casos\n\n${casos.map(c=>`- [${c.titulo}](${SITE.url}/casos/${c.slug}/): ${c.resultado ? punto(c.resultado) : 'Sin cifra publicada.'} Herramienta: ${punto(c.herramienta)} Fuente: ${c.fuenteUrl}${(c.fuentesExtra||[]).map(f=>` (también: ${f.url})`).join("")}`).join('\n')}\n\n## Páginas\n\n- [Casos nuevos](${SITE.url}/nuevos/)\n- [Herramientas](${SITE.url}/herramientas/)\n- [Categorías: sector, tarea, ciudad](${SITE.url}/categorias/)\n- [RSS](${SITE.url}/feed.xml)\n- [Patrocinar](${SITE.url}/patrocinar/)\n- [Metodología](${SITE.url}/metodologia/)\n- [Sobre](${SITE.url}/sobre/)\n- [Enviar caso](${SITE.url}/enviar-caso/)\n`;
  return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}}); }
