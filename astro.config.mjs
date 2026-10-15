import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { thinFacets } from './src/data/facets.mjs';
// GitHub Pages por defecto. Para casosagentes.es: SITE_URL=https://casosagentes.es BASE_PATH=/ (y public/CNAME)
const site = process.env.SITE_URL || 'https://alexito1999turo-coder.github.io';
const base = process.env.BASE_PATH || '/casos-ia';
const thin = thinFacets(); ['/privacidad/','/enviar-caso/','/newsletter/'].forEach(p=>thin.add(p)); const b = base.replace(/\/$/,'');
export default defineConfig({ site, base, trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (p) => { const path = new URL(p).pathname.slice(b.length) || '/'; return !thin.has(path.endsWith('/')?path:path+'/'); } })] });
