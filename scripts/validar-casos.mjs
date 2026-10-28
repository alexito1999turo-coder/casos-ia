import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const texto = valor => typeof valor === 'string' && valor.trim().length > 0;
const DIA = 864e5;

// La fecha de la fuente puede tener precisión de año, mes o día.
function fechaValida(valor, parcial = false) {
  if (typeof valor !== 'string') return false;
  const patron = parcial ? /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/ : /^\d{4}-\d{2}-\d{2}$/;
  if (!patron.test(valor)) return false;
  const [ano, mes = '01', dia = '01'] = valor.split('-');
  if (Number(ano) === 0) return false;
  const completa = `${ano}-${mes}-${dia}`;
  const tiempo = Date.parse(`${completa}T00:00:00Z`);
  return Number.isFinite(tiempo) && new Date(tiempo).toISOString().slice(0, 10) === completa;
}

export function validarCasos(casos, facetas, ahora = new Date()) {
  const errores = [], avisos = [];
  if (!Array.isArray(casos)) return { errores: ['casos.json debe contener una lista de casos.'], avisos };
  const slugs = new Map(), prompts = new Map();
  const obligatorios = ['titulo', 'resumen', 'sector', 'tarea', 'prompt', 'fuente', 'fuenteUrl', 'fuenteTipo', 'publicado'];
  const catalogos = { sector: facetas.SECTORES, tarea: facetas.TAREAS, fuenteTipo: facetas.FUENTE_TIPOS };
  const recientes = [];

  casos.forEach((c, indice) => {
    const fila = `Caso ${indice + 1}`;
    if (!c || typeof c !== 'object' || Array.isArray(c)) {
      errores.push(`${fila}: debe ser un objeto.`);
      return;
    }
    const etiqueta = texto(c.slug) ? `${fila} (${c.slug})` : fila;
    const error = mensaje => errores.push(`${etiqueta}: ${mensaje}`);
    if (typeof c.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug)) {
      error('slug inválido; usa minúsculas, números y guiones simples entre palabras.');
    }
    if (texto(c.slug)) {
      if (slugs.has(c.slug)) error(`slug duplicado; ya aparece en el caso ${slugs.get(c.slug)}.`);
      else slugs.set(c.slug, indice + 1);
    }
    for (const campo of obligatorios) {
      if (!texto(c[campo])) error(`el campo obligatorio «${campo}» debe ser un texto no vacío.`);
    }
    for (const [campo, catalogo] of Object.entries(catalogos)) {
      if (texto(c[campo]) && !Object.hasOwn(catalogo, c[campo])) {
        error(`«${campo}»: valor desconocido «${c[campo]}»; consulta facets.mjs.`);
      }
    }
    if (!Array.isArray(c.herramientas) || c.herramientas.length === 0) {
      error('el campo obligatorio «herramientas» debe ser una lista no vacía.');
    } else {
      c.herramientas.forEach((herramienta, i) => {
        if (!texto(herramienta) || !Object.hasOwn(facetas.HERR, herramienta)) {
          error(`herramientas[${i}]: valor desconocido ${JSON.stringify(herramienta)}; consulta facets.mjs.`);
        }
      });
    }
    if (texto(c.fuenteUrl)) {
      try {
        const url = new URL(c.fuenteUrl);
        if (!/^https:\/\//i.test(c.fuenteUrl) || url.protocol !== 'https:' || !url.hostname || c.fuenteUrl !== c.fuenteUrl.trim()) {
          throw new Error();
        }
      } catch {
        error('«fuenteUrl» debe ser una URL absoluta válida que empiece por https://.');
      }
    }
    for (const campo of ['publicado', 'revisado']) {
      if ((campo === 'publicado' || Object.hasOwn(c, campo)) && !fechaValida(c[campo])) {
        error(`«${campo}» debe ser una fecha real con formato AAAA-MM-DD.`);
      }
    }
    if (Object.hasOwn(c, 'fecha') && c.fecha !== 'no indicado' && !fechaValida(c.fecha, true)) {
      error('«fecha» debe ser una fecha real AAAA, AAAA-MM o AAAA-MM-DD, o «no indicado».');
    }
    if (texto(c.prompt)) {
      const prompt = c.prompt.trim();
      const grupo = prompts.get(prompt) ?? [];
      grupo.push(etiqueta);
      prompts.set(prompt, grupo);
    }
    if (Object.hasOwn(c, 'costeOrientativo') &&
        (typeof c.costeOrientativo !== 'string' || !/\bEstimación\b/iu.test(c.costeOrientativo))) {
      avisos.push(`${etiqueta}: «costeOrientativo» no contiene la palabra «Estimación».`);
    }
    const edad = ahora.getTime() - Date.parse(`${c.publicado}T00:00:00Z`);
    if (fechaValida(c.publicado) && edad >= 0 && edad < 7 * DIA) recientes.push(c);
  });

  for (const grupo of prompts.values()) {
    if (grupo.length > 1) avisos.push(`Prompt idéntico en: ${grupo.join('; ')}.`);
  }
  const proveedores = recientes.filter(c => c.fuenteTipo === 'proveedor').length;
  if (proveedores * 100 > recientes.length * 30) {
    const porcentaje = (100 * proveedores / recientes.length).toLocaleString('es-ES', { maximumFractionDigits: 1 });
    avisos.push(`Más del 30 % de casos de proveedor entre los publicados en los últimos 7 días: ${proveedores}/${recientes.length} (${porcentaje} %).`);
  }
  return { errores, avisos };
}

async function main() {
  try {
    const ruta = new URL('../src/data/casos.json', import.meta.url);
    const casos = JSON.parse(readFileSync(ruta, 'utf8'));
    // Importar después de leer el JSON permite informar también de JSON mal formado.
    const facetas = await import('../src/data/facets.mjs');
    const { errores, avisos } = validarCasos(casos, facetas);
    avisos.forEach(mensaje => console.warn(`AVISO: ${mensaje}`));
    errores.forEach(mensaje => console.error(`ERROR: ${mensaje}`));
    console.log(`Validación de casos: ${Array.isArray(casos) ? casos.length : 0} casos, ${errores.length} errores, ${avisos.length} avisos.`);
    if (errores.length) process.exitCode = 1;
  } catch (error) {
    console.error(`ERROR: no se pudo validar casos.json: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main();
