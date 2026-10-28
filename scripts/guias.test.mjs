import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { cargarGuias, enlacesGuias } from '../src/data/guias.mjs';

const documento = cambios => {
  const datos = { titulo: 'Guía', descripcion: 'Descripción', sector: 'hosteleria', actualizado: '2026-10-28', borrador: true, ...cambios };
  return `---\n${Object.entries(datos).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n')}\n---\n\n## Ejemplo\n`;
};
function conDirectorio(ejecutar) {
  const directorio = mkdtempSync(join(tmpdir(), 'guias-'));
  try { ejecutar(directorio); } finally { rmSync(directorio, { recursive: true, force: true }); }
}

test('carga borradores y guías publicadas, y admite un directorio vacío', () => conDirectorio(d => {
  assert.deepEqual(cargarGuias(d), []);
  for (const borrador of [true, false]) {
    writeFileSync(join(d, 'hosteleria.md'), documento({ borrador }));
    const [guia] = cargarGuias(d);
    assert.equal(guia.borrador, borrador);
    assert.equal(guia.sector, 'hosteleria');
  }
}));

test('rechaza frontmatter incompleto, sectores desconocidos y nombres que no coinciden', () => conDirectorio(d => {
  for (const campo of ['titulo', 'descripcion', 'sector', 'actualizado']) {
    writeFileSync(join(d, 'hosteleria.md'), documento({ [campo]: '' }));
    assert.throws(() => cargarGuias(d), new RegExp(`hosteleria.md:.*${campo}`));
  }
  for (const sector of ['inventado', 'toString', 'comercio']) {
    writeFileSync(join(d, 'hosteleria.md'), documento({ sector }));
    assert.throws(() => cargarGuias(d), /\[Guías\] hosteleria.md:/);
  }
  for (const borrador of [null, 'true', 'false', 1]) {
    writeFileSync(join(d, 'hosteleria.md'), documento({ borrador }));
    assert.throws(() => cargarGuias(d), /borrador/);
  }
}));

test('rechaza fechas imposibles y acepta fechas reales, incluido un año bisiesto', () => conDirectorio(d => {
  for (const actualizado of ['2026-02-29', '2026-04-31', '2026-13-01', '2026-1-01', '0000-01-01']) {
    writeFileSync(join(d, 'hosteleria.md'), documento({ actualizado }));
    assert.throws(() => cargarGuias(d), /actualizado/);
  }
  writeFileSync(join(d, 'hosteleria.md'), documento({ actualizado: '2024-02-29' }));
  assert.equal(cargarGuias(d)[0].actualizado, '2024-02-29');
}));

test('adapta enlaces Markdown de las guías a BASE_PATH sin tocar otras páginas o URLs externas', () => {
  const crearArbol = () => ({ children: [
    { type: 'link', url: '/casos/ejemplo/' }, { type: 'definition', url: '/sector/hosteleria/' },
    { type: 'link', url: 'https://ejemplo.es/' }, { type: 'link', url: '#reservas' },
    { type: 'link', url: '//ejemplo.es/' },
  ] });
  const arbol = crearArbol();
  enlacesGuias({ base: '/casos-ia/' })(arbol, { history: ['/repo/src/data/guias/hosteleria.md'] });
  assert.deepEqual(arbol.children.map(n => n.url), ['/casos-ia/casos/ejemplo/', '/casos-ia/sector/hosteleria/', 'https://ejemplo.es/', '#reservas', '//ejemplo.es/']);
  for (const [base, archivo] of [['/', '/repo/src/data/guias/hosteleria.md'], ['/casos-ia/', '/repo/src/pages/sobre.md']]) {
    const intacto = crearArbol();
    enlacesGuias({ base })(intacto, { history: [archivo] });
    assert.deepEqual(intacto, crearArbol());
  }
});
