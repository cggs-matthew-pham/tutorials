---
marp: true
theme: default
html: true
---

# Values worked out from data: computed

Apps with Vue · Building apps

<!-- Speaker note: Students predict a ticket total after two clicks, trace the total and a v-if message, find a plain calculation that goes stale, add a people count and a group deal, and make a recipe scaler. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Vue.js: Computed properties, https://vuejs.org/guide/essentials/computed.html (checked 12 October 2026). -->

---

## Today

**We are learning to** work a value out from other data with computed, so it is worked out again whenever that data changes, and see why a plain calculation goes stale.

- I can work a value out from other data with computed.
- I can explain why a plain calculation in setup goes stale.
- I can use a computed value on the page and in a v-if.

<!-- Speaker note: Before class: Read the unit primer first. `computed(() => adults.value * 12 + children.value * 5)` gives a value Vue works out again whenever the refs it reads change. On the page it is used like a ref (`{{ total }}`, `v-if="total >= 50"`). The arrow `() =>` is a short function that gives back what follows it; students do not need more about arrow functions than that. The planted bug is the idea the course names as hard: a value **derived** from data must be computed, or it is worked out once when setup runs and then goes stale. The page shows no error. A useful contrast: a ref is data you set; a computed is data you never set, only work out. Prices are invented for the example. -->

---

## Why it matters

> A basket total, a score out of ten, the number of unread messages: each is worked out from other data, and must never go stale.

<!-- Speaker note: Some values are not data of their own: they are **worked out** from other data. A ticket total comes from the numbers of adults and children. If the numbers change, the total must be worked out again. ```js const total = computed(() => adults.value * 12 + children.value * 5); ``` `computed` takes a little function that works the value out. Vue runs it again whenever `adults` or `children` changes, so `{{ total }}` is always right. `() => …` is a short way to write a function that gives back what follows the arrow. **The hard part:** a plain calculation, `const total = adults.value * 12 + …`, is worked out **once**, when the page starts, and then never again. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<div id="app">
  <p>Adults ($12): {{ adults }} <button @click="adults++">+</button></p>
  <p>Children ($5): {{ children }}</p>
  <p>Total: ${{ total }}</p>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  createApp({
    setup() {
      const adults = ref(2);
      const children = ref(1);
      const total = computed(() => adults.value * 12 + children.value * 5);
      return { adults, children, total };
    }
  }).mount("#app");
</script>
```

**You press Adults + twice. What total does the page show?**

- $31
- $53
- $29: the total was worked out at the start
- $41

<!-- Speaker note: What happens: $53: four adults at $12 is $48, plus one child at $5. computed works the total out again after each click. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to say how the total is worked out before they choose. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* $53: four adults at $12 is $48, plus one child at $5. computed works the total out again after each click.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/vue/vue-computed/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/vue/vue-computed/?full=step-2#step-2)

<!-- Speaker note: Press **Run** and change the numbers. Watch the total, and the message that appears at $50. Students should be able to say: I changed the tickets until the free programme message appeared. -->

<!-- Speaker note: Teacher: ask what makes the free programme message appear and disappear. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<div id="app">
  <h1>Concert tickets</h1>
  <p>Adults ($12): {{ adults }}
    <button @click="adults++">+</button> <button @click="adults--">−</button></p>
  <p>Children ($5): {{ children }}
    <button @click="children++">+</button> <button @click="children--">−</button></p>
  <p><b>Total: ${{ total }}</b></p>
  <p v-if="total >= 50">A free programme comes with your tickets!</p>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  createApp({
    setup() {
      const adults = ref(2);
      const children = ref(1);
      const total = computed(() => adults.value * 12 + children.value * 5);
      return { adults, children, total };
    }
  }).mount("#app");
</script>
```

<!-- Speaker note: What this step is for: computed values follow the data they use; a v-if can test a computed value; a plain calculation in setup is worked out once and goes stale. -->

<!-- Speaker note: Teacher: trace on paper first, then check by clicking. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the page

**Start with 2 adults and 1 child. Fill in the page after each click.**

| after | adults | children | total ($) | free programme? |
|---|---|---|---|---|
| the start | 2 | 1 | 29 | no |
| Adults + | ? | ? | ? | ? |
| Children + | ? | ? | ? | ? |
| Adults + | ? | ? | ? | ? |

* Answer: 3, 1, 41, no, 3, 2, 46, no, 4, 2, 58, yes

<!-- Speaker note: The total is worked out again after every click, and the v-if tests the new total each time. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why computed?

**Why is the total a computed and not a ref of its own?**

- computed is faster to type
- It is worked out from adults and children, so it should follow them, never be set by hand
- Refs cannot hold numbers
- A ref would show the wrong number at the start

* Answer: It is worked out from adults and children, so it should follow them, never be set by hand

<!-- Speaker note: A ref of its own would need every button to remember to change it too. A computed cannot go out of step: Vue works it out from the data. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Clicking Adults + changes the number of adults, but the total stays at $29. There is no error. Click the line that is wrong.**

```
 1  <div id="app">
 2    <p>Adults ($12): {{ adults }} <button @click="adults++">+</button></p>
 3    <p>Children ($5): {{ children }}</p>
 4    <p>Total: ${{ total }}</p>
 5  </div>
 6  
 7  <script src="vue.js"></script>
 8  <script>
 9    const { createApp, ref, computed } = Vue;
10    createApp({
11      setup() {
12        const adults = ref(2);
13        const children = ref(1);
14        const total = adults.value * 12 + children.value * 5;
15        return { adults, children, total };
16      }
17    }).mount("#app");
18  </script>
```

* Answer: line 14

<!-- Speaker note: This total is a plain calculation: it is worked out once, at the start, and never again. Wrap it in computed(() => …). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Count the people:** A second computed.
- **A group deal:** An if inside computed.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-computed/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new computed is one line plus a return and a {{ }}; a computed can hold an if, as long as it returns the value. Hints, in order: The number of people is worked out from adults and children. / `const people = computed(() => adults.value + children.value);` then return it and show `{{ people }}`. / A computed can have several lines, as long as it returns the value at the end. / Inside computed(() => { … }): let sum = the old total; if 6 or more people, take 10 away; return sum; For students who need more support: Give the people computed written out; students only return and show it. For early finishers: Stop the numbers going below 0 (a computed can't do that: change the buttons, or use Math.max). Add a computed message that says how far from $50 the order is. The hard part, on purpose: Students make the total a ref and update it in every button. Ask "what is the total worked out from?" and "what if someone adds a button and forgets?" When students get stuck: The total never changes. Ask: Is it wrapped in computed? Fix: const total = computed(() => …); / A red error: computed is not defined. Ask: Is computed in the line that takes things from Vue? Fix: const { createApp, ref, computed } = Vue; / The total shows NaN or [object Object]. Ask: Inside computed, did every ref get its .value? Fix: adults.value * 12, not adults * 12. / A computed with an if shows nothing. Ask: Does the function return the value at the end? Fix: Finish with return sum; -->

<!-- Speaker note: Teacher: for the group deal, ask where the if goes (inside the computed) and what it must give back. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a recipe scaler

One pancake needs **25 g of flour** and **40 ml of milk**. Show how much of each you need for any number of pancakes, each with `computed`. Add eggs too if you like (one for every four pancakes: `Math.ceil(pancakes.value / 4)`).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-computed/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: several computed values that all follow one piece of data. -->

<!-- Speaker note: Teacher: ask which data everything else is worked out from. -->

---

## Where this leads

Next: **components**, tags of your own.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a total made with computed stay right, when a plain calculation in setup does not?**

* Vue works a computed out again whenever the data it uses changes; a plain calculation runs once, when the page starts.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: components with props. Class idea: name three values on a shopping site that are computed (total, item count, delivery cost). -->
