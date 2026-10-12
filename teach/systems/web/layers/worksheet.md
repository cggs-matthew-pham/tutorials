---
title: "Three layers"
subtitle: "How a web page is made · Three layers · Lesson 1"
---

# Three layers

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** One page, three completely different looks, and not a single word changed. What did change?


:::teacher-note

**In one sentence:** Students swap style sheets, show a page's structure and switch the style off to separate content, structure and presentation, then change one layer at a time (AC9TDI10K02 nodes 1 and 2), with no coding needed.

**Students should be able to say:** I can name the three layers of a web page. I can say which layer a part or a change belongs to. I can change the look of a page without changing its structure or words.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**You switch off a web page's style sheet (its CSS). What is left?**

☐ The colours, but no words

☐ A blank page

☐ All the words, headings and lists, in a plain look

☐ Nothing changes at all

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Everything except the look: the words (content) and the headings, list and menu (structure) are all still there, in the browser's plain default style.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: one part, three layers


:::keep-together

### "This week", layer by layer

1. $\text{content: } \textit{This week}$ — The words on the page.
2. $\text{structure: } \texttt{<h2>This week</h2>}$ — The HTML tag says it is a level-2 heading.
3. $\text{presentation: } \texttt{h2 \{ color: teal; font-size: 20px; \}}$ — The CSS rule says how every h2 looks.
4. $\text{change the style sheet} \Rightarrow \text{only presentation changes}$ — Same words, same tag, a new look.

Now sort the parts of the page.

**Which layer is each one?**

Groups: Content, Structure, Presentation

- The words "Bring a friend!": {{field-15}}
- A photo of the robot: {{field-15}}
- &lt;h2&gt; marking "This week" as a heading: {{field-15}}
- &lt;ul&gt; and &lt;li&gt; marking the list: {{field-15}}
- &lt;nav&gt; marking the menu: {{field-15}}
- color: teal: {{field-15}}
- font-size: 30px: {{field-15}}
- The page's background colour: {{field-15}}

:::


:::teacher-note

**Answer:** The words "Bring a friend!" → Content; A photo of the robot → Content; &lt;h2&gt; marking "This week" as a heading → Structure; &lt;ul&gt; and &lt;li&gt; marking the list → Structure; &lt;nav&gt; marking the menu → Structure; color: teal → Presentation; font-size: 30px → Presentation; The page's background colour → Presentation

Content is what it says; structure is what each part is (HTML tags); presentation is how it looks (CSS rules).

:::


:::keep-together

### Find the mistake

**Sam compares the Plain and Poster styles. Click the line where it first goes wrong.**

```
 1  In the Plain style, "This week" is a heading.
 2  In the Poster style, "This week" is pink and huge.
 3  So the Poster style changed "This week" into a different kind of part.
 4  To make it a list item, Sam should change the style sheet.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: the style sheet changes how "This week" looks, never what it is. It is an h2 heading in every style. To make it a list item you change the HTML (structure).

:::


:::keep-together

### Which layer?

**You want every heading on the page to be purple. Which layer do you change?**

☐ All three

☐ Presentation: one CSS rule

☐ Content: retype the headings

☐ Structure: change every heading tag

:::


:::teacher-note

**Answer:** Presentation: one CSS rule

h2 { color: purple; } in the style sheet: one rule, and the HTML is untouched.

:::


:::typical

## Vary: change one layer


**Colour.** 

**Size.** 

**Content.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Which layer?


:::keep-together

### Dark mode

**The school site gets a dark mode. Which layer changes?**

☐ Structure

☐ Content

☐ Presentation

:::


:::teacher-note

**Answer:** Presentation

Dark mode is a different style sheet: only the look.

:::


:::keep-together

### French

**The page is translated into French. Which layer changes?**

☐ Content

☐ Presentation

☐ Structure

:::


:::teacher-note

**Answer:** Content

The words change; the structure and look can stay.

:::


:::keep-together

### A list

**Three lines of text become a bulleted list. Which layer changes?**

☐ Content

☐ Structure

☐ Presentation

:::


:::teacher-note

**Answer:** Structure

Wrapping them in &lt;ul&gt; and &lt;li&gt; tags changes what they are: a list.

:::


:::keep-together

### Review: text

**Review: how does the computer store the word "Hi" in the page?**

☐ As the CSS rules

☐ It isn't stored

☐ As numbers: one character code for each letter

☐ As a picture of the letters

:::


:::teacher-note

**Answer:** As numbers: one character code for each letter

H is 72 and i is 105: content is numbers too.

:::


## Make: a new look

Then: open any website and imagine its style sheet switched off. What would its structure be?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Give one example of each layer from a web page you use, and say which layer a dark mode changes.**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: the article text (content), its headings and lists (structure), its colours and fonts (presentation). Dark mode changes presentation.

:::

