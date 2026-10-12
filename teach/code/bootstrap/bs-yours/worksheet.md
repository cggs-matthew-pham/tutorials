---
title: "Make Bootstrap yours"
subtitle: "Pages with Bootstrap · Ready-made parts · Lesson 3"
---

# Make Bootstrap yours

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Big sites often start from a framework, then add their own colours and fonts so they don't look like everyone else.


:::teacher-note

**In one sentence:** Students put their own CSS after the Bootstrap link, predict that their later rule wins, sort jobs into Bootstrap or hand-built CSS, find a style block in the wrong place, meet Bulma, Tailwind, daisyUI and Pico, and give a Bootstrap club page a look of its own.

**Students should be able to say:** I can change Bootstrap's look with my own rules after the link. I can explain when Bootstrap suits a page better than my own CSS, and when it does not. I can tell component classes (Bootstrap, Bulma) from utility classes (Tailwind).

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Both rules are for `.card`. Which one comes later?

```html
<link rel="stylesheet" href="bootstrap.min.css">
<style>
  .card { border-color: teal; }
</style>

<div class="card m-3">
  <div class="card-body">Beginners</div>
</div>
```

:::keep-together

**Bootstrap gives every card a thin grey border. What border will this card have?**

☐ Both, one inside the other

☐ No border at all

☐ Teal

☐ Grey: Bootstrap's rules always win

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Teal. Both rules match the card, and yours comes after the link, so it wins.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<link rel="stylesheet" href="bootstrap.min.css">
<style>
  body { font-family: Georgia, serif; }
  .navbar { background-color: lightblue; }
  .card { border: 2px solid teal; }
  .card-title { color: teal; }
</style>

<nav class="navbar navbar-expand">
  <div class="container">
    <a class="navbar-brand" href="#">Chess club</a>
  </div>
</nav>

<div class="container mt-3">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Beginners</h5>
          <p class="card-text">Learn the moves.</p>
          <a class="btn btn-primary" href="#">Join</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Players</h5>
          <p class="card-text">Weekly games.</p>
          <a class="btn btn-primary" href="#">Join</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

:::keep-together

### Bootstrap or by hand?

**Which way of making the page suits each job better?**

Groups: Bootstrap, Your own CSS

- A tidy sign-up page in ten minutes: {{field-15}}
- Buttons, cards and forms that all match: {{field-15}}
- A page that works well on a phone without extra work: {{field-15}}
- A page that does not look like every other site: {{field-15}}
- Knowing what every rule on your page does: {{field-15}}
- A tiny page with one heading (no 230 KB file to load): {{field-15}}

:::


:::teacher-note

**Answer:** A tidy sign-up page in ten minutes → Bootstrap; Buttons, cards and forms that all match → Bootstrap; A page that works well on a phone without extra work → Bootstrap; A page that does not look like every other site → Your own CSS; Knowing what every rule on your page does → Your own CSS; A tiny page with one heading (no 230 KB file to load) → Your own CSS

Neither is better everywhere. Bootstrap is quick and consistent; your own CSS is lighter and looks like nobody else's. Many sites use both: Bootstrap for the parts, their own rules for the look.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Bootstrap's rule for h1 comes after yours, so it wins. Move the link line to the top, above the style block.

:::


## Other frameworks

The same **Join** button in other frameworks. Each page links a different stylesheet; Tailwind uses a script that writes the CSS for the classes the page uses (here, its version for trying things out).

:::keep-together

### Bulma

Same idea, new names.

```html
<link rel="stylesheet" href="bulma.min.css">
<button class="button is-primary">Join</button>
```

**Bulma's button is class="button is-primary". How is it like Bootstrap's btn btn-primary?**

☐ It uses one class per CSS property

☐ It needs a style block

☐ It has no classes

☐ A base class for the shape and a second class for the colour

:::


:::teacher-note

**Answer:** A base class for the shape and a second class for the colour

Bulma works the same way as Bootstrap with different names: button for the shape, is-primary for the colour.

:::


:::keep-together

### Tailwind

One class, one property.

```html
<script src="tailwind.js"></script>
<button class="bg-blue-600 text-white px-4 py-2 rounded-lg">Join</button>
```

**Tailwind has no ready-made button. Match each of its classes with the one CSS property it sets.**

A. border-radius

B. color: white

C. background-color: a blue

D. padding left and right

E. padding top and bottom

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `bg-blue-600` | |
| `text-white` | |
| `px-4` | |
| `py-2` | |
| `rounded-lg` | |

:::


:::teacher-note

**Answer:** bg-blue-600 → C. background-color: a blue; text-white → B. color: white; px-4 → D. padding left and right; py-2 → E. padding top and bottom; rounded-lg → A. border-radius

Tailwind's classes are utilities: each one is a single CSS property. You build the button's look from them, right in the HTML.

:::


:::keep-together

### Sort them

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

**Sort the frameworks by how they style a button.**

Groups: A class for the whole button, A class for each property, No classes: plain tags are styled

- Bootstrap: btn btn-primary: {{field-15}}
- Bulma: button is-primary: {{field-15}}
- daisyUI: btn btn-primary (on top of Tailwind): {{field-15}}
- Tailwind: bg-blue-600 text-white px-4 py-2: {{field-15}}
- Pico: just &lt;button&gt;: {{field-15}}

:::


:::teacher-note

**Answer:** Bootstrap: btn btn-primary → A class for the whole button; Bulma: button is-primary → A class for the whole button; daisyUI: btn btn-primary (on top of Tailwind) → A class for the whole button; Tailwind: bg-blue-600 text-white px-4 py-2 → A class for each property; Pico: just &lt;button&gt; → No classes: plain tags are styled

daisyUI adds Bootstrap-style names on top of Tailwind; Pico styles plain tags, so the page has no classes at all.

:::


:::typical

## Modify


**The club's name.** A rule for one more class.

**Square corners.** Change one of Bootstrap's choices.

**Try Bulma.** Its own class names.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**The club's name:**

```html
<link rel="stylesheet" href="bootstrap.min.css">
<style>
  body { font-family: Georgia, serif; }
  .navbar { background-color: lightblue; }
  .navbar-brand { color: white; font-weight: bold; }
  .card { border: 2px solid teal; }
  .card-title { color: teal; }
</style>

<nav class="navbar navbar-expand">
  <div class="container">
    <a class="navbar-brand" href="#">Chess club</a>
  </div>
</nav>

<div class="container mt-3">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Beginners</h5>
          <p class="card-text">Learn the moves.</p>
          <a class="btn btn-primary" href="#">Join</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Players</h5>
          <p class="card-text">Weekly games.</p>
          <a class="btn btn-primary" href="#">Join</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Square corners:**

```html
<link rel="stylesheet" href="bootstrap.min.css">
<style>
  body { font-family: Georgia, serif; }
  .navbar { background-color: lightblue; }
  .card { border: 2px solid teal; border-radius: 0; }
  .card-title { color: teal; }
</style>

<nav class="navbar navbar-expand">
  <div class="container">
    <a class="navbar-brand" href="#">Chess club</a>
  </div>
</nav>

<div class="container mt-3">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Beginners</h5>
          <p class="card-text">Learn the moves.</p>
          <a class="btn btn-primary" href="#">Join</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Players</h5>
          <p class="card-text">Weekly games.</p>
          <a class="btn btn-primary" href="#">Join</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Try Bulma:**

```html
<link rel="stylesheet" href="bulma.min.css">

<div class="section">
  <button class="button is-success is-large">Join</button>
</div>
```

:::

:::


## Make: your own look

Make the page look like **your** club: at least three rules of your own, after the link (colours, a font, borders, the navbar). Keep Bootstrap's parts and grid. Finished early? Rebuild one card in Bulma or Tailwind.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<link rel="stylesheet" href="bootstrap.min.css">
<style>
  body { font-family: Verdana, sans-serif; background-color: #fff8e7; }
  .navbar { background-color: darkorange; }
  .navbar-brand { color: white; font-weight: bold; }
  .card { border: 3px solid darkorange; border-radius: 0; }
</style>

<nav class="navbar navbar-expand">
  <div class="container">
    <a class="navbar-brand" href="#">Bake sale club</a>
  </div>
</nav>

<div class="container mt-3">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Bakers</h5>
          <p class="card-text">Bake on Thursday.</p>
          <a class="btn btn-warning" href="#">Join</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Sellers</h5>
          <p class="card-text">Sell on Friday.</p>
          <a class="btn btn-warning" href="#">Join</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

:::


:::wider

## Where this leads

You can now build pages from ready-made parts and make them your own. The **DOM** course makes pages react; **Vue** then does for JavaScript what Bootstrap does for CSS.

:::


## Exit ticket

:::keep-together

**Your rule .card { border-color: teal; } does nothing. What is the first thing to check?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Whether the style block comes after the Bootstrap link; when two rules match equally, the later one wins.

:::

