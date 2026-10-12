---
marp: true
theme: default
html: true
---

# Inputs

The DOM and the browser console · Building blocks

<!-- Speaker note: Students read an input with .value, react as they type with the input event, find that values are text and use Number() to add, and make a calculator or converter of their own. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read what someone types with .value, react as they type, and turn text into a number with Number().

- I can read what someone types with .value.
- I can react on every keystroke with the input event.
- I can turn typed text into a number with Number().

<!-- Speaker note: Before class: Read the unit primer first. This is the Python input() lesson with a twist: there is no program waiting, so the page reacts to an event. `input` fires on every keystroke; `click` on a button reads the box once. The big idea is that `.value` is always text, as `input()` was in Python: the same `"45"` surprise. The bug has no red error, so students must read the answer. `Number("abc")` is `NaN`; `isNaN(x)` checks for it, used in the Make example. The playground cannot send a form, on purpose: use a button and an event, not a `<form>`. -->

---

## Why it matters

> Search boxes, sign-up forms and calculators all do the same two things: read what you typed, and answer.

<!-- Speaker note: An input box has a **value**: whatever is typed in it right now. Read it inside a handler: ```js out.textContent = "Hello, " + nameBox.value + "!"; ``` Two events are useful: `"click"` on a button, and `"input"` on the box itself, which fires on **every keystroke**. **The hard part** is that `.value` is always **text**, even when someone types a number. `"4" + "5"` is `"45"`, not 9. Turn it into a number first: `Number(a.value)`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**You type Sam in the box and click Greet. What does the paragraph say?**

- Nothing: a script cannot read a box
- Hello, nameBox.value!
- Hello, Sam!
- Hello, !

<!-- Speaker note: What happens: Hello, Sam! nameBox.value is read at the moment of the click, and + joins the three pieces of text. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask when the value is read. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Hello, Sam! nameBox.value is read at the moment of the click, and + joins the three pieces of text.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/dom/dom-input/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/dom/dom-input/?full=step-2#step-2)

<!-- Speaker note: Press **Run**, then type in the box. The count changes on every keystroke, because the listener is on the `"input"` event. Students should be able to say: I typed in the box and watched the character count change on every keystroke. -->

<!-- Speaker note: Teacher: ask students to type quickly and say when the number changes. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: .value is the text typed so far, and an input event fires on every keystroke; because it is text, turn it into a number with Number() before doing sums. -->

<!-- Speaker note: Teacher: ask what + does to two pieces of text. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does what?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Match each piece with what it does.**

| | |
|---|---|
| `msg.addEventListener("input", …)` | A. the text in the box right now |
| `msg.value` | B. turns the typed text into a number |
| `msg.value.length` | C. how many characters are in the box |
| `Number(a.value)` | D. runs on every keystroke in the box |

* Answer: msg.addEventListener("input", …) → D. runs on every keystroke in the box; msg.value → A. the text in the box right now; msg.value.length → C. how many characters are in the box; Number(a.value) → B. turns the typed text into a number

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## 4 and 5

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Someone types 4 and 5 in two boxes, and you write a.value + b.value. What do you get?**

- 0
- "45", because the values are text
- 9
- An error

* Answer: "45", because the values are text

</div>
</div>

<!-- Speaker note: The value of an input is always text, so + joins the two pieces of text: "4" + "5" is "45". Number(a.value) + Number(b.value) is 9. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 9

<!-- Speaker note: a.value and b.value are text, so + joins them. Turn each into a number first: Number(a.value) + Number(b.value). -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Make Add add:** Numbers, not text.
- **A length limit:** Decide as they type.

[Open this step](https://tutorials.learningwaypoints.com/code/dom/dom-input/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Number() turns typed text into a number so sums work; an if inside the handler reacts to what was typed. Hints, in order: The page is adding text. What does + do with text? / Wrap each value in Number(...): Number(a.value) + Number(b.value). / An if inside the handler can look at how many characters there are. / Add a paragraph for the warning, and if (msg.value.length > 20) { … } to fill it. For students who need more support: Give the greeting page and ask students to change only the words, then add a second box. For early finishers: Make the result appear live, with no button at all, using the input event on each box. The hard part, on purpose: Text versus number: "4" + "5" is "45". Show the page, ask what + does to text, and only then show Number(). When students get stuck: The sum shows 45, or the text joined. Ask: Is the value turned into a number first? Fix: Wrap each value: Number(a.value). / Cannot read properties of null (reading value). Ask: Does the input id match the selector? Fix: Match the id exactly, with #. / The box seems to do nothing. Ask: Is the listener on the box or the button, and is it the right event? Fix: Use "input" on the box, or "click" on the button. / NaN is shown. Ask: Was the box empty or full of words? Fix: Check with isNaN and show a friendly message. -->

<!-- Speaker note: Teacher: ask what Number("5") gives, and what Number("hello") gives. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a calculator of your own

Make a small tool that reads a **number** from a box and shows an answer: a tip calculator, a temperature converter (°C to °F), an age-in-days counter, a unit converter. Check for a bad number with `isNaN(...)`, as the page on this lesson does.

[Open this step](https://tutorials.learningwaypoints.com/code/dom/dom-input/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: read an input, turn it into a number, work something out and show it on the page. -->

<!-- Speaker note: Teacher: ask each student what could go wrong if someone types words. -->

---

## Where this leads

You can now read what people type. Next: **build a list on the page**.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why is "4" + "5" equal to "45"?**

* The value of an input is text, and + joins text. Number() turns it into a number first.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: lists of elements: making new elements and adding them to the page. -->
