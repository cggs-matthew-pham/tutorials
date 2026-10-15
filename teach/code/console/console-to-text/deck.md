---
marp: true
theme: default
html: true
---

# Numbers into text

Console bridge: text in, text out · Text in, text out

<!-- Speaker note: Students learn why a number cannot be joined onto text with + and fix it with str. About 30 minutes (Predict and Run 8 min · Investigate 8 min · Modify 5 min · Mix it up 3 min · Make 8 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** join a number onto text by turning it into text first with str.

- I can say why "Score: " + 5 fails.
- I can use str to join a number onto text.
- I can build a line from text, a name and a calculated number.

---

## Why it matters

> Scores, prices, countdowns and receipts all mix words with numbers. Python will not guess how to join them, so you tell it.

<!-- Speaker note: Last lesson the program joined text it was given. Now it will join a **number** onto text, such as `Score: 5`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
score = 5
print("Score: " + score)
```

**What happens when you run it?**

- It stops with an error on line 2
- It shows Score: score
- It shows Score: with the 5 added on a new line
- It shows Score: 5

<!-- Speaker note: What happens: It stops with an error on line 2. + joins text to text. score holds a number, and Python will not guess how to join a number onto text. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show the failing program and vote. Many students expect it to work, and that is the point. Then ask what + was designed to join. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=score+%3D+5%0Aprint%28%22Score%3A+%22+%2B+score%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-to-text/?full=step-2#step-2)

<!-- Speaker note: Run it and read the message. Then change line 2 to `print("Score: " + str(score))` and run it again. | Line | What it does | Why | |---|---|---| | `score = 5` | Stores the number 5 | No quotes, so it is a number, not text | | `"Score: " + score` | Fails | `+` joins text to text, or adds number to number. It will not mix them | | `str(score)` | Gives back the text "5" | `str` makes a text copy of the number. `score` itself stays a number | -->

<!-- Speaker note: Teacher: read the friendly error together, then fix it with str. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It stops with an error on line 2. + joins text to text. score holds a number, and Python will not guess how to join a number onto text.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
score = 5
print("Score: " + str(score))
print("Score: " + str(score + 1))
print(score + score)
print(str(score) + str(score))
```

<!-- Speaker note: What this step is for: str makes a text copy of a number. The copy joins with +; the original is unchanged. -->

<!-- Speaker note: Teacher: score + score and str(score) + str(score) look alike but give 10 and 55. This prepares for typed numbers next lesson. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the lines

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
score = 5
print("Score: " + str(score))
print("Score: " + str(score + 1))
print(score + score)
print(str(score) + str(score))
```

</div>
<div>

**Fill in what each line shows.**

| line | shows |
|---|---|
| print("Score: " + str(score)) | Score: 5 |
| print("Score: " + str(score + 1)) | ? |
| print(score + score) | ? |
| print(str(score) + str(score)) | ? |

* Answer: Score: 6, 10, 55

</div>
</div>

<!-- Speaker note: score + score adds two numbers: 10. str(score) + str(score) joins two pieces of text: 55. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should show Lives: 3, but stops with an error. Click the line that still has the problem.**

```
 1  lives = 3
 2  str(lives)
 3  print("Lives: " + lives)
```

* Answer: line 3

<!-- Speaker note: str(lives) on its own line makes a text copy and throws it away. lives is still a number. Put the str right where it is joined: "Lives: " + str(lives). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change the program so it also prints how many letters the name has.

<!-- Speaker note: What this step is for: Anything that works out to a number can go inside str, including a calculation. Hints, in order: len(name) gives the number of letters. It is a number, so it needs str. For students who need more support: Give the line with the numbers joined and ask which pieces need str. For early finishers: Print a receipt with a count, a price each, a total and a tip. The hard part, on purpose: Remembering which pieces are numbers. Ask which piece has no quotes and works out to a number. When students get stuck: An error that mentions joining a number onto text. Ask: Which piece of the line is a number? Fix: Put str( ) around that piece only. / str( ) on its own line does nothing. Ask: Where does the text copy go? Fix: str makes a copy. Use it where the number is joined onto text. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=name+%3D+input%28%22What+is+your+name%3F+%22%29%0Aprint%28%22Hello%2C+%22+%2B+name%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-to-text/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```python
name = input("What is your name? ")
count = len(name)
print(name + " has " + str(count) + " letters.")
```

<!-- Speaker note: Mix of the last two lessons: the answer is stored, a number is worked out from it, and the number is turned into text. What this step is for: Ask, store, calculate, convert, print: each move does one job. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
name = input("What is your name? ")
count = len(name)
print(name + " has " + str(count) + " letters.")
```

</div>
<div>

**The person types Maria. What does the program print?**

- Maria has 5 letters.
- Maria has 5 letters
- Maria has count letters.
- It stops with an error

* Answer: Maria has 5 letters.

</div>
</div>

<!-- Speaker note: len(name) is 5, str(count) is the text 5, and the three pieces join into one line. What this step is for: Ask, store, calculate, convert, print: each move does one job. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

A café sells cups of hot chocolate. Write a receipt: store the number of cups and the price, work out the total, and print a line such as `3 cups cost $12`.

<!-- Speaker note: Hints, in order: Work out the total first: total = cups * price. Then turn it into text in the print line. / Each number joined onto text needs its own str(). -->

<!-- Speaker note: Teacher: students choose their own receipt. Ask each to point to every str in their program. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Hot+chocolate+receipt%3A+store+cups+and+price%2C+work+out+the+total%2C+print+a+line.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-to-text/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Spot the number <span style="font-size:.6em;color:#64748b">(3 min)</span>

Look at a partner's receipt. Point to each number that was turned into text and say why.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**score = 5. Which prints Score: 5, and why: A) print("Score: " + score)  B) print("Score: " + str(score))?**

* B. + will not join text and a number. str makes the number into text.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: what input gives back is text, even digits, so adding two typed numbers needs a conversion the other way. -->
