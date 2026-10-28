// Comprueba enlaces internos (href/src) de dist/ sin dependencias: node scripts/check-links.mjs [base=/casos-ia]
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const DIST = 'dist', BASE = (process.argv[2] ?? process.env.BASE_PATH ?? '/casos-ia').replace(/\/$/, '');
const files = []; const walk = d => readdirSync(d).forEach(f => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); }); walk(DIST);
const html = files.filter(f => f.endsWith('.html'));
const ok = p => { const rel = decodeURIComponent(p.slice(BASE.length)).replace(/^\//, ''); const t = join(DIST, rel);
  return existsSync(t) && (statSync(t).isFile() || existsSync(join(t, 'index.html'))) || existsSync(t + '.html'); };
const bad = []; let n = 0, ids = 0;
for (const f of html) { const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\s(?:href|src)="([^"]+)"/g)) { let h = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(h)) continue;
    if (h.startsWith('#')) { ids++; const id = h.slice(1); if (id && !s.includes(`id="${id}"`)) bad.push([f, h]); continue; }
    const path = h.split(/[?#]/)[0]; if (!path) continue; n++;
    if (!path.startsWith(BASE + '/') && path !== BASE) { bad.push([f, h + ' (fuera de BASE)']); continue; }
    if (!ok(path)) bad.push([f, h]); } }
console.log(JSON.stringify({ paginas: html.length, enlacesInternos: n, anclas: ids, rotos: bad.length, ejemplos: bad.slice(0, 20) }, null, 1));
process.exit(bad.length ? 1 : 0);
