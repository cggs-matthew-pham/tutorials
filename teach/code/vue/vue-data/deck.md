---
marp: true
theme: default
html: true
---

# Data on the page

Apps with Vue · Data on the page

<!-- Speaker note: Students make a Vue app, predict that the page follows the data with no textContent, match the parts of the app, find a plain variable Vue does not watch, add a button and new data, and make a two-value counter. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Vue.js: Quick Start (using Vue from a script tag), https://vuejs.org/guide/quick-start.html#using-vue-from-cdn (checked 12 October 2026); Vue.js: Reactivity fundamentals (ref), https://vuejs.org/guide/essentials/reactivity-fundamentals.html (checked 12 October 2026). -->

---

## Today

**We are learning to** make a Vue app, keep data in refs, show it on the page with {{ }}, and see the page change by itself when the data changes.

- I can make a Vue app and keep its data in refs.
- I can show data on the page with {{ }}.
- I can explain why the page changes by itself when the data changes.

<!-- Speaker note: Before class: Read the unit primer first. A Vue app has two halves. The **page** is ordinary HTML inside `<div id="app">`, with `{{ name }}` wherever a value should appear. The **setup** function makes the data with `ref(...)` and returns the names the page may use. `createApp({ setup() { … } }).mount("#app")` joins them. When a ref changes, Vue redraws the parts of the page that show it: students never write `textContent`. `vue.js` sits beside the page in the playground (it is served from this site). On a real site you would use Vue's file from vuejs.org or a build tool; teacher notes later in the course say more. The console shows one line about a **development build**: that is the version with friendlier warnings, chosen on purpose. `@click="score++"` is a recipe in this lesson (events are lesson 3). The planted bug is a plain `let` variable: the click changes it but Vue is not watching, so the page never updates and there is no error. That is the most important idea in the course: Vue only keeps up with data it watches. -->

---

## Why it matters

> Apps like a basket, a chat or a scoreboard show data that keeps changing. Vue keeps the page in step with it for you.

<!-- Speaker note: In the DOM course, changing the page took two jobs: change the variable, then put it on the page with `textContent`. Vue does the second job for you: ```html <p>Score: {{ score }}</p> ``` `{{ score }}` shows the data and keeps it up to date. The data lives in the app's `setup`, made with `ref` so that Vue **watches** it: ```js const score = ref(0); return { score }; // the names the page can use ``` `@click="score++"` on the button changes the score when it is clicked. Copy it for now; lesson 3 is all about events. The console says you are running a **development build** of Vue: the version with extra warnings to help you. You can ignore that line. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<div id="app">
  <p>Score: {{ score }}</p>
  <button @click="score++">Add a point</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const score = ref(0);
      return { score };
    }
  }).mount("#app");
</script>
```

**You click Add a point three times. What does the page show?**

- Score: {{ score }}
- Score: 111
- Score: 0, because no line sets the text
- Score: 3

<!-- Speaker note: What happens: Score: 3. Each click changes score, and Vue changes every {{ score }} on the page to match. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students who did the DOM course which line they expect to need. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Score: 3. Each click changes score, and Vue changes every {{ score }} on the page to match.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/vue/vue-data/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/vue/vue-data/?full=step-2#step-2)

<!-- Speaker note: Press **Run** and click the button. Then change `"Quiz night"` to another title and run again. Students should be able to say: I clicked the button and saw the page follow the score. -->

<!-- Speaker note: Teacher: change the title in setup and run again; nothing else on the page needs to change. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<div id="app">
  <h1>{{ title }}</h1>
  <p>Score: {{ score }}</p>
  <button @click="score++">Add a point</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const title = ref("Quiz night");
      const score = ref(0);
      return { title, score };
    }
  }).mount("#app");
</script>
```

<!-- Speaker note: What this step is for: createApp looks after everything inside #app; ref makes data Vue watches; setup returns the names the page can use; {{ }} shows them and keeps them up to date. -->

<!-- Speaker note: Teacher: for the bug, ask "how does Vue know the score changed?" -->

<style scoped>pre, marp-pre { font-size: 0.6em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does what?

**Match each part with what it does.**

| | |
|---|---|
| `createApp({ … }).mount("#app")` | A. the names the page can use |
| `const score = ref(0);` | B. data that Vue watches, starting at 0 |
| `return { title, score };` | C. changes the data when the button is clicked |
| `{{ score }}` | D. shows the data, and keeps it up to date |
| `@click="score++"` | E. Vue looks after everything inside the #app div |

* Answer: createApp({ … }).mount("#app") → E. Vue looks after everything inside the #app div; const score = ref(0); → B. data that Vue watches, starting at 0; return { title, score }; → A. the names the page can use; {{ score }} → D. shows the data, and keeps it up to date; @click="score++" → C. changes the data when the button is clicked

<!-- Speaker note: Data in setup, the page in #app. Change the data, and Vue changes the page. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Without Vue

**In the DOM course, which line would this page also need?**

- None: it would need fewer lines
- createApp(…)
- const score = ref(0);
- scoreEl.textContent = score;

* Answer: scoreEl.textContent = score;

<!-- Speaker note: Without Vue you change the variable, then put it on the page yourself. Vue does the second job. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The page shows Score: 0, and clicking does nothing. There is no red error. Click the line that is wrong.**

```
 1  <div id="app">
 2    <p>Score: {{ score }}</p>
 3    <button @click="score++">Add a point</button>
 4  </div>
 5  
 6  <script src="vue.js"></script>
 7  <script>
 8    const { createApp, ref } = Vue;
 9    createApp({
10      setup() {
11        let score = 0;
12        return { score };
13      }
14    }).mount("#app");
15  </script>
```

* Answer: line 11

<!-- Speaker note: let score = 0 is a plain variable, so Vue does not watch it. The click changes it, but Vue never knows. Make it with ref(0). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Take a point:** The other direction.
- **A team name:** New data, start to finish.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-data/?full=step-4#step-4)

<!-- Speaker note: What this step is for: New data is a ref returned from setup; the page can show it anywhere with {{ }}. Hints, in order: A second button can change the same data the other way. / Copy the button and change score++ to score--. / New data needs three things: a ref in setup, its name in the return, and {{ }} on the page. / `const team = ref("Owls");` then `return { title, team, score };` then `<p>Team: {{ team }}</p>` For students who need more support: Give the finished run page and ask students only to add the Take a point button. For early finishers: Show the score twice on the page (in the title and a paragraph) and watch both follow. Add a button that doubles the score. The hard part, on purpose: Students forget one of the three edits (ref, return, {{ }}) and the value does not show. Ask them to point to all three for each piece of data before you look at the code. When students get stuck: The page shows {{ score }} as text. Ask: Is the vue.js line there, and does the app mount on #app? Fix: Load vue.js before the script, and keep the {{ }} inside the div with id app. / A value is blank and the console warns it was accessed but is not defined. Ask: Is its name in the return? Fix: Add it: return { title, score, team }; / Clicks do nothing and there is no error. Ask: Was the data made with ref? Fix: const score = ref(0); a plain let is not watched. -->

<!-- Speaker note: Teacher: new data is three edits: the ref, the return, the {{ }}. Write them as a checklist on the board. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a counter of your own

Lives and level, likes and dislikes, goals for two teams: make **two refs**, return them, show them with `{{ }}`, and give each a button.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-data/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: two refs, shown with {{ }}, each changed by a button. -->

<!-- Speaker note: Teacher: ask each student which button changes which ref. -->

---

## Where this leads

Next: **lists and choices**, with `v-for` and `v-if`.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What two things must you do so a value in setup appears on the page and stays up to date?**

* Make it with ref and return it from setup, then show it with {{ name }} inside the app.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: lists with v-for and choices with v-if. Class idea: list three apps and name the data each one keeps. -->
