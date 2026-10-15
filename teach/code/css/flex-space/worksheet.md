---
title: "Space out a row"
subtitle: "Layout and components · Layout · Lesson 7"
---

# Space out a row

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A menu bar with the logo on the left and the links on the right is one flex row with three properties.


:::teacher-note

**In one sentence:** Students space a flex row with gap, place its items with justify-content and line them up with align-items, and find out that these go on the row and work in two directions.

**Students should be able to say:** I can use gap to put space between the items in a flex row. I can use justify-content to place the items along the row. I can use align-items to line the items up across the row.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`justify-content`, `align-items` and `gap` are new, and all three go on the box with `display: flex`. Read the code. Where do the three items sit along the bar?

```html
<style>
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<div class="bar">
  <h2>Robotics Club</h2>
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/join">Join</a>
</div>
```

:::keep-together

**Where do the three items sit along the bar?**

☐ The words inside each item are spread out and lined up to the right

☐ All three bunched at the left, with 20px between them

☐ All three bunched together in the middle of the bar

☐ Robotics Club at the left end, Join at the right end, and Events between them

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Robotics Club at the left end, Join at the right end, and Events between them. justify-content places the items along the row. It does not change the text inside an item. align-items: center also puts them halfway down the 100px bar.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<style>
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<div class="bar">
  <h2>Robotics Club</h2>
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/join">Join</a>
</div>
```

:::keep-together

### Match the lines

**Match each line with what it does to a flex row.**

A. all items packed at the end of the row

B. the least space between neighbouring items

C. items centred across the row, halfway down

D. first item at the start, last at the end, the rest spread between

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `justify-content: space-between` | |
| `justify-content: flex-end` | |
| `align-items: center` | |
| `gap: 20px` | |

:::


:::teacher-note

**Answer:** justify-content: space-between → D. first item at the start, last at the end, the rest spread between; justify-content: flex-end → A. all items packed at the end of the row; align-items: center → C. items centred across the row, halfway down; gap: 20px → B. the least space between neighbouring items

Two properties set where the items sit: justify-content along the row and align-items across it. gap sets the space between neighbours.

:::


:::keep-together

### What gets centred

**Each card holds a word. What does justify-content: center centre?**

☐ The three cards, as a group, along the row

☐ The word inside each card

☐ The 12px gap

☐ The cards, halfway down the row

:::


:::teacher-note

**Answer:** The three cards, as a group, along the row

justify-content places the items, here the cards, along the row. It does not touch the words inside a card. The words move only if the card itself has room around them.

:::


:::keep-together

### Up and down

**The star and the club name sit at the top of the 100px bar. Which line centres them up and down?**

☐ height: 50px;

☐ align-items: center;

☐ justify-content: center;

☐ gap: 50px;

:::


:::teacher-note

**Answer:** align-items: center;

The row runs left to right, so up and down is across it: align-items. justify-content would slide both items to the middle of the row, but leave them at the top.

:::


:::keep-together

### The gap that does nothing

**The three items should have 20px between them, but they touch, and there is no error. Click the line that causes it.**

```
 1  <style>
 2    .strip {
 3      display: flex;
 4    }
 5    .item {
 6      gap: 20px;
 7      border: 1px solid gray;
 8    }
 9  </style>
10  <div class="strip">
11    <div class="item">One</div>
12    <div class="item">Two</div>
13    <div class="item">Three</div>
14  </div>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

Line 6 puts gap on each item. gap spaces the items inside a box, so it goes on the row that holds them: .strip { gap: 20px; }.

:::


:::typical

## Modify


**Space the links.** Put `24px` between the three menu links.

**Centre the menu.** Move the group of links to the middle of the row.

**Line up the logo.** The star and the club name sit at the top of the bar. Centre them up and down.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Space the links:**

```html
<style>
  .menu {
    display: flex;
    gap: 24px;
  }
  .bar {
    display: flex;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<nav class="menu">
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/robots">Robots</a>
  <a href="https://example.com/join">Join</a>
</nav>
<div class="bar">
  <img src="star.svg" alt="Club star" width="50">
  <h2>Robotics Club</h2>
</div>
```

**Centre the menu:**

```html
<style>
  .menu {
    display: flex;
    gap: 24px;
    justify-content: center;
  }
  .bar {
    display: flex;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<nav class="menu">
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/robots">Robots</a>
  <a href="https://example.com/join">Join</a>
</nav>
<div class="bar">
  <img src="star.svg" alt="Club star" width="50">
  <h2>Robotics Club</h2>
</div>
```

**Line up the logo:**

```html
<style>
  .menu {
    display: flex;
    gap: 24px;
    justify-content: center;
  }
  .bar {
    display: flex;
    align-items: center;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<nav class="menu">
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/robots">Robots</a>
  <a href="https://example.com/join">Join</a>
</nav>
<div class="bar">
  <img src="star.svg" alt="Club star" width="50">
  <h2>Robotics Club</h2>
</div>
```

:::

:::


## Mix it up

Here is a row of three items with the margin version.

```html
<style>
  .strip {
    display: flex;
    border: 2px solid navy;
  }
  .item {
    margin: 10px;
    padding: 10px;
    border: 1px solid gray;
  }
</style>
<div class="strip">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
```

:::keep-together

**The row gives each item margin: 10px. Another row gives its items no margin and uses gap: 10px. How do they differ?**

☐ The margin row puts 10px of space inside each item, like padding

☐ They look the same: margin and gap both add 10px outside every item

☐ The margin row also has 10px between the first item and the row's border; the gap row has none there

☐ The gap row has 10px between the first item and the row's border; the margin row has none there

:::


:::teacher-note

**Answer:** The margin row also has 10px between the first item and the row's border; the gap row has none there

Margin is outside each item's border on every side, so it leaves space at the ends of the row as well. gap sits only between neighbouring items. Between two items, margin on both gives 20px.

:::


## Make

The club's header has a name and a menu, one above the other. Make the header a row with the name at the left and the menu at the right, lined up across the bar.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lightblue;
    padding: 10px;
  }
</style>
<header class="bar">
  <h1>Robotics Club</h1>
  <nav>
    <a href="https://example.com/events">Events</a>
    <a href="https://example.com/robots">Robots</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
```

:::


## Exit ticket

:::keep-together

**A flex row has justify-content: center. Which way do the items move, and what happens to the words inside each item?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The group of items moves to the middle of the row. The words stay where they are inside their item.

:::

