---
title: "Scrambling is not a secret"
subtitle: "Secret messages · Messages in the air · Lesson 2"
---

# Scrambling is not a secret

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A message written backwards looks secret for about ten seconds. The question is what makes a code truly hard to read, and the answer is not hiding the method.


:::teacher-note

**In one sentence:** Students send a reversed message, see that anyone who knows the method can undo it, and meet the idea of a public method with a secret key.

**Students should be able to say:** I can write a function that scrambles text and one that unscrambles it. I can explain why a secret method is not enough. I can name the parts of a code: method, key, plain text and cipher text.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/729710904559.png?v=5238f238b68b6afc)

:::keep-together

**A is pressed. What does the other micro:bit show?**

☐ H

☐ HELLO

☐ OLLEH

☐ Nothing

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** OLLEH. The receiver shows exactly what the radio carried, and the radio carried the reversed text. The receiver never undoes it.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/729710904559.png?v=5238f238b68b6afc)

:::keep-together

### Inside reverse

**In reverse("HELLO"), what is result after the loop has run for i = 0 and then i = 1?**

☐ H

☐ HE

☐ EH

☐ OL

:::


:::teacher-note

**Answer:** EH

At i = 0 the letter at place 0, H, is joined in front of the empty result: H. At i = 1, E is joined in front: EH. Each new letter goes on the front, so the order flips.

:::


:::keep-together

### Undoing it

**Sam knows the sender reverses every message. A message arrives: OLLEH. What does Sam do to read it?**

☐ Reverse it again

☐ Nothing: it is secret

☐ Ask the sender to send it twice

☐ Try all 256 groups

:::


:::teacher-note

**Answer:** Reverse it again

Reversing twice gets back the original. Once the method is known, the scrambling is no protection.

:::


:::keep-together

### The parts of a code

**Match each part of a code with its job.**

A. a secret value the method needs; only the two people know it

B. the steps for scrambling and unscrambling; can be public

C. the message before it is scrambled

D. the scrambled message that travels

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `The method` | |
| `The key` | |
| `The plain text` | |
| `The cipher text` | |

:::


:::teacher-note

**Answer:** The method → B. the steps for scrambling and unscrambling; can be public; The key → A. a secret value the method needs; only the two people know it; The plain text → C. the message before it is scrambled; The cipher text → D. the scrambled message that travels

:::


:::keep-together

### What to protect

**Which is the better rule for a code?**

☐ Keep the method secret and hope

☐ Use a longer method

☐ Send the message twice

☐ Assume the method is known, and keep only the key secret

:::


:::teacher-note

**Answer:** Assume the method is known, and keep only the key secret

Methods leak: they get copied, written down and guessed. A key can be changed in a moment, so the key is what to protect.

:::


:::typical

## Modify

Make the receiver show **HELLO** again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/437a1d7ec922.png?v=d9b2153768c4dbee)

:::

:::


## Make

Invent a scrambling method of your own as two functions, **scramble** and **unscramble**, and send a message through them. Then ask a partner to guess your method from the scrambled text alone. Would it still work once they know it?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://tutorials.learningwaypoints.com/_pictures/makecode/code/92836a4c5272.png?v=6d4de36362a252ec)

:::


## Exit ticket

:::keep-together

**Why is a message that is scrambled with a method everyone knows not private?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Anyone who knows the method can undo it. A code needs a secret key that is separate from the method.

:::

