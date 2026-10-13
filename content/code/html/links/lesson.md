---
order: 5
unit: links
moveId: attribute-link
reviews: [list-items]
introduces: [attribute, link]
assumes: [list, css-rule]
title: Attributes and links
summary: Send people to another page with a link, and find out that its address sits inside the opening tag.
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
  caption: "A link keeps its address inside the opening tag"
  clip:
    - caption: "<a> makes a link. The words between <a> and </a> are what people click."
    - type: { into: HTML code, text: "<p>Read the <a>club rules</a> first.</p>\n" }
    - caption: "href goes inside the opening tag and says where the link goes."
    - type: { into: HTML code, text: "<p>Read the <a href=\"https://example.com/rules\">club rules</a> first.</p>" }
    - expect: { selector: "#preview-text", contains: "club rules" }
    - caption: "Only the words show. The address stays hidden inside the tag."
    - wait: 2000
hook: "Every click you make on the web, from a search result to a shop menu, follows a link written like this."
---
Some words on a page should take you somewhere else. A link does that, and it is the first tag you meet that needs extra information inside it.

## Predict

```step
stage: predict
code: page.html#link
insight: "Many students expect the address to appear on the page, or to be the part you click; the address hides inside the tag."
check:
  type: predict
  q: "What will the page show, and what happens when someone clicks?"
  options:
    - "Read the club rules before you join. The words club rules are the link, and a click opens the rules page"
    - "Read the https://example.com/rules club rules before you join. A click on the address opens the page"
    - "https://example.com/rules, and a click on it opens the page"
    - "An error message, because href is not a tag"
  fault: logic
  misconception: href-shows
  actual: "Read the club rules before you join. Only the words between <a> and </a> show, as a link. The address stays inside the tag and the click takes you there."
```

`<a>` makes a **link**. Read the code. What will the page show, and what happens on a click?

## Run

```step
stage: run
code: page.html#run
try: { playground: html, starter: "page.html#run", height: 380 }
insight: "A link has two separate parts: the words people click, and the address in href. Changing one leaves the other alone."
check: { type: reflect, text: "I can say which part of a link people see, and which part says where it goes." }
unlocks: [a-link]
```

Compare the page with your prediction, then click a link (it opens in a new tab). Change the address inside the quotes of the first link to `https://example.com/timetable`: the words stay the same. Now change the words only: the address stays the same.

| Code | What it does | Why |
|---|---|---|
| `<a href="https://example.com/rules">club rules</a>` | Makes a link | `<a>` opens it and `</a>` closes it. Whatever is between them is what people click |
| `href="https://example.com/rules"` | Says where the link goes | This is an **attribute**: a `name="value"` pair. The address is the value, in quotes |
| `<a href="…">` | The attribute sits in the opening tag | Information about a tag goes inside its opening tag, after the tag name and a space. The closing tag never has one |
| `club rules` | The words people click | Only these show on the page. The address is not shown, and it is not what you click |

## Investigate

```step
stage: investigate
code: page.html#run
insight: "The attribute belongs inside the opening tag, as name=\"value\"; anywhere else it is just text."
tasks:
  - check:
      type: question
      q: "Which opening tag makes a link to https://example.com/join?"
      options:
        - "<a href=\"https://example.com/join\">"
        - "<a link=\"https://example.com/join\">"
        - "<a \"https://example.com/join\">"
        - "<href=\"https://example.com/join\">"
      answer: 0
      fault: syntax
      misconception: attribute-anywhere
      explain: "The attribute is called href, so it is written href=\"address\" after the a and a space, inside the opening tag. Other names, or a missing name, mean the browser does not know where to go."
  - check:
      type: bug
      code: page.html#misplaced
      answer: 4
      fault: syntax
      misconception: attribute-anywhere
      text: "The page shows Timetable href=... as plain text next to a word that does not click, while the other two links work. Click the line that causes it."
      explain: "On line 4 the href is after the > and so counts as text on the page. An attribute goes inside the opening tag: <a href=\"https://example.com/timetable\">Timetable</a>."
```

### Which tag?

Think about which part names the attribute, and where it goes.

### The link that does not click

Two of these three links work.

## Mix it up

```step
stage: investigate
insight: "Review of lists: every li belongs inside a list, even when each item is a link."
check:
  type: bug
  code: page.html#review
  answer: 6
  fault: syntax
  misconception: list-item-outside
  text: "Art should be the third club in the list, but it shows without a bullet and further left. Click the line that causes it."
  explain: "Line 6 is outside the list: </ul> on line 5 already closed it. Every <li> must be inside the <ul>, links or not."
```

Three clubs, each a link. One of them is in the wrong place.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 420 }
hint:
  - "Pick two items. Put `<a href=\"...\">` just inside the `<li>`, before the words."
  - "Close them in reverse order: `</a>` first, then `</li>`."
check:
  type: code
  text: "Make at least two items in your top 5 into links."
  rules: { tags: [ol, li, a], contains: ["href=\""] }
expected: page.html#sol-make
```

Here is a top 5 list. Change the title and the items to your own favourites (books, games, places, songs). Then make two of the items links. Use `https://example.com/` followed by a name as the address, and click each link to test it.

```teacher
summary: Students find out that a link is words plus an address in an href attribute, and that only the words show on the page.
time: 40
timing: "Predict and Run 12 min · Investigate 10 min · Mix it up 5 min · Make 13 min"
goals:
  - I can write a link with <a href="..."> and </a>.
  - I can say which part of a link people see and which part says where it goes.
  - I can put an attribute inside an opening tag as name="value".
before: |
  Read the unit primer "Lists, links and pictures in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes).

  An **attribute** is extra information about a tag, written inside the opening tag as `name="value"`. `href` is the attribute that holds a link's address. The surprise for students is that the address does not show: only the words between `<a>` and `</a>` do. Links to `example.com` open a real placeholder page, so students can test a click.
running:
  - "Predict and Run: many students pick the option where the address shows. Let them run it and click, then change only the address and only the words so they see the two parts are separate."
  - "Investigate: the question is about where the attribute goes. In the bug, read line 4 aloud: the text after the > is just text."
  - "Mix it up: the list bug is from last lesson. Ask what closed the list before the third item."
  - "Make: the check ticks when the page has a list with a link in it; look at the page to see that two items are links."
stuck:
  - see: The address shows on the page next to the words.
    ask: Is the href inside the opening tag, before the first >?
    fix: Move href="..." between a and the first >, so the tag reads <a href="...">.
  - see: The words are not a different colour and nothing clicks.
    ask: Does the link have both its <a href="..."> and its </a>?
    fix: Add the missing opening tag with href, or the closing </a>, around the words.
  - see: Everything after the link is clickable.
    ask: Where does the link end?
    fix: Add </a> straight after the words that should click.
stretch: "Make a link to one of your own other pages in the playground, or a whole sentence into a link, and test where it ends."
support: "Give students the Run page and ask them only to change the address and the words of one link, then link one item in the Make list."
leads: "Next lesson adds pictures, which are another tag with attributes: a name for the file and words for people who cannot see it. Class idea: show a real school page and hover over links to see the address in the browser's status bar."
exit:
  q: "In <a href=\"https://example.com/rules\">club rules</a>, which part do people see on the page, and which part says where the link goes?"
  a: "They see club rules. The href attribute, inside the opening tag, says where it goes."
explain: |
  The video and the picture show the same steps:

  1. `<a>` makes a link, and the words between `<a>` and `</a>` are what people click.
  2. `href` is an attribute. It goes inside the opening tag as `href="address"`.
  3. Only the words show on the page. The address stays hidden inside the tag.

  In the picture, Boxes is on: the link is one box, with its words inside.
solutions:
  step-5: page.html#sol-make
struggle: "Putting the attribute in the right place. Ask which part of the tag is the opening one, rather than fixing the line."
class:
  activities:
    - at: predict
      kind: discussion
      title: What do you see?
      minutes: 3
      do: |
        Look at the code with your partner. Say what the page will show, and then what a click will do.
        Hold up 1, 2, 3 or 4 fingers for the option you chose.
      notes: "Count the votes before anyone runs it. Ask one pair that picked an address option why. The idea to land: the address is information for the browser, not text for the reader."
    - at: end
      kind: activity
      title: Swap and click
      minutes: 4
      do: |
        Swap pages with a partner. Click each of their links, and say which words you clicked and where each one took you.
      notes: "Listen for students who say they clicked the address. Ask which part of the tag holds it."
```

```code page.html#link
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
```

```code page.html#run
<h1>Sports day</h1>
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
<p>Ask your house captain for the <a href="https://example.com/timetable">timetable</a>.</p>
```

```code page.html#misplaced
<h2>Pages</h2>
<ul>
  <li><a href="https://example.com/rules">Rules</a></li>
  <li><a>Timetable href="https://example.com/timetable"</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
```

```code page.html#review
<h2>Our clubs</h2>
<ul>
  <li><a href="https://example.com/chess">Chess</a></li>
  <li><a href="https://example.com/robotics">Robotics</a></li>
</ul>
  <li><a href="https://example.com/art">Art</a></li>
```

```code page.html#make
<h1>My top 5</h1>
<ol>
  <li>First favourite</li>
  <li>Second favourite</li>
  <li>Third favourite</li>
  <li>Fourth favourite</li>
  <li>Fifth favourite</li>
</ol>
```

```code page.html#sol-make
<h1>My top 5 books</h1>
<ol>
  <li><a href="https://example.com/hobbit">The Hobbit</a></li>
  <li>Wonder</li>
  <li><a href="https://example.com/holes">Holes</a></li>
  <li>Matilda</li>
  <li>Hatchet</li>
</ol>
```

```code page.html#explain
<p>Read the <a href="https://example.com/rules">club rules</a> first.</p>
```
