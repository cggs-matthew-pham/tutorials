---
marp: true
theme: default
html: true
---

# Why keep them apart

How a web page is made · Three layers

<!-- Speaker note: Students hear two look-alike pages through a screen reader, restyle a three-page site with one CSS rule, view a page at phone width, and fix a page whose structure was faked with looks (AC9TDI10K02 node 3), with no coding needed beyond tidying tags. About 45 minutes (Predict and Try 7 min · Worked example 10 min · Vary 10 min · Practise 6 min · Make 12 min). -->

---

## Today

**We are learning to** keeping content, structure and presentation apart lets each change on its own: one style sheet restyles a whole site, the same page fits a phone or a laptop, and a screen reader can tell a blind reader what each part is. A page that fakes its structure with looks works for nobody but sighted readers.

- I can explain why content, structure and presentation are kept apart.
- I can give examples: a whole site, a phone, a screen reader.
- I can fix a page whose headings and lists were faked with looks.

<!-- Speaker note: Before class: Try the boards yourself. The one idea: separation lets each layer change on its own, which is what makes sites maintainable, adaptable and accessible. The accessibility point matters most to many students; a short screen reader demo (VoiceOver on a Mac or iPad, Narrator on Windows) on a real page lands it. The board's screen reader is a simplified model: it announces headings, links, lists and landmarks, as real screen readers do, but real ones say much more. Page B (the "messy" page) uses tags that are still found on old sites (font, b, br for layout); they work but carry no meaning. Teacher: Try: ask a student to describe how they would find "Coming up" on Page B without seeing it. Teacher: Worked example: ask who else reads structure: search engines, translation tools, reader view. Teacher: Vary: after one rule restyles three pages, ask how that would go with 200 pages styled by hand. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Two pages look almost the same. To a blind student using a screen reader, one of them has no headings at all. How?

<!-- Speaker note: In *Three layers* each layer could change on its own. That isn't just tidy: it decides who can use a page, on what device, and how much work it takes to change a whole site. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Page A marks "This week" with a heading tag. Page B makes it big and bold with no heading tag. Both look almost the same. What does a screen reader say for Page B?**

- Nothing at all
- "Heading level 2: This week", the same as Page A
- Just the words "This week", like any other text
- "Big bold text: This week"

<!-- Speaker note: What happens: Just the words. A screen reader reads the structure; on Page B there is no heading to announce, so a blind reader can't jump between sections. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "Heading level 2" for Page B think the reader sees the look. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fweb%2Fseparation%2Fstep-2&code=widget%3A+webdoc%0Acompare%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/web/separation/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Just the words. A screen reader reads the structure; on Page B there is no heading to announce, so a blind reader can't jump between sections.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Separation pays off

Now count the files for the 200-page site.

$$\text{a whole site}$$

1) $\text{a phone}$ — The same content and structure; different presentation rules for a narrow screen.
2) $\text{a screen reader}$ — It reads the structure aloud (headings, lists, menus) and ignores the look.
3) $\text{editing}$ — Writers change content, designers change presentation, without breaking each other's work.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write a whole site and say "One style sheet styles every page: change a rule once, every page changes." Line 1: write a phone and say "The same content and structure; different presentation rules for a narrow screen." Line 2: write a screen reader and say "It reads the structure aloud (headings, lists, menus) and ignores the look." Line 3: write editing and say "Writers change content, designers change presentation, without breaking each other's work." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Separation pays off

**A school site has 200 pages, all using one style sheet. How many files must change to make every heading green?**

* Answer: 1

<!-- Speaker note: One rule in one file: h2 { color: green; } restyles all 200 pages. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam compares Page A and Page B. Click the line where it first goes wrong.**

```
 1  Page A uses an h2 tag for "This week".
 2  Page B uses big bold text for "This week".
 3  On screen they look almost the same.
 4  So every visitor gets the same page from both.
```

* Answer: line 4

<!-- Speaker note: Line 4: a screen reader, a search engine and a phone layout use the structure, not the look. Page B's visitors who can't see it get no headings and no list. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Phone or laptop

**Why can the same page appear in one column on a phone and two on a laptop?**

- The presentation changes with the screen size; the content and structure stay the same
- It can't; phones show the laptop layout
- The phone rewrites the HTML
- The website keeps a separate copy for phones

* Answer: The presentation changes with the screen size; the content and structure stay the same

<!-- Speaker note: CSS can say "on narrow screens, one column": a presentation choice. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change, many effects



- **A whole site:** 
- **Phone:** 
- **No style at all:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/web/separation/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing and watches what follows: one CSS rule across a site, the screen width, then the style sheet off with the screen reader on. For students who need more support: A list of the structure tags they need for the Make: h1, h2, p, ul, li, nav. For early finishers: Look up the Web Content Accessibility Guidelines (WCAG). Find one rule that is about structure and one about presentation. The hard part, on purpose: The Make asks students to edit HTML for the first time in this course. It is hard on purpose but small: the screen reader shows what's missing; let them use it rather than giving the tags. When students get stuck: A student says the two pages are the same (Sam's mistake). Ask: Turn on the screen reader for both. What does each say first? Fix: Same look, different structure: not the same page for everyone. / A student's fixed page still shows tags used only for looks. Ask: Which tags are left? Which part should each be? Fix: Replace b and font with h1 or h2; turn the br lines into li items in a ul. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A site-wide change

**A designer puts &lt;font&gt; and &lt;b&gt; tags all through a 50-page site to make it look right. A year later the school changes its colours. What happens?**

- One style sheet change fixes it
- Nothing needs changing
- The colours update themselves
- Someone edits all 50 pages by hand

* Answer: Someone edits all 50 pages by hand

<!-- Speaker note: With the look mixed into the HTML, every page must be edited. Kept in CSS, it's one change. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Screen readers

**Which helps a blind student most?**

- More pictures
- A bigger screen
- Real headings and lists in the HTML
- Large, colourful text

* Answer: Real headings and lists in the HTML

<!-- Speaker note: The screen reader announces the structure, so headings and lists let them jump around the page. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: layers

**Review: &lt;nav&gt; around the menu links is which layer?**

- Presentation
- Content
- Structure

* Answer: Structure

<!-- Speaker note: It marks the part as navigation: structure. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: fix Page B

Then: on a real website, use your browser's reader view. What does it keep, and what does it throw away?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/web/separation/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Repairing a page whose structure was faked with looks reverses the process: from what each part should be to the tags that say so. Hints, in order: Turn on the screen reader: what should be headings and a list? / Swap the bold title lines for `<h1>` and `<h2>`, and the three event lines for a `<ul>` with `<li>` items. / Take out every `<font>`, `<b>` and `<br>`; the style sheet does the look. -->

<!-- Speaker note: Teacher: listen to the fixed page together in the screen reader. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Give two reasons to keep a page's look in a style sheet instead of in its HTML.**

* For example: one change restyles a whole site; screen readers and phones use the structure, so the page works for more people and devices.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Links: Code › HTML & CSS (sections, components and the club page put this to work); Security and privacy (what a page gives away, planned). -->
