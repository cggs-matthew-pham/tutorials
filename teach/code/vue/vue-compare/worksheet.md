---
title: "Same app, three frameworks"
subtitle: "Apps with Vue · Final challenge: a to-do app · Lesson 7"
---

# Same app, three frameworks

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Job adverts ask for React, Vue or Svelte. Learn the ideas once, and each framework is a new way of writing them.


:::teacher-note

**In one sentence:** Students predict that three versions of the same app (Vue, Preact, Svelte) behave alike, sort each piece of code by the idea it is, find React's update catch in Preact, add an if in Svelte and a Clear button in Preact, and add one feature to all three.

**Students should be able to say:** I can find the data, the worked-out value, the event and the shown data in Vue, Preact and Svelte code. I can explain why React and Preact need a new list rather than a changed one. I can add the same feature in three frameworks.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read all three panels. Which lines keep the data, work out the count, and handle the click?

```html
<!-- file: vue.html -->
<h2>Vue</h2>
<div id="vue-app">
  <button @click="add">Add a star</button>
  <p>Stars: {{ count }} {{ stars.join("") }}</p>
</div>
<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  createApp({
    setup() {
      const stars = ref([]);
      const count = computed(() => stars.value.length);
      function add() {
        stars.value.push("⭐");
      }
      return { stars, count, add };
    }
  }).mount("#vue-app");
</script>

<!-- file: preact.html -->
<h2>Preact</h2>
<div id="preact-app"></div>
<script src="preact.js"></script>
<script>
  const { html, render, useState } = htmPreact;
  function App() {
    const [stars, setStars] = useState([]);
    const count = stars.length;
    function add() {
      setStars([...stars, "⭐"]);
    }
    return html`
      <button onClick=${add}>Add a star</button>
      <p>Stars: ${count} ${stars.join("")}</p>`;
  }
  render(html`<${App} />`, document.querySelector("#preact-app"));
</script>

<!-- file: svelte.html -->
<h2>Svelte</h2>
<textarea data-svelte hidden>
  <script>
    let stars = $state([]);
    let count = $derived(stars.length);
    function add() {
      stars.push("⭐");
    }
  </script>
  <button onclick={add}>Add a star</button>
  <p>Stars: {count} {stars.join("")}</p>
</textarea>
<script src="svelte.js"></script>
```

:::keep-together

**You click Add a star twice in each app. What do they show?**

☐ Svelte shows nothing: its code is in a textarea

☐ Only Vue shows 2: the others have no ref

☐ All three show Stars: 2

☐ Preact shows 0: its count is a plain line, which goes stale

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** All three show Stars: 2. Preact runs its whole App function again after each change, so its plain count line runs again too.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h2>Vue</h2>
<div id="vue-app">
  <button @click="add">Add a star</button>
  <p>Stars: {{ count }} {{ stars.join("") }}</p>
</div>
<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  createApp({
    setup() {
      const stars = ref([]);
      const count = computed(() => stars.value.length);
      function add() {
        stars.value.push("⭐");
      }
      return { stars, count, add };
    }
  }).mount("#vue-app");
</script>

<h2>Preact</h2>
<div id="preact-app"></div>
<script src="preact.js"></script>
<script>
  const { html, render, useState } = htmPreact;
  function App() {
    const [stars, setStars] = useState([]);
    const count = stars.length;
    function add() {
      setStars([...stars, "⭐"]);
    }
    return html`
      <button onClick=${add}>Add a star</button>
      <p>Stars: ${count} ${stars.join("")}</p>`;
  }
  render(html`<${App} />`, document.querySelector("#preact-app"));
</script>

<h2>Svelte</h2>
<textarea data-svelte hidden>
  <script>
    let stars = $state([]);
    let count = $derived(stars.length);
    function add() {
      stars.push("⭐");
    }
  </script>
  <button onclick={add}>Add a star</button>
  <p>Stars: {count} {stars.join("")}</p>
</textarea>
<script src="svelte.js"></script>
```

:::keep-together

### Sort the ideas

**Sort each piece of code by the idea it is.**

Groups: Data that changes, A worked-out value, An event, Showing data

- Vue: ref([]): {{field-15}}
- Preact: useState([]): {{field-15}}
- Svelte: $state([]): {{field-15}}
- Vue: computed(() =&gt; stars.value.length): {{field-15}}
- Preact: const count = stars.length: {{field-15}}
- Svelte: $derived(stars.length): {{field-15}}
- Vue: @click="add": {{field-15}}
- Preact: onClick=${add}: {{field-15}}
- Svelte: onclick={add}: {{field-15}}
- Vue: {{ count }}: {{field-15}}
- Preact: ${count}: {{field-15}}
- Svelte: {count}: {{field-15}}

:::


:::teacher-note

**Answer:** Vue: ref([]) → Data that changes; Preact: useState([]) → Data that changes; Svelte: $state([]) → Data that changes; Vue: computed(() =&gt; stars.value.length) → A worked-out value; Preact: const count = stars.length → A worked-out value; Svelte: $derived(stars.length) → A worked-out value; Vue: @click="add" → An event; Preact: onClick=${add} → An event; Svelte: onclick={add} → An event; Vue: {{ count }} → Showing data; Preact: ${count} → Showing data; Svelte: {count} → Showing data

Four ideas, three ways to write each. Learn the ideas once; each framework is new spelling.

:::


:::keep-together

### Why no computed?

**In Vue, a total worked out with a plain line went stale. Why is Preact's plain line, const count = stars.length, always right?**

☐ Preact runs the whole App function again after every change, so the line runs again

☐ It is not: Preact's count goes stale too

☐ stars.length is special

☐ Preact is newer

:::


:::teacher-note

**Answer:** Preact runs the whole App function again after every change, so the line runs again

Vue runs setup once and watches refs; Preact (and React) run the component function again each time. Different update rules, the same result on the page.

:::


:::keep-together

### Spot the bug

**In this Preact app, Add a star does nothing: the count stays at 0. There is no error. Click the two lines that are wrong.**

```
 1  <div id="preact-app"></div>
 2  <script src="preact.js"></script>
 3  <script>
 4    const { html, render, useState } = htmPreact;
 5    function App() {
 6      const [stars, setStars] = useState([]);
 7      function add() {
 8        stars.push("⭐");
 9        setStars(stars);
10      }
11      return html`
12        <button onClick=${add}>Add a star</button>
13        <p>Stars: ${stars.length} ${stars.join("")}</p>`;
14    }
15    render(html`<${App} />`, document.querySelector("#preact-app"));
16  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 8 and 9

push changes the old list, then setStars is given that same list, so Preact sees nothing new and skips the update. Give it a new list: setStars([...stars, "⭐"]).

:::


:::typical

## Modify


**An if in Svelte.** Its own way to write v-if.

**Clear in Preact.** A new, empty list.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**An if in Svelte:**

```html
<h2>Svelte</h2>
<textarea data-svelte hidden>
  <script>
    let stars = $state([]);
    let count = $derived(stars.length);
    function add() {
      stars.push("⭐");
    }
  </script>
  <button onclick={add}>Add a star</button>
  <p>Stars: {count} {stars.join("")}</p>
  {#if count >= 5}
    <p>That's a lot of stars!</p>
  {/if}
</textarea>
<script src="svelte.js"></script>
```

**Clear in Preact:**

```html
<h2>Preact</h2>
<div id="preact-app"></div>
<script src="preact.js"></script>
<script>
  const { html, render, useState } = htmPreact;
  function App() {
    const [stars, setStars] = useState([]);
    const count = stars.length;
    function add() {
      setStars([...stars, "⭐"]);
    }
    function clear() {
      setStars([]);
    }
    return html`
      <button onClick=${add}>Add a star</button>
      <button onClick=${clear}>Clear</button>
      <p>Stars: ${count} ${stars.join("")}</p>`;
  }
  render(html`<${App} />`, document.querySelector("#preact-app"));
</script>
```

:::

:::


## Make: the same feature three times

Add a **Remove one** button to all three apps. In Vue and Svelte, `pop()` takes the last item off the list. In Preact, give `setStars` a new list without the last item: `stars.slice(0, -1)`. Which was easiest? Which was clearest to read?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h2>Vue</h2>
<div id="vue-app">
  <button @click="add">Add a star</button>
  <button @click="remove">Remove one</button>
  <p>Stars: {{ count }} {{ stars.join("") }}</p>
</div>
<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  createApp({
    setup() {
      const stars = ref([]);
      const count = computed(() => stars.value.length);
      function add() {
        stars.value.push("⭐");
      }
      function remove() {
        stars.value.pop();
      }
      return { stars, count, add, remove };
    }
  }).mount("#vue-app");
</script>

<h2>Preact</h2>
<div id="preact-app"></div>
<script src="preact.js"></script>
<script>
  const { html, render, useState } = htmPreact;
  function App() {
    const [stars, setStars] = useState([]);
    const count = stars.length;
    function add() {
      setStars([...stars, "⭐"]);
    }
    function remove() {
      setStars(stars.slice(0, -1));
    }
    return html`
      <button onClick=${add}>Add a star</button>
      <button onClick=${remove}>Remove one</button>
      <p>Stars: ${count} ${stars.join("")}</p>`;
  }
  render(html`<${App} />`, document.querySelector("#preact-app"));
</script>

<h2>Svelte</h2>
<textarea data-svelte hidden>
  <script>
    let stars = $state([]);
    let count = $derived(stars.length);
    function add() {
      stars.push("⭐");
    }
    function remove() {
      stars.pop();
    }
  </script>
  <button onclick={add}>Add a star</button>
  <button onclick={remove}>Remove one</button>
  <p>Stars: {count} {stars.join("")}</p>
</textarea>
<script src="svelte.js"></script>
```

:::


:::wider

## Where this leads

You have seen the same ideas in three frameworks. Real projects use a **build tool** and one file per component; the ideas stay the same.

:::


## Exit ticket

:::keep-together

**Name one idea that all three frameworks share, and one thing that differs.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Shared: data that changes and a page that follows it (or worked-out values, events, components). Different: the spelling, or the update rule (Preact replaces data, Vue and Svelte can change it).

:::

