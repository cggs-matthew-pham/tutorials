---
marp: true
theme: default
html: true
---

# Space out a row

Layout and components · Layout

<!-- Speaker note: Students space a flex row with gap, place its items with justify-content and line them up with align-items, and find out that these go on the row and work in two directions. About 40 minutes (Predict and Run 10 min · Investigate 10 min · Mix it up 4 min · Modify 8 min · Make 8 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** set the space between the items in a row, where the row sits them, and how they line up across it.

- I can use gap to put space between the items in a flex row.
- I can use justify-content to place the items along the row.
- I can use align-items to line the items up across the row.

<!-- Speaker note: Before class: Do the Make task yourself in the playground (about 4 minutes). A **flex row** is a box with `display: flex`: its children (the **items**) sit side by side. `justify-content` works along the row, the way the items run. `align-items` works across it, at right angles, so with a row it means up and down. The common slip is to swap them. All three properties go on the box that holds the items, never on the items. Teacher: Mix it up: margin sits outside every item, gap only between them. Let students draw the bar on paper and mark the gaps. -->

---

## Why it matters

> A menu bar with the logo on the left and the links on the right is one flex row with three properties.

<!-- Speaker note: A flex row puts items side by side, but they all bunch at one end. Three more properties on the same box say where the items go, and how much space sits between them. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**Where do the three items sit along the bar?**

- The words inside each item are spread out and lined up to the right
- All three bunched at the left, with 20px between them
- All three bunched together in the middle of the bar
- Robotics Club at the left end, Join at the right end, and Events between them

<!-- Speaker note: What happens: Robotics Club at the left end, Join at the right end, and Events between them. justify-content places the items along the row. It does not change the text inside an item. align-items: center also puts them halfway down the 100px bar. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students think `justify-content` aligns the words inside each item. Change it to `center` and `flex-end` and watch the whole group slide, with the words unchanged. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Where do they go? <span style="font-size:.6em;color:#64748b">(3 min)</span>

With your partner, point to where Events will sit in the bar.
Then each choose one of the four options and hold up fingers.

<!-- Speaker note: Take a vote before running. Ask a student who chose the last option what they think justify-content does to words. The idea to land: it places the items. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.bar+%7B%0A++++display%3A+flex%3B%0A++++justify-content%3A+space-between%3B%0A++++align-items%3A+center%3B%0A++++gap%3A+20px%3B%0A++++height%3A+100px%3B%0A++++border%3A+2px+solid+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22bar%22%3E%0A++%3Ch2%3ERobotics+Club%3C%2Fh2%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flex-space/?full=step-2#step-2)

<!-- Speaker note: Compare the bar with your prediction. Then change `space-between` to `center`, then to `flex-end`, and watch the whole group move. Change `align-items` to `flex-start`, then `flex-end`, and watch the items move up and down. | Code | What it does | Why | |---|---|---| | `display: flex;` | Puts the items in a row | As in the last lesson, it goes on the box that holds the items | | `justify-content: space-between;` | Sends the first item to the start, the last to the end, and shares the leftover space between them | `justify-content` works along the row, in the direction the items run. Other values: `flex-start`, `center`, `flex-end` | | `align-items: center;` | Centres each item across the row, halfway down the bar | `align-items` works across the row, at right angles to it. The bar is 100px tall, so there is room to see it | | `gap: 20px;` | Puts at least 20px between neighbouring items | `gap` is space between items only, not at the ends. `justify-content` then shares out whatever room is left | | `height: 100px;` | Makes the bar taller than its items | Without spare room across the row, `align-items` has nothing to show | Students should be able to say: I can say which property moves the items along the row and which moves them across it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Robotics Club at the left end, Join at the right end, and Events between them. justify-content places the items along the row. It does not change the text inside an item. align-items: center also puts them halfway down the 100px bar.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: justify-content and align-items are two different directions, and both go on the row, not on the items. -->

<!-- Speaker note: Teacher: the 'up and down' question is the one students get wrong. Ask: which direction does the row run? Then which direction is across it? -->

<style scoped>pre, marp-pre { font-size: 0.68em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the lines

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Match each line with what it does to a flex row.**

| | |
|---|---|
| `justify-content: space-between` | A. all items packed at the end of the row |
| `justify-content: flex-end` | B. the least space between neighbouring items |
| `align-items: center` | C. items centred across the row, halfway down |
| `gap: 20px` | D. first item at the start, last at the end, the rest spread between |

* Answer: justify-content: space-between → D. first item at the start, last at the end, the rest spread between; justify-content: flex-end → A. all items packed at the end of the row; align-items: center → C. items centred across the row, halfway down; gap: 20px → B. the least space between neighbouring items

</div>
</div>

<!-- Speaker note: Two properties set where the items sit: justify-content along the row and align-items across it. gap sets the space between neighbours. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What gets centred

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Each card holds a word. What does justify-content: center centre?**

- The three cards, as a group, along the row
- The word inside each card
- The 12px gap
- The cards, halfway down the row

* Answer: The three cards, as a group, along the row

</div>
</div>

<!-- Speaker note: justify-content places the items, here the cards, along the row. It does not touch the words inside a card. The words move only if the card itself has room around them. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Up and down

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**The star and the club name sit at the top of the 100px bar. Which line centres them up and down?**

- height: 50px;
- align-items: center;
- justify-content: center;
- gap: 50px;

* Answer: align-items: center;

</div>
</div>

<!-- Speaker note: The row runs left to right, so up and down is across it: align-items. justify-content would slide both items to the middle of the row, but leave them at the top. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The gap that does nothing

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

* Answer: line 6

<!-- Speaker note: Line 6 puts gap on each item. gap spaces the items inside a box, so it goes on the row that holds them: .strip { gap: 20px; }. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Space the links:** Put `24px` between the three menu links.
- **Centre the menu:** Move the group of links to the middle of the row.
- **Line up the logo:** The star and the club name sit at the top of the bar. Centre them up and down.

<!-- Speaker note: What this step is for: Spacing a menu with gap, centring it with justify-content, and lining up a logo with align-items: each on the row's rule. Hints, in order: Space between items is a job for the row, not for each link. / Add `gap: 24px;` to the `.menu` rule. / Where the group of links sits along the row: justify-content. / Add `justify-content: center;` to the `.menu` rule. / The star and the name should line up across the bar. Which property works across the row? / Add `align-items: center;` to the `.bar` rule. For students who need more support: Give students the Run page and ask them only to change the word after justify-content, five times, and say what each did. For early finishers: Put the menu in a second flex row of its own, inside the nav, and give it a gap. Then try space-around and space-evenly beside space-between. The hard part, on purpose: Telling along from across. Ask which way the row runs, and which property works in that direction, before telling them. When students get stuck: The items do not move when justify-content is added. Ask: Does the same rule also have display flex? Fix: justify-content and align-items only work on a box that has display flex. Add display flex to the same rule. / align-items: center changes nothing. Ask: Is the row taller than its items? Fix: align-items needs spare room across the row. Give the bar a height, or put the items in a box with more content. / The menu links move apart but the club name does not. Ask: Which box did you put display flex on? Fix: Put it on the header that holds both the name and the menu. The menu links are inside nav, so they are not items of the header. -->

<!-- Speaker note: Teacher: all three tasks are one line added to the row's rule. If a student writes a rule for the links, ask which box holds them. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.menu+%7B%0A++++display%3A+flex%3B%0A++%7D%0A++.bar+%7B%0A++++display%3A+flex%3B%0A++++height%3A+100px%3B%0A++++border%3A+2px+solid+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cnav+class%3D%22menu%22%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frobots%22%3ERobots%3C%2Fa%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%0A%3C%2Fnav%3E%0A%3Cdiv+class%3D%22bar%22%3E%0A++%3Cimg+src%3D%22star.svg%22+alt%3D%22Club+star%22+width%3D%2250%22%3E%0A++%3Ch2%3ERobotics+Club%3C%2Fh2%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flex-space/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

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

<!-- Speaker note: Here is a row of three items with the margin version. What this step is for: Margin is space outside an item's border, gap is space between items in the row: using the box model and a flex row together shows the difference. -->

<style scoped>pre, marp-pre { font-size: 0.64em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**The row gives each item margin: 10px. Another row gives its items no margin and uses gap: 10px. How do they differ?**

- The margin row puts 10px of space inside each item, like padding
- They look the same: margin and gap both add 10px outside every item
- The margin row also has 10px between the first item and the row's border; the gap row has none there
- The gap row has 10px between the first item and the row's border; the margin row has none there

* Answer: The margin row also has 10px between the first item and the row's border; the gap row has none there

<!-- Speaker note: Margin is outside each item's border on every side, so it leaves space at the ends of the row as well. gap sits only between neighbouring items. Between two items, margin on both gives 20px. What this step is for: Margin is space outside an item's border, gap is space between items in the row: using the box model and a flex row together shows the difference. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

The club's header has a name and a menu, one above the other. Make the header a row with the name at the left and the menu at the right, lined up across the bar.

<!-- Speaker note: Hints, in order: There are two items inside the header: the `h1` and the `nav` that holds the links. The row goes on the header. / In `.bar` add `display: flex;`, then the property that puts the first item at one end and the last at the other. / Then `align-items: center;` so the title and the links line up across the bar. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.bar+%7B%0A++++background-color%3A+lightblue%3B%0A++++padding%3A+10px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cheader+class%3D%22bar%22%3E%0A++%3Ch1%3ERobotics+Club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frobots%22%3ERobots%3C%2Fa%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flex-space/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Be the row <span style="font-size:.6em;color:#64748b">(5 min)</span>

Three students stand in a line as a flex row. The class calls out justify-content values and the line moves along the row.
Then call out align-items values and they step forward and back.

<!-- Speaker note: Listen for pupils who mix up the two directions. Ask which way the row runs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A flex row has justify-content: center. Which way do the items move, and what happens to the words inside each item?**

* The group of items moves to the middle of the row. The words stay where they are inside their item.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson makes a row wrap when it runs out of room, so it fits a phone as well as a laptop. Class idea: look at the menu bars of three websites and decide which values of justify-content and align-items they use. -->
