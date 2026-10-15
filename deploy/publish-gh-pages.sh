#!/usr/bin/env bash
# Construye y publica dist/ en la rama gh-pages (GitHub Pages "Deploy from branch").
set -e; cd "$(dirname "$0")/.."
npx astro build && touch dist/.nojekyll ; if [ -n "$CNAME" ]; then echo "$CNAME" > dist/CNAME; fi
cd dist && rm -rf .git && git init -q -b gh-pages && git add -A && git -c user.name=alexito1999turo-coder -c user.email=alexito1999turo-coder@users.noreply.github.com commit -qm "deploy $(date -Iseconds)" && git push -qf "$(git -C .. remote get-url origin)" gh-pages && rm -rf .git
