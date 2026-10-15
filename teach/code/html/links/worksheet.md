---
title: "Attributes and links"
subtitle: "Structure and style a page · Lists, links and pictures · Lesson 5"
---

# Attributes and links

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every click you make on the web, from a search result to a shop menu, follows a link written like this.


:::teacher-note

**In one sentence:** Students find out that a link is words plus an address in an href attribute, and that only the words show on the page.

**Students should be able to say:** I can write a link with &lt;a href="..."&gt; and &lt;/a&gt;. I can say which part of a link people see and which part says where it goes. I can put an attribute inside an opening tag as name="value".

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<a>` makes a **link**. Read the code. What will the page show, and what happens on a click?

```html
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
```

:::keep-together

**What will the page show, and what happens when someone clicks?**

☐ An error message, because href is not a tag

☐ https://example.com/rules, and a click on it opens the page

☐ Read the club rules before you join. The words club rules are the link, and a click opens the rules page

☐ Read the https://example.com/rules club rules before you join. A click on the address opens the page

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Read the club rules before you join. Only the words between &lt;a&gt; and &lt;/a&gt; show, as a link. The address stays inside the tag and the click takes you there.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1>Sports day</h1>
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
<p>Ask your house captain for the <a href="https://example.com/timetable">timetable</a>.</p>
```

:::keep-together

### Which tag?

**Which opening tag makes a link to https://example.com/join?**

☐ &lt;a "https://example.com/join"&gt;

☐ &lt;a link="https://example.com/join"&gt;

☐ &lt;href="https://example.com/join"&gt;

☐ &lt;a href="https://example.com/join"&gt;

:::


:::teacher-note

**Answer:** &lt;a href="https://example.com/join"&gt;

The attribute is called href, so it is written href="address" after the a and a space, inside the opening tag. Other names, or a missing name, mean the browser does not know where to go.

:::


:::keep-together

### The link that does not click

**The page shows Timetable href=... as plain text next to a word that does not click, while the other two links work. Click the line that causes it.**

```
 1  <h2>Pages</h2>
 2  <ul>
 3    <li><a href="https://example.com/rules">Rules</a></li>
 4    <li><a>Timetable href="https://example.com/timetable"</a></li>
 5    <li><a href="https://example.com/join">Join</a></li>
 6  </ul>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

On line 4 the href is after the &gt; and so counts as text on the page. An attribute goes inside the opening tag: &lt;a href="https://example.com/timetable"&gt;Timetable&lt;/a&gt;.

:::


:::typical

## Modify


**Change the address.** Make the link go to `https://example.com/join`. The words stay the same.

**Change the words.** Change the link's words to `rulebook`. The address stays the same.

**Add a link.** The last line has a word that should click. Make `timetable` a link to `https://example.com/timetable`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Change the address:**

```html
<h1>Sports day</h1>
<p>Read the <a href="https://example.com/join">club rules</a> before you join.</p>
<p>Ask your house captain for the timetable.</p>
```

**Change the words:**

```html
<h1>Sports day</h1>
<p>Read the <a href="https://example.com/join">rulebook</a> before you join.</p>
<p>Ask your house captain for the timetable.</p>
```

**Add a link:**

```html
<h1>Sports day</h1>
<p>Read the <a href="https://example.com/join">rulebook</a> before you join.</p>
<p>Ask your house captain for the <a href="https://example.com/timetable">timetable</a>.</p>
```

:::

:::


## Mix it up

Three clubs, each a link. One of them is in the wrong place.

:::keep-together

**Art should be the third club in the list, but it shows without a bullet and further left. Click the line that causes it.**

```
 1  <h2>Our clubs</h2>
 2  <ul>
 3    <li><a href="https://example.com/chess">Chess</a></li>
 4    <li><a href="https://example.com/robotics">Robotics</a></li>
 5  </ul>
 6    <li><a href="https://example.com/art">Art</a></li>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 6

Line 6 is outside the list: &lt;/ul&gt; on line 5 already closed it. Every &lt;li&gt; must be inside the &lt;ul&gt;, links or not.

:::


## Make

Here is a top 5 list. Change the title and the items to your own favourites (books, games, places, songs). Then make two of the items links. Use `https://example.com/` followed by a name as the address, and click each link to test it.

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


## Exit ticket

:::keep-together

**In &lt;a href="https://example.com/rules"&gt;club rules&lt;/a&gt;, which part do people see on the page, and which part says where the link goes?**

{{lines-3}}

:::


:::teacher-note

**Answer:** They see club rules. The href attribute, inside the opening tag, says where it goes.

:::

