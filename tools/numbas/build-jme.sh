#!/bin/sh
# Rebuild vendor/numbas/numbas-jme.min.js from a pinned Numbas release (run only when updating Numbas).
# Numbas (https://github.com/numbas/Numbas) is Apache-2.0; its LICENSE is kept beside the build.
# Usage: sh tools/numbas/build-jme.sh [tag]     (default the tag in vendor/numbas/VERSION)
set -e
cd "$(dirname "$0")/../.."
TAG=${1:-$(cat vendor/numbas/VERSION)}
TMP=$(mktemp -d)
git -c advice.detachedHead=false clone --quiet --depth 1 --branch "$TAG" https://github.com/numbas/Numbas "$TMP/numbas"
S="$TMP/numbas/runtime/scripts"
# The JME runtime only: the same file list as Numbas's own Makefile target tests/jme-runtime.js.
for f in numbas.js localisation.js util.js math.js i18next/i18next.js decimal/decimal.js parsel/parsel.js seedrandom/seedrandom.js \
         unicode-mappings.js jme-rules.js jme.js jme-builtins.js jme-display.js jme-notations.js jme-variables.js jme-calculus.js schedule.js; do
  cat "$S/$f"; echo
done > "$TMP/jme.js"
# English strings only (Numbas ships 20+ languages; its built locale file is tests/locales.js).
node -e '
const fs = require("fs"), vm = require("vm");
const ctx = { Numbas: { queueScript: (n, d, f) => f() } }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(process.argv[1], "utf8"), ctx);
const en = ctx.Numbas.locale.resources["en-gb"];
fs.writeFileSync(process.argv[2], "Numbas.queueScript(\"localisation-resources\",[\"i18next\"],function(){Numbas.locale=" + JSON.stringify({ preferred_locale: "en-GB", resources: { "en-gb": en } }) + ";});\n");
' "$TMP/numbas/tests/locales.js" "$TMP/locale-en.js"
cat "$TMP/jme.js" "$TMP/locale-en.js" > "$TMP/all.js"
npx --yes esbuild@0.24.0 "$TMP/all.js" --minify --outfile=vendor/numbas/numbas-jme.min.js --log-level=warning
cp "$TMP/numbas/LICENSE" vendor/numbas/LICENSE
echo "$TAG" > vendor/numbas/VERSION
rm -rf "$TMP"
echo "vendor/numbas/numbas-jme.min.js: $(wc -c < vendor/numbas/numbas-jme.min.js) bytes from Numbas $TAG"
