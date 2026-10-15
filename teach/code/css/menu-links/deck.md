---
marp: true
theme: default
html: true
---

# Style the links in the menu

Layout and components · Rules that combine

<!-- Speaker note: Students pick only the links inside a nav with a descendant selector, and find out that a colour on the nav does not reach the links, and that a space means inside. About 40 minutes (Predict and Run 10 min · Investigate 12 min · Modify 8 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** pick only the links inside the nav, so the menu can look different from the links in the text.

- I can write nav a { } to style only the links inside a nav.
- I can say that a space between selectors means inside.
- I can explain why a colour on the nav does not change the links.

<!-- Speaker note: Before class: Read the unit primer "Layout and components" first, then do the Make task yourself in the playground (about 5 minutes). A **descendant selector** is two selectors with a space between: `nav a` picks every `a` anywhere inside a `nav`. A link keeps its own colour until a rule names it, which is why `nav { color: white; }` leaves the menu blue. `:hover` is shown as a line to copy for now, not taught: it means "while the pointer is over it". -->

---

## Why it matters

> Every site menu looks different from the links in its articles, and one short selector is how it is done.

<!-- Speaker note: A page has links in two places: in the menu at the top, and in the sentences below. A rule on `a` styles both. To change only the menu, the rule has to say where the links are. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<style>
  header {
    background-color: navy;
    color: white;
  }
</style>
<header>
  <h1>Owls club</h1>
  <nav>
    <ul>
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/results">Results</a></li>
    </ul>
  </nav>
</header>
<p>Read the <a href="https://example.com/results">results</a> from last week.</p>
```

**The header is navy and its text colour is white. What colour are the two menu links?**

- Navy, like the header
- Black, like normal text
- Blue, the usual link colour
- White, because the links are inside the header

<!-- Speaker note: What happens: Blue. The white reaches the heading, but a link keeps its own colour until a rule names the link. Blue on navy is hard to read. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students say white. Blue on navy is hard to read, which is the reason menus need their own rule. Add the nav a rule and let them see the link in the paragraph stay blue. Ask someone who chose white why the header's colour would reach the links. The idea to land: a link has its own colour. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++header+%7B%0A++++background-color%3A+navy%3B%0A++++color%3A+white%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EOwls+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul%3E%0A++++++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fresults%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cp%3ERead+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fresults%22%3Eresults%3C%2Fa%3E+from+last+week.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/menu-links/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then add this rule under the `header` rule, and watch the menu links change while the link in the paragraph stays blue. | Code | What it does | Why | |---|---|---| | `header { color: white; }` | Makes the header's own words white | The links inside keep their blue. A link has its own colour, so a rule has to name the link | | `nav a { color: white; }` | Makes the links in the nav white | The space means **inside**: `nav a` picks every `a` that sits within a `nav` | | the link in the paragraph | Stays blue | It is an `a`, but it is not inside a `nav`, so the rule does not pick it | | `nav a:hover { text-decoration: underline; }` | Underlines a menu link while the pointer is over it | `:hover` means "while the pointer is over it". Copy this for now; the colon is part of the selector | Students should be able to say: I can explain why nav a changes the menu links and not the link in the paragraph. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Blue. The white reaches the heading, but a link keeps its own colour until a rule names the link. Blue on navy is hard to read.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<style>
  nav a {
    color: crimson;
  }
</style>
<nav>
  <a href="https://example.com/home">Home</a>
  <a href="https://example.com/results">Results</a>
</nav>
<p>Read the <a href="https://example.com/rules">rules</a>.</p>
<footer>
  <a href="https://example.com/contact">Contact</a>
</footer>
```

<!-- Speaker note: What this step is for: A space means inside: the rule reaches the links in the nav and no others, and it needs the link named, not just the nav. -->

<!-- Speaker note: Teacher: the trace has four links and one rule. The question about the comma is last lesson's group selector, read against the new one: comma means and, space means inside. -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which links change?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  nav a {
    color: crimson;
  }
</style>
<nav>
  <a href="https://example.com/home">Home</a>
  <a href="https://example.com/results">Results</a>
</nav>
<p>Read the <a href="https://example.com/rules">rules</a>.</p>
<footer>
  <a href="https://example.com/contact">Contact</a>
</footer>
```

</div>
<div>

**Fill in the colour of each link. The browser's usual link colour is blue.**

| link | colour |
|---|---|
| Home, in the nav | ? |
| Results, in the nav | ? |
| rules, in the paragraph | ? |
| Contact, in the footer | ? |

* Answer: crimson, crimson, blue, blue

</div>
</div>

<!-- Speaker note: nav a picks only the links inside the nav. The paragraph and the footer are not in the nav, so their links keep the usual blue. The space means inside, not and. -->

<style scoped>section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The selector for the menu

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  nav a {
    color: crimson;
  }
</style>
<nav>
  <a href="https://example.com/home">Home</a>
  <a href="https://example.com/results">Results</a>
</nav>
<p>Read the <a href="https://example.com/rules">rules</a>.</p>
<footer>
  <a href="https://example.com/contact">Contact</a>
</footer>
```

</div>
<div>

**Which rule styles only the links inside the nav?**

- nav, a { }
- nav { } with the link colour set inside it
- a nav { }
- nav a { }

* Answer: nav a { }

</div>
</div>

<!-- Speaker note: A space means inside, so nav a is the links within a nav. A comma, as in nav, a, means and: it styles the nav and every link on the page. a nav is the other way round: a nav inside a link. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## White links that stay blue

**Sam wants white menu links on the navy header. The links are still blue, and there is no error. Click the line that causes it.**

```
 1  <style>
 2    header {
 3      background-color: navy;
 4    }
 5    nav {
 6      color: white;
 7    }
 8  </style>
 9  <header>
10    <nav>
11      <a href="https://example.com/home">Home</a>
12      <a href="https://example.com/results">Results</a>
13    </nav>
14  </header>
```

* Answer: line 5

<!-- Speaker note: Line 5 picks the nav, not its links. The colour reaches the nav's own words, but each link keeps its blue. The selector needs to name the links: nav a. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **No underline in the menu:** The link in the paragraph keeps its underline.
- **Footer links:** Pick only the links inside the `<footer>`.

<!-- Speaker note: What this step is for: The pattern is parent, space, tag: the same shape styles the links in any part of a page. Hints, in order: Add a line inside the `nav a` rule. / `text-decoration: none;` removes the underline. / Use the same shape for the footer: write the part first, then a space, then the tag. / `footer a { color: gray; }` For students who need more support: Give students the Modify starter and do the first task together on the board: the part first, then a space, then the tag. For early finishers: Use nav a:hover with a background-color to make a link light up when the pointer is over it. Copy the line from the Run table and change it. The hard part, on purpose: Reading nav a as both. Ask which of the two words names the element that changes, and what the first word does. When students get stuck: The menu links do not change. Ask: Does the rule name the links, or only the nav? Fix: Write nav a { color: white; } with a space between nav and a. A rule on the nav alone leaves the links blue. / Every link on the page changes. Ask: Is there a comma between nav and a, or only the a? Fix: Use a space, not a comma, and keep the nav in front of the a. / The menu is dark text on the dark header. Ask: Which rule sets the link colour? Fix: Add color: white; to the nav a rule, or pick a light colour such as lightyellow. -->

<!-- Speaker note: Teacher: the same shape for the footer. The Make check ticks on a header rule, a background colour and the nav a rule. Look at the page for the paragraph link staying blue. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++header+%7B%0A++++background-color%3A+navy%3B%0A++++color%3A+white%3B%0A++%7D%0A++nav+a+%7B%0A++++color%3A+white%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EOwls+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fresults%22%3EResults%3C%2Fa%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cp%3ERead+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fresults%22%3Eresults%3C%2Fa%3E+from+last+week.%3C%2Fp%3E%0A%3Cfooter%3E%0A++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fcontact%22%3EContact+us%3C%2Fa%3E%0A%3C%2Ffooter%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/menu-links/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Style this club page: a dark header, light menu links that fit it, and the link in the text left as it is.

<!-- Speaker note: Hints, in order: Start with the header: one rule for the navy background and white text. / Then a rule for the menu links only. The link in the paragraph must not change. / Add `text-decoration: none;` to the menu links, or `list-style: none;` on the `ul` if you want no bullets. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cheader%3E%0A++%3Ch1%3EOwls+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fresults%22%3EResults%3C%2Fa%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cp%3ERead+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fresults%22%3Eresults%3C%2Fa%3E+from+last+week.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/menu-links/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Which links change? <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap pages with a partner. Without running them, point to every link that your partner's menu rule changes, and every one it leaves alone.

<!-- Speaker note: Listen for students who include the links in the text. Ask what the space in the selector means. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A page has a link in the nav and a link in a paragraph. Which does nav a { color: white; } change?**

* Only the link in the nav. The space means inside, so the link in the paragraph is not picked.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson looks at why some elements start a new line and others sit in a line, which a menu needs to run across the page. Class idea: find three menus on websites you use and say what colour their links are. -->
