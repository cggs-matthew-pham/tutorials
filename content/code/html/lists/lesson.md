---
order: 4
unit: links
moveId: list-items
reviews: [css-rule]
introduces: [list]
assumes: [css-rule]
title: Lists
summary: Group items into bulleted and numbered lists, keep every item inside its list, and put a list inside an item.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8125
  url: http://127.0.0.1:8125/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "", boxes: 1, zoom: 1.7 }
  caption: "A list is a box of items, and an item can hold another list"
  clip:
    - caption: "<ul> opens a box for a list."
    - type: { into: HTML code, text: "<ul>\n", append: true }
    - caption: "Each <li> is one item, inside the list."
    - type: { into: HTML code, text: "  <li>Hat</li>\n  <li>Water</li>\n", append: true }
    - caption: { text: "</ul> closes the list.", say: "The closing U L tag ends the list." }
    - type: { into: HTML code, text: "</ul>\n", append: true }
    - caption: "<ol> makes a numbered list. The browser does the counting."
    - type: { into: HTML code, text: "<ol>\n  <li>Sprint</li>\n  <li>Relay</li>\n</ol>\n", append: true }
    - expect: { selector: "#preview-text", contains: "Relay" }
    - caption: "An item is a box, so a whole list can go inside it."
    - type: { into: HTML code, text: "\n    <ul>\n      <li>Owls</li>\n    </ul>\n  ", after: "  <li>Relay" }
    - expect: { selector: "#preview-text", contains: "Owls" }
    - wait: 2000
hook: "Menus, playlists, search results and recipes are all lists of items."
---
A lot of text is a list: things to bring, events in order, steps to follow. Lists use tags inside tags, just like `<strong>` inside `<p>`.

## Predict

```step
stage: predict
code: page.html#bring
insight: "Students expect a list to show as one line, or with numbers; the tag decides, and <ul> gives bullets."
check:
  type: predict
  q: "What does the page show under the heading?"
  options:
    - "Three items, each on its own line with a bullet"
    - "One line: Hat Water Sunscreen"
    - "Three items numbered 1, 2 and 3"
    - "Three paragraphs with a gap between them"
  fault: logic
  misconception: list-tag-decides
  actual: "Three items, each on its own line with a bullet. The <ul> makes the list, and each <li> is one item. The browser adds the bullets."
```

`<ul>` makes a list and `<li>` is one item in it. Read the code. What does the page show under the heading?

## Run

```step
stage: run
code: page.html#run
try: { playground: html, starter: "page.html#run", height: 440, boxes: true }
insight: "The list tag makes the bullets or numbers, every item sits inside it, and an item can hold a whole list."
check: { type: reflect, text: "I can say what <ul>, <ol> and <li> each do, and where an <li> must be." }
unlocks: [ul-list]
```

Compare the page with your prediction. Then change `<ul>` and `</ul>` to `<ol>` and `</ol>`: the bullets become numbers. Add one more `<li>` to the numbered list and watch the numbers update by themselves.

| Code | What it does | Why |
|---|---|---|
| `<ul> … </ul>` | Makes a list with bullets | `ul` is an unordered list: the order of the items does not matter |
| `<ol> … </ol>` | Makes a numbered list | `ol` is an ordered list. The browser does the counting, so add or move an item and the numbers follow |
| `<li>Hat</li>` | One item in a list | Every `<li>` belongs inside a `<ul>` or an `<ol>`. Outside one it has no list to belong to and sits in the wrong place |
| `<li>Relay <ul> … </ul></li>` | A list inside an item | An item is a box like any other, so a whole list can go inside it. The small list closes before `</li>`, as with any nesting |
| the spaces before `<li>` | Make the code easier to read | The browser ignores them. The indent is for you, to see which box each line is in |

## Investigate

```step
stage: investigate
insight: "The browser numbers an ordered list by itself, every item belongs inside a list, and a list can sit inside an item."
tasks:
  - check:
      type: parsons
      code: page.html#parsons
      extra: ["<li>1. Sprint</li>"]
      text: "Put the lines in order to make a numbered list of three events. One line is not needed."
      fault: logic
      misconception: ol-numbers-typed
      explain: "<ol> numbers its items itself, so the items are only their words. Typing 1. in the item would give the line two numbers. The <ol> opens the list, each <li> sits inside it, and </ol> closes it."
  - check:
      type: bug
      code: page.html#stray
      answer: 6
      fault: syntax
      misconception: list-item-outside
      text: "Long jump should be number 3 in the list, but it shows a dot and sits further left. Click the line that causes it."
      explain: "Line 6 is outside the list: </ol> on line 5 already closed it. Move </ol> below Long jump, so every <li> is inside the <ol>."
  - picture: { ref: page.html#nested, boxes: true }
    check:
      type: question
      q: "In this list, where does the small list of houses sit?"
      options: ["Inside the Relay item", "After the whole list", "Inside the Sprint item", "Before the heading"]
      answer: 0
      fault: logic
      misconception: nested-list-beside
      explain: "The <ul> is inside the Relay <li>, so it belongs to Relay and is indented under it. An item can hold any tag you have met, including a whole list."
```

### Build a list

Put the scrambled lines in order.

### The lost item

This list has a problem.

### A list inside an item

An item is a box, so another list can sit inside it.

## Modify

```step
stage: modify
insight: "Adding to a list, then adding a second list, one change at a time, checking the page after each."
try: { playground: html, starter: "page.html#modify", height: 420, boxes: true }
tasks:
  - hint: "Copy a whole `<li>` line, then change its words."
    check: { type: reflect, text: "I added Long jump as number 3, inside the list." }
    expected: page.html#sol-event
  - hint:
      - "A bulleted list starts with `<ul>` and ends with `</ul>`."
      - "Put an `<h2>` heading above the list, then one `<li>` for each thing to bring."
    check: { type: code, text: "Add a bulleted list of things to bring.", rules: { tags: [h2, ul, li] } }
    expected: page.html#sol-bring
  - hint:
      - "Put the small list inside the Relay item, before its `</li>`."
      - "Open `<ul>`, add one `<li>` for each house, then close `</ul>`."
    check: { type: code, text: "Put a list of houses inside the Relay item.", rules: { contains: ["</ul></li>"] } }
    expected: page.html#sol-inner
```

### Add an event

Add `Long jump` as the third event.

### Add a list of things to bring

Under a new heading, `What to bring`, add a bulleted list: hat and water.

### A list inside Relay

Inside the `Relay` item, add a bulleted list of two houses: `Owls` and `Hawks`.

## Mix it up

```step
stage: investigate
code: page.html#review
insight: "A rule picks every tag of its kind, including the ones inside other tags."
check:
  type: number
  q: "How many lines of text turn navy and 20px?"
  answer: 5
  feedback:
    - [3, "Those are the items in the outer list. The items in the inner list are li tags too."]
    - [6, "The paragraph is a p, not an li. Count only the list items."]
  explain: "The rule picks every li: Sprint, Relay, Owls, Hawks and Long jump. It does not matter that two of them sit inside another list. The heading and the paragraph are different tags."
```

Work out the answer before you open the playground.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 440, boxes: true }
hint:
  - "Start with an `<h1>` title, then `<ol>` and five `<li>` lines."
  - "Pick one item and put a smaller `<ul>` inside it, before its `</li>`: the book it was written after, or the best game on the level."
  - "Turn on Boxes: the small list should sit inside one item's box."
check:
  type: code
  text: "Write a top 5 list with a title and a smaller list inside one item."
  rules: { tags: [h1, ol, ul, li], contains: ["</ul></li>"] }
expected: page.html#sol-make
```

Make a page with your top 5 (books, games, places, songs): a title, a numbered list of five items, and a smaller bulleted list inside one item, for example the reasons you picked it.

```teacher
summary: Students make bulleted and numbered lists, keep every item inside its list, and put a list inside an item.
time: 45
timing: "Predict and Run 10 min · Investigate 10 min · Modify 10 min · Mix it up 5 min · Make 10 min"
goals:
  - I can make a bulleted list with <ul> and a numbered list with <ol>, with each item in <li>.
  - I can keep every <li> inside its list.
  - I can put a list inside an <li>.
before: |
  Read the unit primer "Lists, links and pictures in 5 minutes" first, then do the Make task yourself.

  The idea: a list is a box of items. `<ul>` gives bullets, `<ol>` gives numbers, and every `<li>` must sit inside one. An item is a box too, so another list can go inside it, which is nesting from the second lesson.

  Turn on **Boxes** in the playground: it shows each item inside its list.
running:
  - "Predict: some students expect the items to join into one line, as paragraphs did in the first lesson. The `<ul>` and `<li>` tags make the bullets, not the line breaks."
  - "Run: change `<ul>` to `<ol>` together, then add an item. The browser numbers the list itself, so students never type the numbers."
  - "Investigate: the parsons task has a spare line with `1.` typed by hand; the browser does the counting. The lost item is one `<li>` after `</ol>`: ask which tag closed the list."
  - "Mix it up: one rule picks every `li`, including the ones inside the inner list. Ask a student to point at each of the five."
  - "Make: in Boxes, the inner list's box sits inside one item's box."
stuck:
  - see: An item has a dot, or a different number from the others, and sits further left.
    ask: Is this <li> between the list's opening and closing tags?
    fix: Move the closing </ul> or </ol> below the last item.
  - see: Numbers typed in the items show twice, as in 1. 1. Sprint.
    ask: Who does the counting in an ordered list?
    fix: Remove the typed numbers. Write only the words in each <li>, and the <ol> adds the numbers.
  - see: The small list shows after the item, not under it.
    ask: Does the small list start before the </li> of its item?
    fix: Move the </li> below the small list's </ul>.
stretch: "Put a list inside a list inside a list. What does the browser do to the bullets at each level? Then write an li rule that makes every item a different colour from its heading."
support: "Give students the Modify starter and do the first task together. Point at Boxes to show the new item's box inside the list."
leads: "Next lesson makes the items in a list into links, with a new idea: an attribute inside the opening tag. Class idea: write the steps to make toast as an ordered list, then swap and follow a partner's list."
exit:
  q: "A student types 1. 2. 3. at the start of each item in an <ol>. What does the page show, and what should they do?"
  a: "Each item shows two numbers, the one the browser added and the one typed. They should delete the typed numbers: the <ol> counts for them."
explain: |
  The video and the picture show the same steps:

  1. `<ul>` opens a box for a list.
  2. Each `<li>` is one item, inside the list.
  3. `</ul>` closes the list.
  4. `<ol>` makes a numbered list. The browser does the counting, so you never type the numbers.
  5. An item is a box too, so a whole list can go inside an `<li>`.

  Every `<li>` must be inside a `<ul>` or an `<ol>`. In the picture, Boxes is on: you can see each item inside its list.
solutions:
  step-4#t1: page.html#sol-event
  step-4#t2: page.html#sol-bring
  step-4#t3: page.html#sol-inner
  step-6: page.html#sol-make
struggle: "Keeping every li inside its list. Turn on Boxes and ask which box each item sits in, rather than moving the tag for them."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what the page shows under the heading.
        Hold up 1, 2, 3 or 4 fingers for your answer.
      notes: "Count the votes before anyone runs it. Ask the pair that voted for one line which lesson taught them that."
    - at: end
      kind: activity
      title: Toast, in order
      minutes: 5
      do: |
        Write the steps for making toast as an ordered list. Swap with a partner and add a missing step in the right place.
      notes: "Point out that the numbers move by themselves when a step is added. Ask what would happen if the numbers were typed by hand."
```

```code page.html#bring
<h2>What to bring</h2>
<ul>
  <li>Hat</li>
  <li>Water</li>
  <li>Sunscreen</li>
</ul>
```

```code page.html#run
<h1>Sports day</h1>
<h2>What to bring</h2>
<ul>
  <li>Hat</li>
  <li>Water</li>
</ul>
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay</li>
  <li>Long jump</li>
</ol>
```

```code page.html#parsons
<ol>
  <li>Sprint</li>
  <li>Relay</li>
  <li>Long jump</li>
</ol>
```

```code page.html#stray
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay</li>
</ol>
  <li>Long jump</li>
```

```code page.html#nested
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay
    <ul>
      <li>Owls</li>
      <li>Hawks</li>
    </ul>
  </li>
  <li>Long jump</li>
</ol>
```

```code page.html#modify
<h1>Sports day</h1>
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay</li>
</ol>
<p>Races start at 9 am.</p>
```

```code page.html#sol-event
<h1>Sports day</h1>
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay</li>
  <li>Long jump</li>
</ol>
<p>Races start at 9 am.</p>
```

```code page.html#sol-bring
<h1>Sports day</h1>
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay</li>
  <li>Long jump</li>
</ol>
<h2>What to bring</h2>
<ul>
  <li>Hat</li>
  <li>Water</li>
</ul>
<p>Races start at 9 am.</p>
```

```code page.html#sol-inner
<h1>Sports day</h1>
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay
    <ul>
      <li>Owls</li>
      <li>Hawks</li>
    </ul>
  </li>
  <li>Long jump</li>
</ol>
<h2>What to bring</h2>
<ul>
  <li>Hat</li>
  <li>Water</li>
</ul>
<p>Races start at 9 am.</p>
```

```code page.html#review
<style>
  li {
    color: navy;
    font-size: 20px;
  }
</style>
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay
    <ul>
      <li>Owls</li>
      <li>Hawks</li>
    </ul>
  </li>
  <li>Long jump</li>
</ol>
<p>The winner gets a medal.</p>
```

```code page.html#make
<!-- Your top 5 list goes here. -->
```

```code page.html#sol-make
<h1>My top 5 books</h1>
<ol>
  <li>The Hobbit
    <ul>
      <li>A dragon</li>
      <li>A map</li>
    </ul>
  </li>
  <li>Wonder</li>
  <li>Holes</li>
  <li>Matilda</li>
  <li>Hatchet</li>
</ol>
```

```code page.html#explain
<ul>
  <li>Hat</li>
  <li>Water</li>
</ul>
<ol>
  <li>Sprint</li>
  <li>Relay
    <ul>
      <li>Owls</li>
    </ul>
  </li>
</ol>
```
