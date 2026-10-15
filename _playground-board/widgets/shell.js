// A pretend Linux terminal over a small pretend filesystem (nothing here touches a real computer).
//   widget: shell
//   fs: school | hunt | empty        the starting files (see FS below)
//   file: /home/sam/a.txt | line one\nline two      add or replace a file (\n starts a new line)
//   dir: /home/sam/new                add a folder
//   start: /home/sam                  the starting folder (default /home/sam)
//   tree: on | all                    a folder tree beside the terminal (all shows hidden files too)
//   run: ls; cd projects              commands run (silently) before the student starts
// Commands: help, pwd, ls [-a] [-l] [path], cd [path], cat, grep [-i] [-c] [-v] [-n], wc [-l] [-w], sort, uniq,
// head [-n N], echo, touch, mkdir, cp, mv, rm [-r], chmod (644 or u+x, o-r, a+w…), whoami, clear, history; pipes
// (a | b) and > or >> after echo or any command. Files have an owner and read/write/run permissions for the
// owner and for everyone else; the user is sam.
// Checks read these (setup options in brackets):
//   w: 1 when the current folder is [at: path]      s: 1 once [find: path]'s contents have been shown
//   x: 1 when [exists: path] exists                  z: 1 when [gone: path] no longer exists
//   m: [watch: path]'s permissions as digits (644)   k: 1 if everyone else may read [watch:]
//   o: the last output as a number (−1 if not one)   l: lines in the last output    u: 1 if the last command used |
//   e: 1 if the last command failed                  n: commands run    h: different commands used
//   a: 1 once ls -a has been used                    g: 1 once grep has been used    d: how deep the current folder is
//   p: 1 if the last command used > or >>
(function (B) {
  'use strict';
  var spec = null, ui = {}, st = null, USER = 'sam', HOME = '/home/sam';
  var FS = {
    school: {
      dirs: ['/home', '/home/sam', '/home/sam/projects', '/home/sam/projects/game', '/home/sam/photos', '/home/lee', '/tmp', '/etc'],
      files: {
        '/home/sam/notes.txt': 'Bring a calculator\nRobot club on Friday\nFinish maths homework',
        '/home/sam/pets.txt': 'cat\ndog\ncatfish\nparrot\ncat\nhamster',
        '/home/sam/.plans.txt': 'Surprise party for Lee on Friday. Do not tell!',
        '/home/sam/projects/robot.py': "print('beep')",
        '/home/sam/projects/game/level1.txt': 'Start at the door. Find the key.',
        '/home/sam/photos/beach.jpg': '(a photo of a beach)',
        '/home/sam/photos/dog.jpg': '(a photo of a dog)',
        '/home/lee/timetable.txt': 'Monday: Year 8 Digital Technologies\nTuesday: Year 9 Digital Technologies',
        '/home/lee/marks.txt': 'Sam 18/20\nAva 17/20\nNoah 19/20',
        '/etc/hostname': 'school',
      },
      owner: { '/home/lee': 'lee', '/home/lee/timetable.txt': 'lee', '/home/lee/marks.txt': 'lee', '/etc': 'root', '/etc/hostname': 'root', '/home': 'root', '/tmp': 'root' },
      mode: { '/home/lee/marks.txt': 0o600, '/home/lee': 0o755 },
    },
    hunt: {
      dirs: ['/home', '/home/sam', '/home/sam/hunt', '/home/sam/hunt/library', '/home/sam/hunt/library/shelf2', '/home/sam/hunt/gym', '/home/sam/hunt/gym/.locker', '/home/sam/hunt/office'],
      files: {
        '/home/sam/hunt/start.txt': 'Welcome to the hunt.\nYour first clue is in the library, on shelf 2.',
        '/home/sam/hunt/library/shelf1.txt': 'Nothing here but dust.',
        '/home/sam/hunt/library/shelf2/book.txt': 'Chapter 1\nChapter 2\nThe next clue is in the gym, somewhere hidden.\nChapter 3',
        '/home/sam/hunt/gym/notice.txt': 'Gym closed on Monday.',
        '/home/sam/hunt/gym/.locker/clue.txt': 'Last clue: the office has a list of codes.\nThe right one is the only line with the word GOLD in it.',
        '/home/sam/hunt/office/codes.txt': 'silver 4471\nbronze 9902\ntin 1186\ngold 5530\nlead 7745\ncopper 3317\nGOLD 2468\nsilver 6612',
      },
      owner: { '/home': 'root' }, mode: {},
    },
    empty: { dirs: ['/home', '/home/sam'], files: {}, owner: { '/home': 'root' }, mode: {} },
  };

  function parse(s) {
    s.fs0 = String(s.fs || 'school').toLowerCase();
    if (!FS[s.fs0]) throw new Error('fs: school, hunt or empty.');
    s.extraFiles = s.items.filter(function (i) { return i.kind === 'file' && !i.name; }).map(function (i) {
      var k = i.value.indexOf('|'); if (k < 0) throw new Error('file: /path | contents');
      return [i.value.slice(0, k).trim(), i.value.slice(k + 1).trim().replace(/\\n/g, '\n')];
    });
    s.extraDirs = s.items.filter(function (i) { return i.kind === 'dir' && !i.name; }).map(function (i) { return i.value.trim(); });
    s.start0 = s.start || HOME;
    s.tree0 = /^(on|all)$/i.test(s.tree || '') ? String(s.tree).toLowerCase() : '';
    s.run0 = s.run ? String(s.run).split(';').map(function (x) { return x.trim(); }).filter(Boolean) : [];
  }

  // ---------- the filesystem ----------
  function fresh() {
    var f = FS[spec.fs0], nodes = {};
    f.dirs.forEach(function (d) { nodes[d] = { dir: true, owner: f.owner[d] || USER, mode: f.mode[d] || 0o755 }; });
    nodes['/'] = { dir: true, owner: 'root', mode: 0o755 };
    Object.keys(f.files).forEach(function (p) { nodes[p] = { dir: false, text: f.files[p], owner: f.owner[p] || USER, mode: f.mode[p] || 0o644 }; });
    spec.extraDirs.forEach(function (d) { mkdirs(nodes, d); });
    spec.extraFiles.forEach(function (x) { mkdirs(nodes, parent(x[0])); nodes[x[0]] = { dir: false, text: x[1], owner: USER, mode: 0o644 }; });
    return nodes;
  }
  function mkdirs(nodes, d) { var parts = d.split('/').filter(Boolean), p = ''; parts.forEach(function (x) { p += '/' + x; if (!nodes[p]) nodes[p] = { dir: true, owner: USER, mode: 0o755 }; }); }
  var parent = function (p) { var i = p.lastIndexOf('/'); return i <= 0 ? '/' : p.slice(0, i); };
  var base = function (p) { return p === '/' ? '/' : p.slice(p.lastIndexOf('/') + 1); };
  function resolve(p) {
    if (!p) return st.cwd;
    if (p === '~') p = HOME; else if (p.indexOf('~/') === 0) p = HOME + p.slice(1);
    var parts = (p.charAt(0) === '/' ? p : st.cwd + '/' + p).split('/'), out = [];
    parts.forEach(function (x) { if (!x || x === '.') return; if (x === '..') out.pop(); else out.push(x); });
    return '/' + out.join('/');
  }
  var kids = function (d) { var pre = d === '/' ? '/' : d + '/'; return Object.keys(st.fs).filter(function (p) { return p !== d && p.indexOf(pre) === 0 && p.slice(pre.length).indexOf('/') < 0; }).sort(); };
  function can(node, what) { var bits = node.owner === USER ? (node.mode >> 6) & 7 : node.mode & 7; return !!(bits & { r: 4, w: 2, x: 1 }[what]); }
  var modeStr = function (n) { var s = n.dir ? 'd' : '-'; [6, 3, 0].forEach(function (sh) { var b = (n.mode >> sh) & 7; s += (b & 4 ? 'r' : '-') + (b & 2 ? 'w' : '-') + (b & 1 ? 'x' : '-'); }); return s; };

  // ---------- commands ----------
  function Err(m) { this.m = m; }
  function getFile(cmd, p) {
    var full = resolve(p), n = st.fs[full];
    if (!n) throw new Err(cmd + ': ' + p + ': No such file or folder');
    if (n.dir) throw new Err(cmd + ': ' + p + ': Is a folder');
    if (!can(n, 'r')) throw new Err(cmd + ': ' + p + ': Permission denied');
    st.read[full] = 1;
    return n.text;
  }
  function flags(args) { var f = {}, rest = []; args.forEach(function (a) { if (/^-[a-zA-Z]+$/.test(a)) a.slice(1).split('').forEach(function (c) { f[c] = true; }); else rest.push(a); }); return [f, rest]; }
  var lines = function (t) { return t === '' ? [] : t.replace(/\n$/, '').split('\n'); };

  var CMDS = {
    help: function () { return 'Commands: pwd, ls, cd, cat, grep, wc, sort, uniq, head, echo, touch, mkdir, cp, mv, rm, chmod, whoami, history, clear\nJoin commands with | (a pipe). Save output with > file.'; },
    pwd: function () { return st.cwd; },
    whoami: function () { return USER; },
    clear: function () { st.lines = []; return ''; },
    history: function () { return st.hist.map(function (h, i) { return (i + 1) + '  ' + h; }).join('\n'); },
    echo: function (a) { return a.join(' '); },
    ls: function (a) {
      var fr = flags(a), f = fr[0], paths = fr[1].length ? fr[1] : [''];
      if (f.a) st.usedA = 1;
      return paths.map(function (p) {
        var full = resolve(p), n = st.fs[full];
        if (!n) throw new Err('ls: ' + p + ': No such file or folder');
        var list = n.dir ? kids(full) : [full];
        if (n.dir && !can(n, 'r')) throw new Err('ls: ' + (p || '.') + ': Permission denied');
        list = list.filter(function (k) { return f.a || base(k).charAt(0) !== '.'; });
        var show = function (k) { var m = st.fs[k]; return f.l ? modeStr(m) + '  ' + (m.owner + '    ').slice(0, 5) + ' ' + ('     ' + (m.dir ? 0 : m.text.length)).slice(-5) + '  ' + base(k) + (m.dir ? '/' : '') : base(k) + (m.dir ? '/' : ''); };
        return (paths.length > 1 ? p + ':\n' : '') + list.map(show).join(f.l ? '\n' : '  ');
      }).join('\n');
    },
    cd: function (a) {
      var full = resolve(a[0] || '~'), n = st.fs[full];
      if (!n) throw new Err('cd: ' + a[0] + ': No such folder');
      if (!n.dir) throw new Err('cd: ' + a[0] + ': Not a folder');
      if (!can(n, 'x')) throw new Err('cd: ' + a[0] + ': Permission denied');
      st.cwd = full; st.cds++; return '';
    },
    cat: function (a, input) { if (!a.length) return input; return a.map(function (p) { return getFile('cat', p); }).join('\n'); },
    grep: function (a, input) {
      st.usedGrep = 1;
      var fr = flags(a), f = fr[0], r = fr[1]; if (!r.length) throw new Err('grep: what should I look for? Try grep word file');
      var pat = r[0], files = r.slice(1), test = function (line) { var hit = f.i ? line.toLowerCase().indexOf(pat.toLowerCase()) >= 0 : line.indexOf(pat) >= 0; return f.v ? !hit : hit; };
      var src = files.length ? files.map(function (p) { return [p, getFile('grep', p)]; }) : [['', input]];
      var out = [], count = 0;
      src.forEach(function (s) { lines(s[1]).forEach(function (line, i) { if (test(line)) { count++; out.push((files.length > 1 ? s[0] + ':' : '') + (f.n ? (i + 1) + ':' : '') + line); } }); });
      return f.c ? String(count) : out.join('\n');
    },
    wc: function (a, input) {
      var fr = flags(a), f = fr[0], files = fr[1], one = function (t, name) {
        var l = lines(t).length, w = (t.match(/\S+/g) || []).length, c = t.length;
        var parts = f.l || f.w || f.c ? [f.l ? l : null, f.w ? w : null, f.c ? c : null].filter(function (x) { return x !== null; }) : [l, w, c];
        return parts.join(' ') + (name ? ' ' + name : '');
      };
      return files.length ? files.map(function (p) { return one(getFile('wc', p), p); }).join('\n') : one(input, '');
    },
    sort: function (a, input) { var t = a.length ? a.map(function (p) { return getFile('sort', p); }).join('\n') : input; return lines(t).sort().join('\n'); },
    uniq: function (a, input) { var t = a.length ? getFile('uniq', a[0]) : input, out = []; lines(t).forEach(function (l) { if (out[out.length - 1] !== l) out.push(l); }); return out.join('\n'); },
    head: function (a, input) { var n = 10, r = []; for (var i = 0; i < a.length; i++) { if (a[i] === '-n') n = +a[++i]; else if (/^-\d+$/.test(a[i])) n = +a[i].slice(1); else r.push(a[i]); } var t = r.length ? getFile('head', r[0]) : input; return lines(t).slice(0, n).join('\n'); },
    touch: function (a) { a.forEach(function (p) { var full = resolve(p); if (!st.fs[full]) { writable(parent(full), 'touch'); st.fs[full] = { dir: false, text: '', owner: USER, mode: 0o644 }; } }); return ''; },
    mkdir: function (a) {
      if (!a.length) throw new Err('mkdir: which folder? Try mkdir name');
      a.forEach(function (p) { var full = resolve(p); if (st.fs[full]) throw new Err('mkdir: ' + p + ': Already exists'); if (!st.fs[parent(full)]) throw new Err('mkdir: ' + p + ': No such folder to make it in'); writable(parent(full), 'mkdir'); st.fs[full] = { dir: true, owner: USER, mode: 0o755 }; });
      return '';
    },
    cp: function (a) {
      if (a.length < 2) throw new Err('cp: copy what, to where? Try cp file newname');
      var text = getFile('cp', a[0]), to = dest(a[0], a[1], 'cp');
      st.fs[to] = { dir: false, text: text, owner: USER, mode: 0o644 }; return '';
    },
    mv: function (a) {
      if (a.length < 2) throw new Err('mv: move what, to where? Try mv file folder');
      var from = resolve(a[0]); if (!st.fs[from]) throw new Err('mv: ' + a[0] + ': No such file or folder');
      writable(parent(from), 'mv');
      var to = dest(a[0], a[1], 'mv');
      Object.keys(st.fs).filter(function (p) { return p === from || p.indexOf(from + '/') === 0; }).forEach(function (p) { st.fs[to + p.slice(from.length)] = st.fs[p]; delete st.fs[p]; });
      if (st.cwd === from || st.cwd.indexOf(from + '/') === 0) st.cwd = to + st.cwd.slice(from.length);
      return '';
    },
    rm: function (a) {
      var fr = flags(a), f = fr[0];
      if (!fr[1].length) throw new Err('rm: remove what? Try rm file');
      fr[1].forEach(function (p) {
        var full = resolve(p), n = st.fs[full];
        if (!n) throw new Err('rm: ' + p + ': No such file or folder');
        if (n.dir && !f.r) throw new Err('rm: ' + p + ': Is a folder (rm -r removes a folder and everything in it)');
        if (n.owner !== USER || !can(st.fs[parent(full)], 'w')) throw new Err('rm: ' + p + ': Permission denied');
        Object.keys(st.fs).filter(function (q) { return q === full || q.indexOf(full + '/') === 0; }).forEach(function (q) { delete st.fs[q]; });
        if (st.cwd === full || st.cwd.indexOf(full + '/') === 0) st.cwd = parent(full);
      });
      return '';
    },
    chmod: function (a) {
      if (a.length < 2) throw new Err('chmod: try chmod 600 file or chmod o-r file');
      var m = a[0], full = resolve(a[1]), n = st.fs[full];
      if (!n) throw new Err('chmod: ' + a[1] + ': No such file or folder');
      if (n.owner !== USER) throw new Err('chmod: ' + a[1] + ': Only its owner (' + n.owner + ') can change its permissions');
      if (/^[0-7]{3}$/.test(m)) { n.mode = parseInt(m, 8); return ''; }
      var mm = /^([ugoa]*)([+\-=])([rwx]+)$/.exec(m); if (!mm) throw new Err('chmod: ' + m + ': try 644, u+x, o-r or a+r');
      var who = mm[1] || 'a', bits = (mm[3].indexOf('r') >= 0 ? 4 : 0) | (mm[3].indexOf('w') >= 0 ? 2 : 0) | (mm[3].indexOf('x') >= 0 ? 1 : 0);
      [['u', 6], ['g', 3], ['o', 0]].forEach(function (w) {
        if (who.indexOf('a') < 0 && who.indexOf(w[0]) < 0) return;
        var mask = bits << w[1];
        if (mm[2] === '+') n.mode |= mask; else if (mm[2] === '-') n.mode &= ~mask; else n.mode = (n.mode & ~(7 << w[1])) | mask;
      });
      return '';
    },
    sudo: function () { throw new Err('sudo: not allowed here. Only an administrator can use sudo, and that is the point.'); },
  };
  function writable(dir, cmd) { var n = st.fs[dir]; if (n && !can(n, 'w')) throw new Err(cmd + ': ' + dir + ': Permission denied'); }
  function dest(src, d, cmd) {
    var full = resolve(d), n = st.fs[full];
    var to = n && n.dir ? (full === '/' ? '' : full) + '/' + base(resolve(src)) : full;
    if (!st.fs[parent(to)]) throw new Err(cmd + ': ' + d + ': No such folder');
    writable(parent(to), cmd);
    if (st.fs[to] && st.fs[to].owner !== USER) throw new Err(cmd + ': ' + d + ': Permission denied');
    return to;
  }

  function tokens(s) { var out = [], m, re = /"([^"]*)"|'([^']*)'|(\S+)/g; while ((m = re.exec(s))) out.push(m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3]); return out; }
  function splitPipes(line) { var parts = [], cur = '', q = ''; for (var i = 0; i < line.length; i++) { var c = line[i]; if (q) { if (c === q) q = ''; cur += c; } else if (c === '"' || c === "'") { q = c; cur += c; } else if (c === '|') { parts.push(cur); cur = ''; } else cur += c; } parts.push(cur); return parts; }

  function run(line, quiet) {
    line = line.trim(); if (!line) return;
    var shown = prompt() + line;
    st.hist.push(line); st.count++;
    var out = '', err = '', pipe = 0, redir = 0;
    try {
      var segs = splitPipes(line); pipe = segs.length > 1 ? 1 : 0;
      var last = segs[segs.length - 1], rm = /\s(>>?)\s*(\S+)\s*$/.exec(' ' + last), target = null, append = false;
      if (rm) { redir = 1; target = rm[2]; append = rm[1] === '>>'; segs[segs.length - 1] = (' ' + last).slice(0, rm.index); }
      var input = '';
      segs.forEach(function (seg) {
        var t = tokens(seg); if (!t.length) throw new Err('Nothing before or after the |');
        var name = t[0]; if (!CMDS[name]) throw new Err(name + ': command not found. Type help for the list.');
        st.used[name] = 1;
        input = String(CMDS[name](t.slice(1), input) || '');
      });
      if (target) {
        var full = resolve(target), n = st.fs[full];
        if (n && n.dir) throw new Err(target + ': Is a folder');
        if (n && !can(n, 'w')) throw new Err(target + ': Permission denied');
        if (!n) { if (!st.fs[parent(full)]) throw new Err(target + ': No such folder'); writable(parent(full), 'save'); st.fs[full] = { dir: false, text: '', owner: USER, mode: 0o644 }; }
        st.fs[full].text = append && st.fs[full].text ? st.fs[full].text + '\n' + input : input;
        input = '';
      }
      out = input;
    } catch (e) { if (e instanceof Err) err = e.m; else throw e; }
    st.last = { out: out, err: err, pipe: pipe, redir: redir };
    if (quiet) return;
    st.lines.push({ cls: 'cmd', text: shown });
    if (out) st.lines.push({ cls: '', text: out });
    if (err) st.lines.push({ cls: 'err', text: err });
    if (st.lines.length > 400) st.lines = st.lines.slice(-400);
    if (spec.find) { var f = st.fs[resolve(spec.find)]; if (f && !f.dir && f.text && (out.indexOf(lines(f.text)[0]) >= 0 || out.indexOf(lines(f.text).slice(-1)[0]) >= 0)) st.found = 1; }
  }
  var prompt = function () { return USER + '@school:' + (st.cwd === HOME ? '~' : st.cwd.indexOf(HOME + '/') === 0 ? '~' + st.cwd.slice(HOME.length) : st.cwd) + '$ '; };

  // ---------- drawing ----------
  function draw() {
    var host = B.el('board'); host.replaceChildren();
    var wrap = document.createElement('div'); wrap.className = 'shwrap' + (spec.tree0 ? ' withtree' : '');
    if (spec.tree0) {
      var tree = document.createElement('div'); tree.className = 'shtree'; tree.setAttribute('aria-label', 'Folders and files');
      var h = document.createElement('div'); h.className = 'shhead'; h.textContent = 'Folders'; tree.appendChild(h);
      var walk = function (d, depth) {
        kids(d).forEach(function (k) {
          var n = st.fs[k], nm = base(k);
          if (nm.charAt(0) === '.' && spec.tree0 !== 'all') return;
          var row = document.createElement('div'); row.className = 'shnode' + (n.dir ? ' dir' : '') + (k === st.cwd ? ' here' : '') + (nm.charAt(0) === '.' ? ' hidden' : '');
          row.style.paddingLeft = (depth * 14 + 4) + 'px'; row.textContent = (n.dir ? '▸ ' : '') + nm + (k === st.cwd ? '   ← you are here' : '');
          tree.appendChild(row);
          if (n.dir && (st.cwd === k || st.cwd.indexOf(k + '/') === 0 || depth < 2)) walk(k, depth + 1);
        });
      };
      var top = document.createElement('div'); top.className = 'shnode dir' + (st.cwd === HOME ? ' here' : ''); top.textContent = '▸ ' + HOME + (st.cwd === HOME ? '   ← you are here' : ''); tree.appendChild(top);
      walk(HOME, 1);
      wrap.appendChild(tree);
    }
    var term = document.createElement('div'); term.className = 'shterm';
    var outEl = document.createElement('div'); outEl.className = 'shout'; outEl.setAttribute('aria-live', 'polite');
    if (!st.lines.length) { var hi = document.createElement('div'); hi.className = 'shline note'; hi.textContent = 'A pretend computer. Type a command and press Enter (try help).'; outEl.appendChild(hi); }
    st.lines.forEach(function (l) { var d = document.createElement('div'); d.className = 'shline ' + l.cls; d.textContent = l.text; outEl.appendChild(d); });
    var row = document.createElement('div'); row.className = 'shrow';
    var pr = document.createElement('span'); pr.className = 'shprompt'; pr.textContent = prompt();
    var inp = document.createElement('input'); inp.type = 'text'; inp.className = 'shin'; inp.setAttribute('aria-label', 'Command'); inp.autocomplete = 'off'; inp.spellcheck = false; inp.autocapitalize = 'off';
    var hidx = st.hist.length;
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var v = inp.value; B.moved = true; run(v); draw(); report(); var ni = B.el('board').querySelector('.shin'); if (ni) ni.focus(); }
      else if (e.key === 'ArrowUp') { if (hidx > 0) { hidx--; inp.value = st.hist[hidx]; } e.preventDefault(); }
      else if (e.key === 'ArrowDown') { if (hidx < st.hist.length) { hidx++; inp.value = st.hist[hidx] || ''; } e.preventDefault(); }
      else if (e.key === 'Tab') { e.preventDefault(); complete(inp); }
    });
    row.append(pr, inp);
    term.append(outEl, row);
    term.addEventListener('click', function (e) { if (e.target === term || e.target === outEl) inp.focus(); });
    wrap.appendChild(term);
    host.appendChild(wrap);
    outEl.scrollTop = outEl.scrollHeight;
  }
  function complete(inp) {
    var v = inp.value, m = /(\S*)$/.exec(v), word = m[1], dir = word.indexOf('/') >= 0 ? word.slice(0, word.lastIndexOf('/') + 1) : '', stem = word.slice(dir.length);
    var d = resolve(dir || '.'); if (!st.fs[d] || !st.fs[d].dir) return;
    var opts = kids(d).map(base).filter(function (n) { return n.indexOf(stem) === 0 && (stem.charAt(0) === '.' || n.charAt(0) !== '.'); });
    if (opts.length === 1) inp.value = v.slice(0, v.length - word.length) + dir + opts[0] + (st.fs[d === '/' ? '/' + opts[0] : d + '/' + opts[0]].dir ? '/' : '');
  }

  function paintPanel() {
    var panel = B.el('gpanel'); panel.replaceChildren();
    ui.work = document.createElement('p'); ui.work.className = 'rulework'; ui.work.id = 'gsum'; panel.appendChild(ui.work);
    var bar = document.createElement('div'); bar.className = 'gbar bbar';
    var again = document.createElement('button'); again.type = 'button'; again.textContent = 'Start again'; again.className = 'quiet'; again.addEventListener('click', B.restart);
    bar.appendChild(again); panel.appendChild(bar);
  }

  function report() {
    var L = st.last || { out: '', err: '', pipe: 0, redir: 0 }, outLines = lines(L.out);
    var num = /^\s*-?\d+\s*$/.test(L.out) ? +L.out : (/^\s*(\d+)\s/.test(L.out) && outLines.length === 1 ? +/^\s*(\d+)/.exec(L.out)[1] : -1);
    var w = spec.watch ? st.fs[resolve(spec.watch)] : null;
    var text = 'In ' + st.cwd + '. Commands run: ' + st.count + (L.err ? '. Last command failed' : '');
    ui.work.textContent = text; B.say(st.lines.length ? (L.err || (outLines.length ? outLines.length + ' line' + (outLines.length === 1 ? '' : 's') + ' of output' : 'Done')) : 'Type a command and press Enter');
    B.save({ st: { fs: st.fs, cwd: st.cwd, hist: st.hist, lines: st.lines.slice(-120), count: st.count, used: st.used, usedA: st.usedA, usedGrep: st.usedGrep, found: st.found, cds: st.cds, read: st.read, existed: st.existed } });
    if (spec.gone && st.fs[resolve(spec.gone)]) st.existed = 1;
    B.post({ scope: { vars: {
      w: spec.at && st.cwd === resolve(spec.at) ? 1 : 0, s: st.found ? 1 : 0,
      x: spec.exists && st.fs[resolve(spec.exists)] ? 1 : 0, z: spec.gone && !st.fs[resolve(spec.gone)] && st.existed ? 1 : 0,
      m: w ? +w.mode.toString(8) : -1, k: w && (w.mode & 4) ? 1 : 0,
      o: num, l: outLines.length, u: L.pipe, e: L.err ? 1 : 0, p: L.redir, n: st.count, h: Object.keys(st.used).length,
      a: st.usedA ? 1 : 0, g: st.usedGrep ? 1 : 0, d: st.cwd.split('/').filter(Boolean).length, c: st.cds,
    }, points: {} } }, text + (L.out ? '\n' + L.out : '') + (L.err ? '\n' + L.err : ''));
  }

  B.widget('shell', {
    sections: ['board', 'gpanel'],
    label: function () { return 'A pretend Linux terminal'; },
    parse: parse,
    redraw: function () { if (spec) { draw(); report(); } },
    start: function (freshStart) {
      spec = B.spec;
      var sv = freshStart ? null : B.saved(), s0 = sv && sv.st;
      if (s0 && s0.fs && s0.cwd) st = Object.assign({ lines: [], hist: [], used: {}, read: {} }, s0);
      else {
        st = { fs: fresh(), cwd: '/', hist: [], lines: [], count: 0, used: {}, usedA: 0, usedGrep: 0, found: 0, cds: 0, read: {}, existed: 0, last: null };
        st.cwd = resolve(spec.start0);
        if (!st.fs[st.cwd] || !st.fs[st.cwd].dir) st.cwd = HOME;
        spec.run0.forEach(function (c) { run(c, true); });
        st.hist = []; st.count = 0; st.used = {}; st.usedA = 0; st.usedGrep = 0; st.cds = 0; st.last = null;
        if (spec.gone && st.fs[resolve(spec.gone)]) st.existed = 1;
      }
      paintPanel(); draw(); report();
    },
  });
})(WPB);
