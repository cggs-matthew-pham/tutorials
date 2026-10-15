---
title: "Navbar, cards and a grid"
subtitle: "Pages with Bootstrap · Ready-made parts · Lesson 2"
---

# Navbar, cards and a grid

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A navbar, a row of cards and a sign-up form: most websites you visit are built from these same few parts.


:::teacher-note

**In one sentence:** Students rebuild the club page's navbar and cards with Bootstrap, predict how the grid places three cols, count the CSS the page no longer needs, find a made-up class name, add buttons and a sign-up form, and finish with a table and footer.

**Students should be able to say:** I can build a navbar, cards and a form by copying Bootstrap's shapes. I can line cards up with Bootstrap's row and col. I can look up a Bootstrap part I have not used before and fit it into my page.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`row` and `col` are new. Each card sits inside a `col`, and the cols sit inside a `row`.

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <div class="row">
    <div class="col">
      <div class="card"><div class="card-body">Beginners</div></div>
    </div>
    <div class="col">
      <div class="card"><div class="card-body">Players</div></div>
    </div>
    <div class="col">
      <div class="card"><div class="card-body">Champions</div></div>
    </div>
  </div>
</div>
```

:::keep-together

**How will the three cards be placed?**

☐ Side by side, sharing the width equally

☐ On top of each other, in the same place

☐ One under another, each the full width

☐ Side by side, each only as wide as its word

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Side by side, sharing the width equally. The row lines up what is inside it, and each col takes an equal share, so three cols take a third each.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<link rel="stylesheet" href="bootstrap.min.css">

<nav class="navbar navbar-expand bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#">Chess club</a>
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="#groups">Groups</a></li>
      <li class="nav-item"><a class="nav-link" href="#join">Join</a></li>
    </ul>
  </div>
</nav>

<div class="container mt-3" id="groups">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <img src="star.svg" alt="A star" width="40">
          <h5 class="card-title">Beginners</h5>
          <p class="card-text">Learn the moves.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <img src="medal.svg" alt="A medal" width="40">
          <h5 class="card-title">Players</h5>
          <p class="card-text">Weekly games.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <img src="trophy.svg" alt="A trophy" width="40">
          <h5 class="card-title">Champions</h5>
          <p class="card-text">School tournaments.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

:::keep-together

### Name the parts

**Match each class with its job in the shape.**

A. one link in the menu

B. holds cols in a line

C. the club's name, on the left of the bar

D. the padding inside a card

E. one equal share of the row

F. the bar across the top

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `navbar` | |
| `navbar-brand` | |
| `nav-link` | |
| `row` | |
| `col` | |
| `card-body` | |

:::


:::teacher-note

**Answer:** navbar → F. the bar across the top; navbar-brand → C. the club's name, on the left of the bar; nav-link → A. one link in the menu; row → B. holds cols in a line; col → E. one equal share of the row; card-body → D. the padding inside a card

The nesting matters: a col goes straight inside a row, a card-body straight inside a card. Copy the whole shape from the Reference card.

:::


:::keep-together

### Count the CSS

**Your hand-built club page needed about 40 lines of CSS for its header, menu and cards. How many lines of CSS of its own does this page have?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 0

None. The CSS is in bootstrap.min.css. That is the trade: no rules to write, but class names to look up, and a page that looks like many other Bootstrap pages.

:::


:::keep-together

### Spot the bug

**Beginners fills the whole width, and the other two cards sit on a line underneath. There is no error. Click the line that is wrong.**

```
 1  <link rel="stylesheet" href="bootstrap.min.css">
 2  
 3  <div class="container mt-3">
 4    <div class="row">
 5      <div class="column">
 6        <div class="card"><div class="card-body">Beginners</div></div>
 7      </div>
 8      <div class="col">
 9        <div class="card"><div class="card-body">Players</div></div>
10      </div>
11      <div class="col">
12        <div class="card"><div class="card-body">Champions</div></div>
13      </div>
14    </div>
15  </div>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

Bootstrap has no class called column, so the browser ignores it and that box takes the whole row. The name is col.

:::


:::typical

## Modify


**A button in each card.** Inside the card's body.

**A sign-up form.** Labels and boxes with Bootstrap's form classes.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A button in each card:**

```html
<link rel="stylesheet" href="bootstrap.min.css">

<nav class="navbar navbar-expand bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#">Chess club</a>
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="#groups">Groups</a></li>
      <li class="nav-item"><a class="nav-link" href="#join">Join</a></li>
    </ul>
  </div>
</nav>

<div class="container mt-3" id="groups">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <img src="star.svg" alt="A star" width="40">
          <h5 class="card-title">Beginners</h5>
          <p class="card-text">Learn the moves.</p>
          <a class="btn btn-primary" href="#join">Join</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <img src="medal.svg" alt="A medal" width="40">
          <h5 class="card-title">Players</h5>
          <p class="card-text">Weekly games.</p>
          <a class="btn btn-primary" href="#join">Join</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <img src="trophy.svg" alt="A trophy" width="40">
          <h5 class="card-title">Champions</h5>
          <p class="card-text">School tournaments.</p>
          <a class="btn btn-primary" href="#join">Join</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

**A sign-up form:**

```html
<link rel="stylesheet" href="bootstrap.min.css">

<nav class="navbar navbar-expand bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#">Chess club</a>
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="#groups">Groups</a></li>
      <li class="nav-item"><a class="nav-link" href="#join">Join</a></li>
    </ul>
  </div>
</nav>

<div class="container mt-3" id="groups">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Beginners</h5>
          <p class="card-text">Learn the moves.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Players</h5>
          <p class="card-text">Weekly games.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="container mt-3" id="join">
  <h2>Join the club</h2>
  <form>
    <label for="name" class="form-label">Name</label>
    <input id="name" type="text" class="form-control">
    <label for="group" class="form-label mt-2">Group</label>
    <select id="group" class="form-select">
      <option>Beginners</option>
      <option>Players</option>
    </select>
    <button class="btn btn-primary mt-3">Join</button>
  </form>
</div>
```

:::

:::


## Make: results and a footer

Finish the club page: a **results table** styled by Bootstrap (look up its class on the Reference cards) and a **footer** with your club's contact details, using a spacing class and a background colour class.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <h2>Results this term</h2>
  <table class="table table-striped">
    <tr>
      <th>Player</th>
      <th>Wins</th>
    </tr>
    <tr>
      <td>Ada</td>
      <td>5</td>
    </tr>
    <tr>
      <td>Sam</td>
      <td>4</td>
    </tr>
  </table>
</div>

<footer class="container p-3 bg-body-tertiary">
  <p>Contact: chess@example.com</p>
</footer>
```

:::


:::wider

## Where this leads

Next: make Bootstrap look like **yours**, and compare it with the page you built by hand.

:::


## Exit ticket

:::keep-together

**What goes inside a row, and what goes inside a col?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Cols go inside a row and share its width; the content, such as a card, goes inside a col.

:::

