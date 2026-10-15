---
marp: true
theme: default
html: true
---

# Components and props

Apps with Vue · Building apps

<!-- Speaker note: Students predict what a made-up tag shows, make cards from a list with a component and props, find a prop passed without its colon, add a medal to every card and a player to the data, and make pet cards. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 20 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Vue.js: Components basics, https://vuejs.org/guide/essentials/component-basics.html (checked 12 October 2026); Vue.js: Props, https://vuejs.org/guide/components/props.html (checked 12 October 2026). -->

---

## Today

**We are learning to** make a tag of your own once with app.component, use it many times, and pass each copy its own data with props and :name="value".

- I can make a tag of my own with app.component.
- I can pass each copy its own data with props and :name="value".
- I can show one component for each item in a list.

<!-- Speaker note: Before class: Read the unit primer first. `app.component("player-card", { props: [...], template: `...` })` registers a new tag; every `<player-card>` on the page becomes a copy of the template. **Props** are its inputs: the tag that uses it hands them in. `:wins="p.wins"` (with a colon, short for `v-bind:`) passes the value of `p.wins`; `wins="p.wins"` passes the words, which is the planted bug. Two rules come from writing the page straight into HTML, without a build step: component names need a dash, and their tags need a separate closing tag (`<player-card></player-card>`, not `<player-card />`). The template is a JavaScript string between back-ticks, so it can span lines. Props flow one way: a card should not change its own props (Vue warns if it tries). Changing data happens in the parent; sending messages up from a component (`emit`) is left out of this course. -->

---

## Why it matters

> A feed of posts, a shop of products and a ladder of players are each one card used many times, with different data.

<!-- Speaker note: A **component** is a tag of your own. You write it once, then use it as often as you like: ```js app.component("player-card", { props: ["name", "wins"], template: `<div><h2>{{ name }}</h2><p>Wins: {{ wins }}</p></div>` }); ``` `props` lists the data each copy is given; the `template` (between back-ticks) is its HTML. Using it looks like any tag: ```html <player-card v-for="p in players" :name="p.name" :wins="p.wins"></player-card> ``` The **colon** in `:name="p.name"` means "the value of": without it, the component is given the words `p.name`. Component names have a dash, and their tags need a closing tag. The app is now made in three steps: `createApp(...)`, then `app.component(...)`, then `app.mount("#app")`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**player-card is not an HTML tag. What does the page show?**

- Nothing: the browser does not know player-card
- Three boxes: Player: Ada, Player: Sam, Player: Lin
- One box with all three names
- Three boxes that all say Player: Ada

<!-- Speaker note: What happens: Three boxes, each with its own name. Vue turns each player-card tag into the component's template, with that tag's name prop. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the browser normally does with a tag it does not know (it ignores it). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Three boxes, each with its own name. Vue turns each player-card tag into the component's template, with that tag's name prop.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/vue/vue-components/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/vue/vue-components/?full=step-2#step-2)

<!-- Speaker note: Press **Run**. Change Sam's wins to 9 in the list and run again. Students should be able to say: I changed one player's wins in the data and saw only their card change. -->

<!-- Speaker note: Teacher: change one player's data and ask why only one card changed. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 29 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-components/?full=step-3#step-3)

<!-- Speaker note: What this step is for: app.component makes the tag; props are its inputs; :prop="value" passes a value in, and v-for makes one copy per item. -->

<!-- Speaker note: Teacher: draw the data flowing from the list, through v-for, into each card's props. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does what?

**Match each part with what it does.**

| | |
|---|---|
| `app.component("player-card", { … })` | A. the HTML each copy shows |
| `props: ["name", "wins"]` | B. the data each copy is given |
| `template: `…`` | C. one player-card for each player |
| `:wins="p.wins"` | D. gives this copy the value of p.wins |
| `v-for="p in players"` | E. makes a new tag, player-card |

* Answer: app.component("player-card", { … }) → E. makes a new tag, player-card; props: ["name", "wins"] → B. the data each copy is given; template: `…` → A. the HTML each copy shows; :wins="p.wins" → D. gives this copy the value of p.wins; v-for="p in players" → C. one player-card for each player

<!-- Speaker note: The parent app holds the data and hands each card its part through props. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where does the data come from?

**Inside the component, where do name and wins come from?**

- From the browser
- From the tag that uses it, through props
- From setup in the component
- From the players list directly

* Answer: From the tag that uses it, through props

<!-- Speaker note: The card does not know about the list. Each copy is given its own name and wins by the tag that makes it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 2

<!-- Speaker note: wins="p.wins" passes the words p.wins. :wins="p.wins", with the colon, passes the value. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A medal:** Every card, one change.
- **A new player:** Data, not HTML.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-components/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Changing the template changes every copy; changing the data adds a copy. Hints, in order: The template is the HTML for every card. A v-if in it can use the wins prop. / `<p v-if="wins >= 5">🏅 Top player</p>` inside the template's div. / Each card comes from one item in the players list. / Add { name: "Kai", wins: 3 } to the list. For students who need more support: Give the pet-card component written out; students add the v-for tag only. For early finishers: Give player-card a computed of its own (setup(props) { … }) that shows a rating from the wins. Make the cards sit in a row with Flexbox. The hard part, on purpose: Students try to read the players list inside the component. Ask "what has this card been given?" and point to props. When students get stuck: Cards show words like p.name. Ask: Is there a colon before the prop? Fix: :name="p.name" passes the value. / Nothing shows, and the console warns about failing to resolve a component. Ask: Is app.component before app.mount, with the same name as the tag? Fix: Register it before mount; the tag and the name must match, dash included. / A prop is blank on every card. Ask: Is it in the props list? Fix: props: ["name", "kind"] -->

<!-- Speaker note: Teacher: ask whether the medal goes in the data or the template, and why. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: pet cards

Make a **pet-card** component with two props (`name` and `kind`) and a template of your own design, then show every pet with `v-for`.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/vue/vue-components/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a component of their own with two props, used with v-for. -->

<!-- Speaker note: Teacher: ask students to name their two props before writing the template. -->

---

## Where this leads

Next: **the final challenge**, a to-do app.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between wins="p.wins" and :wins="p.wins"?**

* Without the colon the card is given the words p.wins; with the colon it is given the value of p.wins.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the final challenge, a to-do app built in milestones, with an optional lesson that builds the same app in three frameworks. Class idea: open a shopping site and count the cards made from one component. -->
