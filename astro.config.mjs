import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { thinFacets } from './src/data/facets.mjs';
import { cargarGuias, enlacesGuias } from './src/data/guias.mjs';
import { readdirSync, readFileSync } from 'node:fs';
import { titularPendiente, LEGAL_PAGES, mlAction, TITULAR } from './src/data/config.mjs';
// Candado legal: sin los 4 datos de TITULAR (config.mjs) el build de producción se para.
// Para una vista previa (formularios apagados, páginas legales noindex): PREVIEW=1 npx astro build  (o npm run build:preview)
const isBuild = process.argv.includes('build'); const preview = ['1','true'].includes(String(process.env.PREVIEW||'').toLowerCase());
if (isBuild && titularPendiente() && !preview) {
  const faltan = Object.entries(TITULAR).filter(([,v]) => !String(v).trim()).map(([k]) => `TITULAR.${k}`).join(', ');
  throw new Error(`\n\n[CasosAgentes] Build de producción bloqueado: faltan datos del titular en src/data/config.mjs (${faltan}).\nSin responsable identificado (LSSI art. 10, RGPD art. 13) no se publica.\nRellénalos, o haz una vista previa con: PREVIEW=1 npx astro build  (npm run build:preview)\n`);
}
if (isBuild && preview) console.warn('[CasosAgentes] Build de VISTA PREVIA (PREVIEW=1): no desplegar en producción.');
// Páginas retiradas (noindex + refresh) fuera del sitemap
const retired = ['casos','sector','ciudad','herramientas'].flatMap(d => readdirSync(`./src/pages/${d}`).filter(f => f.endsWith('.astro') && !f.startsWith('[') && readFileSync(`./src/pages/${d}/${f}`,'utf8').includes('http-equiv="refresh"')).map(f => `/${d}/${f.slice(0,-6)}/`));
// Dominio propio casosagentes.es (public/CNAME). Para la URL antigua de Pages: SITE_URL=https://alexito1999turo-coder.github.io BASE_PATH=/casos-ia
const site = process.env.SITE_URL || 'https://casosagentes.es';
const base = process.env.BASE_PATH || '/';
const guias = cargarGuias();
const guiasNoIndex = new Set(guias.filter(guia => guia.borrador).map(guia => `/guias/${guia.sector}/`));
if (!guias.some(guia => !guia.borrador)) guiasNoIndex.add('/guias/');
const thin = thinFacets(); ['/enviar-caso/', ...(mlAction() ? [] : ['/newsletter/']), ...(titularPendiente() ? LEGAL_PAGES : []),'/casos/clinica-domenech-valencia-kokuai/','/casos/inmobiliaria-madrid-whatsapp-ia-cualifica-leads/','/casos/glop-mcp-tpv-hosteleria-chatgpt-claude/','/casos/camby-web-asistente-energetico-gpt/', ...retired].forEach(p=>thin.add(p)); const b = base.replace(/\/$/,'');
export default defineConfig({ site, base, trailingSlash: 'ignore',
  markdown: { remarkPlugins: [[enlacesGuias, { base }]] },
  integrations: [sitemap({ filter: (p) => { const path = new URL(p).pathname.slice(b.length) || '/'; const normalizado = path.endsWith('/') ? path : path + '/'; return !thin.has(normalizado) && !guiasNoIndex.has(normalizado); } })] });
