---
marp: true
theme: default
html: true
---

# What your page gives away

Capture the flag · What gives secrets away

<!-- Speaker note: Students view a club web page as a visitor can, through its source and a photo's details, find what it gives away (a password in a comment, emails in a hidden field, a join code in a script, a photo's location), fix each leak, then check and fix a sign-up page (AC9TDI10P14 node 3). Defensive, on the students' own made-up pages. A 5E mission lesson. About 45 minutes (Engage and Explore 12 min · Explain 8 min · Elaborate 18 min · Evaluate 7 min). -->

---

## Today

**We are learning to** a web page is sent whole to every visitor's browser, so its source is theirs to read: comments, hidden fields and scripts, even when the page doesn't show them. Photos can carry where they were taken. And a check that runs in the browser can be skipped. Keep secrets and real checks on the server, and strip photo details before you upload.

- I can find what a page sends to every visitor, shown or not.
- I can say why a check in the browser isn't enough.
- I can fix a page so private data and checks stay on the server.

<!-- Speaker note: Before class: Try the boards yourself. The pages, people and addresses are made up. The one idea: the whole page is sent to every visitor, so anything in it can be read; secrets and real checks belong on the server, and photos should lose their location before upload. This is about checking your own pages (the students' own sites in HTML & CSS or Your site). Real browsers show the source with View source (Ctrl+U or Cmd+Option+U) and the developer tools. Simplifications: "the server" stands for any code the visitor doesn't receive. Photo details are EXIF data; many phones add the location unless it is turned off, and some sites remove it on upload, but not all. Teacher: Evaluate: have students check their own phone's camera location setting. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> The club page looks harmless. View its source and it gives away a password, three emails and a join code.

<!-- Speaker note: **Your mission:** the club's website is about to go live. Check it the way a visitor could, find everything it gives away, and fix it before anyone else looks. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**A page has a hidden field holding members' emails. It doesn't show on the page. Can a visitor get the emails?**

- Only the club's admin can
- Only if the page crashes
- No: hidden means hidden
- Yes: the whole page is sent to their browser, hidden parts too

<!-- Speaker note: What happens: Yes. View source (or saving the page) shows everything the browser received, hidden fields included. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what 'hidden' means on a web page. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fctf%2Fpage-source%2Fstep-2&code=widget%3A+source%0Aset%3A+club%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/ctf/page-source/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<!-- Speaker note: Teacher: ask which leak was hardest to find, and why. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Yes. View source (or saving the page) shows everything the browser received, hidden fields included.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: everything is sent

**Sam adds the members' emails to the page. Click the line where it first goes wrong.**

```
 1  Sam's club page needs the members' emails for a script.
 2  Sam puts them in a hidden field.
 3  The page doesn't show the emails.
 4  So visitors can't get the emails.
```

* Answer: line 4

<!-- Speaker note: Line 4: the page didn't show them, but it sent them. Anyone can read them in the source. What this step is for: The teacher models checking each part of a page with one question: does the browser receive it? Sam trusts a hidden field, the misconception planted after the method. -->

<!-- Speaker note: Teacher: run the browser test on each line of the source together. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Elaborate: fix it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fctf%2Fpage-source%2Fstep-4&code=widget%3A+source%0Aset%3A+club%0Amode%3A+fix%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/ctf/page-source/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change: from finding leaks to fixing them, where the wrong fixes only hide them; then a second page to check. -->

<!-- Speaker note: Teacher: ask why the unlisted drafts page isn't private. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: before launch



[Open this step](https://studio.learningwaypoints.com/tutorials/systems/ctf/page-source/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Producing the safe version of a page: each fix moves a secret or a check off the visitor's browser. Hints, in order: For each leak, ask: after this fix, does the visitor's browser still receive it? / Renaming, hiding and splitting all leave it in the page. For students who need more support: The one question on a card: does the visitor's browser receive it? For early finishers: View the source of one of your own pages (from HTML & CSS) and list anything you wouldn't want a visitor to read. The hard part, on purpose: Students pick fixes that hide (white text, rename, move). Keep asking the one question: does the browser still receive it? When students get stuck: A student thinks hidden means private (Sam's mistake). Ask: Did the browser receive it? Fix: Then the visitor can read it. / A student fixes the password check by making it stricter in the script. Ask: Who controls the browser that runs the script? Fix: The visitor: check on the server. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name two things a page can give away without showing them, and the fix for one.**

* Comments, hidden fields, scripts (codes, keys, checks), a photo's location. Fix: delete it or keep it on the server; remove photo details before uploading.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Capture the flag, the old archive. -->
