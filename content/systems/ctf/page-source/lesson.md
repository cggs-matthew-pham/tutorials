---
order: 2
unit: skills
node: AC9TDI10P14 n3
assumes: [web-layers]
shape: 5e
title: What your page gives away
summary: "A web page is sent whole to every visitor's browser, so its source is theirs to read: comments, hidden fields and scripts, even when the page doesn't show them. Photos can carry where they were taken. And a check that runs in the browser can be skipped. Keep secrets and real checks on the server, and strip photo details before you upload."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The club page looks harmless. View its source and it gives away a password, three emails and a join code."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8543
  url: http://127.0.0.1:8543/index.html
  readySelector: ".srpage"
  layout: full
explainPicture: { ref: source.yml#explain-pic, caption: "The club page as visitors see it, with View source and Photo details: what every visitor's browser receives." }
explainClip:
  query: { code: "@source.yml#explain", fresh: 1, id: explain }
  caption: "What the browser receives"
  say: "The page looks harmless."
  clip:
    - click: "View source"
    - caption: { text: "View source: the whole page, as every visitor's browser receives it.", say: "View source shows what every browser receives." }
    - wait: 1200
    - click: "Line 2: mark as a leak"
    - expect: { selector: "#gsum", contains: "1 of 4" }
    - caption: { text: "A comment isn't shown on the page, but it's sent: here, an admin password.", say: "A comment isn't shown, but it's sent. Here, a password." }
    - wait: 1500
---
**Your mission:** the club's website is about to go live. Check it the way a visitor could, find everything it gives away, and fix it before anyone else looks.

## Engage: not shown, not sent?

```step
stage: predict
insight: "Committing to whether hidden parts reach visitors tests the new move: the browser receives the whole page."
check:
  type: predict
  q: "A page has a hidden field holding members' emails. It doesn't show on the page. Can a visitor get the emails?"
  options: ["Yes: the whole page is sent to their browser, hidden parts too", "No: hidden means hidden", "Only the club's admin can", "Only if the page crashes"]
  actual: "Yes. View source (or saving the page) shows everything the browser received, hidden fields included."
```

## Explore: check the club page

```step
stage: run
insight: "Students look at the page as a visitor can, through its source and its photo, and find the leaks, missing some at first."
try: { playground: board, starter: "source.yml#explore", height: 620 }
check: { type: board, text: "Find everything the club page gives away. Look at what visitors see, then everything their browser receives. Mark only real leaks.", when: "l = n and x = 0", explain: "Four: the admin password in a comment, the members' emails in a hidden field, the join code in a script, and the photo's location in its details." }
```

Was your prediction right?

## Explain: everything is sent

```step
stage: investigate
insight: "The teacher models checking each part of a page with one question: does the browser receive it? Sam trusts a hidden field, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam adds the members' emails to the page. Click the line where it first goes wrong."
  answer: 4
  fault: logic
  misconception: hidden-on-page-is-private
  explain: "Line 4: the page didn't show them, but it sent them. Anyone can read them in the source."
```

```worked
\text{comments} :: Not shown, but sent: never put passwords or notes in them.
\text{hidden fields} :: Not shown, but sent: keep private data on the server.
\text{scripts} :: Sent and readable; a check in the browser can be skipped, so check again on the server.
\text{files} :: A photo carries details such as where it was taken: remove them before uploading.
\text{test} :: Does the visitor's browser receive it? Then the visitor can read it.
```

### Find the mistake

## Elaborate: fix it

```step
stage: modify
insight: "One change: from finding leaks to fixing them, where the wrong fixes only hide them; then a second page to check."
try: { playground: board, starter: "source.yml#fix", height: 680 }
tasks:
  - starter: "source.yml#fix"
    check: { type: board, text: "Fix all four leaks on the club page so nothing private reaches a visitor.", when: "f = n", explain: "Delete the comment and change the password, keep the emails and the join check on the server, and strip the photo's location. Hiding things on the page fixes nothing." }
  - starter: "source.yml#signup"
    check: { type: board, text: "Now check the sign-up page. Mark only real leaks.", when: "l = n and x = 0", explain: "A test account in a comment, a password rule only checked in the browser, a private key in a script, and an unlisted drafts page anyone with the address can open." }
```

### Fix the club page

### The sign-up page

## Elaborate: before launch

```step
stage: make
insight: "Producing the safe version of a page: each fix moves a secret or a check off the visitor's browser."
try: { playground: board, starter: "source.yml#make", height: 720 }
hint: ["For each leak, ask: after this fix, does the visitor's browser still receive it?", "Renaming, hiding and splitting all leave it in the page."]
check: { type: board, text: "Fix every leak on the sign-up page before it launches.", when: "f = n", explain: "Remove the test account, check the password on the server, keep the key on the server, and put the drafts behind a sign-in." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "You're about to post a photo taken at home on the club page. What should you check first?"
      options: ["Its details: remove the location before uploading", "That the file name is short", "That it's under 1 MB", "Nothing: photos are just pictures"]
      answer: 0
      feedback: [null, "The name isn't where the location hides.", "Size doesn't change what's inside.", "A photo's details can include where it was taken."]
      explain: "Many phones store the place a photo was taken inside the file. Remove it, or turn location off for the camera."
  - check: { type: reflect, text: "I can check what my own page gives away and keep secrets and checks on the server." }
```

### The photo

### Look back
