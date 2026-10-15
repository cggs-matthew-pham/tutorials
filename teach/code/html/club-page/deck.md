---
marp: true
theme: default
html: true
---

# Challenge: a club page

Structure and style a page · Final challenge: a club page

<!-- Speaker note: Students build a coloured club page in three milestones with fading support (header and menu, sections with a list, picture and results table, then a sign-up form and footer), then make it their own. About 90 minutes (Plan 10 min · Milestone 1 15 min · Milestone 2 25 min · Milestone 3 25 min · Make it yours 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build a whole club page in three milestones, from a coloured header and menu to sections, a results table and a sign-up form, then make it your own.

- I can plan a page as a list of parts.
- I can build a header with a jump-link menu, sections, a results table and a sign-up form.
- I can colour the page with tag rules and pick the winners with a class.
- I can test that every link and label works.

<!-- Speaker note: Before class: Read the challenge primer "Running the final challenge", then build milestone 1 yourself and plan milestones 2 and 3 on paper. There is **nothing new** in this lesson, and no layout: Course B lays this same page out. Every milestone recalls earlier lessons: tags and nesting, tag rules and colours, lists, links, pictures and alt text, classes, tables, page sections, jump links, and forms. Support fades on purpose: milestone 1 gives the exact rules, milestone 2 an outline in comments, milestone 3 only the goals. Finishing this lesson marks **Challenge complete** on the course page. Teacher: Plan the page: match each part to how it is built. Write the parts on the board as a checklist. Teacher: Milestone 1: everyone should finish this in the first lesson. The menu links do nothing yet, because the sections do not exist. Teacher: Milestone 2: the outline is in the comments. Students who are stuck can use **Reset to this task's start** to load a working milestone 1. Now the menu links jump. Teacher: Milestone 3: goals only. Ask students to plan the form's fields before typing. Click every label and every menu link. -->

---

## Why it matters

> This is how real websites start: a header with a menu, sections, a table and a form, each a part you already know how to make.

<!-- Speaker note: Build a whole page for a school club, one milestone at a time. Everything you need, you have met before. There is no layout yet: the page runs down the screen in order, and colour does the work. Check the page after every change. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Plan the page

_The program is 71 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/html/club-page/?full=step-1#step-1)

<!-- Speaker note: The picture shows the page you will build. What this step is for: Seeing the finished page as named parts turns a big task into a list of small ones students have already done. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Name the parts

**Match each part of the finished page with how it is built.**

| | |
|---|---|
| `The title and menu at the top` | A. class="winner" on their rows, and one .winner rule |
| `A menu link that jumps down the page` | B. href="#results" matching id="results" on a section |
| `The winners in gold` | C. a &lt;table&gt; of rows, with &lt;th&gt; and &lt;td&gt; cells |
| `Results this term` | D. one rule for the tag, h2 { } |
| `Join the club` | E. a &lt;header&gt; holding an &lt;h1&gt; and a &lt;nav&gt; with a list of links |
| `Every h2 in one colour` | F. a &lt;form&gt; whose labels have a for that matches each box's id |

* Answer: The title and menu at the top → E. a &lt;header&gt; holding an &lt;h1&gt; and a &lt;nav&gt; with a list of links; A menu link that jumps down the page → B. href="#results" matching id="results" on a section; The winners in gold → A. class="winner" on their rows, and one .winner rule; Results this term → C. a &lt;table&gt; of rows, with &lt;th&gt; and &lt;td&gt; cells; Join the club → F. a &lt;form&gt; whose labels have a for that matches each box's id; Every h2 in one colour → D. one rule for the tag, h2 { }

<!-- Speaker note: Each part is a lesson you have done. Build them in order: header and menu, then sections, then the form and footer. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Pick some rows

**Two rows of the results table should be gold and the third should not. What does that?**

- A tr rule with background-color: gold;
- An id="winner" on both rows
- A different &lt;table&gt; for the winners
- class="winner" on those two rows, and a .winner rule

* Answer: class="winner" on those two rows, and a .winner rule

<!-- Speaker note: A tag rule such as tr colours every row. A class picks some rows, and one .winner rule colours all of them. An id may name only one element. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Name the parts <span style="font-size:.6em;color:#64748b">(4 min)</span>

With your partner, point to each part of the finished page and name the tag or rule behind it.

<!-- Speaker note: Listen for the lesson each part came from. Write the checklist on the board for the build. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build the page



- **Milestone 1: header and menu:** The page starts with a header and a menu. Colour it with three tag rules. Type these into the `<style>` block:
- **Milestone 2: sections:** Follow the two comments inside `<main>`. Build: - a section with `id="about"`: an `<h2>`, a paragraph, a list of three things to bring, and a picture with alt t
- **Milestone 3: sign-up and footer:** Goals only this time: - a section with `id="join"`: an `<h2>` and a form with at least two labelled fields (one a drop-down) and a button, every label linked to
- **Test the page:** Click every menu link and every label. A link that does not jump has an `href` that does not match an `id`. A label that does not find its box has a `for` that 

<!-- Speaker note: What this step is for: Three milestones with fading support: the full code, then an outline, then only the goals. Hints, in order: Each rule has a tag, braces, a property, a colon and a semicolon. / Type the `header`, `h1` and `a` rules inside the `<style>` block, exactly as the lesson shows them. / Follow the outline in the comments: each comment becomes one section. / `<section id="about">` starts the first one. A table is written one row at a time, with `<tr>`, `<th>` and `<td>`. / Winners: `<tr class="winner">`, then a `.winner { background-color: gold; }` rule in the style block. / The goals list two parts: the sign-up section and the footer. Do one at a time and check the page after each. / A sign-up section is `<section id="join">` with an `<h2>` and a `<form>`. Each label and its box goes in a `<p>`. / The footer goes after `</main>`. A `footer { }` rule colours it. For students who need more support: Let students use Reset to this task's start at each milestone, so everyone reaches milestone 3. Pair students for milestone 3: one plans the form, one the footer. For early finishers: Add a second table, a second list, or a rule that changes the font of the headings with font-family. Then look at the Course B challenge, which lays this page out. The hard part, on purpose: Planning a whole page from parts they already know. Have them name the parts first and finish one milestone at a time; resist building it for them. When students get stuck: A menu link does not jump. Ask: Does the href, after the Fix: Make each pair match exactly, capitals included, and keep the / Clicking a label does nothing. Ask: Does the label's for match the box's id? Fix: Make them identical, for example for="name" and id="name". / Every table row is gold, or no row is. Ask: Does the class go on the row's opening tag, and does the rule start with a dot? Fix: Write <tr class="winner"> for the winners and .winner { } in the style block. / Part of the page suddenly looks wrong after an edit. Ask: Which closing tag did you add or move last? Fix: Check that every tag closes, in the right order, and that every property ends with a semicolon. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Build the page

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23about%22%3EAbout%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23results%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3C%21--+Milestone+2+comes+next.+--%3E%0A%3C%2Fmain%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/club-page/?full=step-2#step-2)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make it yours

Turn the page into one for a club or event you care about: a new name, your own words, your own colours, and a picture with alt text that fits. Add a rule or two of your own, such as a `font-family` for the headings. Then click every link and every label again.

<!-- Speaker note: Hints, in order: Change one thing at a time: the club name, then the words, then the colours. / Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`. -->

<!-- Speaker note: Teacher: any club or event. Encourage pictures with good alt text and readable colours. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make it yours

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++header+%7B%0A++++background-color%3A+lightblue%3B%0A++%7D%0A++h1+%7B%0A++++color%3A+navy%3B%0A++%7D%0A++a+%7B%0A++++color%3A+darkblue%3B%0A++%7D%0A++h2+%7B%0A++++color%3A+darkblue%3B%0A++%7D%0A++.winner+%7B%0A++++background-color%3A+gold%3B%0A++%7D%0A++footer+%7B%0A++++background-color%3A+lightblue%3B%0A++++text-align%3A+center%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23about%22%3EAbout%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23results%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection+id%3D%22about%22%3E%0A++++%3Ch2%3EAbout+the+club%3C%2Fh2%3E%0A++++%3Cp%3EWe+play+chess+every+Wednesday+at+lunch+in+the+library.+All+levels+welcome.%3C%2Fp%3E%0A++++%3Cp%3EBring%3A%3C%2Fp%3E%0A++++%3Cul%3E%0A++++++%3Cli%3Ea+friend%3C%2Fli%3E%0A++++++%3Cli%3Ea+snack%3C%2Fli%3E%0A++++++%3Cli%3Eyour+best+opening%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++++%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+gold+trophy%22+width%3D%22100%22%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22results%22%3E%0A++++%3Ch2%3EResults+this+term%3C%2Fh2%3E%0A++++%3Ctable%3E%0A++++++%3Ctr%3E%3Cth%3EPlayer%3C%2Fth%3E%3Cth%3EWins%3C%2Fth%3E%3C%2Ftr%3E%0A++++++%3Ctr+class%3D%22winner%22%3E%3Ctd%3EAda%3C%2Ftd%3E%3Ctd%3E5%3C%2Ftd%3E%3C%2Ftr%3E%0A++++++%3Ctr+class%3D%22winner%22%3E%3Ctd%3ESam%3C%2Ftd%3E%3Ctd%3E5%3C%2Ftd%3E%3C%2Ftr%3E%0A++++++%3Ctr%3E%3Ctd%3EPriya%3C%2Ftd%3E%3Ctd%3E3%3C%2Ftd%3E%3C%2Ftr%3E%0A++++%3C%2Ftable%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22join%22%3E%0A++++%3Ch2%3EJoin+the+club%3C%2Fh2%3E%0A++++%3Cform%3E%0A++++++%3Cp%3E%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++++++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%3C%2Fp%3E%0A++++++%3Cp%3E%3Clabel+for%3D%22group%22%3EGroup%3C%2Flabel%3E%0A++++++%3Cselect+id%3D%22group%22%3E%0A++++++++%3Coption%3EBeginners%3C%2Foption%3E%0A++++++++%3Coption%3EPlayers%3C%2Foption%3E%0A++++++++%3Coption%3EChampions%3C%2Foption%3E%0A++++++%3C%2Fselect%3E%3C%2Fp%3E%0A++++++%3Cbutton%3EJoin%3C%2Fbutton%3E%0A++++%3C%2Fform%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A%3Cfooter%3E%0A++%3Cp%3EContact%3A+chess%40example.com%3C%2Fp%3E%0A%3C%2Ffooter%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/club-page/?full=step-3#step-3)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Click-test a neighbour's page <span style="font-size:.6em;color:#64748b">(5 min)</span>

Swap pages with a partner. Click every menu link and every label. Say which parts work and which do not.

<!-- Speaker note: For anything that fails, ask the owner to compare the href with the id, or the for with the id, before changing anything. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name three parts of your page and the tag, attribute or rule behind each.**

* For example: the menu is a nav list of links, and each href matches a section's id; the gold winners are rows with class winner and a .winner rule; the sign-up labels work because each for matches a box's id.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Course B (Layout and components) takes this same page and lays it out: menu in a row, cards, a hero, and a form styled as a card. The finished page is a portfolio piece: students can describe each part and the lesson it came from. -->
