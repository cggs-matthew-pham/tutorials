---
marp: true
theme: default
html: true
---

# A row with Flexbox

Layout and components · Layout

<!-- Speaker note: Students put boxes in a row with display flex, and find out that it goes on the box that holds them, not on the items. About 45 minutes (Predict and Run 10 min · Investigate 12 min · Mix it up 4 min · Modify 10 min · Make 9 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put boxes side by side in a row with Flexbox, and find out that it goes on the box that holds them.

- I can put a box's children in a row with display flex on the parent.
- I can say which box is the parent and which are its children.
- I can explain why display flex on the items does nothing.

<!-- Speaker note: Before class: Read the unit primer "Layout and components in 5 minutes", then do the Make task yourself. The one idea of the lesson: `display: flex;` goes on the **parent** (the box that holds the items), and its **children** line up in a row. Only the direct children line up. Spacing, centring and wrapping are the next lessons, so here the space between items is a `margin` on each item. `list-style: none;` is not Flexbox: it removes a list's bullets, which every real menu does. Teacher: Mix it up: both rules are from earlier lessons. Ask which links `nav a` picks, and where padding goes. -->

---

## Why it matters

> Almost every menu bar, toolbar and row of cards on the web is a Flexbox row.

<!-- Speaker note: So far, boxes stack down the page. **Flexbox** lines them up in a row. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**How will the three menu items be placed?**

- Two on the first line and one on the next
- Side by side in a row
- Only the bullets go; the items stay stacked
- One under another, as before

<!-- Speaker note: What happens: Side by side in a row. display: flex on the ul lines up its children, the li items. (list-style: none removes the bullets, as on real menus, and the margin on each li keeps the words apart.) Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students do not expect one line on the `ul` to rearrange its items. It does, because the items are its children. Ask one pair from each answer to say why. Listen for who says bullets: list-style is not Flexbox. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++ul+%7B%0A++++display%3A+flex%3B%0A++++list-style%3A+none%3B%0A++%7D%0A++li+%7B%0A++++margin-right%3A+24px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cul%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A%3C%2Ful%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flexbox/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. Then delete the `display: flex;` line to see the menu stack again, and put it back. | Code | What it does | Why | |---|---|---| | `ul { display: flex; }` | Puts the `ul`'s children in a row | The box that holds the items is the **parent**, and its boxes inside are its **children**. Flex goes on the parent, and the children line up | | the three `li` | Sit side by side | They are the parent's children. Without `display: flex` they are block boxes, and block boxes start a new line | | `list-style: none;` | Removes the bullets | Not Flexbox: real menus have no bullets, so it is a tidy-up on the list | | `li { margin-right: 24px; }` | Keeps the words apart | A margin on each item. Items in a row touch otherwise | Students should be able to say: I can say which box gets display: flex, and what happens to its children. -->

<!-- Speaker note: Teacher: delete and restore `display: flex;` to see the switch. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Side by side in a row. display: flex on the ul lines up its children, the li items. (list-style: none removes the bullets, as on real menus, and the margin on each li keeps the words apart.)

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

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

<!-- Speaker note: The picture shows a row of cards: the `div` holds them, and each card holds a picture and a name. What this step is for: Flexbox goes on the parent, the box that holds the items, and only its children line up. -->

<!-- Speaker note: Teacher: ask which box is the parent before every rule. The menu that will not line up has `display: flex` on each `li`: each item lines up its own insides, so nothing visible changes and there is no error. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which box?

**To put the three cards in a row, which rule gets display: flex?**

- .cards, the div that holds the cards
- .card, each card
- body, the whole page
- img, the pictures inside the cards

* Answer: .cards, the div that holds the cards

<!-- Speaker note: display: flex goes on the box that holds the items: .cards. Its children, the three .card boxes, line up in a row. A card can hold a picture and text and still be one item in the row. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The menu that will not line up

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

* Answer: line 2

<!-- Speaker note: Line 2 puts display: flex on each li, so each item lines up its own insides. It belongs on the ul that holds them: ul { display: flex; }. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which boxes line up?

**The ul has display: flex. Each li holds an a link. Which boxes are lined up in the row?**

- The li items, the children of the ul
- The a links, inside the li items
- The ul itself
- All of them

* Answer: The li items, the children of the ul

<!-- Speaker note: Flexbox lines up the children of the box it is on. The li items are the ul's children, so they form the row, and each link stays inside its li. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A menu in a row:** Put the menu items side by side.
- **Cards in a row:** The three cards are stacked. Put them in a row.
- **Tidy the list:** A list has space of its own around it. Remove it from the menu with `margin: 0;` and `padding: 0;`.

<!-- Speaker note: What this step is for: Building a menu row and a row of cards, always putting display: flex on the parent. Hints, in order: Flexbox goes on the parent, the box that holds the items. Which rule is that? / Add `display: flex;` to the `.menu` rule. / The cards are inside a `div` with the class `cards`. That div is the parent. / Write a new `.cards` rule and put `display: flex;` first in it. / The list has its own space around it. Which two box properties would remove it? Set them in the `.menu` rule. For students who need more support: Give students the Modify starter and do the first task together, saying out loud: the menu is the parent, so display flex goes in .menu. For early finishers: Make the cards a row too, with a picture in each, and predict what happens if a card has display flex as well. The hard part, on purpose: display: flex goes on the parent, not the items. When the row doesn't appear, ask which box holds the items before saying anything else. When students get stuck: The items still stack after adding display flex. Ask: Which box did you put display flex on? Is it the box that holds the items? Fix: Move display flex to the parent's rule (the ul, or the div that holds the cards). / The words in the row touch each other. Ask: What puts space outside each item? Fix: Add a margin to the li items, such as margin-right 24px. The next lesson has a better tool for the space between items. / Bullets sit oddly beside the menu items. Ask: What removes a list's bullets? Fix: Add list-style none; to the ul's rule. -->

<!-- Speaker note: Teacher: menu first, then the cards (a new rule on the div that holds them), then the tidy-up. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.menu+%7B%0A++++list-style%3A+none%3B%0A++%7D%0A++.menu+li+%7B%0A++++margin-right%3A+24px%3B%0A++%7D%0A++.card+%7B%0A++++padding%3A+8px%3B%0A++++border%3A+2px+solid+teal%3B%0A++++margin%3A+6px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cul+class%3D%22menu%22%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A%3C%2Ful%3E%0A%3Cdiv+class%3D%22cards%22%3E%0A++%3Cdiv+class%3D%22card%22%3E%0A++++%3Cimg+src%3D%22trophy.svg%22+alt%3D%22Trophy%22+width%3D%2250%22%3E%0A++++%3Cp%3EOwls%3C%2Fp%3E%0A++%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22card%22%3E%0A++++%3Cimg+src%3D%22medal.svg%22+alt%3D%22Medal%22+width%3D%2250%22%3E%0A++++%3Cp%3EHawks%3C%2Fp%3E%0A++%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22card%22%3E%0A++++%3Cimg+src%3D%22star.svg%22+alt%3D%22Star%22+width%3D%2250%22%3E%0A++++%3Cp%3EKestrels%3C%2Fp%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flexbox/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

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

<!-- Speaker note: The header holds the title and the menu row. The story below has a link of its own. What this step is for: A selector with a space picks the links inside the menu, and padding gives the header room inside its edge. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**The menu links should lose their underline without changing the link in the story, and the header should have room between its edge and its words. Which two rules do both jobs?**

- nav a { text-decoration: none; } and header { padding: 16px; }
- a { text-decoration: none; } and header { padding: 16px; }
- nav a { text-decoration: none; } and header { margin: 16px; }
- nav { text-decoration: none; } and header { margin: 16px; }

* Answer: nav a { text-decoration: none; } and header { padding: 16px; }

<!-- Speaker note: nav a picks only the links inside the nav. Padding is the room inside the header's edge, around its words, and margin would put the space outside it. What this step is for: A selector with a space picks the links inside the menu, and padding gives the header room inside its edge. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make the top of the club page: a `<header>` with the club name and, under it, a `<nav>` holding a list of at least three links. Put the links in a row, without bullets.

<!-- Speaker note: Hints, in order: A menu is a list of links inside a `<nav>`. Which box holds the items? / Build a `<header>` with an `<h1>` and a `<nav>` holding a `<ul>` of links, then write a rule for the `ul` that starts with `display: flex;`. / Add `list-style: none;`, and a margin on each `li` so the words do not touch. -->

<!-- Speaker note: Teacher: several answers are fine. The check wants the nav parts and `display: flex`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Make+the+top+of+the+club+page.+--%3E%0A%3Ch2%3EWe+meet+every+Tuesday+at+lunch.%3C%2Fh2%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flexbox/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Parent or child? <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap menus with a partner. Point at the box that holds the items and the boxes that line up, then say which rule has display flex.

<!-- Speaker note: Listen for students who point at the links. Ask what the links sit inside. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student wants three cards side by side. They write .card { display: flex; } but the cards still stack. What is wrong, and what should they write?**

* display flex is on the items. It goes on the box that holds the cards, for example .cards { display: flex; } with the cards inside a div with class cards.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson spaces the row out: gap, justify-content and align-items, so the club name sits left and the menu right. Class idea: find three websites and sketch which parts are Flexbox rows (menus, toolbars, rows of cards). -->
