import test from 'node:test';
import assert from 'node:assert/strict';
import * as facetas from '../src/data/facets.mjs';
import { validarCasos } from './validar-casos.mjs';

const ahora = new Date('2026-10-28T12:00:00Z');
const caso = cambios => ({
  slug: 'caso-valido', titulo: 'Título', resumen: 'Resumen', sector: 'comercio',
  tarea: 'marketing', herramientas: ['chatgpt'], prompt: 'Un prompt', fuente: 'Fuente',
  fuenteUrl: 'https://ejemplo.es/caso', fuenteTipo: 'prensa', publicado: '2026-10-28',
  ...cambios,
});
const validar = casos => validarCasos(casos, facetas, ahora);

test('acepta un caso válido, fechas parciales de fuente y años bisiestos', () => {
  for (const fecha of ['2026', '2026-09', '2024-02-29', 'no indicado']) {
    assert.deepEqual(validar([caso({ fecha, revisado: '2024-02-29' })]), { errores: [], avisos: [] });
  }
});

test('rechaza estructuras y campos obligatorios vacíos o de tipo incorrecto', () => {
  assert.ok(validar({}).errores.length);
  for (const valor of [null, [], 'texto', 42]) assert.ok(validar([valor]).errores.length);
  for (const campo of ['titulo', 'resumen', 'sector', 'tarea', 'prompt', 'fuente', 'fuenteUrl', 'fuenteTipo', 'publicado']) {
    for (const valor of [undefined, null, '', '  ', 123, []]) {
      assert.ok(validar([caso({ [campo]: valor })]).errores.some(e => e.includes(campo)), `${campo}: ${valor}`);
    }
  }
  for (const herramientas of [undefined, null, '', [], [''], ['desconocida'], ['chatgpt', null]]) {
    assert.ok(validar([caso({ herramientas })]).errores.some(e => e.includes('herramientas')));
  }
});

test('rechaza slugs duplicados e inválidos e identifica los casos', () => {
  assert.match(validar([caso(), caso()]).errores.join(), /Caso 2.*duplicado.*caso 1/);
  for (const slug of ['', 'Con-Mayusculas', 'con_underscore', '-inicio', 'final-', 'doble--guion', 'con/diagonal', 'ñ', null]) {
    assert.ok(validar([caso({ slug })]).errores.some(e => e.includes('slug inválido')));
  }
});

test('solo acepta claves propias de los catálogos compartidos', () => {
  for (const campo of ['sector', 'tarea', 'fuenteTipo']) {
    for (const valor of ['desconocido', 'toString', '__proto__']) {
      assert.ok(validar([caso({ [campo]: valor })]).errores.some(e => e.includes(campo)));
    }
  }
  assert.ok(validar([caso({ herramientas: ['toString'] })]).errores.length);
});

test('rechaza URLs sin HTTPS y fechas imposibles o mal formadas', () => {
  for (const fuenteUrl of ['http://ejemplo.es', 'https://', '/caso', 'https:ejemplo.es', ' https://ejemplo.es']) {
    assert.ok(validar([caso({ fuenteUrl })]).errores.some(e => e.includes('fuenteUrl')));
  }
  for (const campo of ['publicado', 'revisado', 'fecha']) {
    for (const valor of ['2026-02-29', '2026-04-31', '2026-13-01', '28/10/2026', '2026-1-01', '0000-01-01', null]) {
      assert.ok(validar([caso({ [campo]: valor })]).errores.some(e => e.includes(campo)), `${campo}: ${valor}`);
    }
  }
  for (const publicado of ['2026', '2026-10', '2026-10-28T12:00:00Z']) assert.ok(validar([caso({ publicado })]).errores.length);
  assert.ok(validar([caso({ fecha: '2026-13' })]).errores.length);
});

test('prompts idénticos y costes sin Estimación solo avisan', () => {
  const resultado = validar([caso(), caso({ slug: 'segundo', prompt: ' Un prompt ', costeOrientativo: '50 €/mes' })]);
  assert.equal(resultado.errores.length, 0);
  assert.equal(resultado.avisos.length, 2);
  assert.match(resultado.avisos.join(), /caso-valido.*segundo/);
  assert.equal(validar([caso({ costeOrientativo: 'Estimación de CasosAgentes: 0 €' })]).avisos.length, 0);
  assert.equal(validar([caso({ costeOrientativo: 'Desestimación' })]).avisos.length, 1);
});

test('la cuota de proveedor solo avisa por encima del 30 % en los últimos 7 días', () => {
  const lote = n => Array.from({ length: 10 }, (_, i) => caso({
    slug: `caso-${i}`, prompt: `Prompt ${i}`, fuenteTipo: i < n ? 'proveedor' : 'cliente',
  }));
  assert.equal(validar(lote(3)).avisos.length, 0);
  const resultado = validar(lote(4));
  assert.equal(resultado.errores.length, 0);
  assert.match(resultado.avisos.join(), /4\/10 \(40 %\)/);
  for (const publicado of ['2026-10-21', '2026-10-29']) {
    assert.equal(validar([caso({ publicado, fuenteTipo: 'proveedor' })]).avisos.length, 0);
  }
  assert.match(validar([caso({ publicado: '2026-10-22', fuenteTipo: 'proveedor' })]).avisos.join(), /1\/1/);
  assert.deepEqual(validar([]), { errores: [], avisos: [] });
});

