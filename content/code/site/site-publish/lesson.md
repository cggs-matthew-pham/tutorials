---
order: 2
unit: real
title: "Put it online"
summary: "A website is a folder of files: download the page and every file it uses, make every path relative, test the folder on your own computer, then publish it to a host."
language: html
recipes: [bootstrap]
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8130
  url: http://127.0.0.1:8130/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#run
explainClip:
  query: { code: "@page.html#run", zoom: 1.4 }
  caption: "A website is a folder: the page, and every file it uses, side by side"
  clip:
    - caption: "This page uses three pictures from beside it."
    - wait: 1200
    - caption: "Download saves the page as index.html, the name a website's first page has."
    - click: Download
    - expect: { selector: "#dl", contains: "trophy.svg" }
    - caption: "Then it lists every file the page uses. Each goes in the same folder."
    - wait: 1400
    - caption: "Open index.html from that folder. If it works there, it works online."
    - wait: 1400
hook: "Every website you visit is a folder of files on a computer that is always switched on. Yours can be one too."
---
A website is a **folder of files**: the page, called `index.html`, and every picture, stylesheet, script and data file it uses, side by side. A **host** keeps the folder on a computer that is always online and gives it an address.

To get your page ready:

1. Press **Download** in the playground. It saves `index.html` and lists every file the page uses from beside it (pictures, `bootstrap.min.css`, `vue.js`, `weather.json`). Download each one into the **same folder**.
2. Check every path is **relative**: `src="trophy.svg"` means "beside this page". A path from your own computer (`C:/Users/…`) only works on your computer.
3. **Test the folder**: open `index.html` from your computer. If it works there, it will work online. (A page that uses `fetch` needs a host to test; the rest work by double-clicking.)
4. **Publish** it with your teacher: the host and how to sign in depend on your school.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students think the page is one file; predicting a broken picture makes \"a site is a folder\" concrete before they download anything."
check:
  type: predict
  q: "You download only index.html and open it from your Downloads folder. What do you see?"
  options:
    - "The heading and text, with a broken picture where the trophy was"
    - "Everything, just as in the playground"
    - "A blank page"
    - "An error message"
  actual: "The page, with a broken picture. src=\"trophy.svg\" means \"beside this page\", and trophy.svg is not beside it in Downloads. Put it in the same folder."
```

`src="trophy.svg"` asks for a file beside the page.

## Run

```step
stage: run
code: page.html#run
try: { playground: html, starter: "page.html#run", height: 420 }
check: { type: reflect, text: "I downloaded the page and its files into one folder, opened index.html from my computer, and every picture showed." }
unlocks: [whole-page, relative-path]
```

Press **Download**, then download each file it lists into the same folder. Open `index.html` from that folder. If a picture is broken, which file is missing?

## Investigate

```step
stage: investigate
code: page.html#run
insight: "A relative path is read from where the page is; anything that points at one computer, or at nothing, breaks online."
tasks:
  - check:
      type: match
      q: "Where does each path look for its file?"
      pairs:
        - ["trophy.svg", "beside the page, in the same folder"]
        - ["images/trophy.svg", "in a folder called images, beside the page"]
        - ["C:/Users/ada/Desktop/trophy.svg", "on Ada's computer only"]
        - ["https://example.com/trophy.svg", "on another website"]
      explain: "Relative paths travel with the folder: the page finds its files wherever the folder goes. Paths on one computer break everywhere else."
  - check:
      type: sort
      q: "Which of these are fine on a public page for a school club, and which stay off it?"
      options: ["Fine to publish", "Keep it off"]
      items:
        - ["The club's name and meeting day", "Fine to publish"]
        - ["Pictures you drew yourself", "Fine to publish"]
        - ["Your full name and your school's address", "Keep it off"]
        - ["Photos of classmates", "Keep it off"]
        - ["Your email address or phone number", "Keep it off"]
      explain: "Anything online can be copied and kept. Leave out what identifies a person, and ask before using anyone's photo; your school will have its own rules too."
  - check:
      type: bug
      code: page.html#bug
      text: "On Ada's computer both pictures show. Online, the trophy is a broken picture and the medal is fine. Click the line that is wrong."
      answer: 2
      fault: logic
      misconception: path-from-my-computer
      explain: "C:/Users/ada/Desktop/ is a folder on Ada's computer, not on the web. Put trophy.svg in the site's folder and write src=\"trophy.svg\"."
```

### Where does it look?

Four kinds of path.

### Safe to publish?

Think before it goes public.

### Spot the bug

It worked on my computer.

## Modify

```step
stage: modify
insight: "Making a page ready to publish is making every path relative to the page."
try: { playground: html, starter: "page.html#fix", height: 420 }
hint:
  - "Each file will sit beside index.html, so each path is just the file's name."
  - "src=\"star.svg\", src=\"medal.svg\" and href=\"bootstrap.min.css\"."
expected: page.html#sol-fix
check: { type: code, text: "Fix all three paths so the page works once it is online.", rules: { contains: ["src=\"star.svg\"", "src=\"medal.svg\"", "href=\"bootstrap.min.css\""] } }
```

Sam's page works on Sam's computer only. Fix its paths. The preview already shows what will go wrong online: the pictures and the Bootstrap look are missing until each path is right.

## Make: publish your page

```step
stage: make
tier: typical
insight: "Goals only: the student's own checked page, as a folder, online at an address."
try: { playground: html, starter: "page.html#make", height: 420 }
check: { type: reflect, text: "My page is online at an address I can share, and I checked it on another device." }
```

Publish the page you checked in **Pages for everyone**:

1. Paste it in, press **Download**, and put `index.html` and every file it lists in one folder.
2. Open `index.html` from the folder and check every part works.
3. Publish the folder in the way your teacher shows you: for example GitHub Pages, Netlify Drop, or your school's own website.
4. Open the address on another device, such as a classmate's laptop.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You change your page after it is online. What do you do?"
  options: ["Change the files in the folder, and publish the folder again", "Nothing: it updates itself", "Make a new website", "Delete the old one first"]
  answer: 0
  explain: "The host shows whatever files you last gave it. Change, test on your computer, publish again."
```

Your page is ready for real people, and online. A page that needs a server of its own (saving data for everyone, a login) is a web app: **Web apps with Flask**.
