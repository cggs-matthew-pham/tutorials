---
title: "Lists and choices: v-for and v-if"
subtitle: "Apps with Vue · Data on the page · Lesson 2"
---

# Lists and choices: v-for and v-if

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A chat, a playlist and a search page are all lists that change. v-for keeps the page in step with the list.


:::teacher-note

**In one sentence:** Students predict that pushing to a list adds a tag, trace the page as the list changes, find v-for on the wrong tag, add a Clear button and a Team full message, and make a playlist.

**Students should be able to say:** I can make a tag for each item in a list with v-for. I can show a tag only when something is true with v-if. I can change a list and watch the page keep up.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

In the DOM course, pushing to an array did not change the page. What about here?

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

:::keep-together

**You click Add Kai once. How many names are on the page?**

☐ 1

☐ 4

☐ 6

☐ 3: changing the array does not change the page

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 4. push adds Kai to players, and v-for makes an li for every item, so a fourth li appears.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Trace the page

**Start with Ada, Sam and Lin. Fill in the page after each click.**

{{rows 1}}

| after | li tags on the page | No players yet shows? |
|---|---|---|
| the start | 3 | no |
| Add Kai |   |   |
| Remove the last, four times |   |   |
| Add Kai |   |   |

:::


:::teacher-note

**Answer:** 4, no, 0, yes, 1, no

The page always matches the list: one li per item, and the message only while the list is empty.

:::


:::keep-together

### Which part does what?

**Match each part with what it does.**

A. shows this tag only while the list is empty

B. adds an item to the end of the list

C. the item for this copy of the tag

D. makes this tag once for each item

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `v-for="name in players"` | |
| `{{ name }}` | |
| `v-if="players.length === 0"` | |
| `players.push('Kai')` | |

:::


:::teacher-note

**Answer:** v-for="name in players" → D. makes this tag once for each item; {{ name }} → C. the item for this copy of the tag; v-if="players.length === 0" → A. shows this tag only while the list is empty; players.push('Kai') → B. adds an item to the end of the list

v-for and v-if go on the tag they control. The data decides how many copies there are and whether the tag shows.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

v-for repeats the tag it is written on. On the ul, it makes three lists. Put it on the li: one list, three items.

:::


:::typical

## Modify


**Clear the list.** One button, an empty list.

**Team full.** A second v-if.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Clear the list:**

```html
<div id="app">
  <h1>Chess team</h1>
  <ul>
    <li v-for="name in players">{{ name }}</li>
  </ul>
  <p v-if="players.length === 0">No players yet.</p>
  <button @click="players.push('Kai')">Add Kai</button>
  <button @click="players.pop()">Remove the last</button>
  <button @click="players = []">Clear</button>
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

**Team full:**

```html
<div id="app">
  <h1>Chess team</h1>
  <ul>
    <li v-for="name in players">{{ name }}</li>
  </ul>
  <p v-if="players.length === 0">No players yet.</p>
  <p v-if="players.length >= 5">Team full!</p>
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

:::

:::


## Make: a playlist

Show the **songs** as a list with `v-for`, a message with `v-if` when there are none, and buttons that **add** a song and **remove** one (`push`, `pop`, or `shift`, which takes the first).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<div id="app">
  <h1>My playlist</h1>
  <ol>
    <li v-for="song in songs">{{ song }}</li>
  </ol>
  <p v-if="songs.length === 0">Nothing to play.</p>
  <button @click="songs.push('Another song')">Add a song</button>
  <button @click="songs.shift()">Play the first</button>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  createApp({
    setup() {
      const songs = ref(["First song", "Second song"]);
      return { songs };
    }
  }).mount("#app");
</script>
```

:::


:::wider

## Where this leads

Next: **events and inputs**: functions on clicks, and boxes joined to data.

:::


## Exit ticket

:::keep-together

**Why does v-for go on the li and not the ul?**

{{lines-3}}

:::


:::teacher-note

**Answer:** v-for repeats the tag it is on, once per item; we want many li tags in one list, not many lists.

:::

