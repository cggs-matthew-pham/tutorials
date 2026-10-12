---
title: "Forms"
subtitle: "HTML & CSS · Components and layout · Lesson 9"
---

# Forms

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every sign-up, search box, quiz and online order starts as a form like this.


:::teacher-note

**In one sentence:** Students build forms from labels, input boxes, a drop-down and a button, link each label to its box, and discover that a form on its own sends nowhere.

**Students should be able to say:** I can build a form with labels, input boxes, a drop-down and a button. I can link a label to its box with matching for and id. I can explain why a form on its own sends nowhere. I can style a form as a card.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<form>`, `<label>`, `<input>` and `<button>` are new. Read the code. What happens when someone presses Send?

```html
<form>
  <label for="name">Name</label>
  <input id="name" type="text">
  <button>Send</button>
</form>
```

:::keep-together

**Someone types their name and presses Send. What happens?**

☐ Nothing: the form is not connected to anything yet

☐ The page shows Thank you

☐ An error message

☐ The name is emailed to the club

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Nothing. A form on its own sends nowhere: code behind it has to collect what was typed and do something with it.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The picture shows this form with no styling: labels, boxes, a drop-down and a button, all in one line of text.

```html
<form>
  <label for="name">Name</label>
  <input id="name" type="text">
  <label for="email">Email</label>
  <input id="email" type="email">
  <label for="house">House</label>
  <select id="house">
    <option>Owls</option>
    <option>Hawks</option>
  </select>
  <button>Send</button>
</form>
```

:::keep-together

### Match the parts

**Match each part with its job.**

A. a box to type in

B. the kind of box (an email address)

C. the words that say what to type

D. sends the form

E. a drop-down list of options

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

**Answer:** &lt;form&gt; → F. holds the fields and the button; &lt;label for="name"&gt; → C. the words that say what to type; &lt;input id="name"&gt; → A. a box to type in; type="email" → B. the kind of box (an email address); &lt;select&gt; → E. a drop-down list of options; &lt;button&gt; → D. sends the form

Labels and boxes come in pairs. type changes the kind of box: text, email, number. A select is a drop-down with one option to choose.

:::


:::keep-together

### Linked labels

**Clicking the word Email puts the cursor in the email box. What makes that work?**

☐ The form does it for every label

☐ type="email"

☐ The label sits next to the box

☐ for="email" on the label matches id="email" on the box

:::


:::teacher-note

**Answer:** for="email" on the label matches id="email" on the box

for on the label and id on the box must match exactly. That link also tells screen readers which words belong to which box.

:::


:::keep-together

### The label that does nothing

**Clicking Name puts the cursor in its box, but clicking Email does nothing, and there is no error. Click the box whose id does not match its label.**

```
 1  <form>
 2    <label for="name">Name</label>
 3    <input id="name" type="text">
 4    <label for="email">Email</label>
 5    <input id="mail" type="email">
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


:::keep-together

### A form as a card

A form is a box like any other: padding, a border and a width make it a card. `display: block;` puts each label on its own line.

```html
<style>
  .signup {
    width: 240px;
    padding: 16px;
    border: 2px solid teal;
  }
  label {
    display: block;
    margin-top: 8px;
  }
</style>
```

**In this form, why does each label sit on its own line?**

☐ Labels always start a new line

☐ label { display: block; } makes each label a block box

☐ The form has padding

☐ The boxes push the labels down

:::


:::teacher-note

**Answer:** label { display: block; } makes each label a block box

Labels and inputs are inline, so they sit in a line of text. display: block makes each label a block box, which starts a new line, like a paragraph. The form itself is styled like a card.

:::


:::typical

## Modify


**Add an email box.** Add an email field with a label linked to it.

**Add a drop-down.** Add a `House` drop-down (Owls, Hawks, Kestrels) with a linked label.

**Make it a card.** Give the form the class `signup`, and style it with a width, padding and a border.

**One field per line.** Put each label on its own line.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add an email box:**

```html
<form>
  <label for="name">Name</label>
  <input id="name" type="text">
  <label for="email">Email</label>
  <input id="email" type="email">
  <button>Join</button>
</form>
```

**Add a drop-down:**

```html
<form>
  <label for="name">Name</label>
  <input id="name" type="text">
  <label for="email">Email</label>
  <input id="email" type="email">
  <label for="house">House</label>
  <select id="house">
    <option>Owls</option>
    <option>Hawks</option>
    <option>Kestrels</option>
  </select>
  <button>Join</button>
</form>
```

**Make it a card:**

```html
<style>
  .signup {
    width: 240px;
    padding: 16px;
    border: 2px solid teal;
  }
</style>
<form class="signup">
  <label for="name">Name</label>
  <input id="name" type="text">
  <label for="email">Email</label>
  <input id="email" type="email">
  <label for="house">House</label>
  <select id="house">
    <option>Owls</option>
    <option>Hawks</option>
    <option>Kestrels</option>
  </select>
  <button>Join</button>
</form>
```

**One field per line:**

```html
<style>
  .signup {
    width: 240px;
    padding: 16px;
    border: 2px solid teal;
  }
  label {
    display: block;
    margin-top: 8px;
  }
</style>
<form class="signup">
  <label for="name">Name</label>
  <input id="name" type="text">
  <label for="email">Email</label>
  <input id="email" type="email">
  <label for="house">House</label>
  <select id="house">
    <option>Owls</option>
    <option>Hawks</option>
    <option>Kestrels</option>
  </select>
  <button>Join</button>
</form>
```

:::

:::


## Make

Make a sign-up form for a school club or event: a heading, at least two labelled fields (one a drop-down), and a button, styled as a card. Click every label to check it is linked.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .signup {
    width: 260px;
    padding: 16px;
    border: 2px solid purple;
    background-color: lavender;
  }
  label {
    display: block;
    margin-top: 8px;
  }
</style>
<form class="signup">
  <h2>Join the choir</h2>
  <label for="name">Name</label>
  <input id="name" type="text">
  <label for="year">Year</label>
  <select id="year">
    <option>Year 7</option>
    <option>Year 8</option>
  </select>
  <label for="part">Voice part</label>
  <select id="part">
    <option>Soprano</option>
    <option>Alto</option>
    <option>Not sure yet</option>
  </select>
  <button>Join</button>
</form>
```

:::


:::wider

## Fix the sign-up form

This sign-up form has three problems. Clicking `Name` does nothing (its label has no `for`). Clicking `Email` does nothing either (check the box's `id`). And the button is outside the form, so pressing it does nothing at all. Fix all three.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  label {
    display: block;
    margin-top: 8px;
  }
</style>
<form>
  <h2>Robotics Club sign-up</h2>
  <label for="name">Name</label>
  <input id="name" type="text">
  <label for="email">Email</label>
  <input id="email" type="email">
  <label for="team">Team</label>
  <select id="team">
    <option>Line followers</option>
    <option>Racers</option>
  </select>
  <button>Sign up</button>
</form>
```

:::

:::


## Exit ticket

:::keep-together

**A sign-up form has a label Email and a box, but clicking Email does nothing. Give the likely cause and the fix.**

{{lines-3}}

:::


:::teacher-note

**Answer:** The label's for does not match the box's id (or is missing). Make them the same, for example for="email" and id="email".

:::

