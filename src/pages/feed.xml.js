import casos from '../data/casos.json'; import { SITE } from '../data/meta.js';
const fd=c=>/^\d{4}-\d{2}-\d{2}$/.test(c.fecha||'')?c.fecha:c.publicado;
const x=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
export function GET(){ const it=[...casos].sort((a,b)=>b.publicado.localeCompare(a.publicado)||fd(b).localeCompare(fd(a))).map(c=>`<item><title>${x(c.titulo)}</title><link>${SITE.url}/casos/${c.slug}/</link><guid>${SITE.url}/casos/${c.slug}/</guid><pubDate>${new Date(fd(c)+'T09:00:00Z').toUTCString()}</pubDate><description>${x((c.resultado?c.resultado+'. ':'')+c.resumen)}</description></item>`).join('');
return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE.nombre}</title><link>${SITE.url}/</link><description>${x(SITE.desc)}</description><language>es-es</language>${it}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}}); }
