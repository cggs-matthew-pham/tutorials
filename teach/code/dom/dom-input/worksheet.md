---
title: "Inputs"
subtitle: "The DOM and the browser console · Building blocks · Lesson 4"
---

# Inputs

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Search boxes, sign-up forms and calculators all do the same two things: read what you typed, and answer.


:::teacher-note

**In one sentence:** Students read an input with .value, react as they type with the input event, find that values are text and use Number() to add, and make a calculator or converter of their own.

**Students should be able to say:** I can read what someone types with .value. I can react on every keystroke with the input event. I can turn typed text into a number with Number().

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

When is `nameBox.value` read: when the page loads, or when the button is clicked?

```html
<input id="name" placeholder="Your name">
<button id="greet">Greet</button>
<p id="out"></p>
<script>
  const nameBox = document.querySelector("#name");
  const out = document.querySelector("#out");
  document.querySelector("#greet").addEventListener("click", function () {
    out.textContent = "Hello, " + nameBox.value + "!";
  });
</script>
```

:::keep-together

**You type Sam in the box and click Greet. What does the paragraph say?**

☐ Nothing: a script cannot read a box

☐ Hello, nameBox.value!

☐ Hello, Sam!

☐ Hello, !

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Hello, Sam! nameBox.value is read at the moment of the click, and + joins the three pieces of text.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<textarea id="msg" rows="3" cols="30" placeholder="Type here"></textarea>
<p><span id="count">0</span> characters</p>
<script>
  const msg = document.querySelector("#msg");
  const count = document.querySelector("#count");
  msg.addEventListener("input", function () {
    count.textContent = msg.value.length;
  });
</script>
```

:::keep-together

### Which part does what?

**Match each piece with what it does.**

A. the text in the box right now

B. turns the typed text into a number

C. how many characters are in the box

D. runs on every keystroke in the box

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `msg.addEventListener("input", …)` | |
| `msg.value` | |
| `msg.value.length` | |
| `Number(a.value)` | |

:::


:::teacher-note

**Answer:** msg.addEventListener("input", …) → D. runs on every keystroke in the box; msg.value → A. the text in the box right now; msg.value.length → C. how many characters are in the box; Number(a.value) → B. turns the typed text into a number

:::


:::keep-together

### 4 and 5

**Someone types 4 and 5 in two boxes, and you write a.value + b.value. What do you get?**

☐ 0

☐ "45", because the values are text

☐ 9

☐ An error

:::


:::teacher-note

**Answer:** "45", because the values are text

The value of an input is always text, so + joins the two pieces of text: "4" + "5" is "45". Number(a.value) + Number(b.value) is 9.

:::


:::keep-together

### Spot the bug

**The page shows 45 instead of 9. There is no red error. Click the line that is wrong.**

```
 1  <input id="a" value="4"> +
 2  <input id="b" value="5">
 3  <button id="add">Add</button>
 4  <p id="sum"></p>
 5  <script>
 6    const a = document.querySelector("#a");
 7    const b = document.querySelector("#b");
 8    document.querySelector("#add").addEventListener("click", function () {
 9      document.querySelector("#sum").textContent = a.value + b.value;
10    });
11  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

a.value and b.value are text, so + joins them. Turn each into a number first: Number(a.value) + Number(b.value).

:::


:::typical

## Modify


**Make Add add.** Numbers, not text.

**A length limit.** Decide as they type.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Make Add add:**

```html
<input id="a" value="4"> +
<input id="b" value="5">
<button id="add">Add</button>
<p id="sum"></p>
<script>
  const a = document.querySelector("#a");
  const b = document.querySelector("#b");
  document.querySelector("#add").addEventListener("click", function () {
    document.querySelector("#sum").textContent = Number(a.value) + Number(b.value);
  });
</script>
```

**A length limit:**

```html
<textarea id="msg" rows="3" cols="30" placeholder="Type here"></textarea>
<p><span id="count">0</span> characters</p>
<p id="warning"></p>
<script>
  const msg = document.querySelector("#msg");
  const count = document.querySelector("#count");
  const warning = document.querySelector("#warning");
  msg.addEventListener("input", function () {
    count.textContent = msg.value.length;
    if (msg.value.length > 20) {
      warning.textContent = "Too long!";
      warning.style.color = "red";
    } else {
      warning.textContent = "";
    }
  });
</script>
```

:::

:::


## Make: a calculator of your own

Make a small tool that reads a **number** from a box and shows an answer: a tip calculator, a temperature converter (°C to °F), an age-in-days counter, a unit converter. Check for a bad number with `isNaN(...)`, as the page on this lesson does.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Tip calculator</h1>
<input id="amount" placeholder="Bill in dollars">
<button id="go">Work out a 10% tip</button>
<p id="answer"></p>
<script>
  const amount = document.querySelector("#amount");
  const answer = document.querySelector("#answer");
  document.querySelector("#go").addEventListener("click", function () {
    const bill = Number(amount.value);
    if (isNaN(bill)) {
      answer.textContent = "Please type a number.";
    } else {
      answer.textContent = "Tip: $" + (bill * 0.1).toFixed(2);
    }
  });
</script>
```

:::


:::wider

## Where this leads

You can now read what people type. Next: **build a list on the page**.

:::


## Exit ticket

:::keep-together

**Why is "4" + "5" equal to "45"?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The value of an input is text, and + joins text. Number() turns it into a number first.

:::

