---
title: "Data on the page"
subtitle: "Apps with Vue · Data on the page · Lesson 1"
---

# Data on the page

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Apps like a basket, a chat or a scoreboard show data that keeps changing. Vue keeps the page in step with it for you.


:::teacher-note

**In one sentence:** Students make a Vue app, predict that the page follows the data with no textContent, match the parts of the app, find a plain variable Vue does not watch, add a button and new data, and make a two-value counter.

**Students should be able to say:** I can make a Vue app and keep its data in refs. I can show data on the page with {{ }}. I can explain why the page changes by itself when the data changes.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There is no `textContent` anywhere in this code.

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

:::keep-together

**You click Add a point three times. What does the page show?**

☐ Score: {{ score }}

☐ Score: 111

☐ Score: 0, because no line sets the text

☐ Score: 3

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Score: 3. Each click changes score, and Vue changes every {{ score }} on the page to match.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Which part does what?

**Match each part with what it does.**

A. the names the page can use

B. data that Vue watches, starting at 0

C. changes the data when the button is clicked

D. shows the data, and keeps it up to date

E. Vue looks after everything inside the #app div

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `createApp({ … }).mount("#app")` | |
| `const score = ref(0);` | |
| `return { title, score };` | |
| `{{ score }}` | |
| `@click="score++"` | |

:::


:::teacher-note

**Answer:** createApp({ … }).mount("#app") → E. Vue looks after everything inside the #app div; const score = ref(0); → B. data that Vue watches, starting at 0; return { title, score }; → A. the names the page can use; {{ score }} → D. shows the data, and keeps it up to date; @click="score++" → C. changes the data when the button is clicked

Data in setup, the page in #app. Change the data, and Vue changes the page.

:::


:::keep-together

### Without Vue

**In the DOM course, which line would this page also need?**

☐ None: it would need fewer lines

☐ createApp(…)

☐ const score = ref(0);

☐ scoreEl.textContent = score;

:::


:::teacher-note

**Answer:** scoreEl.textContent = score;

Without Vue you change the variable, then put it on the page yourself. Vue does the second job.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 11

let score = 0 is a plain variable, so Vue does not watch it. The click changes it, but Vue never knows. Make it with ref(0).

:::


:::typical

## Modify


**Take a point.** The other direction.

**A team name.** New data, start to finish.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Take a point:**

```html
<div id="app">
  <h1>{{ title }}</h1>
  <p>Score: {{ score }}</p>
  <button @click="score++">Add a point</button>
  <button @click="score--">Take a point</button>
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

**A team name:**

```html
<div id="app">
  <h1>{{ title }}</h1>
  <p>Team: {{ team }}</p>
  <p>Score: {{ score }}</p>
  <button @click="score++">Add a point</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const title = ref("Quiz night");
      const team = ref("Owls");
      const score = ref(0);
      return { title, team, score };
    }
  }).mount("#app");
</script>
```

:::

:::


## Make: a counter of your own

Lives and level, likes and dislikes, goals for two teams: make **two refs**, return them, show them with `{{ }}`, and give each a button.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<div id="app">
  <h1>Space game</h1>
  <p>Lives: {{ lives }}</p>
  <p>Level: {{ level }}</p>
  <button @click="lives--">Lose a life</button>
  <button @click="level++">Next level</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const lives = ref(3);
      const level = ref(1);
      return { lives, level };
    }
  }).mount("#app");
</script>
```

:::


:::wider

## Where this leads

Next: **lists and choices**, with `v-for` and `v-if`.

:::


## Exit ticket

:::keep-together

**What two things must you do so a value in setup appears on the page and stays up to date?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Make it with ref and return it from setup, then show it with {{ name }} inside the app.

:::

