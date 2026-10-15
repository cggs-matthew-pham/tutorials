---
title: "Rules and selectors"
subtitle: "Structure and style a page · Text and style · Lesson 3"
---

# Rules and selectors

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website you know uses the same HTML tags; CSS is what makes one look nothing like another.


:::teacher-note

**In one sentence:** Students write CSS rules in a style block, find out that a tag selector styles every tag of that kind, and that a rule changes how a part looks, not what it is.

**Students should be able to say:** I can write a CSS rule with a selector, a property and a value. I can say which elements a tag selector styles, and which it leaves alone. I can explain that a rule changes how a part looks, not what it is.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`p { color: teal; }` is a **rule**. Read the code. How many lines of text will turn teal?

```html
<style>
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
```

:::keep-together

**How many lines of text turn teal?**

☐ None: the rule does not say which paragraph to change

☐ 1: only the first paragraph

☐ 2: both paragraphs

☐ 4: every line of text on the page

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2: both paragraphs. The rule names the tag p, not one paragraph, so every p changes. The heading is not a p, so it stays black.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<style>
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
<p>Races start at 9 am.</p>
```

:::keep-together

### Three paragraphs

**A third paragraph is added to the page. Fill in the colour of each line of text.**

{{rows 1}}

| text | tag | colour |
|---|---|---|
| Sports day | h1 | black |
| Sports day is on Friday. | p | teal |
| What to bring | h2 |   |
| Bring a hat and water. | p |   |
| Races start at 9 am. | p |   |

:::


:::teacher-note

**Answer:** black, teal, teal

The rule picks every p, including one added later, so all three paragraphs are teal. The h1 and h2 are different tags, so the rule leaves them alone.

:::


:::keep-together

### Small but still a heading

**The rule h1 { font-size: 14px; } makes the heading smaller than the paragraphs. Is it still a heading?**

☐ No: a heading has to be the biggest text on the page

☐ No: it is just small text now

☐ Yes, but only until the page is saved

☐ Yes: the &lt;h1&gt; tag still says it is the main heading; the rule changed only how it looks

:::


:::teacher-note

**Answer:** Yes: the &lt;h1&gt; tag still says it is the main heading; the rule changed only how it looks

The tag says what a part is, and the rule says how it looks. Making an &lt;h1&gt; small does not turn it into a paragraph, and screen readers and search engines still treat it as the main heading.

:::


:::typical

## Modify


**Change a colour.** Give the heading a different colour.

**Bigger paragraphs.** Add a rule that makes every paragraph `20px`.

**A rule for the h2.** Add a rule that gives every `h2` a `lightyellow` background and centred text.

**Another font.** Add a line to the `p` rule so the paragraphs use `font-family: sans-serif;`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Change a colour:**

```html
<style>
  h1 {
    color: darkgreen;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

**Bigger paragraphs:**

```html
<style>
  h1 {
    color: darkgreen;
  }
  p {
    font-size: 20px;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

**A rule for the h2:**

```html
<style>
  h1 {
    color: darkgreen;
  }
  p {
    font-size: 20px;
  }
  h2 {
    background-color: lightyellow;
    text-align: center;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

**Another font:**

```html
<style>
  h1 {
    color: darkgreen;
  }
  p {
    font-size: 20px;
    font-family: sans-serif;
  }
  h2 {
    background-color: lightyellow;
    text-align: center;
  }
</style>
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel and a hat.</p>
```

:::

:::


## Mix it up

Sam's notice should have important words in crimson, but the page looks wrong. Fix the tags, then write one rule so every `<strong>` is crimson.

```html
<style>
  h1 {
    color: navy;
  }
</style>
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</strong></em> on Friday.</p>
<p>Races start at <strong>9 am</strong>.</p>
```

## Make

The `<style>` block is ready at the top of this concert notice, with no rules. Write three rules: one for `h1`, one for `h2` and one for `p`. Give each a colour, and change at least one font.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  h1 {
    color: purple;
    font-size: 44px;
  }
  h2 {
    color: teal;
    background-color: lightyellow;
  }
  p {
    font-family: sans-serif;
  }
</style>
<h1>Spring concert</h1>
<h2>When and where</h2>
<p>The concert is on Wednesday at 6 pm in the hall.</p>
<h2>Who is playing</h2>
<p>The Year 7 band, the choir and the string group.</p>
<p>Tickets are free. Bring a friend!</p>
```

:::


## Exit ticket

:::keep-together

**A rule h2 { color: purple; } is added to a page with four h2 headings. How many turn purple, and is any &lt;h2&gt; changed into something else?**

{{lines-3}}

:::


:::teacher-note

**Answer:** All four turn purple, because the selector names the tag. None changes into something else: the tag is still h2, and the rule only changes how it looks.

:::

