Libraries that pages in the HTML and DOM playgrounds can load, served from this site (no CDN at run time). The
build copies every file here into `_playground-html/media/` and `_playground-dom/media/`, beside the course pictures,
so a lesson's page loads one as a file next to it: `<link rel="stylesheet" href="bootstrap.min.css">`,
`<script src="vue.js"></script>`.

| File | What it is | Licence |
|---|---|---|
| `bootstrap.min.css` | Bootstrap 5.3.8, the CSS only (no JavaScript components) | MIT (`LICENSE-bootstrap.txt`) |
| `vue.js` | Vue 3.5.43, the global development build (`vue.global.js`), for its warnings in the console | MIT (`LICENSE-vue.txt`) |
| `preact.js` | Preact 11.0.1 with its hooks, and htm 3.1.1, as one script with the global `htmPreact` | MIT, Apache-2.0 (`LICENSE-preact.txt`, `LICENSE-htm.txt`) |
| `bulma.min.css` | Bulma 1.0.4 (CSS only) | MIT (`LICENSE-bulma.txt`) |
| `pico.classless.min.css` | Pico 2.1.1, the classless version (styles plain tags) | MIT (`LICENSE-pico.txt`) |
| `tailwind.js` | Tailwind CSS 4.3.3's browser build (`@tailwindcss/browser`): makes the CSS for the classes a page uses as it loads; meant for trying things out, not real sites | MIT (`LICENSE-tailwind.txt`) |
| `daisyui.css` | daisyUI 5.7.47, component classes on top of Tailwind (use with `tailwind.js`) | MIT (`LICENSE-daisyui.txt`) |
| `svelte.js` | Svelte 5.57.2's compiler and runtime, plus `svelte-glue.js` (ours): compiles each `<script type="text/svelte">` on the page and mounts it in place | MIT (`LICENSE-svelte.txt`) |

To update: see the comment at the top of `make.mjs` (it rebuilds everything from npm packages), then run the Bootstrap
and Vue lessons in the playgrounds.
