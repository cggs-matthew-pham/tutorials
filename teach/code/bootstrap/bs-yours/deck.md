---
marp: true
theme: default
html: true
---

# Make Bootstrap yours

Pages with Bootstrap · Ready-made parts

<!-- Speaker note: Students put their own CSS after the Bootstrap link, predict that their later rule wins, sort jobs into Bootstrap or hand-built CSS, find a style block in the wrong place, meet Bulma, Tailwind, daisyUI and Pico, and give a Bootstrap club page a look of its own. About 55 minutes (Predict and Run 10 min · Investigate 10 min · Other frameworks 10 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Bootstrap 5.3: Utilities and !important, https://getbootstrap.com/docs/5.3/utilities/api/#importance (checked 12 October 2026); Tailwind CSS: Play CDN (the browser build), https://tailwindcss.com/docs/installation/play-cdn (checked 12 October 2026); daisyUI: install with the CDN, https://daisyui.com/docs/cdn/ (checked 12 October 2026); Bulma: Button, https://bulma.io/documentation/elements/button/ (checked 12 October 2026); Pico CSS: Class-less version, https://picocss.com/docs/classless (checked 12 October 2026). -->

---

## Today

**We are learning to** put your own CSS after the Bootstrap link so your rules win, compare Bootstrap with the page you built by hand, and meet the other ways of styling: Bulma, Tailwind, daisyUI and Pico.

- I can change Bootstrap's look with my own rules after the link.
- I can explain when Bootstrap suits a page better than my own CSS, and when it does not.
- I can tell component classes (Bootstrap, Bulma) from utility classes (Tailwind).

<!-- Speaker note: Before class: Read the unit primer first. The rule students need is the cascade they met in HTML & CSS: when two rules match a tag equally (same kind of selector), **the later one wins**. So the Bootstrap link goes first and the student's `<style>` block after it. The planted bug puts the style block first, and Bootstrap's `h1` rule then wins. Two catches you may meet. Bootstrap's spacing and colour **utility classes** (`bg-body-tertiary`, `mt-3`, `text-center`) are marked important and beat ordinary rules wherever they are, so the run page takes `bg-body-tertiary` off the navbar before giving it a colour. And a button's hover colour is a separate, stronger rule (`.btn:hover`), so restyling buttons is fiddly; the tasks avoid it on purpose. **Other frameworks.** Bootstrap is one of many. Bulma works the same way with different names (`button is-primary`). **Tailwind**, very popular for new projects, has no ready-made parts: each class sets one CSS property (`bg-blue-600`, `px-4`), and a build tool writes CSS for just the classes a site uses. Here a browser version of Tailwind (`tailwind.js`) does that as the page loads; Tailwind's makers say it is for trying things, not real sites. **daisyUI** adds Bootstrap-style names (`btn btn-primary`) on top of Tailwind. **Pico** is classless: it styles plain tags, so a page needs no class names at all. Every one of them is served from this site. Teacher: Other frameworks: ask what Tailwind would need for a whole card (many classes) and why some people prefer that (everything is in the HTML). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Big sites often start from a framework, then add their own colours and fonts so they don't look like everyone else.

<!-- Speaker note: A Bootstrap page looks like every other Bootstrap page until you add rules of your own. When your rule and Bootstrap's match the same tag equally, **the later one wins**. So the order is: ```html <link rel="stylesheet" href="bootstrap.min.css"> <!-- Bootstrap first - -> <style> .card { border: 2px solid teal; } /* then yours */ </style> ``` -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<link rel="stylesheet" href="bootstrap.min.css">
<style>
  .card { border-color: teal; }
</style>

<div class="card m-3">
  <div class="card-body">Beginners</div>
</div>
```

**Bootstrap gives every card a thin grey border. What border will this card have?**

- Both, one inside the other
- No border at all
- Teal
- Grey: Bootstrap's rules always win

<!-- Speaker note: What happens: Teal. Both rules match the card, and yours comes after the link, so it wins. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask "which rule comes later?" before anyone answers. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%3Cstyle%3E%0A++body+%7B+font-family%3A+Georgia%2C+serif%3B+%7D%0A++.navbar+%7B+background-color%3A+lightblue%3B+%7D%0A++.card+%7B+border%3A+2px+solid+teal%3B+%7D%0A++.card-title+%7B+color%3A+teal%3B+%7D%0A%3C%2Fstyle%3E%0A%0A%3Cnav+class%3D%22navbar+navbar-expand%22%3E%0A++%3Cdiv+class%3D%22container%22%3E%0A++++%3Ca+class%3D%22navbar-brand%22+href%3D%22%23%22%3EChess+club%3C%2Fa%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fnav%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22%3E%0A++%3Cdiv+class%3D%22row%22%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EBeginners%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3ELearn+the+moves.%3C%2Fp%3E%0A++++++++++%3Ca+class%3D%22btn+btn-primary%22+href%3D%22%23%22%3EJoin%3C%2Fa%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EPlayers%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3EWeekly+games.%3C%2Fp%3E%0A++++++++++%3Ca+class%3D%22btn+btn-primary%22+href%3D%22%23%22%3EJoin%3C%2Fa%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-yours/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. Then move the whole `<style>` block above the `<link>` line and watch what changes. Put it back. Students should be able to say: I can say which parts of the page come from Bootstrap and which from my own rules. -->

<!-- Speaker note: Teacher: everyone moves the style block above the link, sees it lose, and moves it back. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Teal. Both rules match the card, and yours comes after the link, so it wins.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 37 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-yours/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Order decides between equal rules; and Bootstrap and hand-built CSS each suit some pages better. -->

<!-- Speaker note: Teacher: the sort has no single right answer in real life; ask for a reason for each. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Bootstrap or by hand?

**Which way of making the page suits each job better?**

Groups: Bootstrap · Your own CSS

A tidy sign-up page in ten minutes · Buttons, cards and forms that all match · A page that works well on a phone without extra work · A page that does not look like every other site · Knowing what every rule on your page does · A tiny page with one heading (no 230 KB file to load)

* Answer: A tidy sign-up page in ten minutes → Bootstrap; Buttons, cards and forms that all match → Bootstrap; A page that works well on a phone without extra work → Bootstrap; A page that does not look like every other site → Your own CSS; Knowing what every rule on your page does → Your own CSS; A tiny page with one heading (no 230 KB file to load) → Your own CSS

<!-- Speaker note: Neither is better everywhere. Bootstrap is quick and consistent; your own CSS is lighter and looks like nobody else's. Many sites use both: Bootstrap for the parts, their own rules for the look. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The heading should be teal, but it is black. There is no error. Click the line that is in the wrong place.**

```
 1  <style>
 2    h1 { color: teal; }
 3  </style>
 4  <link rel="stylesheet" href="bootstrap.min.css">
 5  
 6  <div class="container mt-3">
 7    <h1>Chess club</h1>
 8    <p>Chess every Wednesday at lunch.</p>
 9  </div>
```

* Answer: line 4

<!-- Speaker note: Bootstrap's rule for h1 comes after yours, so it wins. Move the link line to the top, above the style block. -->

<style scoped>pre, marp-pre { font-size: 0.65em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Bulma

Same idea, new names.

```html
<link rel="stylesheet" href="bulma.min.css">
<button class="button is-primary">Join</button>
```

**Bulma's button is class="button is-primary". How is it like Bootstrap's btn btn-primary?**

- It uses one class per CSS property
- It needs a style block
- It has no classes
- A base class for the shape and a second class for the colour

* Answer: A base class for the shape and a second class for the colour

<!-- Speaker note: Bulma works the same way as Bootstrap with different names: button for the shape, is-primary for the colour. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Tailwind

One class, one property.

```html
<script src="tailwind.js"></script>
<button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Join</button>
```

**Tailwind has no ready-made button. Match each of its classes with the one CSS property it sets.**

| | |
|---|---|
| `bg-blue-600` | A. border-radius |
| `text-white` | B. color: white |
| `px-4` | C. background-color: a blue |
| `py-2` | D. padding left and right |
| `rounded-lg` | E. padding top and bottom |

* Answer: bg-blue-600 → C. background-color: a blue; text-white → B. color: white; px-4 → D. padding left and right; py-2 → E. padding top and bottom; rounded-lg → A. border-radius

<!-- Speaker note: Tailwind's classes are utilities: each one is a single CSS property. You build the button's look from them, right in the HTML. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Sort them

daisyUI (in the picture) puts whole-part names on top of Tailwind. Pico needs no class at all.

```html
<link rel="stylesheet" href="daisyui.css">
<script src="tailwind.js"></script>
<button class="btn btn-primary">Join</button>
```

```html
<link rel="stylesheet" href="pico.classless.min.css">
<button>Join</button>
```

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sort them

**Sort the frameworks by how they style a button.**

Groups: A class for the whole button · A class for each property · No classes: plain tags are styled

Bootstrap: btn btn-primary · Bulma: button is-primary · daisyUI: btn btn-primary (on top of Tailwind) · Tailwind: bg-blue-600 text-white px-4 py-2 · Pico: just &lt;button&gt;

* Answer: Bootstrap: btn btn-primary → A class for the whole button; Bulma: button is-primary → A class for the whole button; daisyUI: btn btn-primary (on top of Tailwind) → A class for the whole button; Tailwind: bg-blue-600 text-white px-4 py-2 → A class for each property; Pico: just &lt;button&gt; → No classes: plain tags are styled

<!-- Speaker note: daisyUI adds Bootstrap-style names on top of Tailwind; Pico styles plain tags, so the page has no classes at all. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **The club's name:** A rule for one more class.
- **Square corners:** Change one of Bootstrap's choices.
- **Try Bulma:** Its own class names.

<!-- Speaker note: What this step is for: Own rules change one thing each; swapping the link line swaps the whole framework, and the class names with it. Hints, in order: The club's name has the class navbar-brand. A rule for that class, in your style block. / .navbar-brand { color: white; font-weight: bold; } after the other rules. / Bootstrap rounds a card's corners with border-radius. Your .card rule can set it again. / Add border-radius: 0; to the .card rule. / Bulma's colour classes start with is-: is-primary, is-success, is-danger. Sizes too. / class="button is-success is-large" For students who need more support: Give students three rules on the board (a font, a navbar colour, a border) and ask them only to place and change them. For early finishers: Rebuild one club card in Tailwind using only utility classes, then in daisyUI with card and card-body. Which took fewer classes? Which would be easier to change across a whole site? The hard part, on purpose: When a rule does nothing, students add more rules. Ask "which rule is winning, and why?" and have them check the order before writing anything new. When students get stuck: A rule of their own does nothing. Ask: Is the style block after the link? Fix: Move the link line to the top. / The navbar colour will not change. Ask: Does the navbar have a bg- class? Fix: Take the bg- class off; Bootstrap's utility classes beat ordinary rules. / A button changes colour but goes back to blue when the mouse is over it. Ask: Which rule styles a button under the mouse? Fix: That is .btn:hover; use a Bootstrap colour class instead (btn-success), or leave buttons alone. / Tailwind classes do nothing. Ask: Is the tailwind.js script on the page? Fix: Add script src="tailwind.js"; without it there is no Tailwind CSS at all. -->

<!-- Speaker note: Teacher: the Bulma task swaps the whole framework; ask what changed apart from the link (every class name). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%3Cstyle%3E%0A++body+%7B+font-family%3A+Georgia%2C+serif%3B+%7D%0A++.navbar+%7B+background-color%3A+lightblue%3B+%7D%0A++.card+%7B+border%3A+2px+solid+teal%3B+%7D%0A++.card-title+%7B+color%3A+teal%3B+%7D%0A%3C%2Fstyle%3E%0A%0A%3Cnav+class%3D%22navbar+navbar-expand%22%3E%0A++%3Cdiv+class%3D%22container%22%3E%0A++++%3Ca+class%3D%22navbar-brand%22+href%3D%22%23%22%3EChess+club%3C%2Fa%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fnav%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22%3E%0A++%3Cdiv+class%3D%22row%22%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EBeginners%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3ELearn+the+moves.%3C%2Fp%3E%0A++++++++++%3Ca+class%3D%22btn+btn-primary%22+href%3D%22%23%22%3EJoin%3C%2Fa%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EPlayers%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3EWeekly+games.%3C%2Fp%3E%0A++++++++++%3Ca+class%3D%22btn+btn-primary%22+href%3D%22%23%22%3EJoin%3C%2Fa%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-yours/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own look

Make the page look like **your** club: at least three rules of your own, after the link (colours, a font, borders, the navbar). Keep Bootstrap's parts and grid. Finished early? Rebuild one card in Bulma or Tailwind.

<!-- Speaker note: What this step is for: Goals only: Bootstrap's parts with a look that belongs to the student's club. -->

<!-- Speaker note: Teacher: ask each student to point to their three rules and say what each changed. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: your own look

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%3C%21--+Your+own+style+block+goes+here%2C+after+the+link.+--%3E%0A%0A%3Cnav+class%3D%22navbar+navbar-expand+bg-body-tertiary%22%3E%0A++%3Cdiv+class%3D%22container%22%3E%0A++++%3Ca+class%3D%22navbar-brand%22+href%3D%22%23%22%3EMy+club%3C%2Fa%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fnav%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22%3E%0A++%3Cdiv+class%3D%22row%22%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EFirst+group%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3EWhat+it+does.%3C%2Fp%3E%0A++++++++++%3Ca+class%3D%22btn+btn-primary%22+href%3D%22%23%22%3EJoin%3C%2Fa%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3ESecond+group%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3EWhat+it+does.%3C%2Fp%3E%0A++++++++++%3Ca+class%3D%22btn+btn-primary%22+href%3D%22%23%22%3EJoin%3C%2Fa%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-yours/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

You can now build pages from ready-made parts and make them your own. The **DOM** course makes pages react; **Vue** then does for JavaScript what Bootstrap does for CSS.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Your rule .card { border-color: teal; } does nothing. What is the first thing to check?**

* Whether the style block comes after the Bootstrap link; when two rules match equally, the later one wins.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This is the end of the Bootstrap course. The DOM course makes pages react; Vue does for JavaScript what Bootstrap does for CSS, ready-made ways to build an app. Class discussion: a framework saves time and makes sites look alike; which matters more for a club page, and for a company? -->
