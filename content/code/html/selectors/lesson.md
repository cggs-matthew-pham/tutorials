---
order: 5
unit: style
title: Rules and selectors
summary: Style a page with CSS rules, pick elements by tag or by class, and find out why a rule does nothing.
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
  caption: "A rule picks elements with a selector, then sets how they look"
  clip:
    - caption: "A rule starts with a selector. p picks every paragraph."
    - type: { into: HTML code, text: "  p {\n", after: "<style>\n" }
    - caption: "Inside the braces: a property, a colon, a value, a semicolon."
    - type: { into: HTML code, text: "    color: teal;\n  }\n", after: "  p {\n" }
    - caption:
        text: "Both paragraphs turn teal. The heading is not a p, so it stays as it was."
        say: "Both paragraphs turn teal. The heading isn't a P, so it stays."
    - wait: 1800
    - caption:
        text: "A dot means a class: .note picks only class=\"note\"."
        say: "A dot means a class. Dot note picks only the elements with class note."
    - type: { into: HTML code, text: "  .note {\n    font-size: 28px;\n  }\n", after: "    color: teal;\n  }\n" }
    - expect: { selector: "#preview-text", contains: "Races start at 9 am." }
    - caption: "Rules pick elements by tag or by class. Everything else stays as it was."
    - wait: 2000
hook: "Every website you know uses the same HTML tags; CSS is what makes one look nothing like another."
---
HTML says what each part of a page *is*. **CSS** says how it looks. CSS rules go in a `<style>` block at the top of the page.

## Predict

```step
stage: predict
code: page.html#teal
insight: "Many students expect the whole page to change colour; a selector picks only the elements that match."
check:
  type: predict
  q: "How many lines of text turn teal?"
  kind: number
  actual: "2: only the two paragraphs. The heading and the list items are not <p>, so the rule does not pick them."
```

`p { color: teal; }` is a **rule**. Read the code. How many lines of text will turn teal?

## Run

```step
stage: run
code: page.html#teal
try: { playground: html, starter: "page.html#teal", height: 440 }
insight: "The selector decides which elements a rule styles; change it and the style moves."
check: { type: reflect, text: "I can explain what the selector in a rule does." }
unlocks: [style-block, rule, color, font-size]
```

Compare the page with your prediction. Then change `p` to `li` and watch the colour move to the list. Try `h1` too.

## Investigate

```step
stage: investigate
code: page.html#parts
insight: "A rule is a selector plus declarations; a class (with a dot) picks only the elements you marked, and a selector that does not match is silently ignored."
unlocks: [class-selector]
tasks:
  - check:
      type: match
      q: "Match each part of the h1 rule with its job."
      pairs:
        - ["h1", "the selector: which elements the rule styles"]
        - ["color", "a property: what to change"]
        - ["navy", "a value: what to change it to"]
        - ["{ }", "hold the declarations of one rule"]
        - [";", "ends each declaration"]
      explain: "Selector, then braces. Inside: property, colon, value, semicolon, as many times as you like."
  - check:
      type: question
      q: "Which paragraph does .note { color: crimson; } style?"
      options: ["Both paragraphs", "Only the one with class=\"note\"", "None: there is no <note> tag", "The heading"]
      answer: 1
      explain: "A dot in CSS means a class. .note picks every element marked class=\"note\", and nothing else. The dot is only in the CSS, not in the HTML."
  - check:
      type: bug
      code: page.html#typo
      answer: 2
      fault: logic
      misconception: selector-mismatch
      text: "Bring a hat should be crimson, but it stays black, and there is no error. Click the line in the CSS that causes it."
      explain: "Line 2 says .Notice, but the paragraph's class is notice. Class names must match exactly, capitals included. A selector that matches nothing is simply ignored."
  - picture: page.html#combos
    check:
      type: question
      q: "The last paragraph matches two rules: p (20px) and .note (crimson). What does it look like?"
      options: ["Crimson and 20px: both rules apply", "Only crimson: the class rule replaces the p rule", "Only 20px: the first rule wins", "Black: the two rules cancel out"]
      answer: 0
      explain: "When rules set different properties, every matching rule applies. One rule can also pick several kinds of element at once: h1, h2 { } styles both."
```

### Match the parts

Look at the `h1` rule.

### A class

Look at `.note` in the CSS and `class="note"` in the HTML.

### The rule that does nothing

This rule should colour one paragraph.

### Mix and match

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

## Modify

```step
stage: modify
insight: "Writing rules one at a time: change a value, add a rule, mark an element with a class, and group selectors."
try: { playground: html, starter: "page.html#modify", height: 460 }
unlocks: [several-selectors, font-family, background-color]
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
      - "In the HTML: `<p class=\"reminder\">`. In the CSS: .reminder { ... }."
      - "The dot goes in the CSS only."
    check: { type: code, text: "Give the second paragraph the class reminder and a lightyellow background.", rules: { contains: ["class=\"reminder\"", ".reminder {", "background-color:"] } }
    expected: page.html#sol-class
  - hint: "List both selectors with a comma: h1, p { ... }"
    check: { type: code, text: "Use one rule to give the heading and the paragraphs a sans-serif font.", rules: { contains: ["h1, p {", "font-family: sans-serif;"] } }
    expected: page.html#sol-group
```

### Change a colour

Give the heading a different colour.

### Bigger paragraphs

Add a rule that makes every paragraph `20px`.

### Mark one paragraph

Give the second paragraph `class="reminder"`, then add a `.reminder` rule with `background-color: lightyellow;`.

### One rule for two

Write one rule, `h1, p`, that gives the heading and the paragraphs `font-family: sans-serif;`.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460 }
hint:
  - "Start with a `<style>` block above the heading, then add one rule at a time."
  - "Pick one element to stand out: give it a class, and write a rule for that class."
check:
  type: code
  text: "Style the concert notice with at least three rules, one of them for a class."
  rules: { tags: [style], contains: ["class=\"", "{"] }
expected: page.html#sol-make
```

Style this concert notice your way: at least three rules (for example the heading, the section headings and the paragraphs), and one class that makes the most important line stand out.

## Restyle the club notice

```step
stage: modify
try: { playground: html, starter: "page.html#notice", height: 460 }
insight: "Real styling serves the reader: colours and sizes that are easy to read, and a class for what matters most."
expected: page.html#sol-notice
```

Someone styled this notice, and it is hard to read: a tiny yellow heading and pale grey text. Make it easy to read (a dark heading at least `40px`, dark paragraph text), then give the sign-up line a class and a background colour so it stands out.
