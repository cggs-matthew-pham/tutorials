---
title: "Pictures"
subtitle: "Structure and style a page · Lists, links and pictures · Lesson 6"
---

# Pictures

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every photo, icon and logo on a website is an img tag, and its alt text is what a screen reader says aloud.


:::teacher-note

**In one sentence:** Students show a picture with img, and learn that src must match the file name exactly and that alt describes the picture for people who cannot see it.

**Students should be able to say:** I can show a picture with &lt;img src="..." alt="..."&gt;. I can say why the file name in src must match exactly. I can write alt words that describe what the picture shows.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<img>` shows a picture. `src` names the picture file, and `alt` describes it. Read the code. What will the page show?

```html
<h2>Winners</h2>
<img src="trophey.svg" alt="A gold trophy" width="100">
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

**What happens:** The words A gold trophy (with a broken-picture icon). The browser cannot find a file with that exact name, so it shows the alt words instead.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

:::keep-together

### Where does alt show?

**When does a person who can see the picture also see its alt words?**

☐ When they hold the mouse over the picture

☐ Only when the picture does not load, or when a screen reader reads the page aloud

☐ At the top of the page, as a title

☐ Under the picture, as its caption

:::


:::teacher-note

**Answer:** Only when the picture does not load, or when a screen reader reads the page aloud

alt is not shown beside a picture that loads. It stands in for the picture when it cannot be seen. A caption is a separate line of text, written as a paragraph.

:::


:::keep-together

### Good alt text

**Which alt is best for a photo of the relay team holding the trophy?**

☐ No alt at all

☐ alt="The Owls relay team holding the trophy"

☐ alt="relay-photo.jpg"

☐ alt="image"

:::


:::teacher-note

**Answer:** alt="The Owls relay team holding the trophy"

alt should say what the picture shows, as you would describe it to someone on the phone. A word such as image, or the file name, tells them nothing.

:::


:::keep-together

### The missing medal

**The trophy shows, but the medal does not: only its alt words appear. The picture file is called medal.svg. Click the line that causes it.**

```
 1  <h2>Winners</h2>
 2  <img src="trophy.svg" alt="A gold trophy" width="100">
 3  <p>First place: Owls</p>
 4  <img src="medal.png" alt="A silver medal" width="100">
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


:::typical

## Modify


**Change the picture.** Show `medal.svg` instead of the trophy. Only the file name changes.

**Change the alt words.** The alt words still describe a trophy. Change them to `A silver medal`.

**Change the size.** Make the picture `200` wide.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Change the picture:**

```html
<h2>Winners</h2>
<img src="medal.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

**Change the alt words:**

```html
<h2>Winners</h2>
<img src="medal.svg" alt="A silver medal" width="100">
<p>Well done, Owls!</p>
```

**Change the size:**

```html
<h2>Winners</h2>
<img src="medal.svg" alt="A silver medal" width="200">
<p>Well done, Owls!</p>
```

:::

:::


## Mix it up

Make the picture itself the thing people click.

:::keep-together

**Put the lines in order so that clicking the trophy picture opens the results. One line is not needed.**

A. `<img src="trophy.svg" alt="A gold trophy">`

B. `</img>`

C. `</a>`

D. `<a href="https://example.com/results">`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

The link's opening tag, with its href, comes first; the picture goes inside it; &lt;/a&gt; closes the link. An &lt;img&gt; has no closing tag, so &lt;/img&gt; is not needed.

```html
<a href="https://example.com/results">
  <img src="trophy.svg" alt="A gold trophy">
</a>
```

:::


## Make

Make a page for a school club: a title, a picture, and a paragraph about when it meets. The pictures you can use are `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg` and `music.svg`.

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


## Exit ticket

:::keep-together

**A student's picture does not show, only a few words. What do they check first, and what are the words?**

{{lines-3}}

:::


:::teacher-note

**Answer:** They check that the file name in src matches the file exactly. The words are the alt text, which shows when the picture cannot load.

:::

