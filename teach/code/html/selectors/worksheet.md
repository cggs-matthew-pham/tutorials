---
title: "Rules and selectors"
subtitle: "HTML & CSS · Style · Lesson 5"
---

# Rules and selectors

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website you know uses the same HTML tags; CSS is what makes one look nothing like another.


:::teacher-note

**In one sentence:** Students write CSS rules in a style block, learn that a selector picks only the elements that match (by tag, or by class with a dot), and find that a selector that matches nothing is silently ignored.

**Students should be able to say:** I can write a CSS rule with a selector, a property and a value. I can explain which elements a selector styles, and which it leaves alone. I can give an element a class and style only that element. I can find why a rule does nothing by checking its selector.

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
<ul>
  <li>Hat</li>
  <li>Water</li>
</ul>
<p>Races start at 9 am.</p>
```

:::keep-together

**How many lines of text turn teal?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2: only the two paragraphs. The heading and the list items are not &lt;p&gt;, so the rule does not pick them.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<style>
  h1 {
    color: navy;
    font-size: 40px;
  }
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

:::keep-together

### Match the parts

**Match each part of the h1 rule with its job.**

A. a value: what to change it to

B. a property: what to change

C. ends each declaration

D. hold the declarations of one rule

E. the selector: which elements the rule styles

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `h1` | |
| `color` | |
| `navy` | |
| `{ }` | |
| `;` | |

:::


:::teacher-note

**Answer:** h1 → E. the selector: which elements the rule styles; color → B. a property: what to change; navy → A. a value: what to change it to; { } → D. hold the declarations of one rule; ; → C. ends each declaration

Selector, then braces. Inside: property, colon, value, semicolon, as many times as you like.

:::


:::keep-together

### A class

**Which paragraph does .note { color: crimson; } style?**

☐ The heading

☐ Both paragraphs

☐ Only the one with class="note"

☐ None: there is no &lt;note&gt; tag

:::


:::teacher-note

**Answer:** Only the one with class="note"

A dot in CSS means a class. .note picks every element marked class="note", and nothing else. The dot is only in the CSS, not in the HTML.

:::


:::keep-together

### The rule that does nothing

**Bring a hat should be crimson, but it stays black, and there is no error. Click the line in the CSS that causes it.**

```
 1  <style>
 2    .Notice {
 3      color: crimson;
 4    }
 5  </style>
 6  <p>Sports day is on Friday.</p>
 7  <p class="notice">Bring a hat.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2 says .Notice, but the paragraph's class is notice. Class names must match exactly, capitals included. A selector that matches nothing is simply ignored.

:::


:::keep-together

### Mix and match

One rule for two kinds of element (`h1, h2`), a class on a list item, and a paragraph that matches two rules.

```html
<style>
  h1, h2 {
    color: navy;
  }
  p {
    font-size: 20px;
  }
  .note {
    color: crimson;
  }
  .done {
    color: gray;
  }
</style>
<h1>Sports day</h1>
<h2>Events</h2>
<ul>
  <li class="done">Sprint</li>
  <li>Relay</li>
</ul>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

**The last paragraph matches two rules: p (20px) and .note (crimson). What does it look like?**

☐ Only 20px: the first rule wins

☐ Black: the two rules cancel out

☐ Crimson and 20px: both rules apply

☐ Only crimson: the class rule replaces the p rule

:::


:::teacher-note

**Answer:** Crimson and 20px: both rules apply

When rules set different properties, every matching rule applies. One rule can also pick several kinds of element at once: h1, h2 { } styles both.

:::


:::keep-together

### Three layers

**A web page has three layers. Sort each part of the Sports day page into its layer.**

Groups: Content: the words and pictures, Structure: the tags that say what each part is, Presentation: how it looks

- The words Sports day is on Friday.: {{field-15}}
- The words Sprint and Relay: {{field-15}}
- &lt;h1&gt; around the title: {{field-15}}
- &lt;ul&gt; and &lt;li&gt; around the events: {{field-15}}
- h1, h2 { color: navy; }: {{field-15}}
- .note { color: crimson; }: {{field-15}}

:::


:::teacher-note

**Answer:** The words Sports day is on Friday. → Content: the words and pictures; The words Sprint and Relay → Content: the words and pictures; &lt;h1&gt; around the title → Structure: the tags that say what each part is; &lt;ul&gt; and &lt;li&gt; around the events → Structure: the tags that say what each part is; h1, h2 { color: navy; } → Presentation: how it looks; .note { color: crimson; } → Presentation: how it looks

The words are the content. The tags give it structure: this is a heading, this is a list. The CSS is the presentation. You can change the CSS and the heading is still a heading; you can change the words and the page still looks the same.

:::


:::typical

## Modify


**Change a colour.** Give the heading a different colour.

**Bigger paragraphs.** Add a rule that makes every paragraph `20px`.

**Mark one paragraph.** Give the second paragraph `class="reminder"`, then add a `.reminder` rule with `background-color: lightyellow;`.

**One rule for two.** Write one rule, `h1, p`, that gives the heading and the paragraphs `font-family: sans-serif;`.

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
<p>The carnival is on Thursday.</p>
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
<p>The carnival is on Thursday.</p>
<p>Bring a towel and a hat.</p>
```

**Mark one paragraph:**

```html
<style>
  h1 {
    color: darkgreen;
  }
  p {
    font-size: 20px;
  }
  .reminder {
    background-color: lightyellow;
  }
</style>
<h1>Swimming carnival</h1>
<p>The carnival is on Thursday.</p>
<p class="reminder">Bring a towel and a hat.</p>
```

**One rule for two:**

```html
<style>
  h1 {
    color: darkgreen;
  }
  p {
    font-size: 20px;
  }
  .reminder {
    background-color: lightyellow;
  }
  h1, p {
    font-family: sans-serif;
  }
</style>
<h1>Swimming carnival</h1>
<p>The carnival is on Thursday.</p>
<p class="reminder">Bring a towel and a hat.</p>
```

:::

:::


## Make

Style this concert notice your way: at least three rules (for example the heading, the section headings and the paragraphs), and one class that makes the most important line stand out.

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
  }
  p {
    font-family: sans-serif;
  }
  .highlight {
    background-color: lightyellow;
    font-size: 22px;
  }
</style>
<h1>Spring concert</h1>
<h2>When and where</h2>
<p>The concert is on <strong>Wednesday</strong> at 6 pm in the hall.</p>
<h2>Who is playing</h2>
<p>The Year 7 band, the choir and the string group.</p>
<p class="highlight">Tickets are free. Bring a friend!</p>
```

:::


:::wider

## Restyle the club notice

Someone styled this notice, and it is hard to read: a tiny yellow heading and pale grey text. Make it easy to read (a dark heading at least `40px`, dark paragraph text), then give the sign-up line a class and a background colour so it stands out.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  h1 {
    color: navy;
    font-size: 40px;
  }
  p {
    color: black;
    font-size: 18px;
  }
  .signup {
    background-color: lightyellow;
  }
</style>
<h1>Robotics Club</h1>
<p>We meet every Tuesday at lunch in the STEM lab.</p>
<p>New members are welcome: no experience needed.</p>
<p class="signup"><a href="https://example.com/join">Sign up here</a></p>
```

:::

:::


## Exit ticket

:::keep-together

**A student writes .Warning { color: red; } but the paragraph with class="warning" stays black. Why, and how do they fix it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The selector does not match: class names are case-sensitive, so .Warning does not pick class="warning". Change the selector to .warning (or the class to Warning).

:::

