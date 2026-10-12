---
marp: true
theme: default
html: true
---

# Boxes

HTML & CSS · Style

<!-- Speaker note: Students see every element as a box of content, padding, border and margin, measure boxes with the Box model view, and size and space cards with CSS. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Newsletter 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** see every element as a box of content, padding, border and margin, and size and space boxes with CSS.

- I can name the four parts of a box: content, padding, border and margin.
- I can work out how wide a box is from its width, padding and border.
- I can use padding and margin to space boxes inside and out.
- I can explain why a value without a unit does nothing.

<!-- Speaker note: Before class: Read the unit primer "CSS in 5 minutes" (the box paragraph), then make the Make task's card yourself and point at it with **Box model** on. The **Box model** view (a button in the HTML playground) works like the browser's developer tools: point at any box to see its margin (orange), border (gold), padding (green) and content (blue), with sizes. It never changes the page. The **Boxes** button is different: it adds space to show nesting, so use Box model in this lesson. Teacher: The padding that does nothing: `padding: 20` with no unit. The browser ignores it without an error. Units matter: `20px`. Teacher: Newsletter: wrapping each article in `<div class="article">` and styling it once is how real sites build cards. -->

---

## Why it matters

> Cards, buttons, menus and photos on every website are boxes, sized and spaced with the same four parts.

<!-- Speaker note: Every element on a page is a **box**. CSS sets how big each box is and how much space it has inside and around it. -->

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

<!-- Speaker note: Teacher: almost everyone says 200. The card is 250 wide: padding and border are added to the width on both sides. Let students check with Box model. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++.card+%7B%0A++++width%3A+200px%3B%0A++++padding%3A+20px%3B%0A++++border%3A+5px+solid+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22card%22%3EOwls%3A+12+points%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/boxes/?full=step-2#step-2)

<!-- Speaker note: The **Box model** view is on: point at the card. Blue is the content, green the padding, gold the border, and the label shows the sizes. Compare the width with your prediction, then change `padding` to `40px` and point at it again. Students should be able to say: I can say which part of the box is the padding and which is the border. -->

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
    width: 200px;
    padding: 20px;
    border: 5px solid navy;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

<!-- Speaker note: The picture shows the first card in the **Box model** view: orange margin, gold border, green padding, blue content. What this step is for: Padding is inside the border and takes the background; margin is outside and pushes boxes apart. Block boxes stack, inline ones sit in a line. -->

<!-- Speaker note: Teacher: the trace adds it up (200 + 40 + 10). Then block and inline: paragraphs stack, while `<strong>` and `<a>` sit in a line of text. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  .card {
    width: 200px;
    padding: 20px;
    border: 5px solid navy;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

</div>
<div>

**Match each property with what it changes.**

| | |
|---|---|
| `padding` | A. space outside the border, between boxes |
| `border` | B. the line around the padding |
| `margin` | C. the colour behind the content and the padding |
| `width` | D. how wide the content is |
| `background-color` | E. space inside the border, around the content |

* Answer: padding → E. space inside the border, around the content; border → B. the line around the padding; margin → A. space outside the border, between boxes; width → D. how wide the content is; background-color → C. the colour behind the content and the padding

</div>
</div>

<!-- Speaker note: From the inside out: content, padding, border, margin. The background colour fills the content and the padding, but not the margin. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Add up the width

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<style>
  .card {
    width: 200px;
    padding: 20px;
    border: 5px solid navy;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

</div>
<div>

**Fill in how much each part adds to the first card's width (both sides together).**

| part | pixels |
|---|---|
| content (width) | 200 |
| padding | ? |
| border | ? |
| whole card | ? |

* Answer: 40, 10, 250

</div>
</div>

<!-- Speaker note: Padding and border are added on the left and on the right: 200 + 40 + 10 = 250. The margin is outside the card, so it is not part of its width. -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Block and inline

Some boxes stack; some sit in a line.

```html
<p>One paragraph.</p>
<p>Another paragraph.</p>
<strong>Bold</strong> <strong>bold</strong> and <a href="https://example.com">a link</a>
```

**Why do the paragraphs stack, while the bold words and the link sit side by side?**

- Bold words are smaller than paragraphs
- The paragraphs have a margin
- Paragraphs are block boxes: each takes a whole line. strong and a are inline: they sit in a line of text.
- Links always sit next to bold words

* Answer: Paragraphs are block boxes: each takes a whole line. strong and a are inline: they sit in a line of text.

<!-- Speaker note: Block elements (p, h1, div, ul, table) start on a new line and take the full width. Inline elements (strong, em, a, img) sit inside a line of text. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

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

<!-- Speaker note: Line 3 has no unit. padding: 20 means nothing to the browser, so it ignores the whole declaration. It needs padding: 20px;. -->

<style scoped>pre, marp-pre { font-size: 0.66em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Boxes inside boxes

A card is a box that holds other boxes: a heading, a picture and a paragraph.

```html
<div class="card">
  <h2>Owls</h2>
  <img src="trophy.svg" alt="A gold trophy" width="60">
  <p>12 points</p>
</div>
```

**What keeps the two cards apart?**

- The pictures
- Their border
- Their margin
- Their padding

* Answer: Their margin

<!-- Speaker note: Margin is the space outside each card's border (orange in the Box model view). Inside, a card can hold any boxes: a heading, a picture, a paragraph. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Room inside:** Give the cards `12px` of padding.
- **Space between:** Space the cards apart with `16px` of margin.
- **A set width:** Make each card's content `200px` wide. How wide is each card now? Point at it to check.
- **A background:** Give the cards a background colour, and notice where it stops.

<!-- Speaker note: What this step is for: Building a card one property at a time, checking each change with the Box model view. Hints, in order: Add padding: 12px; inside the .card rule. / Margin is outside the border: margin: 16px; / width: 200px; Remember that padding and border are added to it. / background-color: lightyellow; Notice it fills the padding too. For students who need more support: Give students the Modify starter with Box model on and ask them only to add padding, then margin, pointing at the card after each. For early finishers: Use different padding on each side (padding: 10px 30px;) and predict the width before pointing at it. Then add border-radius: 12px; for rounded corners. The hard part, on purpose: Working out that padding and border add to the width. Ask for the sum on paper first (200 + 20 + 20 + 5 + 5), then check it with Box model. When students get stuck: Padding or margin does nothing, and there is no error. Ask: Does the value have a unit, such as px? Fix: Write padding: 20px; not padding: 20; / The card is wider than the width they set. Ask: What else is added to the width? Fix: Padding and border are added on both sides; take them into account, or reduce the width. / The cards touch each other. Ask: Which property makes space outside a box? Fix: Add margin to the card's rule (padding is inside the border). -->

<!-- Speaker note: Teacher: build the card one property at a time, checking each with Box model. Background colour fills the padding, not the margin. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++.card+%7B%0A++++border%3A+2px+solid+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22card%22%3EOwls%3A+12+points%3C%2Fdiv%3E%0A%3Cdiv+class%3D%22card%22%3EHawks%3A+9+points%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/boxes/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a card for a house or a club: a `<div>` with a heading, a picture and a line of text, styled with padding, a border, margin, a width and a background colour.

<!-- Speaker note: Hints, in order: A card is one box that holds the heading, the picture and the line of text. Build the box first, then style it. / Start with a `<div class="card">` holding an `<h2>`, an `<img>` and a `<p>`. / Then a `<style>` block with a .card rule: padding, border, margin, width and a background colour. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+Make+a+card+for+a+house+or+a+club.+Pictures+you+can+use%3A+trophy.svg%2C+medal.svg%2C+book.svg%2C+ball.svg+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/boxes/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Turn the newsletter into cards

Wrap each article (its `<h2>` and `<p>`) in `<div class="article">`, then style `.article` with padding, a border, margin and a background colour, so each article looks like a card. (The `body` rule already sets a font for the whole page.)

<!-- Speaker note: What this step is for: Real pages group content into boxes: a div with a class around each article, styled once. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Turn the newsletter into cards

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++body+%7B%0A++++font-family%3A+sans-serif%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A%3Ch2%3ENew+books%3C%2Fh2%3E%0A%3Cp%3EThe+library+has+200+new+books+this+term.%3C%2Fp%3E%0A%3Ch2%3EBook+fair%3C%2Fh2%3E%0A%3Cp%3EThe+book+fair+starts+on+Monday+in+the+library.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/boxes/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A box has width: 300px; padding: 10px; border: 2px solid; How wide is it on the page, and why?**

* 324 pixels: 300 for the content, plus 10 padding on each side (20) and 2 border on each side (4).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit, Components and layout, lines boxes up with Flexbox (a menu, a gallery) and builds cards, heroes and forms from boxes. Real sites usually set box-sizing: border-box so that width includes padding and border; it is worth mentioning once students are comfortable with the sums. Class idea: measure a real website's buttons with the browser's developer tools (right-click, Inspect). -->
