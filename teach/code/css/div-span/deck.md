---
marp: true
theme: default
html: true
---

# Block and inline boxes

Layout and components · Boxes

<!-- Speaker note: Students find out that block elements start a new line and take the full width while inline ones sit in the line, that div and span are plain boxes for grouping, and that display switches between block and inline. About 40 minutes (Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 5 min · Make 9 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** find out why paragraphs stack while bold words sit in a line, and use div and span to group things you want to style.

- I can say which elements are block and which are inline.
- I can use a span for a few words and a div for a group of elements.
- I can switch an element between block and inline with display.

<!-- Speaker note: Before class: Read the unit primer "Layout and components" first, then do the Make task yourself in the playground (about 5 minutes). A **block** box starts on a new line and takes the full width of its container. An **inline** box sits inside a line of text and is only as wide as its content. `<div>` (block) and `<span>` (inline) are plain boxes: they have no look until a rule styles them. `display: block;` and `display: inline;` swap the kind. This lesson uses background colour to show the width, because box properties such as padding and borders come next lesson. Teacher: Mix it up: the class and the group rule both set the colour. The class wins wherever it is written, and the size comes only from the group rule. -->

---

## Why it matters

> Every menu, card and banner on a website is a plain box that someone decided should stack or sit in a line.

<!-- Speaker note: Some parts of a page start on a new line, like a paragraph. Others sit inside a line of text, like a bold word or a link. Which kind an element is decides how it fills the page. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<style>
  .mark {
    background-color: gold;
  }
</style>
<h2>Sports day</h2>
<p>Races start at <span class="mark">9 am</span> on the oval.</p>
<div class="mark">Bring a hat and water.</div>
<p>Read the <a href="https://example.com/rules">rules</a> first.</p>
```

**Look at the gold background. How wide is it behind 9 am, and behind Bring a hat and water.?**

- Only the words, in both places
- Behind 9 am, only its words. Behind the hat line, the full width of the page
- Behind 9 am, the full width. Behind the hat line, only its words
- The full width of the page, in both places

<!-- Speaker note: What happens: Only the words behind 9 am, and the full width behind the hat line. A span sits inside the line of text. A div is a block: it starts on a new line and takes the full width. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students say the gold hugs the words in both places. The full-width band behind the div is the surprise. Turn on Boxes to show each box. Ask someone who chose the words in both places what the page would look like if the div were only as wide as its words. The idea to land: block means the full width. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.mark+%7B%0A++++background-color%3A+gold%3B%0A++%7D%0A++.stack+%7B%0A++++display%3A+block%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch2%3ESports+day%3C%2Fh2%3E%0A%3Cp%3ERaces+start+at+%3Cspan+class%3D%22mark%22%3E9+am%3C%2Fspan%3E+on+the+oval.%3C%2Fp%3E%0A%3Cdiv+class%3D%22mark%22%3EBring+a+hat+and+water.%3C%2Fdiv%3E%0A%3Cp%3ERead+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frules%22%3Erules%3C%2Fa%3E+first.%3C%2Fp%3E%0A%3Ca+class%3D%22stack%22+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin+the+club%3C%2Fa%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/div-span/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then change `span` to `div` (in the opening and closing tag): `9 am` jumps onto its own line. Change it back. The last link is an inline `<a>`, yet it takes a whole line, because its class sets `display: block;`. Add `display: block;` to the `.mark` rule too: the span now stacks like a div. | Code | What it does | Why | |---|---|---| | `<p>`, `<h2>`, `<div>` | Start on a new line and take the full width | These are **block** boxes. That is why the gold behind the div runs across the page | | `<strong>`, `<a>`, `<span>` | Sit inside a line of text | These are **inline** boxes. They are only as wide as their words, and the gold stops there | | `<span class="mark">9 am</span>` | A plain box inside a line | A `span` has no look of its own. It is for a few words you want to style | | `<div class="mark">…</div>` | A plain block box | A `div` has no look of its own. It is for grouping several elements so you can style them as one | | `display: block;` | Makes any element a block | `display` sets which kind of box an element is. `display: inline;` does the opposite | Students should be able to say: I can say why a div stacks and a span sits in a line. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Only the words behind 9 am, and the full width behind the hat line. A span sits inside the line of text. A div is a block: it starts on a new line and takes the full width.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<div>
  <p>Bring a hat.</p>
  <p>Bring water.</p>
</div>
```

<!-- Speaker note: What this step is for: A div and a span are plain boxes: they group things for styling and add no look; block or inline is about the line. -->

<!-- Speaker note: Teacher: the first question is the misconception, that a div changes the page by itself. Ask what a rule would have to say to see the div. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A div with no rule

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<div>
  <p>Bring a hat.</p>
  <p>Bring water.</p>
</div>
```

</div>
<div>

**A student wraps two paragraphs in a &lt;div&gt; and writes no CSS. What changes on the page?**

- Nothing you can see: a div has no look of its own
- The two paragraphs get a grey background
- The two paragraphs join into one line
- A border appears around the two paragraphs

* Answer: Nothing you can see: a div has no look of its own

</div>
</div>

<!-- Speaker note: A div is a plain box. It changes nothing until a rule styles it. Its use is to group elements so that one rule, or one class, can style them together. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Block or inline?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<div>
  <p>Bring a hat.</p>
  <p>Bring water.</p>
</div>
```

</div>
<div>

**Which three tags sit inside a line of text, instead of starting a new line?**

- &lt;strong&gt;, &lt;a&gt; and &lt;span&gt;
- &lt;p&gt;, &lt;h1&gt; and &lt;div&gt;
- &lt;span&gt;, &lt;div&gt; and &lt;a&gt;
- &lt;h2&gt;, &lt;strong&gt; and &lt;ul&gt;

* Answer: &lt;strong&gt;, &lt;a&gt; and &lt;span&gt;

</div>
</div>

<!-- Speaker note: Inline: strong, em, a, img and span. Block: p, h1 to h6, ul, ol, table and div. A block starts on a new line and takes the full width. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Labels on their own lines:** Each label should sit above its box.
- **Group the paragraphs:** One `<div>` around both paragraphs, and one rule for it.

<!-- Speaker note: What this step is for: display changes how an element fits in the line, and a div groups elements so one rule styles them together. Hints, in order: Labels are inline, so each one sits beside its box. / Add `display: block;` to the `label` rule. / Wrap both paragraphs in one div that has the class. The div needs a closing tag after the second paragraph. / Then write a `.packing` rule with a `background-color`. For students who need more support: Give students the Run page and ask them only to swap span and div and say what moved. For early finishers: Make the three links in a nav stack on their own lines with display: block, then make three paragraphs sit in a line with display: inline. Which is easier to read? The hard part, on purpose: Believing a div adds a look. Ask what the div would have to be told before anything on the page looked different. When students get stuck: The highlight runs across the whole page. Ask: Is the element a span or a div? Fix: Use a span for a few words in a line. A div is a block and takes the full width. / Nothing changes when the div is added. Ask: Is there a rule that names the div or its class? Fix: A div has no look of its own. Give it a class and write a rule for the class. / The span does not stack when display block is added. Ask: Is the display line inside the rule for the span's class? Fix: Put display: block; between the braces of the class rule, with a semicolon. -->

<!-- Speaker note: Teacher: labels are inline, so they run on beside their boxes. `display: block` puts each on its own line. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++label+%7B%0A++++color%3A+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cform%3E%0A++%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++%3Cinput+id%3D%22name%22%3E%0A++%3Clabel+for%3D%22year%22%3EYear%3C%2Flabel%3E%0A++%3Cinput+id%3D%22year%22%3E%0A%3C%2Fform%3E%0A%3Cp%3EBring+a+hat.%3C%2Fp%3E%0A%3Cp%3EBring+water.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/div-span/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```html
<style>
  .alert {
    color: crimson;
  }
  span, div {
    color: navy;
  }
</style>
<div>Bring a hat and water.</div>
<p>Races start at <span>9 am</span> sharp.</p>
```

<!-- Speaker note: The words in the div and in the span should both be crimson and 20px. Right now they are navy and normal size. Change the page so both are crimson and 20px. What this step is for: A class beats a group rule even when the group rule is written below it, and the group rule still adds what the class does not set. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Highlight the most important phrase in this concert notice. Put a `<span>` with the class `highlight` around just those words, and write a `.highlight` rule with a background colour.

<!-- Speaker note: Hints, in order: A span goes around only the words you want to mark, and it takes the class you will style. / Then a `<style>` block with a `.highlight` rule and a `background-color`. -->

<!-- Speaker note: Teacher: the check ticks on a span, a class, a rule for it and a background colour. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESpring+concert%3C%2Fh1%3E%0A%3Cp%3EThe+concert+is+on+Wednesday+at+6+pm+in+the+hall.%3C%2Fp%3E%0A%3Cp%3ETickets+are+free.+Bring+a+friend%21%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/div-span/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Block or inline hunt <span style="font-size:.6em;color:#64748b">(4 min)</span>

Open a news page. Find three block boxes and three inline ones, and say how you know which is which.

<!-- Speaker note: Listen for students who sort by size instead of by whether the box starts a new line. Ask what happens to a word in the middle of a sentence when it is bold. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a gold background on a span reach only its words, and on a div the whole width?**

* A span is inline, so it is only as wide as its words. A div is a block, so it takes the full width of the page.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson gives each box padding, a border and a margin, and works out how wide the box is. Class idea: open a news site and find three block boxes and three inline ones. -->
