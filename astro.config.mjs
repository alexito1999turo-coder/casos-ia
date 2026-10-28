import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { thinFacets } from './src/data/facets.mjs';
import { readdirSync, readFileSync } from 'node:fs';
import { titularPendiente, LEGAL_PAGES, mlAction } from './src/data/config.mjs';
// Páginas retiradas (noindex + refresh) fuera del sitemap
const retired = ['casos','sector','ciudad','herramientas'].flatMap(d => readdirSync(`./src/pages/${d}`).filter(f => f.endsWith('.astro') && !f.startsWith('[') && readFileSync(`./src/pages/${d}/${f}`,'utf8').includes('http-equiv="refresh"')).map(f => `/${d}/${f.slice(0,-6)}/`));
// GitHub Pages por defecto. Para casosagentes.es: SITE_URL=https://casosagentes.es BASE_PATH=/ (y public/CNAME)
const site = process.env.SITE_URL || 'https://alexito1999turo-coder.github.io';
const base = process.env.BASE_PATH || '/casos-ia';
const thin = thinFacets(); ['/enviar-caso/', ...(mlAction() ? [] : ['/newsletter/']), ...(titularPendiente() ? LEGAL_PAGES : []),'/casos/clinica-domenech-valencia-kokuai/','/casos/inmobiliaria-madrid-whatsapp-ia-cualifica-leads/','/casos/glop-mcp-tpv-hosteleria-chatgpt-claude/','/casos/camby-web-asistente-energetico-gpt/', ...retired].forEach(p=>thin.add(p)); const b = base.replace(/\/$/,'');
export default defineConfig({ site, base, trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (p) => { const path = new URL(p).pathname.slice(b.length) || '/'; return !thin.has(path.endsWith('/')?path:path+'/'); } })] });
