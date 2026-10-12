---
marp: true
theme: default
html: true
---

# Final challenge: a club page

HTML & CSS · Final challenge: a club page

<!-- Speaker note: Students build a whole club page (header and menu, hero, cards, results table, sign-up form, footer) from every component in the course, in three milestones with fading support, then make it their own. About 100 minutes (Plan 10 min · Milestone 1 15 min · Milestone 2 25 min · Milestone 3 30 min · Make it yours 20 min (two lessons)). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** build a whole club page from every component in the course, in three milestones, then make it your own.

- I can plan a page as a list of components.
- I can build a header with a Flexbox menu, a hero, and a row of cards.
- I can add a table, a form with linked labels and a footer to a page.
- I can make a page my own and check every part works.

<!-- Speaker note: Before class: Read the challenge primer "Running the final challenge", then build milestone 1 and plan milestones 2 and 3 on paper. There is **nothing new** in this lesson. Every milestone recalls earlier lessons: Flexbox (lesson 7), sections and components (8), tables (4), forms (9), boxes (6), selectors (5). Support fades on purpose: milestone 1 says almost exactly what to write, milestone 2 gives an outline as comments, milestone 3 gives only the goals. Finishing this lesson marks **Challenge complete** on the course page. Teacher: Plan the page: match each part to how it is built. Write the six parts on the board as a checklist. Teacher: Milestone 1: everyone should finish this in the first lesson. Check with Boxes that the menu is inside the header. Teacher: Milestone 2: the outline is in the comments. Students who are stuck can use **Reset to this task's start** to load a working milestone 1. Teacher: Milestone 3: goals only. Ask students to plan the table's rows and the form's fields before typing. Click every label, and every menu link (they jump to the sections with matching ids). Teacher: Early finishers: the two optional lessons, Make it react (JavaScript) and Page layout with Grid. -->

---

## Why it matters

> This is how real websites are built: a header, a hero, cards, a table and a form, each one a part you already know how to make.

<!-- Speaker note: Build a whole page for a school club, one milestone at a time. Everything you need, you have met before. Check the page after every change, with **Boxes** or **Box model** when something looks wrong. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Plan the page

_The program is 112 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/html/club-page/?full=step-1#step-1)

<!-- Speaker note: This is the page you will build. The picture shows it finished. What this step is for: Seeing the finished page as named components turns a big task into a list of small ones students have done before. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Name the parts

**Match each part of the finished page with how it is built.**

| | |
|---|---|
| `The title and menu at the top` | A. cards: boxes with padding and a border, in a Flexbox row |
| `The big welcome` | B. a hero: a &lt;section&gt; with padding, a background and centred text |
| `Three groups side by side` | C. a &lt;table&gt; of rows and cells |
| `Results this term` | D. a &lt;footer&gt; |
| `Join the club` | E. a &lt;header&gt; with a &lt;nav&gt; list made into a Flexbox row |
| `Contact details` | F. a &lt;form&gt; with labels linked to their boxes |

* Answer: The title and menu at the top → E. a &lt;header&gt; with a &lt;nav&gt; list made into a Flexbox row; The big welcome → B. a hero: a &lt;section&gt; with padding, a background and centred text; Three groups side by side → A. cards: boxes with padding and a border, in a Flexbox row; Results this term → C. a &lt;table&gt; of rows and cells; Join the club → F. a &lt;form&gt; with labels linked to their boxes; Contact details → D. a &lt;footer&gt;

<!-- Speaker note: Six parts, six lessons. Build them in order: header and menu, then the hero and cards, then the table, form and footer. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The row of cards

**Which rule makes the three cards sit side by side?**

- section { display: flex; }
- .hero { text-align: center; }
- .card { display: flex; }
- .cards { display: flex; }

* Answer: .cards { display: flex; }

<!-- Speaker note: Flexbox goes on the box that holds the cards. Putting it on each card, or on every section, would not give one row of cards. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Build the page



- **Milestone 1: header and menu:** The page starts with a header, a menu and an empty `<main>`. Style the header with a background colour and padding, and turn the menu into a row: `display: flex
- **Milestone 2: hero and cards:** Follow the first comment inside `<main>`. Build a hero section with a heading, a line of text and a link to `#join`. Then a section of three cards in a row, eac
- **Milestone 3: results, sign-up and footer:** Goals only this time: - a results section (`id="results"`) with a heading and a table: a heading row and at least two rows of data; - a sign-up section (`id="jo

<!-- Speaker note: What this step is for: Three milestones with fading support: most of the code, then an outline, then only the goals. Hints, in order: In the `<style>` block: a `header` rule with a background colour and padding. / A `.menu` rule: `display: flex;`, a `gap`, `list-style: none;` and `padding: 0;`. / Follow the outline in the comments: each comment becomes one section, and each section gets its own class. / Replace the first comment with a `<section class="hero">` (a heading, a line of text and a link) and a `<section class="cards" id="groups">` holding three `<div class="card">`. / Then rules for `.hero`, `.cards` (`display: flex;` and a `gap`) and `.card` (width, padding, border). / The goals list four parts: results, join, footer and linked labels. Do one at a time and check the page after each. / Results: a `<section id="results">` with a heading and a table. Join: a `<section id="join">` with a form. / Click every label to check it is linked. The footer goes after `</main>`. For students who need more support: Let students use Reset to this task's start at each milestone, so everyone reaches milestone 3. Pair students for milestone 3: one plans the table, one the form. For early finishers: Add a gallery of pictures that wraps, a second table, or a footer with a Flexbox row of links. Then take an optional lesson: Make it react, or Page layout with Grid. The hard part, on purpose: Planning a whole page from parts they already know. Have them name the components first and finish one milestone at a time; resist building it for them. When students get stuck: The menu or the cards stack instead of sitting in a row. Ask: Which box holds them, and does it have display flex? Fix: Put display flex on the parent (.menu or .cards), not on each item. / Clicking a label does nothing, or a menu link does not jump. Ask: Does the label's for match the box's id? Does the link's href (after the Fix: Make each pair match exactly, capitals included. / Part of the page suddenly looks wrong after an edit. Ask: Which closing tag did you add or move last? Fix: Check that every tag closes, in the right order; switch on Boxes to see where the boxes end. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Build the page

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul+class%3D%22menu%22%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23groups%22%3EGroups%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23results%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3C%21--+Milestone+2%3A+a+hero+section%2C+then+three+cards+in+a+row+%28id%3D%22groups%22%29.+--%3E%0A++%3C%21--+Milestone+3%3A+a+results+table+%28id%3D%22results%22%29%2C+a+sign-up+form+%28id%3D%22join%22%29%2C+and+a+footer+after+main.+--%3E%0A%3C%2Fmain%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/club-page/?full=step-2#step-2)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make it yours

Turn the page into one for a club or event you care about: a new name, your own words, your own colours, and at least one picture in the header or the hero. Check it with **Boxes** and **Box model**, and click every label and every menu link.

<!-- Speaker note: Hints, in order: Change one thing at a time: the club name, then the words, then the colours. / Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`. -->

<!-- Speaker note: Teacher: any club or event. Encourage pictures with good alt text and readable colours. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make it yours

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++header+%7B%0A++++background-color%3A+lightblue%3B%0A++++padding%3A+12px%3B%0A++%7D%0A++.menu+%7B%0A++++display%3A+flex%3B%0A++++gap%3A+24px%3B%0A++++list-style%3A+none%3B%0A++++padding%3A+0%3B%0A++%7D%0A++.hero+%7B%0A++++padding%3A+32px%3B%0A++++background-color%3A+lightyellow%3B%0A++++text-align%3A+center%3B%0A++%7D%0A++.cards+%7B%0A++++display%3A+flex%3B%0A++++gap%3A+16px%3B%0A++%7D%0A++.card+%7B%0A++++width%3A+160px%3B%0A++++padding%3A+12px%3B%0A++++border%3A+2px+solid+teal%3B%0A++%7D%0A++th%2C+td+%7B%0A++++padding%3A+6px+12px%3B%0A++++border%3A+1px+solid+gray%3B%0A++%7D%0A++.signup+%7B%0A++++width%3A+260px%3B%0A++++padding%3A+16px%3B%0A++++border%3A+2px+solid+teal%3B%0A++%7D%0A++label+%7B%0A++++display%3A+block%3B%0A++++margin-top%3A+8px%3B%0A++%7D%0A++footer+%7B%0A++++padding%3A+12px%3B%0A++++background-color%3A+lightblue%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul+class%3D%22menu%22%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23groups%22%3EGroups%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23results%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection+class%3D%22hero%22%3E%0A++++%3Ch2%3EThink+ahead%3C%2Fh2%3E%0A++++%3Cp%3EChess+every+Wednesday+at+lunch+in+the+library.+All+levels+welcome.%3C%2Fp%3E%0A++++%3Ca+href%3D%22%23join%22%3EJoin+us%3C%2Fa%3E%0A++%3C%2Fsection%3E%0A++%3Csection+class%3D%22cards%22+id%3D%22groups%22%3E%0A++++%3Cdiv+class%3D%22card%22%3E%0A++++++%3Cimg+src%3D%22star.svg%22+alt%3D%22A+star%22+width%3D%2250%22%3E%0A++++++%3Ch2%3EBeginners%3C%2Fh2%3E%0A++++++%3Cp%3ELearn+the+moves.%3C%2Fp%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3E%0A++++++%3Cimg+src%3D%22medal.svg%22+alt%3D%22A+medal%22+width%3D%2250%22%3E%0A++++++%3Ch2%3EPlayers%3C%2Fh2%3E%0A++++++%3Cp%3EWeekly+games.%3C%2Fp%3E%0A++++%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3E%0A++++++%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+trophy%22+width%3D%2250%22%3E%0A++++++%3Ch2%3EChampions%3C%2Fh2%3E%0A++++++%3Cp%3ESchool+tournaments.%3C%2Fp%3E%0A++++%3C%2Fdiv%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22results%22%3E%0A++++%3Ch2%3EResults+this+term%3C%2Fh2%3E%0A++++%3Ctable%3E%0A++++++%3Ctr%3E%0A++++++++%3Cth%3EPlayer%3C%2Fth%3E%0A++++++++%3Cth%3EWins%3C%2Fth%3E%0A++++++%3C%2Ftr%3E%0A++++++%3Ctr%3E%0A++++++++%3Ctd%3EAda%3C%2Ftd%3E%0A++++++++%3Ctd%3E5%3C%2Ftd%3E%0A++++++%3C%2Ftr%3E%0A++++++%3Ctr%3E%0A++++++++%3Ctd%3ESam%3C%2Ftd%3E%0A++++++++%3Ctd%3E4%3C%2Ftd%3E%0A++++++%3C%2Ftr%3E%0A++++%3C%2Ftable%3E%0A++%3C%2Fsection%3E%0A++%3Csection+id%3D%22join%22%3E%0A++++%3Ch2%3EJoin+the+club%3C%2Fh2%3E%0A++++%3Cform+class%3D%22signup%22%3E%0A++++++%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A++++++%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%0A++++++%3Clabel+for%3D%22group%22%3EGroup%3C%2Flabel%3E%0A++++++%3Cselect+id%3D%22group%22%3E%0A++++++++%3Coption%3EBeginners%3C%2Foption%3E%0A++++++++%3Coption%3EPlayers%3C%2Foption%3E%0A++++++++%3Coption%3EChampions%3C%2Foption%3E%0A++++++%3C%2Fselect%3E%0A++++++%3Cbutton%3EJoin%3C%2Fbutton%3E%0A++++%3C%2Fform%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A%3Cfooter%3E%0A++%3Cp%3EContact%3A+chess%40example.com%3C%2Fp%3E%0A%3C%2Ffooter%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/club-page/?full=step-3#step-3)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name three parts of your page and the tag or CSS rule that makes each one.**

* For example: the menu row is a nav list with display flex on .menu; the cards are divs with padding and a border inside .cards with display flex; the sign-up is a form with labels linked by for and id.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Make it react adds JavaScript so the form does something; it leads to the DOM course. Page layout with Grid arranges whole pages. The finished page is a portfolio piece: students can describe each part and the lesson it came from. Assessment idea: ask students to annotate a printout of their page with the tag or rule behind each part. -->
