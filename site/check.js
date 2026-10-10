// "Check your school" (/check/): can this device and network run the in-browser Python courses?
// Runs each check in order, then gives a plain verdict and the addresses to ask IT for.
// When the site hosts Pyodide itself (roadmap/code.md › Python pathway), change PYODIDE to the site's own copy.
(function () {
  const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/';
  const $ = (id) => document.getElementById(id);
  const rows = $('ck-rows'), results = [], state = {};
  const secs = (ms) => (ms / 1000).toFixed(1) + ' s';
  function row(name) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td></td><td class="ck-s ck-wait">…</td><td class="ck-t"></td><td class="ck-d"></td>';
    tr.children[0].textContent = name;
    rows.append(tr);
    return tr;
  }
  async function check(key, name, fn) {
    const tr = row(name), t0 = performance.now();
    try {
      const detail = await fn();
      const ms = performance.now() - t0;
      tr.children[1].textContent = 'OK'; tr.children[1].className = 'ck-s ck-ok';
      tr.children[2].textContent = secs(ms); tr.children[3].textContent = detail || '';
      results.push(`OK   ${name} (${secs(ms)}) ${detail || ''}`);
      state[key] = { ok: true, ms };
    } catch (e) {
      const ms = performance.now() - t0;
      const msg = String((e && e.message) || e).split('\n').filter((l) => !/^\s+at /.test(l)).slice(-2).join(' ');
      tr.children[1].textContent = 'Blocked'; tr.children[1].className = 'ck-s ck-bad';
      tr.children[2].textContent = secs(ms); tr.children[3].textContent = msg;
      results.push(`FAIL ${name} (${secs(ms)}) ${msg}`);
      state[key] = { ok: false, ms };
    }
  }
  // A site passes if the browser may read its reply (blocked by a filter, or not allowed from a web page, both fail).
  const reach = (url) => async () => { const r = await fetch(url, { cache: 'no-store' }); if (!r.ok) throw new Error('HTTP ' + r.status); return 'reachable'; };
  const loadScript = (src) => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => no(new Error('could not load the Python runtime')); document.head.append(s); });

  function verdict() {
    const v = $('ck-verdict'), py = state.python && state.python.ok, flask = state.flask && state.flask.ok;
    const live = state.wikidata && state.wikidata.ok && state.meteo && state.meteo.ok;
    const ask = [];
    if (!py) ask.push(new URL(PYODIDE).host + ' (the Python runtime)');
    if (py && !flask) ask.push('pypi.org and files.pythonhosted.org (Flask, for the Web apps course)');
    if (!(state.wikidata && state.wikidata.ok)) ask.push('query.wikidata.org (optional: live music and film data)');
    if (!(state.meteo && state.meteo.ok)) ask.push('api.open-meteo.com (optional: live weather data)');
    let head, cls;
    if (py && flask && live) { head = 'Ready: every in-browser Python lesson will work here, including live data.'; cls = 'ck-ok'; }
    else if (py && flask) { head = 'Ready without live data: lessons will use their saved copies of the data. Only the optional "call an API" lesson needs the addresses below.'; cls = 'ck-ok'; }
    else if (py) { head = 'Mostly ready: Python works, but Flask could not be downloaded. Ask IT to allow the addresses below.'; cls = 'ck-wait'; }
    else { head = 'Not ready yet: the Python runtime is blocked. Ask IT to allow the addresses below, then run this check again.'; cls = 'ck-bad'; }
    const t = state.python && state.python.ok ? ` Python took ${secs(state.python.ms)} to load${state.pandas && state.pandas.ok ? `, and the data tools another ${secs(state.pandas.ms)}` : ''}; a second visit is faster because the browser keeps the files.` : '';
    v.className = 'ck-verdict ' + cls;
    v.innerHTML = '';
    const p = document.createElement('p'); p.textContent = head + t; v.append(p);
    if (ask.length) { const ul = document.createElement('ul'); ask.forEach((a) => { const li = document.createElement('li'); li.textContent = a; ul.append(li); }); v.append(ul); }
    results.push('Verdict: ' + head + t, ...ask.map((a) => '  allow ' + a));
  }

  $('ck-run').addEventListener('click', async () => {
    const btn = $('ck-run'); btn.disabled = true;
    rows.innerHTML = ''; results.length = 0; Object.keys(state).forEach((k) => delete state[k]);
    $('ck-verdict').className = 'ck-verdict'; $('ck-verdict').textContent = 'Checking…';
    results.push('Page: ' + location.href, 'Browser: ' + navigator.userAgent, 'Started: ' + new Date().toString());
    const start = performance.now();
    let py = null;
    await check('python', 'Load Python in the browser', async () => {
      await loadScript(PYODIDE + 'pyodide.js');
      py = await window.loadPyodide({ indexURL: PYODIDE });
      return py.runPython('import sys; "Python " + sys.version.split()[0]');
    });
    if (py) {
      await check('stdlib', 'Store data: sqlite3, json and csv', async () => py.runPython([
        'import sqlite3, json, csv, io',
        'db = sqlite3.connect(":memory:")',
        'db.execute("create table songs(title, genre)")',
        'db.executemany("insert into songs values (?, ?)", [("A", "pop"), ("B", "rock"), ("C", "pop")])',
        'n = db.execute("select count(*) from songs where genre = \'pop\'").fetchone()[0]',
        'rows = list(csv.reader(io.StringIO("name,score\\nAda,9")))',
        'f"{n} pop songs found; {json.dumps(rows[1])}"',
      ].join('\n')));
      await check('pandas', 'Load the data tools (pandas)', async () => { await py.loadPackage('pandas'); return py.runPython('import pandas; "pandas " + pandas.__version__'); });
      await check('flask', 'Download and run Flask (Web apps course)', async () => {
        await py.loadPackage(['micropip', 'jinja2', 'markupsafe']);
        await py.pyimport('micropip').install('flask');
        return py.runPython([
          'from flask import Flask, request',
          'app = Flask(__name__)',
          'names = []',
          '@app.route("/join", methods=["POST"])',
          'def join():',
          '    names.append(request.form["name"])',
          '    return "Members: " + ", ".join(names)',
          'app.test_client().post("/join", data={"name": "Ada"}).get_data(as_text=True)',
        ].join('\n'));
      });
      await check('fastapi', 'Run FastAPI (the last Web apps lesson)', async () => {
        await py.loadPackage('fastapi');
        return await py.runPythonAsync([
          'import fastapi.routing, starlette.concurrency, fastapi.dependencies.utils as du',
          'async def inline(func, *args, **kwargs):',
          '    return func(*args, **kwargs)',
          'starlette.concurrency.run_in_threadpool = fastapi.routing.run_in_threadpool = du.run_in_threadpool = inline',
          'from fastapi import FastAPI',
          'import httpx',
          'api = FastAPI()',
          '@api.get("/year")',
          'def year(y: int):',
          '    return {"next": y + 1}',
          'async def go():',
          '    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=api), base_url="http://club") as c:',
          '        return (await c.get("/year?y=9")).json(), (await c.get("/year?y=nine")).status_code',
          'good, bad = await go()',
          'f"{good}; \'nine\' refused with {bad}"',
        ].join('\n'));
      });
    }
    await check('wikidata', 'Live data: Wikidata (optional)', reach('https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent('SELECT ?x WHERE { BIND(1 AS ?x) }')));
    await check('meteo', 'Live data: Open-Meteo weather (optional)', reach('https://api.open-meteo.com/v1/forecast?latitude=-35.28&longitude=149.13&current=temperature_2m'));
    results.push('Total: ' + secs(performance.now() - start));
    verdict();
    btn.disabled = false; btn.textContent = 'Run again';
    $('ck-copy').hidden = false;
  });
  $('ck-copy').addEventListener('click', async () => {
    const text = results.join('\n');
    try { await navigator.clipboard.writeText(text); $('ck-copy').textContent = 'Copied'; }
    catch (e) { const pre = document.createElement('pre'); pre.textContent = text; $('ck-copy').after(pre); }
  });
})();
