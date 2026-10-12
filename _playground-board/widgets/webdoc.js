// A web document as three layers: content (the words and pictures), structure (HTML tags that say what each part is)
// and presentation (CSS that says how it looks). Switch the style sheet, show the structure, hear what a screen reader
// reads, see it at phone width, and edit the HTML or the CSS.
//   widget: webdoc
//   doc: club                 club (tidy: headings, a list, header/nav/main/footer) | messy (the same words, styled
//                             with <font>, <b> and <br> instead of structure)
//   compare: on               Page A (club) and Page B (messy) buttons
//   styles: plain, ocean, poster    style sheet buttons (the first is the starting one)
//   edit: none | css | html | both  text boxes (labelled "Style sheet (CSS)" and "Page (HTML)")
//   pages: on                 three pages of the same site share the one style sheet (small previews)
//   reader: on | off          the screen reader button (default on)
// state: { scope: { vars: { o (structure outlines on), p (style sheet on), y (style index, 1-based), n (styles tried),
//          c (CSS edits), t (HTML edits), u (1 if the structure (tags) is the same as at the start), d (1 if the words
//          are the same), w (1 if it looks different from the start), a (1 if the main heading's colour changed),
//          f (h2 font size, px), g (1 if the page background changed), r (screen reader on), v (phone width),
//          h (headings), l (lists), k (landmarks: header, nav, main, footer), b (presentational tags: font, center,
//          b, u, br), x (1 when there are 2+ headings, a list and no presentational tags), j (pages heard in the
//          screen reader, of A and B), e (1 once the structure outlines have been shown) } } }
(function (B) {
  'use strict';
  var spec = null, ui = {}, st = {};
  var DOCS = {
    club: '<header>\n  <h1>Coding Club</h1>\n  <nav><a href="#">Home</a> <a href="#">Events</a> <a href="#">Join</a></nav>\n</header>\n<main>\n  <h2>This week</h2>\n  <p>We are building a robot that follows a line. Bring a friend!</p>\n  <h2>Coming up</h2>\n  <ul>\n    <li>Monday: micro:bit games</li>\n    <li>Wednesday: web pages</li>\n    <li>Friday: robot races</li>\n  </ul>\n</main>\n<footer>\n  <p>Room 12, lunchtime</p>\n</footer>',
    messy: '<p><font size="6"><b>Coding Club</b></font></p>\n<p>Home | Events | Join</p>\n<br>\n<p><b>This week</b></p>\n<p>We are building a robot that follows a line. Bring a friend!</p>\n<br>\n<p><b>Coming up</b></p>\n<p>Monday: micro:bit games<br>Wednesday: web pages<br>Friday: robot races</p>\n<p><font size="2">Room 12, lunchtime</font></p>',
    events: '<header>\n  <h1>Coding Club</h1>\n  <nav><a href="#">Home</a> <a href="#">Events</a> <a href="#">Join</a></nav>\n</header>\n<main>\n  <h2>Events</h2>\n  <p>Robot races are on Friday in the hall.</p>\n</main>',
    join: '<header>\n  <h1>Coding Club</h1>\n  <nav><a href="#">Home</a> <a href="#">Events</a> <a href="#">Join</a></nav>\n</header>\n<main>\n  <h2>Join</h2>\n  <p>Everyone is welcome. Just turn up!</p>\n</main>',
  };
  var STYLES = {
    plain: 'body { font-family: Georgia, serif; color: #222; background: #fff; }\nh1 { font-size: 30px; }\nh2 { font-size: 22px; }\nnav a { margin-right: 10px; }',
    ocean: 'body { font-family: system-ui, sans-serif; color: #0b2a3a; background: #e6f4f8; }\nheader { background: #0e7490; color: white; padding: 10px; border-radius: 8px; }\nh1 { font-size: 28px; color: white; margin: 0; }\nnav a { color: #cffafe; margin-right: 12px; }\nh2 { font-size: 20px; color: #0e7490; border-bottom: 2px solid #0e7490; }\nli { background: white; margin: 4px 0; padding: 4px 8px; border-radius: 6px; list-style: none; }',
    poster: 'body { font-family: Impact, "Arial Black", sans-serif; color: #fde047; background: #1e1b4b; text-align: center; }\nh1 { font-size: 44px; letter-spacing: 2px; text-transform: uppercase; }\nh2 { font-size: 30px; color: #f472b6; }\nnav a { color: #fde047; margin: 0 8px; }\nul { list-style: none; padding: 0; }\np, li { font-family: system-ui, sans-serif; color: white; }',
  };
  var PRES = ['font', 'center', 'b', 'u', 'br', 'big', 'i'];

  function parse(s) {
    s.doc0 = String(s.doc || 'club').toLowerCase();
    if (!DOCS[s.doc0]) throw new Error('doc: club or messy.');
    s.compare = /^on$/i.test(s.compare || '');
    s.styles0 = String(s.styles || 'plain').split(',').map(function (x) { return x.trim().toLowerCase(); }).filter(Boolean);
    s.styles0.forEach(function (x) { if (!STYLES[x]) throw new Error('styles: plain, ocean, poster.'); });
    s.edit0 = String(s.edit || 'none').toLowerCase();
    if (['none', 'css', 'html', 'both'].indexOf(s.edit0) < 0) throw new Error('edit: none, css, html or both.');
    s.pages = /^on$/i.test(s.pages || '');
    s.reader = !/^off$/i.test(s.reader || '');
  }

  // Student HTML goes into a shadow root: no scripts, no event attributes, no frames.
  function clean(html) {
    var d = new DOMParser().parseFromString('<body>' + html + '</body>', 'text/html');
    d.querySelectorAll('script, iframe, object, embed, link, meta, style, form').forEach(function (e) { e.remove(); });
    d.querySelectorAll('*').forEach(function (e) { [].slice.call(e.attributes).forEach(function (a) { if (/^on/i.test(a.name) || /javascript:/i.test(a.value)) e.removeAttribute(a.name); }); });
    return d.body;
  }
  var sig = function (body) { return [].map.call(body.querySelectorAll('*'), function (e) { return e.tagName.toLowerCase(); }).join(','); };
  var words = function (body) { return (body.textContent.match(/[A-Za-z0-9:!.,]+/g) || []).join(' ').replace(/[|]/g, ''); };
  var docBody = function () { return clean(st.html); };
  var cssNow = function () { return st.styleOn ? st.css : ''; };
  var OUTLINE = '.wdo *:not(a){outline:1.5px dashed #c2570a;outline-offset:2px;position:relative}.wdo *:not(a)::before{content:attr(data-tag);position:absolute;top:-9px;left:2px;font:700 10px/1 ui-monospace,monospace;background:#c2570a;color:#fff;padding:1px 3px;border-radius:3px}';

  function renderInto(host, body, css, outline, width) {
    var sh = host.shadowRoot || host.attachShadow({ mode: 'open' });
    sh.replaceChildren();
    var style = document.createElement('style');
    // ":host" is the page; "body" rules in the style sheet apply to the page box.
    style.textContent = ':host{display:block}.wdp{padding:12px 16px;min-height:100%;box-sizing:border-box;font:16px/1.4 Times New Roman,serif;color:#000;background:#fff}' + css.replace(/(^|[},\s])body(?=[\s{,.:])/g, '$1.wdp') + (outline ? OUTLINE : '');
    var page = document.createElement('div'); page.className = 'wdp' + (outline ? ' wdo' : '');
    if (width) page.style.maxWidth = width + 'px';
    [].slice.call(body.cloneNode(true).childNodes).forEach(function (n) { page.appendChild(n); });
    if (outline) page.querySelectorAll('*').forEach(function (e) { e.setAttribute('data-tag', e.tagName.toLowerCase()); });
    page.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
    sh.append(style, page);
    return page;
  }

  function reader(body) {
    var out = [], walk = function (n) {
      [].forEach.call(n.childNodes, function (c) {
        if (c.nodeType === 3) { var t = c.textContent.replace(/\s+/g, ' ').trim(); if (t && !/^[|]+$/.test(t)) out.push(['', t]); return; }
        if (c.nodeType !== 1) return;
        var tag = c.tagName.toLowerCase(), m = /^h([1-6])$/.exec(tag);
        if (m) { out.push(['Heading level ' + m[1], c.textContent.trim()]); return; }
        if (tag === 'a') { out.push(['Link', c.textContent.trim()]); return; }
        if (tag === 'ul' || tag === 'ol') { out.push(['List, ' + c.children.length + ' items', '']); walk(c); out.push(['End of list', '']); return; }
        if (tag === 'li') { out.push(['•', c.textContent.trim()]); return; }
        var land = { nav: 'Navigation', main: 'Main', header: 'Banner', footer: 'Footer' }[tag];
        if (land) out.push([land, '']);
        walk(c);
      });
    };
    walk(body);
    return out;
  }

  function measure() {
    var page = ui.page; if (!page || !page.isConnected) return {};
    var cs = function (sel) { var e = page.querySelector(sel); return e ? getComputedStyle(e) : null; };
    var h1 = cs('h1') || cs('font'), h2 = cs('h2'), pg = getComputedStyle(page);
    var look = [pg.backgroundColor, pg.color, pg.fontFamily].concat(['h1', 'h2', 'p', 'li', 'a', 'header'].map(function (s) { var c = cs(s); return c ? [c.color, c.backgroundColor, c.fontSize, c.fontFamily, c.fontWeight, c.textAlign].join('/') : '-'; })).join('|');
    return { look: look, h1c: h1 ? h1.color : '', h2s: h2 ? parseFloat(h2.fontSize) : 0, bg: pg.backgroundColor };
  }

  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'wdwrap';
    var bar = document.createElement('div'); bar.className = 'wdbar';
    var btn = function (label, pressed, fn, aria) { var b = document.createElement('button'); b.type = 'button'; b.textContent = label; if (pressed !== null) b.setAttribute('aria-pressed', String(!!pressed)); if (aria) b.setAttribute('aria-label', aria); b.addEventListener('click', function () { fn(); B.moved = true; draw(); report(); }); return b; };
    var group = function (name, items) { var g = document.createElement('span'); g.className = 'wdgrp'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', name); var l = document.createElement('span'); l.className = 'wdlab'; l.textContent = name + ':'; g.appendChild(l); items.forEach(function (i) { g.appendChild(i); }); bar.appendChild(g); };
    if (spec.compare) group('Page', [['A', 'club'], ['B', 'messy']].map(function (p) { return btn('Page ' + p[0], st.docName === p[1], function () { st.docName = p[1]; st.html = DOCS[p[1]]; st.base = null; }); }));
    if (spec.styles0.length > 1) group('Style sheet', spec.styles0.map(function (k, i) { return btn(k.charAt(0).toUpperCase() + k.slice(1), st.styleOn && st.styleIdx === i, function () { st.styleIdx = i; st.styleOn = true; st.css = STYLES[k]; st.tried[k] = 1; }); }));
    group('Show', [
      btn(st.styleOn ? 'Style sheet: on' : 'Style sheet: off', st.styleOn, function () { st.styleOn = !st.styleOn; }, 'Style sheet, ' + (st.styleOn ? 'on' : 'off')),
      btn('Structure', st.outline, function () { st.outline = !st.outline; }, 'Show structure, ' + (st.outline ? 'on' : 'off')),
    ].concat(spec.reader ? [btn('Screen reader', st.reader, function () { st.reader = !st.reader; if (st.reader) st.heard[st.docName] = 1; }, 'Screen reader, ' + (st.reader ? 'on' : 'off'))] : [])
      .concat([btn(st.phone ? 'Phone width' : 'Laptop width', st.phone, function () { st.phone = !st.phone; }, 'Phone width, ' + (st.phone ? 'on' : 'off'))]));
    wrap.appendChild(bar);
    var main = document.createElement('div'); main.className = 'wdmain';
    var view = document.createElement('div'); view.className = 'wdview' + (st.phone ? ' phone' : '');
    var pageHost = document.createElement('div'); pageHost.className = 'wdhost';
    view.appendChild(pageHost); main.appendChild(view);
    var body = docBody();
    ui.page = renderInto(pageHost, body, cssNow(), st.outline, 0);
    if (st.reader) {
      var sr = document.createElement('div'); sr.className = 'wdsr'; sr.setAttribute('aria-label', 'What a screen reader says');
      var h = document.createElement('div'); h.className = 'wdhead'; h.textContent = 'Screen reader (reads the structure, not the look)'; sr.appendChild(h);
      var ol = document.createElement('ol');
      reader(body).forEach(function (r) { var li = document.createElement('li'); if (r[0]) { var b = document.createElement('b'); b.textContent = r[0] + (r[1] ? ': ' : ''); li.appendChild(b); } li.appendChild(document.createTextNode(r[1])); if (!r[0]) li.className = 'plain'; ol.appendChild(li); });
      sr.appendChild(ol); main.appendChild(sr);
    }
    wrap.appendChild(main);
    if (spec.pages) {
      var pg = document.createElement('div'); pg.className = 'wdpages';
      var ph = document.createElement('div'); ph.className = 'wdhead'; ph.textContent = 'The same style sheet on every page of the site'; pg.appendChild(ph);
      var row = document.createElement('div'); row.className = 'wdthumbs';
      ['events', 'join'].forEach(function (k) { var t = document.createElement('div'); t.className = 'wdthumb'; var inner = document.createElement('div'); inner.className = 'wdtin'; t.appendChild(inner); row.appendChild(t); renderInto(inner, clean(DOCS[k]), cssNow(), false, 0); var cap = document.createElement('small'); cap.textContent = k === 'events' ? 'Events page' : 'Join page'; t.appendChild(cap); });
      pg.appendChild(row); wrap.appendChild(pg);
    }
    if (spec.edit0 !== 'none') {
      var ed = document.createElement('div'); ed.className = 'wdeds';
      var area = function (label, val, set) {
        var l = document.createElement('label'); l.className = 'wded'; var s = document.createElement('span'); s.textContent = label;
        var ta = document.createElement('textarea'); ta.value = val; ta.spellcheck = false; ta.rows = Math.min(14, val.split('\n').length + 1); ta.setAttribute('aria-label', label);
        ta.addEventListener('input', function () { set(ta.value); B.moved = true; ui.page = renderInto(pageHost, docBody(), cssNow(), st.outline, 0); if (spec.pages) row.querySelectorAll('.wdtin').forEach(function (inner, i) { renderInto(inner, clean(DOCS[i ? 'join' : 'events']), cssNow(), false, 0); }); clearTimeout(ui.tm); ui.tm = setTimeout(function () { draw(); report(); refocus(label, ta); }, 600); report(); });
        l.append(s, ta); return l;
      };
      if (spec.edit0 === 'html' || spec.edit0 === 'both') ed.appendChild(area('Page (HTML)', st.html, function (v) { st.html = v; st.htmlEdits++; }));
      if (spec.edit0 === 'css' || spec.edit0 === 'both') ed.appendChild(area('Style sheet (CSS)', st.css, function (v) { st.css = v; st.cssEdits++; st.styleOn = true; }));
      wrap.appendChild(ed);
    }
    host.appendChild(wrap);
  }
  function refocus(label, old) {
    var ta = B.el('board').querySelector('textarea[aria-label="' + label + '"]');
    if (ta && document.activeElement === document.body) { var p = old.selectionStart; ta.focus(); try { ta.setSelectionRange(p, p); } catch (e) { /* ignore */ } }
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  function report() {
    var body = docBody(), m = measure();
    if (st.reader) st.heard[st.docName] = 1;
    if (!st.base || st.base.doc !== st.docName) { var b0 = clean(DOCS[st.docName]); st.base = { doc: st.docName, sig: sig(b0), words: words(b0), look: m.look, h1c: m.h1c, bg: m.bg }; }
    var all = body.querySelectorAll('*'), count = function (sel) { return body.querySelectorAll(sel).length; };
    var h = count('h1,h2,h3,h4,h5,h6'), l = count('ul,ol'), k = count('header,nav,main,footer');
    var b = [].filter.call(all, function (e) { return PRES.indexOf(e.tagName.toLowerCase()) >= 0; }).length;
    var u = sig(body) === st.base.sig ? 1 : 0, d = words(body) === st.base.words ? 1 : 0;
    var w = m.look && m.look !== st.base.look ? 1 : 0;
    var parts = [(spec.compare ? 'Page ' + (st.docName === 'club' ? 'A' : 'B') + '. ' : '') + 'Style sheet ' + (st.styleOn ? 'on' + (spec.styles0.length > 1 ? ' (' + spec.styles0[st.styleIdx] + ')' : '') : 'off'),
      h + ' heading' + (h === 1 ? '' : 's') + ', ' + l + ' list' + (l === 1 ? '' : 's') + (b ? ', ' + b + ' tag' + (b === 1 ? '' : 's') + ' used only for looks' : ''),
      (st.cssEdits || st.htmlEdits) ? 'Structure ' + (u ? 'unchanged' : 'changed') + ', words ' + (d ? 'unchanged' : 'changed') + ', look ' + (w ? 'changed' : 'unchanged') : ''];
    var text = parts.filter(Boolean).join('. ');
    ui.work.textContent = text; B.say(text);
    B.save({ st: { docName: st.docName, html: st.html, css: st.css, styleIdx: st.styleIdx, styleOn: st.styleOn, outline: st.outline, reader: st.reader, phone: st.phone, tried: st.tried, heard: st.heard, cssEdits: st.cssEdits, htmlEdits: st.htmlEdits, outlined: st.outlined } });
    if (st.outline) st.outlined = 1;
    B.post({ scope: { vars: {
      o: st.outline ? 1 : 0, p: st.styleOn ? 1 : 0, y: st.styleIdx + 1, n: Object.keys(st.tried).length, c: st.cssEdits, t: st.htmlEdits, u: u, d: d, w: w,
      a: m.h1c && m.h1c !== st.base.h1c && st.styleOn ? 1 : 0, f: Math.round(m.h2s || 0), g: m.bg && m.bg !== st.base.bg && st.styleOn ? 1 : 0,
      r: st.reader ? 1 : 0, v: st.phone ? 1 : 0, h: h, l: l, k: k, b: b, x: h >= 2 && l >= 1 && b === 0 ? 1 : 0, j: Object.keys(st.heard).length, e: st.outlined ? 1 : 0,
    }, points: {} } }, text);
  }

  B.widget('webdoc', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A web page as content, structure and presentation'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec;
      var sv = fresh ? null : B.saved(), s0 = sv && sv.st;
      st = {
        docName: s0 && DOCS[s0.docName] ? s0.docName : spec.doc0, html: s0 ? s0.html : DOCS[spec.doc0],
        css: s0 ? s0.css : STYLES[spec.styles0[0]], styleIdx: s0 ? s0.styleIdx | 0 : 0, styleOn: s0 ? !!s0.styleOn : true,
        outline: s0 ? !!s0.outline : false, reader: s0 ? !!s0.reader : false, phone: s0 ? !!s0.phone : false,
        tried: s0 && s0.tried ? s0.tried : {}, heard: s0 && s0.heard ? s0.heard : {}, cssEdits: s0 ? s0.cssEdits | 0 : 0, htmlEdits: s0 ? s0.htmlEdits | 0 : 0, outlined: s0 ? s0.outlined | 0 : 0, base: null,
      };
      st.tried[spec.styles0[st.styleIdx]] = 1;
      paintPanel(); draw();
      // The starting look is measured once the page is drawn with the starting style sheet.
      var startCss = STYLES[spec.styles0[0]], keep = { css: st.css, on: st.styleOn };
      st.css = startCss; st.styleOn = true; draw(); var b0 = clean(DOCS[st.docName]), m0 = measure();
      st.base = { doc: st.docName, sig: sig(b0), words: words(b0), look: m0.look, h1c: m0.h1c, bg: m0.bg };
      st.css = keep.css; st.styleOn = keep.on; draw(); report();
    },
  });
})(WPB);
