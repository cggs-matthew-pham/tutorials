---
title: "A row with Flexbox"
subtitle: "Layout and components · Layout · Lesson 6"
---

# A row with Flexbox

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Almost every menu bar, toolbar and row of cards on the web is a Flexbox row.


:::teacher-note

**In one sentence:** Students put boxes in a row with display flex, and find out that it goes on the box that holds them, not on the items.

**Students should be able to say:** I can put a box's children in a row with display flex on the parent. I can say which box is the parent and which are its children. I can explain why display flex on the items does nothing.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`display: flex` is new. `list-style: none` removes a list's bullets, and the `margin-right` on each `li` keeps the words apart. Read the code. How will the menu items be placed?

```html
<style>
  ul {
    display: flex;
    list-style: none;
  }
  li {
    margin-right: 24px;
  }
</style>
<ul>
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
```

:::keep-together

**How will the three menu items be placed?**

☐ Two on the first line and one on the next

☐ Side by side in a row

☐ Only the bullets go; the items stay stacked

☐ One under another, as before

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Side by side in a row. display: flex on the ul lines up its children, the li items. (list-style: none removes the bullets, as on real menus, and the margin on each li keeps the words apart.)

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The picture shows a row of cards: the `div` holds them, and each card holds a picture and a name.

```html
<style>
  .cards {
    background-color: aliceblue;
  }
  .card {
    padding: 12px;
    border: 2px solid teal;
    margin: 8px;
  }
</style>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

:::keep-together

### Which box?

**To put the three cards in a row, which rule gets display: flex?**

☐ .cards, the div that holds the cards

☐ .card, each card

☐ body, the whole page

☐ img, the pictures inside the cards

:::


:::teacher-note

**Answer:** .cards, the div that holds the cards

display: flex goes on the box that holds the items: .cards. Its children, the three .card boxes, line up in a row. A card can hold a picture and text and still be one item in the row.

:::


:::keep-together

### The menu that will not line up

**This menu should be a row, but the items still stack, and there is no error. Click the line that picks the wrong box.**

```
 1  <style>
 2    li {
 3      display: flex;
 4    }
 5  </style>
 6  <ul>
 7    <li><a href="https://example.com/home">Home</a></li>
 8    <li><a href="https://example.com/events">Events</a></li>
 9    <li><a href="https://example.com/join">Join</a></li>
10  </ul>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2 puts display: flex on each li, so each item lines up its own insides. It belongs on the ul that holds them: ul { display: flex; }.

:::


:::keep-together

### Which boxes line up?

**The ul has display: flex. Each li holds an a link. Which boxes are lined up in the row?**

☐ The li items, the children of the ul

☐ The a links, inside the li items

☐ The ul itself

☐ All of them

:::


:::teacher-note

**Answer:** The li items, the children of the ul

Flexbox lines up the children of the box it is on. The li items are the ul's children, so they form the row, and each link stays inside its li.

:::


:::typical

## Modify


**A menu in a row.** Put the menu items side by side.

**Cards in a row.** The three cards are stacked. Put them in a row.

**Tidy the list.** A list has space of its own around it. Remove it from the menu with `margin: 0;` and `padding: 0;`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A menu in a row:**

```html
<style>
  .menu {
    display: flex;
    list-style: none;
  }
  .menu li {
    margin-right: 24px;
  }
  .card {
    padding: 8px;
    border: 2px solid teal;
    margin: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

**Cards in a row:**

```html
<style>
  .menu {
    display: flex;
    list-style: none;
  }
  .menu li {
    margin-right: 24px;
  }
  .cards {
    display: flex;
  }
  .card {
    padding: 8px;
    border: 2px solid teal;
    margin: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

**Tidy the list:**

```html
<style>
  .menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .menu li {
    margin-right: 24px;
  }
  .cards {
    display: flex;
  }
  .card {
    padding: 8px;
    border: 2px solid teal;
    margin: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

:::

:::


## Mix it up

The header holds the title and the menu row. The story below has a link of its own.

```html
<style>
  header {
    background-color: lightblue;
  }
  .menu {
    display: flex;
    list-style: none;
  }
  .menu li {
    margin-right: 24px;
  }
</style>
<header>
  <h1>Robotics Club</h1>
  <nav>
    <ul class="menu">
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/events">Events</a></li>
      <li><a href="https://example.com/join">Join</a></li>
    </ul>
  </nav>
</header>
<p>We meet every Tuesday. <a href="https://example.com/map">Find the STEM lab</a>.</p>
```

:::keep-together

**The menu links should lose their underline without changing the link in the story, and the header should have room between its edge and its words. Which two rules do both jobs?**

☐ nav a { text-decoration: none; } and header { padding: 16px; }

☐ a { text-decoration: none; } and header { padding: 16px; }

☐ nav a { text-decoration: none; } and header { margin: 16px; }

☐ nav { text-decoration: none; } and header { margin: 16px; }

:::


:::teacher-note

**Answer:** nav a { text-decoration: none; } and header { padding: 16px; }

nav a picks only the links inside the nav. Padding is the room inside the header's edge, around its words, and margin would put the space outside it.

:::


## Make

Make the top of the club page: a `<header>` with the club name and, under it, a `<nav>` holding a list of at least three links. Put the links in a row, without bullets.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  header {
    background-color: lightblue;
    padding: 12px;
  }
  .menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .menu li {
    margin-right: 24px;
  }
</style>
<header>
  <h1>Robotics Club</h1>
  <nav>
    <ul class="menu">
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/events">Events</a></li>
      <li><a href="https://example.com/join">Join</a></li>
    </ul>
  </nav>
</header>
<h2>We meet every Tuesday at lunch.</h2>
```

:::


## Exit ticket

:::keep-together

**A student wants three cards side by side. They write .card { display: flex; } but the cards still stack. What is wrong, and what should they write?**

{{lines-3}}

:::


:::teacher-note

**Answer:** display flex is on the items. It goes on the box that holds the cards, for example .cards { display: flex; } with the cards inside a div with class cards.

:::

