// Inside a computer: a spec sheet (processor cores and speed, RAM, storage, network, graphics) and jobs to run on it.
// Running a job shows how long each part takes; the longest is the bottleneck. A simple model: the times add up.
//   widget: hardware
//   device: laptop          the starting device: phone | laptop | server | old, or the name of a device line
//   devices: phone, laptop, server     buttons to switch device (device lines are added after these)
//   device A: 8 3 8 ssd 1024 50 0      a device of your own: cores, GHz, RAM GB, ssd|hdd, storage GB, network Mb/s,
//                                      graphics card (1 or 0); a one-letter name shows as "Option A"
//   pick: all               which parts can be changed: all | none | a list of cpu, ram, storage, network, gpu
//   jobs: tabs, game        job buttons (default all): tabs | video | game | download | ai | photos
//   job: tabs               the starting job;  jobs: none hides the jobs and Run (a spec sheet only)
//   explain: on             each spec row gets a "What does it measure?" button (with a kitchen comparison)
//   budget: 900             show the cost against a budget
//   target: 60              show a time target (seconds)
// Model: processor time = work ÷ (cores it can use × GHz) (AI uses the graphics card if there is one); RAM: each GB
// the job needs beyond the RAM is swapped to storage and back (2 × 1024 MB at the storage speed); storage time =
// MB ÷ speed (HDD 100 MB/s, SSD 2000 MB/s); network time = MB × 8 ÷ Mb/s. A job that needs more space than the storage
// has free (50 GB is the system's) does not fit.
// state: { scope: { vars: { t (seconds, last run; 0 before a run), u (1 if that run used the specs shown), b (bottleneck:
//          1 processor, 2 RAM, 3 storage, 4 network, 5 graphics), c (cost $), k (cores), g (GHz × 10), r (RAM GB), s (1 SSD),
//          z (storage GB), n (Mb/s), h (graphics card), j (job: 1 tabs, 2 video, 3 game, 4 download, 5 ai, 6 photos),
//          f (1 the job fits), x (runs), y (different jobs run), w (different devices run), v (device shown, 1-based in
//          the device buttons; 0 changed), m (parts changed from the starting device), p (specs explained, of 5) } } }
// Checks: "u = 1 and j = 3 and t < 20", "p = 5", "k = 8 and r = 16", "u = 1 and t < 60 and c <= 900", "y >= 3".
(function (B) {
  'use strict';
  var spec = null, cfg = null, job = 'tabs', last = null, ui = {}, ranJobs = {}, ranDevs = {}, runs = 0, read = {}, start = null;
  var CORES = [2, 4, 8, 16, 32], GHZ = [2, 3, 4], RAM = [4, 8, 16, 32, 64, 128], SIZE = [128, 256, 512, 1024, 2048, 4096], NET = [50, 300, 1000, 10000];
  var SPEED = { hdd: 100, ssd: 2000 }, GPU = 400, SYSTEM_GB = 50;
  var PRICE = {
    base: 150, cores: { 2: 60, 4: 150, 8: 350, 16: 900, 32: 2500 }, ghz: { 2: 0, 3: 60, 4: 180 },
    ram: function (gb) { return gb * 7.5; },
    hdd: { 128: 25, 256: 30, 512: 35, 1024: 45, 2048: 60, 4096: 90 }, ssd: { 128: 25, 256: 35, 512: 60, 1024: 100, 2048: 180, 4096: 350 },
    net: { 50: 0, 300: 30, 1000: 60, 10000: 250 }, gpu: 450,
  };
  var BUILT = {
    phone: { name: 'Phone', k: 8, g: 3, r: 8, t: 'ssd', z: 256, n: 300, h: 0 },
    laptop: { name: 'Laptop', k: 4, g: 3, r: 16, t: 'ssd', z: 512, n: 300, h: 0 },
    server: { name: 'Server', k: 32, g: 3, r: 128, t: 'ssd', z: 4096, n: 10000, h: 1 },
    old: { name: 'Old laptop', k: 2, g: 2, r: 8, t: 'hdd', z: 1024, n: 50, h: 0 },
  };
  // work: processor work (core × GHz × seconds); par: cores it can use; need: RAM GB; mb: MB read or written;
  // net: MB downloaded; gb: space it needs; gpu: the graphics card can do the work.
  var JOBS = {
    tabs: { name: 'Switch between 30 browser tabs', work: 12, par: 2, need: 12, mb: 100, net: 0, gb: 0 },
    video: { name: 'Export a 10-minute 4K video', work: 1200, par: 8, need: 16, mb: 6000, net: 0, gb: 6 },
    game: { name: 'Load a big game level', work: 40, par: 4, need: 8, mb: 8000, net: 0, gb: 100 },
    download: { name: 'Download a 5 GB update', work: 5, par: 1, need: 2, mb: 5000, net: 5000, gb: 5 },
    ai: { name: 'Train a small AI model', work: 4000, par: 8, need: 8, mb: 2000, net: 0, gb: 2, gpu: true },
    photos: { name: 'Copy 60,000 photos onto it (180 GB)', work: 20, par: 1, need: 4, mb: 180000, net: 0, gb: 180 },
  };
  var JOB_IDS = Object.keys(JOBS);
  var PART = ['Processor', 'RAM', 'Storage', 'Network', 'Graphics card'];
  var MEANS = [
    ['Processor', 'How fast it works through instructions. GHz is billions of steps a second for each core; cores are how many things it can work on at the same time.', 'The chefs: how fast each one works, and how many there are.'],
    ['Memory (RAM)', 'How much it can work on at once. Running apps and open files sit in RAM while you use them. It empties when the power goes off.', 'The bench: everything you are cooking with right now. A small bench means running back to the pantry.'],
    ['Storage', 'How much it can keep, even with the power off (GB), and how fast it reads and writes it: an SSD is about 20 times faster than a hard disk (HDD).', 'The pantry: how much it holds, and how far away it is.'],
    ['Network', 'Bandwidth: how much data can arrive each second (Mb/s, millions of bits a second).', 'The delivery van: how much it brings each trip.'],
    ['Graphics', 'A graphics card has thousands of small, simple processors that all do the same sum at once: pictures, games and AI.', 'A team of helpers who can all chop at once, but only do simple jobs.'],
  ];

  function parse(s) {
    s.devs = [];
    var list = s.devices === undefined ? [] : String(s.devices).split(',').map(function (x) { return x.trim().toLowerCase(); }).filter(Boolean);
    list.forEach(function (id) { if (!BUILT[id]) throw new Error('devices: phone, laptop, server or old (got "' + id + '").'); s.devs.push(Object.assign({ id: id }, BUILT[id])); });
    s.items.filter(function (i) { return i.kind === 'device' && i.name; }).forEach(function (i) {
      var p = i.value.trim().split(/\s+/);
      if (p.length !== 7) throw new Error('device ' + i.name + ': cores, GHz, RAM, ssd|hdd, storage GB, Mb/s, graphics (7 values).');
      var d = { id: i.name.toLowerCase(), name: i.name.length === 1 ? 'Option ' + i.name.toUpperCase() : i.name, k: +p[0], g: +p[1], r: +p[2], t: p[3].toLowerCase(), z: +p[4], n: +p[5], h: +p[6] ? 1 : 0 };
      if (CORES.indexOf(d.k) < 0 || GHZ.indexOf(d.g) < 0 || RAM.indexOf(d.r) < 0 || !SPEED[d.t] || SIZE.indexOf(d.z) < 0 || NET.indexOf(d.n) < 0)
        throw new Error('device ' + i.name + ': cores ' + CORES.join('/') + ', GHz ' + GHZ.join('/') + ', RAM ' + RAM.join('/') + ', ssd or hdd, storage ' + SIZE.join('/') + ', Mb/s ' + NET.join('/') + '.');
      s.devs.push(d);
    });
    var first = String(s.device || (s.devs[0] && s.devs[0].id) || 'laptop').toLowerCase();
    s.dev0 = s.devs.filter(function (d) { return d.id === first; })[0] || (BUILT[first] && Object.assign({ id: first }, BUILT[first]));
    if (!s.dev0) throw new Error('device: phone, laptop, server, old or the name of a device line.');
    var pk = String(s.pick === undefined ? 'all' : s.pick).toLowerCase();
    s.pk = {}; ['cpu', 'ram', 'storage', 'network', 'gpu'].forEach(function (x) { s.pk[x] = pk === 'all' || pk.indexOf(x) >= 0; });
    var jl = String(s.jobs === undefined ? JOB_IDS.join(',') : s.jobs).toLowerCase();
    s.jobList = jl === 'none' ? [] : jl.split(',').map(function (x) { return x.trim(); }).filter(Boolean);
    s.jobList.forEach(function (j) { if (!JOBS[j]) throw new Error('jobs: ' + JOB_IDS.join(', ') + ' (got "' + j + '").'); });
    s.job0 = String(s.job || s.jobList[0] || 'tabs').toLowerCase();
    if (!JOBS[s.job0]) throw new Error('job: ' + JOB_IDS.join(', ') + '.');
    s.explain = /^on$/i.test(s.explain || '');
    s.budget0 = s.budget === undefined ? 0 : Number(s.budget);
    s.target0 = s.target === undefined ? 0 : Number(s.target);
  }

  var copy = function (d) { return { k: d.k, g: d.g, r: d.r, t: d.t, z: d.z, n: d.n, h: d.h }; };
  var same = function (a, b) { return a.k === b.k && a.g === b.g && a.r === b.r && a.t === b.t && a.z === b.z && a.n === b.n && a.h === b.h; };
  function changed(a, b) { var m = 0; ['k', 'g', 'r', 't', 'z', 'n', 'h'].forEach(function (f) { if (a[f] !== b[f]) m++; }); return m; }
  function cost(d) { return Math.round(PRICE.base + PRICE.cores[d.k] + PRICE.ghz[d.g] + PRICE.ram(d.r) + PRICE[d.t][d.z] + PRICE.net[d.n] + (d.h ? PRICE.gpu : 0)); }
  function devIndex() { for (var i = 0; i < spec.devs.length; i++) if (same(spec.devs[i], cfg)) return i + 1; return 0; }
  var gb = function (z) { return z >= 1024 ? (z / 1024) + ' TB' : z + ' GB'; };
  var mbps = function (n) { return n >= 1000 ? (n / 1000) + ' Gb/s' : n + ' Mb/s'; };
  var secs = function (t) { return t < 10 ? (Math.round(t * 10) / 10) + ' s' : t < 600 ? Math.round(t) + ' s' : Math.round(t / 6) / 10 + ' min'; };

  /** Seconds each part takes for a job: [processor, RAM, storage, network, graphics]. */
  function times(d, J) {
    var sp = SPEED[d.t], out = [0, 0, 0, 0, 0];
    if (J.gpu && d.h) out[4] = J.work / GPU; else out[0] = J.work / (Math.min(d.k, J.par) * d.g);
    out[1] = Math.max(0, J.need - d.r) * 2048 / sp;
    out[2] = J.mb / sp;
    out[3] = J.net * 8 / d.n;
    return out;
  }

  function stepper(label, list, field, fmt) {
    var w = document.createElement('span'); w.className = 'hwstep';
    var dn = document.createElement('button'); dn.type = 'button'; dn.textContent = '−'; dn.setAttribute('aria-label', label + ': less');
    var up = document.createElement('button'); up.type = 'button'; up.textContent = '+'; up.setAttribute('aria-label', label + ': more');
    var o = document.createElement('output'); o.textContent = fmt(cfg[field]);
    var put = function (dir) { var i = list.indexOf(cfg[field]) + dir; if (i < 0 || i >= list.length) return; cfg[field] = list[i]; B.moved = true; draw(); report(); };
    dn.disabled = list.indexOf(cfg[field]) <= 0; up.disabled = list.indexOf(cfg[field]) >= list.length - 1;
    dn.addEventListener('click', function () { put(-1); }); up.addEventListener('click', function () { put(1); });
    w.append(dn, o, up); return w;
  }
  function toggle(label, text, fn) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'hwtog'; b.textContent = text; b.setAttribute('aria-label', label);
    b.addEventListener('click', function () { fn(); B.moved = true; draw(); report(); }); return b;
  }

  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'hwwrap';
    if (spec.devs.length) {
      var bar = document.createElement('div'); bar.className = 'hwbar'; bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'Devices');
      var lab = document.createElement('span'); lab.className = 'hwlab'; lab.textContent = 'Device:'; bar.appendChild(lab);
      var vi = devIndex();
      spec.devs.forEach(function (d, i) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = d.name; b.setAttribute('aria-pressed', String(vi === i + 1));
        b.addEventListener('click', function () { cfg = copy(d); B.moved = true; draw(); report(); });
        bar.appendChild(b);
      });
      wrap.appendChild(bar);
    }
    var cols = document.createElement('div'); cols.className = 'hwcols';
    // The spec sheet.
    var sheet = document.createElement('div'); sheet.className = 'hwsheet';
    var h = document.createElement('div'); h.className = 'hwhead'; h.textContent = 'Spec sheet'; sheet.appendChild(h);
    var rows = [
      [MEANS[0][0], spec.pk.cpu ? [stepper('Cores', CORES, 'k', function (v) { return v + ' cores'; }), stepper('Speed', GHZ, 'g', function (v) { return v.toFixed(1) + ' GHz'; })] : [cfg.k + ' cores × ' + cfg.g.toFixed(1) + ' GHz']],
      [MEANS[1][0], spec.pk.ram ? [stepper('RAM', RAM, 'r', function (v) { return v + ' GB'; })] : [cfg.r + ' GB']],
      [MEANS[2][0], spec.pk.storage ? [stepper('Storage size', SIZE, 'z', gb), toggle('Storage type: ' + cfg.t.toUpperCase() + ', switch', cfg.t === 'ssd' ? 'SSD' : 'HDD', function () { cfg.t = cfg.t === 'ssd' ? 'hdd' : 'ssd'; })] : [gb(cfg.z) + ' ' + cfg.t.toUpperCase()]],
      [MEANS[3][0], spec.pk.network ? [stepper('Network', NET, 'n', mbps)] : [mbps(cfg.n)]],
      [MEANS[4][0], spec.pk.gpu ? [toggle('Graphics card: ' + (cfg.h ? 'remove' : 'add'), cfg.h ? 'Graphics card' : 'Built-in', function () { cfg.h = cfg.h ? 0 : 1; })] : [cfg.h ? 'Graphics card' : 'Built-in']],
    ];
    rows.forEach(function (row, i) {
      var r = document.createElement('div'); r.className = 'hwrow' + (last && last.u && last.b === i + 1 ? ' slow' : '');
      var n = document.createElement('span'); n.className = 'hwname'; n.textContent = row[0];
      var v = document.createElement('span'); v.className = 'hwval';
      row[1].forEach(function (x) { if (typeof x === 'string') { var t = document.createElement('b'); t.textContent = x; v.appendChild(t); } else v.appendChild(x); });
      r.append(n, v);
      if (spec.explain) {
        var q = document.createElement('button'); q.type = 'button'; q.className = 'hwq'; q.textContent = read[i] ? 'Hide' : 'What does it measure?';
        q.setAttribute('aria-label', 'What does ' + row[0] + ' measure?'); q.setAttribute('aria-expanded', String(!!ui.open && ui.open[i]));
        q.addEventListener('click', function () { ui.open = ui.open || {}; ui.open[i] = !ui.open[i]; read[i] = 1; B.moved = true; draw(); report(); });
        r.appendChild(q);
        if (ui.open && ui.open[i]) {
          var m = document.createElement('p'); m.className = 'hwmeans'; m.textContent = MEANS[i][1];
          var k2 = document.createElement('span'); k2.className = 'hwkitchen'; k2.textContent = ' Kitchen: ' + MEANS[i][2].charAt(0).toLowerCase() + MEANS[i][2].slice(1); m.appendChild(k2);
          r.appendChild(m);
        }
      }
      sheet.appendChild(r);
    });
    var cr = document.createElement('div'); cr.className = 'hwcost' + (spec.budget0 && cost(cfg) > spec.budget0 ? ' over' : '');
    cr.textContent = 'Cost: $' + cost(cfg) + (spec.budget0 ? ' (budget $' + spec.budget0 + ')' : '');
    sheet.appendChild(cr);
    cols.appendChild(sheet);
    // The jobs and the time bars.
    if (spec.jobList.length) {
      var side = document.createElement('div'); side.className = 'hwjobs';
      var jh = document.createElement('div'); jh.className = 'hwhead'; jh.textContent = 'Job'; side.appendChild(jh);
      if (spec.jobList.length > 1) {
        var jb = document.createElement('div'); jb.className = 'hwbar'; jb.setAttribute('role', 'group'); jb.setAttribute('aria-label', 'Jobs');
        spec.jobList.forEach(function (id) {
          var b = document.createElement('button'); b.type = 'button'; b.textContent = JOBS[id].name; b.setAttribute('aria-pressed', String(job === id));
          b.addEventListener('click', function () { job = id; B.moved = true; draw(); report(); });
          jb.appendChild(b);
        });
        side.appendChild(jb);
      } else { var one = document.createElement('p'); one.className = 'hwone'; one.textContent = JOBS[job].name; side.appendChild(one); }
      var run = document.createElement('button'); run.type = 'button'; run.className = 'hwrun'; run.textContent = '▶ Run the job'; run.setAttribute('aria-label', 'Run the job');
      run.addEventListener('click', go); side.appendChild(run);
      var res = document.createElement('div'); res.className = 'hwres' + (last && !last.u ? ' stale' : ''); res.id = 'hwres';
      if (last) {
        var mx = Math.max.apply(null, last.parts.concat([1]));
        last.parts.forEach(function (sec, i) {
          if (i === 4 && !sec) return;
          var r = document.createElement('div'); r.className = 'hwbarrow' + (last.b === i + 1 ? ' slow' : '');
          var n = document.createElement('span'); n.className = 'hwbn'; n.textContent = i === 1 ? 'RAM (swapping)' : PART[i];
          var tr = document.createElement('span'); tr.className = 'hwtrack';
          var fill = document.createElement('span'); fill.className = 'hwfill'; fill.style.width = Math.max(sec ? 1.5 : 0, sec / mx * 100) + '%'; tr.appendChild(fill);
          var o = document.createElement('span'); o.className = 'hwsec'; o.textContent = secs(sec);
          r.append(n, tr, o); res.appendChild(r);
        });
        var tot = document.createElement('p'); tot.className = 'hwtot';
        tot.textContent = !last.f ? 'Does not fit: it needs ' + JOBS[last.job].gb + ' GB free and this storage has ' + Math.max(0, last.z - SYSTEM_GB) + ' GB.'
          : 'Total: ' + secs(last.t) + '. Slowest part: ' + PART[last.b - 1] + (last.b === 2 ? ' (not enough RAM, so it swaps to storage)' : '') + '.' + (spec.target0 ? (last.t <= spec.target0 ? ' Meets the ' + spec.target0 + ' s target.' : ' Misses the ' + spec.target0 + ' s target.') : '');
        res.appendChild(tot);
        if (!last.u) { var st = document.createElement('p'); st.className = 'hwstale'; st.textContent = 'The specs changed: run it again.'; res.appendChild(st); }
      } else { var e = document.createElement('p'); e.className = 'hwhint'; e.textContent = 'Press Run to see how long each part takes.'; res.appendChild(e); }
      side.appendChild(res);
      cols.appendChild(side);
    }
    wrap.appendChild(cols);
    host.appendChild(wrap);
  }

  function go() {
    var J = JOBS[job], parts = times(cfg, J), t = parts.reduce(function (a, b) { return a + b; }, 0);
    var b = 0; parts.forEach(function (x, i) { if (b === 0 || x > parts[b - 1]) b = i + 1; });
    var f = cfg.z - SYSTEM_GB >= J.gb ? 1 : 0;
    if (!f) b = 3;
    last = { job: job, cfg: copy(cfg), parts: parts, t: t, b: b, f: f, z: cfg.z, u: 1 };
    runs++; ranJobs[job] = 1;
    var vi = devIndex(); ranDevs[vi ? spec.devs[vi - 1].id : 'custom:' + JSON.stringify(cfg)] = 1;
    B.moved = true; draw(); report();
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; ui.work.setAttribute('aria-live', 'polite'); panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  function report() {
    if (last) last.u = last.job === job && same(last.cfg, cfg) ? 1 : 0;
    var vi = devIndex(), c = cost(cfg), p = Object.keys(read).length;
    var sheet = cfg.k + ' cores × ' + cfg.g.toFixed(1) + ' GHz, ' + cfg.r + ' GB RAM, ' + gb(cfg.z) + ' ' + cfg.t.toUpperCase() + ', ' + mbps(cfg.n) + (cfg.h ? ', graphics card' : '') + ', $' + c;
    var said = last && last.u ? (last.f ? JOBS[job].name + ': ' + secs(last.t) + ', slowest part ' + PART[last.b - 1] : JOBS[job].name + ': does not fit') : '';
    ui.work.textContent = (vi ? spec.devs[vi - 1].name + ': ' : '') + sheet + (said ? '. ' + said : '');
    B.say(said || sheet);
    B.save({ cfg: cfg, job: job, read: read });
    var ok = last && last.u;
    B.post({ scope: { vars: {
      t: ok ? Math.round(last.t * 10) / 10 : 0, u: ok ? 1 : 0, b: ok ? last.b : 0, f: ok ? last.f : 0, c: c, k: cfg.k, g: cfg.g * 10, r: cfg.r, s: cfg.t === 'ssd' ? 1 : 0, z: cfg.z, n: cfg.n, h: cfg.h,
      j: JOB_IDS.indexOf(job) + 1, x: runs, y: Object.keys(ranJobs).length, w: Object.keys(ranDevs).length, v: vi, m: changed(cfg, start), p: p,
    }, points: {} } }, ui.work.textContent);
  }

  B.widget('hardware', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A computer spec sheet with jobs to run'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (fresh) {
      spec = B.spec; start = copy(spec.dev0);
      var sv = fresh ? null : B.saved();
      cfg = sv && sv.cfg && CORES.indexOf(sv.cfg.k) >= 0 ? sv.cfg : copy(spec.dev0);
      job = sv && JOBS[sv.job] && spec.jobList.indexOf(sv.job) >= 0 ? sv.job : spec.job0;
      read = sv && sv.read && typeof sv.read === 'object' ? sv.read : {};
      last = null; runs = 0; ranJobs = {}; ranDevs = {}; ui.open = {};
      paintPanel(); draw(); report();
    },
  });
})(WPB);
