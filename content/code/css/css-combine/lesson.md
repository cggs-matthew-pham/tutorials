---
order: 1
unit: rules
moveId: rules-combine
reviews: []
introduces: [group-selector]
assumes: [class, class-selector, css-rule]
title: Which rule wins
summary: Find out that an element takes every rule that matches it, that a class beats a tag, and that one comma gives two tags one rule.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8140
  url: http://127.0.0.1:8140/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "Every matching rule applies, a class beats a tag, and a comma shares a rule"
  clip:
    - caption: "A rule on p turns every paragraph teal."
    - type: { into: HTML code, text: "  p {\n    color: teal;\n  }\n", after: "<style>\n" }
    - wait: 1200
    - caption: "A second rule matches the marked paragraph too. It adds a size."
    - type: { into: HTML code, text: "  .note {\n    font-size: 28px;\n  }\n", after: "color: teal;\n  }\n" }
    - expect: { selector: "#preview-text", contains: "Races start at 9 am." }
    - wait: 1500
    - caption: "Where both set the same property, the class wins."
    - type: { into: HTML code, text: "    color: crimson;\n", after: "28px;\n" }
    - wait: 1800
    - caption:
        text: "A comma gives two selectors one rule: h1, p."
        say: "A comma gives two selectors one rule. H1 comma P."
    - type: { into: HTML code, text: "h1, ", after: "<style>\n  " }
    - wait: 2000
hook: "A real stylesheet has hundreds of rules, and the browser settles every clash between them the same way you are about to learn."
---
A page can have many rules, and one element can match more than one of them. You already know that `p { }` styles every paragraph and `.note { }` styles the ones marked `note`. What happens to a paragraph that is both?

## Predict

```step
stage: predict
code: page.html#combine
insight: "Students expect one rule to apply, the first or the last; an element takes every rule that matches it, and a class beats a tag where they clash."
check:
  type: predict
  q: "The last paragraph matches both rules. What does Bring a hat. look like?"
  options:
    - "Crimson and 24px: it takes both rules, and the class wins on colour"
    - "Teal and 24px: it takes both rules, and the later rule wins on colour"
    - "Crimson at the normal size: only the class rule applies"
    - "Teal at the normal size: only the last rule applies"
  fault: logic
  misconception: one-rule-only
  actual: "Crimson and 24px. The paragraph takes the properties of both rules. Both set the colour, and the class rule wins, even though the p rule is written below it."
```

Read the code. `Bring a hat.` is a `p` and it has `class="note"`, so both rules match it. What will it look like?

## Run

```step
stage: run
code: page.html#combine
try: { playground: html, starter: "page.html#combine", height: 400 }
insight: "Every matching rule applies; a class beats a tag, and a comma gives several selectors one rule."
check: { type: reflect, text: "I can say what an element does when two rules match it." }
unlocks: [several-selectors]
```

Compare the page with your prediction. Then move the `.note` rule below the `p` rule: nothing changes. Last, change `p {` to `h1, p {` and watch the heading turn teal too.

| Code | What it does | Why |
|---|---|---|
| `.note { color: crimson; font-size: 24px; }` | Styles every element marked `note` | The colour and the size both apply to `Bring a hat.` |
| `p { color: teal; }` | Styles every paragraph | The same paragraph matches this rule too, so it takes both rules. Nothing is thrown away |
| `color` on `Bring a hat.` | Crimson, not teal | Both rules set the colour, and a class is a more exact pick than a tag, so the class wins, whichever rule is written first |
| `font-size` on `Bring a hat.` | 24px | Only `.note` sets the size, so nothing competes with it |
| two rules equally exact | The one written later wins | If two tag rules both set `color` on `p`, the browser takes the lower one |
| `h1, p { color: teal; }` | One rule for the heading and the paragraphs | The comma means "and". It is the same as two rules, written once |

## Investigate

```step
stage: investigate
code: page.html#trace
insight: "An element keeps the properties of every rule that matches it, so read each rule for each line; the class is what wins a clash, and a selector that matches nothing leaves the other rules showing."
tasks:
  - check:
      type: trace
      text: "Fill in the colour and the size of each line. Read every rule that matches it."
      table: |
        | line | colour | size (px) |
        | the heading | [navy] | [18] |
        | Bring a hat. | [navy] | [18] |
        | Bring water. | [crimson] | [18] |
        | Races start at 9 am. | [crimson] | [30] |
      fault: logic
      misconception: one-rule-only
      explain: "Races start at 9 am. matches three rules. The group rule gives navy and 18px, .note changes the colour to crimson, and .big changes the size to 30px. Each rule adds to the others, and a class beats the group rule where they clash."
  - check:
      type: question
      q: "Two rules both pick every paragraph. p { color: teal; } is written first and p { color: navy; } below it. What colour are the paragraphs?"
      options: ["Navy: the rule written later wins", "Teal: the first rule wins", "A mix of teal and navy", "Black: two rules cancel each other out"]
      answer: 0
      fault: logic
      misconception: one-rule-only
      explain: "Both rules are equally exact, so the later one wins. This is why the order of equal rules matters, and why a class does not need to be written last."
  - check:
      type: bug
      code: page.html#bug
      answer: 3
      fault: logic
      misconception: selector-mismatch
      text: "Bring a hat. should be crimson, but it is teal, and there is no error. Click the line that causes it."
      explain: "Line 3 says .Note, but the paragraph's class is note. Capitals count, so the rule matches nothing and is ignored. The teal from the p rule shows instead."
```

### Colour and size of each line

Each line may match several rules.

### Two rules, same tag

Both rules are equally exact.

### The class that does nothing

The class rule should win here, but the page stays teal.

## Modify

```step
stage: modify
insight: "Group selectors join equal rules into one, and a class rule wins whichever side of the group rule it is written."
try: { playground: html, starter: "page.html#modify", height: 440 }
tasks:
  - hint:
      - "The two rules are the same, so they can share one."
      - "List both selectors with a comma, then delete the other rule: `h1, p {`"
    check: { type: code, text: "Join the h1 and p rules into one rule.", rules: { contains: ["h1, p {"] } }
    expected: page.html#sol-group
  - hint:
      - "A class needs two parts that match: a name on the paragraph, and a rule for that name."
      - "In the HTML: `<p class=\"alert\">`. In the CSS: `.alert { color: crimson; }`."
      - "Write the `.alert` rule above the group rule, on purpose."
    check: { type: code, text: "Give the second paragraph the class alert, with a crimson rule above the group rule.", rules: { contains: ["class=\"alert\"", ".alert {"] } }
    expected: page.html#sol-alert
```

### One rule for two

The heading and the paragraphs have the same rule, written twice.

### A class wins from above

Mark the second paragraph with a class and write its rule above the group rule. Is it crimson or navy?

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460 }
hint:
  - "Start with one group rule for the headings and paragraphs: colour and font in one place."
  - "Mark the sign-up line `<p class=\"signup\">` and write a `.signup` rule that sets a different colour."
  - "The `.signup` rule wins wherever it is written. Put it above the group rule to see it still does."
check:
  type: code
  text: "Style the club notice with one group rule and a signup class that overrides it."
  rules: { tags: [style], contains: ["h1,", "class=\"signup\"", ".signup {"] }
expected: page.html#sol-make
```

Restyle the club notice. Write one group rule such as `h1, h2, p` that gives the heading and the paragraphs a colour and a font. Give the last paragraph the class `signup` and a `.signup` rule with a different colour and a bigger size.

```teacher
summary: Students find out that an element takes every rule that matches it, that a class beats a tag and a later rule beats an equal one, and that a comma shares one rule between selectors.
time: 40
timing: "Predict and Run 10 min · Investigate 12 min · Modify 8 min · Make 10 min"
goals:
  - I can say which properties an element takes when more than one rule matches it.
  - I can say which rule wins when two set the same property.
  - I can write one rule for several selectors with a comma.
before: |
  Read the unit primer "Layout and components" first, then do the Make task yourself in the playground (about 5 minutes).

  Students have written rules and classes in Course A, but always one at a time. The new idea is that an element can match several rules at once. The browser keeps every property from every matching rule. Only where two rules set the same property does it pick: a class beats a tag, and between rules equally exact the later one wins. A **group selector** is a comma list, `h1, p { }`, one rule for several kinds of element.
running:
  - "Predict and Run: the common answers are the last rule or the first rule alone. Let them move `.note` below the `p` rule and see that nothing changes. Then make the comma edit."
  - "Investigate: the trace has three matching rules on the last line. Ask them to find each rule that matches before they write a value. The tie question separates a class from an equal tag rule."
  - "Modify and Make: the check ticks on the group rule and the class. Look at the page for the crimson sign-up line."
stuck:
  - see: A class rule does nothing and the page shows the tag rule.
    ask: Does the class name in the rule match the one in the tag, capitals too?
    fix: Make the two names identical and keep the dot only in the CSS.
  - see: The group rule only styles the first selector.
    ask: Is there a comma between the selectors, and a brace after the last one?
    fix: Write h1, p { with a comma between the selectors and no comma after the last.
  - see: A student thinks the class must be written last.
    ask: Move the class rule to the top. What changes?
    fix: Nothing changes. A class beats a tag wherever it is written.
stretch: "Add a second class, `big`, that sets only the font size, and put both classes on one paragraph: class=\"signup big\". Which properties come from which class?"
support: "Give students the Modify starter and ask them only to join the two rules with a comma, then mark one paragraph with a class."
leads: "Next lesson picks only the links inside a menu, with a space between two selectors. Class idea: look at the stylesheet of a real school page and find two rules that must both apply to one heading."
exit:
  q: "A paragraph matches p { color: teal; font-size: 20px; } and .note { color: crimson; }. What colour and size is it?"
  a: "Crimson and 20px. It takes both rules; where they clash on colour, the class rule wins."
explain: |
  The video and the picture show the same steps:

  1. A rule on `p` turns every paragraph teal.
  2. The marked paragraph matches a second rule, `.note`, so it takes the size from it too.
  3. Where both rules set the colour, the class wins.
  4. A comma gives two selectors one rule: `h1, p { }`.

  In the picture, the marked paragraph is crimson and 24px, and the plain paragraphs and the heading are teal.
solutions:
  step-4#t1: page.html#sol-group
  step-4#t2: page.html#sol-alert
  step-5: page.html#sol-make
struggle: "Believing only one rule applies to an element. Ask the student to list every rule that matches the line before they say what it looks like."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what Bring a hat. looks like.
        Hold up 1, 2, 3 or 4 fingers for the option you chose.
      notes: "Count the votes before anyone runs it. Ask someone who chose the last rule to say what happens to the size. The idea to land: every matching rule applies."
    - at: end
      kind: activity
      title: List the rules
      minutes: 4
      do: |
        Swap pages with a partner. Pick one line of text and list every rule that matches it, then say its colour and size without running it.
      notes: "Listen for students who stop at the first matching rule. Ask what the other rules add."
```

```code page.html#combine
<style>
  .note {
    color: crimson;
    font-size: 24px;
  }
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

```code page.html#trace
<style>
  h1, p {
    color: navy;
    font-size: 18px;
  }
  .note {
    color: crimson;
  }
  .big {
    font-size: 30px;
  }
</style>
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p class="note">Bring water.</p>
<p class="note big">Races start at 9 am.</p>
```

```code page.html#bug
<style>
  p {
    color: teal;
  }
  .Note {
    color: crimson;
  }
</style>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

```code page.html#modify
<style>
  h1 {
    color: navy;
  }
  p {
    color: navy;
  }
</style>
<h1>Swimming carnival</h1>
<p>The carnival is on Thursday.</p>
<p>Bring a towel and a hat.</p>
```

```code page.html#sol-group
<style>
  h1, p {
    color: navy;
  }
</style>
<h1>Swimming carnival</h1>
<p>The carnival is on Thursday.</p>
<p>Bring a towel and a hat.</p>
```

```code page.html#sol-alert
<style>
  .alert {
    color: crimson;
  }
  h1, p {
    color: navy;
  }
</style>
<h1>Swimming carnival</h1>
<p>The carnival is on Thursday.</p>
<p class="alert">Bring a towel and a hat.</p>
```

```code page.html#make
<h1>Owls club</h1>
<h2>Training</h2>
<p>We train on Tuesday after school.</p>
<h2>New members</h2>
<p>Everyone is welcome.</p>
<p>Sign up at the office by Friday.</p>
```

```code page.html#sol-make
<style>
  .signup {
    color: crimson;
    font-size: 24px;
  }
  h1, h2, p {
    color: navy;
    font-family: sans-serif;
  }
</style>
<h1>Owls club</h1>
<h2>Training</h2>
<p>We train on Tuesday after school.</p>
<h2>New members</h2>
<p>Everyone is welcome.</p>
<p class="signup">Sign up at the office by Friday.</p>
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
    font-size: 24px;
  }
  h1, p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p class="note">Races start at 9 am.</p>
```
