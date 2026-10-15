---
title: "Put it online"
subtitle: "Your site, for real · Ready for real people · Lesson 2"
---

# Put it online

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website you visit is a folder of files on a computer that is always switched on. Yours can be one too.


:::teacher-note

**In one sentence:** Students predict that a downloaded page loses its pictures, download a page and its files into one folder and open it from their computer, match paths to where they look, sort what is safe to publish, find a path from one computer, fix three paths, and publish their own page.

**Students should be able to say:** I can download a page and every file it uses into one folder. I can make every path in a page relative, so it works online. I can publish a page and check it from another device.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`src="trophy.svg"` asks for a file beside the page.

```html
<h1>Chess club</h1>
<img src="trophy.svg" alt="A gold trophy" width="80">
<p>Chess every Wednesday at lunch.</p>
```

:::keep-together

**You download only index.html and open it from your Downloads folder. What do you see?**

☐ An error message

☐ A blank page

☐ Everything, just as in the playground

☐ The heading and text, with a broken picture where the trophy was

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The page, with a broken picture. src="trophy.svg" means "beside this page", and trophy.svg is not beside it in Downloads. Put it in the same folder.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1>Chess club</h1>
<img src="trophy.svg" alt="A gold trophy" width="80">
<p>Chess every Wednesday at lunch, in the library.</p>
<h2>Our groups</h2>
<ul>
  <li><img src="star.svg" alt="" width="20"> Beginners</li>
  <li><img src="medal.svg" alt="" width="20"> Players</li>
</ul>
```

:::keep-together

### Where does it look?

**Where does each path look for its file?**

A. in a folder called images, beside the page

B. on another website

C. on Ada's computer only

D. beside the page, in the same folder

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `trophy.svg` | |
| `images/trophy.svg` | |
| `C:/Users/ada/Desktop/trophy.svg` | |
| `https://example.com/trophy.svg` | |

:::


:::teacher-note

**Answer:** trophy.svg → D. beside the page, in the same folder; images/trophy.svg → A. in a folder called images, beside the page; C:/Users/ada/Desktop/trophy.svg → C. on Ada's computer only; https://example.com/trophy.svg → B. on another website

Relative paths travel with the folder: the page finds its files wherever the folder goes. Paths on one computer break everywhere else.

:::


:::keep-together

### Safe to publish?

**Which of these are fine on a public page for a school club, and which stay off it?**

Groups: Fine to publish, Keep it off

- The club's name and meeting day: {{field-15}}
- Pictures you drew yourself: {{field-15}}
- Your full name and your school's address: {{field-15}}
- Photos of classmates: {{field-15}}
- Your email address or phone number: {{field-15}}

:::


:::teacher-note

**Answer:** The club's name and meeting day → Fine to publish; Pictures you drew yourself → Fine to publish; Your full name and your school's address → Keep it off; Photos of classmates → Keep it off; Your email address or phone number → Keep it off

Anything online can be copied and kept. Leave out what identifies a person, and ask before using anyone's photo; your school will have its own rules too.

:::


:::keep-together

### Spot the bug

**On Ada's computer both pictures show. Online, the trophy is a broken picture and the medal is fine. Click the line that is wrong.**

```
 1  <h1>Chess club</h1>
 2  <img src="C:/Users/ada/Desktop/trophy.svg" alt="A gold trophy" width="80">
 3  <img src="medal.svg" alt="A medal" width="80">
 4  <p>Chess every Wednesday at lunch.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

C:/Users/ada/Desktop/ is a folder on Ada's computer, not on the web. Put trophy.svg in the site's folder and write src="trophy.svg".

:::


:::typical

## Modify

Sam's page works on Sam's computer only. Fix its paths. The preview already shows what will go wrong online: the pictures and the Bootstrap look are missing until each path is right.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <h1>Art show</h1>
  <img src="star.svg" alt="A star" width="60">
  <img src="medal.svg" alt="A medal for the best painting" width="60">
  <p class="lead">Year 8 paintings in the hall, Thursday after school.</p>
</div>
```

:::

:::


:::typical

## Make: publish your page

Publish the page you checked in **Pages for everyone**:

1. Paste it in, press **Download**, and put `index.html` and every file it lists in one folder.
2. Open `index.html` from the folder and check every part works.
3. Publish the folder in the way your teacher shows you: for example GitHub Pages, Netlify Drop, or your school's own website.
4. Open the address on another device, such as a classmate's laptop.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::wider

## Where this leads

Your page is ready for real people, and online. A page that needs a server of its own (saving data for everyone, a login) is a web app: **Web apps with Flask**.

:::


## Exit ticket

:::keep-together

**Why does src="C:/Users/ada/Desktop/trophy.svg" break online, and what should it be?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It points at a folder on Ada's computer, which the web can't reach; put trophy.svg beside the page and write src="trophy.svg".

:::

