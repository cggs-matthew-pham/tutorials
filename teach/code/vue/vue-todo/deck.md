---
marp: true
theme: default
html: true
---

# Final challenge: a to-do app

Apps with Vue · Final challenge: a to-do app

<!-- Speaker note: Students match the parts of a finished to-do app to the course's pieces, find a count that goes stale, build the app in three milestones with fading support, then add a feature of their own. About 100 minutes (Plan 10 min · Milestone 1 15 min · Milestone 2 25 min · Milestone 3 30 min · Make it yours 20 min (two lessons)). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build a to-do app in three milestones: add tasks from a box, tick them off with a count of what is left, then make each task a component and clear the done ones.

- I can plan an app as data, events, worked-out values and components.
- I can build a to-do app with Vue that adds, ticks, counts and clears tasks.
- I can add a feature of my own and say which Vue pieces it uses.

<!-- Speaker note: Before class: Read the challenge primer first, then build milestone 1 yourself. There is **nothing new** here apart from one line: `v-model` on a tick box joins it to true or false. Each milestone recalls a lesson: adding (events and inputs, lesson 3), ticking and counting (computed, lesson 4), the component (lesson 5). Support fades on purpose: milestone 1 gives most of the code, milestone 2 an outline as comments, milestone 3 only the goals. Finishing this lesson marks **Challenge complete** on the course page. The count and Clear done use a `for` loop over the list, which students know from p5.js and the DOM course. Real Vue code would often use `filter`, which is fine as a stretch. The tick box inside the component changes `task.done` on the object it was given: it works because the parent and the card share the same object, but in larger apps a component sends an event up instead (`emit`), which this course leaves out. Teacher: Plan: match the parts, then write the three milestones on the board as a checklist. Teacher: Milestone 1: everyone should finish this in the first lesson. Check an empty box adds nothing. Teacher: Milestone 2: the outline is in the comments. Students who are stuck use Reset to this task's start. Teacher: Milestone 3: goals only. Ask students what the component's prop is before they write it. -->

---

## Why it matters

> Every app you use is data, events and a page that keeps up. A to-do list is the classic first app for every framework.

<!-- Speaker note: Build a to-do app, one milestone at a time. Everything you need, you have met in this course: refs, `v-for`, `v-model`, functions on `@click`, `computed` and a component. One small new thing: `v-model` on a tick box (`<input type="checkbox" v-model="t.done">`) joins it to true or false. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Plan the app

_The program is 55 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/vue/vue-todo/?full=step-1#step-1)

<!-- Speaker note: This is the app you will build. The picture shows it finished. What this step is for: Seeing the finished app as the course's pieces turns a big task into small ones students have done before. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Name the parts

**Match each part of the app with how it is built.**

| | |
|---|---|
| `The box` | A. v-for over the list, one todo-item each |
| `Add` | B. a button that runs a function, which pushes to the list |
| `The tasks` | C. v-model on each task's done |
| `The tick boxes` | D. a function that keeps only the tasks not done |
| `1 left to do` | E. an input with v-model on a ref |
| `Clear done` | F. a computed that counts the tasks not done |

* Answer: The box → E. an input with v-model on a ref; Add → B. a button that runs a function, which pushes to the list; The tasks → A. v-for over the list, one todo-item each; The tick boxes → C. v-model on each task's done; 1 left to do → F. a computed that counts the tasks not done; Clear done → D. a function that keeps only the tasks not done

<!-- Speaker note: Six parts, five lessons. Build them in order: adding tasks, then ticking and counting, then the component and Clear done. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 12

<!-- Speaker note: left is counted once, when the page starts. A count worked out from the list must be a computed, so it is counted again when the list changes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build the app

Each milestone starts from a working copy of the one before (**Reset to this task's start** loads it), so nobody is stuck behind.

- **Milestone 1: add tasks:** Most of the code is there.
- **Milestone 2: tick and count:** The comments give the outline.
- **Milestone 3: a component and Clear done:** Goals only.

[Open this step](https://tutorials.learningwaypoints.com/code/vue/vue-todo/?full=step-2#step-2)

<!-- Speaker note: What this step is for: Three milestones with fading support: most of the code, then an outline in comments, then only the goals. Hints, in order: A function in setup, returned, and a button that names it with @click. / Inside addTask: if newTask.value is not empty, push { text: newTask.value, done: false } onto tasks.value, then set newTask.value to empty text. / The tick box goes inside the li, and v-model joins it to that task's done. / The count: let count = 0; a for loop over tasks.value; add 1 when !t.done; return count. Wrap it all in computed(() => { … }) and return left. / The component is the li, given a task as its prop. Then the v-for goes on the new tag. / Clear done: make a new empty list, push in every task that is not done, then set tasks.value to it. For students who need more support: Pair students for milestone 3: one writes the component, one writes Clear done. For early finishers: Save the tasks between visits with localStorage (watch the list, then JSON.stringify it); use filter for the count; send a delete event up from the component with emit. The hard part, on purpose: Milestone 3 is meant to be hard: turning working code into a component. Ask "what does one card need to be given?" before showing anything. When students get stuck: The count does not change when a box is ticked. Ask: Is left a computed, and does the tick box have v-model on t.done? Fix: Wrap the count in computed(() => { … }) and join the box with v-model="t.done". / Add puts an empty task in the list. Ask: What does addTask check before pushing? Fix: if (newTask.value !== "") { … } / The component shows nothing. Ask: Is it registered before app.mount, is task in its props, and does the tag pass :task="t"? Fix: All three: register, list the prop, pass it with a colon. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make it yours

Add one feature of your own. Ideas: **All done! 🎉** when nothing is left; a **Delete** button on each task; a count of **done** tasks; tasks in two lists, to do and done; press **Enter** to add (`@keyup.enter`).

[Open this step](https://tutorials.learningwaypoints.com/code/vue/vue-todo/?full=step-3#step-3)

<!-- Speaker note: What this step is for: An open extension using only the course's pieces. -->

<!-- Speaker note: Teacher: ask each student to name the Vue pieces their feature uses. -->

---

## Where this leads

You built an app with Vue. The optional last lesson shows the **same app in three frameworks**.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why is the number left a computed and not a ref?**

* It is worked out from the list, so it must be counted again whenever a task is added, ticked or cleared; computed does that, a ref would go out of step.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The optional lesson builds the same app in Vue, Preact and Svelte. Real projects use a build tool (npm create vue@latest) and single-file .vue components; the ideas stay the same. Assessment idea: students annotate a printout of their app with the lesson each part came from. -->
