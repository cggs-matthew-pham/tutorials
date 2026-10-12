---
marp: true
theme: default
html: true
---

# Rules and selectors

HTML & CSS · Style

<!-- Speaker note: Students write CSS rules in a style block, learn that a selector picks only the elements that match (by tag, or by class with a dot), and find that a selector that matches nothing is silently ignored. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** style a page with CSS rules, pick elements by tag or by class, and find out why a rule does nothing.

- I can write a CSS rule with a selector, a property and a value.
- I can explain which elements a selector styles, and which it leaves alone.
- I can give an element a class and style only that element.
- I can find why a rule does nothing by checking its selector.

<!-- Speaker note: Before class: Read the unit primer "CSS in 5 minutes" first, then do the Make task yourself. New words: a **rule** is a selector followed by declarations in braces, `p { color: teal; }`. The **selector** (`p`) picks the elements; each **declaration** is a property, a colon, a value and a semicolon. A **class** marks elements in the HTML, `class="note"`, and a dot picks them in the CSS, `.note`. Teacher: The rule that does nothing: `.Notice` versus `class="notice"`. Capitals count, and the browser gives no error. Ask: does the selector match the HTML exactly? Teacher: Mix and match: two rules on one paragraph both apply when they change different things. (If two rules set the same property, the more specific one, or the later one, wins; this course does not need that yet.) -->

---

## Why it matters

> Every website you know uses the same HTML tags; CSS is what makes one look nothing like another.

<!-- Speaker note: HTML says what each part of a page *is*. **CSS** says how it looks. CSS rules go in a `<style>` block at the top of the page. -->

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
<ul>
  <li>Hat</li>
  <li>Water</li>
</ul>
<p>Races start at 9 am.</p>
```

**How many lines of text turn teal?**

<!-- Speaker note: What happens: 2: only the two paragraphs. The heading and the list items are not &lt;p&gt;, so the rule does not pick them. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students expect the whole page to turn teal. Only the two paragraphs do: the heading and list items are not `<p>`. -->

<style scoped>pre, marp-pre { font-size: 0.71em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++p+%7B%0A++++color%3A+teal%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+Friday.%3C%2Fp%3E%0A%3Cul%3E%0A++%3Cli%3EHat%3C%2Fli%3E%0A++%3Cli%3EWater%3C%2Fli%3E%0A%3C%2Ful%3E%0A%3Cp%3ERaces+start+at+9+am.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/selectors/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then change `p` to `li` and watch the colour move to the list. Try `h1` too. Students should be able to say: I can explain what the selector in a rule does. -->

<!-- Speaker note: Teacher: changing the selector from `p` to `li` moves the colour. That is the whole idea of a selector. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2: only the two paragraphs. The heading and the list items are not &lt;p&gt;, so the rule does not pick them.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<style>
  h1 {
    color: navy;
    font-size: 40px;
  }
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

<!-- Speaker note: What this step is for: A rule is a selector plus declarations; a class (with a dot) picks only the elements you marked, and a selector that does not match is silently ignored. A page has three layers: the words (content), the tags (structure) and the CSS (presentation). -->

<!-- Speaker note: Teacher: the match task names the parts of a rule. Then the class: the dot is only in the CSS, never in `class="..."`. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  h1 {
    color: navy;
    font-size: 40px;
  }
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

</div>
<div>

**Match each part of the h1 rule with its job.**

| | |
|---|---|
| `h1` | A. a value: what to change it to |
| `color` | B. a property: what to change |
| `navy` | C. ends each declaration |
| `{ }` | D. hold the declarations of one rule |
| `;` | E. the selector: which elements the rule styles |

* Answer: h1 → E. the selector: which elements the rule styles; color → B. a property: what to change; navy → A. a value: what to change it to; { } → D. hold the declarations of one rule; ; → C. ends each declaration

</div>
</div>

<!-- Speaker note: Selector, then braces. Inside: property, colon, value, semicolon, as many times as you like. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A class

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  h1 {
    color: navy;
    font-size: 40px;
  }
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

</div>
<div>

**Which paragraph does .note { color: crimson; } style?**

- The heading
- Both paragraphs
- Only the one with class="note"
- None: there is no &lt;note&gt; tag

* Answer: Only the one with class="note"

</div>
</div>

<!-- Speaker note: A dot in CSS means a class. .note picks every element marked class="note", and nothing else. The dot is only in the CSS, not in the HTML. -->

<style scoped>section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The rule that does nothing

**Bring a hat should be crimson, but it stays black, and there is no error. Click the line in the CSS that causes it.**

```
 1  <style>
 2    .Notice {
 3      color: crimson;
 4    }
 5  </style>
 6  <p>Sports day is on Friday.</p>
 7  <p class="notice">Bring a hat.</p>
```

* Answer: line 2

<!-- Speaker note: Line 2 says .Notice, but the paragraph's class is notice. Class names must match exactly, capitals included. A selector that matches nothing is simply ignored. -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Mix and match

One rule for two kinds of element (`h1, h2`), a class on a list item, and a paragraph that matches two rules.

```html
<style>
  h1, h2 {
    color: navy;
  }
  p {
    font-size: 20px;
  }
  .note {
    color: crimson;
  }
  .done {
    color: gray;
  }
</style>
<h1>Sports day</h1>
<h2>Events</h2>
<ul>
  <li class="done">Sprint</li>
  <li>Relay</li>
</ul>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix and match

**The last paragraph matches two rules: p (20px) and .note (crimson). What does it look like?**

- Only 20px: the first rule wins
- Black: the two rules cancel out
- Crimson and 20px: both rules apply
- Only crimson: the class rule replaces the p rule

* Answer: Crimson and 20px: both rules apply

<!-- Speaker note: When rules set different properties, every matching rule applies. One rule can also pick several kinds of element at once: h1, h2 { } styles both. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Three layers

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  h1 {
    color: navy;
    font-size: 40px;
  }
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

</div>
<div>

**A web page has three layers. Sort each part of the Sports day page into its layer.**

Groups: Content: the words and pictures · Structure: the tags that say what each part is · Presentation: how it looks

The words Sports day is on Friday. · The words Sprint and Relay · &lt;h1&gt; around the title · &lt;ul&gt; and &lt;li&gt; around the events · h1, h2 { color: navy; } · .note { color: crimson; }

* Answer: The words Sports day is on Friday. → Content: the words and pictures; The words Sprint and Relay → Content: the words and pictures; &lt;h1&gt; around the title → Structure: the tags that say what each part is; &lt;ul&gt; and &lt;li&gt; around the events → Structure: the tags that say what each part is; h1, h2 { color: navy; } → Presentation: how it looks; .note { color: crimson; } → Presentation: how it looks

</div>
</div>

<!-- Speaker note: The words are the content. The tags give it structure: this is a heading, this is a list. The CSS is the presentation. You can change the CSS and the heading is still a heading; you can change the words and the page still looks the same. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Change a colour:** Give the heading a different colour.
- **Bigger paragraphs:** Add a rule that makes every paragraph `20px`.
- **Mark one paragraph:** Give the second paragraph `class="reminder"`, then add a `.reminder` rule with `background-color: lightyellow;`.
- **One rule for two:** Write one rule, `h1, p`, that gives the heading and the paragraphs `font-family: sans-serif;`.

<!-- Speaker note: What this step is for: Writing rules one at a time: change a value, add a rule, mark an element with a class, and group selectors. Hints, in order: Change only the value after color:, and keep the semicolon. / Add a new rule inside the `<style>` block, below the h1 rule. / p { font-size: 20px; } / A class needs two parts that match: a name on the paragraph in the HTML, and a rule for that name in the CSS. / In the HTML: `<p class="reminder">`. In the CSS: .reminder { ... }. / The dot goes in the CSS only. / List both selectors with a comma: h1, p { ... } For students who need more support: Give students the Modify starter and do the second task together on the board: the selector, the braces, then one declaration. For early finishers: Give two different elements the same class (a list item and a paragraph) and style them together. Then give one element two classes, class="note big", and write a rule for each. The hard part, on purpose: A selector that matches nothing fails silently. Ask them to find the element the rule should pick and compare the two letter by letter, dot and capitals included. When students get stuck: A rule changes nothing, and there is no error. Ask: Does the selector match the HTML exactly, including capitals and the dot for a class? Fix: Fix the selector: .note for class="note", p for <p>. / Only the first declaration in a rule works. Ask: Does every declaration end with a semicolon? Fix: Add the missing ; after the value, as in color: teal; / The CSS shows on the page as text. Ask: Is the CSS inside <style> and </style>? Fix: Put every rule between <style> and </style> at the top of the page. -->

<!-- Speaker note: Teacher: four small rules. The last uses `h1, p` to style two kinds of element at once. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++h1+%7B%0A++++color%3A+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ESwimming+carnival%3C%2Fh1%3E%0A%3Cp%3EThe+carnival+is+on+Thursday.%3C%2Fp%3E%0A%3Cp%3EBring+a+towel+and+a+hat.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/selectors/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Style this concert notice your way: at least three rules (for example the heading, the section headings and the paragraphs), and one class that makes the most important line stand out.

<!-- Speaker note: Hints, in order: Start with a `<style>` block above the heading, then add one rule at a time. / Pick one element to stand out: give it a class, and write a rule for that class. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch1%3ESpring+concert%3C%2Fh1%3E%0A%3Ch2%3EWhen+and+where%3C%2Fh2%3E%0A%3Cp%3EThe+concert+is+on+%3Cstrong%3EWednesday%3C%2Fstrong%3E+at+6+pm+in+the+hall.%3C%2Fp%3E%0A%3Ch2%3EWho+is+playing%3C%2Fh2%3E%0A%3Cp%3EThe+Year+7+band%2C+the+choir+and+the+string+group.%3C%2Fp%3E%0A%3Cp%3ETickets+are+free.+Bring+a+friend%21%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/selectors/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Restyle the club notice

Someone styled this notice, and it is hard to read: a tiny yellow heading and pale grey text. Make it easy to read (a dark heading at least `40px`, dark paragraph text), then give the sign-up line a class and a background colour so it stands out.

<!-- Speaker note: What this step is for: Real styling serves the reader: colours and sizes that are easy to read, and a class for what matters most. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Restyle the club notice

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++h1+%7B%0A++++color%3A+yellow%3B%0A++++font-size%3A+12px%3B%0A++%7D%0A++p+%7B%0A++++color%3A+lightgray%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ERobotics+Club%3C%2Fh1%3E%0A%3Cp%3EWe+meet+every+Tuesday+at+lunch+in+the+STEM+lab.%3C%2Fp%3E%0A%3Cp%3ENew+members+are+welcome%3A+no+experience+needed.%3C%2Fp%3E%0A%3Cp%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3ESign+up+here%3C%2Fa%3E%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/selectors/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student writes .Warning { color: red; } but the paragraph with class="warning" stays black. Why, and how do they fix it?**

* The selector does not match: class names are case-sensitive, so .Warning does not pick class="warning". Change the selector to .warning (or the class to Warning).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson is Boxes: every element is a box with padding, a border and margin, and CSS sets each one. Selectors come back later in JavaScript: `document.querySelector('.note')` uses exactly the same selectors. Class idea: restyle the same page three ways (calm, loud, sporty) without changing the HTML. -->
