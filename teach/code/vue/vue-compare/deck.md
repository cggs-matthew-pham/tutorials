---
marp: true
theme: default
html: true
---

# Same app, three frameworks

Apps with Vue · Final challenge: a to-do app

<!-- Speaker note: Students predict that three versions of the same app (Vue, Preact, Svelte) behave alike, sort each piece of code by the idea it is, find React's update catch in Preact, add an if in Svelte and a Clear button in Preact, and add one feature to all three. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Preact: No-build workflows (htm), https://preactjs.com/guide/v11/no-build-workflows (checked 12 October 2026); React: Updating arrays in state, https://react.dev/learn/updating-arrays-in-state (checked 12 October 2026); Svelte: $state, https://svelte.dev/docs/svelte/$state (checked 12 October 2026); AngularJS: end of support, https://docs.angularjs.org/misc/version-support-status (checked 12 October 2026). -->

---

## Today

**We are learning to** the same small app in Vue, Preact (React's small cousin) and Svelte: state, worked-out values, events and showing data are the same ideas in all three; only the syntax and the update rules differ.

- I can find the data, the worked-out value, the event and the shown data in Vue, Preact and Svelte code.
- I can explain why React and Preact need a new list rather than a changed one.
- I can add the same feature in three frameworks.

<!-- Speaker note: Before class: An optional lesson for students who finished the to-do app. **The point:** components, state, derived (worked-out) values and events are the same ideas in every framework; only the syntax and the update rules differ. - **Preact** is a tiny library written to work like React (same function components and hooks: `useState`). Its page is written with **htm**, a way to write HTML-like tags in a JavaScript string, because real React uses JSX, which needs a build step. Its update rule: the component function runs again after every change, so a plain `const count = stars.length` is always right, but you must **replace** data, never change it in place. `stars.push(...); setStars(stars)` gives Preact the same list, so it skips the update: the planted bug, and the most common React mistake. - **Svelte** compiles each component to plain JavaScript. `$state` and `$derived` are its "runes". Its data can be changed in place (`stars.push`). Here the compiler runs in the browser (about 1 MB, loaded only by this lesson), reading the component from a hidden `<textarea data-svelte>`; in a real project it is a file called `App.svelte`, compiled by a build tool. - **Angular** is left out on purpose: it needs TypeScript and a command-line toolchain. The older AngularJS is no longer supported (support ended in January 2022). Every library is served from this site, not a CDN. -->

---

## Why it matters

> Job adverts ask for React, Vue or Svelte. Learn the ideas once, and each framework is a new way of writing them.

<!-- Speaker note: Vue is one of several frameworks that keep a page in step with its data. The best known is **React**; here we use **Preact**, a small version of React with the same way of writing (about 15 KB, served beside the page). **Svelte** works differently: its compiler turns your component into plain JavaScript before it runs. The same app, three ways: | Idea | Vue | Preact (like React) | Svelte | |---|---|---|---| | Data that changes | `ref([])` | `useState([])` | `$state([])` | | A worked-out value | `computed(() => …)` | a plain line, `stars.length` | `$derived(…)` | | An event | `@click="add"` | ``onClick=${add}`` | `onclick={add}` | | Showing data | `{{ count }}` | `${count}` | `{count}` | Two recipes to copy, not to learn: Preact's page is written inside ``html`…` `` (htm, a way to write HTML-like tags in JavaScript), and the Svelte component sits in a hidden `<textarea data-svelte>`, where `svelte.js` finds it. In a real project a Svelte component is its own file, `App.svelte`. `stars.join("")` puts the list's items together as one piece of text. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

_The program is 55 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-compare/?full=step-1#step-1)

**You click Add a star twice in each app. What do they show?**

- Svelte shows nothing: its code is in a textarea
- Only Vue shows 2: the others have no ref
- All three show Stars: 2
- Preact shows 0: its count is a plain line, which goes stale

<!-- Speaker note: What happens: All three show Stars: 2. Preact runs its whole App function again after each change, so its plain count line runs again too. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students who did the computed lesson whether Preact's plain count will go stale. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* All three show Stars: 2. Preact runs its whole App function again after each change, so its plain count line runs again too.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/vue/vue-compare/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/vue/vue-compare/?full=step-2#step-2)

<!-- Speaker note: Press **Run**. Svelte takes a moment longer to start: its compiler (about 1 MB) turns the component into JavaScript first. Students should be able to say: I clicked each app's button and saw all three behave the same way. -->

<!-- Speaker note: Teacher: point out the short wait while Svelte compiles. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 52 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-compare/?full=step-3#step-3)

<!-- Speaker note: What this step is for: State, worked-out values, events and showing data appear in all three; React and Preact replace data rather than change it, and run the whole component again. -->

<!-- Speaker note: Teacher: do the sort as a class, one framework at a time. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sort the ideas

**Sort each piece of code by the idea it is.**

Groups: Data that changes · A worked-out value · An event · Showing data

Vue: ref([]) · Preact: useState([]) · Svelte: $state([]) · Vue: computed(() =&gt; stars.value.length) · Preact: const count = stars.length · Svelte: $derived(stars.length) · Vue: @click="add" · Preact: onClick=${add} · Svelte: onclick={add} · Vue: {{ count }} · Preact: ${count} · Svelte: {count}

* Answer: Vue: ref([]) → Data that changes; Preact: useState([]) → Data that changes; Svelte: $state([]) → Data that changes; Vue: computed(() =&gt; stars.value.length) → A worked-out value; Preact: const count = stars.length → A worked-out value; Svelte: $derived(stars.length) → A worked-out value; Vue: @click="add" → An event; Preact: onClick=${add} → An event; Svelte: onclick={add} → An event; Vue: {{ count }} → Showing data; Preact: ${count} → Showing data; Svelte: {count} → Showing data

<!-- Speaker note: Four ideas, three ways to write each. Learn the ideas once; each framework is new spelling. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why no computed?

**In Vue, a total worked out with a plain line went stale. Why is Preact's plain line, const count = stars.length, always right?**

- Preact runs the whole App function again after every change, so the line runs again
- It is not: Preact's count goes stale too
- stars.length is special
- Preact is newer

* Answer: Preact runs the whole App function again after every change, so the line runs again

<!-- Speaker note: Vue runs setup once and watches refs; Preact (and React) run the component function again each time. Different update rules, the same result on the page. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 8 and 9

<!-- Speaker note: push changes the old list, then setStars is given that same list, so Preact sees nothing new and skips the update. Give it a new list: setStars([...stars, "⭐"]). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **An if in Svelte:** Its own way to write v-if.
- **Clear in Preact:** A new, empty list.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-compare/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each framework has its own spelling for the same moves: a choice in Svelte is an {#if} block; changing data in Preact is always giving it a new value. Hints, in order: Svelte's v-if is a block: {#if …} at the start and {/if} at the end. / `{#if count >= 5}` then a paragraph, then `{/if}`, under the count. / In Preact you never change the list: you give setStars a new one. / A clear function that runs setStars([]), and a button with onClick=${clear}. For students who need more support: Do the sort together on the board; students do only the Svelte if. For early finishers: Make each framework's star list into a component of its own. Find the same app in React on react.dev and compare it with the Preact version. The hard part, on purpose: The three spellings blur together. Keep returning to the four ideas: ask "which line is the data? the worked-out value? the event?" in each panel. When students get stuck: Preact's page does not change. Ask: Does setStars get a new list, or the old one changed? Fix: setStars([...stars, "⭐"]) or stars.slice(0, -1): always a new list. / Svelte shows a red error about reading the component. Ask: Which line of the component does the message name? Fix: Check the braces { } and the {#if} … {/if} pair on that line. / The Svelte app does not appear at all. Ask: Is svelte.js loaded after the textarea, and does the textarea have data-svelte? Fix: Keep the textarea with data-svelte hidden, and the script src="svelte.js" line after it. -->

<!-- Speaker note: Teacher: ask what each framework calls v-if, and what Preact needs instead of changing the list. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: the same feature three times

Add a **Remove one** button to all three apps. In Vue and Svelte, `pop()` takes the last item off the list. In Preact, give `setStars` a new list without the last item: `stars.slice(0, -1)`. Which was easiest? Which was clearest to read?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-compare/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: one feature added to all three apps, so the differences show. -->

<!-- Speaker note: Teacher: ask which version they would rather read in a year's time, and why. -->

---

## Where this leads

You have seen the same ideas in three frameworks. Real projects use a **build tool** and one file per component; the ideas stay the same.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name one idea that all three frameworks share, and one thing that differs.**

* Shared: data that changes and a page that follows it (or worked-out values, events, components). Different: the spelling, or the update rule (Preact replaces data, Vue and Svelte can change it).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Real projects: npm create vue@latest (Vue), Vite with React, or npx sv create (Svelte), each with one file per component. Class discussion: why might a team choose each one (popularity and jobs, simplicity, speed)? -->
