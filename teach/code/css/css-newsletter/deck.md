---
marp: true
theme: default
html: true
---

# Turn the newsletter into cards

Layout and components · Boxes

<!-- Speaker note: Students read a whole newsletter stylesheet and change just the rule that does each job, using rules that combine, links in a menu, block and inline boxes, and the box. About 45 minutes (Read the stylesheet 8 min · Change one rule 8 min · Menu links 10 min · Cards 12 min · Fix the card 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read a longer stylesheet, find the rule that does a job, and change just that rule.

- I can find the rule in a stylesheet that does a job and change just that rule.
- I can say which rule wins when two rules set the same property.
- I can style the links in a menu with nav a.
- I can give several elements a shared class with padding and a border.

<!-- Speaker note: Before class: This is a review lesson: nothing new is taught, and each step uses ideas from earlier lessons. Do the cards step yourself first (about 5 minutes). The page is a whole document, with the page wrapper from Course A (`<!DOCTYPE html>`, `<head>` with the `<style>` block, `<body>`). Only the `<body>` shows. The stylesheet has a group rule, a tag rule that comes after it, a class rule, and later a descendant rule (`nav a`) and a card class. Students use rules that combine, links in a menu, block and inline boxes, and the box in one page. Teacher: Read the stylesheet: the match is about what each rule changes. For the heading colour, ask which rule comes last and what happens to the property both set. Teacher: Change one rule: the check wants a separate `h2` rule changed. A student who changes the group rule to orange sees the headings stay teal, because the later rule still wins. Teacher: Menu links: ask which links `nav a` picks before they write it. The link in the story must keep its underline. Teacher: Cards: the number is a sum on paper (300 + 40 + 4). Then one class on both sections and one `.card` rule. Teacher: Fix the squashed card: it is the missing unit again, in a whole page. -->

---

## Why it matters

> A stylesheet grows rule by rule, and the skill is finding the one rule that does the job you want to change.

<!-- Speaker note: The newsletter page has grown a stylesheet. Its `<style>` block, in the `<head>` of the page wrapper, now holds several rules, and some of them apply to the same elements. Every step here is a job on that page: read the rules, find the one that does the job, and change only that rule. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Which rule wins? <span style="font-size:.6em;color:#64748b">(3 min)</span>

Look at the two heading rules. With your partner, say what colour the title and the section headings are, and why.

<!-- Speaker note: Listen for the later rule wins. Some will say the first rule. Ask what each rule's selector picks. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Read the stylesheet

_The program is 36 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/css/css-newsletter/?full=step-1#step-1)

<!-- Speaker note: What this step is for: Before changing a stylesheet, say what each rule changes, and which rule wins where two meet. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the rules

**Match each rule with what it changes.**

| | |
|---|---|
| `body { font-family: sans-serif; }` | A. one rule for the title and the section headings |
| `h1, h2 { color: navy; }` | B. the background of the paragraphs marked note |
| `h2 { color: teal; }` | C. the typeface of all the text on the page |
| `.note { background-color: lightyellow; }` | D. a later rule that changes the colour of the section headings only |

* Answer: body { font-family: sans-serif; } → C. the typeface of all the text on the page; h1, h2 { color: navy; } → A. one rule for the title and the section headings; h2 { color: teal; } → D. a later rule that changes the colour of the section headings only; .note { background-color: lightyellow; } → B. the background of the paragraphs marked note

<!-- Speaker note: Each rule has a job. The group rule colours the title and the headings together, and the h2 rule that comes after it changes just the headings. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two rules, one heading

**Both h1, h2 { color: navy; } and h2 { color: teal; } match the Book fair heading. What colour is it?**

- Teal, because the later rule wins where both set the colour
- Navy, because the first rule that matches is the one that counts
- Black, because two rules cancel each other out
- Half navy and half teal

* Answer: Teal, because the later rule wins where both set the colour

<!-- Speaker note: The heading matches both rules. Both set color, and with equal selectors the later rule wins, so the Book fair heading is teal. The title matches only the first rule, so it stays navy. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change one rule



- **The headings:** Make the section headings orange without changing the title.
- **The note:** Make the paragraph marked `note` stand out in `lightpink`.

<!-- Speaker note: What this step is for: To change a job, find the rule that does it: here the h2 rule, not the group rule, and the note rule. Hints, in order: The section headings are teal because of the rule after the group rule. Change that one. / Find `h2 { color: teal; }` and change `teal`. / The rule for the marked paragraph starts with a dot. Change its colour name. For students who need more support: Give students only the Change one rule and Turn the sections into cards steps, and a copy of the page with the class already on both sections. For early finishers: Add a second class, `.featured`, with a different border colour, and put it on the headline section as well as card. Which border wins, and why? The hard part, on purpose: Choosing which rule to change. Ask them to name the job first, then point to the rule that does it before they type. When students get stuck: The headings stay teal after changing a colour. Ask: Which rule comes last for the h2 headings? Fix: Change the h2 rule that comes after the group rule, or the later rule still wins. / Every link on the page lost its underline. Ask: Is the selector nav a, or just a? Fix: Write nav a, with a space, so only links inside the nav change. / The cards do not change. Ask: Does the class name in the tags match the name after the dot exactly? Fix: Use class="card" on each section, and .card in the CSS with a dot. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Change one rule

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21DOCTYPE+html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A++%3Ctitle%3ESchool+newsletter%3C%2Ftitle%3E%0A++%3Cstyle%3E%0A++++body+%7B%0A++++++font-family%3A+sans-serif%3B%0A++++%7D%0A++++h1%2C+h2+%7B%0A++++++color%3A+navy%3B%0A++++%7D%0A++++h2+%7B%0A++++++color%3A+teal%3B%0A++++%7D%0A++++.note+%7B%0A++++++background-color%3A+lightyellow%3B%0A++++%7D%0A++%3C%2Fstyle%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%3Cheader%3E%0A++%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection%3E%0A++++%3Ch2%3ENew+books%3C%2Fh2%3E%0A++++%3Cp%3EThe+library+has+200+new+books+this+term.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection%3E%0A++++%3Ch2%3EBook+fair%3C%2Fh2%3E%0A++++%3Cp+class%3D%22note%22%3EThe+book+fair+starts+on+Monday+in+the+library.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/css-newsletter/?full=step-2#step-2)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Style the menu links



- **Which rule?:** The menu is a `<nav>` of links, and the story has a link of its own.
- **Block or inline?:** Look at how the menu sits on the page.
- **The menu rule:** Add a rule that removes the underline from the menu links and gives them the colour `navy`. The link in the story must keep its underline.

<!-- Speaker note: What this step is for: nav a picks only the links inside the menu; a plain a rule would change the link in the story too. Hints, in order: Write a new rule below the others in the `<style>` block. Its selector is two words. / `nav a { text-decoration: none; }` removes the underline, and the `color` line chooses the link colour. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Style the menu links

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21DOCTYPE+html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A++%3Ctitle%3ESchool+newsletter%3C%2Ftitle%3E%0A++%3Cstyle%3E%0A++++body+%7B%0A++++++font-family%3A+sans-serif%3B%0A++++%7D%0A++++h1%2C+h2+%7B%0A++++++color%3A+navy%3B%0A++++%7D%0A++++h2+%7B%0A++++++color%3A+teal%3B%0A++++%7D%0A++++header+%7B%0A++++++background-color%3A+lightblue%3B%0A++++++padding%3A+16px%3B%0A++++%7D%0A++%3C%2Fstyle%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%3Cheader%3E%0A++%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fevents%22%3EEvents%3C%2Fa%3E%0A++++%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection%3E%0A++++%3Ch2%3ENew+books%3C%2Fh2%3E%0A++++%3Cp%3EThe+library+has+200+new+books+this+term.+See+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Flist%22%3Efull+list%3C%2Fa%3E.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/css-newsletter/?full=step-3#step-3)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Turn the sections into cards



- **Add up a card:** Work out the width before you write any rule.
- **Share a class:** Each section needs the same class, `card`.
- **One rule for the cards:** Write a `.card` rule with `padding` and a `border`. Add `margin` too, so the cards do not touch.

<!-- Speaker note: What this step is for: One class on both sections and one rule for it makes them cards; the width of a card is more than its width property. Hints, in order: A class is an attribute, so it goes inside the opening tag of each `<section>`. / A class rule starts with a dot. Write it in the `<style>` block. / `.card { padding: 16px; border: 2px solid gray; }` -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Turn the sections into cards

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21DOCTYPE+html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A++%3Ctitle%3ESchool+newsletter%3C%2Ftitle%3E%0A++%3Cstyle%3E%0A++++body+%7B%0A++++++font-family%3A+sans-serif%3B%0A++++%7D%0A++++h1%2C+h2+%7B%0A++++++color%3A+navy%3B%0A++++%7D%0A++++h2+%7B%0A++++++color%3A+teal%3B%0A++++%7D%0A++%3C%2Fstyle%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%3Cheader%3E%0A++%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection%3E%0A++++%3Ch2%3ENew+books%3C%2Fh2%3E%0A++++%3Cp%3EThe+library+has+200+new+books+this+term.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection%3E%0A++++%3Ch2%3EBook+fair%3C%2Fh2%3E%0A++++%3Cp%3EThe+book+fair+starts+on+Monday+in+the+library.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/css-newsletter/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Fix the squashed card

_The program is 29 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/css/css-newsletter/?full=step-5#step-5)

<!-- Speaker note: Maya wrote a `.card` rule for the newsletter. The border shows, but the cards look squashed. What this step is for: A size without a unit is ignored, in a whole page just as in a small one. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Fix the squashed card

**Maya's cards have a border, but the words touch it, and there is no error. Click the line that causes it.**

```
 1  <!DOCTYPE html>
 2  <html>
 3  <head>
 4    <title>School newsletter</title>
 5    <style>
 6      body {
 7        font-family: sans-serif;
 8      }
 9      .card {
10        padding: 16;
11        border: 2px solid gray;
12        margin: 16px 0;
13      }
14    </style>
15  </head>
16  <body>
17  <main>
18    <section class="card">
19      <h2>New books</h2>
20      <p>The library has 200 new books this term.</p>
21    </section>
22    <section class="card">
23      <h2>Book fair</h2>
24      <p>The book fair starts on Monday in the library.</p>
25    </section>
26  </main>
27  </body>
28  </html>
```

* Answer: line 10

<!-- Speaker note: Line 10 has no unit. padding: 16 means nothing to the browser, so it ignores the whole line. It needs padding: 16px;. What this step is for: A size without a unit is ignored, in a whole page just as in a small one. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Swap and name the job <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap stylesheets with a partner. Point at each rule and say the job it does, and which elements it changes.

<!-- Speaker note: A student who cannot say what a rule changes is a good prompt to ask what its selector picks. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A page has h1, h2 { color: navy; } and then h2 { color: teal; }. What colour is an h2, and what colour is the h1?**

* The h2 is teal, because the later rule wins where both set the colour. The h1 matches only the first rule, so it is navy.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit is Layout: Flexbox puts boxes in a row, such as a menu. Class idea: ask students to find three cards on a real website and sketch their padding, border and margin. -->
