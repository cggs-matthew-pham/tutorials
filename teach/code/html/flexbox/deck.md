---
marp: true
theme: default
html: true
---

# Flexbox

HTML & CSS · Components and layout

<!-- Speaker note: Students line boxes up in a row with display flex on the parent, space and centre the row, and make a gallery that wraps. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** line boxes up in a row with Flexbox, space and centre them, and let a gallery wrap onto new lines.

- I can put a box's children in a row with display flex on the parent.
- I can space items with gap and centre them with justify-content.
- I can make a gallery that wraps onto new lines.
- I can explain why display flex on the items does nothing.

<!-- Speaker note: Before class: Read the unit primer "Layout and components in 5 minutes", then do the Make task yourself. The one idea of the lesson: `display: flex;` goes on the **parent** (the box that holds the items), and its **children** line up in a row. Everything else in Flexbox (`gap`, `justify-content`, `flex-wrap`) also goes on the parent. `list-style: none;` is not Flexbox: it removes a list's bullets, which every real menu does. Teacher: Rows of anything: a menu and a row of cards are the same idea. A card can hold a picture and text and still be one item in the row. Teacher: Club menu: a real menu bar. `margin: 0;` and `padding: 0;` remove the list's own spacing so the bar looks tidy. -->

---

## Why it matters

> Almost every menu bar, toolbar and photo gallery on the web is a Flexbox row.

<!-- Speaker note: So far, boxes stack down the page. **Flexbox** lines them up in a row. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**How will the three menu items be placed?**

- Nothing shows
- One under another, as before
- In a grid of two columns
- Side by side in a row

<!-- Speaker note: What happens: Side by side in a row. display: flex on the ul lines up its children, the li items. (list-style: none removes the bullets, as on real menus.) Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students do not expect one line on the `ul` to rearrange its items. It does, because the items are its children. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++ul+%7B%0A++++display%3A+flex%3B%0A++++gap%3A+16px%3B%0A++++list-style%3A+none%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cul%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A%3C%2Ful%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/flexbox/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. Then change `gap` to `40px`, and delete the `display: flex;` line to see the menu stack again. Put it back. Students should be able to say: I can say which box gets display: flex, and what happens to its children. -->

<!-- Speaker note: Teacher: delete and restore `display: flex;` to see the switch. Change `gap` to see the spacing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Side by side in a row. display: flex on the ul lines up its children, the li items. (list-style: none removes the bullets, as on real menus.)

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

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

<!-- Speaker note: The picture shows this page: a centred menu, and a gallery that wraps onto a second line. What this step is for: Flexbox properties go on the parent: display: flex makes the row, gap spaces it, justify-content places it, and flex-wrap lets it wrap. -->

<!-- Speaker note: Teacher: ask which box is the parent before every rule. The menu that will not line up has `display: flex` on each `li`: each item lines up its own insides, so nothing visible changes and there is no error. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

**Match each property with what it does.**

| | |
|---|---|
| `display: flex` | A. puts space between the items |
| `gap: 16px` | B. lets items move to the next line when the row is full |
| `justify-content: center` | C. gathers the items in the middle of the row |
| `flex-wrap: wrap` | D. lines up the box's children in a row |

* Answer: display: flex → D. lines up the box's children in a row; gap: 16px → A. puts space between the items; justify-content: center → C. gathers the items in the middle of the row; flex-wrap: wrap → B. lets items move to the next line when the row is full

<!-- Speaker note: All four go on the box that holds the items. The items themselves need nothing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which box?

**To put the four pictures in a row, which box gets display: flex?**

- The body
- The style block
- Each img
- The div that holds them (class gallery)

* Answer: The div that holds them (class gallery)

<!-- Speaker note: display: flex goes on the parent: the box that holds the items. Its children line up. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The menu that will not line up

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

* Answer: line 2

<!-- Speaker note: Line 2 puts display: flex on each li, so each item lines up its own insides. It belongs on the ul that holds them: ul { display: flex; }. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Rows of anything

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

- display: flex is on the box that holds the items
- They both use flex-wrap
- Every item has display: flex
- They are both lists

* Answer: display: flex is on the box that holds the items

<!-- Speaker note: A menu (a ul of links) and a row of cards (a div of divs) work the same way: the parent gets display: flex. A card can hold a picture and text, and still be one item in the row. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A menu in a row:** Put the menu items side by side.
- **Space them out:** Put `24px` between the menu items.
- **Centre the menu:** Move the menu to the middle of the row.
- **A gallery that wraps:** Make the six pictures a gallery: a row, `340px` wide, that wraps onto new lines.

<!-- Speaker note: What this step is for: Building a menu and a gallery one Flexbox property at a time, always on the parent. Hints, in order: Flexbox goes on the parent, the box that holds the items. Which rule is that? / Add `display: flex;` to the `.menu` rule. / `gap: 24px;` goes in the same rule. / Centring the items is another job for the parent's rule. Look for the Flexbox property that spreads items along the row. / `justify-content: center;` in the `.menu` rule. / Write a new `.gallery` rule: the gallery is the parent of the pictures. / `display: flex;`, `flex-wrap: wrap;`, a `gap`, and a `width` such as `340px`. For students who need more support: Give students the Modify starter and do the first task together, saying out loud: the menu is the parent, so display flex goes in .menu. For early finishers: Try justify-content: space-between on the menu, then flex-direction: column on the gallery and explain what changed. Make the gallery pictures the same size with a width on each img. The hard part, on purpose: display: flex goes on the parent, not the items. When the row doesn't appear, ask which box holds the items before saying anything else. When students get stuck: The items still stack after adding display flex. Ask: Which box did you put display flex on? Is it the box that holds the items? Fix: Move display flex to the parent's rule (the ul, or the div that holds the pictures). / The gallery stays on one very long line, or squashes the pictures. Ask: Does the gallery have flex-wrap wrap and a width? Fix: Add flex-wrap wrap; and a width so the row has an edge to wrap at. / Bullets sit oddly between the menu items. Ask: What removes a list's bullets? Fix: Add list-style none; to the menu's rule. -->

<!-- Speaker note: Teacher: menu first (row, gap, centre), then the gallery (a new rule, with `flex-wrap`). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++.menu+%7B%0A++++list-style%3A+none%3B%0A++%7D%0A++.pic+%7B%0A++++border%3A+1px+solid+gray%3B%0A++++padding%3A+6px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cul+class%3D%22menu%22%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A%3C%2Ful%3E%0A%3Cdiv+class%3D%22gallery%22%3E%0A++%3Cdiv+class%3D%22pic%22%3E%3Cimg+src%3D%22trophy.svg%22+alt%3D%22Trophy%22+width%3D%2270%22%3E%3Cp%3ETrophy%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22pic%22%3E%3Cimg+src%3D%22medal.svg%22+alt%3D%22Medal%22+width%3D%2270%22%3E%3Cp%3EMedal%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22pic%22%3E%3Cimg+src%3D%22book.svg%22+alt%3D%22Book%22+width%3D%2270%22%3E%3Cp%3EBook%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22pic%22%3E%3Cimg+src%3D%22ball.svg%22+alt%3D%22Ball%22+width%3D%2270%22%3E%3Cp%3EBall%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22pic%22%3E%3Cimg+src%3D%22star.svg%22+alt%3D%22Star%22+width%3D%2270%22%3E%3Cp%3EStar%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22pic%22%3E%3Cimg+src%3D%22music.svg%22+alt%3D%22Music%22+width%3D%2270%22%3E%3Cp%3EMusic%3C%2Fp%3E%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/flexbox/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a gallery for a school event: a heading and at least four pictures, with good alt text, in a row that wraps. Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`.

<!-- Speaker note: Hints, in order: A gallery is a parent box with the pictures inside it. Build the box, then make it a wrapping row. / Start with a `<div class="gallery">` holding your pictures, each with alt. / Then a `.gallery` rule: `display: flex;`, `flex-wrap: wrap;`, a `gap` and a `width`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+Your+gallery.+Pictures%3A+trophy.svg%2C+medal.svg%2C+book.svg%2C+ball.svg%2C+star.svg%2C+music.svg+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/flexbox/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Put the club menu in a row

The club's menu is a bulleted list stacked inside a blue bar. Make it a real menu bar: a `.menu` rule that puts the links in a row, removes the bullets, spaces them `24px` apart and centres them. Add `margin: 0;` and `padding: 0;` to tidy the list's own spacing.

<!-- Speaker note: What this step is for: A real menu bar: a list of links made into a centred Flexbox row inside a coloured bar. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Put the club menu in a row

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++.bar+%7B%0A++++background-color%3A+lightblue%3B%0A++++padding%3A+10px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22bar%22%3E%0A++%3Cul+class%3D%22menu%22%3E%0A++++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%3C%2Fli%3E%0A++++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frobots%22%3EOur+robots%3C%2Fa%3E%3C%2Fli%3E%0A++++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++%3C%2Ful%3E%0A%3C%2Fdiv%3E%0A%3Ch1%3ERobotics+Club%3C%2Fh1%3E%0A%3Cp%3EWe+meet+every+Tuesday+at+lunch+in+the+STEM+lab.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/flexbox/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student wants three cards side by side. They write .card { display: flex; } but the cards still stack. What is wrong, and what should they write?**

* display flex is on the items. It goes on the box that holds the cards, for example .cards { display: flex; } with the cards inside a div class cards.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson builds whole pages from named sections and components: a header with a Flexbox menu, a hero, and a row of cards. Flexbox is one of two layout tools; the optional Grid lesson in the final challenge shows the other, for whole-page layouts. Class idea: find three websites and sketch which parts are Flexbox rows (menus, toolbars, galleries). -->
