---
title: "Why keep them apart"
subtitle: "How a web page is made · Three layers · Lesson 2"
---

# Why keep them apart

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Two pages look almost the same. To a blind student using a screen reader, one of them has no headings at all. How?


:::teacher-note

**In one sentence:** Students hear two look-alike pages through a screen reader, restyle a three-page site with one CSS rule, view a page at phone width, and fix a page whose structure was faked with looks (AC9TDI10K02 node 3), with no coding needed beyond tidying tags.

**Students should be able to say:** I can explain why content, structure and presentation are kept apart. I can give examples: a whole site, a phone, a screen reader. I can fix a page whose headings and lists were faked with looks.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Page A marks "This week" with a heading tag. Page B makes it big and bold with no heading tag. Both look almost the same. What does a screen reader say for Page B?**

☐ Nothing at all

☐ "Heading level 2: This week", the same as Page A

☐ Just the words "This week", like any other text

☐ "Big bold text: This week"

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Just the words. A screen reader reads the structure; on Page B there is no heading to announce, so a blind reader can't jump between sections.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: three reasons


:::keep-together

### Separation pays off

1. $\text{a whole site}$ — One style sheet styles every page: change a rule once, every page changes.
2. $\text{a phone}$ — The same content and structure; different presentation rules for a narrow screen.
3. $\text{a screen reader}$ — It reads the structure aloud (headings, lists, menus) and ignores the look.
4. $\text{editing}$ — Writers change content, designers change presentation, without breaking each other's work.

Now count the files for the 200-page site.

**A school site has 200 pages, all using one style sheet. How many files must change to make every heading green?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 1

One rule in one file: h2 { color: green; } restyles all 200 pages.

:::


:::keep-together

### Find the mistake

**Sam compares Page A and Page B. Click the line where it first goes wrong.**

```
 1  Page A uses an h2 tag for "This week".
 2  Page B uses big bold text for "This week".
 3  On screen they look almost the same.
 4  So every visitor gets the same page from both.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4: a screen reader, a search engine and a phone layout use the structure, not the look. Page B's visitors who can't see it get no headings and no list.

:::


:::keep-together

### Phone or laptop

**Why can the same page appear in one column on a phone and two on a laptop?**

☐ The presentation changes with the screen size; the content and structure stay the same

☐ It can't; phones show the laptop layout

☐ The phone rewrites the HTML

☐ The website keeps a separate copy for phones

:::


:::teacher-note

**Answer:** The presentation changes with the screen size; the content and structure stay the same

CSS can say "on narrow screens, one column": a presentation choice.

:::


:::typical

## Vary: one change, many effects


**A whole site.** 

**Phone.** 

**No style at all.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Why it matters


:::keep-together

### A site-wide change

**A designer puts &lt;font&gt; and &lt;b&gt; tags all through a 50-page site to make it look right. A year later the school changes its colours. What happens?**

☐ One style sheet change fixes it

☐ Nothing needs changing

☐ The colours update themselves

☐ Someone edits all 50 pages by hand

:::


:::teacher-note

**Answer:** Someone edits all 50 pages by hand

With the look mixed into the HTML, every page must be edited. Kept in CSS, it's one change.

:::


:::keep-together

### Screen readers

**Which helps a blind student most?**

☐ More pictures

☐ A bigger screen

☐ Real headings and lists in the HTML

☐ Large, colourful text

:::


:::teacher-note

**Answer:** Real headings and lists in the HTML

The screen reader announces the structure, so headings and lists let them jump around the page.

:::


:::keep-together

### Review: layers

**Review: &lt;nav&gt; around the menu links is which layer?**

☐ Presentation

☐ Content

☐ Structure

:::


:::teacher-note

**Answer:** Structure

It marks the part as navigation: structure.

:::


## Make: fix Page B

Then: on a real website, use your browser's reader view. What does it keep, and what does it throw away?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Give two reasons to keep a page's look in a style sheet instead of in its HTML.**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: one change restyles a whole site; screen readers and phones use the structure, so the page works for more people and devices.

:::

