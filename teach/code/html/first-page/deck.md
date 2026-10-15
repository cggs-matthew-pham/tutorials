---
marp: true
theme: default
html: true
---

# Tags label text

Structure and style a page · Text and style

<!-- Speaker note: Students label text with headings and paragraphs, and find out that the browser ignores line breaks in the code. About 40 minutes (Predict and Run 10 min · Investigate 12 min · Modify 10 min · Make 8 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** label text with tags, and find out that the browser ignores line breaks in your code.

- I can use &lt;h1&gt;, &lt;h2&gt; and &lt;p&gt; to say what each piece of text is.
- I can explain why line breaks in my code do not show on the page.
- I can start a new paragraph with its own &lt;p&gt; and &lt;/p&gt;.

<!-- Speaker note: Before class: Read the unit primer "HTML structure in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes). The surprise for students: pressing Enter in the code does not make a new line on the page. Only a new `<p>` does. A **tag** is a label in angle brackets, like `<p>`. Most tags come in pairs: an opening tag `<p>` and a closing tag `</p>` with a slash, wrapped around the text they label. -->

---

## Why it matters

> Every website you have visited, from your school page to a shop, starts as text with tags like these.

<!-- Speaker note: Every web page is text with **tags** in it. A tag is a label: `<h1>` labels the main heading and `<p>` labels a paragraph. Most tags come in pairs, an opening tag `<p>` and a closing tag `</p>` with a slash, wrapped around the text they label. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h1>Sports day</h1>
<p>Sports day is on Friday.
Bring a hat
and water.</p>
<p>Races start at 9 am.</p>
```

**How many lines of normal text (not counting the heading) will the page show?**

- 2 lines
- 1 line
- 3 lines
- 4 lines, one for each line of text in the code

<!-- Speaker note: What happens: 2 lines. The browser ignores line breaks in the code, so the three lines of the first paragraph join into one. Each &lt;p&gt; starts a new paragraph. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students say 4 lines. The page shows 2, because the browser joins the lines of one paragraph. Let them press Enter in the code and see that nothing changes, then add a `<p>`. Ask one pair from each answer to say why. Most will say 4: that is the idea the lesson turns around. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+Friday.%0ABring+a+hat%0Aand+water.%3C%2Fp%3E%0A%3Cp%3ERaces+start+at+9+am.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/first-page/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then put the cursor after `Bring a hat` and press Enter a few times: the page does not change. Now give `Bring a hat and water.` its own `<p>` and `</p>`, and watch it move to a new line. | Code | What it does | Why | |---|---|---| | `<h1>Sports day</h1>` | Makes the main heading | `<h1>` opens it and `</h1>` closes it. The tag says what the text is; the browser picks the big, bold look | | `<h2>When</h2>` | Makes a smaller heading for one section | `<h1>` to `<h6>` are all headings: the number is the level, and 1 is the biggest | | `<p>Races start at 9 am.</p>` | Makes one paragraph | Each `<p>` starts a new paragraph, with a gap above it | | the three lines inside the first `<p>` | Show as one line | The browser ignores line breaks in the code. Only a new `<p>` starts a new line | Students should be able to say: I can explain why the line breaks in my code did not show on the page. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2 lines. The browser ignores line breaks in the code, so the three lines of the first paragraph join into one. Each &lt;p&gt; starts a new paragraph.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
```

<!-- Speaker note: What this step is for: Tags, not line breaks in the code, decide what the page shows. -->

<!-- Speaker note: Teacher: the match task is about meaning, not looks: `<h1>` means the main heading. The one-line question is the key idea, that the tags decide and not the lines of code. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
```

</div>
<div>

**Match each part of the page with its job.**

| | |
|---|---|
| `<h1>Sports day</h1>` | A. a paragraph |
| `<h2>What to bring</h2>` | B. a heading for one section |
| `<p> … </p>` | C. the main heading of the page |

* Answer: &lt;h1&gt;Sports day&lt;/h1&gt; → C. the main heading of the page; &lt;h2&gt;What to bring&lt;/h2&gt; → B. a heading for one section; &lt;p&gt; … &lt;/p&gt; → A. a paragraph

</div>
</div>

<!-- Speaker note: Each tag says what its text is. The browser chooses the look: big and bold for headings, plain text with a gap for paragraphs. -->

<style scoped>section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## One line of code

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
```

</div>
<div>

**A page has &lt;p&gt;Bring a hat.&lt;/p&gt;&lt;p&gt;Bring water.&lt;/p&gt; all on one line of code. How many paragraphs does the page show?**

- It shows an error
- 2, because there are two &lt;p&gt; tags
- 1, because it is one line of code
- 1, because there is no gap in the code

* Answer: 2, because there are two &lt;p&gt; tags

</div>
</div>

<!-- Speaker note: Tags decide, not lines. Two <p> tags make two paragraphs, even when they are on one line of code. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's notice

**Sam wants Bring a towel. and Races start at 9 am. on separate lines, but the page shows them on one line. Click the line that causes it.**

```
 1  <h1>Swimming carnival</h1>
 2  <p>The carnival is on Thursday.</p>
 3  <p>Bring a towel.
 4  Races start at 9 am.</p>
```

* Answer: line 4

<!-- Speaker note: Line 4 starts a new sentence inside the same paragraph, and the browser ignores the break in the code. End the paragraph with </p> and start the next with <p>. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Change the event:** Make this a notice for a different event on a different day.
- **Two paragraphs:** Split the long paragraph so the date and what to bring are separate.
- **Add two sections:** Add an `<h2>` heading above each paragraph: `When` above the first, `What to bring` above the second.

<!-- Speaker note: What this step is for: Changing a working page one small step at a time, and checking the page after each change. Hints, in order: Change only the words between the tags. Leave the tags as they are. / End the first paragraph with `</p>` after `Friday.` / Then start the second with `<p>` before `Bring`. / A section heading uses `<h2>`, just like `<h1>` but smaller. / Put each `<h2>` on its own line, just above the paragraph it describes. For students who need more support: Give students the Modify starter and ask them only to change the words between the tags, then add one <h2>. Point to the Reference drawer for each tag. For early finishers: Add a third section with an <h2> heading, and try <h3> and <h4> to see what the heading numbers do. The hard part, on purpose: Seeing that line breaks in the code do nothing. Let the Predict surprise land, and ask which tag starts a new line rather than fixing it. When students get stuck: Text the student typed on a new line runs on from the line before. Ask: Which tag starts a new paragraph? Fix: Wrap each paragraph in its own <p> and </p>. Pressing Enter in the code does not change the page. / A tag shows on the page as text, such as <h2 or h2>. Ask: Does every tag have both of its angle brackets? Fix: Every tag needs < and >, and a closing tag needs the slash, as in </h2>. / Everything after a heading is big and bold. Ask: Where does the heading end? Fix: Add the missing closing tag, such as </h2>, straight after the heading words. -->

<!-- Speaker note: Teacher: one change at a time, check the page each time. The Make check ticks when the page uses `<h1>`, `<h2>` and `<p>`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+Friday.+Bring+a+hat+and+water.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/first-page/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Write a notice for an event at your school (a concert, a fair, a match): an `<h1>` title, two sections with `<h2>` headings, and a paragraph in each.

<!-- Speaker note: Hints, in order: Start with the `<h1>` title, then add one section at a time: an `<h2>`, then its `<p>`. / Check the page after each tag you add. If the page looks wrong, look for a tag with a missing `<` or `>`, or a closing tag without its slash. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3EMy+event%3C%2Fh1%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/first-page/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Be the browser <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap notices with a partner. Without running them, point to each paragraph and say where one ends and the next begins.

<!-- Speaker note: Listen for students who point at lines of code instead of at the tags. Ask which tag told them where the paragraph ended. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student presses Enter in the middle of a paragraph in their code, but the page does not change. Why, and how do they start a new line?**

* The browser ignores line breaks in the code. To start a new paragraph, end the first with &lt;/p&gt; and start the next with &lt;p&gt;.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson puts tags inside other tags, so a word can be important inside a paragraph, and finds out what the browser does when a tag is missing. Class idea: show a news website and ask students to spot the headings and paragraphs. -->
