/* Waypoints glue for Svelte in one web page, with no build step. Every <textarea data-svelte hidden> on the page holds
   a component, written exactly as an App.svelte file (a textarea keeps its contents as text, <script> block and all).
   This compiles each one with Svelte's compiler and mounts it where it stands. Compile errors are reported as page
   errors, so the playground shows them; the compiled code runs as an inline script named App.svelte.js. */
(function () {
  function fail(message) {
    try { window.dispatchEvent(new ErrorEvent('error', { message: message })); } catch (e) { console.error(message); }
  }
  function one(tag, n) {
    var src = tag.value != null ? tag.value : tag.textContent;
    var js;
    try {
      js = svelte.compile(src, { generate: 'client', name: 'App', css: 'injected', discloseVersion: false, filename: 'App.svelte' }).js.code;
    } catch (e) {
      var where = e.start && e.start.line ? ' (line ' + e.start.line + ' of the component)' : '';
      fail('Svelte could not read the component: ' + String(e.message || e).split('\n')[0] + where);
      return;
    }
    js = js.replace(/^import \* as \$ from 'svelte\/internal\/client';/m, 'var $ = SvelteRuntime.client;')
      .replace(/^export default function App\b/m, 'function App');
    if (/^\s*(import|export)\b/m.test(js)) { fail('Svelte: this component needs a feature this page cannot load (an import).'); return; }
    var host = document.createElement('div');
    host.className = 'svelte-app';
    // In place in the body; a tag that the browser put in the <head> (nothing visible above it) mounts at the end of the body.
    if (document.head.contains(tag)) document.body.appendChild(host); else tag.parentNode.insertBefore(host, tag);
    var run = document.createElement('script');
    run.textContent = '(function(){' + js + '\nSvelteRuntime.mount(App, { target: document.querySelector(".svelte-app[data-n=\'' + n + '\']") });})();\n//# sourceURL=App.svelte.js';
    host.setAttribute('data-n', String(n));
    document.head.appendChild(run);
  }
  function all() {
    var tags = document.querySelectorAll('textarea[data-svelte]');
    for (var i = 0; i < tags.length; i++) one(tags[i], i);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', all); else all();
})();
