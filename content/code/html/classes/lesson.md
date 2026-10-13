---
order: 7
unit: links
moveId: class-pick
reviews: [css-rule, image-alt]
introduces: [class, class-selector]
assumes: [css-rule, attribute, image]
title: Pick some with a class
summary: Mark the elements you choose with a class, and style only those with a rule that starts with a dot.
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
  caption: "A class marks the elements you choose, and a dot rule styles only those"
  clip:
    - caption: "class=\"note\" gives this paragraph a name of your choice."
    - wait: 1500
    - caption:
        text: "A dot and the name pick everything marked with it."
        say: "In the style block, a dot and the name pick everything marked with that class."
    - type: { into: HTML code, text: "  .note {\n    color: crimson;\n  }\n", after: "<style>\n" }
    - caption: "Only the marked paragraph changes."
    - wait: 1500
    - caption: "Any number of elements can share one class."
    - type: { into: HTML code, text: " class=\"note\"", after: "<p" }
    - expect: { selector: "#preview-text", contains: "Races start at 9 am." }
    - wait: 2000
hook: "Every website marks the parts that matter, like sale prices or warnings, with a class so one rule can style them all."
---
A rule like `p { }` styles every paragraph. Sometimes you want only some of them: the winners, the warning, the line that matters most. You choose them with a name.

## Predict

```step
stage: predict
code: page.html#note
insight: "Students expect a rule to follow the tag or to pick one element; a class picks every element marked with it, and no others."
check:
  type: predict
  q: "Which lines of text turn crimson?"
  options:
    - "Bring a hat. and Bring water., the two paragraphs marked class=\"note\""
    - "All four paragraphs"
    - "Only Bring a hat., the first one marked"
    - "None of them, because there is no tag called note"
  fault: logic
  misconception: class-picks-wrong
  actual: "Bring a hat. and Bring water. The rule .note picks every element marked class=\"note\", however many there are, and leaves the other paragraphs alone."
```

`class="note"` marks a paragraph with a name, and `.note { }` is a rule for that name. Read the code. Which lines of text will turn crimson?

## Run

```step
stage: run
code: page.html#note
try: { playground: html, starter: "page.html#note", height: 440 }
insight: "The class in the HTML and the dot rule in the CSS work as a pair: the HTML marks, the CSS styles what is marked."
check: { type: reflect, text: "I can explain how a class and a dot rule work together." }
unlocks: [class-selector]
```

Compare the page with your prediction. Find the two paragraphs with `class="note"` and the rule that matches them. The table says what each part does.

| Code | What it does | Why |
|---|---|---|
| `class="note"` | Marks this element with the name `note` | `class` is an attribute, so it sits inside the opening tag. You choose the name |
| `.note { … }` | Styles only the elements marked `note` | The dot means "a class". It is a rule like `p { }`, but it picks by name instead of by tag |
| `<p class="note">` twice | Both paragraphs change | Any number of elements can share one class. The rule is written once |
| `<p>` with no class | Stays as it was | The rule picks by the mark. The tag alone does not match |
| `note` after the dot | Must match the HTML name exactly | If the spelling or capitals differ, the rule matches nothing, and the browser shows no error |

## Investigate

```step
stage: investigate
code: page.html#note
insight: "The class name in the CSS and in the HTML must match exactly, and the dot belongs only in the CSS."
tasks:
  - check:
      type: bug
      code: page.html#typo
      answer: 2
      fault: logic
      misconception: selector-mismatch
      text: "Bring a hat should be crimson, but it stays black, and there is no error. Click the line in the CSS that causes it."
      explain: "Line 2 says .Notice, but the paragraph's class is notice. Class names must match exactly, capitals included. A selector that matches nothing is simply ignored."
  - check:
      type: bug
      code: page.html#dot
      answer: 7
      fault: syntax
      misconception: class-dot-in-html
      text: "Bring a hat should be crimson, but it stays black. The CSS is right. Click the line that causes it."
      explain: "Line 7 puts the dot in the HTML. The dot is only in the CSS, where it means a class: the tag says class=\"note\" and the rule says .note."
```

### The rule that does nothing

This rule should colour one paragraph.

### The dot in the wrong place

The rule is right this time.

## Modify

```step
stage: modify
insight: "The HTML marks and the CSS styles what is marked: change either side, or add a new pair."
try: { playground: html, starter: "page.html#modify", height: 440 }
tasks:
  - hint:
      - "Copy `class=\"note\"` from another paragraph into the opening tag of the last one."
      - "A tag with an attribute looks like `<p class=\"note\">`."
    check: { type: code, text: "Mark the last paragraph with class note, so it turns crimson too.", rules: { contains: ["class=\"note\">Races start at 9 am."] } }
    expected: page.html#sol-mark
  - hint:
      - "The colour is in the `.note` rule, after `color:`."
      - "Change the word to `navy`. All the marked paragraphs follow."
    check: { type: code, text: "Change the colour in the .note rule to navy.", rules: { contains: ["color:navy"] } }
    expected: page.html#sol-colour
  - hint:
      - "Write a second rule in the style block: a dot, the name `big`, then a bigger `font-size` in braces."
      - "Then add `class=\"big\"` to the opening tag of the first paragraph."
    check: { type: code, text: "Add a second class, big, with its own rule, and use it on the first paragraph.", rules: { contains: [".big{", "class=\"big\""] } }
    expected: page.html#sol-big
```

### Mark one more

Add `class="note"` to the last paragraph, so it joins the others.

### Change the colour

Change `crimson` to `navy` in the rule. Every marked paragraph changes together.

### A second class

Add a class named `big` with `font-size: 24px;`, and use it on the first paragraph.

## Mix it up

```step
stage: investigate
code: page.html#review
insight: "Reading a rule for a missing semicolon, and a picture for a missing alt, uses the CSS rule and the picture tag together."
check:
  type: bug
  code: page.html#review
  answer: [3, 8]
  fault: syntax
  misconception: declaration-no-semicolon
  text: "The heading stays plain, and a screen reader has nothing to say about the picture. Click the two lines to fix."
  explain: "Line 3 needs a ; at its end: without it the browser drops both declarations, and the h2 rule does nothing. Line 8 needs alt, to say what the picture shows."
```

Two things are wrong on this page, one in the CSS and one in the HTML.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460 }
hint:
  - "Each class needs two parts that match: a mark on the paragraphs, and a rule for that name."
  - "The mark goes inside the opening tag of each paragraph. The rule goes in a `<style>` block, and its dot goes in the CSS only."
check:
  type: code
  text: "Mark the winners and the runners-up with classes, and style each class in its own colour."
  rules: { tags: [style], contains: ["class=\"winner\"", ".winner{", "class=\"runner\"", ".runner{"] }
expected: page.html#sol-make
```

This is a results page. Use a class named `winner` for the first-place paragraphs and a class named `runner` for the second-place paragraphs, then write a rule for each, with two different colours.

```teacher
summary: Students mark chosen elements with a class and style only those with a dot rule, and find out that the names must match and the dot stays in the CSS.
time: 40
timing: "Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 4 min · Make 10 min"
goals:
  - I can mark an element with class="name" and style it with .name in the CSS.
  - I can use one class on several elements.
  - I can find a class rule that matches nothing, because of a different name or a dot in the HTML.
before: |
  Read the unit primer "Lists, links and pictures in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes).

  A **class** is a name you choose and put on elements with `class="name"`. In the CSS a rule starting with a dot, `.name { }`, styles every element with that class. The dot is only in the CSS. Students already know that `p { }` styles all paragraphs; the new idea is choosing which ones.
running:
  - "Predict and Run: the usual guess is all four paragraphs, or only the first. In Modify they add the class and watch the colour follow it."
  - "Investigate: both bugs are silent. Ask what the browser does with a rule that matches nothing: it ignores it."
  - "Modify: mark one more, change the colour in one place, then add a second class. Ask how many rules changed when the colour changed."
  - "Mix it up: the missing semicolon and the missing alt are both from earlier lessons."
  - "Make: the check ticks when both classes and both rules are there with the names winner and runner. Look at the page for two different colours."
stuck:
  - see: The rule does nothing and there is no error.
    ask: Are the class name in the tag and the name after the dot spelt exactly the same?
    fix: Make the two names identical, capitals included, and put the dot only in the CSS.
  - see: Every paragraph changes colour.
    ask: Is the rule's selector p or .winner?
    fix: Change the selector to a dot and the class name, and put the class on only the elements you want.
  - see: The class is written as class=".winner".
    ask: Where does the dot go?
    fix: The dot is only in the CSS. In the tag write class="winner".
stretch: "Give one paragraph a third class, `late`, in a third colour. Then give a list item the class `winner` and see that any tag can have one."
support: "Give students the Modify starter and do the first task together, then change the colour in the rule."
leads: "Next lesson is a whole newsletter page that uses everything so far. Class idea: ask which parts of a school's real page might share a class."
exit:
  q: "A rule .sale { color: red; } does nothing. Name two things that could be wrong."
  a: "No element has class=\"sale\", or the name is spelt differently in the HTML. Another possibility is class=\".sale\" with the dot in the HTML."
explain: |
  The video and the picture show the same steps:

  1. `class="note"` marks an element with a name you choose.
  2. `.note { }` in the CSS styles only the elements with that class.
  3. Any number of elements can share one class, and the rule is written once.

  In the picture, the two marked paragraphs are crimson and the others are not.
solutions:
  step-4#t1: page.html#sol-mark
  step-4#t2: page.html#sol-colour
  step-4#t3: page.html#sol-big
  step-6: page.html#sol-make
struggle: "Believing the dot belongs in both places. Ask where each of the two names is written, and which one is the CSS."
class:
  activities:
    - at: predict
      kind: discussion
      title: Which ones change?
      minutes: 3
      do: |
        With your partner, point to each paragraph and say whether it turns crimson.
        Hold up 1, 2, 3 or 4 fingers for the option you chose.
      notes: "Take a vote before running. Ask someone who chose all four what the class is for. The idea to land: the class is the mark, the rule picks by the mark."
    - at: end
      kind: activity
      title: Name and swap
      minutes: 4
      do: |
        Swap pages with a partner. Without running them, read each tag with a class and say which rule it matches.
      notes: "Listen for students who match by eye and miss a capital letter. Ask what the browser does when the names differ."
```

```code page.html#note
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p>Races start at 9 am.</p>
```

```code page.html#modify
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p>Races start at 9 am.</p>
```

```code page.html#sol-mark
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p class="note">Races start at 9 am.</p>
```

```code page.html#sol-colour
<style>
  .note {
    color: navy;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p class="note">Races start at 9 am.</p>
```

```code page.html#sol-big
<style>
  .note {
    color: navy;
  }
  .big {
    font-size: 24px;
  }
</style>
<h1>Sports day</h1>
<p class="big">Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p class="note">Races start at 9 am.</p>
```

```code page.html#typo
<style>
  .Notice {
    color: crimson;
  }
</style>
<p>Sports day is on Friday.</p>
<p class="notice">Bring a hat.</p>
```

```code page.html#dot
<style>
  .note {
    color: crimson;
  }
</style>
<p>Sports day is on Friday.</p>
<p class=".note">Bring a hat.</p>
```

```code page.html#review
<style>
  h2 {
    color: teal
    font-size: 28px;
  }
</style>
<h2>Winners</h2>
<img src="trophy.svg">
<p>First place: Owls</p>
```

```code page.html#make
<h1>Race results</h1>
<p>First place: Owls</p>
<p>Second place: Hawks</p>
<p>First place: Eagles</p>
<p>Second place: Falcons</p>
```

```code page.html#sol-make
<style>
  .winner {
    color: darkgreen;
  }
  .runner {
    color: navy;
  }
</style>
<h1>Race results</h1>
<p class="winner">First place: Owls</p>
<p class="runner">Second place: Hawks</p>
<p class="winner">First place: Eagles</p>
<p class="runner">Second place: Falcons</p>
```

```code page.html#explain-start
<style>
</style>
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p class="note">Races start at 9 am.</p>
```

```code page.html#explain
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p class="note">Races start at 9 am.</p>
```
