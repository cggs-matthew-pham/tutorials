---
marp: true
theme: default
html: true
---

# Style by class names

Pages with Bootstrap · Ready-made parts

<!-- Speaker note: Students link Bootstrap's stylesheet, predict that a class name with no rule of their own still styles a button, match classes to what they do, find a button missing its base class, and style a notice for an event of their own. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Bootstrap 5.3: Buttons, https://getbootstrap.com/docs/5.3/components/buttons/ (checked 12 October 2026). -->

---

## Today

**We are learning to** link Bootstrap's stylesheet, then style buttons, text and messages by adding its class names instead of writing CSS.

- I can link Bootstrap's stylesheet to a page.
- I can style buttons, text and messages by adding Bootstrap's class names.
- I can look up a class name instead of writing a CSS rule.

<!-- Speaker note: Before class: Read the unit primer first. **Bootstrap** is a stylesheet: one big CSS file of ready-made rules (about 230 KB). Linking it with `<link rel="stylesheet" href="bootstrap.min.css">` gives the page all its rules; adding a class name such as `btn` switches one on. Nothing new happens in the browser: students already know classes and CSS rules from HTML & CSS; the rules are just someone else's. Most looks come in two parts, a base class for the shape (`btn`, `alert`) and a second for the colour or size (`btn-primary`, `btn-lg`). The planted bug leaves out the base class. Here the stylesheet sits beside the page (it is served from this site); on a real site, download it from getbootstrap.com. This course uses Bootstrap's CSS only, not its JavaScript, so nothing needs a script. -->

---

## Why it matters

> Thousands of school, club and company websites use Bootstrap, so their buttons and forms look tidy on phones and computers without much CSS of their own.

<!-- Speaker note: You built every part of the club page with your own CSS. **Bootstrap** is a big stylesheet that someone else wrote, full of ready-made rules. You link it with one line, then style a tag by adding its **class names**: ```html <link rel="stylesheet" href="bootstrap.min.css"> <button class="btn btn-primary">Join</button> ``` `bootstrap.min.css` sits beside the page here. On your own site, you download it from getbootstrap.com and put it beside your page. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<link rel="stylesheet" href="bootstrap.min.css">

<button class="btn btn-primary">Join</button>
<button>Join</button>
```

**There is no CSS rule for btn anywhere in this code. How will the two buttons look?**

- Both are blue Bootstrap buttons
- Both are plain browser buttons: nobody wrote a rule for btn
- The first is a blue Bootstrap button, the second a plain browser button
- The first one does not show

<!-- Speaker note: What happens: The first is a blue Bootstrap button. The rules for btn and btn-primary are in bootstrap.min.css, which the first line links. The second button has no class, so it keeps the browser's look. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what a class name does when nobody has written a rule for it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cp+class%3D%22lead%22%3EChess+every+Wednesday+at+lunch+in+the+library.%3C%2Fp%3E%0A++%3Cdiv+class%3D%22alert+alert-warning%22%3ESign-ups+close+on+Friday.%3C%2Fdiv%3E%0A++%3Cbutton+class%3D%22btn+btn-primary%22%3EJoin%3C%2Fbutton%3E%0A++%3Cbutton+class%3D%22btn+btn-outline-secondary%22%3ERead+more%3C%2Fbutton%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-classes/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. Then delete the `<link>` line and watch everything go plain, though every class name is still there. Put it back. Students should be able to say: I can point to the class name that makes each part of the page look the way it does. -->

<!-- Speaker note: Teacher: have everyone delete the link line and watch the page go plain. The class names are still there. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The first is a blue Bootstrap button. The rules for btn and btn-primary are in bootstrap.min.css, which the first line links. The second button has no class, so it keeps the browser's look.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <h1>Chess club</h1>
  <p class="lead">Chess every Wednesday at lunch in the library.</p>
  <div class="alert alert-warning">Sign-ups close on Friday.</div>
  <button class="btn btn-primary">Join</button>
  <button class="btn btn-outline-secondary">Read more</button>
</div>
```

<!-- Speaker note: What this step is for: A Bootstrap look comes from a base class (btn, alert) plus a class that picks the colour or size; the names are fixed, so you look them up. -->

<!-- Speaker note: Teacher: for the bug, ask which class gives the shape and which gives the colour. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which class does what?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <h1>Chess club</h1>
  <p class="lead">Chess every Wednesday at lunch in the library.</p>
  <div class="alert alert-warning">Sign-ups close on Friday.</div>
  <button class="btn btn-primary">Join</button>
  <button class="btn btn-outline-secondary">Read more</button>
</div>
```

</div>
<div>

**Match each class name with what it does.**

| | |
|---|---|
| `container` | A. a larger paragraph for the opening line |
| `mt-3` | B. a yellow message box |
| `lead` | C. a space above (margin top, size 3) |
| `alert alert-warning` | D. the button's colour: blue |
| `btn` | E. the button shape: padding, rounded corners, no border |
| `btn-primary` | F. a centred column with space at the sides |

* Answer: container → F. a centred column with space at the sides; mt-3 → C. a space above (margin top, size 3); lead → A. a larger paragraph for the opening line; alert alert-warning → B. a yellow message box; btn → E. the button shape: padding, rounded corners, no border; btn-primary → D. the button's colour: blue

</div>
</div>

<!-- Speaker note: Most Bootstrap looks come in two parts: a base class for the shape (btn, alert) and a second class for the colour (btn-primary, alert-warning). -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## No link

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <h1>Chess club</h1>
  <p class="lead">Chess every Wednesday at lunch in the library.</p>
  <div class="alert alert-warning">Sign-ups close on Friday.</div>
  <button class="btn btn-primary">Join</button>
  <button class="btn btn-outline-secondary">Read more</button>
</div>
```

</div>
<div>

**You delete the &lt;link&gt; line. What happens to class="btn btn-primary"?**

- It stays in the code but does nothing, so the button looks plain
- The button disappears
- The browser shows an error
- The button stays blue, because the class is still there

* Answer: It stays in the code but does nothing, so the button looks plain

</div>
</div>

<!-- Speaker note: A class name is only a label. It looks like something only when a stylesheet has a rule for it, and the rules are in bootstrap.min.css. -->

<style scoped>section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Join should be a blue Bootstrap button, but it looks like a plain browser button. There is no error. Click the line that is wrong.**

```
 1  <link rel="stylesheet" href="bootstrap.min.css">
 2  
 3  <div class="container mt-3">
 4    <h1>Chess club</h1>
 5    <button class="btn-primary">Join</button>
 6    <button class="btn btn-outline-secondary">Read more</button>
 7  </div>
```

* Answer: line 5

<!-- Speaker note: btn-primary only picks the colour. The shape and the colour itself come with btn, so the button needs class="btn btn-primary". -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Look the names up in the **Reference** drawer: Bootstrap's class names are fixed, so nobody remembers them all.

- **Green and large:** Choose different classes.
- **A red alert:** Same base class, new colour.

<!-- Speaker note: What this step is for: Changing a look is choosing a different class name from the set, not writing a new rule. Hints, in order: Bootstrap names its colours: primary, secondary, success, danger, warning, info. / Swap btn-primary for btn-success, and add btn-lg for a large button. Keep btn. / There is already a yellow alert. A red one has the same base class with a different colour class. / A div with class="alert alert-danger" under the heading. For students who need more support: Give the class names on the board for the Make task and ask students only to place them. For early finishers: Use btn-sm and btn-lg, outline buttons (btn-outline-danger), and the text colour classes (text-success). Try a badge: span class="badge text-bg-secondary". The hard part, on purpose: Students want to write CSS to fix a look. Ask "which Bootstrap class does that?" and send them to the Reference drawer before they type a rule. When students get stuck: Nothing looks like Bootstrap. Ask: Is the link line there, at the top, spelt bootstrap.min.css? Fix: Put the link line first, exactly as in the lesson. / A button keeps the browser's grey look. Ask: Does its class have btn as well as a colour? Fix: class="btn btn-success": the base class and the colour. / A class does nothing, such as btn-green. Ask: Is that name in Bootstrap's list? Fix: Use the names on the Reference cards (success is green); made-up names are ignored. -->

<!-- Speaker note: Teacher: point students to the Reference drawer; looking names up is the skill, not remembering them. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cp+class%3D%22lead%22%3EChess+every+Wednesday+at+lunch+in+the+library.%3C%2Fp%3E%0A++%3Cdiv+class%3D%22alert+alert-warning%22%3ESign-ups+close+on+Friday.%3C%2Fdiv%3E%0A++%3Cbutton+class%3D%22btn+btn-primary%22%3EJoin%3C%2Fbutton%3E%0A++%3Cbutton+class%3D%22btn+btn-outline-secondary%22%3ERead+more%3C%2Fbutton%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-classes/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a notice for your own event

A concert, a bake sale, a match: use a **container**, a **lead** paragraph, an **alert** and two **buttons** in different colours. No `<style>` block: Bootstrap's classes only.

<!-- Speaker note: What this step is for: Goals only: a whole page styled by class names, with no CSS of its own. -->

<!-- Speaker note: Teacher: no style block allowed. Ask each student to read out the class for each part. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: a notice for your own event

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%0A%3C%21--+A+notice+for+an+event+of+your+own.+Use+Bootstrap%27s+classes+only%3A%0A+++++a+container%2C+a+lead+paragraph%2C+an+alert+and+two+buttons.+--%3E%0A%3Ch1%3EMy+event%3C%2Fh1%3E%0A%3Cp%3EWhat+it+is%2C+when+and+where.%3C%2Fp%3E%0A%3Cbutton%3ESign+up%3C%2Fbutton%3E%0A%3Cbutton%3EMore%3C%2Fbutton%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-classes/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Next: the club page's **navbar, cards and grid**, rebuilt with Bootstrap.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does class="btn btn-primary" make a blue button when you wrote no CSS?**

* The linked stylesheet, bootstrap.min.css, has rules for btn and btn-primary; the class names switch them on.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the navbar, cards and grid, where Bootstrap parts are whole shapes of nested tags. Class idea: put the hand-built club page and this page side by side and count the lines of CSS. -->
