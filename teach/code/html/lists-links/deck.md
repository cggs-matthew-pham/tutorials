---
marp: true
theme: default
html: true
---

# Lists and links

HTML & CSS · Structure

<!-- Speaker note: Students make bulleted and numbered lists, and links whose address sits inside the opening tag, meeting their first attribute. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Club notice 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** group items into bulleted and numbered lists, and link to other pages with an address inside the tag.

- I can make a bulleted list with &lt;ul&gt; and a numbered list with &lt;ol&gt;, with each item in &lt;li&gt;.
- I can make a link with &lt;a href="..."&gt;, and say which part people see and which part says where it goes.
- I can explain what an attribute is.
- I can keep every &lt;li&gt; inside its list.

<!-- Speaker note: Before class: Read the unit primer "HTML structure in 5 minutes" (the attributes paragraph), then do the Make task yourself. New word: an **attribute** is extra information inside an opening tag, written as `name="value"`. In `<a href="https://example.com">`, the attribute `href` holds the address. Students will meet more attributes next lesson (`src` and `alt` on images). Teacher: The lost item: the list was closed too early, so the last `<li>` is outside it. Ask: which tag ends the list, and is Long jump above or below it? Teacher: Club notice: a real page. Students change a list type and a link address without breaking the nesting. -->

---

## Why it matters

> Menus, playlists, search results and recipes are lists of items, and every website is joined to the rest of the web by links.

<!-- Speaker note: Some text is a list of items, and some text should take you to another page. Both are tags you already know how to nest. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
```

**What will the page show?**

- https://example.com/rules
- Nothing: the address has slashes in it
- Read the club rules before you join. (club rules is a link)
- Read the https://example.com/rules club rules before you join.

<!-- Speaker note: What happens: Read the club rules before you join. The address stays inside the tag; only the words between &lt;a&gt; and &lt;/a&gt; show, as a link. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students expect the web address to show on the page. It does not: only the words between `<a>` and `</a>` show, and the address hides in `href`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Ch2%3EWhat+to+bring%3C%2Fh2%3E%0A%3Cul%3E%0A++%3Cli%3EHat%3C%2Fli%3E%0A++%3Cli%3EWater%3C%2Fli%3E%0A%3C%2Ful%3E%0A%3Ch2%3EEvents%3C%2Fh2%3E%0A%3Col%3E%0A++%3Cli%3ESprint%3C%2Fli%3E%0A++%3Cli%3ERelay%3C%2Fli%3E%0A++%3Cli%3ELong+jump%3C%2Fli%3E%0A%3C%2Fol%3E%0A%3Cp%3ERead+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frules%22%3Eclub+rules%3C%2Fa%3E.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/lists-links/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then change `<ul>` and `</ul>` to `<ol>` and `</ol>`: the bullets become numbers. Click the link: it opens in a new tab. Students should be able to say: I can say which part of a link people see, and which part says where it goes. -->

<!-- Speaker note: Teacher: change `<ul>` to `<ol>` together. The browser does the numbering, so adding an item renumbers the list by itself. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Read the club rules before you join. The address stays inside the tag; only the words between &lt;a&gt; and &lt;/a&gt; show, as a link.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
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
<p>Read the <a href="https://example.com/rules">club rules</a>.</p>
```

<!-- Speaker note: What this step is for: A list is a box of <li> items; an attribute such as href is extra information inside an opening tag. -->

<!-- Speaker note: Teacher: the match task separates the parts of a link. The parsons task builds a list; one spare line (`</ul>`) is a distractor that closes the wrong kind of list. -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
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
<p>Read the <a href="https://example.com/rules">club rules</a>.</p>
```

</div>
<div>

**Match each part with its job.**

| | |
|---|---|
| `<ul>` | A. one item in a list |
| `<ol>` | B. a numbered list |
| `<li>` | C. the words people click |
| `href="https://example.com/rules"` | D. where the link goes |
| `club rules` | E. a list with bullets |

* Answer: &lt;ul&gt; → E. a list with bullets; &lt;ol&gt; → B. a numbered list; &lt;li&gt; → A. one item in a list; href="https://example.com/rules" → D. where the link goes; club rules → C. the words people click

</div>
</div>

<!-- Speaker note: The list tags hold the items; the browser adds the bullets or numbers. The link's address is in href, and its words are between the tags. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What is href?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
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
<p>Read the <a href="https://example.com/rules">club rules</a>.</p>
```

</div>
<div>

**In &lt;a href="https://example.com/rules"&gt;club rules&lt;/a&gt;, what is href?**

- A tag of its own
- A closing tag
- The words people click
- An attribute: extra information inside the opening tag

* Answer: An attribute: extra information inside the opening tag

</div>
</div>

<!-- Speaker note: An attribute sits inside the opening tag as name="value". href is the link's address. Many tags have attributes, and you will meet more. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Build a list

**Put the lines in order to make a numbered list of two events. One line is not needed.**

```html
</ol>
  <li>Sprint</li>
<ol>
  <li>Relay</li>
</ul>
```

<!-- Speaker note: <ol> opens the list, each <li> sits inside it, and </ol> closes it. </ul> would close a different kind of list. Correct order: <ol> <li>Sprint</li> <li>Relay</li> </ol> -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The lost item

**Long jump should be number 3, but it shows a dot and sits further left. Click the line that causes it.**

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

## Lists can hold more

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

**In this list, where does the small list of houses sit?**

- After the whole list
- Inside the Sprint link
- Before the heading
- Inside the Relay item

* Answer: Inside the Relay item

<!-- Speaker note: The <ul> is inside the Relay <li>, so it belongs to Relay and is indented under it. An item can hold a link, a whole list, or any tag you have met. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add an event:** Add `Long jump` as the third event.
- **Add a list of things to bring:** Under a new heading, `What to bring`, add a bulleted list: hat and water.
- **Link the timetable:** Make the word `timetable` a link to `https://example.com/timetable`.
- **Link an event:** Make `Sprint` a link to `https://example.com/sprint`, inside its list item.

<!-- Speaker note: What this step is for: Adding to a list and a link one change at a time, checking the page after each. Hints, in order: Copy a whole `<li>` line, then change its words. / A bulleted list starts with `<ul>` and ends with `</ul>`. / Put a `<h2>` heading above the list, then one `<li>` for each thing to bring. / Put `<a href="...">` before the word and `</a>` after it. / The address goes inside the quotes after href=. / The link goes inside the item: `<li>`, then `<a href="...">`, then the words. / Close them in reverse: `</a>` first, then `</li>`. For students who need more support: Give students the Modify starter and do the first task together. For the link task, write the opening tag on the board and ask them only to place it. For early finishers: Make a list inside a list: under one item, a smaller list of details (a <ul> inside an <li>). Then add a link that jumps to a heading on the same page with href="#name" and id="name". The hard part, on purpose: Keeping every li inside its list, and the address hidden inside href. Turn on Boxes and ask which box each item sits in. When students get stuck: An item has a dot, or a different number from the others, and sits further left. Ask: Is this <li> between the list's opening and closing tags? Fix: Move the closing </ul> or </ol> below the last item. / The address shows on the page, or the link goes nowhere. Ask: Where is the address, and does it have quotes around it? Fix: Put the address inside the opening tag in quotes, href="https://...", and the words people click between <a> and </a>. / The rest of the page turned into a link. Ask: Where does the link end? Fix: Add </a> straight after the words that should be the link. -->

<!-- Speaker note: Teacher: one change at a time. Links in the preview open in a new tab, so the page stays where it is. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Ch2%3EEvents%3C%2Fh2%3E%0A%3Col%3E%0A++%3Cli%3ESprint%3C%2Fli%3E%0A++%3Cli%3ERelay%3C%2Fli%3E%0A%3C%2Fol%3E%0A%3Cp%3EAsk+your+house+captain+for+the+timetable.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/lists-links/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a page with your top 5 (books, games, places, songs): a title, a numbered list of five items, and at least two items that are links. Use `https://example.com/` followed by a name as the address.

<!-- Speaker note: Hints, in order: Start with an `<h1>` title, then `<ol>` and five `<li>` lines. / To make an item a link, put the `<a href="...">` inside the `<li>`: `<li><a href="...">Name</a></li>`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+Your+top+5+list+goes+here.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/lists-links/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Update the club notice page

This is a finished notice for a school club. Turn the term plan into a numbered list, add `Week 7: robot races`, and change the sign-up link's address to `https://example.com/robotics-signup`. Click the link to check it.

<!-- Speaker note: What this step is for: A real page's lists and links, changed without breaking the nesting. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Update the club notice page

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch1%3ERobotics+Club%3C%2Fh1%3E%0A%3Cp%3EWe+meet+every+Tuesday+at+lunch+in+the+STEM+lab.%3C%2Fp%3E%0A%3Ch2%3EThis+term%3C%2Fh2%3E%0A%3Cul%3E%0A++%3Cli%3EWeek+1%3A+build+a+line-following+robot%3C%2Fli%3E%0A++%3Cli%3EWeek+3%3A+test+day%3C%2Fli%3E%0A++%3Cli%3EWeek+5%3A+show+off+to+the+school%3C%2Fli%3E%0A%3C%2Ful%3E%0A%3Cp%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3ESign+up+here%3C%2Fa%3E%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/lists-links/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In &lt;a href="https://example.com"&gt;Join now&lt;/a&gt;, what will people see on the page, and what does href do?**

* They see the words Join now as a link. href holds the address the link goes to; it is an attribute inside the opening tag.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds images, with two more attributes: `src` (which picture) and `alt` (words for people who cannot see it). Links are what make the web a web: every page is joined to others. Class idea: list five websites students use, and turn each into a link. -->
