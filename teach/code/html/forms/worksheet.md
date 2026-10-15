---
title: "Forms"
subtitle: "Structure and style a page · Parts of a page · Lesson 12"
---

# Forms

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every sign-up, search box, quiz and online order starts as a form like this.


:::teacher-note

**In one sentence:** Students build a form from linked labels, boxes and a button, and find out that a form collects answers but does nothing with them on its own.

**Students should be able to say:** I can link a label to its box with a matching for and id. I can build a form with labels, boxes, a drop-down and a button. I can explain why a form on its own sends nowhere.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<form>`, `<label>`, `<input>` and `<button>` are new. Read the code. What happens when someone presses Send?

```html
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <button>Send</button>
</form>
```

:::keep-together

**Someone types their name and presses Send. What happens?**

☐ The page shows Thank you

☐ Nothing: the form is not connected to anything yet

☐ The name is emailed to the club

☐ The name is saved in a list of members

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Nothing. A form collects what was typed, but sending or saving it needs code behind the form, and this page has none.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The picture shows this form: each label and its box share a line, the drop-down is a list of choices, and the button is last.

```html
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="email">Email</label>
  <input id="email" type="email"></p>
  <p><label for="house">House</label>
  <select id="house">
    <option>Owls</option>
    <option>Hawks</option>
  </select></p>
  <button>Send</button>
</form>
```

:::keep-together

### Match the parts

**Match each part with its job.**

A. a box to type in

B. the kind of box (an email address)

C. the words that say what to type

D. a button to press

E. a drop-down list of choices

F. holds the fields and the button

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<form>` | |
| `<label for="name">` | |
| `<input id="name">` | |
| `type="email"` | |
| `<select>` | |
| `<button>` | |

:::


:::teacher-note

**Answer:** &lt;form&gt; → F. holds the fields and the button; &lt;label for="name"&gt; → C. the words that say what to type; &lt;input id="name"&gt; → A. a box to type in; type="email" → B. the kind of box (an email address); &lt;select&gt; → E. a drop-down list of choices; &lt;button&gt; → D. a button to press

Labels and boxes come in pairs. type changes the kind of box: text, email, number. A select is a drop-down, with one option for each choice.

:::


:::keep-together

### Linked labels

**Clicking the word Email puts the cursor in the email box. What makes that work?**

☐ The label sits next to the box

☐ Both are inside the same &lt;p&gt;

☐ type="email" on the box

☐ for="email" on the label matches id="email" on the box

:::


:::teacher-note

**Answer:** for="email" on the label matches id="email" on the box

for on the label and id on the box must match exactly. Sitting next to each other, or in the same &lt;p&gt;, links nothing. The link also tells screen readers which words belong to which box.

:::


:::keep-together

### The label that does nothing

**Clicking Name puts the cursor in its box, but clicking Email does nothing, and there is no error. Click the line that breaks the link.**

```
 1  <form>
 2    <p><label for="name">Name</label>
 3    <input id="name" type="text"></p>
 4    <p><label for="email">Email</label>
 5    <input id="mail" type="email"></p>
 6    <button>Send</button>
 7  </form>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

Line 5 has id="mail", but the label says for="email". They must match exactly: change the id to email.

:::


:::typical

## Modify


**Add an email box.** Add an email field with a label linked to it.

**Add a drop-down.** Add a `House` drop-down (Owls, Hawks, Kestrels) with a linked label.

**Test every label.** Click each label in the preview. If the cursor does not jump, compare its `for` with the box's `id`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add an email box:**

```html
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="email">Email</label>
  <input id="email" type="email"></p>
  <button>Join</button>
</form>
```

**Add a drop-down:**

```html
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="email">Email</label>
  <input id="email" type="email"></p>
  <p><label for="house">House</label>
  <select id="house">
    <option>Owls</option>
    <option>Hawks</option>
    <option>Kestrels</option>
  </select></p>
  <button>Join</button>
</form>
```

:::

:::


## Mix it up

Click each label in this sign-up form and see where the cursor goes. Fix what you find, then make the **Join** button stand out with a colour of your choice.

```html
<style>
  h2 {
    color: navy;
  }
</style>
<h2>Bring a friend</h2>
<form>
  <p><label for="name">Your name</label>
  <input id="name" type="text"></p>
  <p><label for="friend">Friend's name</label>
  <input id="name" type="text"></p>
  <button>Join</button>
</form>
```

## Make

Make a sign-up form for a school club or event: a heading, at least two labelled fields (one a drop-down), and a button. Click every label to check it is linked.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h2>Join the choir</h2>
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <p><label for="year">Year</label>
  <select id="year">
    <option>Year 7</option>
    <option>Year 8</option>
  </select></p>
  <p><label for="part">Voice part</label>
  <select id="part">
    <option>Soprano</option>
    <option>Alto</option>
    <option>Not sure yet</option>
  </select></p>
  <button>Join</button>
</form>
```

:::


## Exit ticket

:::keep-together

**A sign-up form has a label Email and a box, but clicking Email does nothing. Give the likely cause and the fix.**

{{lines-3}}

:::


:::teacher-note

**Answer:** The label's for does not match the box's id (or is missing). Make them the same, for example for="email" and id="email".

:::

