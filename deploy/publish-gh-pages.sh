#!/usr/bin/env bash
# Construye y publica dist/ en la rama gh-pages (GitHub Pages "Deploy from branch").
# Por defecto: https://casosagentes.es/ (CNAME). URL antigua: DOMAIN= SITE_URL=https://alexito1999turo-coder.github.io BASE_PATH=/casos-ia
# Dominio propio (cuando esté comprado y con DNS): DOMAIN=casosagentes.es bash deploy/publish-gh-pages.sh
set -e; cd "$(dirname "$0")/.."
DOMAIN="${DOMAIN-casosagentes.es}"
if [ -n "$DOMAIN" ]; then export SITE_URL="https://$DOMAIN" BASE_PATH=/ CNAME="$DOMAIN"; fi
npx astro build && touch dist/.nojekyll && rm -f dist/CNAME ; if [ -n "$CNAME" ]; then echo "$CNAME" > dist/CNAME; fi
if [ -n "$DOMAIN" ] && grep -rqE "github\.io|/casos-ia/" dist; then echo "ERROR: quedan URLs de github.io en dist/"; exit 1; fi
cd dist && rm -rf .git && git init -q -b gh-pages && git add -A && git -c user.name=alexito1999turo-coder -c user.email=alexito1999turo-coder@users.noreply.github.com commit -qm "deploy $(date -Iseconds)" && git push -qf "$(git -C .. remote get-url origin)" gh-pages && rm -rf .git
