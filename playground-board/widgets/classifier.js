// Classifier: test an image model that students trained in Teachable Machine on a fixed test set, and optionally send
// its predictions to a micro:bit over USB (Web Serial).
//   widget: classifier
//   testset: recycling          the test set in media/classifier/<name>/test.json (images with a label and a group);
//                               leave it out for a webcam-only board (driving a micro:bit or robot); "own" for the
//                               students' own test photos (added on the board by class and group, kept in this browser
//                               and shared by every board on the site that uses testset: own)
//   model: ask                  students paste their shareable link (default); or a link or a path to a model folder
//                               (relative to the board, e.g. media/classifier/recycling/demo/) for a demo or fallback
//   classes: Paper, Plastic     the labels the test set expects (default: the test set's classes)
//   groups: plain, messy        which groups to test (default all, in the test set's order)
//   webcam: on                  a live webcam preview with the top label (not checked)
//   serial: on                  "Connect a micro:bit": sends the top webcam label (or a clicked test image's label)
//                               as a line of text, and reads lines back
//   threshold: 0.8              confidence needed before the webcam sends a label (default 0.8)
//   threshold Go: 0.95          a different threshold for one label (a costly mistake needs more confidence)
//   unsure: on                  with serial, send "Unsure" when no label holds its threshold (so a robot can stop)
//   repeat: 1                   with serial, send the current label again every so many seconds, so a robot's watchdog
//                               can tell the board is still there (default: send only when the label changes)
// state: { scope: { vars }, model, loaded, labels }. vars (every name has an underscore, so checks can use them):
//   acc_all, acc_<group> (0-1), n_correct, n_total, n_classes, has_<label> (1 or 0; lower case, spaces as _),
//   with serial: n_sent, n_replies, sent_<label> (times each label was sent, including sent_unsure), and in_<key>
//   for each "key:number" line the micro:bit sent (dist:23 -> in_dist). With testset: own, also n_photos, n_groups,
//   photos_<label> (photos of each class), and acc_min (the lowest group's accuracy) once a model has run. Without a test set, only n_classes, has_<label>
//   and the serial values.
// The Teachable Machine library and TensorFlow.js (the versions its export uses) load only when this widget is used.
(function (B) {
  'use strict';
  var spec = null, set = null, model = null, modelUrl = '', results = null, st = null;
  var cache = {}, libs = null;
  var OWN = 'wp-classifier-own';      // students' own test photos: [{ label, group, src (a small JPEG data URL) }]
  var LAST = 'wp-classifier-link';   // the last model a student loaded: later steps start with it (they paste a new one after retraining)
  var TM = /^https:\/\/teachablemachine\.withgoogle\.com\/models\/[\w-]+\/?$/;

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function key(s) { return String(s).trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, ''); }
  function list(v) { return String(v || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean); }
  function pct(x) { return Math.round(x * 100) + '%'; }

  function parse(s) {
    if (s.testset === 'none') s.testset = '';
    if (s.testset && !/^[\w-]+$/.test(s.testset)) throw new Error('Name a test set, such as "testset: recycling".');
    if (!s.testset && s.webcam !== 'on') throw new Error('A board with no test set needs "webcam: on".');
    s.model = s.model || 'ask';
    if (s.model !== 'ask' && !TM.test(s.model) && /^[a-z]+:/i.test(s.model)) throw new Error('model: use "ask", a Teachable Machine link, or a folder on this site.');
    s.threshold = s.threshold === undefined ? 0.8 : Number(s.threshold);
    if (!(s.threshold > 0 && s.threshold <= 1)) throw new Error('threshold: a number from 0 to 1, such as 0.8.');
    s.repeatMs = s.repeat === undefined ? 0 : Number(s.repeat) * 1000;
    if (!(s.repeatMs >= 0 && s.repeatMs <= 60000)) throw new Error('repeat: seconds between sends, such as 1.');
    s.webcamOn = s.webcam === 'on'; s.serialOn = s.serial === 'on'; s.unsureOn = s.unsure === 'on';
    s.thresholds = {};
    s.items.forEach(function (it) {
      if (it.kind !== 'threshold' || !it.name) return;
      var v = Number(it.value);
      if (!(v > 0 && v <= 1)) throw new Error('Line ' + it.line + ': threshold for ' + it.name + ' must be a number from 0 to 1.');
      s.thresholds[key(it.name)] = v;
    });
  }

  function script(src) {
    return new Promise(function (ok, no) { var e = document.createElement('script'); e.src = src; e.onload = ok; e.onerror = function () { no(new Error('Could not load ' + src)); }; document.head.appendChild(e); });
  }
  function loadLibs() { return libs = libs || script('vendor/tf.min.js').then(function () { return script('vendor/teachablemachine-image.min.js'); }); }

  /** A pasted link or a path, as the folder holding model.json and metadata.json; or a message saying what is wrong. */
  function folder(text) {
    var t = String(text || '').trim();
    if (!t) return { error: 'Paste your model\'s shareable link first.' };
    if (TM.test(t)) return { url: t.replace(/\/?$/, '/') };
    if (/^https?:/i.test(t)) return { error: 'That is not a Teachable Machine link. In Teachable Machine choose Export Model, then Upload my model, and copy the link it gives you.' };
    if (/^[\w./-]+$/.test(t) && t.indexOf('..') < 0) return { url: t.replace(/\/?$/, '/') };
    return { error: 'That does not look like a model link.' };
  }

  function ownPhotos() { try { return JSON.parse(localStorage.getItem(OWN)) || []; } catch (e) { return []; } }
  function ownSet() {
    var photos = ownPhotos(), groups = [], names = {};
    photos.forEach(function (p) { if (groups.indexOf(p.group) < 0) { groups.push(p.group); names[p.group] = p.group; } });
    var classes = spec.classes ? list(spec.classes) : photos.map(function (p) { return p.label; }).filter(function (l, i, a) { return a.indexOf(l) === i; });
    return { title: 'Your test photos', classes: classes, groups: groups, names: names, base: '', own: true,
      images: photos.map(function (p, i) { return { label: p.label, group: p.group, src: p.src, i: i }; }) };
  }
  /** Shrink a photo to a 224 px square (the size the model sees), as a JPEG data URL. */
  function shrink(file) {
    return new Promise(function (ok, no) {
      var r = new FileReader();
      r.onload = function () {
        var im = new Image();
        im.onload = function () {
          var c = document.createElement('canvas'), n = 224, s0 = Math.min(im.width, im.height);
          c.width = n; c.height = n;
          c.getContext('2d').drawImage(im, (im.width - s0) / 2, (im.height - s0) / 2, s0, s0, 0, 0, n, n);
          ok(c.toDataURL('image/jpeg', 0.8));
        };
        im.onerror = function () { no(new Error(file.name + ' is not a photo this browser can open.')); };
        im.src = r.result;
      };
      r.readAsDataURL(file);
    });
  }
  function addPhotos(files, label, group) {
    label = String(label || '').trim(); group = String(group || '').trim().toLowerCase().replace(/[^\w ]/g, '').replace(/\s+/g, '_');
    if (!label) { st.ownMsg = 'Choose which class these photos are.'; paint(); return; }
    if (!group) { st.ownMsg = 'Name the group: where or how these photos were taken (desk, window, dim…).'; paint(); return; }
    var list0 = [].slice.call(files || []);
    if (!list0.length) return;
    st.ownMsg = 'Adding ' + list0.length + ' photos…'; paint();
    Promise.all(list0.map(shrink)).then(function (srcs) {
      var photos = ownPhotos().concat(srcs.map(function (src) { return { label: label, group: group, src: src }; }));
      try { localStorage.setItem(OWN, JSON.stringify(photos)); } catch (e) { throw new Error('This browser has no room for more photos. Remove some first.'); }
      st.ownMsg = 'Added ' + srcs.length + ' ' + label + ' photos (' + group.replace(/_/g, ' ') + ').';
      ownChanged();
    }).catch(function (e) { st.ownMsg = e.message; paint(); });
  }
  function removePhotos(which) {
    var photos = ownPhotos().filter(function (p, i) { return !which(p, i); });
    try { localStorage.setItem(OWN, JSON.stringify(photos)); } catch (e) { /* private mode */ }
    ownChanged();
  }
  function ownChanged() {
    set = ownSet(); st.ownVer = (st.ownVer || 0) + 1; results = null; B.moved = true;
    if (model) run(); else { paint(); report(); }
  }

  function testSet() {
    if (spec.testset === 'own') return Promise.resolve(ownSet());
    if (!spec.testset) return Promise.resolve({ classes: list(spec.classes), groups: [], names: {}, images: [], base: '' });
    return fetch('media/classifier/' + spec.testset + '/test.json', { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('There is no test set called "' + spec.testset + '".');
      return r.json();
    }).then(function (j) {
      var groups = spec.groups ? list(spec.groups) : Object.keys(j.groups);
      groups.forEach(function (g) { if (!j.groups[g]) throw new Error('The test set has no group "' + g + '" (it has ' + Object.keys(j.groups).join(', ') + ').'); });
      var classes = spec.classes ? list(spec.classes) : j.classes;
      return { title: j.title, credit: j.credit, classes: classes, groups: groups, names: j.groups, base: 'media/classifier/' + spec.testset + '/',
        images: j.images.filter(function (im) { return groups.indexOf(im.group) >= 0; }) };
    });
  }

  function image(src) {
    return new Promise(function (ok, no) { var im = new Image(); im.onload = function () { ok(im); }; im.onerror = function () { no(new Error('A test image is missing: ' + src)); }; im.src = src; });
  }

  function loadModel(text) {
    var f = folder(text);
    if (f.error) { st.msg = f.error; st.bad = true; paint(); return; }
    st.msg = 'Loading the model…'; st.bad = false; st.busy = true; paint();
    loadLibs().then(function () {
      return fetch(f.url + 'metadata.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error('nometa'); return r.json(); });
    }).then(function (meta) {
      if (meta.packageName && !/image/.test(meta.packageName)) throw new Error('This is a ' + meta.packageName.replace(/^@teachablemachine\//, '') + ' model. This board tests image models: in Teachable Machine start an Image Project.');
      return window.tmImage.load(f.url + 'model.json', f.url + 'metadata.json');
    }).then(function (m) {
      model = m; modelUrl = f.url; st.link = String(text).trim(); st.busy = false;
      B.save({ link: st.link });
      try { if (spec.model === 'ask') localStorage.setItem(LAST, st.link); } catch (e) { /* private mode */ }
      return run();
    }).catch(function (e) {
      if (window.console) console.warn('classifier: could not load', f.url, e);
      st.busy = false; st.bad = true; model = null;
      st.msg = e.message === 'nometa' || /fetch|network|404/i.test(e.message) ? 'Could not load a model from that link. Check that you copied the whole link after Upload my model, and that this computer can reach Teachable Machine.' : e.message;
      paint(); report();
    });
  }

  /** Every test image once per model; results are kept per model link. */
  function run() {
    var labels = model.getClassLabels();
    if (!set.images.length) { results = []; B.moved = true; checkClasses(labels); paint(); report(); return Promise.resolve(); }
    var ck = modelUrl + '|' + (st.ownVer || 0);
    if (cache[ck]) { results = cache[ck]; st.msg = ''; paint(); report(); return Promise.resolve(); }
    st.msg = 'Testing ' + set.images.length + ' images…'; paint();
    var out = [];
    return set.images.reduce(function (p, im) {
      return p.then(function () { return image(set.base + im.src); }).then(function (img) { return model.predict(img); }).then(function (pred) {
        pred.sort(function (a, b) { return b.probability - a.probability; });
        out.push({ im: im, label: pred[0].className, p: pred[0].probability, ok: key(pred[0].className) === key(im.label) });
      });
    }, Promise.resolve()).then(function () {
      cache[ck] = results = out; B.moved = true;
      checkClasses(labels);
      paint(); report();
    });
  }
  function checkClasses(labels) {
    var missing = set.classes.filter(function (c) { return !labels.some(function (l) { return key(l) === key(c); }); });
    st.msg = missing.length ? 'Your model has no class called "' + missing[0] + '". Rename the class in Teachable Machine, export again and paste the new link.' : '';
    st.bad = !!missing.length;
  }

  function scores() {
    var by = {}, all = { c: 0, n: 0 };
    set.groups.forEach(function (g) { by[g] = { c: 0, n: 0 }; });
    (results || []).forEach(function (r) { by[r.im.group].n++; all.n++; if (r.ok) { by[r.im.group].c++; all.c++; } });
    return { by: by, all: all };
  }

  function report() {
    var v = {}, out = 'No model yet';
    if (model && results && !set.images.length) {
      var labs = model.getClassLabels();
      v.n_classes = labs.length;
      set.classes.concat(['Neither']).forEach(function (c) { v['has_' + key(c)] = 0; });
      labs.forEach(function (l) { v['has_' + key(l)] = 1; });
      out = labs.join('/') + ' model loaded' + (spec.serialOn ? '; ' + st.sent + ' sent' : '');
    } else if (model && results) {
      var s = scores(), labels = model.getClassLabels();
      v.acc_all = s.all.n ? s.all.c / s.all.n : 0; v.n_correct = s.all.c; v.n_total = s.all.n; v.n_classes = labels.length;
      set.groups.forEach(function (g) { var x = s.by[g]; v['acc_' + key(g)] = x.n ? x.c / x.n : 0; });
      set.classes.concat(['Neither']).forEach(function (c) { v['has_' + key(c)] = 0; });
      labels.forEach(function (l) { v['has_' + key(l)] = 1; });
      out = labels.join('/') + ' model: ' + s.all.c + '/' + s.all.n + ' (' + pct(v.acc_all) + '). ' + set.groups.map(function (g) { var x = s.by[g]; return g + ' ' + (x.n ? pct(x.c / x.n) : '–'); }).join(', ');
    }
    if (set && set.own) {
      v.n_photos = set.images.length; v.n_groups = set.groups.length;
      set.classes.forEach(function (c) { v['photos_' + key(c)] = set.images.filter(function (im) { return key(im.label) === key(c); }).length; });
      if (model && results && results.length) {
        var sc2 = scores(), mins = set.groups.map(function (g) { var x = sc2.by[g]; return x.n ? x.c / x.n : 1; });
        v.acc_min = mins.length ? Math.min.apply(null, mins) : 0;
      }
    }
    if (spec.serialOn) {
      v.n_sent = st.sent; v.n_replies = st.replies;
      Object.keys(st.inVals).forEach(function (k) { v['in_' + k] = st.inVals[k]; });
      if (model) model.getClassLabels().concat(spec.unsureOn ? ['Unsure'] : []).forEach(function (l) { v['sent_' + key(l)] = st.sentBy[key(l)] || 0; });
    }
    Object.keys(v).forEach(function (k) { v[k] = Math.round(v[k] * 1000) / 1000; });
    B.say(model && results ? out : (spec.model === 'ask' && !st.busy ? 'Paste your model link, then Load.' : ''), false);
    B.post({ scope: { vars: v, points: {} }, model: modelUrl, loaded: !!model, labels: model ? model.getClassLabels() : [] }, out);
  }

  // ---- Serial: the board's shared micro:bit connection (core.js). ----
  function connect() { B.serial.connect(function (m) { st.serialMsg = m; paint(); }); }
  function send(text) {
    if (!B.serial.send(text)) return;
    st.sent++; st.sentBy[key(text)] = (st.sentBy[key(text)] || 0) + 1;
    st.log.unshift('→ ' + text); st.log.length = Math.min(st.log.length, 6); B.moved = true;
    paint(); report();
  }
  function heard(line) {
    st.replies++; st.log.unshift('← ' + line); st.log.length = Math.min(st.log.length, 6);
    var nv = B.nameValue(line);
    if (nv) st.inVals[key(nv[0])] = nv[1];
    B.moved = true; paint(); report();
  }

  // ---- Webcam preview: the top label live; with serial, sends a label once it holds steady. ----
  function webcam() {
    if (st.cam) { stopCam(); paint(); return; }
    if (!model) return;
    navigator.mediaDevices.getUserMedia({ video: { width: 224, height: 224 } }).then(function (stream) {
      var v = document.createElement('video'); v.muted = true; v.playsInline = true; v.srcObject = stream; v.play();
      st.cam = { stream: stream, video: v, top: '', p: 0, since: 0, timer: 0 };
      paint();
      st.cam.timer = setInterval(function () {
        if (!st.cam || v.readyState < 2) return;
        // Flipped, like Teachable Machine's own webcam: its webcam samples are mirrored, so Left and Right stay Left and Right.
        model.predict(v, true).then(function (pred) {
          if (!st.cam) return;
          pred.sort(function (a, b) { return b.probability - a.probability; });
          var c = st.cam, top = pred[0].className, now = Date.now();
          var th = spec.thresholds[key(top)] !== undefined ? spec.thresholds[key(top)] : spec.threshold;
          var sure = pred[0].probability >= th;
          // A label counts once it has held, above its threshold, for 300 ms; "unsure" holds the same way.
          var now1 = sure ? top : 'Unsure';
          if (now1 !== c.top) { c.top = now1; c.since = now; }
          c.p = pred[0].probability;
          var lab = B.el('cltop'); if (lab) lab.textContent = sure ? top + ' ' + pct(c.p) : 'Unsure (' + top + ' ' + pct(c.p) + ', needs ' + pct(th) + ')';
          var held = now - c.since >= 300 && (sure || spec.unsureOn);
          var again = spec.repeatMs && c.top === st.lastSent && now - st.lastAt >= spec.repeatMs;
          if (spec.serialOn && held && (c.top !== st.lastSent || again)) { st.lastSent = c.top; st.lastAt = now; send(c.top); }
        });
      }, 150);
    }).catch(function () { st.serialMsg = ''; st.msg = 'The webcam is blocked or missing. You can still test with the photos below.'; paint(); report(); });
  }
  function stopCam() { if (!st || !st.cam) return; clearInterval(st.cam.timer); st.cam.stream.getTracks().forEach(function (t) { t.stop(); }); st.cam = null; }

  function paint() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    var wrap = el('div', 'clwrap');
    // Load a model.
    if (spec.model === 'ask') {
      var row = el('div', 'clrow');
      var inp = el('input', 'cllink'); inp.type = 'url'; inp.id = 'cllink'; inp.placeholder = 'https://teachablemachine.withgoogle.com/models/…/'; inp.value = st.link || '';
      inp.setAttribute('aria-label', 'Your model\'s shareable link');
      var go = el('button', 'go', st.busy ? 'Loading…' : 'Load'); go.type = 'button'; go.disabled = st.busy;
      go.addEventListener('click', function () { loadModel(inp.value); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') loadModel(inp.value); });
      row.append(inp, go); wrap.appendChild(row);
    }
    if (st.msg) wrap.appendChild(el('p', 'clmsg' + (st.bad ? ' bad' : ''), st.msg));
    // Scores by group.
    if (model && results && set.images.length) {
      var s = scores(), sc = el('div', 'clscores');
      var tot = el('div', 'clscore all'); tot.append(el('b', '', 'Overall'), el('span', '', s.all.c + ' / ' + s.all.n + ' (' + pct(s.all.n ? s.all.c / s.all.n : 0) + ')')); sc.appendChild(tot);
      set.groups.forEach(function (g) {
        var x = s.by[g], f = x.n ? x.c / x.n : 0, d = el('div', 'clscore');
        var bar = el('i'); bar.style.setProperty('--f', f);
        d.append(el('b', '', set.names[g]), bar, el('span', '', x.c + ' / ' + x.n));
        sc.appendChild(d);
      });
      wrap.appendChild(sc);
    }
    // Webcam and serial.
    if ((spec.webcamOn && model) || spec.serialOn) {
      var tools = el('div', 'clrow');
      if (spec.webcamOn && model) { var cb = el('button', st.cam ? 'go' : 'quiet', st.cam ? 'Stop the webcam' : 'Try it on the webcam'); cb.type = 'button'; cb.addEventListener('click', webcam); tools.appendChild(cb); }
      if (spec.serialOn) {
        var on = B.serial.connected(), sb = el('button', on ? 'quiet' : 'go', on ? 'micro:bit connected' : 'Connect a micro:bit'); sb.type = 'button'; sb.disabled = on;
        sb.addEventListener('click', connect); tools.appendChild(sb);
      }
      wrap.appendChild(tools);
      if (st.cam) { var cam = el('div', 'clcam'); cam.append(st.cam.video, el('b', '', '')); cam.lastChild.id = 'cltop'; wrap.appendChild(cam); }
      if (spec.serialOn) {
        if (st.serialMsg) wrap.appendChild(el('p', 'clmsg', st.serialMsg));
        if (st.log.length) { var lg = el('ol', 'cllog'); lg.setAttribute('aria-label', 'Messages to and from the micro:bit'); st.log.forEach(function (l) { lg.appendChild(el('li', '', l)); }); wrap.appendChild(lg); }
      }
    }
    if (set.own) wrap.appendChild(ownPanel());
    // The test images.
    var grid = el('div', 'clgrid');
    set.images.forEach(function (im, i) {
      var r = results && results[i], card = el(spec.serialOn ? 'button' : 'div', 'clcard' + (r ? (r.ok ? ' ok' : ' no') : ''));
      if (spec.serialOn) { card.type = 'button'; card.title = 'Send this prediction to the micro:bit'; card.addEventListener('click', function () { if (r) send(r.label); }); }
      var pic = el('img'); pic.src = set.base + im.src; pic.alt = im.label + ', ' + set.names[im.group].toLowerCase(); pic.loading = 'lazy';
      card.appendChild(pic);
      var cap = el('span', 'clcap');
      if (r) { cap.append(el('b', '', (r.ok ? '✓ ' : '✗ ') + r.label)); var bar = el('i'); bar.style.setProperty('--f', r.p); cap.append(bar); }
      else cap.append(el('b', '', im.label));
      if (set.own && !spec.serialOn) {
        var x = el('button', 'clx', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Remove this photo');
        x.addEventListener('click', function () { removePhotos(function (p, j) { return j === im.i; }); });
        card.appendChild(x);
      }
      card.appendChild(cap); grid.appendChild(card);
    });
    wrap.appendChild(grid);
    if (set.credit) wrap.appendChild(el('p', 'clcredit', set.credit));
    panel.appendChild(wrap);
  }

  /** Add your own test photos: a class, a group (where or how they were taken), then the photos. */
  function ownPanel() {
    var box = el('div', 'clown');
    box.appendChild(el('b', '', 'Your test photos'));
    box.appendChild(el('p', 'clnote', 'Photos your model has never seen (not your training photos), taken where the model will be used. Give each group a name for where or how you took it: desk, window, dim, far away.'));
    var row = el('div', 'clrow'), lab;
    var cl = null;
    if (spec.classes) {
      lab = el('select', 'clsel'); set.classes.forEach(function (c) { var o = el('option', '', c); o.value = c; lab.appendChild(o); });
    } else {
      // Students' own classes: type one (exactly as named in the model); classes already used are offered.
      lab = el('input', 'cllink'); lab.type = 'text'; lab.placeholder = 'Class (as in your model)';
      cl = el('datalist'); cl.id = 'clclasses'; set.classes.concat(['Neither']).filter(function (c, i, a) { return a.indexOf(c) === i; }).forEach(function (c) { var o = el('option'); o.value = c; cl.appendChild(o); });
      lab.setAttribute('list', 'clclasses');
      if (st.lastLabel) lab.value = st.lastLabel;
    }
    lab.id = 'clownlabel'; lab.setAttribute('aria-label', 'Which class these photos are');
    var grp = el('input', 'cllink'); grp.type = 'text'; grp.id = 'clowngroup'; grp.placeholder = 'Group, such as desk'; grp.setAttribute('aria-label', 'Group: where or how the photos were taken');
    if (st.lastGroup) grp.value = st.lastGroup;
    var dl = el('datalist'); dl.id = 'clgroups'; set.groups.forEach(function (g) { var o = el('option'); o.value = g; dl.appendChild(o); }); grp.setAttribute('list', 'clgroups');
    var file = el('input'); file.type = 'file'; file.accept = 'image/*'; file.multiple = true; file.hidden = true; file.id = 'clownfile';
    var add = el('button', 'go', 'Add photos'); add.type = 'button';
    add.addEventListener('click', function () { st.lastGroup = grp.value; st.lastLabel = lab.value; file.click(); });
    file.addEventListener('change', function () { addPhotos(file.files, lab.value, grp.value); });
    row.append(lab, grp, dl, add, file);
    if (cl) row.appendChild(cl);
    box.appendChild(row);
    if (set.images.length) {
      var counts = set.classes.map(function (c) {
        var mine = set.images.filter(function (im) { return key(im.label) === key(c); });
        return c + ': ' + mine.length + (mine.length ? ' (' + set.groups.map(function (g) { var n = mine.filter(function (im) { return im.group === g; }).length; return n ? g.replace(/_/g, ' ') + ' ' + n : ''; }).filter(Boolean).join(', ') + ')' : '');
      });
      box.appendChild(el('p', 'clnote', counts.join(' · ')));
      var clear = el('button', 'quiet', 'Remove all photos'); clear.type = 'button';
      clear.addEventListener('click', function () { if (confirm('Remove all your test photos from this browser?')) removePhotos(function () { return true; }); });
      var r2 = el('div', 'clrow'); r2.appendChild(clear); box.appendChild(r2);
    }
    if (st.ownMsg) box.appendChild(el('p', 'clmsg', st.ownMsg));
    return box;
  }

  // Another step's board (another frame on the lesson page) added or removed own photos: show the same set here.
  window.addEventListener('storage', function (e) { if (e.key === OWN && spec && spec.testset === 'own' && set) ownChanged(); });

  B.widget('classifier', {
    sections: ['gpanel'],
    label: function () { return 'Test an image model'; },
    parse: parse,
    start: function (fresh) {
      spec = B.spec; stopCam(); model = null; results = null; modelUrl = '';
      var saved = fresh ? null : B.saved(), last = '';
      try { last = B.q.get('fresh') === '1' ? '' : localStorage.getItem(LAST) || ''; } catch (e) { /* private mode */ }
      st = { link: saved && saved.link || last, msg: spec.testset ? 'Loading the test photos…' : '', bad: false, busy: false, cam: null, serialMsg: '', sent: 0, sentBy: {}, replies: 0, inVals: {}, log: [], lastSent: '', lastAt: 0 };
      B.serial.listen(heard);
      var p = B.el('gpanel'); p.replaceChildren();
      testSet().then(function (s) {
        set = s; st.msg = ''; paint(); report();
        var start = spec.model !== 'ask' ? spec.model : st.link;
        if (start) loadModel(start);
      }).catch(function (e) { B.fail(e.message); });
    },
  });
})(WPB);
