---
marp: true
theme: default
html: true
---

# Page sections and components

HTML & CSS · Components and layout

<!-- Speaker note: Students name the parts of a page with header, nav, main, section and footer, and build components (a hero and a row of cards) from tags and rules they already know. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** name the parts of a page with header, nav, main, section and footer, and build components such as a hero and a row of cards.

- I can name the parts of a page with header, nav, main, section and footer.
- I can explain why section tags change nothing you can see, and why they still matter.
- I can build a hero section and a row of cards.
- I can find why cards stack when they should sit in a row.

<!-- Speaker note: Before class: Read the unit primer "Layout and components in 5 minutes", then do the Make task yourself. **Section tags** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) behave exactly like `<div>`. Their value is meaning: screen readers let people jump straight to the menu or the main content, and search engines know which part is which. A **component** is a reusable pattern, such as a **hero** (a big opening section) or a **card** (a box with padding and a border). Nothing new is needed to build them. Teacher: A hero and cards: point out that every rule in the picture is one they already know (padding, background, text-align, display flex). Teacher: Cards that will not line up: the Flexbox misconception from last lesson, in a new place. Ask: which box holds the cards? Teacher: Club homepage: a real rebuild. Several answers are fine as long as the parts are named sensibly. -->

---

## Why it matters

> Every website has the same parts: a top bar, a menu, the content, a footer. Screen readers let people jump straight to each one.

<!-- Speaker note: Real pages are built from named parts, and the parts are built from **components**: patterns made of tags you already know. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<!-- file: before.html -->
<div>
  <h1>Chess club</h1>
</div>
<p>We meet on Wednesdays.</p>
<div>
  <p>Contact: chess@example.com</p>
</div>
<!-- file: after.html -->
<header>
  <h1>Chess club</h1>
</header>
<p>We meet on Wednesdays.</p>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

**after.html swaps the two divs for &lt;header&gt; and &lt;footer&gt;. What changes on the page?**

- The header becomes big and bold
- Nothing you can see
- A menu bar appears
- The footer moves to the bottom of the screen

<!-- Speaker note: What happens: Nothing you can see. &lt;header&gt; and &lt;footer&gt; look exactly like &lt;div&gt;; their names say what each part is. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect `<header>` to look different. It does not: compare the two files, then run it with **Boxes** on to see the named parts. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A%3C%2Fheader%3E%0A%3Cp%3EWe+meet+on+Wednesdays.%3C%2Fp%3E%0A%3Cfooter%3E%0A++%3Cp%3EContact%3A+chess%40example.com%3C%2Fp%3E%0A%3C%2Ffooter%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/sections/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. **Boxes** is on, so you can see the named parts. Switch it off: the page looks like plain boxes. Students should be able to say: I can explain why header and footer change nothing you can see. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Nothing you can see. &lt;header&gt; and &lt;footer&gt; look exactly like &lt;div&gt;; their names say what each part is.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<header>
  <h1>Chess club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
<main>
  <section>
    <h2>This week</h2>
    <p>Practice on Wednesday.</p>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

<!-- Speaker note: What this step is for: Each section tag names one part of a page; components such as a hero and cards are built from tags and rules students already know. Keeping structure in tags and looks in CSS means screen readers can follow the page and one style sheet can restyle a whole site. -->

<!-- Speaker note: Teacher: the match task names each part. For why it matters, ask a student to imagine using a page only by listening to it. -->

<style scoped>pre, marp-pre { font-size: 0.64em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

**Match each tag with the part of the page it names.**

| | |
|---|---|
| `<header>` | A. the main content (one per page) |
| `<nav>` | B. the main menu of links |
| `<main>` | C. the bottom: contact details and small print |
| `<section>` | D. one part of the content, with its own heading |
| `<footer>` | E. the top: the title and often the menu |

* Answer: &lt;header&gt; → E. the top: the title and often the menu; &lt;nav&gt; → B. the main menu of links; &lt;main&gt; → A. the main content (one per page); &lt;section&gt; → D. one part of the content, with its own heading; &lt;footer&gt; → C. the bottom: contact details and small print

<!-- Speaker note: These tags name the parts of a page. They look like div; CSS decides how they look. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why name the parts?

**If &lt;header&gt; looks the same as &lt;div&gt;, why use it?**

- div is no longer allowed
- It moves the part to the top by itself
- It makes the text bigger
- Screen readers and search engines can tell what each part is

* Answer: Screen readers and search engines can tell what each part is

<!-- Speaker note: A screen reader can jump straight to the nav or the main content, and search engines know which part is which. Your code is easier to read too. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A hero and cards

A **hero** is a big opening section: a heading, a line of text and a link. **Cards** are boxes in a row.

```html
<section class="hero">
  <h1>Chess club</h1>
  <p>Think ahead. Every Wednesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<section class="cards">
  <div class="card">...</div>
  <div class="card">...</div>
</section>
```

**This page has a hero and a row of cards. Which rule puts the cards side by side?**

- .cards { display: flex; }
- .card { padding: 12px; }
- .hero { text-align: center; }
- The section tag does it

* Answer: .cards { display: flex; }

<!-- Speaker note: Components are made of what you know: a hero is a section with padding, a background and centred text; the cards are boxes in a Flexbox row. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Cards that will not line up

**The two cards should sit side by side, but they stack, with no error. Click the line in the wrong place.**

```
 1  <style>
 2    .card {
 3      display: flex;
 4      padding: 12px;
 5      border: 2px solid teal;
 6    }
 7  </style>
 8  <section class="cards">
 9    <div class="card">Beginners</div>
10    <div class="card">Players</div>
11  </section>
```

* Answer: line 3

<!-- Speaker note: Line 3 gives display: flex to each card. It belongs on the box that holds the cards: .cards { display: flex; }. -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## One style sheet, many pages

**A school website has 40 pages. Every page uses the same tags for its parts and links to one style sheet, style.css. The school changes its colours. What is the best way to update the site?**

- Change the tags to different ones
- Edit the style on every tag of all 40 pages
- Change the colours once in style.css: every page follows
- Make 40 new pages

* Answer: Change the colours once in style.css: every page follows

<!-- Speaker note: Because the looks live in CSS, not in the tags or the words, one change to the style sheet restyles all 40 pages. The same split helps screen readers: they read the structure (header, nav, main), whatever it looks like. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Name the top:** Make the first part a `<header>`.
- **Add a menu:** Add a `<nav>` with two links inside the header, under the heading.
- **Name the rest:** Make the middle part `<main>` and the last part `<footer>`.
- **Cards in a row:** Put the three cards side by side, with a gap.

<!-- Speaker note: What this step is for: Turning a page of plain divs into named sections, then laying out the cards. Hints, in order: Change the first `<div>` and its `</div>` to `<header>` and `</header>`. / Inside the header, under the heading: `<nav>`, then two links, then `</nav>`. / Links: `<a href="https://example.com/home">Home</a>` / The middle part becomes `<main>`, the last part `<footer>`. / Which box holds the cards? Flexbox goes on that one, the parent, not on each card. / Which box holds the cards? Give it `display: flex;` and a `gap`. For students who need more support: Give students the Modify starter with Boxes on and do the first task together: find the opening and the closing tag, rename both. For early finishers: Make the nav a Flexbox row with a gap, and give the header and footer background colours. Add a second section with a table of results inside main. The hard part, on purpose: Section tags change nothing you can see, which feels like a mistake. Ask what header and footer are for if not looks; Boxes shows the named parts. When students get stuck: The page looks the same after adding header or footer. Ask: Should it look different? Fix: No. Section tags name parts; use CSS to change how they look. / The cards stack instead of sitting in a row. Ask: Which box holds the cards, and does it have display flex? Fix: Give the box that holds the cards (for example .cards) display flex and a gap. / A closing tag such as </header> does not match its opening tag. Ask: When you renamed the div, did you rename its closing tag too? Fix: Change both the opening and the closing tag. -->

<!-- Speaker note: Teacher: rename the parts one at a time with Boxes on, then lay out the cards. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++.card+%7B%0A++++padding%3A+12px%3B%0A++++border%3A+2px+solid+teal%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A%3C%2Fdiv%3E%0A%3Cdiv%3E%0A++%3Ch2%3EGroups%3C%2Fh2%3E%0A++%3Cdiv+class%3D%22cards%22%3E%0A++++%3Cdiv+class%3D%22card%22%3EBeginners%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3EPlayers%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3EChampions%3C%2Fdiv%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%3Cdiv%3E%0A++%3Cp%3EContact%3A+chess%40example.com%3C%2Fp%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/sections/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a hero for a school event: a big heading, one line of text and a link to sign up or get tickets, in a section with padding, a background colour and centred text.

<!-- Speaker note: Hints, in order: Start with `<section class="hero">` holding an `<h1>`, a `<p>` and an `<a>`. / Then a `.hero` rule: padding, a background colour and `text-align: center;`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+Your+hero+section+goes+here%3A+a+%3Csection+class%3D%22hero%22%3E+with+a+heading%2C+a+line+of+text+and+a+link.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/sections/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Rebuild the club homepage

This club homepage is all plain `<div>` boxes. Rebuild it with a `<header>` (put the links in a `<nav>`), a `<main>`, and a `<footer>`. Turn the opening part into a hero section, and put the three cards in a row.

<!-- Speaker note: What this step is for: A real homepage, rebuilt from plain divs into named sections with a hero and a card row. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Rebuild the club homepage

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++.card+%7B%0A++++padding%3A+12px%3B%0A++++border%3A+2px+solid+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv%3E%0A++%3Ch1%3ERobotics+Club%3C%2Fh1%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%0A%3C%2Fdiv%3E%0A%3Cdiv%3E%0A++%3Cdiv%3E%0A++++%3Ch2%3EBuild+robots+every+Tuesday%3C%2Fh2%3E%0A++++%3Cp%3ENo+experience+needed.%3C%2Fp%3E%0A++%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22cards%22%3E%0A++++%3Cdiv+class%3D%22card%22%3ELine+followers%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3ERobot+races%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3EShow+day%3C%2Fdiv%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A%3Cdiv%3E%0A++%3Cp%3EContact%3A+robots%40example.com%3C%2Fp%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/sections/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student swaps &lt;div&gt; for &lt;nav&gt; around a menu, and nothing changes on screen. Did it work? Why?**

* Yes. nav looks like div, but it tells browsers and screen readers that the part is the main menu, so people can jump to it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson is forms: the sign-up part of a page. The final challenge then builds a whole club page from these components. Accessibility: section tags are called landmarks, and they are part of web accessibility guidelines. Class idea: with a screen reader or the browser's accessibility view, compare a page built from divs with one built from section tags. -->
