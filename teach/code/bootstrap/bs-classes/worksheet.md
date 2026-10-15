---
title: "Style by class names"
subtitle: "Pages with Bootstrap · Ready-made parts · Lesson 1"
---

# Style by class names

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Thousands of school, club and company websites use Bootstrap, so their buttons and forms look tidy on phones and computers without much CSS of their own.


:::teacher-note

**In one sentence:** Students link Bootstrap's stylesheet, predict that a class name with no rule of their own still styles a button, match classes to what they do, find a button missing its base class, and style a notice for an event of their own.

**Students should be able to say:** I can link Bootstrap's stylesheet to a page. I can style buttons, text and messages by adding Bootstrap's class names. I can look up a class name instead of writing a CSS rule.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The first line links Bootstrap. Neither button has a `<style>` rule of its own.

```html
<link rel="stylesheet" href="bootstrap.min.css">

<button class="btn btn-primary">Join</button>
<button>Join</button>
```

:::keep-together

**There is no CSS rule for btn anywhere in this code. How will the two buttons look?**

☐ Both are blue Bootstrap buttons

☐ Both are plain browser buttons: nobody wrote a rule for btn

☐ The first is a blue Bootstrap button, the second a plain browser button

☐ The first one does not show

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The first is a blue Bootstrap button. The rules for btn and btn-primary are in bootstrap.min.css, which the first line links. The second button has no class, so it keeps the browser's look.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Which class does what?

**Match each class name with what it does.**

A. a larger paragraph for the opening line

B. a yellow message box

C. a space above (margin top, size 3)

D. the button's colour: blue

E. the button shape: padding, rounded corners, no border

F. a centred column with space at the sides

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `container` | |
| `mt-3` | |
| `lead` | |
| `alert alert-warning` | |
| `btn` | |
| `btn-primary` | |

:::


:::teacher-note

**Answer:** container → F. a centred column with space at the sides; mt-3 → C. a space above (margin top, size 3); lead → A. a larger paragraph for the opening line; alert alert-warning → B. a yellow message box; btn → E. the button shape: padding, rounded corners, no border; btn-primary → D. the button's colour: blue

Most Bootstrap looks come in two parts: a base class for the shape (btn, alert) and a second class for the colour (btn-primary, alert-warning).

:::


:::keep-together

### No link

**You delete the &lt;link&gt; line. What happens to class="btn btn-primary"?**

☐ It stays in the code but does nothing, so the button looks plain

☐ The button disappears

☐ The browser shows an error

☐ The button stays blue, because the class is still there

:::


:::teacher-note

**Answer:** It stays in the code but does nothing, so the button looks plain

A class name is only a label. It looks like something only when a stylesheet has a rule for it, and the rules are in bootstrap.min.css.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

btn-primary only picks the colour. The shape and the colour itself come with btn, so the button needs class="btn btn-primary".

:::


:::typical

## Modify

Look the names up in the **Reference** drawer: Bootstrap's class names are fixed, so nobody remembers them all.

**Green and large.** Choose different classes.

**A red alert.** Same base class, new colour.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Green and large:**

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <h1>Chess club</h1>
  <p class="lead">Chess every Wednesday at lunch in the library.</p>
  <div class="alert alert-warning">Sign-ups close on Friday.</div>
  <button class="btn btn-success btn-lg">Join</button>
  <button class="btn btn-outline-secondary">Read more</button>
</div>
```

**A red alert:**

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <h1>Chess club</h1>
  <div class="alert alert-danger">The tournament is full.</div>
  <p class="lead">Chess every Wednesday at lunch in the library.</p>
  <div class="alert alert-warning">Sign-ups close on Friday.</div>
  <button class="btn btn-primary">Join</button>
  <button class="btn btn-outline-secondary">Read more</button>
</div>
```

:::

:::


## Make: a notice for your own event

A concert, a bake sale, a match: use a **container**, a **lead** paragraph, an **alert** and two **buttons** in different colours. No `<style>` block: Bootstrap's classes only.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <h1>Art show</h1>
  <p class="lead">Year 8 paintings in the hall, Thursday after school.</p>
  <div class="alert alert-info">Families welcome. Entry is free.</div>
  <button class="btn btn-primary">Sign up</button>
  <button class="btn btn-outline-secondary">More</button>
</div>
```

:::


:::wider

## Where this leads

Next: the club page's **navbar, cards and grid**, rebuilt with Bootstrap.

:::


## Exit ticket

:::keep-together

**Why does class="btn btn-primary" make a blue button when you wrote no CSS?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The linked stylesheet, bootstrap.min.css, has rules for btn and btn-primary; the class names switch them on.

:::

