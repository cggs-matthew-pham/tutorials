---
order: 2
unit: structure
title: Lists and links
summary: Group items into bulleted and numbered lists, and link to other pages with an address inside the tag.
language: html
introduces: [list, attribute, link]
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8125
  url: http://127.0.0.1:8125/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: true                 # voiceover pilot (AUTHORING › Voiceover)
explainClip:
  query: { code: "", boxes: 1, zoom: 1.7 }
  caption: "A list is a box of items, and a link carries its address inside the tag"
  say: "A list is a box of items, and a link carries its address."
  clip:
    - caption: "<ul> opens a box for a list."
    - type: { into: HTML code, text: "<ul>\n", append: true }
    - caption: "Each <li> is one item, inside the list."
    - type: { into: HTML code, text: "  <li>Hat</li>\n  <li>Water</li>\n", append: true }
    - caption: { text: "</ul> closes the list.", say: "The closing U L tag ends the list." }
    - type: { into: HTML code, text: "</ul>\n", append: true }
    - caption:
        text: "A link: href says where it goes. It is an attribute, inside the opening tag."
        say: "A link uses href to say where it goes. It goes inside the opening tag."
    - type: { into: HTML code, text: "<a href=\"https://example.com\">\n", append: true }
    - caption: "The words between the tags are what people click."
    - type: { into: HTML code, text: "  Club rules\n</a>", append: true }
    - expect: { selector: "#preview-text", contains: "Club rules" }
    - wait: 2000
hook: "Menus, playlists, search results and recipes are lists of items, and every website is joined to the rest of the web by links."
---
Some text is a list of items, and some text should take you to another page. Both are tags you already know how to nest.

## Predict

```step
stage: predict
code: page.html#link
insight: "Many students expect the web address to show on the page; the address hides inside the tag."
check:
  type: predict
  q: "What will the page show?"
  options:
    - "Read the club rules before you join. (club rules is a link)"
    - "Read the https://example.com/rules club rules before you join."
    - "https://example.com/rules"
    - "Nothing: the address has slashes in it"
  actual: "Read the club rules before you join. The address stays inside the tag; only the words between <a> and </a> show, as a link."
```

`<a>` makes a **link**. Read the code. What will the page show?

## Run

```step
stage: run
code: page.html#run
try: { playground: html, starter: "page.html#run", height: 420 }
insight: "<ul> gives bullets, <ol> numbers; the browser does the numbering. A link's address is hidden in href."
check: { type: reflect, text: "I can say which part of a link people see, and which part says where it goes." }
unlocks: [ul-list, ol-numbered-list, a-link]
```

Compare the page with your prediction. Then change `<ul>` and `</ul>` to `<ol>` and `</ol>`: the bullets become numbers. Click the link: it opens in a new tab.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "A list is a box of <li> items; an attribute such as href is extra information inside an opening tag."
tasks:
  - check:
      type: match
      q: "Match each part with its job."
      pairs:
        - ["<ul>", "a list with bullets"]
        - ["<ol>", "a numbered list"]
        - ["<li>", "one item in a list"]
        - ["href=\"https://example.com/rules\"", "where the link goes"]
        - ["club rules", "the words people click"]
      explain: "The list tags hold the items; the browser adds the bullets or numbers. The link's address is in href, and its words are between the tags."
  - check:
      type: question
      q: "In <a href=\"https://example.com/rules\">club rules</a>, what is href?"
      options: ["A tag of its own", "An attribute: extra information inside the opening tag", "The words people click", "A closing tag"]
      answer: 1
      explain: "An attribute sits inside the opening tag as name=\"value\". href is the link's address. Many tags have attributes, and you will meet more."
  - check:
      type: parsons
      code: page.html#parsons
      extra: ["</ul>"]
      text: "Put the lines in order to make a numbered list of two events. One line is not needed."
      explain: "<ol> opens the list, each <li> sits inside it, and </ol> closes it. </ul> would close a different kind of list."
  - check:
      type: bug
      code: page.html#stray
      answer: 6
      fault: syntax
      misconception: list-item-outside
      text: "Long jump should be number 3, but it shows a dot and sits further left. Click the line that causes it."
      explain: "Line 6 is outside the list: </ol> on line 5 already closed it. Move </ol> below Long jump, so every <li> is inside the <ol>."
  - picture: { ref: page.html#combos, boxes: true }
    check:
      type: question
      q: "In this list, where does the small list of houses sit?"
      options: ["Inside the Relay item", "After the whole list", "Inside the Sprint link", "Before the heading"]
      answer: 0
      explain: "The <ul> is inside the Relay <li>, so it belongs to Relay and is indented under it. An item can hold a link, a whole list, or any tag you have met."
```

### Match the parts

What does each part of this page do?

### What is href?

Look at the link's opening tag.

### Build a list

Put the scrambled lines in order.

### The lost item

This list has a problem.

### Lists can hold more

An item is a box, so other tags can go inside it: a link, or even a whole list.

```html
<ol>
  <li><a href="https://example.com/sprint">Sprint</a></li>
  <li>Relay
    <ul>
      <li>Owls</li>
      <li>Hawks</li>
    </ul>
  </li>
  <li>Long jump</li>
</ol>
```

## Modify

```step
stage: modify
insight: "Adding to a list and a link one change at a time, checking the page after each."
try: { playground: html, starter: "page.html#modify", height: 420 }
tasks:
  - hint: "Copy a whole `<li>` line, then change its words."
    check: { type: reflect, text: "I added Long jump as number 3, inside the list." }
    expected: page.html#sol-event
  - hint:
      - "A bulleted list starts with `<ul>` and ends with `</ul>`."
      - "Put a `<h2>` heading above the list, then one `<li>` for each thing to bring."
    check: { type: code, text: "Add a bulleted list.", rules: { tags: [ul] } }
    expected: page.html#sol-bring
  - hint:
      - "Put `<a href=\"...\">` before the word and `</a>` after it."
      - "The address goes inside the quotes after href=."
    check: { type: code, text: "Link timetable to the address.", rules: { contains: ["href=\"https://example.com/timetable\""] } }
    expected: page.html#sol-link
  - hint:
      - "The link goes inside the item: `<li>`, then `<a href=\"...\">`, then the words."
      - "Close them in reverse: `</a>` first, then `</li>`."
    check: { type: code, text: "Make Sprint a link inside its list item.", rules: { contains: ["<li><a href=\"https://example.com/sprint\">Sprint</a></li>"] } }
    expected: page.html#sol-item-link
```

### Add an event

Add `Long jump` as the third event.

### Add a list of things to bring

Under a new heading, `What to bring`, add a bulleted list: hat and water.

### Link the timetable

Make the word `timetable` a link to `https://example.com/timetable`.

### Link an event

Make `Sprint` a link to `https://example.com/sprint`, inside its list item.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 420 }
hint:
  - "Start with an `<h1>` title, then `<ol>` and five `<li>` lines."
  - "To make an item a link, put the `<a href=\"...\">` inside the `<li>`: `<li><a href=\"...\">Name</a></li>`."
check:
  type: code
  text: "Write a top 5 list with a title and at least one link."
  rules: { tags: [h1, ol, li, a], contains: ["href="] }
expected: page.html#sol-make
```

Make a page with your top 5 (books, games, places, songs): a title, a numbered list of five items, and at least two items that are links. Use `https://example.com/` followed by a name as the address.

## Update the club notice page

```step
stage: modify
try: { playground: html, starter: "page.html#notice", height: 440 }
insight: "A real page's lists and links, changed without breaking the nesting."
expected: page.html#sol-notice
```

This is a finished notice for a school club. Turn the term plan into a numbered list, add `Week 7: robot races`, and change the sign-up link's address to `https://example.com/robotics-signup`. Click the link to check it.
