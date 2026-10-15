---
title: "A hero and a row of cards"
subtitle: "Layout and components · Layout · Lesson 9"
---

# A hero and a row of cards

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A shop shows hundreds of products in the same card: one design, written once, and a copy of the HTML for each product.


:::teacher-note

**In one sentence:** Students build a hero and a row of cards from classes, copy a card's HTML to add another, and find out that one set of rules styles every copy.

**Students should be able to say:** I can build a card from tags and a class, and copy it to make another. I can explain why a copied card needs no new CSS. I can change every card at once by changing one rule.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code: a hero (a big opening section) and a row of three cards. How much CSS must you write to add a fourth card?

```html
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo.</p></section>
</div>
```

:::keep-together

**The club adds a fourth card, Drones. How much CSS must you write for it?**

☐ One line in .card for every card on the page

☐ None: copy a card's HTML, change its words, and the .card rule styles it

☐ About five lines: a new rule such as .card4 for the fourth card

☐ One line in .cards, to make room for a fourth card

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** None. Every card has class="card", so the .card rule already styles a fourth. The wrapping row makes room for it on its own.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo.</p></section>
</div>
```

:::keep-together

### The card with no style

**The Drones card is plain, while the other two have a border and padding, and there is no error. Click the line that causes it.**

```
 1  <style>
 2    .card {
 3      padding: 16px;
 4      border: 1px solid gray;
 5    }
 6  </style>
 7  <section class="card"><h2>Robots</h2></section>
 8  <section class="card"><h2>Coding</h2></section>
 9  <section class="crad"><h2>Drones</h2></section>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

Line 9 says crad. The class is card, so the .card rule does not match it. A copy only gets the style if its class is spelt exactly the same.

:::


:::keep-together

### Rules for every copy

**Mia gave each card its own class and its own rule, and they look right. What goes wrong as the club grows?**

☐ Nothing: this is the usual way to build cards

☐ Each new card needs a new rule, and changing the border means changing every rule

☐ The browser shows an error for classes with numbers

☐ Only the first card is styled

:::


:::teacher-note

**Answer:** Each new card needs a new rule, and changing the border means changing every rule

The three rules are identical, so the page repeats itself. With one class, card, and one rule, a new card is only HTML, and a new border colour is one change.

:::


:::keep-together

### Forty pages

**A school site has 40 pages that all use the same card class, and the rules sit in one file that every page loads. The school changes its colours. What is the best way to update the cards?**

☐ Edit the border on every card of all 40 pages

☐ Change the .card rule once in that file, and all 40 pages follow

☐ Give each card on each page a new class

☐ Rewrite all 40 pages

:::


:::teacher-note

**Answer:** Change the .card rule once in that file, and all 40 pages follow

The looks live in the rule, not in the cards. Change the rule once and every copy of the component, on every page that loads the file, follows.

:::


:::typical

## Modify


**One change, every card.** Make the border of every card `2px solid navy` by changing the rule once.

**A copy.** Add a third card with the heading `Drones` by copying one of the others.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One change, every card:**

```html
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 2px solid navy;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
</div>
```

**A copy:**

```html
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 2px solid navy;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
  <section class="card"><h2>Drones</h2><p>Fly and film.</p></section>
</div>
```

:::

:::


## Mix it up

Two things are wrong on this page: one card looks different, and the cards are squashed.

```html
<style>
  .cards {
    display: flex;
    gap: 12px;
  }
  .card {
    flex: 1;
    border: 2px solid teal;
    padding: 10px;
  }
</style>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test robots every Tuesday.</p></section>
  <section class="card"><h2>Coding</h2><p>Write games and run them.</p></section>
  <section><h2>Drones</h2><p>Fly and film on the oval.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo for the club.</p></section>
</div>
```

## Make

Make a hero and three cards for a club or event you know: a big heading with a line and a link, and three cards with a heading and a line each, in a row that wraps. Then add a fourth card by copying one, and write no new CSS.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo.</p></section>
  <section class="card"><h2>Drones</h2><p>Fly and film.</p></section>
</div>
```

:::


## Exit ticket

:::keep-together

**A page has ten cards, all class card. How many .card rules does it need, and how do you add an eleventh card?**

{{lines-3}}

:::


:::teacher-note

**Answer:** One rule. Copy the HTML of a card, change its words, and the rule already styles it.

:::

