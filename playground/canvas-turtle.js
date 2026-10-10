// Canvas 2D turtle renderer, no dependencies.
//
// Ported from CodeSwitch's TurtleGraphics (which draws with p5.js). Same model:
// logical 800x800 plane with (0,0) at the centre, y up, heading 0 = east and
// turning left = counter-clockwise (the Python turtle convention), animation
// driven by a 1-10 speed, and a "finish" mode that skips straight to the end.
// Differences: no p5, the turtle is drawn procedurally (no image asset), and
// fills follow Python (every move while filling adds a vertex, pen up or down).

const DEFAULT_EXTENT = 500; // CodeSwitch uses 800; pass { extent: 800 } to match it exactly
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clean = (n) => { const r = Math.round(n * 1e6) / 1e6; return Object.is(r, -0) ? 0 : r; };
const norm360 = (a) => clean(((a % 360) + 360) % 360);

export class StopError extends Error {
  constructor() { super('Stopped'); this.name = 'StopError'; }
}

export class CanvasTurtle {
  constructor(canvas, { onUpdate, extent = DEFAULT_EXTENT, shape = 'turtle' } = {}) {
    this.extent = extent;
    this.defaultShape = shape; // 'turtle' (the sprite) or 'classic' (Python's arrow); shape() changes it      // visible logical size; 500 shows about +-250 around the origin
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onUpdate = onUpdate || (() => {});
    this.speed = 5;            // 1 (slow) .. 10 (fast); 0 or > 10 = no animation
    this.dpr = window.devicePixelRatio || 1;
    this.ev = { click: null, keys: {}, timers: new Set(), queue: [], wake: null };
    this.resetAll();
    this.resize();
    // Events for onscreenclick / onkey: queued here, run by mainloop() in the Python bridge.
    canvas.addEventListener('click', (e) => {
      const r = canvas.getBoundingClientRect();
      if (this.ev.click) this.pushEvent(this.ev.click, [(e.clientX - r.left - this.w / 2) / this.scale, -(e.clientY - r.top - this.h / 2) / this.scale]);
    });
    document.addEventListener('keydown', (e) => {
      if (e.target && /^(TEXTAREA|INPUT|SELECT)$/.test(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
      const name = e.key === ' ' ? 'space' : e.key.replace(/^Arrow/, '');
      const fn = this.ev.keys[name] || this.ev.keys[name.toLowerCase()];
      if (fn) { e.preventDefault(); this.pushEvent(fn, []); }
    });
    new ResizeObserver(() => this.resize()).observe(canvas.parentElement || canvas);
  }

  // ---------- state ----------
  resetAll() {
    this.x = 0; this.y = 0; this.angle = 0;
    this.penDown = true; this.visible = true; this.shapeName = this.defaultShape || 'turtle';
    this.penColor = '#000000'; this.fillColor = '#000000'; this.penWidth = 2;
    this.bg = '#F9F9F9';
    this.segments = []; this.fills = []; this.dots = []; this.texts = [];
    this.filling = false; this.fillVertices = [];
    this.stopped = false; this.skipping = false;
    this.clearEvents();
    this.draw(); this.emit();
  }

  // ---------- events (onscreenclick, onkey, ontimer) ----------
  clearEvents() {
    if (!this.ev) return;
    this.ev.timers.forEach((t) => clearTimeout(t));
    Object.assign(this.ev, { click: null, keys: {}, timers: new Set(), queue: [], wake: null });
  }
  pushEvent(fn, args) {
    if (this.ev.queue.length < 20) this.ev.queue.push({ fn, args }); // drop a flood of key repeats
    if (this.ev.wake) this.ev.wake();
  }
  addTimer(fn, ms) {
    const id = setTimeout(() => { this.ev.timers.delete(id); this.pushEvent(fn, []); }, Math.max(0, ms));
    this.ev.timers.add(id);
  }
  get hasEvents() { return !!(this.ev.click || Object.keys(this.ev.keys).length || this.ev.timers.size || this.ev.queue.length); }

  /** Called at the start of every run: keeps the picture settings but clears flags. */
  beginRun() { this.stopped = false; this.skipping = false; }
  stop() { this.stopped = true; if (this.ev && this.ev.wake) this.ev.wake(); }
  finish() { this.skipping = true; }

  get state() {
    return { x: clean(this.x), y: clean(this.y), heading: norm360(this.angle), penDown: this.penDown, visible: this.visible,
      segments: this.segments.length, fills: this.fills.length };
  }
  emit() { this.onUpdate(this.state); }

  // ---------- geometry / drawing ----------
  resize() {
    const box = this.canvas.parentElement || this.canvas;
    const w = Math.max(50, box.clientWidth), h = Math.max(50, box.clientHeight);
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.w = w; this.h = h;
    this.scale = Math.min(w, h) / this.extent;
    this.draw();
  }
  cx(x) { return this.w / 2 + x * this.scale; }
  cy(y) { return this.h / 2 - y * this.scale; }

  draw() {
    const { ctx } = this;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.fillStyle = this.bg;
    ctx.fillRect(0, 0, this.w, this.h);

    // axes
    ctx.strokeStyle = '#c8c8c8'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.w / 2, 0); ctx.lineTo(this.w / 2, this.h);
    ctx.moveTo(0, this.h / 2); ctx.lineTo(this.w, this.h / 2);
    ctx.stroke();

    // fills first, then lines on top (as in CodeSwitch)
    for (const f of this.fills) {
      ctx.fillStyle = f.color;
      ctx.beginPath();
      f.vertices.forEach((v, i) => (i ? ctx.lineTo(this.cx(v.x), this.cy(v.y)) : ctx.moveTo(this.cx(v.x), this.cy(v.y))));
      ctx.closePath(); ctx.fill();
    }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const s of this.segments) {
      ctx.strokeStyle = s.color; ctx.lineWidth = Math.max(1, s.width * this.scale);
      ctx.beginPath(); ctx.moveTo(this.cx(s.x1), this.cy(s.y1)); ctx.lineTo(this.cx(s.x2), this.cy(s.y2)); ctx.stroke();
    }
    for (const d of this.dots) {
      ctx.fillStyle = d.color; ctx.beginPath(); ctx.arc(this.cx(d.x), this.cy(d.y), Math.max(1, d.r * this.scale), 0, Math.PI * 2); ctx.fill();
    }
    for (const t of this.texts) {
      ctx.fillStyle = t.color; ctx.font = `${Math.max(8, t.size * this.scale)}px system-ui, sans-serif`;
      ctx.fillText(t.text, this.cx(t.x), this.cy(t.y));
    }
    if (this.visible) this.drawTurtle();
  }

  drawTurtle() {
    const { ctx } = this;
    const k = Math.max(0.7, this.scale) * 1.15;
    ctx.save();
    ctx.translate(this.cx(this.x), this.cy(this.y));
    ctx.rotate(-this.angle * Math.PI / 180);
    ctx.scale(k, k);
    if (this.shapeName !== 'turtle') { // Python's "classic" arrow, tip at the turtle's position
      ctx.fillStyle = this.penColor; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-9, 5); ctx.lineTo(-7, 0); ctx.lineTo(-9, -5); ctx.closePath(); ctx.fill();
      ctx.restore(); return;
    }
    ctx.fillStyle = '#3aa655'; ctx.strokeStyle = '#14532d'; ctx.lineWidth = 1.5;
    for (const [lx, ly] of [[6, 9], [6, -9], [-6, 9], [-6, -9]]) { // legs
      ctx.beginPath(); ctx.arc(lx, ly, 3.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(-11, 0); ctx.lineTo(-17, 3); ctx.lineTo(-17, -3); ctx.closePath(); ctx.fill(); ctx.stroke(); // tail
    ctx.beginPath(); ctx.arc(14, 0, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();                                          // head
    ctx.fillStyle = '#2f8a48';
    ctx.beginPath(); ctx.ellipse(0, 0, 13, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();                              // shell
    ctx.strokeStyle = '#14532d'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(6, 0); ctx.moveTo(0, -6); ctx.lineTo(0, 6); ctx.stroke();
    ctx.restore();
  }

  // ---------- animation core ----------
  get instant() { return this.skipping || this.speed === 0 || this.speed > 10; }
  delay() { return this.instant ? 0 : Math.max(0, 1000 - this.speed * 100); }
  framesFor(value) {
    if (this.instant) return 1;
    const delay = this.delay();
    if (delay === 0) return 3;                       // top speed: a few frames so motion is still visible
    const share = 0.4 + Math.min(0.6, Math.abs(value) / 100); // short moves need fewer frames
    return Math.max(2, Math.min(40, Math.round((delay / 25) * share)));
  }
  check() { if (this.stopped) throw new StopError(); }

  /** Run `apply(progress)` from 0 to 1, honouring speed, finish and stop. */
  async animate(value, apply, { frames, delay } = {}) {
    this.check();
    if (this.instant) { apply(1); this.draw(); this.emit(); return; }
    const n = frames ?? this.framesFor(value);
    const per = (delay ?? this.delay()) / n;
    for (let i = 1; i <= n; i++) {
      if (this.instant) { apply(1); break; }  // "finish" pressed mid-command
      this.check();
      apply(i / n); this.draw(); this.emit();
      await sleep(per);
    }
    this.draw(); this.emit();
  }

  // ---------- movement ----------
  async move(distance, opts) {
    const sx = this.x, sy = this.y, a = this.angle * Math.PI / 180;
    const ex = sx + distance * Math.cos(a), ey = sy + distance * Math.sin(a);
    await this.travel(ex, ey, opts);
  }

  async travel(ex, ey, opts) {
    const sx = this.x, sy = this.y;
    const seg = this.penDown ? { x1: sx, y1: sy, x2: sx, y2: sy, color: this.penColor, width: this.penWidth } : null;
    if (seg) this.segments.push(seg);
    const dist = Math.hypot(ex - sx, ey - sy);
    await this.animate(dist, (p) => {
      this.x = sx + (ex - sx) * p; this.y = sy + (ey - sy) * p;
      if (seg) { seg.x2 = this.x; seg.y2 = this.y; }
    }, opts);
    this.x = ex; this.y = ey;
    if (seg) { seg.x2 = ex; seg.y2 = ey; }
    if (this.filling) this.fillVertices.push({ x: ex, y: ey });
  }

  forward(d) { return this.move(d); }
  backward(d) { return this.move(-d); }
  goto(x, y) { return this.travel(x, y); }

  async turn(degrees, opts) { // positive = counter-clockwise (left)
    const start = this.angle;
    await this.animate(Math.abs(degrees), (p) => { this.angle = start + degrees * p; }, opts);
    this.angle = norm360(start + degrees);
  }
  left(d) { return this.turn(d); }
  right(d) { return this.turn(-d); }

  async setheading(target) {
    let diff = target - this.angle;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    await this.turn(diff);
    this.angle = norm360(target);
    this.emit();
  }

  async home() { await this.goto(0, 0); await this.setheading(0); }

  /** Python's circle(radius, extent): an N-gon approximation, drawn as one timed command. */
  async circle(radius, extent = 360) {
    const frac = Math.abs(extent) / 360;
    const steps = 1 + Math.floor(Math.min(11 + Math.abs(radius) / 6, 59) * frac);
    let w = extent / steps, w2 = w / 2;
    let l = 2 * radius * Math.sin(w2 * Math.PI / 180);
    if (radius < 0) { l = -l; w = -w; w2 = -w2; } // same sign handling as CPython's turtle.circle
    const opts = { frames: 1, delay: this.delay() / steps };
    await this.turn(w2, opts);
    for (let i = 0; i < steps; i++) { await this.move(l, opts); await this.turn(w, opts); }
    await this.turn(-w2, opts);
    this.angle = norm360(this.angle);
    this.emit();
  }

  // ---------- pen / colours / fill ----------
  penup() { this.penDown = false; this.emit(); }
  pendown() { this.penDown = true; this.emit(); }
  setPenColor(c) { this.penColor = c; }
  setFillColor(c) { this.fillColor = c; }
  setPenWidth(w) { this.penWidth = w; }
  setBackground(c) { this.bg = c; this.draw(); }
  hide() { this.visible = false; this.draw(); this.emit(); }
  show() { this.visible = true; this.draw(); this.emit(); }
  beginFill() { this.filling = true; this.fillVertices = [{ x: this.x, y: this.y }]; }
  endFill() {
    if (this.filling && this.fillVertices.length >= 3) this.fills.push({ vertices: [...this.fillVertices], color: this.fillColor });
    this.filling = false; this.fillVertices = [];
    this.draw(); this.emit();
  }
  dot(size = 10, color) { this.dots.push({ x: this.x, y: this.y, r: size / 2, color: color || this.penColor }); this.draw(); }
  write(text, size = 14) { this.texts.push({ x: this.x, y: this.y, text: String(text), color: this.penColor, size }); this.draw(); }
  clear() { this.segments = []; this.fills = []; this.dots = []; this.texts = []; this.draw(); this.emit(); }
  reset() { const bg = '#F9F9F9'; this.resetAll(); this.bg = bg; this.draw(); }
}
