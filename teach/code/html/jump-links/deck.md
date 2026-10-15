---
marp: true
theme: default
html: true
---

# A place on the page

Structure and style a page · Parts of a page

<!-- Speaker note: Students name a place on a page with id and link to it with href="#name", so a menu can jump to each part of a long page. About 40 minutes (Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 4 min · Make 12 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** give a heading a name with id, then link to it with a.

- I can give a heading a name with id.
- I can link to it with href starting with
- I can explain why each id is used once and why the

<!-- Speaker note: Before class: Do the Make task yourself (about 5 minutes). An **id** is an attribute that gives one element a name. A link whose `href` starts with `#` goes to the element with that name on the same page. The # is the whole difference between "this page" and "another page". Pages need to be long enough to scroll, or the jump is invisible: make the preview small or add a paragraph. -->

---

## Why it matters

> Long pages such as Wikipedia articles open with a list of contents, and every entry jumps down the page to its part.

<!-- Speaker note: A link can go to another page, or to a place on the same page. On a long page, a menu of links at the top lets people jump straight to the part they want. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>When we meet</h2>
    <p>Wednesdays at lunch in room 4. Bring a board if you have one.</p>
  </section>
  <section>
    <h2 id="results">Results</h2>
    <p>The Owls won the autumn ladder. The Hawks came second.</p>
  </section>
  <section>
    <h2 id="join">Join</h2>
    <p>Come to room 4 on Wednesday and ask for a game.</p>
  </section>
</main>
```

**Someone clicks Results in the menu. What does the page do?**

- Opens a different web page called results
- Shows only the Results part and hides the rest
- Nothing: the whole page is already on screen
- Scrolls down so the Results heading is at the top

<!-- Speaker note: What happens: It scrolls to the Results heading. The link's href names a place on this page, and the heading with that id is the place. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students pick the first option, but some think the link opens a new page, because every link they have written so far did. Run it and click each link. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Where will it go? <span style="font-size:.6em;color:#64748b">(3 min)</span>

Look at the code. Point to where you think the page will scroll when someone clicks Results, and tell your partner how you know.

<!-- Speaker note: Listen for students who point at the link itself. Ask them what in the heading tells the browser this is the place. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23results%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection%3E%0A++++%3Ch2%3EWhen+we+meet%3C%2Fh2%3E%0A++++%3Cp%3EWednesdays+at+lunch+in+room+4.+Bring+a+board+if+you+have+one.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection%3E%0A++++%3Ch2+id%3D%22results%22%3EResults%3C%2Fh2%3E%0A++++%3Cp%3EThe+Owls+won+the+autumn+ladder.+The+Hawks+came+second.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection%3E%0A++++%3Ch2+id%3D%22join%22%3EJoin%3C%2Fh2%3E%0A++++%3Cp%3ECome+to+room+4+on+Wednesday+and+ask+for+a+game.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/jump-links/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Click each link in the menu, then scroll back up. Find the name that appears in both a link and a heading. | Code | What it does | Why | |---|---|---| | `<h2 id="results">` | Gives this heading the name `results` | `id` is an attribute, like `href`. The name marks a place on the page, and changes nothing you can see | | `<a href="#results">` | Jumps to the element named `results` | The `#` means "on this page". Without it, the browser looks for another page called `results` | | the same name in both places | Joins the link to its place | The names must match exactly, capitals too. If nothing has that id, the link does nothing | | each id used once | Keeps every name pointing at one element | A link can only jump to one place, so two elements with one id means it goes to the first | | the links in a `<nav>` | Makes the menu for a long page | Part names and a menu go together: `<nav>` holds the links, each part has an id | Students should be able to say: I can say what has to match for a link to jump to a heading. -->

<!-- Speaker note: Teacher: ask which name appears in both a link and a heading. Then try changing id="results" to id="result": the link stops working and nothing says why. Matching names are all the browser has. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It scrolls to the Results heading. The link's href names a place on this page, and the heading with that id is the place.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where does Join go?

Two parts share one name.

```html
<ul>
  <li><a href="#join">Join</a></li>
</ul>
<h2 id="join">Join the club</h2>
<p>Come on Wednesday.</p>
<h2 id="join">Join the chess ladder</h2>
<p>Put your name on the list.</p>
```

**Two sections both have id="join", and the menu has a link to #join. Where does the link go?**

- Nowhere, because the name is used twice
- To both, one after the other
- To the second one
- To the first one

* Answer: To the first one

<!-- Speaker note: An id names one element. The browser takes the first match, so the second Join part cannot be reached by a link. Give each part its own name. -->

<!-- Speaker note: Teacher: the shared id has no visible symptom except the second part never being reached. Ask them to find it by clicking. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The link that leaves

**Rules and Join jump down the page, but clicking Results tries to open a different page. Click the line that causes it.**

```
 1  <nav>
 2    <ul>
 3      <li><a href="#rules">Rules</a></li>
 4      <li><a href="results">Results</a></li>
 5      <li><a href="#join">Join</a></li>
 6    </ul>
 7  </nav>
 8  <h2 id="rules">Rules</h2>
 9  <p>Think before you move.</p>
10  <h2 id="results">Results</h2>
11  <p>The Owls won.</p>
12  <h2 id="join">Join</h2>
13  <p>Come on Wednesday.</p>
```

* Answer: line 4

<!-- Speaker note: Line 4 has href="results" with no #. Without the #, the browser looks for a page called results instead of an element with that id. It should be href="#results". -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Name a place:** Give the `When we meet` heading the id `meet`. Nothing changes on the page yet.
- **Link to it:** Add a menu item that jumps to `meet`. Click it to test.
- **Back to the top:** Name the title `top`, and add a link at the bottom of the page that jumps back to it.

<!-- Speaker note: What this step is for: A jump needs a name on the place and a link with a # and the same name: add them one at a time. Hints, in order: `id` is an attribute, so it goes inside the opening tag of the heading. / Write `<h2 id="meet">` for the When we meet heading. / Copy one of the menu items and change its words to When we meet. / The address is the id with a # in front: `href="#meet"`. / Give the `<h1>` the id `top`, then add a paragraph at the bottom with a link to `#top`. / Write `<a href="#top">Back to the top</a>` inside a `<p>`. For students who need more support: Give students the Make starter with the ids already added, and ask them only to build the nav and the links. For early finishers: Add a fourth part with its own id and menu link, and a link at the bottom of the page that jumps back to the top (give the heading an id). The hard part, on purpose: Matching the name in the href and the id exactly, and remembering the # in the href only. Have them click every link to test it. When students get stuck: Clicking a menu link does nothing. Ask: Is the name in the href exactly the name in the id, with a Fix: Make the two names match letter for letter. Only the href has the / Clicking a menu link tries to open another page. Ask: Does the href start with Fix: Put a / The id has a Ask: Where does the Fix: The -->

<!-- Speaker note: Teacher: name a place, link to it, then link back to the top. After each step, click the new link to test it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A++%3Cnav%3E%0A++++%3Cul%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23results%22%3EResults%3C%2Fa%3E%3C%2Fli%3E%0A++++++%3Cli%3E%3Ca+href%3D%22%23join%22%3EJoin%3C%2Fa%3E%3C%2Fli%3E%0A++++%3C%2Ful%3E%0A++%3C%2Fnav%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection%3E%0A++++%3Ch2%3EWhen+we+meet%3C%2Fh2%3E%0A++++%3Cp%3EWednesdays+at+lunch+in+room+4.+Bring+a+board+if+you+have+one.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection%3E%0A++++%3Ch2+id%3D%22results%22%3EResults%3C%2Fh2%3E%0A++++%3Cp%3EThe+Owls+won+the+autumn+ladder.+The+Hawks+came+second.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection%3E%0A++++%3Ch2+id%3D%22join%22%3EJoin%3C%2Fh2%3E%0A++++%3Cp%3ECome+to+room+4+on+Wednesday+and+ask+for+a+game.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/jump-links/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**Put the lines in order to make a header with the title and, inside a nav, a list of two links. One line is not needed.**

```html
      <li><a href="https://example.com/rules">Rules</a></li>
  <h1>Chess club</h1>
    <ul>
<header>
  </nav>
    </ul>
      <li><a href="https://example.com/join">Join</a></li>
</main>
</header>
  <nav>
```

<!-- Speaker note: The header holds the title and the nav. The nav holds the list, and each link sits in its own item. </main> would close a part this page has not opened. Correct order: <header> <h1>Chess club</h1> <nav> <ul> <li><a href="https://example.com/rules">Rules</a></li> <li><a href="https://example.com/join">Join</a></li> </ul> </nav> </header> What this step is for: The menu of links goes in a nav, and the nav is part of the header. -->

<style scoped>pre, marp-pre { font-size: 0.74em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

This page has three parts but no menu. Add a `<nav>` with a list of three links under the title, inside the `<header>`. Each link jumps to one of the headings: give them the ids `rules`, `results` and `join`.

<!-- Speaker note: Hints, in order: Give each heading an id of its own. Then add the `<nav>` with a list of links under the title. / Each link is `<a href="#rules">`, with the same name as the id, and the `#` in front. / Click each link to test it. A link that does nothing has a name that does not match. -->

<!-- Speaker note: Teacher: the check needs the six exact fragments. If it does not tick, compare each href with its id letter by letter. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A%3C%2Fheader%3E%0A%3Cmain%3E%0A++%3Csection%3E%0A++++%3Ch2%3ERules%3C%2Fh2%3E%0A++++%3Cp%3EThink+before+you+move.+Shake+hands+at+the+end.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection%3E%0A++++%3Ch2%3EResults%3C%2Fh2%3E%0A++++%3Cp%3EThe+Owls+won+the+autumn+ladder.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A++%3Csection%3E%0A++++%3Ch2%3EJoin%3C%2Fh2%3E%0A++++%3Cp%3ECome+to+room+4+on+Wednesday.%3C%2Fp%3E%0A++%3C%2Fsection%3E%0A%3C%2Fmain%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/jump-links/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Contents list <span style="font-size:.6em;color:#64748b">(5 min)</span>

Swap pages with a partner. Click every link in their menu. Tell them which link does nothing, and read the name in the link and in the heading aloud.

<!-- Speaker note: Most failures are a missing #, a different spelling, or a capital letter. Let the partner find the mismatch. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A menu link has href="results" and a heading has id="results". The link does not jump. What is missing, and why?**

* The #. href="#results" means the element named results on this page; without it the browser looks for another page called results.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson uses id again: a form label points at its box by id, so clicking the label finds the box. Class idea: find a long page (a Wikipedia article) and look at how its contents list jumps down the page. -->
