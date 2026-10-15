---
marp: true
theme: default
html: true
---

# Pick some with a class

Structure and style a page · Lists, links and pictures

<!-- Speaker note: Students mark chosen elements with a class and style only those with a dot rule, and find out that the names must match and the dot stays in the CSS. About 40 minutes (Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 4 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** mark the elements you choose with a class, and style only those with a rule that starts with a dot.

- I can mark an element with class="name" and style it with .name in the CSS.
- I can use one class on several elements.
- I can find a class rule that matches nothing, because of a different name or a dot in the HTML.

<!-- Speaker note: Before class: Read the unit primer "Lists, links and pictures in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes). A **class** is a name you choose and put on elements with `class="name"`. In the CSS a rule starting with a dot, `.name { }`, styles every element with that class. The dot is only in the CSS. Students already know that `p { }` styles all paragraphs; the new idea is choosing which ones. Teacher: Mix it up: the missing semicolon and the missing alt are both from earlier lessons. -->

---

## Why it matters

> Every website marks the parts that matter, like sale prices or warnings, with a class so one rule can style them all.

<!-- Speaker note: A rule like `p { }` styles every paragraph. Sometimes you want only some of them: the winners, the warning, the line that matters most. You choose them with a name. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p>Races start at 9 am.</p>
```

**Which lines of text turn crimson?**

- All four paragraphs
- Only Bring a hat., the first one marked
- None of them, because there is no tag called note
- Bring a hat. and Bring water., the two paragraphs marked class="note"

<!-- Speaker note: What happens: Bring a hat. and Bring water. The rule .note picks every element marked class="note", however many there are, and leaves the other paragraphs alone. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the usual guess is all four paragraphs, or only the first. In Modify they add the class and watch the colour follow it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Which ones change? <span style="font-size:.6em;color:#64748b">(3 min)</span>

With your partner, point to each paragraph and say whether it turns crimson.
Hold up 1, 2, 3 or 4 fingers for the option you chose.

<!-- Speaker note: Take a vote before running. Ask someone who chose all four what the class is for. The idea to land: the class is the mark, the rule picks by the mark. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.note+%7B%0A++++color%3A+crimson%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+Friday.%3C%2Fp%3E%0A%3Cp+class%3D%22note%22%3EBring+a+hat.%3C%2Fp%3E%0A%3Cp+class%3D%22note%22%3EBring+water.%3C%2Fp%3E%0A%3Cp%3ERaces+start+at+9+am.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/classes/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Find the two paragraphs with `class="note"` and the rule that matches them. The table says what each part does. | Code | What it does | Why | |---|---|---| | `class="note"` | Marks this element with the name `note` | `class` is an attribute, so it sits inside the opening tag. You choose the name | | `.note { … }` | Styles only the elements marked `note` | The dot means "a class". It is a rule like `p { }`, but it picks by name instead of by tag | | `<p class="note">` twice | Both paragraphs change | Any number of elements can share one class. The rule is written once | | `<p>` with no class | Stays as it was | The rule picks by the mark. The tag alone does not match | | `note` after the dot | Must match the HTML name exactly | If the spelling or capitals differ, the rule matches nothing, and the browser shows no error | Students should be able to say: I can explain how a class and a dot rule work together. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Bring a hat. and Bring water. The rule .note picks every element marked class="note", however many there are, and leaves the other paragraphs alone.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p>Races start at 9 am.</p>
```

<!-- Speaker note: What this step is for: The class name in the CSS and in the HTML must match exactly, and the dot belongs only in the CSS. -->

<!-- Speaker note: Teacher: both bugs are silent. Ask what the browser does with a rule that matches nothing: it ignores it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The rule that does nothing

**Bring a hat should be crimson, but it stays black, and there is no error. Click the line in the CSS that causes it.**

```
 1  <style>
 2    .Notice {
 3      color: crimson;
 4    }
 5  </style>
 6  <p>Sports day is on Friday.</p>
 7  <p class="notice">Bring a hat.</p>
```

* Answer: line 2

<!-- Speaker note: Line 2 says .Notice, but the paragraph's class is notice. Class names must match exactly, capitals included. A selector that matches nothing is simply ignored. -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The dot in the wrong place

**Bring a hat should be crimson, but it stays black. The CSS is right. Click the line that causes it.**

```
 1  <style>
 2    .note {
 3      color: crimson;
 4    }
 5  </style>
 6  <p>Sports day is on Friday.</p>
 7  <p class=".note">Bring a hat.</p>
```

* Answer: line 7

<!-- Speaker note: Line 7 puts the dot in the HTML. The dot is only in the CSS, where it means a class: the tag says class="note" and the rule says .note. -->

<style scoped>pre, marp-pre { font-size: 0.83em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Mark one more:** Add `class="note"` to the last paragraph, so it joins the others.
- **Change the colour:** Change `crimson` to `navy` in the rule. Every marked paragraph changes together.
- **A second class:** Add a class named `big` with `font-size: 24px;`, and use it on the first paragraph.

<!-- Speaker note: What this step is for: The HTML marks and the CSS styles what is marked: change either side, or add a new pair. Hints, in order: Copy `class="note"` from another paragraph into the opening tag of the last one. / A tag with an attribute looks like `<p class="note">`. / The colour is in the `.note` rule, after `color:`. / Change the word to `navy`. All the marked paragraphs follow. / Write a second rule in the style block: a dot, the name `big`, then a bigger `font-size` in braces. / Then add `class="big"` to the opening tag of the first paragraph. For students who need more support: Give students the Modify starter and do the first task together, then change the colour in the rule. For early finishers: Give one paragraph a third class, `late`, in a third colour. Then give a list item the class `winner` and see that any tag can have one. The hard part, on purpose: Believing the dot belongs in both places. Ask where each of the two names is written, and which one is the CSS. When students get stuck: The rule does nothing and there is no error. Ask: Are the class name in the tag and the name after the dot spelt exactly the same? Fix: Make the two names identical, capitals included, and put the dot only in the CSS. / Every paragraph changes colour. Ask: Is the rule's selector p or .winner? Fix: Change the selector to a dot and the class name, and put the class on only the elements you want. / The class is written as class=".winner". Ask: Where does the dot go? Fix: The dot is only in the CSS. In the tag write class="winner". -->

<!-- Speaker note: Teacher: mark one more, change the colour in one place, then add a second class. Ask how many rules changed when the colour changed. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.note+%7B%0A++++color%3A+crimson%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+Friday.%3C%2Fp%3E%0A%3Cp+class%3D%22note%22%3EBring+a+hat.%3C%2Fp%3E%0A%3Cp+class%3D%22note%22%3EBring+water.%3C%2Fp%3E%0A%3Cp%3ERaces+start+at+9+am.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/classes/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```html
<style>
  h2 {
    color: teal
    font-size: 28px;
  }
</style>
<h2>Winners</h2>
<img src="trophy.svg">
<p>First place: Owls</p>
```

<!-- Speaker note: Two things are wrong on this page, one in the CSS and one in the HTML. What this step is for: Reading a rule for a missing semicolon, and a picture for a missing alt, uses the CSS rule and the picture tag together. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**The heading stays plain, and a screen reader has nothing to say about the picture. Click the two lines to fix.**

```
 1  <style>
 2    h2 {
 3      color: teal
 4      font-size: 28px;
 5    }
 6  </style>
 7  <h2>Winners</h2>
 8  <img src="trophy.svg">
 9  <p>First place: Owls</p>
```

* Answer: line 3 and 8

<!-- Speaker note: Line 3 needs a ; at its end: without it the browser drops both declarations, and the h2 rule does nothing. Line 8 needs alt, to say what the picture shows. What this step is for: Reading a rule for a missing semicolon, and a picture for a missing alt, uses the CSS rule and the picture tag together. -->

<style scoped>pre, marp-pre { font-size: 0.65em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

This is a results page. Use a class named `winner` for the first-place paragraphs and a class named `runner` for the second-place paragraphs, then write a rule for each, with two different colours.

<!-- Speaker note: Hints, in order: Each class needs two parts that match: a mark on the paragraphs, and a rule for that name. / The mark goes inside the opening tag of each paragraph. The rule goes in a `<style>` block, and its dot goes in the CSS only. -->

<!-- Speaker note: Teacher: the check ticks when both classes and both rules are there with the names winner and runner. Look at the page for two different colours. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ERace+results%3C%2Fh1%3E%0A%3Cp%3EFirst+place%3A+Owls%3C%2Fp%3E%0A%3Cp%3ESecond+place%3A+Hawks%3C%2Fp%3E%0A%3Cp%3EFirst+place%3A+Eagles%3C%2Fp%3E%0A%3Cp%3ESecond+place%3A+Falcons%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/classes/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Name and swap <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap pages with a partner. Without running them, read each tag with a class and say which rule it matches.

<!-- Speaker note: Listen for students who match by eye and miss a capital letter. Ask what the browser does when the names differ. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A rule .sale { color: red; } does nothing. Name two things that could be wrong.**

* No element has class="sale", or the name is spelt differently in the HTML. Another possibility is class=".sale" with the dot in the HTML.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson is a whole newsletter page that uses everything so far. Class idea: ask which parts of a school's real page might share a class. -->
