---
marp: true
theme: default
html: true
---

# Scrambling is not a secret

Secret messages · Messages in the air

<!-- Speaker note: Students send a reversed message, see that anyone who knows the method can undo it, and meet the idea of a public method with a secret key. About 40 minutes (Predict and Run 7 min · Investigate 10 min · Modify 6 min · Make 15 min). -->

---

## Today

**We are learning to** a scrambling method works only while nobody knows the method. A real code has a public method and a secret key.

- I can write a function that scrambles text and one that unscrambles it.
- I can explain why a secret method is not enough.
- I can name the parts of a code: method, key, plain text and cipher text.

<!-- Speaker note: Before class: **The idea:** a **cipher** is a method for scrambling a message. If the method is the only secret, everything is lost the moment someone learns it. Real ciphers have a public method and a secret **key**; Caesar's cipher, next, is the smallest example. **Vocabulary:** plain text (before), cipher text (after), method (steps), key (the secret value). Use them every time from now on. **Code:** this lesson teaches the code every later cipher is built from. Foundations functions were named jobs with nothing in or out; `reverse(text)` takes a **parameter** and **returns** a text. The **for index** loop visits each place 0 to length − 1, and `text.charAt(i)` is the letter at place i (counted from 0, like a list). The Investigate trace task (result after i = 0 and 1) checks students can follow it; spend time here, because Caesar, Checksum and the CTF reuse the same shape. -->

---

## Why it matters

> A message written backwards looks secret for about ten seconds. The question is what makes a code truly hard to read, and the answer is not hiding the method.

<!-- Speaker note: A first idea for privacy is to **scramble** the message before sending it. The micro:bit below reverses the text with a **function** (a named job, from micro:bit Foundations). `HELLO` goes out as `OLLEH`. **Behind the code:** in micro:bit Foundations a function was a named job. This one, **reverse**, also takes a value **in** and hands one **back**: - `reverse("HELLO")` hands `"HELLO"` to the function, which calls it `text`. A value handed in like this is a **parameter**. - **return** hands the answer back, so `reverse("HELLO")` can go anywhere a text can, such as inside **send string**. Inside, a **for index** loop (in **Loops**) visits each place in the text, from 0 up to its length − 1. `text.charAt(i)` is the letter at place `i`, counted from 0 like a list. `result` starts empty, and each time round the next letter is joined on at the **front**, so the text comes out backwards. Every cipher in this course is built this way: a function that walks through a message letter by letter and returns a new one. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/729710904559.png?v=5238f238b68b6afc)

**A is pressed. What does the other micro:bit show?**

- H
- HELLO
- OLLEH
- Nothing

<!-- Speaker note: What happens: OLLEH. The receiver shows exactly what the radio carried, and the radio carried the reversed text. The receiver never undoes it. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students expect HELLO. Ask: where in the program is the reversing undone? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* OLLEH. The receiver shows exactly what the radio carried, and the radio carried the reversed text. The receiver never undoes it.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/microbit-security/scramble/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/microbit-security/scramble/?full=step-2#step-2)

<!-- Speaker note: Students should be able to say: I ran it and saw OLLEH on the receiver. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/729710904559.png?v=5238f238b68b6afc)

<!-- Speaker note: What this step is for: Scrambling with a method everyone knows hides nothing from someone who knows the method. A code needs a secret, and the secret must be separate from the method. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inside reverse

**In reverse("HELLO"), what is result after the loop has run for i = 0 and then i = 1?**

- H
- HE
- EH
- OL

* Answer: EH

<!-- Speaker note: At i = 0 the letter at place 0, H, is joined in front of the empty result: H. At i = 1, E is joined in front: EH. Each new letter goes on the front, so the order flips. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Undoing it

**Sam knows the sender reverses every message. A message arrives: OLLEH. What does Sam do to read it?**

- Reverse it again
- Nothing: it is secret
- Ask the sender to send it twice
- Try all 256 groups

* Answer: Reverse it again

<!-- Speaker note: Reversing twice gets back the original. Once the method is known, the scrambling is no protection. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The parts of a code

**Match each part of a code with its job.**

| | |
|---|---|
| `The method` | A. a secret value the method needs; only the two people know it |
| `The key` | B. the steps for scrambling and unscrambling; can be public |
| `The plain text` | C. the message before it is scrambled |
| `The cipher text` | D. the scrambled message that travels |

* Answer: The method → B. the steps for scrambling and unscrambling; can be public; The key → A. a secret value the method needs; only the two people know it; The plain text → C. the message before it is scrambled; The cipher text → D. the scrambled message that travels

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What to protect

**Which is the better rule for a code?**

- Keep the method secret and hope
- Use a longer method
- Send the message twice
- Assume the method is known, and keep only the key secret

* Answer: Assume the method is known, and keep only the key secret

<!-- Speaker note: Methods leak: they get copied, written down and guessed. A key can be changed in a moment, so the key is what to protect. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Make the receiver show **HELLO** again.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-security/scramble/?full=step-4#step-4)

<!-- Speaker note: What this step is for: The receiver must undo the sender's scrambling, using the same function. Hints, in order: In on radio received string, show reverse(received string). For students who need more support: Give scramble complete and ask only for unscramble. For early finishers: Make the scrambler swap each pair of letters (HELLO → EHLLO). The hard part, on purpose: A method everyone knows hides nothing. Ask what a listener who knows the method would need to read the message. When students get stuck: The receiver shows OLLEH. Ask: Where does the receiver undo the reversing? Fix: Show reverse(received string) instead of received string. / The text comes out shorter or longer than expected in unscramble. Ask: Which letters does unscramble keep? Fix: Loop i up to half the length, and join the letter at place i × 2. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Invent a scrambling method of your own as two functions, **scramble** and **unscramble**, and send a message through them. Then ask a partner to guess your method from the scrambled text alone. Would it still work once they know it?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/microbit-security/scramble/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: scramble: start with an empty result, and loop through the places like reverse does. Join each letter and then an X onto the end (MEET becomes MXEXEXTX). Return the result. / unscramble: the real letters sit at places 0, 2, 4 and so on. Loop i from 0 up to half the length, and join on the letter at place i × 2. -->

<!-- Speaker note: Teacher: let pairs swap and guess. The point is that a guess at the method is cheap. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why is a message that is scrambled with a method everyone knows not private?**

* Anyone who knows the method can undo it. A code needs a secret key that is separate from the method.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: a code with a key, the Caesar cipher. -->
