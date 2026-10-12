---
title: "Make it react"
subtitle: "HTML & CSS · Final challenge: a club page · Lesson 11"
---

# Make it react

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every like button, quiz and game on a website is a page that reacts: code waits for a click, then changes something.


:::teacher-note

**In one sentence:** An optional lesson. Students use a short JavaScript recipe (find an element by id, wait for a click, change the page) to make a button change words and colours, and a form greet people by name.

**Students should be able to say:** I can use the recipe to make a button change the words on a page. I can explain the three parts of the recipe (find, wait, change). I can use an id selector with I can read what someone typed and show it on the page.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. The `<script>` block is JavaScript. What happens when someone clicks **Start**?

```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
  });
</script>
```

:::keep-together

**What happens when someone clicks Start?**

☐ A new page opens

☐ The words Ready? change to Go!

☐ An error message appears

☐ Nothing: buttons only work inside forms

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Ready? changes to Go! The script waits for a click on the button, then changes the message's words.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
  });
</script>
```

:::keep-together

### Match the parts

**Match each part of the recipe with its job.**

A. waits for a click on it

B. replaces the words inside the element

C. the steps to run when it is clicked

D. finds the element with id="go"

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `document.querySelector('#go')` | |
| `.addEventListener('click', ...)` | |
| `function () { ... }` | |
| `.textContent = 'Go!'` | |

:::


:::teacher-note

**Answer:** document.querySelector('#go') → D. finds the element with id="go"; .addEventListener('click', ...) → A. waits for a click on it; function () { ... } → C. the steps to run when it is clicked; .textContent = 'Go!' → B. replaces the words inside the element

Find, wait, change. querySelector uses the same selectors as CSS: # for an id, . for a class.

:::


:::keep-together

### Ids

**In document.querySelector('#message'), what does '#message' pick?**

☐ The first button

☐ The element with class="message"

☐ The element with id="message"

☐ Every paragraph

:::


:::teacher-note

**Answer:** The element with id="message"

Selectors work as in CSS: #message picks id="message", .message would pick class="message", and p would pick paragraphs.

:::


:::keep-together

### The button that does nothing

**Clicking Start does nothing, and nothing on the page says why. Click the line that causes it.**

```
 1  <p id="message">Ready?</p>
 2  <button id="go">Start</button>
 3  <script>
 4    document.querySelector('#Go').addEventListener('click', function () {
 5      document.querySelector('#message').textContent = 'Go!';
 6    });
 7  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4 looks for #Go, but the button's id is go. Ids must match exactly, capitals included. The script stops there, so the click is never watched.

:::


:::keep-together

### Change the look too

`.style` changes an element's CSS.

```html
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Go!';
    document.querySelector('#message').style.color = 'green';
  });
</script>
```

**What does this extra line do when the button is clicked? document.querySelector('#message').style.color = 'green';**

☐ Turns the button green

☐ Turns the message green

☐ Nothing: CSS cannot be changed by JavaScript

☐ Turns the whole page green

:::


:::teacher-note

**Answer:** Turns the message green

style changes the element's CSS, here its colour. JavaScript can change words, colours, sizes, anything CSS can.

:::


:::typical

## Modify


**Your own message.** Change the message to your own words.

**A colour change.** Make the message turn a colour when Start is clicked.

**A reset button.** Add a **Reset** button that puts the message back to `Ready?` (and its colour back to black).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Your own message:**

```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Off we go!';
  });
</script>
```

**A colour change:**

```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Off we go!';
    document.querySelector('#message').style.color = 'green';
  });
</script>
```

**A reset button:**

```html
<p id="message">Ready?</p>
<button id="go">Start</button>
<button id="reset">Reset</button>
<script>
  document.querySelector('#go').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Off we go!';
    document.querySelector('#message').style.color = 'green';
  });
  document.querySelector('#reset').addEventListener('click', function () {
    document.querySelector('#message').textContent = 'Ready?';
    document.querySelector('#message').style.color = 'black';
  });
</script>
```

:::

:::


## Make

Make the page greet people: when someone types their name and clicks **Say hello**, the message shows `Hi, Ada!` (with their name). `.value` reads what was typed, and `+` joins words together.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<label for="name">Name</label>
<input id="name" type="text">
<button id="hello">Say hello</button>
<p id="message"></p>
<script>
  document.querySelector('#hello').addEventListener('click', function () {
    const name = document.querySelector('#name').value;
    document.querySelector('#message').textContent = 'Hi, ' + name + '!';
  });
</script>
```

:::


:::wider

## Make the sign-up say thank you

This sign-up box is not connected to anything. Add the recipe so that clicking **Join** shows `Thanks, Ada! See you on Wednesday.` (with the name that was typed) in the empty paragraph. In a real club, the next step would be sending the name to the club, which needs a program on a server.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .signup {
    width: 260px;
    padding: 16px;
    border: 2px solid teal;
  }
  label {
    display: block;
    margin-top: 8px;
  }
</style>
<div class="signup">
  <h2>Join the chess club</h2>
  <label for="name">Name</label>
  <input id="name" type="text">
  <button id="join">Join</button>
  <p id="thanks"></p>
</div>
<script>
  document.querySelector('#join').addEventListener('click', function () {
    const name = document.querySelector('#name').value;
    document.querySelector('#thanks').textContent = 'Thanks, ' + name + '! See you on Wednesday.';
  });
</script>
```

:::

:::


## Exit ticket

:::keep-together

**Name the three parts of the recipe, and what each one does.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Find an element (document.querySelector('#id')), wait for a click (addEventListener('click', ...)), and change something (textContent or style).

:::

