---
title: "Flexbox"
subtitle: "HTML & CSS · Components and layout · Lesson 7"
---

# Flexbox

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Almost every menu bar, toolbar and photo gallery on the web is a Flexbox row.


:::teacher-note

**In one sentence:** Students line boxes up in a row with display flex on the parent, space and centre the row, and make a gallery that wraps.

**Students should be able to say:** I can put a box's children in a row with display flex on the parent. I can space items with gap and centre them with justify-content. I can make a gallery that wraps onto new lines. I can explain why display flex on the items does nothing.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`display: flex` is new. `list-style: none` removes a list's bullets. Read the code. How will the menu items be placed?

```html
<style>
  ul {
    display: flex;
    gap: 16px;
    list-style: none;
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

☐ Nothing shows

☐ One under another, as before

☐ In a grid of two columns

☐ Side by side in a row

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Side by side in a row. display: flex on the ul lines up its children, the li items. (list-style: none removes the bullets, as on real menus.)

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The picture shows this page: a centred menu, and a gallery that wraps onto a second line.

```html
<style>
  .menu {
    display: flex;
    gap: 16px;
    justify-content: center;
    list-style: none;
  }
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 300px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="gallery">
  <img src="trophy.svg" alt="Trophy" width="90">
  <img src="medal.svg" alt="Medal" width="90">
  <img src="star.svg" alt="Star" width="90">
  <img src="ball.svg" alt="Ball" width="90">
</div>
```

:::keep-together

### Match the parts

**Match each property with what it does.**

A. puts space between the items

B. lets items move to the next line when the row is full

C. gathers the items in the middle of the row

D. lines up the box's children in a row

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `display: flex` | |
| `gap: 16px` | |
| `justify-content: center` | |
| `flex-wrap: wrap` | |

:::


:::teacher-note

**Answer:** display: flex → D. lines up the box's children in a row; gap: 16px → A. puts space between the items; justify-content: center → C. gathers the items in the middle of the row; flex-wrap: wrap → B. lets items move to the next line when the row is full

All four go on the box that holds the items. The items themselves need nothing.

:::


:::keep-together

### Which box?

**To put the four pictures in a row, which box gets display: flex?**

☐ The body

☐ The style block

☐ Each img

☐ The div that holds them (class gallery)

:::


:::teacher-note

**Answer:** The div that holds them (class gallery)

display: flex goes on the parent: the box that holds the items. Its children line up.

:::


:::keep-together

### The menu that will not line up

**This menu should be a row, but the items still stack, and there is no error. Click the line that causes it.**

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

### Rows of anything

A menu and a row of cards, both with Flexbox.

```html
<style>
  .menu {
    display: flex;
    gap: 16px;
    list-style: none;
  }
  .cards {
    display: flex;
    gap: 12px;
  }
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
</style>
```

**The menu and the row of cards both use Flexbox. What do they have in common?**

☐ display: flex is on the box that holds the items

☐ They both use flex-wrap

☐ Every item has display: flex

☐ They are both lists

:::


:::teacher-note

**Answer:** display: flex is on the box that holds the items

A menu (a ul of links) and a row of cards (a div of divs) work the same way: the parent gets display: flex. A card can hold a picture and text, and still be one item in the row.

:::


:::typical

## Modify


**A menu in a row.** Put the menu items side by side.

**Space them out.** Put `24px` between the menu items.

**Centre the menu.** Move the menu to the middle of the row.

**A gallery that wraps.** Make the six pictures a gallery: a row, `340px` wide, that wraps onto new lines.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A menu in a row:**

```html
<style>
  .menu {
    list-style: none;
    display: flex;
  }
  .pic {
    border: 1px solid gray;
    padding: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="gallery">
  <div class="pic"><img src="trophy.svg" alt="Trophy" width="70"><p>Trophy</p></div>
  <div class="pic"><img src="medal.svg" alt="Medal" width="70"><p>Medal</p></div>
  <div class="pic"><img src="book.svg" alt="Book" width="70"><p>Book</p></div>
  <div class="pic"><img src="ball.svg" alt="Ball" width="70"><p>Ball</p></div>
  <div class="pic"><img src="star.svg" alt="Star" width="70"><p>Star</p></div>
  <div class="pic"><img src="music.svg" alt="Music" width="70"><p>Music</p></div>
</div>
```

**Space them out:**

```html
<style>
  .menu {
    list-style: none;
    display: flex;
    gap: 24px;
  }
  .pic {
    border: 1px solid gray;
    padding: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="gallery">
  <div class="pic"><img src="trophy.svg" alt="Trophy" width="70"><p>Trophy</p></div>
  <div class="pic"><img src="medal.svg" alt="Medal" width="70"><p>Medal</p></div>
  <div class="pic"><img src="book.svg" alt="Book" width="70"><p>Book</p></div>
  <div class="pic"><img src="ball.svg" alt="Ball" width="70"><p>Ball</p></div>
  <div class="pic"><img src="star.svg" alt="Star" width="70"><p>Star</p></div>
  <div class="pic"><img src="music.svg" alt="Music" width="70"><p>Music</p></div>
</div>
```

**Centre the menu:**

```html
<style>
  .menu {
    list-style: none;
    display: flex;
    gap: 24px;
    justify-content: center;
  }
  .pic {
    border: 1px solid gray;
    padding: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="gallery">
  <div class="pic"><img src="trophy.svg" alt="Trophy" width="70"><p>Trophy</p></div>
  <div class="pic"><img src="medal.svg" alt="Medal" width="70"><p>Medal</p></div>
  <div class="pic"><img src="book.svg" alt="Book" width="70"><p>Book</p></div>
  <div class="pic"><img src="ball.svg" alt="Ball" width="70"><p>Ball</p></div>
  <div class="pic"><img src="star.svg" alt="Star" width="70"><p>Star</p></div>
  <div class="pic"><img src="music.svg" alt="Music" width="70"><p>Music</p></div>
</div>
```

**A gallery that wraps:**

```html
<style>
  .menu {
    list-style: none;
    display: flex;
    gap: 24px;
    justify-content: center;
  }
  .pic {
    border: 1px solid gray;
    padding: 6px;
  }
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 340px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="gallery">
  <div class="pic"><img src="trophy.svg" alt="Trophy" width="70"><p>Trophy</p></div>
  <div class="pic"><img src="medal.svg" alt="Medal" width="70"><p>Medal</p></div>
  <div class="pic"><img src="book.svg" alt="Book" width="70"><p>Book</p></div>
  <div class="pic"><img src="ball.svg" alt="Ball" width="70"><p>Ball</p></div>
  <div class="pic"><img src="star.svg" alt="Star" width="70"><p>Star</p></div>
  <div class="pic"><img src="music.svg" alt="Music" width="70"><p>Music</p></div>
</div>
```

:::

:::


## Make

Make a gallery for a school event: a heading and at least four pictures, with good alt text, in a row that wraps. Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    width: 320px;
  }
</style>
<h1>Our club's year</h1>
<div class="gallery">
  <img src="star.svg" alt="A gold star for effort" width="90">
  <img src="music.svg" alt="Music night" width="90">
  <img src="ball.svg" alt="The soccer final" width="90">
  <img src="trophy.svg" alt="Our trophy" width="90">
  <img src="book.svg" alt="Book week" width="90">
</div>
```

:::


:::wider

## Put the club menu in a row

The club's menu is a bulleted list stacked inside a blue bar. Make it a real menu bar: a `.menu` rule that puts the links in a row, removes the bullets, spaces them `24px` apart and centres them. Add `margin: 0;` and `padding: 0;` to tidy the list's own spacing.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .bar {
    background-color: lightblue;
    padding: 10px;
  }
  .menu {
    display: flex;
    gap: 24px;
    list-style: none;
    justify-content: center;
    margin: 0;
    padding: 0;
  }
</style>
<div class="bar">
  <ul class="menu">
    <li><a href="https://example.com/home">Home</a></li>
    <li><a href="https://example.com/events">Events</a></li>
    <li><a href="https://example.com/robots">Our robots</a></li>
    <li><a href="https://example.com/join">Join</a></li>
  </ul>
</div>
<h1>Robotics Club</h1>
<p>We meet every Tuesday at lunch in the STEM lab.</p>
```

:::

:::


## Exit ticket

:::keep-together

**A student wants three cards side by side. They write .card { display: flex; } but the cards still stack. What is wrong, and what should they write?**

{{lines-3}}

:::


:::teacher-note

**Answer:** display flex is on the items. It goes on the box that holds the cards, for example .cards { display: flex; } with the cards inside a div class cards.

:::

