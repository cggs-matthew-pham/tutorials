---
marp: true
theme: default
html: true
---

# Boxes

Layout and components · Boxes

<!-- Speaker note: Students see every element as a box of content, padding, border and margin, and find out that width sets only the content, so padding and border make the box wider. About 45 minutes (Predict and Run 10 min · Investigate 12 min · Mix it up 4 min · Modify 8 min · Make 11 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** see every element as a box with padding, a border and a margin, and find out that width sets only the content.

- I can name the four parts of a box: content, padding, border and margin.
- I can work out how wide a box is from its width, padding and border.
- I can use padding and margin to space boxes inside and out.
- I can explain why a value without a unit does nothing.

<!-- Speaker note: Before class: Read the unit primer "CSS in 5 minutes" (the box paragraph), then make the Make task's card yourself and point at it with **Box model** on. The **Box model** view (a button in the HTML playground) works like the browser's developer tools: point at any box to see its margin (orange), border (gold), padding (green) and content (blue), with sizes. It never changes the page. The **Boxes** button is different: it adds space to show nesting, so use Box model in this lesson. The one idea: `width` sets the content only. The box on the page is the width plus the padding and border on both sides. Real sites often set `box-sizing: border-box` so that width includes padding and border; mention it once, after students are comfortable with the sums. Teacher: Mix it up: padding works on an inline span but width does not. Ask who remembers what block and inline meant. -->

---

## Why it matters

> Cards, buttons, menus and photos on every website are boxes, sized and spaced with the same few parts.

<!-- Speaker note: Every element on a page is a **box**, and CSS sets how much room each box has inside it and around it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<style>
  .card {
    width: 200px;
    padding: 20px;
    border: 5px solid navy;
  }
</style>
<div class="card">Owls: 12 points</div>
```

**How wide is the card on the page, from the outside of its border on the left to the outside on the right, in pixels?**

<!-- Speaker note: What happens: 250: 200 for the content, plus 20 padding on each side, plus 5 border on each side. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: almost everyone says 200. The card is 250 wide: padding and border are added to the width on both sides. Let students check with Box model. Most will say 200. Ask what the 20 and the 5 in the rule are for, then let them point at the card with Box model. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.card+%7B%0A++++width%3A+200px%3B%0A++++padding%3A+20px%3B%0A++++border%3A+5px+solid+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22card%22%3EOwls%3A+12+points%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/boxes/?full=step-2#step-2)

<!-- Speaker note: The **Box model** view is on: point at the card. Blue is the content, green the padding, gold the border, and the label shows the sizes. Compare the width with your prediction. Then change `padding` to `40px` and point at it again, and add `margin: 20px;` to see the orange margin. | Code | What it does | Why | |---|---|---| | `width: 200px;` | Sets how wide the content is | It sets only the words' area. Padding and border are added outside it, on both sides, so the card is wider than 200 | | `padding: 20px;` | Adds room inside the border, around the content | It is part of the box, so the background colour fills it. 20 on each side adds 40 | | `border: 5px solid navy;` | Draws a line around the padding | Thickness, style and colour in one line. 5 on each side adds 10 | | `margin: 20px;` | Adds space outside the border, between boxes | It is outside the box, so it is not part of the card's width and has no background | | `20px` with its `px` | Every size needs a unit | Without one, such as `padding: 20;`, the browser ignores the line and shows no error | Students should be able to say: I can say which part of the box is the padding, which is the border, and why the card is wider than its width. -->

<!-- Speaker note: Teacher: change the padding and point again. Ask: which number in the label changed, and which part of the card grew? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 250: 200 for the content, plus 20 padding on each side, plus 5 border on each side.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<style>
  .card {
    width: 180px;
    padding: 15px;
    border: 4px solid teal;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

<!-- Speaker note: The picture shows the first card in the **Box model** view: orange margin, gold border, green padding, blue content. What this step is for: The width is only the content: padding and border add to it on both sides, and margin is outside it. -->

<!-- Speaker note: Teacher: the number task is the sum on paper (180 + 30 + 8). The wrong answers are the real slips: content only, one side only, margin included. The last task is `padding: 20` with no unit; the browser ignores it without an error. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Add up the width

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  .card {
    width: 180px;
    padding: 15px;
    border: 4px solid teal;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

</div>
<div>

**In the picture, how wide is the first card on the page, outside border to outside border, in pixels?**

* Answer: 218

</div>
</div>

<!-- Speaker note: 180 for the content, plus 15 + 15 of padding, plus 4 + 4 of border: 218. The 16px margin is outside the card. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Room for the words

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  .card {
    width: 180px;
    padding: 15px;
    border: 4px solid teal;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

</div>
<div>

**The words touch the border of a card. Which property gives them room inside the border?**

- background-color
- padding
- width
- margin

* Answer: padding

</div>
</div>

<!-- Speaker note: Padding is the room between the words and the border. Margin is the space outside the border, between cards. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The padding that does nothing

**The border shows, but the words are squashed against it: the padding does nothing, and there is no error. Click the line that causes it.**

```
 1  <style>
 2    .card {
 3      padding: 20;
 4      border: 5px solid navy;
 5    }
 6  </style>
 7  <div class="card">Owls: 12 points</div>
```

* Answer: line 3

<!-- Speaker note: Line 3 has no unit. padding: 20 means nothing to the browser, so it ignores the whole line. It needs padding: 20px;. -->

<style scoped>pre, marp-pre { font-size: 0.66em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Room inside:** Give the cards `12px` of padding.
- **Space between:** Space the cards apart with `16px` of margin.
- **A set width:** Make each card's content `200px` wide. How wide is each card now? Point at it to check.

<!-- Speaker note: What this step is for: Building a card one property at a time, checking each change with the Box model view. Hints, in order: Add padding: 12px; inside the .card rule. / Margin is outside the border: margin: 16px; / width: 200px; Remember that padding and border are added to it. For students who need more support: Give students the Modify starter with Box model on and ask them only to add padding, then margin, pointing at the card after each. For early finishers: Use different padding on each side (padding: 10px 30px;) and predict the width before pointing at it. Then add border-radius: 12px; for rounded corners. The hard part, on purpose: Working out that padding and border add to the width. Ask for the sum on paper first (200 + 20 + 20 + 5 + 5), then check it with Box model. When students get stuck: Padding or margin does nothing, and there is no error. Ask: Does the value have a unit, such as px? Fix: Write padding: 20px; not padding: 20; / The card is wider than the width they set. Ask: What else is added to the width? Fix: Padding and border are added on both sides; take them into account, or reduce the width. / The cards touch each other. Ask: Which property makes space outside a box? Fix: Add margin to the card's rule (padding is inside the border). -->

<!-- Speaker note: Teacher: build the card one property at a time, checking each with Box model, and work out the width before pointing. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.card+%7B%0A++++border%3A+2px+solid+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22card%22%3EOwls%3A+12+points%3C%2Fdiv%3E%0A%3Cdiv+class%3D%22card%22%3EHawks%3A+9+points%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/boxes/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```html
<style>
  .tag {
    width: 120px;
    padding: 8px;
    border: 2px solid teal;
  }
</style>
<p>Today: <span class="tag">Owls</span> <span class="tag">Hawks</span></p>
```

<!-- Speaker note: Both tags are `span` elements in one line of text. What this step is for: A span is inline, so its width is ignored until display: block makes it a block box. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  .tag {
    width: 120px;
    padding: 8px;
    border: 2px solid teal;
  }
</style>
<p>Today: <span class="tag">Owls</span> <span class="tag">Hawks</span></p>
```

</div>
<div>

**Both tags should be boxes 120px wide, but each is only as wide as its word. The padding works, the width does not. What fixes the width?**

- Add display: block; to the .tag rule, because an inline box ignores its width
- Add more padding, because padding sets the width of an inline box
- Add a margin, because inline boxes need space around them
- Change span to p in the CSS, because width belongs to paragraphs

* Answer: Add display: block; to the .tag rule, because an inline box ignores its width

</div>
</div>

<!-- Speaker note: A span is an inline box: it sits in the line of text and ignores width. display: block makes it a block box, so the 120px applies (and each tag then starts a new line). What this step is for: A span is inline, so its width is ignored until display: block makes it a block box. -->

<style scoped>section { font-size: 17px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a card for a house or a club: a `<div>` with a heading, a picture and a line of text, styled with padding, a border, margin and a width. Point at it with Box model and work out its width before you check.

<!-- Speaker note: Hints, in order: A card is one box that holds the heading, the picture and the line of text. Build the box first, then style it. / Start with a `<div class="card">` holding an `<h2>`, an `<img>` and a `<p>`. / Then a `<style>` block with a .card rule: padding, border, margin and width. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Make+a+card+for+a+house+or+a+club.+Pictures+you+can+use%3A+trophy.svg%2C+medal.svg%2C+book.svg%2C+ball.svg+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/boxes/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Measure a neighbour's card <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap cards with a partner. Without running them, add up the width of the card on paper, then point at it with Box model to check.

<!-- Speaker note: Listen for students who add only one side of the padding or border. Ask how many sides a box has left and right. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A box has width: 300px; padding: 10px; border: 2px solid; How wide is it on the page, and why?**

* 324 pixels: 300 for the content, plus 10 padding on each side (20) and 2 border on each side (4).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson is a review of the unit on a whole newsletter page: reading a longer stylesheet and turning the articles into cards. Class idea: measure a real website's buttons with the browser's developer tools (right-click, Inspect). -->
