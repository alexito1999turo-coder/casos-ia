import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
// GitHub Pages por defecto. Para casosia.es: SITE_URL=https://casosia.es BASE_PATH=/ (y public/CNAME)
const site = process.env.SITE_URL || 'https://alexito1999turo-coder.github.io';
const base = process.env.BASE_PATH || '/casos-ia';
export default defineConfig({ site, base, integrations: [sitemap()], trailingSlash: 'ignore' });
