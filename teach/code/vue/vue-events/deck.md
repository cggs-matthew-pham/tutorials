---
marp: true
theme: default
html: true
---

# Events and inputs

Apps with Vue · Data on the page

<!-- Speaker note: Students predict that v-model follows each letter, add names with a function, match the parts, find score++ on a ref, add a Reset function and a second box, and make a badge maker. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Vue.js: Event handling, https://vuejs.org/guide/essentials/event-handling.html (checked 12 October 2026); Vue.js: Form input bindings (v-model), https://vuejs.org/guide/essentials/forms.html (checked 12 October 2026). -->

---

## Today

**We are learning to** run a function of your own when something is clicked, join a box to data with v-model, and change a ref's .value in the script.

- I can run a function of my own when a button is clicked.
- I can join a box to data with v-model.
- I can change a ref in the script with .value.

<!-- Speaker note: Before class: Read the unit primer first. Two new pieces. `@click="addPlayer"` names a function to run on a click; the function is written in `setup` and returned with the data. `v-model="newName"` joins a box to a ref both ways: typing changes the ref, and setting the ref (to empty text, say) changes the box. Compare the DOM course, where students read `box.value` and listened for the `"input"` event themselves. **The hard part of the whole course:** a ref is a box. On the page Vue opens it for you (`{{ score }}`, `@click="score++"`); in the script you open it yourself (`score.value++`). Writing `score++` in a function gives a red error, "Assignment to constant variable", because the ref was made with `const`. The playground's hint names `.value` for this case. Expect it all lesson; it is also the planted bug. -->

---

## Why it matters

> Every sign-up form, search box and Add button is an event and some data. Vue joins them up for you.

<!-- Speaker note: Two new pieces join the page to the data. **Events:** `@click="addPlayer"` runs a function when the button is clicked. The function lives in `setup` and is returned like the data: ```js function addPlayer() { players.value.push(newName.value); newName.value = ""; } return { players, newName, addPlayer }; ``` **Inputs:** `v-model="newName"` joins a box to a ref, both ways: typing changes the data, and changing the data changes the box. No `.value` of the box and no `"input"` event, as in the DOM course. **The hard part:** on the page you write `newName`; in the script you write `newName.value`. A ref is a box, and in the script you open it yourself. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<div id="app">
  <input v-model="name">
  <p>Hello, {{ name }}!</p>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const name = ref("friend");
      return { name };
    }
  }).mount("#app");
</script>
```

**You clear the box and type Kai. What does the paragraph show while you type?**

- Hello, {{ name }}!
- It changes with every letter, ending Hello, Kai!
- Hello, friend! until you press Enter
- Hello, friend! all along: nothing listens to the box

<!-- Speaker note: What happens: It changes with every letter. v-model puts what you type into name straight away, and {{ name }} shows it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what DOM-course students would have needed (an input event and box.value). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It changes with every letter. v-model puts what you type into name straight away, and {{ name }} shows it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/vue/vue-events/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/vue/vue-events/?full=step-2#step-2)

<!-- Speaker note: Press **Run**, type a name and press **Add**. Then press Add with the box empty: nothing happens, because of the `if`. Students should be able to say: I added two names and saw the box empty itself after each one. -->

<!-- Speaker note: Teacher: press Add with an empty box and ask which line stops it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 28 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-events/?full=step-3#step-3)

<!-- Speaker note: What this step is for: v-model joins box and data both ways; @click runs a returned function; in the script a ref's value is in .value. -->

<!-- Speaker note: Teacher: before the bug, ask students to underline every .value in the script and none on the page. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does what?

**Match each part with what it does.**

| | |
|---|---|
| `v-model="newName"` | A. adds the typed name to the list |
| `@click="addPlayer"` | B. runs addPlayer when the button is clicked |
| `players.value.push(newName.value);` | C. lets the page use the data and the function |
| `newName.value = "";` | D. empties the data, and so the box |
| `return { players, newName, addPlayer };` | E. joins the box and newName, both ways |

* Answer: v-model="newName" → E. joins the box and newName, both ways; @click="addPlayer" → B. runs addPlayer when the button is clicked; players.value.push(newName.value); → A. adds the typed name to the list; newName.value = ""; → D. empties the data, and so the box; return { players, newName, addPlayer }; → C. lets the page use the data and the function

<!-- Speaker note: Setting newName.value to empty text also empties the box: v-model works in both directions. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two ways to write it

**Why does the function write newName.value, but the page writes newName?**

- .value is only for inputs
- The page opens refs for you; in the script you open them yourself with .value
- It is a mistake: both should be the same
- They are two different variables

* Answer: The page opens refs for you; in the script you open them yourself with .value

<!-- Speaker note: newName is a ref, a box Vue watches. The page unwraps it for you; the script reaches the value inside with .value. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Clicking Add a point shows a red error, and the score stays at 0. Click the line that is wrong.**

```
 1  <div id="app">
 2    <p>Score: {{ score }}</p>
 3    <button @click="addPoint">Add a point</button>
 4  </div>
 5  
 6  <script src="vue.js"></script>
 7  <script>
 8    const { createApp, ref } = Vue;
 9    createApp({
10      setup() {
11        const score = ref(0);
12        function addPoint() {
13          score++;
14        }
15        return { score, addPoint };
16      }
17    }).mount("#app");
18  </script>
```

* Answer: line 13

<!-- Speaker note: score is a ref, made with const. score++ tries to change the box itself. The number is score.value, so write score.value++. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Reset:** A function of your own.
- **The club's name:** A second box.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-events/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new function is written in setup, returned, and named in @click; a new box is one v-model on a new ref. Hints, in order: A function in setup, returned, and a button that names it. / `function reset() { players.value = ["Ada", "Sam"]; newName.value = ""; }` then add reset to the return, and `<button @click="reset">Reset</button>`. / A new box needs a new ref, returned, and v-model on the box. / `const club = ref("Chess");`, club in the return, `<input v-model="club">`, and `{{ club }}` in the heading. For students who need more support: Give the Reset function written out; students return it and add the button. For early finishers: Add when Enter is pressed: @keyup.enter="addPlayer" on the box. Remove a player when their name is clicked (pass the name to a function). The hard part, on purpose: Students mix up when to write .value. Ask "are you on the page or in the script?" every time, and let them answer before they type. When students get stuck: A red error: Assignment to constant variable. Ask: Is that a ref, changed in the script? Fix: Change its .value: score.value++. / Clicking does nothing; the console warns a property is not defined. Ask: Is the function in the return? Fix: return { players, newName, addPlayer, reset }; / The box and the paragraph do not match. Ask: Does v-model name the same ref the paragraph shows? Fix: Use the same name in v-model and in {{ }}. -->

<!-- Speaker note: Teacher: a new function is three edits: write it, return it, name it in @click. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## a badge maker

Make a **name badge**: boxes for a name and a role joined with `v-model`, the badge shown with `{{ }}` in a bordered box, and a button that runs a function (make the name shout in capitals with `toUpperCase()`, or swap the two).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-events/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: boxes joined with v-model, the result shown with {{ }}, and a button that runs a function which changes .value. -->

<!-- Speaker note: Teacher: ask which ref each box changes, and what the button's function changes. -->

---

## Where this leads

Next: **values worked out from data**, with `computed`.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In a Vue function, how do you add 1 to a ref called score, and why is it different on the page?**

* score.value++; the page unwraps refs for you, but the script reaches the value inside with .value.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: computed values, worked out from data and kept up to date. Class idea: find an Add button on a real site and say which data it changes. -->
