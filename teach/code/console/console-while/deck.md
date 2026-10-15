---
marp: true
theme: default
html: true
---

# Repeat until

Console bridge: text in, text out · Keep asking

<!-- Speaker note: Students meet while, a loop that keeps going for as long as a condition is true, and use it to keep asking until the answer is right. About 35 minutes (Predict and Run 9 min · Investigate 10 min · Modify 4 min · Mix it up 3 min · Make 9 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep running lines with while for as long as a condition is true, so a program can keep asking until it gets what it needs.

- I can use while to repeat lines until a condition is false.
- I can say what makes a loop stop.
- I can write a loop that keeps asking until the answer is right.

---

## Why it matters

> A PIN pad lets you try again, a game keeps going until you win, and a form keeps asking until the answer is valid. All of them repeat until something changes.

<!-- Speaker note: So far every program ran from the top to the bottom once. A `for` loop repeats a set number of times. A **`while`** loop repeats for as long as a condition stays true, so a program can keep asking until it gets what it needs. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
word = input("Type quit to stop: ")
while word != "quit":
    print("You typed " + word)
    word = input("Type quit to stop: ")
print("Bye")
```

**You type hi, then yo, then quit. What does the program show?**

- You typed hi, then You typed yo, then You typed quit, then Bye
- It asks once and stops
- Bye only
- You typed hi, then You typed yo, then Bye

<!-- Speaker note: What happens: You typed hi, then You typed yo, then Bye. The condition is checked before every pass, so once quit is typed the loop body is skipped and quit is never shown. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a vote. The wrong options are two real beliefs: that quit is shown too, and that the loop runs once. Ask what the program checks before showing anything. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=word+%3D+input%28%22Type+quit+to+stop%3A+%22%29%0Awhile+word+%21%3D+%22quit%22%3A%0A++++print%28%22You+typed+%22+%2B+word%29%0A++++word+%3D+input%28%22Type+quit+to+stop%3A+%22%29%0Aprint%28%22Bye%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-while/?full=step-2#step-2)

<!-- Speaker note: Run it and type a few words, then `quit`. | Line | What it does | Why | |---|---|---| | `word = input(...)` | Asks the first time | The loop needs a value to test before it starts | | `while word != "quit":` | Asks: is `word` different from quit? True: run the indented lines, then ask again | The question is asked before every pass | | ` word = input(...)` | Asks again, at the end of every pass | This is what can make the condition false | | `print("Bye")` | Runs once, after the loop | Not indented, so not part of the loop | -->

<!-- Speaker note: Teacher: run it with a few words then quit. Ask: when is the condition checked? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* You typed hi, then You typed yo, then Bye. The condition is checked before every pass, so once quit is typed the loop body is skipped and quit is never shown.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
word = input("Type quit to stop: ")
while word != "quit":
    print("You typed " + word)
    word = input("Type quit to stop: ")
print("Bye")
```

<!-- Speaker note: What this step is for: Something inside the loop must be able to make the condition false, or the loop never ends. -->

<!-- Speaker note: Teacher: the zero-times question is the idea students miss. The bug is a very common slip: the update dedented. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the loop

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
word = input("Type quit to stop: ")
while word != "quit":
    print("You typed " + word)
    word = input("Type quit to stop: ")
print("Bye")
```

</div>
<div>

**Fill in the condition and what the program shows after each word is typed.**

| typed | word != "quit" | shows |
|---|---|---|
| hi | True | You typed hi |
| yo | ? | ? |
| quit | ? | ? |

* Answer: True, You typed yo, False, Bye

</div>
</div>

<!-- Speaker note: The condition is tested after every answer. While it is True the body runs again. When quit is typed it is False, so the body is skipped and the program carries on to Bye. -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Zero times

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
word = input("Type quit to stop: ")
while word != "quit":
    print("You typed " + word)
    word = input("Type quit to stop: ")
print("Bye")
```

</div>
<div>

**The very first word typed is quit. How many times does the indented part of the loop run?**

- Until quit is typed again
- 1 time
- 0 times
- It stops with an error

* Answer: 0 times

</div>
</div>

<!-- Speaker note: while checks first. If the condition is False straight away, the body never runs. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Type hi and the program shows You typed hi again and again and never stops. Click the line that is in the wrong place.**

```
 1  word = input("Type quit to stop: ")
 2  while word != "quit":
 3      print("You typed " + word)
 4  word = input("Type quit to stop: ")
 5  print("Bye")
```

* Answer: line 4

<!-- Speaker note: The line that asks again is not indented, so it is outside the loop. Nothing inside the loop changes word, so the condition stays True for ever. Indent it so it runs on every pass. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Be the loop <span style="font-size:.6em;color:#64748b">(4 min)</span>

One student reads the lines, another is the computer. After every answer the computer asks aloud: is the word different from quit?

<!-- Speaker note: Hearing the condition asked every time makes the check before each pass concrete. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change the program so typing either `quit` or `exit` stops it.

<!-- Speaker note: What this step is for: The condition can join tests with and, and the loop ends when any of them stops being true. Hints, in order: The loop keeps going while the word is not quit AND the word is not exit. / Write while word != "quit" and word != "exit": For students who need more support: Give the loop with the condition missing and ask for the line that sets it. For early finishers: Allow the door to give a hint after every wrong guess. The hard part, on purpose: Seeing that the check happens before every pass. Ask students to say what it asks after the second answer. When students get stuck: The loop never ends. Ask: Which line inside the loop can change the thing the condition tests? Fix: The input line must be inside the loop (indented), so the test sees a new answer each pass. / The loop body never runs. Ask: Is the condition False at the start? Fix: Check the first answer against the condition. A loop only starts when the condition is True. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=word+%3D+input%28%22Type+quit+to+stop%3A+%22%29%0Awhile+word+%21%3D+%22quit%22%3A%0A++++print%28%22You+typed+%22+%2B+word%29%0A++++word+%3D+input%28%22Type+quit+to+stop%3A+%22%29%0Aprint%28%22Bye%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-while/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```python
text = input("Pick a number from 1 to 9: ")
while text.isdigit() == False:
    text = input("Digits only. Try again: ")
print("You picked " + text)
```

<!-- Speaker note: This mixes `while` with the check from last lesson: ask again until the answer is good. What this step is for: A loop can keep asking until a check passes: it uses the check from last lesson as its condition. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
text = input("Pick a number from 1 to 9: ")
while text.isdigit() == False:
    text = input("Digits only. Try again: ")
print("You picked " + text)
```

</div>
<div>

**The person types two, one, then 7. How many times does Digits only appear?**

* Answer: 2

</div>
</div>

<!-- Speaker note: two and one both fail the check, so the loop body runs twice. 7 passes, so the loop ends. What this step is for: A loop can keep asking until a check passes: it uses the check from last lesson as its condition. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Write a password door. Choose a secret word. The program asks for the password, says `Wrong, try again` for every wrong guess, and prints `Welcome in!` when it is right.

<!-- Speaker note: Hints, in order: Ask for the password once before the loop, then ask again inside it. / The condition is: the attempt is not the secret. -->

<!-- Speaker note: Teacher: students choose their own secret. Early finishers add a count of the tries (next lesson). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Password+door%3A+keep+asking+until+the+password+is+right.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-while/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A while loop's condition is already False the first time it is checked. How many times does the body run?**

* Zero times. while checks before every pass, including the first.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the loop keeps a running total, adding to a number on every pass. -->
