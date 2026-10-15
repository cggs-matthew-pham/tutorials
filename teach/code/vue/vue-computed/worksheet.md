---
title: "Values worked out from data: computed"
subtitle: "Apps with Vue · Building apps · Lesson 4"
---

# Values worked out from data: computed

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A basket total, a score out of ten, the number of unread messages: each is worked out from other data, and must never go stale.


:::teacher-note

**In one sentence:** Students predict a ticket total after two clicks, trace the total and a v-if message, find a plain calculation that goes stale, add a people count and a group deal, and make a recipe scaler.

**Students should be able to say:** I can work a value out from other data with computed. I can explain why a plain calculation in setup goes stale. I can use a computed value on the page and in a v-if.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The page starts at 2 adults and 1 child: $29.

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

:::keep-together

**You press Adults + twice. What total does the page show?**

☐ $31

☐ $53

☐ $29: the total was worked out at the start

☐ $41

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** $53: four adults at $12 is $48, plus one child at $5. computed works the total out again after each click.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Trace the page

**Start with 2 adults and 1 child. Fill in the page after each click.**

{{rows 1}}

| after | adults | children | total ($) | free programme? |
|---|---|---|---|---|
| the start | 2 | 1 | 29 | no |
| Adults + |   |   |   |   |
| Children + |   |   |   |   |
| Adults + |   |   |   |   |

:::


:::teacher-note

**Answer:** 3, 1, 41, no, 3, 2, 46, no, 4, 2, 58, yes

The total is worked out again after every click, and the v-if tests the new total each time.

:::


:::keep-together

### Why computed?

**Why is the total a computed and not a ref of its own?**

☐ computed is faster to type

☐ It is worked out from adults and children, so it should follow them, never be set by hand

☐ Refs cannot hold numbers

☐ A ref would show the wrong number at the start

:::


:::teacher-note

**Answer:** It is worked out from adults and children, so it should follow them, never be set by hand

A ref of its own would need every button to remember to change it too. A computed cannot go out of step: Vue works it out from the data.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 14

This total is a plain calculation: it is worked out once, at the start, and never again. Wrap it in computed(() =&gt; …).

:::


:::typical

## Modify


**Count the people.** A second computed.

**A group deal.** An if inside computed.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Count the people:**

```html
<div id="app">
  <h1>Concert tickets</h1>
  <p>Adults ($12): {{ adults }}
    <button @click="adults++">+</button> <button @click="adults--">−</button></p>
  <p>Children ($5): {{ children }}
    <button @click="children++">+</button> <button @click="children--">−</button></p>
  <p>People: {{ people }}</p>
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
      const people = computed(() => adults.value + children.value);
      const total = computed(() => adults.value * 12 + children.value * 5);
      return { adults, children, people, total };
    }
  }).mount("#app");
</script>
```

**A group deal:**

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
      const total = computed(() => {
        let sum = adults.value * 12 + children.value * 5;
        if (adults.value + children.value >= 6) {
          sum = sum - 10;
        }
        return sum;
      });
      return { adults, children, total };
    }
  }).mount("#app");
</script>
```

:::

:::


## Make: a recipe scaler

One pancake needs **25 g of flour** and **40 ml of milk**. Show how much of each you need for any number of pancakes, each with `computed`. Add eggs too if you like (one for every four pancakes: `Math.ceil(pancakes.value / 4)`).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<div id="app">
  <h1>Pancakes</h1>
  <p>Pancakes: {{ pancakes }}
    <button @click="pancakes++">+</button> <button @click="pancakes--">−</button></p>
  <ul>
    <li>Flour: {{ flour }} g</li>
    <li>Milk: {{ milk }} ml</li>
    <li>Eggs: {{ eggs }}</li>
  </ul>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  createApp({
    setup() {
      const pancakes = ref(4);
      const flour = computed(() => pancakes.value * 25);
      const milk = computed(() => pancakes.value * 40);
      const eggs = computed(() => Math.ceil(pancakes.value / 4));
      return { pancakes, flour, milk, eggs };
    }
  }).mount("#app");
</script>
```

:::


:::wider

## Where this leads

Next: **components**, tags of your own.

:::


## Exit ticket

:::keep-together

**Why does a total made with computed stay right, when a plain calculation in setup does not?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Vue works a computed out again whenever the data it uses changes; a plain calculation runs once, when the page starts.

:::

