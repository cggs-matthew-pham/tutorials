---
marp: true
theme: default
html: true
---

# Forms

Structure and style a page · Parts of a page

<!-- Speaker note: Students build a form from linked labels, boxes and a button, and find out that a form collects answers but does nothing with them on its own. About 45 minutes (Predict and Run 10 min · Investigate 12 min · Modify 10 min · Mix it up 5 min · Make 8 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build a form from linked labels, boxes and a button, and find out that a form collects answers but does nothing with them on its own.

- I can link a label to its box with a matching for and id.
- I can build a form with labels, boxes, a drop-down and a button.
- I can explain why a form on its own sends nowhere.

<!-- Speaker note: Before class: Read the unit primer "Parts of a page in 5 minutes", then do the Make task yourself (about 5 minutes). The surprise for students: pressing **Send** does nothing. The playground shows a note saying so. A form is only the front: code behind it (JavaScript in the page, or a program on a server) has to collect what was typed and do something with it. That gap is the doorway to the JavaScript courses later. A **label** is linked to its box when the label's `for` matches the box's `id`: clicking the label then puts the cursor in the box, and screen readers read the label aloud for that box. Each label and its box sit in a `<p>` so that every field starts on its own line. Making a form look like a card is Course B. Teacher: Mix it up: two boxes share an id, so the Friend label finds the first box. This is the id lesson again, in a form. -->

---

## Why it matters

> Every sign-up, search box, quiz and online order starts as a form like this.

<!-- Speaker note: A **form** collects what people type. Each field is a **label** that says what to type and a box to type in, and a **button** is for sending the answers. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<form>
  <p><label for="name">Name</label>
  <input id="name" type="text"></p>
  <button>Send</button>
</form>
```

**Someone types their name and presses Send. What happens?**

- The page shows Thank you
- Nothing: the form is not connected to anything yet
- The name is emailed to the club
- The name is saved in a list of members

<!-- Speaker note: What happens: Nothing. A form collects what was typed, but sending or saving it needs code behind the form, and this page has none. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect the form to send or save something. Nothing happens. Ask: what would have to exist for the name to reach the club? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Where does the name go? <span style="font-size:.6em;color:#64748b">(3 min)</span>

With your partner, decide what happens to the name when someone presses Send.
Hold up 1, 2, 3 or 4 fingers for your answer.

<!-- Speaker note: Count the votes before running. Ask what would have to exist for the name to arrive anywhere: that is the code behind the form. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cform%3E%0A++%3Cp%3E%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%3C%2Fp%3E%0A++%3Cbutton%3ESend%3C%2Fbutton%3E%0A%3C%2Fform%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/forms/?full=step-2#step-2)

<!-- Speaker note: Type a name and press **Send**: a note says nothing was sent. Then click the word **Name**: the cursor jumps into the box, because the label is linked to it. | Code | What it does | Why | |---|---|---| | `<form> … </form>` | Holds the fields and the button | Everything people fill in goes inside one form | | `<p>` around a label and its box | Puts them together on their own line | Each `<p>` starts a new line, as in the first lesson | | `<label for="name">Name</label>` | The words that say what to type | `for` names the box this label belongs to | | `<input id="name" type="text">` | A box to type in | Its `id` matches the label's `for`, so clicking the label finds this box. It has no closing tag, and `type` sets the kind of box | | `<button>Send</button>` | A button to press | Pressing it only shows a note. Code behind the form would have to collect the answers and do something with them | Students should be able to say: I can explain why pressing Send did nothing. -->

<!-- Speaker note: Teacher: click the label to see the cursor jump. That is the visible sign of a linked label. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Nothing. A form collects what was typed, but sending or saving it needs code behind the form, and this page has none.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

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

<!-- Speaker note: The picture shows this form: each label and its box share a line, the drop-down is a list of choices, and the button is last. What this step is for: Each part of a form has one job, and a label finds its box only when for matches id exactly. -->

<!-- Speaker note: Teacher: the match task names each part. Then test every label by clicking it; the broken one has `id="mail"` where the label says `email`. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Match each part with its job.**

| | |
|---|---|
| `<form>` | A. a box to type in |
| `<label for="name">` | B. the kind of box (an email address) |
| `<input id="name">` | C. the words that say what to type |
| `type="email"` | D. a button to press |
| `<select>` | E. a drop-down list of choices |
| `<button>` | F. holds the fields and the button |

* Answer: &lt;form&gt; → F. holds the fields and the button; &lt;label for="name"&gt; → C. the words that say what to type; &lt;input id="name"&gt; → A. a box to type in; type="email" → B. the kind of box (an email address); &lt;select&gt; → E. a drop-down list of choices; &lt;button&gt; → D. a button to press

</div>
</div>

<!-- Speaker note: Labels and boxes come in pairs. type changes the kind of box: text, email, number. A select is a drop-down, with one option for each choice. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Linked labels

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Clicking the word Email puts the cursor in the email box. What makes that work?**

- The label sits next to the box
- Both are inside the same &lt;p&gt;
- type="email" on the box
- for="email" on the label matches id="email" on the box

* Answer: for="email" on the label matches id="email" on the box

</div>
</div>

<!-- Speaker note: for on the label and id on the box must match exactly. Sitting next to each other, or in the same <p>, links nothing. The link also tells screen readers which words belong to which box. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The label that does nothing

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

* Answer: line 5

<!-- Speaker note: Line 5 has id="mail", but the label says for="email". They must match exactly: change the id to email. -->

<style scoped>pre, marp-pre { font-size: 0.66em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add an email box:** Add an email field with a label linked to it.
- **Add a drop-down:** Add a `House` drop-down (Owls, Hawks, Kestrels) with a linked label.
- **Test every label:** Click each label in the preview. If the cursor does not jump, compare its `for` with the box's `id`.

<!-- Speaker note: What this step is for: Building a form field by field, each label linked to its box, and testing each link by clicking. Hints, in order: Copy the Name paragraph, then change the words, the `for`, the `id` and the `type`. / `<label for="email">Email</label>` and `<input id="email" type="email">`, inside their own `<p>`. / A drop-down is a `<select>` with one `<option>` for each choice. Its label links to it the same way as the other fields. / A `<label for="house">`, then `<select id="house">` with an `<option>` for each house, in their own `<p>`. For students who need more support: Give students the Modify starter and do the first task together: copy the name paragraph, then change four things (the words, for, id and type). For early finishers: Add a type="number" box for age and a textarea for a message. Try type="date" and type="color" and see the boxes the browser builds. The hard part, on purpose: A form that does nothing, and labels linked by matching for and id. Let them click each label to test it, and ask which pair does not match. When students get stuck: Clicking a label does nothing. Ask: Does the label's for match the box's id exactly? Fix: Make them identical, for example for="email" and id="email". / Two fields run together on one line. Ask: Is each label and its box inside its own paragraph? Fix: Wrap each label and its box in <p> and </p>. / The drop-down is empty or shows tags as text. Ask: Is every choice between <option> and </option>, inside the select? Fix: Put each choice in its own <option> inside <select> and </select>. -->

<!-- Speaker note: Teacher: one field at a time, clicking each new label to test it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cform%3E%0A++%3Cp%3E%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%3C%2Fp%3E%0A++%3Cbutton%3EJoin%3C%2Fbutton%3E%0A%3C%2Fform%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/forms/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

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

<!-- Speaker note: Click each label in this sign-up form and see where the cursor goes. Fix what you find, then make the **Join** button stand out with a colour of your choice. What this step is for: An id names one element, so two boxes with the same id send a label to the wrong one; a class colours only the elements that carry it. -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a sign-up form for a school club or event: a heading, at least two labelled fields (one a drop-down), and a button. Click every label to check it is linked.

<!-- Speaker note: Hints, in order: Plan the fields first: what does the club need to know? / Every label needs a `for` that matches its box's `id`, and each label and box goes in a `<p>`. Click each label to test it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Your+sign-up+form%3A+a+heading%2C+labelled+fields+%28one+of+them+a+drop-down%29+and+a+button.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/forms/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Click-test a neighbour's form <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap forms with a partner. Click every label. For any that fail, say which `for` and `id` do not match.

<!-- Speaker note: Listen for students who look at where the label sits instead of at the for and the id. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A sign-up form has a label Email and a box, but clicking Email does nothing. Give the likely cause and the fix.**

* The label's for does not match the box's id (or is missing). Make them the same, for example for="email" and id="email".

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next is the Course A challenge: a club page with a jump-link menu, sections, a results table and a sign-up form. Course B lays the page out and styles the form as a card. -->
