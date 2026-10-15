---
marp: true
theme: default
html: true
---

# Rules and selectors

Structure and style a page · Text and style

<!-- Speaker note: Students write CSS rules in a style block, find out that a tag selector styles every tag of that kind, and that a rule changes how a part looks, not what it is. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 12 min · Mix it up 5 min · Make 13 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** write a CSS rule that styles every tag of one kind, and find out that it changes how they look, not what they are.

- I can write a CSS rule with a selector, a property and a value.
- I can say which elements a tag selector styles, and which it leaves alone.
- I can explain that a rule changes how a part looks, not what it is.

<!-- Speaker note: Before class: Read the unit primer "HTML structure in 5 minutes" (the CSS section) first, then do the Make task yourself. New words: a **rule** is a selector followed by property lines in braces, `p { color: teal; }`. The **selector** (`p`) names a kind of tag; each line is a property, a colon, a value and a semicolon. Colours here are names such as `teal` and `crimson`. The `<style>` block sits at the top of the code for now; where it goes in a whole page comes later. Link to the three layers idea from Digital systems: the words are content, the tags are structure, the rules are presentation. Teacher: Mix it up: the crossed tags need fixing first, then one `strong` rule colours the important words. -->

---

## Why it matters

> Every website you know uses the same HTML tags; CSS is what makes one look nothing like another.

<!-- Speaker note: HTML says what each part of a page *is*. **CSS** says how it looks. CSS rules go in a `<style>` block, which sits at the top of the code for now; a later lesson shows where it goes in a whole page. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<style>
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
```

**How many lines of text turn teal?**

- None: the rule does not say which paragraph to change
- 1: only the first paragraph
- 2: both paragraphs
- 4: every line of text on the page

<!-- Speaker note: What happens: 2: both paragraphs. The rule names the tag p, not one paragraph, so every p changes. The heading is not a p, so it stays black. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students think `p { }` styles only the first paragraph, or that it needs to say which one. A rule names a kind of tag and changes every one. Only the two paragraphs turn teal. Ask a pair that said 1 what in the rule picks the first paragraph, and see if they can find it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++p+%7B%0A++++color%3A+teal%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+Friday.%3C%2Fp%3E%0A%3Ch2%3EWhat+to+bring%3C%2Fh2%3E%0A%3Cp%3EBring+a+hat+and+water.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/selectors/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then change `p` to `h2` and watch the colour move. Add `font-size: 28px;` on a new line under `color: teal;`. | Code | What it does | Why | |---|---|---| | `<style> … </style>` | Holds the rules | The browser reads the rules between these tags and does not show them. For now the block sits at the top | | `p {` | The **selector**: which tag the rule is for | It names a kind of tag, so every `<p>` changes, not just the first. The `{` opens the rule | | `color: teal;` | A **property**, a colon, a **value** and a semicolon | `color` is the text colour. Colours can be names such as `teal`, `navy` or `crimson`. The `;` ends the line | | `font-size: 28px;` | Sets how big the text is | `px` is the unit. Other properties: `font-family: sans-serif;`, `background-color: lightyellow;`, `text-align: center;` | | `}` | Closes the rule | A rule can hold as many property lines as you like | | the `<h1>` and `<h2>` lines | Stay as they were | The rule names `p` only, and the HTML did not change | Students should be able to say: I can explain which elements a rule with the selector p changes. -->

<!-- Speaker note: Teacher: changing the selector from `p` to `h2` moves the colour. That is the whole idea of a selector. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2: both paragraphs. The rule names the tag p, not one paragraph, so every p changes. The heading is not a p, so it stays black.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<style>
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
<p>Races start at 9 am.</p>
```

<!-- Speaker note: What this step is for: A rule names a kind of tag and changes every tag of that kind; it changes how it looks, never what it is. -->

<!-- Speaker note: Teacher: the trace adds a third paragraph. No CSS changes, and the new line is teal. The second question separates look from meaning: a small `<h1>` is still a heading. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Three paragraphs

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
<p>Races start at 9 am.</p>
```

</div>
<div>

**A third paragraph is added to the page. Fill in the colour of each line of text.**

| text | tag | colour |
|---|---|---|
| Sports day | h1 | black |
| Sports day is on Friday. | p | teal |
| What to bring | h2 | ? |
| Bring a hat and water. | p | ? |
| Races start at 9 am. | p | ? |

* Answer: black, teal, teal

</div>
</div>

<!-- Speaker note: The rule picks every p, including one added later, so all three paragraphs are teal. The h1 and h2 are different tags, so the rule leaves them alone. -->

<style scoped>section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Small but still a heading

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
<p>Races start at 9 am.</p>
```

</div>
<div>

**The rule h1 { font-size: 14px; } makes the heading smaller than the paragraphs. Is it still a heading?**

- No: a heading has to be the biggest text on the page
- No: it is just small text now
- Yes, but only until the page is saved
- Yes: the &lt;h1&gt; tag still says it is the main heading; the rule changed only how it looks

* Answer: Yes: the &lt;h1&gt; tag still says it is the main heading; the rule changed only how it looks

</div>
</div>

<!-- Speaker note: The tag says what a part is, and the rule says how it looks. Making an <h1> small does not turn it into a paragraph, and screen readers and search engines still treat it as the main heading. -->

<style scoped>section { font-size: 18px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Change a colour:** Give the heading a different colour.
- **Bigger paragraphs:** Add a rule that makes every paragraph `20px`.
- **A rule for the h2:** Add a rule that gives every `h2` a `lightyellow` background and centred text.
- **Another font:** Add a line to the `p` rule so the paragraphs use `font-family: sans-serif;`.

<!-- Speaker note: What this step is for: Writing rules one at a time: change a value, add a property, add a rule for another tag. Hints, in order: Change only the value after color:, and keep the semicolon. / Add a new rule inside the `<style>` block, below the h1 rule. / p { font-size: 20px; } / A new rule needs a selector, braces and property lines: h2 { ... } / Two property lines in one rule: background-color and text-align. / Add a line inside the p rule, under font-size. Every property line ends with a semicolon. For students who need more support: Give students the Modify starter and do the second task together on the board: the selector, the braces, then one property line. For early finishers: Try font-size: 12px on the h1 and 60px on the p. Then ask whether the h1 is still a heading, and how a screen reader would know. The hard part, on purpose: Believing a rule picks one element. Ask which tag the selector names, and how many of that tag are on the page, before you say. When students get stuck: A rule changes nothing, and there is no error. Ask: Does the selector match a tag in the HTML, and is the rule inside the style block? Fix: Write the selector as the tag name without angle brackets, as in p, and put every rule between <style> and </style>. / Only the first property in a rule works. Ask: Does every property line end with a semicolon? Fix: Add the missing ; after the value, as in color: teal; / The CSS shows on the page as text. Ask: Is the CSS inside <style> and </style>? Fix: Put every rule between <style> and </style> at the top of the page. -->

<!-- Speaker note: Teacher: four small changes. Each property line ends with a semicolon; a missing one makes the rule do less than expected, with no error. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++h1+%7B%0A++++color%3A+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ESwimming+carnival%3C%2Fh1%3E%0A%3Ch2%3EWhen%3C%2Fh2%3E%0A%3Cp%3EThe+carnival+is+on+Thursday.%3C%2Fp%3E%0A%3Ch2%3EWhat+to+bring%3C%2Fh2%3E%0A%3Cp%3EBring+a+towel+and+a+hat.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/selectors/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```html
<style>
  h1 {
    color: navy;
  }
</style>
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</strong></em> on Friday.</p>
<p>Races start at <strong>9 am</strong>.</p>
```

<!-- Speaker note: Sam's notice should have important words in crimson, but the page looks wrong. Fix the tags, then write one rule so every `<strong>` is crimson. What this step is for: Crossed tags give a wrong page with no error, and one rule on a tag changes every tag of that kind. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

The `<style>` block is ready at the top of this concert notice, with no rules. Write three rules: one for `h1`, one for `h2` and one for `p`. Give each a colour, and change at least one font.

<!-- Speaker note: Hints, in order: Start with the rule for `h1`, then add one rule at a time. Check the page after each. / Each rule is a selector, braces, and property lines ending in semicolons. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A%3C%2Fstyle%3E%0A%3Ch1%3ESpring+concert%3C%2Fh1%3E%0A%3Ch2%3EWhen+and+where%3C%2Fh2%3E%0A%3Cp%3EThe+concert+is+on+Wednesday+at+6+pm+in+the+hall.%3C%2Fp%3E%0A%3Ch2%3EWho+is+playing%3C%2Fh2%3E%0A%3Cp%3EThe+Year+7+band%2C+the+choir+and+the+string+group.%3C%2Fp%3E%0A%3Cp%3ETickets+are+free.+Bring+a+friend%21%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/selectors/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Same page, three looks <span style="font-size:.6em;color:#64748b">(5 min)</span>

Without changing the HTML, restyle the notice three ways: calm, loud and sporty. Show your partner.

<!-- Speaker note: Point out that the HTML is the same each time. Ask what stayed the same and what changed. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A rule h2 { color: purple; } is added to a page with four h2 headings. How many turn purple, and is any &lt;h2&gt; changed into something else?**

* All four turn purple, because the selector names the tag. None changes into something else: the tag is still h2, and the rule only changes how it looks.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson is lists: a rule for li styles every item at once. Later, classes let you pick only some tags of a kind. Class idea: restyle the same page three ways (calm, loud, sporty) without changing the HTML. -->
