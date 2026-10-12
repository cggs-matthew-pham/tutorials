---
title: "Pages for everyone"
subtitle: "Your site, for real · Ready for real people · Lesson 1"
---

# Pages for everyone

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** About one in five people has a disability. A page built with the right tags works for screen readers, keyboards and phones as well as for you.


:::teacher-note

**In one sentence:** Students predict what a screen reader says for a picture with no alt and a "click here" link, move through an accessible page with the keyboard, match problems to fixes, find headings chosen for size, fix pictures and labels, then check their own page and test it with a classmate.

**Students should be able to say:** I can check a page for alt text, headings, labels, link text, contrast and keyboard use. I can fix a page so a screen reader and a keyboard can use it. I can test my page with a real person and fix what they find.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Neither the picture nor the link says what it is.

```html
<img src="trophy.svg" width="80">
<p><a href="https://example.com/rooms">Click here</a></p>
```

:::keep-together

**A screen reader reaches the picture, then the link. What does it say?**

☐ It describes the picture's colours

☐ Something like "trophy dot svg, image", then "Click here, link"

☐ Nothing: it skips pictures and links

☐ "A gold trophy", then "Library meeting room, link"

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** With no alt text, many screen readers read the file name. And "Click here" says nothing about where the link goes, especially when a screen reader lists all the links on a page.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1>Chess club</h1>
<img src="trophy.svg" width="80">
<h4>When we meet</h4>
<p>Wednesdays at lunch. <a href="https://example.com/rooms">Click here</a> for the room.</p>
<h4>Join</h4>
<p>Name</p>
<input type="text">
<button>Join</button>
```

:::keep-together

### Find the fixes

**This version looks almost the same but fails the checklist. Match each problem with its fix.**

A. make it an h2, the next level of the outline

B. link text that says where it goes: library meeting room

C. a label with for="name", and id="name" on the input

D. add alt="A gold trophy"

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<img src="trophy.svg"> has no words` | |
| `<h4>When we meet</h4> comes straight after the h1` | |
| `<p>Name</p> above the box` | |
| `Click here` | |

:::


:::teacher-note

**Answer:** &lt;img src="trophy.svg"&gt; has no words → D. add alt="A gold trophy"; &lt;h4&gt;When we meet&lt;/h4&gt; comes straight after the h1 → A. make it an h2, the next level of the outline; &lt;p&gt;Name&lt;/p&gt; above the box → C. a label with for="name", and id="name" on the input; Click here → B. link text that says where it goes: library meeting room

Each fix is a tag or an attribute that tells the browser what the part is. The page looks the same; it works for more people.

:::


:::keep-together

### Spot the bug

**A screen reader user jumps between headings to find the parts of this page, and hears levels 1, 4, 4: it sounds as if two levels are missing. Click the two lines that are wrong.**

```
 1  <h1>Robotics club</h1>
 2  <h4>What we build</h4>
 3  <p>Robots that follow lines.</p>
 4  <h4>When we meet</h4>
 5  <p>Fridays after school.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2 and 4

h4 was chosen because it looks small. Headings are the page's outline: the parts under the h1 are h2. Make them smaller with CSS if you want.

:::


:::typical

## Modify


**Describe the pictures.** alt for each one.

**Name the boxes.** Labels joined to their boxes.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Describe the pictures:**

```html
<h1>Art show</h1>
<img src="star.svg" alt="A star" width="60">
<img src="medal.svg" alt="A medal for the best painting" width="60">
<h2>Sign up</h2>
<p>Your name</p>
<input type="text">
<p>Your year</p>
<input type="number">
<button>Sign up</button>
```

**Name the boxes:**

```html
<h1>Art show</h1>
<img src="star.svg" width="60">
<img src="medal.svg" width="60">
<h2>Sign up</h2>
<label for="name">Your name</label>
<input id="name" type="text">
<label for="year">Your year</label>
<input id="year" type="number">
<button>Sign up</button>
```

:::

:::


## Make: check your own page

Paste in a page you have made, from any course. Then:

1. Go through the **six points** above and fix what you find.
2. **Test it with a classmate.** Give them one job (join the club, find the meeting time, answer the first question) and watch without helping. Then ask them to do it again with only the keyboard. Note every place they hesitated.
3. Fix the **three biggest** problems they found.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}


:::wider

## Where this leads

Next: **put it online**.

:::


## Exit ticket

:::keep-together

**Name two changes that make a page work for a screen reader without changing how it looks.**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: alt text on pictures, labels joined to boxes, headings in order, link text that says where it goes.

:::

