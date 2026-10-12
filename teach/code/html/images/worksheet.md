---
title: "Images"
subtitle: "HTML & CSS · Structure · Lesson 3"
---

# Images

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every photo, icon and logo on a website is an img tag, and its alt text is what a screen reader says aloud.


:::teacher-note

**In one sentence:** Students show pictures with <img>, learn that src must name the file exactly, and write alt text that describes the picture for people who cannot see it.

**Students should be able to say:** I can show a picture with &lt;img src="..." alt="..."&gt;. I can explain why &lt;img&gt; has no closing tag. I can write alt text that says what a picture shows. I can find why a picture does not show by checking the file name.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<img>` shows a picture. `src` names the picture file, and `alt` describes it. Read the code. What will the page show?

```html
<h2>Winners</h2>
<img src="trophey.svg" alt="A gold trophy">
<p>Well done, Owls!</p>
```

:::keep-together

**The picture file is called trophy.svg, but the code says trophey.svg. What will the page show?**

☐ An error message

☐ The words A gold trophy, with a small broken-picture icon

☐ Nothing at all where the picture should be

☐ The trophy anyway: the name is close enough

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The words A gold trophy (with a broken-picture icon). The browser cannot find the file, so it shows the alt words instead.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="120">
<p>Well done, Owls!</p>
```

:::keep-together

### Match the parts

**Match each part with its job.**

A. which picture file to show

B. how wide to show it, in pixels

C. words for people who cannot see the picture

D. starts a picture (no closing tag)

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<img` | |
| `src="trophy.svg"` | |
| `alt="A gold trophy"` | |
| `width="120"` | |

:::


:::teacher-note

**Answer:** &lt;img → D. starts a picture (no closing tag); src="trophy.svg" → A. which picture file to show; alt="A gold trophy" → C. words for people who cannot see the picture; width="120" → B. how wide to show it, in pixels

Each attribute does one job. The picture itself is a separate file; the tag only says which file and how to show it.

:::


:::keep-together

### Good alt text

**Which alt is best for a photo of the relay team holding the trophy?**

☐ alt="photo.png"

☐ alt="image"

☐ No alt at all

☐ alt="The Owls relay team holding the trophy"

:::


:::teacher-note

**Answer:** alt="The Owls relay team holding the trophy"

alt should say what the picture shows, as you would describe it to someone on the phone. A screen reader reads it aloud.

:::


:::keep-together

### The missing medal

**The trophy shows, but the medal does not: only its alt words appear. The picture file is called medal.svg. Click the line that causes it.**

```
 1  <h2>Winners</h2>
 2  <img src="trophy.svg" alt="A gold trophy" width="120">
 3  <p>First place: Owls</p>
 4  <img src="medal.png" alt="A silver medal" width="120">
 5  <p>Second place: Hawks</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4 asks for medal.png, but the file is medal.svg. The name, the ending after the dot and the capitals must all match the file exactly.

:::


:::keep-together

### Pictures inside other tags

A picture can go inside a link (click the picture to follow it) or inside a list item, next to words.

```html
<a href="https://example.com/results"><img src="trophy.svg" alt="A gold trophy: see the results" width="80"></a>
<ul>
  <li><img src="medal.svg" alt="A silver medal" width="40"> Second place</li>
  <li><img src="ball.svg" alt="A soccer ball" width="40"> Soccer final</li>
</ul>
```

**In this code, what happens when someone clicks the trophy?**

☐ Nothing: pictures cannot be clicked

☐ The alt words appear

☐ The link opens, because the picture is inside the &lt;a&gt; tag

☐ The picture gets bigger

:::


:::teacher-note

**Answer:** The link opens, because the picture is inside the &lt;a&gt; tag

An &lt;img&gt; can go inside other tags. Inside &lt;a&gt;, the picture becomes the thing people click. Inside &lt;li&gt;, it sits in a list item beside the words.

:::


:::typical

## Modify


**Make it smaller.** Show the trophy 100 pixels wide.

**Add second place.** Add the medal picture (`medal.svg`) with a good `alt`, and a line for second place: the Hawks.

**Make the trophy a link.** Wrap the trophy picture in a link to `https://example.com/results`, so clicking the picture opens the results.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Make it smaller:**

```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>First place: Owls</p>
```

**Add second place:**

```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>First place: Owls</p>
<img src="medal.svg" alt="A silver medal" width="100">
<p>Second place: Hawks</p>
```

**Make the trophy a link:**

```html
<h2>Winners</h2>
<a href="https://example.com/results"><img src="trophy.svg" alt="A gold trophy" width="100"></a>
<p>First place: Owls</p>
<img src="medal.svg" alt="A silver medal" width="100">
<p>Second place: Hawks</p>
```

:::

:::


## Make

Make a page for a school club: a title, a picture, and a paragraph about when it meets. The pictures you can use are `trophy.svg`, `medal.svg`, `book.svg` and `ball.svg`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Soccer club</h1>
<img src="ball.svg" alt="A black and white soccer ball" width="120">
<p>Training is on Thursday after school on the top oval.</p>
```

:::


:::wider

## Add a picture to the newsletter

Add the book picture (`book.svg`) under the `Library news` heading, 120 pixels wide, with an `alt` that describes it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Library news</h1>
<img src="book.svg" alt="An open book" width="120">
<p>The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The book fair starts on Monday in the library.</p>
```

:::

:::


## Exit ticket

:::keep-together

**A picture shows only its alt words and a broken icon. Give one likely reason.**

{{lines-3}}

:::


:::teacher-note

**Answer:** The file name in src does not match the picture file exactly (spelling, ending or capitals), so the browser cannot find it.

:::

