---
marp: true
theme: default
html: true
---

# Three layers

How a web page is made · Three layers

<!-- Speaker note: Students swap style sheets, show a page's structure and switch the style off to separate content, structure and presentation, then change one layer at a time (AC9TDI10K02 nodes 1 and 2), with no coding needed. About 40 minutes (Predict and Try 6 min · Worked example 10 min · Vary 12 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** a web page is content (the words and pictures), structure (HTML tags saying what each part is) and presentation (CSS saying how it looks). Swap the style sheet and only the look changes; show the structure and see the tags underneath.

- I can name the three layers of a web page.
- I can say which layer a part or a change belongs to.
- I can change the look of a page without changing its structure or words.

<!-- Speaker note: Before class: Try the boards yourself. The one idea: content, structure and presentation are separate layers. This is a Knowledge and understanding lesson: students read and tweak a style sheet but never have to write a page. The Code pathway's HTML & CSS course is where they build pages (its Rules and selectors lesson links back here). Node 2's minimum width asks students to write a small page; here they edit an existing one, which covers the explanation part. Students who want to write their own can open the HTML & CSS course's first lesson. Hands-on: in a browser, many sites can be seen without their style sheet (Firefox: View › Page Style › No Style; Safari's Reader view is similar). Teacher: Try: ask what stayed the same across all three looks. Teacher: Worked example: for each sorted item, ask "what it says, what it is, or how it looks?" Teacher: Vary: after the content change, ask which layer a translator would change. -->

---

## Why it matters

> One page, three completely different looks, and not a single word changed. What did change?

<!-- Speaker note: Every web page you read is built in three layers: **content** (what it says), **structure** (what each part is) and **presentation** (how it looks). You don't need to write code to see them: this board takes one page apart. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You switch off a web page's style sheet (its CSS). What is left?**

- The colours, but no words
- A blank page
- All the words, headings and lists, in a plain look
- Nothing changes at all

<!-- Speaker note: What happens: Everything except the look: the words (content) and the headings, list and menu (structure) are all still there, in the browser's plain default style. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who said a blank page think the style sheet holds the words. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fweb%2Flayers%2Fstep-2&code=widget%3A+webdoc%0Astyles%3A+plain%2C+ocean%2C+poster%0Areader%3A+off%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/web/layers/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Everything except the look: the words (content) and the headings, list and menu (structure) are all still there, in the browser's plain default style.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## "This week", layer by layer

Now sort the parts of the page.

$$\text{content: } \textit{This week}$$

1) $\text{structure: } \texttt{<h2>This week</h2>}$ — The HTML tag says it is a level-2 heading.
2) $\text{presentation: } \texttt{h2 \{ color: teal; font-size: 20px; \}}$ — The CSS rule says how every h2 looks.
3) $\text{change the style sheet} \Rightarrow \text{only presentation changes}$ — Same words, same tag, a new look.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write content: This week and say "The words on the page." Line 1: write structure: <h2>This week</h2> and say "The HTML tag says it is a level-2 heading." Line 2: write presentation: h2 \ color: teal; font-size: 20px; \ and say "The CSS rule says how every h2 looks." Line 3: write change the style sheet only presentation changes and say "Same words, same tag, a new look." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## "This week", layer by layer

**Which layer is each one?**

Groups: Content · Structure · Presentation

The words "Bring a friend!" · A photo of the robot · &lt;h2&gt; marking "This week" as a heading · &lt;ul&gt; and &lt;li&gt; marking the list · &lt;nav&gt; marking the menu · color: teal · font-size: 30px · The page's background colour

* Answer: The words "Bring a friend!" → Content; A photo of the robot → Content; &lt;h2&gt; marking "This week" as a heading → Structure; &lt;ul&gt; and &lt;li&gt; marking the list → Structure; &lt;nav&gt; marking the menu → Structure; color: teal → Presentation; font-size: 30px → Presentation; The page's background colour → Presentation

<!-- Speaker note: Content is what it says; structure is what each part is (HTML tags); presentation is how it looks (CSS rules). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam compares the Plain and Poster styles. Click the line where it first goes wrong.**

```
 1  In the Plain style, "This week" is a heading.
 2  In the Poster style, "This week" is pink and huge.
 3  So the Poster style changed "This week" into a different kind of part.
 4  To make it a list item, Sam should change the style sheet.
```

* Answer: line 3

<!-- Speaker note: Line 3: the style sheet changes how "This week" looks, never what it is. It is an h2 heading in every style. To make it a list item you change the HTML (structure). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which layer?

**You want every heading on the page to be purple. Which layer do you change?**

- All three
- Presentation: one CSS rule
- Content: retype the headings
- Structure: change every heading tag

* Answer: Presentation: one CSS rule

<!-- Speaker note: h2 { color: purple; } in the style sheet: one rule, and the HTML is untouched. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one layer



- **Colour:** 
- **Size:** 
- **Content:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/web/layers/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one layer and checks the others stay put: a colour, a size, then the content itself (in the HTML), not the look. For students who need more support: A three-column card: Content (what it says), Structure (what it is), Presentation (how it looks), with an example of each. For early finishers: Find a website with a dark mode switch. Which layer does the switch change, and how could you tell? The hard part, on purpose: Students judge parts by how they look. Keep asking "what is it?" before "how does it look?", and use the Structure button to check. When students get stuck: A student says the Poster style made new headings (Sam's mistake). Ask: Turn on Structure. Are the tags the same in every style? Fix: Yes: the style sheet changes looks only. / A student's CSS does nothing. Ask: Is the rule's selector a tag on the page (h1, h2, p, li)? Is there a semicolon and a closing brace? Fix: Fix the selector or the punctuation. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Dark mode

**The school site gets a dark mode. Which layer changes?**

- Structure
- Content
- Presentation

* Answer: Presentation

<!-- Speaker note: Dark mode is a different style sheet: only the look. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## French

**The page is translated into French. Which layer changes?**

- Content
- Presentation
- Structure

* Answer: Content

<!-- Speaker note: The words change; the structure and look can stay. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A list

**Three lines of text become a bulleted list. Which layer changes?**

- Content
- Structure
- Presentation

* Answer: Structure

<!-- Speaker note: Wrapping them in <ul> and <li> tags changes what they are: a list. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: text

**Review: how does the computer store the word "Hi" in the page?**

- As the CSS rules
- It isn't stored
- As numbers: one character code for each letter
- As a picture of the letters

* Answer: As numbers: one character code for each letter

<!-- Speaker note: H is 72 and i is 105: content is numbers too. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a new look

Then: open any website and imagine its style sheet switched off. What would its structure be?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/web/layers/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Restyling the whole page without touching the HTML reverses the process: from a look you want to the presentation rules that make it. Hints, in order: Only the style sheet box is yours to change. / Try body { background: …; } and h1 { color: …; }. / For example body { background: black; color: white; } and h1 { color: gold; }. -->

<!-- Speaker note: Teacher: compare looks; ask whether anyone needed to touch the HTML. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Give one example of each layer from a web page you use, and say which layer a dark mode changes.**

* For example: the article text (content), its headings and lists (structure), its colours and fonts (presentation). Dark mode changes presentation.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Why keep them apart (sites, phones, screen readers). Put to work in: Code › HTML & CSS (writing pages and style sheets). -->
