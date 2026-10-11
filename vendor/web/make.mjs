// Rebuild the files in vendor/web from npm packages. Not part of the site build: run it by hand when updating a
// library, then commit the results. The playgrounds serve these files from this site (no CDN at run time).
//
//   mkdir /tmp/web && cd /tmp/web && npm init -y && npm i vue@3.5.43 bootstrap@5.3.8 preact@11.0.1 htm@3.1.1 svelte@5.57.2 bulma@1.0.4 @picocss/pico@2.1.1 @tailwindcss/browser@4.3.3 daisyui@5.7.47 esbuild
//   node <repo>/vendor/web/make.mjs /tmp/web
//
// Makes: bootstrap.min.css, vue.js (Vue's global development build, for its warnings), preact.js (Preact, its hooks
// and htm as one script with a global `htmPreact`) and svelte.js (Svelte's compiler, its runtime and our glue, which
// compiles every <script type="text/svelte"> on the page and mounts it where it stands). Licences are copied too.
import { copyFileSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const work = process.argv[2];
if (!work) throw new Error('Usage: node vendor/web/make.mjs <folder with node_modules>');
const nm = join(work, 'node_modules');
const req = createRequire(join(work, 'package.json'));
const esbuild = req('esbuild');
const ver = (p) => JSON.parse(readFileSync(join(nm, p, 'package.json'), 'utf8')).version;

copyFileSync(join(nm, 'bootstrap/dist/css/bootstrap.min.css'), join(here, 'bootstrap.min.css'));
copyFileSync(join(nm, 'vue/dist/vue.global.js'), join(here, 'vue.js'));
// The other CSS frameworks the Bootstrap course compares (bs-yours): Bulma and Pico are plain CSS; Tailwind's browser
// build compiles the classes a page uses as it loads (meant for trying things, as here), and daisyUI's CSS sits on it.
copyFileSync(join(nm, 'bulma/css/bulma.min.css'), join(here, 'bulma.min.css'));
copyFileSync(join(nm, '@picocss/pico/css/pico.classless.min.css'), join(here, 'pico.classless.min.css'));
copyFileSync(join(nm, '@tailwindcss/browser/dist/index.global.js'), join(here, 'tailwind.js'));
copyFileSync(join(nm, 'daisyui/daisyui.css'), join(here, 'daisyui.css'));

const tmp = join(work, 'wp-entries');
mkdirSync(tmp, { recursive: true });
writeFileSync(join(tmp, 'preact.js'), `import { h, render, Fragment } from 'preact';
import { useState, useEffect, useMemo, useRef } from 'preact/hooks';
import htm from 'htm';
export const html = htm.bind(h);
export { h, render, Fragment, useState, useEffect, useMemo, useRef };
`);
writeFileSync(join(tmp, 'svelte-runtime.js'), `import * as client from 'svelte/internal/client';
import { mount } from 'svelte';
export { client, mount };
`);
const bundle = (entry, name) => esbuild.buildSync({ entryPoints: [join(tmp, entry)], bundle: true, minify: true, format: 'iife', globalName: name, platform: 'browser', conditions: ['browser'], write: false, nodePaths: [nm] }).outputFiles[0].text;

writeFileSync(join(here, 'preact.js'), `/* Preact ${ver('preact')} (MIT) with its hooks, and htm ${ver('htm')} (Apache-2.0): one script, global htmPreact. Made by vendor/web/make.mjs. */\n` + bundle('preact.js', 'htmPreact'));

const glue = readFileSync(join(here, 'svelte-glue.js'), 'utf8');
writeFileSync(join(here, 'svelte.js'), `/* Svelte ${ver('svelte')} (MIT): its compiler, its runtime, and the Waypoints glue (svelte-glue.js). Made by vendor/web/make.mjs. */\n`
  + readFileSync(join(nm, 'svelte/compiler/index.js'), 'utf8') + '\n;'
  + bundle('svelte-runtime.js', 'SvelteRuntime') + '\n;' + glue);

copyFileSync(join(nm, 'bootstrap/LICENSE'), join(here, 'LICENSE-bootstrap.txt'));
copyFileSync(join(nm, 'vue/LICENSE'), join(here, 'LICENSE-vue.txt'));
copyFileSync(join(nm, 'preact/LICENSE'), join(here, 'LICENSE-preact.txt'));
copyFileSync(join(nm, 'htm/LICENSE'), join(here, 'LICENSE-htm.txt'));
copyFileSync(join(nm, 'svelte/LICENSE.md'), join(here, 'LICENSE-svelte.txt'));
copyFileSync(join(nm, 'bulma/LICENSE'), join(here, 'LICENSE-bulma.txt'));
copyFileSync(join(nm, '@picocss/pico/LICENSE.md'), join(here, 'LICENSE-pico.txt'));
copyFileSync(join(nm, '@tailwindcss/browser/LICENSE'), join(here, 'LICENSE-tailwind.txt'));
copyFileSync(join(nm, 'daisyui/LICENSE'), join(here, 'LICENSE-daisyui.txt'));
console.log(`bulma ${ver('bulma')}, pico ${ver('@picocss/pico')}, tailwind ${ver('@tailwindcss/browser')}, daisyui ${ver('daisyui')}, bootstrap ${ver('bootstrap')}, vue ${ver('vue')}, preact ${ver('preact')}, htm ${ver('htm')}, svelte ${ver('svelte')}`);
