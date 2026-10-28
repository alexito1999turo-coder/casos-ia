import { readdirSync, readFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import matter from 'gray-matter';
import { SECTORES } from './facets.mjs';

// Compartido por las páginas y el sitemap: un único criterio de publicación.
export function cargarGuias(directorio = resolve('src/data/guias')) {
  return readdirSync(directorio).filter(nombre => nombre.endsWith('.md')).sort().map(nombre => {
    const ruta = join(directorio, nombre);
    const { data } = matter(readFileSync(ruta, 'utf8'));
    const error = mensaje => { throw new Error(`[Guías] ${nombre}: ${mensaje}`); };
    for (const campo of ['titulo', 'descripcion', 'sector', 'actualizado']) {
      if (typeof data[campo] !== 'string' || !data[campo].trim()) error(`«${campo}» debe ser un texto no vacío.`);
    }
    if (!Object.hasOwn(SECTORES, data.sector)) error(`sector desconocido «${data.sector}».`);
    if (basename(nombre, '.md') !== data.sector) error('el nombre del archivo debe coincidir con «sector».');
    if (typeof data.borrador !== 'boolean') error('«borrador» debe ser true o false, sin comillas.');
    const fecha = /^\d{4}-\d{2}-\d{2}$/.test(data.actualizado) && Date.parse(`${data.actualizado}T00:00:00Z`);
    if (!Number.isFinite(fecha) || new Date(fecha).toISOString().slice(0, 10) !== data.actualizado || data.actualizado.startsWith('0000-')) {
      error('«actualizado» debe ser una fecha real AAAA-MM-DD entre comillas.');
    }
    return { titulo: data.titulo, descripcion: data.descripcion, sector: data.sector, actualizado: data.actualizado, borrador: data.borrador };
  });
}

// Conserva los enlaces Markdown internos también en builds con BASE_PATH.
export function enlacesGuias({ base = '/' } = {}) {
  const prefijo = base.replace(/\/$/, '');
  return (arbol, archivo) => {
    if (!prefijo || !archivo.history.some(ruta => ruta.replaceAll('\\', '/').includes('/src/data/guias/'))) return;
    const visitar = nodo => {
      if (['link', 'definition', 'image'].includes(nodo.type) && nodo.url?.startsWith('/') && !nodo.url.startsWith('//')) {
        nodo.url = prefijo + nodo.url;
      }
      nodo.children?.forEach(visitar);
    };
    visitar(arbol);
  };
}
