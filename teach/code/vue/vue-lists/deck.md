---
marp: true
theme: default
html: true
---

# Lists and choices: v-for and v-if

Apps with Vue · Data on the page

<!-- Speaker note: Students predict that pushing to a list adds a tag, trace the page as the list changes, find v-for on the wrong tag, add a Clear button and a Team full message, and make a playlist. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Vue.js: List rendering (v-for), https://vuejs.org/guide/essentials/list.html (checked 12 October 2026); Vue.js: Conditional rendering (v-if), https://vuejs.org/guide/essentials/conditional.html (checked 12 October 2026). -->

---

## Today

**We are learning to** make one tag for each item in a list with v-for, show a tag only when it is needed with v-if, and watch both keep up as the list changes.

- I can make a tag for each item in a list with v-for.
- I can show a tag only when something is true with v-if.
- I can change a list and watch the page keep up.

<!-- Speaker note: Before class: Read the unit primer first. `v-for="name in players"` on a tag makes one copy of that tag per item; inside it, `name` is the item for that copy. `v-if="…"` adds the tag while the condition is true and removes it otherwise. Both are **attributes on the tag they control**, which is why the planted bug (v-for on the `ul`) makes three lists. This reverses the DOM course's lesson on lists, where changing an array did not change the page ("list-is-live"). In Vue it does, because the list is a ref. Say so explicitly to students who did the DOM course; it is a good moment to name what Vue is doing for them. Real Vue code adds `:key` to v-for tags (`:key="name"`) so Vue can tell items apart when they move; it does not change what students see here, so the course leaves it to the stretch. `players = []` inside `@click` works because the page unwraps refs for you (lesson 3 shows the script side). -->

---

## Why it matters

> A chat, a playlist and a search page are all lists that change. v-for keeps the page in step with the list.

<!-- Speaker note: In the DOM course, a list on the page took a loop, `createElement` and `append`, and the page changed only when you made or removed elements. In Vue you write the tag **once**: ```html <li v-for="name in players">{{ name }}</li> ``` `v-for` makes one `<li>` for each item in `players`, with `name` standing for the item each time. Change the list, and Vue adds or removes `<li>` tags to match. `v-if` shows a tag only while something is true: ```html <p v-if="players.length === 0">No players yet.</p> ``` -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<div id="app">
  <ul>
    <li v-for="name in players">{{ name }}</li>
  </ul>
  <button @click="players.push('Kai')">Add Kai</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const players = ref(["Ada", "Sam", "Lin"]);
      return { players };
    }
  }).mount("#app");
</script>
```

**You click Add Kai once. How many names are on the page?**

- 1
- 4
- 6
- 3: changing the array does not change the page

<!-- Speaker note: What happens: 4. push adds Kai to players, and v-for makes an li for every item, so a fourth li appears. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask DOM-course students what happened when they pushed to an array there. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 4. push adds Kai to players, and v-for makes an li for every item, so a fourth li appears.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/vue/vue-lists/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/vue/vue-lists/?full=step-2#step-2)

<!-- Speaker note: Press **Run**. Add Kai, then remove players until none are left, and watch the message. Students should be able to say: I emptied the list and saw the No players yet message appear. -->

<!-- Speaker note: Teacher: empty the list and ask what made the message appear. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<div id="app">
  <h1>Chess team</h1>
  <ul>
    <li v-for="name in players">{{ name }}</li>
  </ul>
  <p v-if="players.length === 0">No players yet.</p>
  <button @click="players.push('Kai')">Add Kai</button>
  <button @click="players.pop()">Remove the last</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const players = ref(["Ada", "Sam", "Lin"]);
      return { players };
    }
  }).mount("#app");
</script>
```

<!-- Speaker note: What this step is for: v-for repeats the tag it is on, once per item; v-if adds or removes its tag as its condition changes; both follow the data. -->

<!-- Speaker note: Teacher: do the trace on paper first, then check it by clicking. -->

<style scoped>pre, marp-pre { font-size: 0.51em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the page

**Start with Ada, Sam and Lin. Fill in the page after each click.**

| after | li tags on the page | No players yet shows? |
|---|---|---|
| the start | 3 | no |
| Add Kai | ? | ? |
| Remove the last, four times | ? | ? |
| Add Kai | ? | ? |

* Answer: 4, no, 0, yes, 1, no

<!-- Speaker note: The page always matches the list: one li per item, and the message only while the list is empty. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does what?

**Match each part with what it does.**

| | |
|---|---|
| `v-for="name in players"` | A. shows this tag only while the list is empty |
| `{{ name }}` | B. adds an item to the end of the list |
| `v-if="players.length === 0"` | C. the item for this copy of the tag |
| `players.push('Kai')` | D. makes this tag once for each item |

* Answer: v-for="name in players" → D. makes this tag once for each item; {{ name }} → C. the item for this copy of the tag; v-if="players.length === 0" → A. shows this tag only while the list is empty; players.push('Kai') → B. adds an item to the end of the list

<!-- Speaker note: v-for and v-if go on the tag they control. The data decides how many copies there are and whether the tag shows. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The page shows three separate lists, each with one name. There is no error. Click the line that is wrong.**

```
 1  <div id="app">
 2    <ul v-for="name in players">
 3      <li>{{ name }}</li>
 4    </ul>
 5  </div>
 6  
 7  <script src="vue.js"></script>
 8  <script>
 9    const { createApp, ref } = Vue;
10    createApp({
11      setup() {
12        const players = ref(["Ada", "Sam", "Lin"]);
13        return { players };
14      }
15    }).mount("#app");
16  </script>
```

* Answer: line 2

<!-- Speaker note: v-for repeats the tag it is written on. On the ul, it makes three lists. Put it on the li: one list, three items. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Clear the list:** One button, an empty list.
- **Team full:** A second v-if.

[Open this step](https://tutorials.learningwaypoints.com/code/vue/vue-lists/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new button changes the list; a new v-if reacts to a new condition. Hints, in order: Emptying the list means giving players a new, empty list. / `<button @click="players = []">Clear</button>` / A second v-if can look for a different number. / `<p v-if="players.length >= 5">Team full!</p>` For students who need more support: Give the ul with v-for already written; students add only the v-if message. For early finishers: Add :key="song" to the v-for. Number the items with v-for="(song, i) in songs" and {{ i + 1 }}. Add v-else after a v-if. The hard part, on purpose: Students put v-for on the container because "it's the list". Ask "which tag do you want more of?" and let them move it themselves. When students get stuck: Several lists, each with one item. Ask: Which tag has the v-for? Fix: Put v-for on the li, not the ul or ol. / The message never shows or never goes. Ask: What does the v-if compare, and is it === ? Fix: v-if="players.length === 0"; a single = sets a value instead of comparing. / The names show as {{ name }}. Ask: Is the li inside the div with id app? Fix: Keep everything Vue should handle inside #app. -->

<!-- Speaker note: Teacher: for Team full, ask which number to compare and with which sign. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a playlist

Show the **songs** as a list with `v-for`, a message with `v-if` when there are none, and buttons that **add** a song and **remove** one (`push`, `pop`, or `shift`, which takes the first).

[Open this step](https://tutorials.learningwaypoints.com/code/vue/vue-lists/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a v-for list, a v-if message, and buttons that change the list. -->

<!-- Speaker note: Teacher: ask each student to say which tag v-for repeats. -->

---

## Where this leads

Next: **events and inputs**: functions on clicks, and boxes joined to data.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does v-for go on the li and not the ul?**

* v-for repeats the tag it is on, once per item; we want many li tags in one list, not many lists.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: functions for events and v-model for inputs, so the list can take any name. Class idea: find three lists on a website and say what each item's data would be. -->
