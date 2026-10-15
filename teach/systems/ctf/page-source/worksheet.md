---
title: "What your page gives away"
subtitle: "Capture the flag · What gives secrets away · Lesson 2"
---

# What your page gives away

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The club page looks harmless. View its source and it gives away a password, three emails and a join code.


:::teacher-note

**In one sentence:** Students view a club web page as a visitor can, through its source and a photo's details, find what it gives away (a password in a comment, emails in a hidden field, a join code in a script, a photo's location), fix each leak, then check and fix a sign-up page (AC9TDI10P14 node 3). Defensive, on the students' own made-up pages. A 5E mission lesson.

**Students should be able to say:** I can find what a page sends to every visitor, shown or not. I can say why a check in the browser isn't enough. I can fix a page so private data and checks stay on the server.

**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Engage


:::keep-together

**A page has a hidden field holding members' emails. It doesn't show on the page. Can a visitor get the emails?**

☐ Only the club's admin can

☐ Only if the page crashes

☐ No: hidden means hidden

☐ Yes: the whole page is sent to their browser, hidden parts too

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Yes. View source (or saving the page) shows everything the browser received, hidden fields included.

:::


## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explain: everything is sent

1. $\text{comments}$ — Not shown, but sent: never put passwords or notes in them.
2. $\text{hidden fields}$ — Not shown, but sent: keep private data on the server.
3. $\text{scripts}$ — Sent and readable; a check in the browser can be skipped, so check again on the server.
4. $\text{files}$ — A photo carries details such as where it was taken: remove them before uploading.
5. $\text{test}$ — Does the visitor's browser receive it? Then the visitor can read it.

### Find the mistake

:::keep-together

**Sam adds the members' emails to the page. Click the line where it first goes wrong.**

```
 1  Sam's club page needs the members' emails for a script.
 2  Sam puts them in a hidden field.
 3  The page doesn't show the emails.
 4  So visitors can't get the emails.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4: the page didn't show them, but it sent them. Anyone can read them in the source.

:::


:::typical

## Elaborate: fix it

:::


## Make: Elaborate: before launch


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Name two things a page can give away without showing them, and the fix for one.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Comments, hidden fields, scripts (codes, keys, checks), a photo's location. Fix: delete it or keep it on the server; remove photo details before uploading.

:::

