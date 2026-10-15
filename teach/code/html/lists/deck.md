---
marp: true
theme: default
html: true
---

# Lists

Structure and style a page · Lists, links and pictures

<!-- Speaker note: Students make bulleted and numbered lists, keep every item inside its list, and put a list inside an item. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Mix it up 5 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** group items into bulleted and numbered lists, keep every item inside its list, and put a list inside an item.

- I can make a bulleted list with &lt;ul&gt; and a numbered list with &lt;ol&gt;, with each item in &lt;li&gt;.
- I can keep every &lt;li&gt; inside its list.
- I can put a list inside an &lt;li&gt;.

<!-- Speaker note: Before class: Read the unit primer "Lists, links and pictures in 5 minutes" first, then do the Make task yourself. The idea: a list is a box of items. `<ul>` gives bullets, `<ol>` gives numbers, and every `<li>` must sit inside one. An item is a box too, so another list can go inside it, which is nesting from the second lesson. Turn on **Boxes** in the playground: it shows each item inside its list. Teacher: Mix it up: one rule picks every `li`, including the ones inside the inner list. Ask a student to point at each of the five. -->

---

## Why it matters

> Menus, playlists, search results and recipes are all lists of items.

<!-- Speaker note: A lot of text is a list: things to bring, events in order, steps to follow. Lists use tags inside tags, just like `<strong>` inside `<p>`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h2>What to bring</h2>
<ul>
  <li>Hat</li>
  <li>Water</li>
  <li>Sunscreen</li>
</ul>
```

**What does the page show under the heading?**

- Three items numbered 1, 2 and 3
- One line: Hat Water Sunscreen
- Three paragraphs with a gap between them
- Three items, each on its own line with a bullet

<!-- Speaker note: What happens: Three items, each on its own line with a bullet. The &lt;ul&gt; makes the list, and each &lt;li&gt; is one item. The browser adds the bullets. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students expect the items to join into one line, as paragraphs did in the first lesson. The `<ul>` and `<li>` tags make the bullets, not the line breaks. Ask the pair that voted for one line which lesson taught them that. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Ch2%3EWhat+to+bring%3C%2Fh2%3E%0A%3Cul%3E%0A++%3Cli%3EHat%3C%2Fli%3E%0A++%3Cli%3EWater%3C%2Fli%3E%0A%3C%2Ful%3E%0A%3Ch2%3EEvents%3C%2Fh2%3E%0A%3Col%3E%0A++%3Cli%3ESprint%3C%2Fli%3E%0A++%3Cli%3ERelay%3C%2Fli%3E%0A++%3Cli%3ELong+jump%3C%2Fli%3E%0A%3C%2Fol%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/lists/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then change `<ul>` and `</ul>` to `<ol>` and `</ol>`: the bullets become numbers. Add one more `<li>` to the numbered list and watch the numbers update by themselves. | Code | What it does | Why | |---|---|---| | `<ul> … </ul>` | Makes a list with bullets | `ul` is an unordered list: the order of the items does not matter | | `<ol> … </ol>` | Makes a numbered list | `ol` is an ordered list. The browser does the counting, so add or move an item and the numbers follow | | `<li>Hat</li>` | One item in a list | Every `<li>` belongs inside a `<ul>` or an `<ol>`. Outside one it has no list to belong to and sits in the wrong place | | `<li>Relay <ul> … </ul></li>` | A list inside an item | An item is a box like any other, so a whole list can go inside it. The small list closes before `</li>`, as with any nesting | | the spaces before `<li>` | Make the code easier to read | The browser ignores them. The indent is for you, to see which box each line is in | Students should be able to say: I can say what <ul>, <ol> and <li> each do, and where an <li> must be. -->

<!-- Speaker note: Teacher: change `<ul>` to `<ol>` together, then add an item. The browser numbers the list itself, so students never type the numbers. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Three items, each on its own line with a bullet. The &lt;ul&gt; makes the list, and each &lt;li&gt; is one item. The browser adds the bullets.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Build a list

**Put the lines in order to make a numbered list of three events. One line is not needed.**

```html
  <li>Relay</li>
  <li>Long jump</li>
  <li>Sprint</li>
<li>1. Sprint</li>
</ol>
<ol>
```

<!-- Speaker note: <ol> numbers its items itself, so the items are only their words. Typing 1. in the item would give the line two numbers. The <ol> opens the list, each <li> sits inside it, and </ol> closes it. Correct order: <ol> <li>Sprint</li> <li>Relay</li> <li>Long jump</li> </ol> -->

<!-- Speaker note: Teacher: the parsons task has a spare line with `1.` typed by hand; the browser does the counting. The lost item is one `<li>` after `</ol>`: ask which tag closed the list. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The lost item

**Long jump should be number 3 in the list, but it shows a dot and sits further left. Click the line that causes it.**

```
 1  <h2>Events</h2>
 2  <ol>
 3    <li>Sprint</li>
 4    <li>Relay</li>
 5  </ol>
 6    <li>Long jump</li>
```

* Answer: line 6

<!-- Speaker note: Line 6 is outside the list: </ol> on line 5 already closed it. Move </ol> below Long jump, so every <li> is inside the <ol>. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A list inside an item

**In this list, where does the small list of houses sit?**

- Inside the Relay item
- Inside the Sprint item
- Before the heading
- After the whole list

* Answer: Inside the Relay item

<!-- Speaker note: The <ul> is inside the Relay <li>, so it belongs to Relay and is indented under it. An item can hold any tag you have met, including a whole list. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add an event:** Add `Long jump` as the third event.
- **Add a list of things to bring:** Under a new heading, `What to bring`, add a bulleted list: hat and water.
- **A list inside Relay:** Inside the `Relay` item, add a bulleted list of two houses: `Owls` and `Hawks`.

<!-- Speaker note: What this step is for: Adding to a list, then adding a second list, one change at a time, checking the page after each. Hints, in order: Copy a whole `<li>` line, then change its words. / A bulleted list starts with `<ul>` and ends with `</ul>`. / Put an `<h2>` heading above the list, then one `<li>` for each thing to bring. / Put the small list inside the Relay item, before its `</li>`. / Open `<ul>`, add one `<li>` for each house, then close `</ul>`. For students who need more support: Give students the Modify starter and do the first task together. Point at Boxes to show the new item's box inside the list. For early finishers: Put a list inside a list inside a list. What does the browser do to the bullets at each level? Then write an li rule that makes every item a different colour from its heading. The hard part, on purpose: Keeping every li inside its list. Turn on Boxes and ask which box each item sits in, rather than moving the tag for them. When students get stuck: An item has a dot, or a different number from the others, and sits further left. Ask: Is this <li> between the list's opening and closing tags? Fix: Move the closing </ul> or </ol> below the last item. / Numbers typed in the items show twice, as in 1. 1. Sprint. Ask: Who does the counting in an ordered list? Fix: Remove the typed numbers. Write only the words in each <li>, and the <ol> adds the numbers. / The small list shows after the item, not under it. Ask: Does the small list start before the </li> of its item? Fix: Move the </li> below the small list's </ul>. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Ch2%3EEvents%3C%2Fh2%3E%0A%3Col%3E%0A++%3Cli%3ESprint%3C%2Fli%3E%0A++%3Cli%3ERelay%3C%2Fli%3E%0A%3C%2Fol%3E%0A%3Cp%3ERaces+start+at+9+am.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/lists/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```html
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

<!-- Speaker note: Work out the answer before you open the playground. What this step is for: A rule picks every tag of its kind, including the ones inside other tags. -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**How many lines of text turn navy and 20px?**

* Answer: 5

<!-- Speaker note: The rule picks every li: Sprint, Relay, Owls, Hawks and Long jump. It does not matter that two of them sit inside another list. The heading and the paragraph are different tags. What this step is for: A rule picks every tag of its kind, including the ones inside other tags. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a page with your top 5 (books, games, places, songs): a title, a numbered list of five items, and a smaller bulleted list inside one item, for example the reasons you picked it.

<!-- Speaker note: Hints, in order: Start with an `<h1>` title, then `<ol>` and five `<li>` lines. / Pick one item and put a smaller `<ul>` inside it, before its `</li>`: the book it was written after, or the best game on the level. / Turn on Boxes: the small list should sit inside one item's box. -->

<!-- Speaker note: Teacher: in Boxes, the inner list's box sits inside one item's box. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Your+top+5+list+goes+here.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/lists/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Toast, in order <span style="font-size:.6em;color:#64748b">(5 min)</span>

Write the steps for making toast as an ordered list. Swap with a partner and add a missing step in the right place.

<!-- Speaker note: Point out that the numbers move by themselves when a step is added. Ask what would happen if the numbers were typed by hand. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student types 1. 2. 3. at the start of each item in an &lt;ol&gt;. What does the page show, and what should they do?**

* Each item shows two numbers, the one the browser added and the one typed. They should delete the typed numbers: the &lt;ol&gt; counts for them.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson makes the items in a list into links, with a new idea: an attribute inside the opening tag. Class idea: write the steps to make toast as an ordered list, then swap and follow a partner's list. -->
