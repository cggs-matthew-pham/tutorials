---
marp: true
theme: default
html: true
---

# Tags inside tags

Structure and style a page · Text and style

<!-- Speaker note: Students put one tag inside another, close the last one opened first, and find out that the browser guesses silently when tags are missing or cross. About 40 minutes (Predict and Run 10 min · Investigate 12 min · Modify 8 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put one tag inside another, close the last one opened first, and find out that the browser guesses when you get it wrong.

- I can put one tag inside another, such as &lt;em&gt; inside &lt;strong&gt;.
- I can close tags in the right order: the last one opened closes first.
- I can explain that the browser shows no error for a wrong closing tag, only a best guess.

<!-- Speaker note: Before class: Read the unit primer "HTML structure in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes). The idea: **nesting**. Tags go inside other tags like boxes inside boxes, so the tag opened last must be closed first. Turn on **Boxes** in the playground and every tag becomes a box, which shows the nesting. Unlike Python, HTML never stops with an error. A missing or crossed tag gives a page that looks wrong, and the browser says nothing. -->

---

## Why it matters

> A news page puts a link inside a headline inside a box inside a page. Tags inside tags are how every page is built.

<!-- Speaker note: Last lesson each tag stood on its own. A tag can also go **inside** another tag. Two new ones to try: `<strong>` marks important words (the browser makes them bold) and `<em>` marks stressed words (the browser slants them). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h1>Sports day</h1>
<p>Bring <strong>a hat, <em>water</em> and sunscreen</strong> on Friday.</p>
```

**Which words will look both bold and slanted?**

- Only water
- None: a tag cannot go inside another tag
- a hat, water and sunscreen
- Only water, and it loses its bold: the inner tag replaces the outer one

<!-- Speaker note: What happens: Only water. The &lt;em&gt; is inside the &lt;strong&gt;, so water gets both looks. a hat and sunscreen are only inside &lt;strong&gt;, so they are bold but not slanted. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students think only water changes, or that the inner tag cancels the outer one. Turn on Boxes and ask which boxes water sits in. Ask the pairs who chose option 3 why they think the inner tag cancels the outer one. -->

<style scoped>pre, marp-pre { font-size: 0.62em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3EBring+%3Cstrong%3Ea+hat%2C+%3Cem%3Ewater%3C%2Fem%3E+and+sunscreen%3C%2Fstrong%3E+on+Friday.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/html-nesting/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. The Boxes view draws each tag as a box: `<em>` sits inside `<strong>`, which sits inside `<p>`. Then wrap the word `Friday` in `<em>` and `</em>` yourself. | Code | What it does | Why | |---|---|---| | `<strong>a hat</strong>` | Marks important words | The tag says the words matter; the browser picks bold | | `<em>water</em>` | Marks stressed words | The browser picks slanted text | | `<strong>a hat, <em>water</em> and sunscreen</strong>` | One tag inside another | The tag opened last closes first, like boxes inside boxes: `</em>`, then `</strong>`, then `</p>` | | `<strong>a <em>hat</strong></em>` | Tags that cross | No error message appears. The browser makes its best guess, which may not be what you meant, so check the page | | `<!-- a note - ->` | A comment | The browser ignores it, so it is a note to yourself in the code | Students should be able to say: I can say which closing tag comes first when one tag is inside another. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Only water. The &lt;em&gt; is inside the &lt;strong&gt;, so water gets both looks. a hat and sunscreen are only inside &lt;strong&gt;, so they are bold but not slanted.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h1>Sports day</h1>
<p>Bring <strong>a hat and
<em>water</strong> on Friday</em>.</p>
```

<!-- Speaker note: What this step is for: Nesting means the last tag opened closes first; when it does not, the browser guesses and says nothing. -->

<!-- Speaker note: Teacher: the crossing is on one line. Ask which tag was opened last and whether it closed first. The missing `</strong>` trace is the surprise: the bold runs on into the next paragraphs and no message appears. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's notice

**Sam wants a hat and water bold, with water also slanted. The end of the paragraph looks wrong, but nothing reports an error. Click the line where the tags cross.**

```
 1  <h1>Sports day</h1>
 2  <p>Bring <strong>a hat and
 3  <em>water</strong> on Friday</em>.</p>
```

* Answer: line 3

<!-- Speaker note: Line 3 closes </strong> while <em> is still open, so the two tags overlap. The last tag opened must close first: </em>, then </strong>. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## No error message

A closing tag is missing from this page.

```html
<p>Bring a <strong>hat.</p>
<p>Wear sunscreen.</p>
<p>Races start at 9 am.</p>
```

**The first paragraph is missing its &lt;/strong&gt;. Fill in whether each line of text looks bold.**

| text | bold? |
|---|---|
| Bring a | no |
| hat. | yes |
| Wear sunscreen. | ? |
| Races start at 9 am. | ? |

* Answer: yes, yes

<!-- Speaker note: The browser shows no error. It closes the tag at the end of the paragraph, then opens it again in the next ones, so the bold carries on to the end of the page. A missing closing tag changes the page without any warning. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Box it on paper <span style="font-size:.6em;color:#64748b">(4 min)</span>

On paper, write <p>, <strong> and <em> for one sentence. Draw a box around each tag pair. Do any boxes cross?

<!-- Speaker note: Boxes that cross are the bug. Ask which closing tag has to move so every box sits inside another. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Fix the order:** Swap the closing tags so the last one opened closes first.
- **Both at once:** Make the word `Friday` important and stressed, with `<strong>` outside and `<em>` inside.

<!-- Speaker note: What this step is for: Fixing the order of closing tags, then nesting two tags yourself. Hints, in order: `<em>` was opened last, so it must close first. / Swap the two closing tags after `water`: `</em></strong>`. / Put one tag outside and the other inside, and close them in the reverse order. / Close them in reverse order. For students who need more support: Give students the Modify starter and ask only for the first task: swap two closing tags. Use Boxes to show the boxes cross. For early finishers: Put <em> inside <strong> inside <p> inside nothing else, then draw the boxes on paper. Add a comment above each paragraph with <!-- - ->. The hard part, on purpose: Closing tags in the right order. Turn on Boxes and ask which box is inside which, rather than correcting the tags. When students get stuck: Everything after one word is bold or slanted. Ask: Which closing tag is missing? Fix: Add the missing </strong> or </em> straight after the words it should cover. / Bold and slanted words stop in the wrong places. Ask: Which tag did you open last, and did it close first? Fix: Close in reverse order of opening, </em> then </strong>. / A tag shows on the page as text. Ask: Does it have both < and >, and a slash if it is a closing tag? Fix: Every tag needs both brackets, and a closing tag needs the slash. -->

<!-- Speaker note: Teacher: one change at a time, check the page each time. In Boxes, a correct page has every box fully inside another. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3EBring+%3Cstrong%3Ea+hat+and+%3Cem%3Ewater%3C%2Fstrong%3E%3C%2Fem%3E+on+Friday.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/html-nesting/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Finish this school trip notice. Mark the most important words with `<strong>`, and one word inside them with `<em>`, closing `</em>` right before `</strong>`.

<!-- Speaker note: Hints, in order: Pick the words that matter most and wrap them in `<strong>` and `</strong>`. / Inside those words, wrap one word in `<em>` and `</em>`. Close `</em>` before `</strong>`. / Turn on Boxes: every `<em>` box should sit fully inside a `<strong>` box. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESchool+trip%3C%2Fh1%3E%0A%3Ch2%3EWhen%3C%2Fh2%3E%0A%3Cp%3EThe+trip+is+on+Tuesday.+The+bus+leaves+at+8+am+sharp.%3C%2Fp%3E%0A%3Ch2%3EWhat+to+bring%3C%2Fh2%3E%0A%3Cp%3EBring+lunch%2C+a+hat+and+a+water+bottle.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/html-nesting/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student writes &lt;strong&gt;Friday &lt;em&gt;night&lt;/strong&gt;&lt;/em&gt;. What is wrong, and what will the browser say?**

* The tags cross: &lt;em&gt; was opened last so &lt;/em&gt; must come first. The browser says nothing; it makes a best guess and the page may look wrong.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds CSS: a rule can style every tag of one kind at once, and nesting is what lets it colour just the important words. Class idea: show a news website with the page source open and spot tags inside tags. -->
