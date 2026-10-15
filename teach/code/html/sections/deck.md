---
marp: true
theme: default
html: true
---

# Name the parts of a page

Structure and style a page · Parts of a page

<!-- Speaker note: Students name the parts of a page with header, nav, main, section and footer, and learn that the names change nothing you can see but help screen readers and search engines. About 40 minutes (Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 4 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** name the top, menu, content and bottom of a page with header, nav, main, section and footer, and find out why they change nothing you can see.

- I can name the top, menu, content and bottom of a page with header, nav, main, section and footer.
- I can explain why these tags change nothing you can see, and why they still matter.
- I can put a list of links inside a nav.

<!-- Speaker note: Before class: Do the Make task yourself (about 5 minutes). **Section tags** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) add no look of their own. Their value is meaning: screen readers let people jump straight to the menu or the main content, and search engines know which part is which. Students expect a header to look like a header; **Boxes** shows the named parts and the plain page side by side. Teacher: Mix it up: two slips on one page, one in a rule and one in the menu. Ask which line each would change before they click. -->

---

## Why it matters

> Every website has the same parts: a top bar, a menu, the content, a footer. Screen readers let people jump straight to each one.

<!-- Speaker note: Most pages are built from the same parts: a top, a menu, the content and a bottom. Five tags give those parts their names, and the tags you already know go inside them. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

_The program is 29 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/html/sections/?full=step-1#step-1)

**after.html wraps the same words in header, nav, main, section and footer tags. What changes on the page?**

- The list of links turns into a row menu
- Nothing you can see
- The footer moves to the bottom of the screen
- The header and footer get coloured bars

<!-- Speaker note: What happens: Nothing you can see. These tags look like no tag at all; their names say what each part is. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect something to change. Compare the two files, then run it with **Boxes** on to see the named parts, and off to see nothing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## What will change? <span style="font-size:.6em;color:#64748b">(3 min)</span>

Compare the two files with your partner. Decide what changes on the page, then vote.

<!-- Speaker note: Most will pick a coloured bar or a row menu. Run it and keep the vote on the board: the surprise is the lesson. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul%3E%0A++++++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frules%22%3ERules%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection%3E%0A++++%3Ch2%3EWhen+we+meet%3C%2Fh2%3E%0A++++%3Cp%3EWednesdays+at+lunch.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A%3Cfooter%3E%0A++%3Cp%3EContact+the+teacher+in+charge.%3C%2Fp%3E%0A%3C%2Ffooter%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/sections/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. **Boxes** is on, so you can see the named parts. Switch it off: the page looks like plain text. | Code | What it does | Why | |---|---|---| | `<header> … </header>` | Names the top of the page | Usually the site name and the menu. It looks like plain text; the name is the point | | `<nav> … </nav>` | Names the main menu of links | The links inside are an ordinary list. `nav` does not turn them into a bar | | `<main> … </main>` | Names the main content | One per page. A screen reader can jump straight past the menu to it | | `<section> … </section>` | Names one part of the content | Usually starts with its own heading | | `<footer> … </footer>` | Names the bottom of the page | Contact details and small print | | nothing looks different | The names are not for the eye | Screen readers and search engines use them to find each part. Looks come from rules, as for any other tag | Students should be able to say: I can explain why these tags change nothing you can see. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Nothing you can see. These tags look like no tag at all; their names say what each part is.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/rules">Rules</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>When we meet</h2>
    <p>Wednesdays at lunch.</p>
  </section>
</main>
<footer>
  <p>Contact the teacher in charge.</p>
</footer>
```

<!-- Speaker note: What this step is for: Each tag names one part of a page, and naming is for screen readers and search engines, not for looks. -->

<!-- Speaker note: Teacher: the match task names each part. For why it matters, ask a student to imagine using a page only by listening to it. -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

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

<!-- Speaker note: These tags name the parts of a page. They add no look of their own; rules decide how each part looks. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why name the parts?

**If &lt;header&gt; looks the same as no tag at all, why use it?**

- It makes the text bigger
- It moves the part to the top of the page by itself
- Screen readers and search engines can tell what each part is
- The page will not load without it

* Answer: Screen readers and search engines can tell what each part is

<!-- Speaker note: A screen reader can jump straight to the menu or the main content, and a search engine knows which part is which. Your code is easier to read too. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Name the bottom:** Put the contact line in a `<footer>`.
- **Name the menu:** Put the list of links in a `<nav>`. Turn Boxes on and off: the page looks the same.
- **Name the content:** Put the heading `When we meet` and its paragraph in a `<section>`, and the section in a `<main>`.

<!-- Speaker note: What this step is for: Wrap the right words in the right named tag: the page looks the same, but its parts now have names. Hints, in order: The contact line is at the bottom of the page. Which tag names the bottom? / Put `<footer>` before the contact paragraph and `</footer>` after it. / The list of links is the menu. Which tag names the main menu? / Put `<nav>` before the `<ul>` and `</nav>` after its closing `</ul>`. / `<main>` goes around the content, and `<section>` goes around one part of it, inside the main. / Put the `<h2>` and its paragraph inside a section, and the section inside a main. For students who need more support: Give students the Make starter with Boxes on and do the first part together: find the title and the list of links, and put them in a header. For early finishers: Add a second section with its own heading, and a rule that gives the header and the footer different background colours. The hard part, on purpose: Section tags change nothing you can see, which feels like a mistake. Ask what header and footer are for if not looks; Boxes shows the named parts. When students get stuck: The page looks the same after adding header or footer. Ask: Should it look different? Fix: No. Section tags name parts; rules change how they look. / A closing tag such as </header> does not match its opening tag. Ask: Did you close the part you opened last? Fix: Close tags in the reverse order you opened them, so each part sits whole inside the next. / The links are not in a list, or sit outside the nav. Ask: Is the <ul> inside the <nav>? Fix: Put the whole <ul> between <nav> and </nav>. -->

<!-- Speaker note: Teacher: footer first, then nav, then main with a section inside. With Boxes on, ask which box each part sits in. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3EChess+club%3C%2Fh1%3E%0A%3Cul%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frules%22%3ERules%3C%2Fa%3E%3C%2Fli%3E%0A%3C%2Ful%3E%0A%3Ch2%3EWhen+we+meet%3C%2Fh2%3E%0A%3Cp%3EWednesdays+at+lunch.%3C%2Fp%3E%0A%3Cp%3EContact+the+teacher+in+charge.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/sections/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

_The program is 28 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/html/sections/?full=step-5#step-5)

<!-- Speaker note: Two slips, one in the CSS and one in the menu. What this step is for: A page's parts hold lists and links, and rules colour them: a slip in any one shows. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**The header should be navy with white text, but its words have vanished. Also, Rules should be a link, but nothing happens when you click it. Which two changes fix both?**

- Write background-color in the header rule, and put the word Rules between &lt;a&gt; and &lt;/a&gt;
- Write header as .header in the rule, and put the word Rules between &lt;a&gt; and &lt;/a&gt;
- Write background-color in the header rule, and put an href on the &lt;li&gt; tag
- Add a semicolon after navy, and put the address between &lt;a&gt; and &lt;/a&gt;

* Answer: Write background-color in the header rule, and put the word Rules between &lt;a&gt; and &lt;/a&gt;

<!-- Speaker note: The browser ignores a property it does not know, so the header stays white and the white words vanish. The words people click go between <a> and </a>; here they sit outside an empty link. What this step is for: A page's parts hold lists and links, and rules colour them: a slip in any one shows. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

This club homepage is all plain text. Name its parts with `<header>`, `<nav>` (around the list of links), `<main>` with one `<section>`, and `<footer>`. Then change the words to a club of your own.

<!-- Speaker note: Hints, in order: The title and the list of links go in `<header>`, with the list inside a `<nav>`. / The heading and the paragraph about Tuesdays go in `<main>`, inside a `<section>`. The contact line goes in `<footer>`. / Every opening tag needs its closing tag. Boxes shows whether your parts nest the way you meant. -->

<!-- Speaker note: Teacher: several answers are fine as long as the parts nest sensibly. A link list goes inside `<nav>`, and the `<nav>` inside the `<header>`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ERobotics+Club%3C%2Fh1%3E%0A%3Cul%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fli%3E%0A++%3Cli%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A%3C%2Ful%3E%0A%3Ch2%3EBuild+robots+every+Tuesday%3C%2Fh2%3E%0A%3Cp%3ENo+experience+needed.%3C%2Fp%3E%0A%3Cp%3EContact%3A+robots%40example.com%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/sections/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Label a real page <span style="font-size:.6em;color:#64748b">(5 min)</span>

Open a school or club website. Sketch it as boxes and write which of header, nav, main, section and footer each box would be.

<!-- Speaker note: Look for the menu inside the top part, and for pages where the footer holds the contact details. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student wraps a menu in &lt;nav&gt; and nothing changes on screen. Did it work? Why?**

* Yes. nav looks like no tag at all, but it tells browsers and screen readers that the part is the main menu, so people can jump to it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson uses these parts: a menu in the nav that jumps to each section of a long page. Accessibility: these tags are called landmarks, and they are part of web accessibility guidelines. Class idea: compare a page built from these parts with one built from plain text, using a screen reader or the browser's accessibility view. -->
