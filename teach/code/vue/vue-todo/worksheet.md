---
title: "Final challenge: a to-do app"
subtitle: "Apps with Vue · Final challenge: a to-do app · Lesson 6"
---

# Final challenge: a to-do app

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every app you use is data, events and a page that keeps up. A to-do list is the classic first app for every framework.


:::teacher-note

**In one sentence:** Students match the parts of a finished to-do app to the course's pieces, find a count that goes stale, build the app in three milestones with fading support, then add a feature of their own.

**Students should be able to say:** I can plan an app as data, events, worked-out values and components. I can build a to-do app with Vue that adds, ticks, counts and clears tasks. I can add a feature of my own and say which Vue pieces it uses.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Plan the app

This is the app you will build. The picture shows it finished.

```html
<div id="app">
  <h1>To do</h1>
  <input v-model="newTask" placeholder="Something to do">
  <button @click="addTask">Add</button>
  <ul>
    <todo-item v-for="t in tasks" :task="t"></todo-item>
  </ul>
  <p>{{ left }} left to do</p>
  <button @click="clearDone">Clear done</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  const app = createApp({
    setup() {
      const tasks = ref([
        { text: "Feed the cat", done: false },
        { text: "Pack my bag", done: true }
      ]);
      const newTask = ref("");
      const left = computed(() => {
        let count = 0;
        for (const t of tasks.value) {
          if (!t.done) {
            count++;
          }
        }
        return count;
      });
      function addTask() {
        if (newTask.value !== "") {
          tasks.value.push({ text: newTask.value, done: false });
          newTask.value = "";
        }
      }
      function clearDone() {
        const keep = [];
        for (const t of tasks.value) {
          if (!t.done) {
            keep.push(t);
          }
        }
        tasks.value = keep;
      }
      return { tasks, newTask, left, addTask, clearDone };
    }
  });
  app.component("todo-item", {
    props: ["task"],
    template: `<li><label><input type="checkbox" v-model="task.done"> {{ task.text }}</label></li>`
  });
  app.mount("#app");
</script>
```

:::keep-together

### Name the parts

**Match each part of the app with how it is built.**

A. v-for over the list, one todo-item each

B. a button that runs a function, which pushes to the list

C. v-model on each task's done

D. a function that keeps only the tasks not done

E. an input with v-model on a ref

F. a computed that counts the tasks not done

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `The box` | |
| `Add` | |
| `The tasks` | |
| `The tick boxes` | |
| `1 left to do` | |
| `Clear done` | |

:::


:::teacher-note

**Answer:** The box → E. an input with v-model on a ref; Add → B. a button that runs a function, which pushes to the list; The tasks → A. v-for over the list, one todo-item each; The tick boxes → C. v-model on each task's done; 1 left to do → F. a computed that counts the tasks not done; Clear done → D. a function that keeps only the tasks not done

Six parts, five lessons. Build them in order: adding tasks, then ticking and counting, then the component and Clear done.

:::


:::keep-together

### Spot the bug

**Clicking Tick the first should show 1 left to do, but it still says 2. There is no error. Click the line that is wrong.**

```
 1  <div id="app">
 2    <p>{{ left }} left to do</p>
 3    <button @click="tasks[0].done = true">Tick the first</button>
 4  </div>
 5  
 6  <script src="vue.js"></script>
 7  <script>
 8    const { createApp, ref, computed } = Vue;
 9    createApp({
10      setup() {
11        const tasks = ref([{ text: "Feed the cat", done: false }, { text: "Pack my bag", done: false }]);
12        let left = 0;
13        for (const t of tasks.value) {
14          if (!t.done) {
15            left++;
16          }
17        }
18        return { tasks, left };
19      }
20    }).mount("#app");
21  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 12

left is counted once, when the page starts. A count worked out from the list must be a computed, so it is counted again when the list changes.

:::


:::typical

## Build the app

Each milestone starts from a working copy of the one before (**Reset to this task's start** loads it), so nobody is stuck behind.

**Milestone 1: add tasks.** Most of the code is there.

**Milestone 2: tick and count.** The comments give the outline.

**Milestone 3: a component and Clear done.** Goals only.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Milestone 1: add tasks:**

```html
<div id="app">
  <h1>To do</h1>
  <input v-model="newTask" placeholder="Something to do">
  <button @click="addTask">Add</button>
  <ul>
    <li v-for="t in tasks">{{ t.text }}</li>
  </ul>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  const app = createApp({
    setup() {
      const tasks = ref([
        { text: "Feed the cat", done: false },
        { text: "Pack my bag", done: true }
      ]);
      const newTask = ref("");
      function addTask() {
        if (newTask.value !== "") {
          tasks.value.push({ text: newTask.value, done: false });
          newTask.value = "";
        }
      }
      return { tasks, newTask, addTask };
    }
  });
  app.mount("#app");
</script>
```

**Milestone 2: tick and count:**

```html
<div id="app">
  <h1>To do</h1>
  <input v-model="newTask" placeholder="Something to do">
  <button @click="addTask">Add</button>
  <ul>
    <li v-for="t in tasks"><label><input type="checkbox" v-model="t.done"> {{ t.text }}</label></li>
  </ul>
  <p>{{ left }} left to do</p>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  const app = createApp({
    setup() {
      const tasks = ref([
        { text: "Feed the cat", done: false },
        { text: "Pack my bag", done: true }
      ]);
      const newTask = ref("");
      function addTask() {
        if (newTask.value !== "") {
          tasks.value.push({ text: newTask.value, done: false });
          newTask.value = "";
        }
      }
      const left = computed(() => {
        let count = 0;
        for (const t of tasks.value) {
          if (!t.done) {
            count++;
          }
        }
        return count;
      });
      return { tasks, newTask, left, addTask };
    }
  });
  app.mount("#app");
</script>
```

**Milestone 3: a component and Clear done:**

```html
<div id="app">
  <h1>To do</h1>
  <input v-model="newTask" placeholder="Something to do">
  <button @click="addTask">Add</button>
  <ul>
    <todo-item v-for="t in tasks" :task="t"></todo-item>
  </ul>
  <p>{{ left }} left to do</p>
  <button @click="clearDone">Clear done</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  const app = createApp({
    setup() {
      const tasks = ref([
        { text: "Feed the cat", done: false },
        { text: "Pack my bag", done: true }
      ]);
      const newTask = ref("");
      const left = computed(() => {
        let count = 0;
        for (const t of tasks.value) {
          if (!t.done) {
            count++;
          }
        }
        return count;
      });
      function addTask() {
        if (newTask.value !== "") {
          tasks.value.push({ text: newTask.value, done: false });
          newTask.value = "";
        }
      }
      function clearDone() {
        const keep = [];
        for (const t of tasks.value) {
          if (!t.done) {
            keep.push(t);
          }
        }
        tasks.value = keep;
      }
      return { tasks, newTask, left, addTask, clearDone };
    }
  });
  app.component("todo-item", {
    props: ["task"],
    template: `<li><label><input type="checkbox" v-model="task.done"> {{ task.text }}</label></li>`
  });
  app.mount("#app");
</script>
```

:::

:::


## Make it yours

Add one feature of your own. Ideas: **All done! 🎉** when nothing is left; a **Delete** button on each task; a count of **done** tasks; tasks in two lists, to do and done; press **Enter** to add (`@keyup.enter`).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<div id="app">
  <h1>To do</h1>
  <input v-model="newTask" placeholder="Something to do">
  <button @click="addTask">Add</button>
  <ul>
    <todo-item v-for="t in tasks" :task="t"></todo-item>
  </ul>
  <p>{{ left }} left to do</p>
  <button @click="clearDone">Clear done</button>
  <p v-if="tasks.length > 0 && left === 0">All done! 🎉</p>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  const app = createApp({
    setup() {
      const tasks = ref([
        { text: "Feed the cat", done: false },
        { text: "Pack my bag", done: true }
      ]);
      const newTask = ref("");
      const left = computed(() => {
        let count = 0;
        for (const t of tasks.value) {
          if (!t.done) {
            count++;
          }
        }
        return count;
      });
      function addTask() {
        if (newTask.value !== "") {
          tasks.value.push({ text: newTask.value, done: false });
          newTask.value = "";
        }
      }
      function clearDone() {
        const keep = [];
        for (const t of tasks.value) {
          if (!t.done) {
            keep.push(t);
          }
        }
        tasks.value = keep;
      }
      return { tasks, newTask, left, addTask, clearDone };
    }
  });
  app.component("todo-item", {
    props: ["task"],
    template: `<li><label><input type="checkbox" v-model="task.done"> {{ task.text }}</label></li>`
  });
  app.mount("#app");
</script>
```

:::


:::wider

## Where this leads

You built an app with Vue. The optional last lesson shows the **same app in three frameworks**.

:::


## Exit ticket

:::keep-together

**Why is the number left a computed and not a ref?**

{{lines-3}}

:::


:::teacher-note

**Answer:** It is worked out from the list, so it must be counted again whenever a task is added, ticked or cleared; computed does that, a ref would go out of step.

:::

