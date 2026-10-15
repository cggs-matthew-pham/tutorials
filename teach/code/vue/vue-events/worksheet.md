---
title: "Events and inputs"
subtitle: "Apps with Vue · Data on the page · Lesson 3"
---

# Events and inputs

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every sign-up form, search box and Add button is an event and some data. Vue joins them up for you.


:::teacher-note

**In one sentence:** Students predict that v-model follows each letter, add names with a function, match the parts, find score++ on a ref, add a Reset function and a second box, and make a badge maker.

**Students should be able to say:** I can run a function of my own when a button is clicked. I can join a box to data with v-model. I can change a ref in the script with .value.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There is no event and no `.value` here, only `v-model`.

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

:::keep-together

**You clear the box and type Kai. What does the paragraph show while you type?**

☐ Hello, {{ name }}!

☐ It changes with every letter, ending Hello, Kai!

☐ Hello, friend! until you press Enter

☐ Hello, friend! all along: nothing listens to the box

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It changes with every letter. v-model puts what you type into name straight away, and {{ name }} shows it.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<div id="app">
  <h1>Chess team</h1>
  <input v-model="newName" placeholder="A name">
  <button @click="addPlayer">Add</button>
  <p>Adding: {{ newName }}</p>
  <ul>
    <li v-for="name in players">{{ name }}</li>
  </ul>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const players = ref(["Ada", "Sam"]);
      const newName = ref("");
      function addPlayer() {
        if (newName.value !== "") {
          players.value.push(newName.value);
          newName.value = "";
        }
      }
      return { players, newName, addPlayer };
    }
  }).mount("#app");
</script>
```

:::keep-together

### Which part does what?

**Match each part with what it does.**

A. adds the typed name to the list

B. runs addPlayer when the button is clicked

C. lets the page use the data and the function

D. empties the data, and so the box

E. joins the box and newName, both ways

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `v-model="newName"` | |
| `@click="addPlayer"` | |
| `players.value.push(newName.value);` | |
| `newName.value = "";` | |
| `return { players, newName, addPlayer };` | |

:::


:::teacher-note

**Answer:** v-model="newName" → E. joins the box and newName, both ways; @click="addPlayer" → B. runs addPlayer when the button is clicked; players.value.push(newName.value); → A. adds the typed name to the list; newName.value = ""; → D. empties the data, and so the box; return { players, newName, addPlayer }; → C. lets the page use the data and the function

Setting newName.value to empty text also empties the box: v-model works in both directions.

:::


:::keep-together

### Two ways to write it

**Why does the function write newName.value, but the page writes newName?**

☐ .value is only for inputs

☐ The page opens refs for you; in the script you open them yourself with .value

☐ It is a mistake: both should be the same

☐ They are two different variables

:::


:::teacher-note

**Answer:** The page opens refs for you; in the script you open them yourself with .value

newName is a ref, a box Vue watches. The page unwraps it for you; the script reaches the value inside with .value.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 13

score is a ref, made with const. score++ tries to change the box itself. The number is score.value, so write score.value++.

:::


:::typical

## Modify


**Reset.** A function of your own.

**The club's name.** A second box.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Reset:**

```html
<div id="app">
  <h1>Chess team</h1>
  <input v-model="newName" placeholder="A name">
  <button @click="addPlayer">Add</button>
  <button @click="reset">Reset</button>
  <p>Adding: {{ newName }}</p>
  <ul>
    <li v-for="name in players">{{ name }}</li>
  </ul>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const players = ref(["Ada", "Sam"]);
      const newName = ref("");
      function addPlayer() {
        if (newName.value !== "") {
          players.value.push(newName.value);
          newName.value = "";
        }
      }
      function reset() {
        players.value = ["Ada", "Sam"];
        newName.value = "";
      }
      return { players, newName, addPlayer, reset };
    }
  }).mount("#app");
</script>
```

**The club's name:**

```html
<div id="app">
  <h1>{{ club }} team</h1>
  <input v-model="club" placeholder="Club name">
  <input v-model="newName" placeholder="A name">
  <button @click="addPlayer">Add</button>
  <p>Adding: {{ newName }}</p>
  <ul>
    <li v-for="name in players">{{ name }}</li>
  </ul>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const club = ref("Chess");
      const players = ref(["Ada", "Sam"]);
      const newName = ref("");
      function addPlayer() {
        if (newName.value !== "") {
          players.value.push(newName.value);
          newName.value = "";
        }
      }
      return { club, players, newName, addPlayer };
    }
  }).mount("#app");
</script>
```

:::

:::


## a badge maker

Make a **name badge**: boxes for a name and a role joined with `v-model`, the badge shown with `{{ }}` in a bordered box, and a button that runs a function (make the name shout in capitals with `toUpperCase()`, or swap the two).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<div id="app">
  <h1>Badge maker</h1>
  <input v-model="person" placeholder="Your name">
  <input v-model="role" placeholder="Your role">
  <button @click="shout">Make it loud</button>
  <div style="border: 3px solid teal; padding: 12px; margin-top: 12px;">
    <h2>{{ person }}</h2>
    <p>{{ role }}</p>
  </div>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const person = ref("Ada");
      const role = ref("Captain");
      function shout() {
        person.value = person.value.toUpperCase() + "!";
      }
      return { person, role, shout };
    }
  }).mount("#app");
</script>
```

:::


:::wider

## Where this leads

Next: **values worked out from data**, with `computed`.

:::


## Exit ticket

:::keep-together

**In a Vue function, how do you add 1 to a ref called score, and why is it different on the page?**

{{lines-3}}

:::


:::teacher-note

**Answer:** score.value++; the page unwraps refs for you, but the script reaches the value inside with .value.

:::

