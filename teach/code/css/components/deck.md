---
marp: true
theme: default
html: true
---

# A hero and a row of cards

Layout and components · Layout

<!-- Speaker note: Students build a hero and a row of cards from classes, copy a card's HTML to add another, and find out that one set of rules styles every copy. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Mix it up 5 min · Modify 8 min · Make 12 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build a card once with a class, copy its HTML for every card you need, and let one set of rules style them all.

- I can build a card from tags and a class, and copy it to make another.
- I can explain why a copied card needs no new CSS.
- I can change every card at once by changing one rule.

<!-- Speaker note: Before class: Do the Make task yourself in the playground (about 6 minutes). A **component** here means a chunk of HTML with a class that you copy: a card, or a hero (a big opening section). Nothing new is taught: it is the class, box and flex row from earlier lessons, used on purpose. The idea is that one rule styles every copy, so adding a card is copying HTML. The usual slip is writing a new class and rule for each copy (`card1`, `card2`). It works, but every change has to be made in each rule. Teacher: Mix it up: one card is missing its class and the row cannot wrap. Both are earlier lessons. -->

---

## Why it matters

> A shop shows hundreds of products in the same card: one design, written once, and a copy of the HTML for each product.

<!-- Speaker note: So far you have written the CSS for a page and then the HTML for it. A **component** is a chunk of HTML with a class, written once and copied for every place it is needed. The rules for its class are written once too. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

_The program is 28 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/css/components/?full=step-1#step-1)

**The club adds a fourth card, Drones. How much CSS must you write for it?**

- One line in .card for every card on the page
- None: copy a card's HTML, change its words, and the .card rule styles it
- About five lines: a new rule such as .card4 for the fourth card
- One line in .cards, to make room for a fourth card

<!-- Speaker note: What happens: None. Every card has class="card", so the .card rule already styles a fourth. The wrapping row makes room for it on its own. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to count the lines of CSS they would add. Most say about five. Let them copy a card line and see it styled at once. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Count the lines <span style="font-size:.6em;color:#64748b">(3 min)</span>

With your partner, decide how many lines of CSS you would write for the fourth card.
Hold up 0, 1, 5 or 10 fingers for your answer.

<!-- Speaker note: Take the vote before running. Ask a student who said 5 what the new rule would say, and how it differs from .card. The idea to land: it would say the same. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.hero+%7B%0A++++padding%3A+24px%3B%0A++++background-color%3A+lightblue%3B%0A++%7D%0A++.cards+%7B%0A++++display%3A+flex%3B%0A++++flex-wrap%3A+wrap%3B%0A++++gap%3A+12px%3B%0A++%7D%0A++.card+%7B%0A++++flex%3A+1%3B%0A++++min-width%3A+150px%3B%0A++++padding%3A+16px%3B%0A++++border%3A+1px+solid+gray%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Csection+class%3D%22hero%22%3E%0A++%3Ch1%3ERobotics+Club%3C%2Fh1%3E%0A++%3Cp%3EBuild%2C+code+and+compete+every+Tuesday.%3C%2Fp%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin+us%3C%2Fa%3E%0A%3C%2Fsection%3E%0A%3Cdiv+class%3D%22cards%22%3E%0A++%3Csection+class%3D%22card%22%3E%3Ch2%3ERobots%3C%2Fh2%3E%3Cp%3EBuild+and+test.%3C%2Fp%3E%3C%2Fsection%3E%0A++%3Csection+class%3D%22card%22%3E%3Ch2%3ECoding%3C%2Fh2%3E%3Cp%3EMake+games.%3C%2Fp%3E%3C%2Fsection%3E%0A++%3Csection+class%3D%22card%22%3E%3Ch2%3EDesign%3C%2Fh2%3E%3Cp%3EDraw+a+logo.%3C%2Fp%3E%3C%2Fsection%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/components/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. Then copy one whole `<section class="card">` line, paste it under the last card and change its words. Next, change `gray` in the `.card` rule to `navy`: every card changes together. | Code | What it does | Why | |---|---|---| | `<section class="card">…</section>` | One card: a heading and a paragraph | This is the component. It is plain tags with a class, and the words are the only part that differs between copies | | `.card { … }` | Styles every element with the class `card` | One rule, however many cards. A new copy matches it at once, so adding a card is copying HTML, not writing CSS | | `<div class="cards">` | The box that holds the cards | It has the flex row from the last lesson. `flex-wrap: wrap` makes room for another card on a new line | | `<section class="hero">` | A big opening section | The hero is a component too, with one copy on the page. Its rule `.hero` gives it padding and a background | | `class="card"` and not `card1`, `card2` | Every copy has the same class | A class names a kind of thing. If each copy had its own class, each would need its own rule | Students should be able to say: I can explain why a copied card needs no new CSS. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* None. Every card has class="card", so the .card rule already styles a fourth. The wrapping row makes room for it on its own.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 28 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/css/components/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Copies share one class and one rule. A copy with a different spelling is not styled, and rules kept in one place can restyle every page. -->

<!-- Speaker note: Teacher: the crad typo is silent. Ask what the browser does with a class that no rule matches: it ignores it. The 40-page question shows why the looks live in one place. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The card with no style

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

* Answer: line 9

<!-- Speaker note: Line 9 says crad. The class is card, so the .card rule does not match it. A copy only gets the style if its class is spelt exactly the same. -->

<style scoped>pre, marp-pre { font-size: 0.65em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Rules for every copy

**Mia gave each card its own class and its own rule, and they look right. What goes wrong as the club grows?**

- Nothing: this is the usual way to build cards
- Each new card needs a new rule, and changing the border means changing every rule
- The browser shows an error for classes with numbers
- Only the first card is styled

* Answer: Each new card needs a new rule, and changing the border means changing every rule

<!-- Speaker note: The three rules are identical, so the page repeats itself. With one class, card, and one rule, a new card is only HTML, and a new border colour is one change. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Forty pages

**A school site has 40 pages that all use the same card class, and the rules sit in one file that every page loads. The school changes its colours. What is the best way to update the cards?**

- Edit the border on every card of all 40 pages
- Change the .card rule once in that file, and all 40 pages follow
- Give each card on each page a new class
- Rewrite all 40 pages

* Answer: Change the .card rule once in that file, and all 40 pages follow

<!-- Speaker note: The looks live in the rule, not in the cards. Change the rule once and every copy of the component, on every page that loads the file, follows. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **One change, every card:** Make the border of every card `2px solid navy` by changing the rule once.
- **A copy:** Add a third card with the heading `Drones` by copying one of the others.

<!-- Speaker note: What this step is for: Changing one rule restyles every card, and copying one card adds another with no new CSS. Hints, in order: The border is in the `.card` rule. Change the rule once. / Change the border in `.card` to `border: 2px solid navy;`. / Copy a whole card line and change the words. Do not touch the CSS. / Paste it under the last card and make the heading `Drones`: `<h2>Drones</h2>`. For students who need more support: Give students the Run page and ask them only to add two cards by copying, and change one colour in the rule. For early finishers: Add a second component, a footer with a class, and use it on two pages worth of text. Or give the cards a third kind, card featured, that changes only the border colour. The hard part, on purpose: Believing each copy needs its own rule. Ask what the new card has in common with the others before they write any CSS. When students get stuck: A copied card looks plain. Ask: Does the copy have the same class, spelt the same? Fix: Check class="card" on the copy. A different spelling, such as crad, matches no rule, and the browser shows no error. / The student has .card1, .card2 and .card3 rules. Ask: How many lines of CSS would a tenth card need? Fix: Give every card the class card, keep one .card rule, and delete the numbered ones. / The cards stay in one squashed line. Ask: Does the row wrap, and do the cards have a minimum width? Fix: Add flex-wrap wrap to the .cards rule and a min-width to the .card rule. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.hero+%7B%0A++++padding%3A+24px%3B%0A++++background-color%3A+lightblue%3B%0A++%7D%0A++.cards+%7B%0A++++display%3A+flex%3B%0A++++flex-wrap%3A+wrap%3B%0A++++gap%3A+12px%3B%0A++%7D%0A++.card+%7B%0A++++flex%3A+1%3B%0A++++min-width%3A+150px%3B%0A++++padding%3A+16px%3B%0A++++border%3A+1px+solid+gray%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Csection+class%3D%22hero%22%3E%0A++%3Ch1%3ERobotics+Club%3C%2Fh1%3E%0A++%3Cp%3EBuild%2C+code+and+compete+every+Tuesday.%3C%2Fp%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin+us%3C%2Fa%3E%0A%3C%2Fsection%3E%0A%3Cdiv+class%3D%22cards%22%3E%0A++%3Csection+class%3D%22card%22%3E%3Ch2%3ERobots%3C%2Fh2%3E%3Cp%3EBuild+and+test.%3C%2Fp%3E%3C%2Fsection%3E%0A++%3Csection+class%3D%22card%22%3E%3Ch2%3ECoding%3C%2Fh2%3E%3Cp%3EMake+games.%3C%2Fp%3E%3C%2Fsection%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/components/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

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

<!-- Speaker note: Two things are wrong on this page: one card looks different, and the cards are squashed. What this step is for: Marking an element with the right class and letting a row wrap use two earlier moves together. -->

<style scoped>pre, marp-pre { font-size: 0.6em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a hero and three cards for a club or event you know: a big heading with a line and a link, and three cards with a heading and a line each, in a row that wraps. Then add a fourth card by copying one, and write no new CSS.

<!-- Speaker note: Hints, in order: Start with the hero: one section with a heading, a line and a link, given a class. Then write the rule for that class. / Write one card as `<section class="card">` with an `h2` and a `p`, inside a `<div class="cards">`. Then the `.cards` rule (a wrapping flex row) and the `.card` rule. / When three cards work, copy one and change its words. A fourth card needs no new CSS. -->

<!-- Speaker note: Teacher: let students choose a topic. Check the fourth card was made by copying, with no new rule. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Your+hero+and+cards.+Write+the+hero%2C+three+cards%2C+then+a+fourth.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/components/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Copy and check <span style="font-size:.6em;color:#64748b">(5 min)</span>

Swap pages with a partner. Add a card to their page by copying only HTML, without changing any rule.
Check that it looks like the others.

<!-- Speaker note: Watch for students who start to type CSS. Ask what the new card has that the others have. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A page has ten cards, all class card. How many .card rules does it need, and how do you add an eleventh card?**

* One rule. Copy the HTML of a card, change its words, and the rule already styles it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next is the Course B challenge, which lays out the club page using everything so far. Class idea: look at a shop website and point out the parts that are the same component repeated. -->
