---
marp: true
theme: default
html: true
---

# Forms

HTML & CSS · Components and layout

<!-- Speaker note: Students build forms from labels, input boxes, a drop-down and a button, link each label to its box, and discover that a form on its own sends nowhere. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build a form from labels, input boxes, a drop-down and a button, link each label to its box, and find out what a form does on its own.

- I can build a form with labels, input boxes, a drop-down and a button.
- I can link a label to its box with matching for and id.
- I can explain why a form on its own sends nowhere.
- I can style a form as a card.

<!-- Speaker note: Before class: Read the unit primer "Layout and components in 5 minutes" (the forms paragraph), then do the Make task yourself. The surprise for students: pressing **Send** does nothing. The playground shows a note saying so. A form is only the front: code behind it (JavaScript in the page, or a program on a server) has to collect what was typed and do something with it. That gap is the doorway to the optional Make it react lesson and the DOM course. A **label** is linked to its box when the label's `for` matches the box's `id`: clicking the label then puts the cursor in the box, and screen readers read the label aloud for that box. Teacher: A form as a card: `display: block;` on labels is new. Labels are inline like `<strong>`, so they sit in a line; block puts each on its own line. Teacher: Fix the sign-up form: three real faults. The button outside the form is a structure mistake: it has no form to send. -->

---

## Why it matters

> Every sign-up, search box, quiz and online order starts as a form like this.

<!-- Speaker note: A **form** collects what people type. Every field has a **label** that says what to type, and a box to type in. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<form>
  <label for="name">Name</label>
  <input id="name" type="text">
  <button>Send</button>
</form>
```

**Someone types their name and presses Send. What happens?**

- Nothing: the form is not connected to anything yet
- The page shows Thank you
- An error message
- The name is emailed to the club

<!-- Speaker note: What happens: Nothing. A form on its own sends nowhere: code behind it has to collect what was typed and do something with it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect the form to send something somewhere. Nothing happens. Ask: what would have to exist for the name to reach the club? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cform%3E%0A++%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%0A++%3Cbutton%3ESend%3C%2Fbutton%3E%0A%3C%2Fform%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/forms/?full=step-2#step-2)

<!-- Speaker note: Type a name and press **Send**: a note explains that nothing was sent. Then click the word **Name**: the cursor jumps into the box, because the label is linked to it. Students should be able to say: I can explain why pressing Send did nothing. -->

<!-- Speaker note: Teacher: click the label to see the cursor jump. That is the visible sign of a linked label. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Nothing. A form on its own sends nowhere: code behind it has to collect what was typed and do something with it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

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

<!-- Speaker note: The picture shows this form with no styling: labels, boxes, a drop-down and a button, all in one line of text. What this step is for: Each part of a form has one job, and a label links to its box when for matches id. -->

<!-- Speaker note: Teacher: the match task names each part. Then test every label by clicking it; the broken one has `id="mail"` where the label says `email`. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Match each part with its job.**

| | |
|---|---|
| `<form>` | A. a box to type in |
| `<label for="name">` | B. the kind of box (an email address) |
| `<input id="name">` | C. the words that say what to type |
| `type="email"` | D. sends the form |
| `<select>` | E. a drop-down list of options |
| `<button>` | F. holds the fields and the button |

* Answer: &lt;form&gt; → F. holds the fields and the button; &lt;label for="name"&gt; → C. the words that say what to type; &lt;input id="name"&gt; → A. a box to type in; type="email" → B. the kind of box (an email address); &lt;select&gt; → E. a drop-down list of options; &lt;button&gt; → D. sends the form

</div>
</div>

<!-- Speaker note: Labels and boxes come in pairs. type changes the kind of box: text, email, number. A select is a drop-down with one option to choose. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Linked labels

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

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

</div>
<div>

**Clicking the word Email puts the cursor in the email box. What makes that work?**

- The form does it for every label
- type="email"
- The label sits next to the box
- for="email" on the label matches id="email" on the box

* Answer: for="email" on the label matches id="email" on the box

</div>
</div>

<!-- Speaker note: for on the label and id on the box must match exactly. That link also tells screen readers which words belong to which box. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The label that does nothing

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

* Answer: line 5

<!-- Speaker note: Line 5 has id="mail", but the label says for="email". They must match exactly: change the id to email. -->

<style scoped>pre, marp-pre { font-size: 0.66em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A form as a card

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

- Labels always start a new line
- label { display: block; } makes each label a block box
- The form has padding
- The boxes push the labels down

* Answer: label { display: block; } makes each label a block box

<!-- Speaker note: Labels and inputs are inline, so they sit in a line of text. display: block makes each label a block box, which starts a new line, like a paragraph. The form itself is styled like a card. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add an email box:** Add an email field with a label linked to it.
- **Add a drop-down:** Add a `House` drop-down (Owls, Hawks, Kestrels) with a linked label.
- **Make it a card:** Give the form the class `signup`, and style it with a width, padding and a border.
- **One field per line:** Put each label on its own line.

<!-- Speaker note: What this step is for: Building a form field by field, each label linked to its box, then styling it as a card. Hints, in order: Copy the Name label and input, then change the words, the for, the id and the type. / `<label for="email">Email</label>` and `<input id="email" type="email">` / A drop-down is a select box with one option per choice. Its label links to it the same way as the other fields. / A `<label for="house">`, then `<select id="house">` with an `<option>` for each house. / To style the whole form as a card, CSS needs a way to pick the form. What did you use to pick one element in Rules and selectors? / Give the form a class: `<form class="signup">`. / Then a `.signup` rule with a width, padding and a border. / Labels sit in a line with their boxes because they are inline. Which display value puts each one on its own line? / A `label` rule with `display: block;` and a little `margin-top`. For students who need more support: Give students the Modify starter and do the first task together: copy the name pair, then change four things (words, for, id, type). For early finishers: Add a type="number" box for age and a textarea for a message. Try type="date" and type="color" and see the boxes the browser builds. The hard part, on purpose: A form that does nothing, and labels linked by matching for and id. Let them click each label to test it, and ask which pair doesn't match. When students get stuck: Clicking a label does nothing. Ask: Does the label's for match the box's id exactly? Fix: Make them identical, for example for="email" and id="email". / All the fields sit in one long line. Ask: Are labels and inputs block or inline? Fix: Add label { display: block; } (and a margin-top for space). / The drop-down is empty or shows tags as text. Ask: Is every option between <option> and </option>, inside the select? Fix: Put each choice in its own <option> inside <select> and </select>. -->

<!-- Speaker note: Teacher: one field at a time, clicking each new label to test it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cform%3E%0A++%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%0A++%3Cbutton%3EJoin%3C%2Fbutton%3E%0A%3C%2Fform%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/forms/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a sign-up form for a school club or event: a heading, at least two labelled fields (one a drop-down), and a button, styled as a card. Click every label to check it is linked.

<!-- Speaker note: Hints, in order: Plan the fields first: what does the club need to know? / Every label needs a `for` that matches its box's `id`. Click each label to test it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+Your+sign-up+form%3A+a+heading%2C+labelled+fields+%28one+of+them+a+drop-down%29+and+a+button.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/forms/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Fix the sign-up form

This sign-up form has three problems. Clicking `Name` does nothing (its label has no `for`). Clicking `Email` does nothing either (check the box's `id`). And the button is outside the form, so pressing it does nothing at all. Fix all three.

<!-- Speaker note: What this step is for: A real form with three faults: a label with no for, a mismatched id, and a button outside the form. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Fix the sign-up form

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++label+%7B%0A++++display%3A+block%3B%0A++++margin-top%3A+8px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cform%3E%0A++%3Ch2%3ERobotics+Club+sign-up%3C%2Fh2%3E%0A++%3Clabel%3EName%3C%2Flabel%3E%0A++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%0A++%3Clabel+for%3D%22email%22%3EEmail%3C%2Flabel%3E%0A++%3Cinput+id%3D%22e-mail%22+type%3D%22email%22%3E%0A++%3Clabel+for%3D%22team%22%3ETeam%3C%2Flabel%3E%0A++%3Cselect+id%3D%22team%22%3E%0A++++%3Coption%3ELine+followers%3C%2Foption%3E%0A++++%3Coption%3ERacers%3C%2Foption%3E%0A++%3C%2Fselect%3E%0A%3C%2Fform%3E%0A%3Cbutton%3ESign+up%3C%2Fbutton%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/forms/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A sign-up form has a label Email and a box, but clicking Email does nothing. Give the likely cause and the fix.**

* The label's for does not match the box's id (or is missing). Make them the same, for example for="email" and id="email".

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next is the final challenge: a club page built from every component in the course, including a sign-up form. The optional Make it react lesson adds a few lines of JavaScript so the form does something (shows a greeting on the page); the DOM course explains how. Later, Gradio builds forms for machine learning: a form plus a function. Accessibility: linked labels are required by web accessibility guidelines. -->
