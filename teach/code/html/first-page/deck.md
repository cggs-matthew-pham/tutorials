---
marp: true
theme: default
html: true
---

# Tags and nesting

HTML & CSS · Structure

<!-- Speaker note: Students label text with tags (headings, paragraphs, strong and em), learn that tags nest like boxes inside boxes, and find out that the browser shows its best guess instead of an error when the code is wrong. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Newsletter 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** label text with tags, put tags inside tags, and see what the browser does with a mistake.

- I can use &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt; and &lt;em&gt; to say what each piece of text is.
- I can explain why line breaks in my code do not show on the page.
- I can close tags in the right order when one tag is inside another.
- I can explain why I check the page after every change.

<!-- Speaker note: Before class: Read the unit primer "HTML structure in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes). The surprise for students: pressing Enter in the code does not make a new line on the page. Only a new `<p>` does. A **tag** is a label in angle brackets, like `<p>`. Most tags come in pairs: an opening tag `<p>` and a closing tag `</p>` with a slash, wrapped around the text they label. Teacher: The broken-nesting task looks fine on screen, which is the point. Ask: if the page looks right, how would we ever know? (Careful reading, and later a checker.) Teacher: The missing-tag question is the big idea of the lesson: the browser never gives an error message, so students must look at the page after every change. Teacher: Newsletter: tell students the first lines (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`) are a standard wrapper they copy for now. Only `<body>` shows on the page. -->

---

## Why it matters

> Every website you have visited, from your school page to a shop, starts as text with tags like these.

<!-- Speaker note: Every web page is text with **tags** in it. A tag like `<h1>` tells the browser what the text *is*, and the browser decides how it looks. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h1>Sports day</h1>
<p>Sports day is on Friday.
Bring a hat
and water.</p>
<p>Races start at <strong>9 am</strong>.</p>
```

**How many lines of normal text (not counting the heading) will the page show?**

<!-- Speaker note: What happens: 2 lines. The browser joins the three lines of the first paragraph into one. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students say 4 lines. The page shows 2, because the browser joins the lines of one paragraph. Let them press Enter in the code and see that nothing changes, then add a `<p>`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+Friday.%0ABring+a+hat%0Aand+water.%3C%2Fp%3E%0A%3Cp%3ERaces+start+at+%3Cstrong%3E9+am%3C%2Fstrong%3E.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/first-page/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then put the cursor after `Bring a hat` and press Enter a few times: the page does not change. Now give `Bring a hat and water.` its own `<p>` and `</p>`, and watch it move to a new line. Students should be able to say: I can explain why the line breaks in my code did not show on the page. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2 lines. The browser joins the three lines of the first paragraph into one.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on <strong>Friday</strong>.</p>
<h2>What to bring</h2>
<p>Bring a hat and <em>lots</em> of water.</p>
```

<!-- Speaker note: `<h2>` is a smaller heading for a section, and `<em>` marks a word you would say with emphasis. What this step is for: Tags open and close around their content, and a tag inside another tag closes first, like boxes inside boxes. -->

<!-- Speaker note: Teacher: the match task is about meaning. `<strong>` means important, not just bold; the browser chooses how it looks. Then nesting: draw boxes inside boxes on the board, and close the inner one first. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on <strong>Friday</strong>.</p>
<h2>What to bring</h2>
<p>Bring a hat and <em>lots</em> of water.</p>
```

</div>
<div>

**Match each part of the page with its job.**

| | |
|---|---|
| `<h1>Sports day</h1>` | A. a paragraph |
| `<h2>What to bring</h2>` | B. a heading for one section |
| `<p> … </p>` | C. a word said with emphasis |
| `<strong>Friday</strong>` | D. an important word |
| `<em>lots</em>` | E. the main heading of the page |

* Answer: &lt;h1&gt;Sports day&lt;/h1&gt; → E. the main heading of the page; &lt;h2&gt;What to bring&lt;/h2&gt; → B. a heading for one section; &lt;p&gt; … &lt;/p&gt; → A. a paragraph; &lt;strong&gt;Friday&lt;/strong&gt; → D. an important word; &lt;em&gt;lots&lt;/em&gt; → C. a word said with emphasis

</div>
</div>

<!-- Speaker note: Each tag says what its text is. The browser chooses the look: big and bold for headings, bold for strong, italic for em. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which closes first?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on <strong>Friday</strong>.</p>
<h2>What to bring</h2>
<p>Bring a hat and <em>lots</em> of water.</p>
```

</div>
<div>

**In &lt;p&gt;Sports day is on &lt;strong&gt;Friday&lt;/strong&gt;.&lt;/p&gt;, which closing tag comes first?**

- &lt;/p&gt;
- The order does not matter
- &lt;/strong&gt;
- They close at the same time

* Answer: &lt;/strong&gt;

</div>
</div>

<!-- Speaker note: <strong> opens inside the paragraph, so it closes first. Tags nest like boxes: the inner box closes before the outer one. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the broken nesting

**This page looks right in the browser, but one line breaks the nesting rule. Click it.**

```
 1  <h1>Sports day</h1>
 2  <p>Sports day is on <strong>Friday</strong>.</p>
 3  <p>Races start at <strong><em>9 am</strong></em>.</p>
 4  <p>Bring a hat and water.</p>
```

* Answer: line 3

<!-- Speaker note: On line 3, <em> opens inside <strong>, so </em> must come before </strong>: <strong><em>9 am</em></strong>. The browser quietly repairs it, which is why the page looks fine. Do not rely on that: other tools may read it differently. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A missing tag

```html
<p>Races start at <strong>9 am.</p>
<p>Bring a hat.</p>
```

**This code forgets one closing tag. What does the browser do?**

- It shows the page exactly as intended
- It shows an error message and stops
- It shows a blank page
- It shows the page, but the second paragraph is bold too

* Answer: It shows the page, but the second paragraph is bold too

<!-- Speaker note: Browsers never stop on a mistake: they show their best guess. The <strong> is never closed, so the bold carries on into the next paragraph. That is why you check the page after every change. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix and match

Tags can go inside each other in many ways: an `<em>` inside a heading, a `<strong>` inside a paragraph, even `<em>` inside `<strong>`.

```html
<h2>Bring <em>lots</em> of water</h2>
<p><strong>Races</strong> start at <em>9 am</em>.</p>
<p>Wear your <strong><em>house colours</em></strong>.</p>
```

**Which of these is nested correctly?**

- &lt;h2&gt;Bring &lt;em&gt;water&lt;/h2&gt;&lt;/em&gt;
- &lt;p&gt;Wear &lt;strong&gt;&lt;em&gt;colours&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;
- &lt;p&gt;Wear &lt;strong&gt;colours&lt;/p&gt;&lt;/strong&gt;
- &lt;p&gt;Wear &lt;strong&gt;&lt;em&gt;colours&lt;/strong&gt;&lt;/em&gt;&lt;/p&gt;

* Answer: &lt;p&gt;Wear &lt;strong&gt;&lt;em&gt;colours&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;

<!-- Speaker note: Any of these tags can go inside the others, in any order you choose. The one rule: whatever opened last closes first. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Change the event:** Make this a notice for a different event on a different day.
- **Add two sections:** Add an `<h2>` heading above each paragraph: `When` above the first, `What to bring` above the second.
- **Emphasise a word:** Give one word in the last paragraph emphasis with `<em>`.

<!-- Speaker note: What this step is for: Changing a working page one small step at a time, and checking the page after each change. Hints, in order: Change only the words between the tags. Leave the tags as they are. / A section heading uses `<h2>`, just like `<h1>` but smaller. / Put each `<h2>` on its own line, just above the paragraph it describes. / Put `<em>` before the word and `</em>` after it, inside the paragraph's `<p>` and `</p>`. For students who need more support: Give students the Modify starter and ask them only to change the words between the tags, then add one <h2>. Point to the Reference drawer for each tag. For early finishers: Add a third section with an <h2> heading, and use both <strong> and <em> in one sentence, nested correctly: <strong><em>very</em></strong>. The hard part, on purpose: Seeing that line breaks in the code do nothing and that tags close in reverse order. Let the Predict surprise land, and ask where each tag ends rather than fixing it. When students get stuck: Everything after one word is bold (or italic). Ask: Where does the <strong> (or <em>) end? Fix: Add the missing closing tag, </strong> or </em>, straight after the words it should cover. / Text the student typed on a new line runs on from the line before. Ask: Which tag starts a new paragraph? Fix: Wrap each paragraph in its own <p> and </p>. Pressing Enter in the code does not change the page. / A tag shows on the page as text, such as <h2 or h2>. Ask: Does every tag have both of its angle brackets? Fix: Every tag needs < and >, and a closing tag needs the slash, as in </h2>. -->

<!-- Speaker note: Teacher: one change at a time, check the page each time. The Make check ticks when the page uses `<h1>`, `<h2>`, `<p>` and `<strong>`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+%3Cstrong%3EFriday%3C%2Fstrong%3E.%3C%2Fp%3E%0A%3Cp%3EBring+a+hat+and+water.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/first-page/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Write a notice for an event at your school (a concert, a fair, a match): an `<h1>` title, two sections with `<h2>` headings, a paragraph in each, and one important word in `<strong>`.

The grey line in the editor is a **comment**: `<!--` and `-->` wrap a note that the browser ignores. Delete it or keep it.

<!-- Speaker note: Hints, in order: Start with the `<h1>` title, then add one section at a time: an `<h2>`, then its `<p>`. / Check the page after each tag you add. If everything turns bold, look for a missing `</strong>`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+Write+your+notice+here.+A+line+like+this+one+is+a+comment%3A+the+browser+ignores+it.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/first-page/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Tidy up a newsletter article

This is a whole page, as a website would store it. The first few lines are the same on every page: `<!DOCTYPE html>`, `<html>`, `<head>` (information about the page, such as the title on the browser tab) and `<body>`. Copy them as they are for now; only what is inside `<body>` shows on the page.

The article came out as one long paragraph. Split it into paragraphs, add an `<h2>` heading for the book fair, and make the most important words `<strong>`.

<!-- Speaker note: What this step is for: A real page is the same tags inside a standard wrapper; only what is in <body> shows on the page. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Tidy up a newsletter article

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21DOCTYPE+html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A++%3Ctitle%3ESchool+newsletter%3C%2Ftitle%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A%3Cp%3EThe+library+has+200+new+books+this+term.%0AGraphic+novels+are+on+the+shelf+by+the+window.%0AThe+book+fair+starts+on+Monday+in+the+library.%0ABring+a+gold+coin+for+the+raffle.%3C%2Fp%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/first-page/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student presses Enter in the middle of a paragraph in their code, but the page does not change. Why, and how do they start a new line?**

* The browser ignores line breaks in the code. To start a new paragraph, end the first with &lt;/p&gt; and start the next with &lt;p&gt;.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds lists and links, and with them attributes (extra information inside a tag, such as a link's address). Headings matter beyond looks: screen readers use them to jump around a page, so a page with real `<h1>` and `<h2>` tags is easier for everyone to use. Class idea: show a news website and ask students to spot the headings and paragraphs. -->
