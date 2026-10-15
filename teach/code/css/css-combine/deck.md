---
marp: true
theme: default
html: true
---

# Which rule wins

Layout and components · Rules that combine

<!-- Speaker note: Students find out that an element takes every rule that matches it, that a class beats a tag and a later rule beats an equal one, and that a comma shares one rule between selectors. About 40 minutes (Predict and Run 10 min · Investigate 12 min · Modify 8 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** find out that an element takes every rule that matches it, and that a class beats a tag. A comma list shares one rule, as a handy extra.

- I can say which properties an element takes when more than one rule matches it.
- I can say which rule wins when two set the same property.
- I can write one rule for several selectors with a comma.

<!-- Speaker note: Before class: Read the unit primer "Layout and components" first, then do the Make task yourself in the playground (about 5 minutes). Students have written rules and classes in Course A, but always one at a time. The new idea is that an element can match several rules at once. The browser keeps every property from every matching rule. Only where two rules set the same property does it pick: a class beats a tag, and between rules equally exact the later one wins. A **group selector** is a comma list, `h1, p { }`, one rule for several kinds of element. -->

---

## Why it matters

> A real stylesheet has hundreds of rules, and the browser settles every clash between them the same way you are about to learn.

<!-- Speaker note: A page can have many rules, and one element can match more than one of them. You already know that `p { }` styles every paragraph and `.note { }` styles the ones marked `note`. What happens to a paragraph that is both? -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<style>
  .note {
    color: crimson;
    font-size: 24px;
  }
  p {
    color: teal;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
```

**The last paragraph matches both rules. What does Bring a hat. look like?**

- Crimson at the normal size: only the class rule applies
- Teal and 24px: it takes both rules, and the later rule wins on colour
- Crimson and 24px: it takes both rules, and the class wins on colour
- Teal at the normal size: only the last rule applies

<!-- Speaker note: What happens: Crimson and 24px. The paragraph takes the properties of both rules. Both set the colour, and the class rule wins, even though the p rule is written below it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the common answers are the last rule or the first rule alone. Let them move `.note` below the `p` rule and see that nothing changes. Then make the comma edit. Ask someone who chose the last rule to say what happens to the size. The idea to land: every matching rule applies. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.note+%7B%0A++++color%3A+crimson%3B%0A++++font-size%3A+24px%3B%0A++%7D%0A++p+%7B%0A++++color%3A+teal%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ESports+day+is+on+Friday.%3C%2Fp%3E%0A%3Cp+class%3D%22note%22%3EBring+a+hat.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/css-combine/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then move the `.note` rule below the `p` rule: nothing changes. Last, change `p {` to `h1, p {` and watch the heading turn teal too. | Code | What it does | Why | |---|---|---| | `.note { color: crimson; font-size: 24px; }` | Styles every element marked `note` | The colour and the size both apply to `Bring a hat.` | | `p { color: teal; }` | Styles every paragraph | The same paragraph matches this rule too, so it takes both rules. Nothing is thrown away | | `color` on `Bring a hat.` | Crimson, not teal | Both rules set the colour, and a class is a more exact pick than a tag, so the class wins, whichever rule is written first | | `font-size` on `Bring a hat.` | 24px | Only `.note` sets the size, so nothing competes with it | | two rules equally exact | The one written later wins | If two tag rules both set `color` on `p`, the browser takes the lower one | | `h1, p { color: teal; }` | One rule for the heading and the paragraphs | The comma means "and". It is the same as two rules, written once | Students should be able to say: I can say what an element does when two rules match it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Crimson and 24px. The paragraph takes the properties of both rules. Both set the colour, and the class rule wins, even though the p rule is written below it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<style>
  h1, p {
    color: navy;
    font-size: 18px;
  }
  .note {
    color: crimson;
  }
  .big {
    font-size: 30px;
  }
</style>
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p class="note">Bring water.</p>
<p class="note big">Races start at 9 am.</p>
```

<!-- Speaker note: What this step is for: An element keeps the properties of every rule that matches it, so read each rule for each line; the class is what wins a clash, and a selector that matches nothing leaves the other rules showing. -->

<!-- Speaker note: Teacher: the trace has three matching rules on the last line. Ask them to find each rule that matches before they write a value. The tie question separates a class from an equal tag rule. -->

<style scoped>pre, marp-pre { font-size: 0.64em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Colour and size of each line

**Fill in the colour and the size of each line. Read every rule that matches it.**

| line | colour | size (px) |
|---|---|---|
| the heading | ? | ? |
| Bring a hat. | ? | ? |
| Bring water. | ? | ? |
| Races start at 9 am. | ? | ? |

* Answer: navy, 18, navy, 18, crimson, 18, crimson, 30

<!-- Speaker note: Races start at 9 am. matches three rules. The group rule gives navy and 18px, .note changes the colour to crimson, and .big changes the size to 30px. Each rule adds to the others, and a class beats the group rule where they clash. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two rules, same tag

**Two rules both pick every paragraph. p { color: teal; } is written first and p { color: navy; } below it. What colour are the paragraphs?**

- Black: two rules cancel each other out
- Navy: the rule written later wins
- A mix of teal and navy
- Teal: the first rule wins

* Answer: Navy: the rule written later wins

<!-- Speaker note: Both rules are equally exact, so the later one wins. This is why the order of equal rules matters, and why a class does not need to be written last. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The class that does nothing

**Bring a hat. should be crimson, but it is teal, and there is no error. Click the line that causes it.**

```
 1  <style>
 2    p {
 3      color: teal;
 4    }
 5    .Note {
 6      color: crimson;
 7    }
 8  </style>
 9  <p>Sports day is on Friday.</p>
10  <p class="note">Bring a hat.</p>
```

* Answer: line 3

<!-- Speaker note: Line 3 says .Note, but the paragraph's class is note. Capitals count, so the rule matches nothing and is ignored. The teal from the p rule shows instead. -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **One rule for two:** The heading and the paragraphs have the same rule, written twice.
- **A class wins from above:** Mark the second paragraph with a class and write its rule above the group rule. Is it crimson or navy?

<!-- Speaker note: What this step is for: Group selectors join equal rules into one, and a class rule wins whichever side of the group rule it is written. Hints, in order: The two rules are the same, so they can share one. / List both selectors with a comma, then delete the other rule: `h1, p {` / A class needs two parts that match: a name on the paragraph, and a rule for that name. / In the HTML: `<p class="alert">`. In the CSS: `.alert { color: crimson; }`. / Write the `.alert` rule above the group rule, on purpose. For students who need more support: Give students the Modify starter and ask them only to join the two rules with a comma, then mark one paragraph with a class. For early finishers: Add a second class, `big`, that sets only the font size, and put both classes on one paragraph: class="signup big". Which properties come from which class? The hard part, on purpose: Believing only one rule applies to an element. Ask the student to list every rule that matches the line before they say what it looks like. When students get stuck: A class rule does nothing and the page shows the tag rule. Ask: Does the class name in the rule match the one in the tag, capitals too? Fix: Make the two names identical and keep the dot only in the CSS. / The group rule only styles the first selector. Ask: Is there a comma between the selectors, and a brace after the last one? Fix: Write h1, p { with a comma between the selectors and no comma after the last. / A student thinks the class must be written last. Ask: Move the class rule to the top. What changes? Fix: Nothing changes. A class beats a tag wherever it is written. -->

<!-- Speaker note: Teacher: the check ticks on the group rule and the class. Look at the page for the crimson sign-up line. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++h1+%7B%0A++++color%3A+navy%3B%0A++%7D%0A++p+%7B%0A++++color%3A+navy%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3ESwimming+carnival%3C%2Fh1%3E%0A%3Cp%3EThe+carnival+is+on+Thursday.%3C%2Fp%3E%0A%3Cp%3EBring+a+towel+and+a+hat.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/css-combine/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Restyle the club notice. Write one group rule such as `h1, h2, p` that gives the heading and the paragraphs a colour and a font. Give the last paragraph the class `signup` and a `.signup` rule with a different colour and a bigger size.

<!-- Speaker note: Hints, in order: Start with one group rule for the headings and paragraphs: colour and font in one place. / Mark the sign-up line `<p class="signup">` and write a `.signup` rule that sets a different colour. / The `.signup` rule wins wherever it is written. Put it above the group rule to see it still does. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3EOwls+club%3C%2Fh1%3E%0A%3Ch2%3ETraining%3C%2Fh2%3E%0A%3Cp%3EWe+train+on+Tuesday+after+school.%3C%2Fp%3E%0A%3Ch2%3ENew+members%3C%2Fh2%3E%0A%3Cp%3EEveryone+is+welcome.%3C%2Fp%3E%0A%3Cp%3ESign+up+at+the+office+by+Friday.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/css-combine/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## List the rules <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap pages with a partner. Pick one line of text and list every rule that matches it, then say its colour and size without running it.

<!-- Speaker note: Listen for students who stop at the first matching rule. Ask what the other rules add. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A paragraph matches p { color: teal; font-size: 20px; } and .note { color: crimson; }. What colour and size is it?**

* Crimson and 20px. It takes both rules; where they clash on colour, the class rule wins.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson picks only the links inside a menu, with a space between two selectors. Class idea: look at the stylesheet of a real school page and find two rules that must both apply to one heading. -->
