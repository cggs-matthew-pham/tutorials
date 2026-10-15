---
marp: true
theme: default
html: true
---

# Challenge: lay out the club page

Layout and components · Final challenge: lay out the club page

<!-- Speaker note: Students lay out the Course A club page in three milestones with fading support (header and menu, then a hero and a wrapping row of cards, then the table, a sign-up card and the footer), then make it their own. About 90 minutes (Plan 10 min · Milestone 1 15 min · Milestone 2 25 min · Milestone 3 25 min · Make it yours 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** lay out the Course A club page in three milestones, from a header with the menu on the right to a hero, a row of cards, a table, a sign-up card and a footer, then make it your own.

- I can plan a layout as a list of parts.
- I can put a name and a menu on one line with Flexbox, and style the menu links with nav a.
- I can build a hero and a row of cards that wraps, sharing one class.
- I can lay out a table, a form card and a footer.

<!-- Speaker note: Before class: Read the challenge primer "Running the final challenge", then build milestone 1 yourself and plan milestones 2 and 3 on paper. There is **nothing new** in this lesson. The starter is the finished Course A club page, so students who skipped Course A can still start here. Every milestone recalls earlier lessons: rules that combine and `nav a`, block and inline, the box, Flexbox rows, `gap`, `justify-content`, wrapping and components. Support fades on purpose: milestone 1 gives the exact code, milestone 2 an outline in comments, milestone 3 only the goals. There is no separate review step, because the whole lesson is review. Finishing this lesson marks **Challenge complete** on the course page. Teacher: Plan the layout: match each part to its rule. Write the parts on the board as a checklist. Teacher: Milestone 1: everyone should finish this in the first lesson. Ask where display: flex goes, and why there are two flex boxes. Teacher: Milestone 2: the outline is in the comments. Students who are stuck can use **Reset to this task's start** to load a working milestone 1. Teacher: Milestone 3: goals only. Ask students to name which earlier rule each goal reuses before typing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Take a page that only runs down the screen and give it a layout: a menu on the right, cards in a row, a sign-up card.

<!-- Speaker note: In Course A you built a club page that runs down the screen in order. Now lay it out. Everything you need, you have met before. Check the page after every change. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Plan the layout

_The program is 132 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/css/club-style/?full=step-1#step-1)

<!-- Speaker note: The picture shows the page you will build. What this step is for: Seeing the laid-out page as named parts turns a big task into a list of small ones students have already done. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Name the parts

**Match each part of the laid-out page with the rule that makes it.**

| | |
|---|---|
| `The club name on the left, the menu on the right` | A. one class on all three, and one .card rule |
| `The menu links in a row, without underlines` | B. nav ul { display: flex; } and nav a { } |
| `Three cards that share one look` | C. flex-wrap: wrap, with flex: 1 and a min-width on the card |
| `Cards that drop to a new line on a phone` | D. display: block on label |
| `Room inside each card, and a line around it` | E. display: flex and justify-content: space-between on the header |
| `Each form label on its own line` | F. padding and border |

* Answer: The club name on the left, the menu on the right → E. display: flex and justify-content: space-between on the header; The menu links in a row, without underlines → B. nav ul { display: flex; } and nav a { }; Three cards that share one look → A. one class on all three, and one .card rule; Cards that drop to a new line on a phone → C. flex-wrap: wrap, with flex: 1 and a min-width on the card; Room inside each card, and a line around it → F. padding and border; Each form label on its own line → D. display: block on label

<!-- Speaker note: Each part is a lesson you have done. Build them in order: header and menu, then the hero and cards, then the table, form and footer. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the cost

**You add a fourth card to the row. How much new CSS do you write?**

- None: copy a card, and the .card rule styles it too
- A new row with display: flex
- A new width for all four cards
- A new .card4 rule

* Answer: None: copy a card, and the .card rule styles it too

<!-- Speaker note: A class is shared by every copy. Adding a card is copying HTML, not writing CSS. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Name the parts <span style="font-size:.6em;color:#64748b">(4 min)</span>

With your partner, point to each part of the laid-out page and name the rule behind it.

<!-- Speaker note: Listen for the box that holds the items. Write the checklist on the board for the build. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build the layout



- **Milestone 1: header and menu:** The name and the menu sit one above the other. Put them on one line. Replace the `header` rule with this one, and add the two rules below it: The header holds t
- **Milestone 2: a hero and cards:** Follow the comments. Build: - a hero: a `<section class="hero">` with an `<h2>`, a paragraph and a link to `#join`, styled by a `.hero` rule; - a `<section clas
- **Milestone 3: table, form and footer:** Goals only this time: - the results table has padding and a border on its cells; - the sign-up form is a card, with each label on its own line; - the footer has
- **Test the layout:** Raise the cards' `min-width` (try `300px`). The cards should drop onto new lines and none should squash. Then click every menu link and every label.

<!-- Speaker note: What this step is for: Three milestones with fading support: the full code, then an outline, then only the goals. Hints, in order: Replace the `header` rule with the one in the lesson, then add the `nav ul` and `nav a` rules below it. / `display: flex` goes on the box that holds the items: the header holds the name and the menu, and the `ul` holds the links. / `justify-content: space-between` pushes the name left and the menu right. / Follow the outline in the comments: each comment becomes one piece of HTML or one rule. / The cards row is a `<section class="cards">` that holds three `<div class="card">`. Put `display: flex`, `flex-wrap: wrap` and `gap` on `.cards`. / Put `flex: 1` and `min-width: 200px` on `.card`, with `padding` and a `border`. Adding a fourth card needs no new CSS. / The goals list three parts: the table, the sign-up form and the footer. Do one at a time and check the page after each. / The form is a card: reuse the class you already have, `<form class="card">`. No new rule is needed for that. / Labels are inline, so they sit beside their box. `display: block` on `label` gives each its own line. For students who need more support: Let students use Reset to this task's start at each milestone, so everyone reaches milestone 3. Pair students for milestone 3: one does the table, one the form. For early finishers: Add a fourth card, then a second row of cards. Try justify-content: center on the cards and see what changes. Try the optional lessons on Grid and on making the page react. The hard part, on purpose: Planning a whole layout from parts they already know, and putting display flex on the right box. Have them name the box that holds the items first. When students get stuck: Nothing moved in the header. Ask: Which box holds the name and the menu, and does it have display flex? Fix: Put display flex on the header, the box that holds them, not on the h1 or the nav. / The menu links are still stacked in a column. Ask: Which box holds the links? Fix: Put display flex on nav ul, the list that holds the li items. / The cards stay in one row and squash when they have no min-width. Ask: Does the row have flex-wrap wrap, and does the card have a min-width? Fix: Add flex-wrap wrap to .cards, and flex 1 with min-width 200px to .card. / The labels still sit beside their boxes. Ask: Are labels block or inline? Fix: Labels are inline. Add label { display: block; }. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Build the layout

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++header+%7B%0A++++background-color%3A+lightblue%3B%0A++%7D%0A++h1+%7B%0A++++color%3A+navy%3B%0A++%7D%0A++a+%7B%0A++++color%3A+darkblue%3B%0A++%7D%0A++h2+%7B%0A++++color%3A+darkblue%3B%0A++%7D%0A++.winner+%7B%0A++++background-color%3A+gold%3B%0A++%7D%0A++footer+%7B%0A++++background-color%3A+lightblue%3B%0A++++text-align%3A+center%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23about%22%3EAbout%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23results%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection+id%3D%22about%22%3E%0A++++%3Ch2%3EAbout+the+club%3C%2Fh2%3E%0A++++%3Cp%3EWe+play+chess+every+Wednesday+at+lunch+in+the+library.+All+levels+welcome.%3C%2Fp%3E%0A++++%3Cp%3EBring%3A%3C%2Fp%3E%0A++++%3Cul%3E%0A++++++%3Cli%3Ea+friend%3C%2Fli%3E%0A++++++%3Cli%3Ea+snack%3C%2Fli%3E%0A++++++%3Cli%3Eyour+best+opening%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++++%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+gold+trophy%22+width%3D%22100%22%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22results%22%3E%0A++++%3Ch2%3EResults+this+term%3C%2Fh2%3E%0A++++%3Ctable%3E%0A++++++%3Ctr%3E%3Cth%3EPlayer%3C%2Fth%3E%3Cth%3EWins%3C%2Fth%3E%3C%2Ftr%3E%0A++++++%3Ctr+class%3D%22winner%22%3E%3Ctd%3EAda%3C%2Ftd%3E%3Ctd%3E5%3C%2Ftd%3E%3C%2Ftr%3E%0A++++++%3Ctr+class%3D%22winner%22%3E%3Ctd%3ESam%3C%2Ftd%3E%3Ctd%3E5%3C%2Ftd%3E%3C%2Ftr%3E%0A++++++%3Ctr%3E%3Ctd%3EPriya%3C%2Ftd%3E%3Ctd%3E3%3C%2Ftd%3E%3C%2Ftr%3E%0A++++%3C%2Ftable%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22join%22%3E%0A++++%3Ch2%3EJoin+the+club%3C%2Fh2%3E%0A++++%3Cform%3E%0A++++++%3Cp%3E%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++++++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%3C%2Fp%3E%0A++++++%3Cp%3E%3Clabel+for%3D%22group%22%3EGroup%3C%2Flabel%3E%0A++++++%3Cselect+id%3D%22group%22%3E%0A++++++++%3Coption%3EBeginners%3C%2Foption%3E%0A++++++++%3Coption%3EPlayers%3C%2Foption%3E%0A++++++++%3Coption%3EChampions%3C%2Foption%3E%0A++++++%3C%2Fselect%3E%3C%2Fp%3E%0A++++++%3Cbutton%3EJoin%3C%2Fbutton%3E%0A++++%3C%2Fform%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A%3Cfooter%3E%0A++%3Cp%3EContact%3A+chess%40example.com%3C%2Fp%3E%0A%3C%2Ffooter%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/club-style/?full=step-2#step-2)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make it yours

Turn the page into one for a club or event you care about: a new name, your own words, your own colours. Add a fourth card by copying one. Try `justify-content: center` on the cards, or a different `gap`. Then check the narrow view again.

<!-- Speaker note: Hints, in order: Change one thing at a time: the club name, then the words, then the colours. / Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`. -->

<!-- Speaker note: Teacher: any club or event. Ask for a fourth card made by copying, with no new CSS. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make it yours

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++header+%7B%0A++++background-color%3A+lightblue%3B%0A++++padding%3A+8px+16px%3B%0A++++display%3A+flex%3B%0A++++justify-content%3A+space-between%3B%0A++++align-items%3A+center%3B%0A++%7D%0A++nav+ul+%7B%0A++++display%3A+flex%3B%0A++++gap%3A+16px%3B%0A++++margin%3A+0%3B%0A++++padding%3A+0%3B%0A++%7D%0A++nav+a+%7B%0A++++text-decoration%3A+none%3B%0A++%7D%0A++h1+%7B%0A++++color%3A+navy%3B%0A++%7D%0A++a+%7B%0A++++color%3A+darkblue%3B%0A++%7D%0A++h2+%7B%0A++++color%3A+darkblue%3B%0A++%7D%0A++.winner+%7B%0A++++background-color%3A+gold%3B%0A++%7D%0A++footer+%7B%0A++++background-color%3A+lightblue%3B%0A++++text-align%3A+center%3B%0A++++padding%3A+16px%3B%0A++%7D%0A++.hero+%7B%0A++++background-color%3A+lightyellow%3B%0A++++text-align%3A+center%3B%0A++++padding%3A+32px%3B%0A++++margin%3A+16px+0%3B%0A++%7D%0A++.cards+%7B%0A++++display%3A+flex%3B%0A++++flex-wrap%3A+wrap%3B%0A++++gap%3A+16px%3B%0A++%7D%0A++.card+%7B%0A++++flex%3A+1%3B%0A++++min-width%3A+200px%3B%0A++++padding%3A+16px%3B%0A++++border%3A+2px+solid+navy%3B%0A++%7D%0A++table+%7B%0A++++width%3A+100%25%3B%0A++%7D%0A++td%2C+th+%7B%0A++++padding%3A+8px%3B%0A++++border%3A+1px+solid+gray%3B%0A++++text-align%3A+left%3B%0A++%7D%0A++label+%7B%0A++++display%3A+block%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23about%22%3EAbout%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23results%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection+class%3D%22hero%22%3E%0A++++%3Ch2%3EWelcome+to+Chess+club%3C%2Fh2%3E%0A++++%3Cp%3ELearn+the+moves%2C+play+a+friend+and+win+a+trophy.%3C%2Fp%3E%0A++++%3Cp%3E%3Ca+href%3D%22%23join%22%3EJoin+us+today%3C%2Fa%3E%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection+class%3D%22cards%22%3E%0A++++%3Cdiv+class%3D%22card%22%3E%0A++++++%3Ch3%3EWhen%3C%2Fh3%3E%0A++++++%3Cp%3EEvery+Wednesday+at+lunch.%3C%2Fp%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3E%0A++++++%3Ch3%3EWhere%3C%2Fh3%3E%0A++++++%3Cp%3EIn+the+library.%3C%2Fp%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3E%0A++++++%3Ch3%3EWho%3C%2Fh3%3E%0A++++++%3Cp%3EEveryone%2C+at+any+level.%3C%2Fp%3E%0A++++%3C%2Fdiv%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22about%22%3E%0A++++%3Ch2%3EAbout+the+club%3C%2Fh2%3E%0A++++%3Cp%3EWe+play+chess+every+Wednesday+at+lunch+in+the+library.+All+levels+welcome.%3C%2Fp%3E%0A++++%3Cp%3EBring%3A%3C%2Fp%3E%0A++++%3Cul%3E%0A++++++%3Cli%3Ea+friend%3C%2Fli%3E%0A++++++%3Cli%3Ea+snack%3C%2Fli%3E%0A++++++%3Cli%3Eyour+best+opening%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++++%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+gold+trophy%22+width%3D%22100%22%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22results%22%3E%0A++++%3Ch2%3EResults+this+term%3C%2Fh2%3E%0A++++%3Ctable%3E%0A++++++%3Ctr%3E%3Cth%3EPlayer%3C%2Fth%3E%3Cth%3EWins%3C%2Fth%3E%3C%2Ftr%3E%0A++++++%3Ctr+class%3D%22winner%22%3E%3Ctd%3EAda%3C%2Ftd%3E%3Ctd%3E5%3C%2Ftd%3E%3C%2Ftr%3E%0A++++++%3Ctr+class%3D%22winner%22%3E%3Ctd%3ESam%3C%2Ftd%3E%3Ctd%3E5%3C%2Ftd%3E%3C%2Ftr%3E%0A++++++%3Ctr%3E%3Ctd%3EPriya%3C%2Ftd%3E%3Ctd%3E3%3C%2Ftd%3E%3C%2Ftr%3E%0A++++%3C%2Ftable%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22join%22%3E%0A++++%3Ch2%3EJoin+the+club%3C%2Fh2%3E%0A++++%3Cform+class%3D%22card%22%3E%0A++++++%3Cp%3E%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++++++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%3C%2Fp%3E%0A++++++%3Cp%3E%3Clabel+for%3D%22group%22%3EGroup%3C%2Flabel%3E%0A++++++%3Cselect+id%3D%22group%22%3E%0A++++++++%3Coption%3EBeginners%3C%2Foption%3E%0A++++++++%3Coption%3EPlayers%3C%2Foption%3E%0A++++++++%3Coption%3EChampions%3C%2Foption%3E%0A++++++%3C%2Fselect%3E%3C%2Fp%3E%0A++++++%3Cbutton%3EJoin%3C%2Fbutton%3E%0A++++%3C%2Fform%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A%3Cfooter%3E%0A++%3Cp%3EContact%3A+chess%40example.com%3C%2Fp%3E%0A%3C%2Ffooter%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/club-style/?full=step-3#step-3)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Squeeze a neighbour's page <span style="font-size:.6em;color:#64748b">(5 min)</span>

Swap pages with a partner. Raise the cards' min-width on their page and say which parts fit and which do not.

<!-- Speaker note: For anything that squashes, ask the owner whether the row wraps and whether the card has a min-width. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name three parts of your layout and the rule behind each.**

* For example: the name left and the menu right is display flex with justify-content space-between on the header; the cards share one .card rule; the cards wrap because the row has flex-wrap wrap.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The finished page is a portfolio piece: students can name each part and the lesson it came from. Optional lessons follow: Grid for whole-page layouts, and Make it react for a first look at JavaScript. -->
