---
title: "Components and props"
subtitle: "Apps with Vue · Building apps · Lesson 5"
---

# Components and props

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A feed of posts, a shop of products and a ladder of players are each one card used many times, with different data.


:::teacher-note

**In one sentence:** Students predict what a made-up tag shows, make cards from a list with a component and props, find a prop passed without its colon, add a medal to every card and a player to the data, and make pet cards.

**Students should be able to say:** I can make a tag of my own with app.component. I can pass each copy its own data with props and :name="value". I can show one component for each item in a list.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

There is no tag called `player-card` in HTML. Vue has been told about one.

```html
<div id="app">
  <player-card name="Ada"></player-card>
  <player-card name="Sam"></player-card>
  <player-card name="Lin"></player-card>
</div>

<script src="vue.js"></script>
<script>
  const { createApp } = Vue;
  const app = createApp({});
  app.component("player-card", {
    props: ["name"],
    template: `<p style="border: 2px solid teal; padding: 8px;">Player: {{ name }}</p>`
  });
  app.mount("#app");
</script>
```

:::keep-together

**player-card is not an HTML tag. What does the page show?**

☐ Nothing: the browser does not know player-card

☐ Three boxes: Player: Ada, Player: Sam, Player: Lin

☐ One box with all three names

☐ Three boxes that all say Player: Ada

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Three boxes, each with its own name. Vue turns each player-card tag into the component's template, with that tag's name prop.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<div id="app">
  <h1>Chess ladder</h1>
  <player-card v-for="p in players" :name="p.name" :wins="p.wins"></player-card>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  const app = createApp({
    setup() {
      const players = ref([
        { name: "Ada", wins: 5 },
        { name: "Sam", wins: 4 },
        { name: "Lin", wins: 2 }
      ]);
      return { players };
    }
  });
  app.component("player-card", {
    props: ["name", "wins"],
    template: `
      <div style="border: 2px solid teal; padding: 8px; margin: 8px 0;">
        <h2>{{ name }}</h2>
        <p>Wins: {{ wins }}</p>
      </div>`
  });
  app.mount("#app");
</script>
```

:::keep-together

### Which part does what?

**Match each part with what it does.**

A. the HTML each copy shows

B. the data each copy is given

C. one player-card for each player

D. gives this copy the value of p.wins

E. makes a new tag, player-card

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `app.component("player-card", { … })` | |
| `props: ["name", "wins"]` | |
| `template: `…`` | |
| `:wins="p.wins"` | |
| `v-for="p in players"` | |

:::


:::teacher-note

**Answer:** app.component("player-card", { … }) → E. makes a new tag, player-card; props: ["name", "wins"] → B. the data each copy is given; template: `…` → A. the HTML each copy shows; :wins="p.wins" → D. gives this copy the value of p.wins; v-for="p in players" → C. one player-card for each player

The parent app holds the data and hands each card its part through props.

:::


:::keep-together

### Where does the data come from?

**Inside the component, where do name and wins come from?**

☐ From the browser

☐ From the tag that uses it, through props

☐ From setup in the component

☐ From the players list directly

:::


:::teacher-note

**Answer:** From the tag that uses it, through props

The card does not know about the list. Each copy is given its own name and wins by the tag that makes it.

:::


:::keep-together

### Spot the bug

**Each card says p.wins wins instead of a number. There is no error. Click the line that is wrong.**

```
 1  <div id="app">
 2    <player-card v-for="p in players" :name="p.name" wins="p.wins"></player-card>
 3  </div>
 4  
 5  <script src="vue.js"></script>
 6  <script>
 7    const { createApp, ref } = Vue;
 8    const app = createApp({
 9      setup() {
10        const players = ref([{ name: "Ada", wins: 5 }, { name: "Sam", wins: 4 }]);
11        return { players };
12      }
13    });
14    app.component("player-card", {
15      props: ["name", "wins"],
16      template: `<p>{{ name }}: {{ wins }} wins</p>`
17    });
18    app.mount("#app");
19  </script>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

wins="p.wins" passes the words p.wins. :wins="p.wins", with the colon, passes the value.

:::


:::typical

## Modify


**A medal.** Every card, one change.

**A new player.** Data, not HTML.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A medal:**

```html
<div id="app">
  <h1>Chess ladder</h1>
  <player-card v-for="p in players" :name="p.name" :wins="p.wins"></player-card>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  const app = createApp({
    setup() {
      const players = ref([
        { name: "Ada", wins: 5 },
        { name: "Sam", wins: 4 },
        { name: "Lin", wins: 2 }
      ]);
      return { players };
    }
  });
  app.component("player-card", {
    props: ["name", "wins"],
    template: `
      <div style="border: 2px solid teal; padding: 8px; margin: 8px 0;">
        <h2>{{ name }}</h2>
        <p>Wins: {{ wins }}</p>
        <p v-if="wins >= 5">🏅 Top player</p>
      </div>`
  });
  app.mount("#app");
</script>
```

**A new player:**

```html
<div id="app">
  <h1>Chess ladder</h1>
  <player-card v-for="p in players" :name="p.name" :wins="p.wins"></player-card>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  const app = createApp({
    setup() {
      const players = ref([
        { name: "Ada", wins: 5 },
        { name: "Sam", wins: 4 },
        { name: "Lin", wins: 2 },
        { name: "Kai", wins: 3 }
      ]);
      return { players };
    }
  });
  app.component("player-card", {
    props: ["name", "wins"],
    template: `
      <div style="border: 2px solid teal; padding: 8px; margin: 8px 0;">
        <h2>{{ name }}</h2>
        <p>Wins: {{ wins }}</p>
      </div>`
  });
  app.mount("#app");
</script>
```

:::

:::


## Make: pet cards

Make a **pet-card** component with two props (`name` and `kind`) and a template of your own design, then show every pet with `v-for`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<div id="app">
  <h1>Pets at our school</h1>
  <pet-card v-for="p in pets" :name="p.name" :kind="p.kind"></pet-card>
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref } = Vue;
  const app = createApp({
    setup() {
      const pets = ref([
        { name: "Biscuit", kind: "guinea pig" },
        { name: "Nemo", kind: "goldfish" },
        { name: "Pepper", kind: "rabbit" }
      ]);
      return { pets };
    }
  });
  app.component("pet-card", {
    props: ["name", "kind"],
    template: `
      <div style="border: 2px dashed orange; padding: 8px; margin: 8px 0;">
        <h2>{{ name }}</h2>
        <p>A {{ kind }}</p>
      </div>`
  });
  app.mount("#app");
</script>
```

:::


:::wider

## Where this leads

Next: **the final challenge**, a to-do app.

:::


## Exit ticket

:::keep-together

**What is the difference between wins="p.wins" and :wins="p.wins"?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Without the colon the card is given the words p.wins; with the colon it is given the value of p.wins.

:::

