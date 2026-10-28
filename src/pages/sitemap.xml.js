// Copia de /sitemap-index.xml para herramientas que prueban /sitemap.xml por defecto.
export function GET({ site }) {
  const base = new URL(import.meta.env.BASE_URL, site).href.replace(/\/?$/, '/');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${base}sitemap-0.xml</loc></sitemap></sitemapindex>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
