---
order: 3
unit: text
node: AC9TDI10K02 n1
moveId: css-rule
reviews: [nesting]
introduces: [style-block, css-rule, text-colour, font]
assumes: [heading, paragraph, emphasis]
title: Rules and selectors
summary: Write a CSS rule that styles every tag of one kind, and find out that it changes how they look, not what they are.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8128
  url: http://127.0.0.1:8128/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "A rule names a tag, then sets how every one of them looks"
  clip:
    - caption: "A rule starts with a selector. p picks every paragraph."
    - type: { into: HTML code, text: "  p {\n", after: "<style>\n" }
    - caption: "Inside the braces: a property, a colon, a value, a semicolon."
    - type: { into: HTML code, text: "    color: teal;\n  }\n", after: "  p {\n" }
    - caption:
        text: "Both paragraphs turn teal. The heading is not a p, so it stays as it was."
        say: "Both paragraphs turn teal. The heading isn't a P, so it stays."
    - expect: { selector: "#preview-text", contains: "Races start at 9 am." }
    - wait: 1800
    - caption: "Another rule styles the heading. The HTML does not change."
    - type: { into: HTML code, text: "  h1 {\n    color: navy;\n    font-size: 40px;\n  }\n", after: "<style>\n" }
    - wait: 2000
hook: "Every website you know uses the same HTML tags; CSS is what makes one look nothing like another."
---
HTML says what each part of a page *is*. **CSS** says how it looks. CSS rules go in a `<style>` block, which sits at the top of the code for now; a later lesson shows where it goes in a whole page.

## Predict

```step
stage: predict
code: page.html#teal
insight: "Many students expect a rule to style one element, the first it meets; a rule names a kind of tag and styles every one of them."
check:
  type: predict
  q: "How many lines of text turn teal?"
  options:
    - "2: both paragraphs"
    - "1: only the first paragraph"
    - "4: every line of text on the page"
    - "None: the rule does not say which paragraph to change"
  fault: logic
  misconception: rule-styles-one
  actual: "2: both paragraphs. The rule names the tag p, not one paragraph, so every p changes. The heading is not a p, so it stays black."
```

`p { color: teal; }` is a **rule**. Read the code. How many lines of text will turn teal?

## Run

```step
stage: run
code: page.html#teal
try: { playground: html, starter: "page.html#teal", height: 400 }
insight: "The selector names a kind of tag, and the rule styles every tag of that kind."
check: { type: reflect, text: "I can explain which elements a rule with the selector p changes." }
unlocks: [rule]
```

Compare the page with your prediction. Then change `p` to `h2` and watch the colour move. Add `font-size: 28px;` on a new line under `color: teal;`.

| Code | What it does | Why |
|---|---|---|
| `<style> … </style>` | Holds the rules | The browser reads the rules between these tags and does not show them. For now the block sits at the top |
| `p {` | The **selector**: which tag the rule is for | It names a kind of tag, so every `<p>` changes, not just the first. The `{` opens the rule |
| `color: teal;` | A **property**, a colon, a **value** and a semicolon | `color` is the text colour. Colours can be names such as `teal`, `navy` or `crimson`. The `;` ends the line |
| `font-size: 28px;` | Sets how big the text is | `px` is the unit. Other properties: `font-family: sans-serif;`, `background-color: lightyellow;`, `text-align: center;` |
| `}` | Closes the rule | A rule can hold as many property lines as you like |
| the `<h1>` and `<h2>` lines | Stay as they were | The rule names `p` only, and the HTML did not change |

## Investigate

```step
stage: investigate
code: page.html#third
insight: "A rule names a kind of tag and changes every tag of that kind; it changes how it looks, never what it is."
tasks:
  - check:
      type: trace
      text: "A third paragraph is added to the page. Fill in the colour of each line of text."
      table: |
        | text | tag | colour |
        | Sports day | h1 | black |
        | Sports day is on Friday. | p | teal |
        | What to bring | h2 | [black] |
        | Bring a hat and water. | p | [teal] |
        | Races start at 9 am. | p | [teal] |
      fault: logic
      misconception: rule-styles-one
      explain: "The rule picks every p, including one added later, so all three paragraphs are teal. The h1 and h2 are different tags, so the rule leaves them alone."
  - check:
      type: question
      code: page.html#small
      q: "The rule h1 { font-size: 14px; } makes the heading smaller than the paragraphs. Is it still a heading?"
      options:
        - "Yes: the <h1> tag still says it is the main heading; the rule changed only how it looks"
        - "No: it is just small text now"
        - "No: a heading has to be the biggest text on the page"
        - "Yes, but only until the page is saved"
      answer: 0
      fault: logic
      misconception: looks-is-structure
      explain: "The tag says what a part is, and the rule says how it looks. Making an <h1> small does not turn it into a paragraph, and screen readers and search engines still treat it as the main heading."
```

### Three paragraphs

A new paragraph appears at the end of the page. Which lines does the rule colour?

### Small but still a heading

Look at the rule for `h1`.

## Modify

```step
stage: modify
insight: "Writing rules one at a time: change a value, add a property, add a rule for another tag."
try: { playground: html, starter: "page.html#modify", height: 440 }
tasks:
  - hint: "Change only the value after color:, and keep the semicolon."
    check: { type: reflect, text: "I changed the heading's colour." }
    expected: page.html#sol-colour
  - hint:
      - "Add a new rule inside the `<style>` block, below the h1 rule."
      - "p { font-size: 20px; }"
    check: { type: code, text: "Add a rule that makes the paragraphs 20px.", rules: { contains: ["p {", "font-size: 20px;"] } }
    expected: page.html#sol-size
  - hint:
      - "A new rule needs a selector, braces and property lines: h2 { ... }"
      - "Two property lines in one rule: background-color and text-align."
    check: { type: code, text: "Add a rule that gives the h2 headings a lightyellow background and centred text.", rules: { contains: ["h2 {", "background-color: lightyellow;", "text-align: center;"] } }
    expected: page.html#sol-h2
  - hint: "Add a line inside the p rule, under font-size. Every property line ends with a semicolon."
    check: { type: code, text: "Make the paragraphs use font-family: sans-serif.", rules: { contains: ["font-family: sans-serif;"] } }
    expected: page.html#sol-font
```

### Change a colour

Give the heading a different colour.

### Bigger paragraphs

Add a rule that makes every paragraph `20px`.

### A rule for the h2

Add a rule that gives every `h2` a `lightyellow` background and centred text.

### Another font

Add a line to the `p` rule so the paragraphs use `font-family: sans-serif;`.

## Mix it up

```step
stage: investigate
code: page.html#review
try: { playground: html, starter: "page.html#review", height: 400 }
insight: "Crossed tags give a wrong page with no error, and one rule on a tag changes every tag of that kind."
check:
  type: code
  text: "Fix the tags so they nest, then add one rule that colours all the important words."
  rules: { contains: ["water</em></strong>", "strong {"] }
expected: page.html#sol-review
```

Sam's notice should have important words in crimson, but the page looks wrong. Fix the tags, then write one rule so every `<strong>` is crimson.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460 }
hint:
  - "Start with the rule for `h1`, then add one rule at a time. Check the page after each."
  - "Each rule is a selector, braces, and property lines ending in semicolons."
check:
  type: code
  text: "Style the concert notice with a rule for h1, one for h2 and one for p."
  rules: { tags: [style], contains: ["h1 {", "h2 {", "p {"] }
expected: page.html#sol-make
```

The `<style>` block is ready at the top of this concert notice, with no rules. Write three rules: one for `h1`, one for `h2` and one for `p`. Give each a colour, and change at least one font.

```teacher
summary: Students write CSS rules in a style block, find out that a tag selector styles every tag of that kind, and that a rule changes how a part looks, not what it is.
time: 50
timing: "Predict and Run 10 min · Investigate 10 min · Modify 12 min · Mix it up 5 min · Make 13 min"
goals:
  - I can write a CSS rule with a selector, a property and a value.
  - I can say which elements a tag selector styles, and which it leaves alone.
  - I can explain that a rule changes how a part looks, not what it is.
before: |
  Read the unit primer "HTML structure in 5 minutes" (the CSS section) first, then do the Make task yourself.

  New words: a **rule** is a selector followed by property lines in braces, `p { color: teal; }`. The **selector** (`p`) names a kind of tag; each line is a property, a colon, a value and a semicolon. Colours here are names such as `teal` and `crimson`. The `<style>` block sits at the top of the code for now; where it goes in a whole page comes later.

  Link to the three layers idea from Digital systems: the words are content, the tags are structure, the rules are presentation.
running:
  - "Predict: some students think `p { }` styles only the first paragraph, or that it needs to say which one. A rule names a kind of tag and changes every one. Only the two paragraphs turn teal. Ask a pair that said 1 what in the rule picks the first paragraph, and see if they can find it."
  - "Run: changing the selector from `p` to `h2` moves the colour. That is the whole idea of a selector."
  - "Investigate: the trace adds a third paragraph. No CSS changes, and the new line is teal. The second question separates look from meaning: a small `<h1>` is still a heading."
  - "Modify: four small changes. Each property line ends with a semicolon; a missing one makes the rule do less than expected, with no error."
  - "Mix it up: the crossed tags need fixing first, then one `strong` rule colours the important words."
stuck:
  - see: A rule changes nothing, and there is no error.
    ask: Does the selector match a tag in the HTML, and is the rule inside the style block?
    fix: "Write the selector as the tag name without angle brackets, as in p, and put every rule between <style> and </style>."
  - see: Only the first property in a rule works.
    ask: Does every property line end with a semicolon?
    fix: "Add the missing ; after the value, as in color: teal;"
  - see: The CSS shows on the page as text.
    ask: Is the CSS inside <style> and </style>?
    fix: Put every rule between <style> and </style> at the top of the page.
stretch: "Try font-size: 12px on the h1 and 60px on the p. Then ask whether the h1 is still a heading, and how a screen reader would know."
support: "Give students the Modify starter and do the second task together on the board: the selector, the braces, then one property line."
leads: "Next lesson is lists: a rule for li styles every item at once. Later, classes let you pick only some tags of a kind. Class idea: restyle the same page three ways (calm, loud, sporty) without changing the HTML."
exit:
  q: "A rule h2 { color: purple; } is added to a page with four h2 headings. How many turn purple, and is any <h2> changed into something else?"
  a: "All four turn purple, because the selector names the tag. None changes into something else: the tag is still h2, and the rule only changes how it looks."
explain: |
  The video and the picture show the same steps:

  1. CSS rules go in a `<style>` block, at the top of the code for now.
  2. A rule starts with a **selector**: `p` picks every paragraph, and nothing else.
  3. Inside the braces: a property, a colon, a value, a semicolon, as in `color: teal;`.
  4. Both paragraphs turn teal. The heading is not a `p`, so it stays as it was.
  5. A second rule can style the heading. The HTML never changed.

  Rules change how parts look. The tags still say what each part is.
solutions:
  step-4#t1: page.html#sol-colour
  step-4#t2: page.html#sol-size
  step-4#t3: page.html#sol-h2
  step-4#t4: page.html#sol-font
  step-6: page.html#sol-make
struggle: "Believing a rule picks one element. Ask which tag the selector names, and how many of that tag are on the page, before you say."
class:
  activities:
    - at: end
      kind: activity
      title: Same page, three looks
      minutes: 5
      do: |
        Without changing the HTML, restyle the notice three ways: calm, loud and sporty. Show your partner.
      notes: "Point out that the HTML is the same each time. Ask what stayed the same and what changed."
```

```code page.html#teal
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

```code page.html#third
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

```code page.html#small
<style>
  h1 {
    font-size: 14px;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p>Bring a hat and water.</p>
```

```code page.html#modify
<style>
  h1 {
    color: navy;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

```code page.html#sol-colour
<style>
  h1 {
    color: darkgreen;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

```code page.html#sol-size
<style>
  h1 {
    color: darkgreen;
  }
  p {
    font-size: 20px;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

```code page.html#sol-h2
<style>
  h1 {
    color: darkgreen;
  }
  p {
    font-size: 20px;
  }
  h2 {
    background-color: lightyellow;
    text-align: center;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

```code page.html#sol-font
<style>
  h1 {
    color: darkgreen;
  }
  p {
    font-size: 20px;
    font-family: sans-serif;
  }
  h2 {
    background-color: lightyellow;
    text-align: center;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

```code page.html#review
<style>
  h1 {
    color: navy;
  }
</style>
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</strong></em> on Friday.</p>
<p>Races start at <strong>9 am</strong>.</p>
```

```code page.html#sol-review
<style>
  h1 {
    color: navy;
  }
  strong {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</em></strong> on Friday.</p>
<p>Races start at <strong>9 am</strong>.</p>
```

```code page.html#make
<style>
</style>
<h1>Spring concert</h1>
<h2>When and where</h2>
<p>The concert is on Wednesday at 6 pm in the hall.</p>
<h2>Who is playing</h2>
<p>The Year 7 band, the choir and the string group.</p>
<p>Tickets are free. Bring a friend!</p>
```

```code page.html#sol-make
<style>
  h1 {
    color: purple;
    font-size: 44px;
  }
  h2 {
    color: teal;
    background-color: lightyellow;
  }
  p {
    font-family: sans-serif;
  }
</style>
<h1>Spring concert</h1>
<h2>When and where</h2>
<p>The concert is on Wednesday at 6 pm in the hall.</p>
<h2>Who is playing</h2>
<p>The Year 7 band, the choir and the string group.</p>
<p>Tickets are free. Bring a friend!</p>
```

```code page.html#explain-start
<style>
</style>
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p>Races start at 9 am.</p>
```

```code page.html#explain
<style>
  h1 {
    color: navy;
    font-size: 40px;
  }
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p>Races start at 9 am.</p>
```
