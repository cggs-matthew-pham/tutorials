---
title: "Lists and links"
subtitle: "HTML & CSS · Structure · Lesson 2"
---

# Lists and links

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Menus, playlists, search results and recipes are lists of items, and every website is joined to the rest of the web by links.


:::teacher-note

**In one sentence:** Students make bulleted and numbered lists, and links whose address sits inside the opening tag, meeting their first attribute.

**Students should be able to say:** I can make a bulleted list with &lt;ul&gt; and a numbered list with &lt;ol&gt;, with each item in &lt;li&gt;. I can make a link with &lt;a href="..."&gt;, and say which part people see and which part says where it goes. I can explain what an attribute is. I can keep every &lt;li&gt; inside its list.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<a>` makes a **link**. Read the code. What will the page show?

```html
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
```

:::keep-together

**What will the page show?**

☐ https://example.com/rules

☐ Nothing: the address has slashes in it

☐ Read the club rules before you join. (club rules is a link)

☐ Read the https://example.com/rules club rules before you join.

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Read the club rules before you join. The address stays inside the tag; only the words between &lt;a&gt; and &lt;/a&gt; show, as a link.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Match the parts

**Match each part with its job.**

A. one item in a list

B. a numbered list

C. the words people click

D. where the link goes

E. a list with bullets

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<ul>` | |
| `<ol>` | |
| `<li>` | |
| `href="https://example.com/rules"` | |
| `club rules` | |

:::


:::teacher-note

**Answer:** &lt;ul&gt; → E. a list with bullets; &lt;ol&gt; → B. a numbered list; &lt;li&gt; → A. one item in a list; href="https://example.com/rules" → D. where the link goes; club rules → C. the words people click

The list tags hold the items; the browser adds the bullets or numbers. The link's address is in href, and its words are between the tags.

:::


:::keep-together

### What is href?

**In &lt;a href="https://example.com/rules"&gt;club rules&lt;/a&gt;, what is href?**

☐ A tag of its own

☐ A closing tag

☐ The words people click

☐ An attribute: extra information inside the opening tag

:::


:::teacher-note

**Answer:** An attribute: extra information inside the opening tag

An attribute sits inside the opening tag as name="value". href is the link's address. Many tags have attributes, and you will meet more.

:::


:::keep-together

### Build a list

**Put the lines in order to make a numbered list of two events. One line is not needed.**

A. `</ol>`

B. `<li>Sprint</li>`

C. `<ol>`

D. `<li>Relay</li>`

E. `</ul>`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

&lt;ol&gt; opens the list, each &lt;li&gt; sits inside it, and &lt;/ol&gt; closes it. &lt;/ul&gt; would close a different kind of list.

```html
<ol>
  <li>Sprint</li>
  <li>Relay</li>
</ol>
```

:::


:::keep-together

### The lost item

**Long jump should be number 3, but it shows a dot and sits further left. Click the line that causes it.**

```
 1  <h2>Events</h2>
 2  <ol>
 3    <li>Sprint</li>
 4    <li>Relay</li>
 5  </ol>
 6    <li>Long jump</li>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

Line 6 is outside the list: &lt;/ol&gt; on line 5 already closed it. Move &lt;/ol&gt; below Long jump, so every &lt;li&gt; is inside the &lt;ol&gt;.

:::


:::keep-together

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

**In this list, where does the small list of houses sit?**

☐ After the whole list

☐ Inside the Sprint link

☐ Before the heading

☐ Inside the Relay item

:::


:::teacher-note

**Answer:** Inside the Relay item

The &lt;ul&gt; is inside the Relay &lt;li&gt;, so it belongs to Relay and is indented under it. An item can hold a link, a whole list, or any tag you have met.

:::


:::typical

## Modify


**Add an event.** Add `Long jump` as the third event.

**Add a list of things to bring.** Under a new heading, `What to bring`, add a bulleted list: hat and water.

**Link the timetable.** Make the word `timetable` a link to `https://example.com/timetable`.

**Link an event.** Make `Sprint` a link to `https://example.com/sprint`, inside its list item.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add an event:**

```html
<h1>Sports day</h1>
<h2>Events</h2>
<ol>
  <li>Sprint</li>
  <li>Relay</li>
  <li>Long jump</li>
</ol>
<p>Ask your house captain for the timetable.</p>
```

**Add a list of things to bring:**

```html
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
<p>Ask your house captain for the timetable.</p>
```

**Link the timetable:**

```html
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
<p>Ask your house captain for the <a href="https://example.com/timetable">timetable</a>.</p>
```

**Link an event:**

```html
<h1>Sports day</h1>
<h2>Events</h2>
<ol>
  <li><a href="https://example.com/sprint">Sprint</a></li>
  <li>Relay</li>
  <li>Long jump</li>
</ol>
<h2>What to bring</h2>
<ul>
  <li>Hat</li>
  <li>Water</li>
</ul>
<p>Ask your house captain for the <a href="https://example.com/timetable">timetable</a>.</p>
```

:::

:::


## Make

Make a page with your top 5 (books, games, places, songs): a title, a numbered list of five items, and at least two items that are links. Use `https://example.com/` followed by a name as the address.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>My top 5 books</h1>
<ol>
  <li><a href="https://example.com/hobbit">The Hobbit</a></li>
  <li>Wonder</li>
  <li><a href="https://example.com/holes">Holes</a></li>
  <li>Matilda</li>
  <li>Hatchet</li>
</ol>
```

:::


:::wider

## Update the club notice page

This is a finished notice for a school club. Turn the term plan into a numbered list, add `Week 7: robot races`, and change the sign-up link's address to `https://example.com/robotics-signup`. Click the link to check it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Robotics Club</h1>
<p>We meet every Tuesday at lunch in the STEM lab.</p>
<h2>This term</h2>
<ol>
  <li>Week 1: build a line-following robot</li>
  <li>Week 3: test day</li>
  <li>Week 5: show off to the school</li>
  <li>Week 7: robot races</li>
</ol>
<p><a href="https://example.com/robotics-signup">Sign up here</a></p>
```

:::

:::


## Exit ticket

:::keep-together

**In &lt;a href="https://example.com"&gt;Join now&lt;/a&gt;, what will people see on the page, and what does href do?**

{{lines-3}}

:::


:::teacher-note

**Answer:** They see the words Join now as a link. href holds the address the link goes to; it is an attribute inside the opening tag.

:::

