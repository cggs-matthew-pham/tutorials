---
title: "Which rule wins"
subtitle: "Layout and components · Rules that combine · Lesson 1"
---

# Which rule wins

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A real stylesheet has hundreds of rules, and the browser settles every clash between them the same way you are about to learn.


:::teacher-note

**In one sentence:** Students find out that an element takes every rule that matches it, that a class beats a tag and a later rule beats an equal one, and that a comma shares one rule between selectors.

**Students should be able to say:** I can say which properties an element takes when more than one rule matches it. I can say which rule wins when two set the same property. I can write one rule for several selectors with a comma.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. `Bring a hat.` is a `p` and it has `class="note"`, so both rules match it. What will it look like?

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

:::keep-together

**The last paragraph matches both rules. What does Bring a hat. look like?**

☐ Crimson at the normal size: only the class rule applies

☐ Teal and 24px: it takes both rules, and the later rule wins on colour

☐ Crimson and 24px: it takes both rules, and the class wins on colour

☐ Teal at the normal size: only the last rule applies

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Crimson and 24px. The paragraph takes the properties of both rules. Both set the colour, and the class rule wins, even though the p rule is written below it.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Colour and size of each line

**Fill in the colour and the size of each line. Read every rule that matches it.**

{{rows 1}}

| line | colour | size (px) |
|---|---|---|
| the heading |   |   |
| Bring a hat. |   |   |
| Bring water. |   |   |
| Races start at 9 am. |   |   |

:::


:::teacher-note

**Answer:** navy, 18, navy, 18, crimson, 18, crimson, 30

Races start at 9 am. matches three rules. The group rule gives navy and 18px, .note changes the colour to crimson, and .big changes the size to 30px. Each rule adds to the others, and a class beats the group rule where they clash.

:::


:::keep-together

### Two rules, same tag

**Two rules both pick every paragraph. p { color: teal; } is written first and p { color: navy; } below it. What colour are the paragraphs?**

☐ Black: two rules cancel each other out

☐ Navy: the rule written later wins

☐ A mix of teal and navy

☐ Teal: the first rule wins

:::


:::teacher-note

**Answer:** Navy: the rule written later wins

Both rules are equally exact, so the later one wins. This is why the order of equal rules matters, and why a class does not need to be written last.

:::


:::keep-together

### The class that does nothing

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3 says .Note, but the paragraph's class is note. Capitals count, so the rule matches nothing and is ignored. The teal from the p rule shows instead.

:::


:::typical

## Modify


**One rule for two.** The heading and the paragraphs have the same rule, written twice.

**A class wins from above.** Mark the second paragraph with a class and write its rule above the group rule. Is it crimson or navy?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**One rule for two:**

```html
<style>
  h1, p {
    color: navy;
  }
</style>
<h1>Swimming carnival</h1>
<p>The carnival is on Thursday.</p>
<p>Bring a towel and a hat.</p>
```

**A class wins from above:**

```html
<style>
  .alert {
    color: crimson;
  }
  h1, p {
    color: navy;
  }
</style>
<h1>Swimming carnival</h1>
<p>The carnival is on Thursday.</p>
<p class="alert">Bring a towel and a hat.</p>
```

:::

:::


## Make

Restyle the club notice. Write one group rule such as `h1, h2, p` that gives the heading and the paragraphs a colour and a font. Give the last paragraph the class `signup` and a `.signup` rule with a different colour and a bigger size.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .signup {
    color: crimson;
    font-size: 24px;
  }
  h1, h2, p {
    color: navy;
    font-family: sans-serif;
  }
</style>
<h1>Owls club</h1>
<h2>Training</h2>
<p>We train on Tuesday after school.</p>
<h2>New members</h2>
<p>Everyone is welcome.</p>
<p class="signup">Sign up at the office by Friday.</p>
```

:::


## Exit ticket

:::keep-together

**A paragraph matches p { color: teal; font-size: 20px; } and .note { color: crimson; }. What colour and size is it?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Crimson and 20px. It takes both rules; where they clash on colour, the class rule wins.

:::

