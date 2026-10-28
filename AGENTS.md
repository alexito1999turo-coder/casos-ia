# AGENTS.md

Instrucciones para asistentes de código (Codex y otros) que trabajen en este repo.

**Antes de nada, lee `EDITORIAL.md`**: es el acuerdo de trabajo entre el bot de Grok, Claude, Codex y Alex (quién hace qué, reglas de publicación y cómo no pisarnos). Después, lee la última sección de `STATE.md`.

## Proyecto

CasosAgentes (https://casosagentes.es): directorio estático en Astro de casos reales de IA en pymes y autónomos de España. Datos en `src/data/casos.json`; facetas en `src/data/facets.mjs`; configuración de formularios y legal en `src/data/config.mjs`.

## Comandos

- Instalar: `npm ci`
- Compilar: `npx astro build` (si faltan datos del titular, usar `npm run build:preview`)
- Comprobar enlaces internos tras compilar: `node scripts/check-links.mjs`
- Desplegar: `bash deploy/publish-gh-pages.sh` — **solo con OK de Alex**.

## Reglas para Codex

- Trabaja en una rama `codex/<tarea>`, nunca directamente en `main`.
- Anota en `STATE.md` la tarea como «en curso (Codex)» al empezar y su resultado al terminar.
- No cambies el diseño (CSS, maquetación) sin OK explícito de Alex.
- No menciones ALAXIA en la web: CasosAgentes es un medio independiente.
- Antes de proponer el cambio, compila y pasa `check-links` sin enlaces rotos.
