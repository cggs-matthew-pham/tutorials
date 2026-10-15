---
marp: true
theme: default
html: true
---

# Navbar, cards and a grid

Pages with Bootstrap · Ready-made parts

<!-- Speaker note: Students rebuild the club page's navbar and cards with Bootstrap, predict how the grid places three cols, count the CSS the page no longer needs, find a made-up class name, add buttons and a sign-up form, and finish with a table and footer. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: Bootstrap 5.3: Grid system, https://getbootstrap.com/docs/5.3/layout/grid/ (checked 12 October 2026); Bootstrap 5.3: Navbar, https://getbootstrap.com/docs/5.3/components/navbar/ (checked 12 October 2026). -->

---

## Today

**We are learning to** rebuild the club page's menu, cards and form with Bootstrap: each part is a fixed shape of nested tags with class names, and the grid's row and col line the cards up.

- I can build a navbar, cards and a form by copying Bootstrap's shapes.
- I can line cards up with Bootstrap's row and col.
- I can look up a Bootstrap part I have not used before and fit it into my page.

<!-- Speaker note: Before class: Read the unit primer first. Each Bootstrap component is a **shape**: tags nested in a fixed order, each with its class (`navbar` > `container` > `navbar-brand` and `navbar-nav`; `row` > `col` > `card` > `card-body`). Students do not invent these; they copy the shape from the Reference card or getbootstrap.com and change the words. The **grid**: a `row` lines up its `col`s and shares the width equally (it is Flexbox inside, the same idea as their hand-built `.cards { display: flex; }`). The navbar uses `navbar-expand`, so it never folds into a menu button: folding needs Bootstrap's JavaScript, which this course leaves out. The planted bug is a made-up class name (`column`): the browser ignores names it has no rule for, silently. This is the most common Bootstrap slip. -->

---

## Why it matters

> A navbar, a row of cards and a sign-up form: most websites you visit are built from these same few parts.

<!-- Speaker note: In the club page you built the menu, the cards and the form from tags and your own CSS. Bootstrap has each of them ready-made. A Bootstrap part is a **shape**: tags nested in a fixed way, each with its class name. Copy the shape, then change the words. The cards sit in Bootstrap's **grid**: a `row` holds `col`s, and the cols share the row's width. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<link rel="stylesheet" href="bootstrap.min.css">

<div class="container mt-3">
  <div class="row">
    <div class="col">
      <div class="card"><div class="card-body">Beginners</div></div>
    </div>
    <div class="col">
      <div class="card"><div class="card-body">Players</div></div>
    </div>
    <div class="col">
      <div class="card"><div class="card-body">Champions</div></div>
    </div>
  </div>
</div>
```

**How will the three cards be placed?**

- Side by side, sharing the width equally
- On top of each other, in the same place
- One under another, each the full width
- Side by side, each only as wide as its word

<!-- Speaker note: What happens: Side by side, sharing the width equally. The row lines up what is inside it, and each col takes an equal share, so three cols take a third each. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to say what row and col might each do before running. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%0A%3Cnav+class%3D%22navbar+navbar-expand+bg-body-tertiary%22%3E%0A++%3Cdiv+class%3D%22container%22%3E%0A++++%3Ca+class%3D%22navbar-brand%22+href%3D%22%23%22%3EChess+club%3C%2Fa%3E%0A++++%3Cul+class%3D%22navbar-nav%22%3E%0A++++++%3Cli+class%3D%22nav-item%22%3E%3Ca+class%3D%22nav-link%22+href%3D%22%23groups%22%3EGroups%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli+class%3D%22nav-item%22%3E%3Ca+class%3D%22nav-link%22+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fnav%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22+id%3D%22groups%22%3E%0A++%3Cdiv+class%3D%22row%22%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Cimg+src%3D%22star.svg%22+alt%3D%22A+star%22+width%3D%2240%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EBeginners%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3ELearn+the+moves.%3C%2Fp%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Cimg+src%3D%22medal.svg%22+alt%3D%22A+medal%22+width%3D%2240%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EPlayers%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3EWeekly+games.%3C%2Fp%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+trophy%22+width%3D%2240%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EChampions%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3ESchool+tournaments.%3C%2Fp%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-components/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. Switch on **Boxes** to see the shapes nest. Then delete one whole `col` (from `<div class="col">` to its closing `</div>`) and watch the other two share the row. Students should be able to say: I can find the navbar, a row, a col and a card in the code. -->

<!-- Speaker note: Teacher: switch on Boxes and trace the nesting with a finger: row, col, card, card-body. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Side by side, sharing the width equally. The row lines up what is inside it, and each col takes an equal share, so three cols take a third each.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 44 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-components/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Bootstrap's parts are fixed shapes with fixed names, and they replace the CSS students wrote by hand. -->

<!-- Speaker note: Teacher: put a hand-built club page on the board for the count-the-CSS question. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Name the parts

**Match each class with its job in the shape.**

| | |
|---|---|
| `navbar` | A. one link in the menu |
| `navbar-brand` | B. holds cols in a line |
| `nav-link` | C. the club's name, on the left of the bar |
| `row` | D. the padding inside a card |
| `col` | E. one equal share of the row |
| `card-body` | F. the bar across the top |

* Answer: navbar → F. the bar across the top; navbar-brand → C. the club's name, on the left of the bar; nav-link → A. one link in the menu; row → B. holds cols in a line; col → E. one equal share of the row; card-body → D. the padding inside a card

<!-- Speaker note: The nesting matters: a col goes straight inside a row, a card-body straight inside a card. Copy the whole shape from the Reference card. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the CSS

**Your hand-built club page needed about 40 lines of CSS for its header, menu and cards. How many lines of CSS of its own does this page have?**

* Answer: 0

<!-- Speaker note: None. The CSS is in bootstrap.min.css. That is the trade: no rules to write, but class names to look up, and a page that looks like many other Bootstrap pages. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Beginners fills the whole width, and the other two cards sit on a line underneath. There is no error. Click the line that is wrong.**

```
 1  <link rel="stylesheet" href="bootstrap.min.css">
 2  
 3  <div class="container mt-3">
 4    <div class="row">
 5      <div class="column">
 6        <div class="card"><div class="card-body">Beginners</div></div>
 7      </div>
 8      <div class="col">
 9        <div class="card"><div class="card-body">Players</div></div>
10      </div>
11      <div class="col">
12        <div class="card"><div class="card-body">Champions</div></div>
13      </div>
14    </div>
15  </div>
```

* Answer: line 5

<!-- Speaker note: Bootstrap has no class called column, so the browser ignores it and that box takes the whole row. The name is col. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A button in each card:** Inside the card's body.
- **A sign-up form:** Labels and boxes with Bootstrap's form classes.

<!-- Speaker note: What this step is for: Adding a part is copying its shape into the right place. Hints, in order: A button in a card goes inside its card-body, after the text. / A link can look like a button: a class="btn btn-primary" with href="#join". Put one in each card-body. / Bootstrap styles a form when each part has its class: form-label, form-control, form-select. / Add a container with id="join" under the cards: a heading, a label and box for the name, a select for the group, and a button. Look up form-control on the Reference cards. For students who need more support: Give students the card shape on paper with blanks for the class names. For early finishers: Give the cards different widths with col-8 and col-4 (a row is 12 parts), or add a badge to a card title. Try an image across the top of a card with card-img-top. The hard part, on purpose: Students guess class names (column, blue, big-button) and expect them to work. Ask "is that name on the Reference card?" every time, rather than correcting it for them. When students get stuck: A card fills the whole width while the others share a line. Ask: Is its box's class exactly col? Fix: Use col, not column or cols; only Bootstrap's own names do anything. / Cards stack one under another. Ask: Are the cols inside one row? Fix: Put every col straight inside the same div with class row. / Text touches the card's border. Ask: Is there a card-body inside the card? Fix: Wrap the card's content in div class="card-body". -->

<!-- Speaker note: Teacher: for the form, the Reference card has the shape; students add the classes to tags they already know. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%0A%3Cnav+class%3D%22navbar+navbar-expand+bg-body-tertiary%22%3E%0A++%3Cdiv+class%3D%22container%22%3E%0A++++%3Ca+class%3D%22navbar-brand%22+href%3D%22%23%22%3EChess+club%3C%2Fa%3E%0A++++%3Cul+class%3D%22navbar-nav%22%3E%0A++++++%3Cli+class%3D%22nav-item%22%3E%3Ca+class%3D%22nav-link%22+href%3D%22%23groups%22%3EGroups%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli+class%3D%22nav-item%22%3E%3Ca+class%3D%22nav-link%22+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fnav%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22+id%3D%22groups%22%3E%0A++%3Cdiv+class%3D%22row%22%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Cimg+src%3D%22star.svg%22+alt%3D%22A+star%22+width%3D%2240%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EBeginners%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3ELearn+the+moves.%3C%2Fp%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Cimg+src%3D%22medal.svg%22+alt%3D%22A+medal%22+width%3D%2240%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EPlayers%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3EWeekly+games.%3C%2Fp%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22col%22%3E%0A++++++%3Cdiv+class%3D%22card%22%3E%0A++++++++%3Cdiv+class%3D%22card-body%22%3E%0A++++++++++%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+trophy%22+width%3D%2240%22%3E%0A++++++++++%3Ch5+class%3D%22card-title%22%3EChampions%3C%2Fh5%3E%0A++++++++++%3Cp+class%3D%22card-text%22%3ESchool+tournaments.%3C%2Fp%3E%0A++++++++%3C%2Fdiv%3E%0A++++++%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-components/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: results and a footer

Finish the club page: a **results table** styled by Bootstrap (look up its class on the Reference cards) and a **footer** with your club's contact details, using a spacing class and a background colour class.

<!-- Speaker note: What this step is for: Looking up a part students have not used before and fitting it into the page is the everyday Bootstrap skill. -->

<!-- Speaker note: Teacher: the table class is new. Ask "where would you look it up?" rather than giving it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: results and a footer

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22bootstrap.min.css%22%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22%3E%0A++%3Ch2%3EResults+this+term%3C%2Fh2%3E%0A++%3C%21--+A+table+of+players+and+wins%2C+styled+by+Bootstrap%3A%0A+++++++look+up+its+class+on+the+Reference+cards.+--%3E%0A%0A%3C%2Fdiv%3E%0A%0A%3C%21--+A+footer+with+your+club%27s+contact+details%3A%0A+++++a+container+with+some+padding+and+a+background+colour+class.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/bootstrap/bs-components/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Next: make Bootstrap look like **yours**, and compare it with the page you built by hand.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What goes inside a row, and what goes inside a col?**

* Cols go inside a row and share its width; the content, such as a card, goes inside a col.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: your own CSS on top of Bootstrap, and when writing CSS by hand is the better choice. Class idea: hold up the hand-built club page and this one and ask which was quicker, and which is more theirs. -->
