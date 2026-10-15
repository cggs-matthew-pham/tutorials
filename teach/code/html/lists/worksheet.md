---
title: "Lists"
subtitle: "Structure and style a page · Lists, links and pictures · Lesson 4"
---

# Lists

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Menus, playlists, search results and recipes are all lists of items.


:::teacher-note

**In one sentence:** Students make bulleted and numbered lists, keep every item inside its list, and put a list inside an item.

**Students should be able to say:** I can make a bulleted list with &lt;ul&gt; and a numbered list with &lt;ol&gt;, with each item in &lt;li&gt;. I can keep every &lt;li&gt; inside its list. I can put a list inside an &lt;li&gt;.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<ul>` makes a list and `<li>` is one item in it. Read the code. What does the page show under the heading?

```html
<h2>What to bring</h2>
<ul>
  <li>Hat</li>
  <li>Water</li>
  <li>Sunscreen</li>
</ul>
```

:::keep-together

**What does the page show under the heading?**

☐ Three items numbered 1, 2 and 3

☐ One line: Hat Water Sunscreen

☐ Three paragraphs with a gap between them

☐ Three items, each on its own line with a bullet

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Three items, each on its own line with a bullet. The &lt;ul&gt; makes the list, and each &lt;li&gt; is one item. The browser adds the bullets.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


:::keep-together

### Build a list

**Put the lines in order to make a numbered list of three events. One line is not needed.**

A. `<li>Relay</li>`

B. `<li>Long jump</li>`

C. `<li>Sprint</li>`

D. `<li>1. Sprint</li>`

E. `</ol>`

F. `<ol>`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

&lt;ol&gt; numbers its items itself, so the items are only their words. Typing 1. in the item would give the line two numbers. The &lt;ol&gt; opens the list, each &lt;li&gt; sits inside it, and &lt;/ol&gt; closes it.

```html
<ol>
  <li>Sprint</li>
  <li>Relay</li>
  <li>Long jump</li>
</ol>
```

:::


:::keep-together

### The lost item

**Long jump should be number 3 in the list, but it shows a dot and sits further left. Click the line that causes it.**

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

### A list inside an item

**In this list, where does the small list of houses sit?**

☐ Inside the Relay item

☐ Inside the Sprint item

☐ Before the heading

☐ After the whole list

:::


:::teacher-note

**Answer:** Inside the Relay item

The &lt;ul&gt; is inside the Relay &lt;li&gt;, so it belongs to Relay and is indented under it. An item can hold any tag you have met, including a whole list.

:::


:::typical

## Modify


**Add an event.** Add `Long jump` as the third event.

**Add a list of things to bring.** Under a new heading, `What to bring`, add a bulleted list: hat and water.

**A list inside Relay.** Inside the `Relay` item, add a bulleted list of two houses: `Owls` and `Hawks`.

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
<p>Races start at 9 am.</p>
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
<p>Races start at 9 am.</p>
```

**A list inside Relay:**

```html
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

:::

:::


## Mix it up

Work out the answer before you open the playground.

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

:::keep-together

**How many lines of text turn navy and 20px?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 5

The rule picks every li: Sprint, Relay, Owls, Hawks and Long jump. It does not matter that two of them sit inside another list. The heading and the paragraph are different tags.

:::


## Make

Make a page with your top 5 (books, games, places, songs): a title, a numbered list of five items, and a smaller bulleted list inside one item, for example the reasons you picked it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
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

:::


## Exit ticket

:::keep-together

**A student types 1. 2. 3. at the start of each item in an &lt;ol&gt;. What does the page show, and what should they do?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Each item shows two numbers, the one the browser added and the one typed. They should delete the typed numbers: the &lt;ol&gt; counts for them.

:::

