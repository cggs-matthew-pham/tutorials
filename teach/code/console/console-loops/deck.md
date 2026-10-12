---
marp: true
theme: default
html: true
---

# Keep asking

Console bridge: text in, text out · Loops and menus

<!-- Speaker note: Students meet while, a loop that repeats until its question is no longer true, through a guess-the-number game, then count tries with += and keep a running total. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** repeat with while until something is true, count with +=, and keep a running total.

- I can use while to repeat until something becomes true.
- I can explain what makes a while loop stop, and why a loop runs for ever.
- I can keep a count or a running total with +=.

<!-- Speaker note: Before class: Read the unit primer first. `while guess != secret:` asks a question before every lap; `!=` means "is not equal to". The loop stops only when something inside it changes the answer, here the new guess. `tries += 1` is short for `tries = tries + 1` (students know the long form from the turtle course). The bug task is a loop that never ends: `total + points` works out a sum but throws it away. In the playground, **Stop** ends a runaway loop. `import random` and `random.randint(1, 20)` are the recipe students copied in Catch the turtle. Teacher: Bug task: ask what total + points does with its answer. Nothing stores it. -->

---

## Why it matters

> A PIN pad lets you try again, a game keeps going until you win, and a till keeps adding until you pay: all of them are loops that run until something changes.

<!-- Speaker note: A `for` loop in the turtle course repeated a fixed number of times. Sometimes a program cannot know how many times in advance: keep asking until the guess is right, or until the total reaches 100. That is a `while` loop. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
secret = 7
guess = 0
while guess != secret:
    guess = int(input("Guess my number: "))
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it!")
```

**The secret is 7. You guess 10, then 3, then 7. How many times does the program ask for a guess?**

<!-- Speaker note: What happens: 3 times. After 10 and 3 the guess is still not 7, so the loop asks again. After 7 the question guess != secret is False, so the loop stops and Got it! is printed. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: act it out. One student holds the secret, another guesses; the class says the while question aloud before each guess. -->

<style scoped>pre, marp-pre { font-size: 0.82em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=import+random%0A%0Asecret+%3D+random.randint%281%2C+20%29%0Aguess+%3D+0%0Atries+%3D+0%0Awhile+guess+%21%3D+secret%3A%0A++++guess+%3D+int%28input%28%22Guess+a+number+from+1+to+20%3A+%22%29%29%0A++++tries+%2B%3D+1%0A++++if+guess+%3C+secret%3A%0A++++++++print%28%22Higher%22%29%0A++++elif+guess+%3E+secret%3A%0A++++++++print%28%22Lower%22%29%0Aprint%28%22Got+it+in+%22+%2B+str%28tries%29+%2B+%22+tries%21%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-loops/?full=step-2#step-2)

<!-- Speaker note: This version picks a random secret from 1 to 20 and counts your tries. Play it a few times. What is the smallest number of guesses that always works? Students should be able to say: I can explain why the loop stops when I guess the number. -->

<!-- Speaker note: Teacher: ask for the smallest number of guesses that always works for 1 to 20 (five, by halving). It is a good lead into searching algorithms. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 3 times. After 10 and 3 the guess is still not 7, so the loop asks again. After 7 the question guess != secret is False, so the loop stops and Got it! is printed.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import random

secret = random.randint(1, 20)
guess = 0
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 20: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it in " + str(tries) + " tries!")
```

<!-- Speaker note: `tries += 1` is short for `tries = tries + 1`: add one to what is stored. Python reads `while` as a question asked again before every lap. What this step is for: A while loop stops only when something inside it changes the answer to its question; += keeps a count or a total as it goes. -->

<!-- Speaker note: Teacher: the guess = 0 question matters. Remove the line in the playground and show the NameError. -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace a game

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import random

secret = random.randint(1, 20)
guess = 0
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 20: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it in " + str(tries) + " tries!")
```

</div>
<div>

**The secret is 12. Fill in what happens after each guess.**

| guess | tries | prints | loop again? |
|---|---|---|---|
| 5 | 1 | Higher | yes |
| 15 | ? | ? | ? |
| 12 | ? | ? | ? |

* Answer: 2, Lower, yes, 3, Got it in 3 tries!, no

</div>
</div>

<!-- Speaker note: tries += 1 adds one each lap. After 12, guess != secret is False, so the loop stops and the line after it runs. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why guess = 0?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import random

secret = random.randint(1, 20)
guess = 0
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 20: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it in " + str(tries) + " tries!")
```

</div>
<div>

**Why does the program set guess = 0 before the loop?**

- So while has a guess to compare the first time it asks
- Because the secret is 0
- To make the game harder
- It does nothing: the line could go

* Answer: So while has a guess to compare the first time it asks

</div>
</div>

<!-- Speaker note: while asks its question before the first lap, so guess needs a value already. 0 can never be the secret, so the loop always runs at least once. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should stop once the total reaches 100, but it keeps asking for ever, even after 60 and 50. Click the line that causes it.**

```
 1  total = 0
 2  while total < 100:
 3      points = int(input("Points scored: "))
 4      total + points
 5  print("You reached " + str(total) + " points!")
```

* Answer: line 4

<!-- Speaker note: total + points works out a sum but does not store it, so total stays 0 and total < 100 is always True. total += points (or total = total + points) changes it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A harder game:** Pick the secret from **1 to 100**.
- **Five tries only:** Stop after **5 tries**. If the player runs out, print the secret.

<!-- Speaker note: What this step is for: The loop's question decides when the game ends; joining two conditions with and lets it end for two reasons. Hints, in order: Change randint(1, 20) and the question in the input line. / Add a second question to the while line with and: keep going while the guess is wrong and tries < 5. / After the loop, use if guess == secret to print the win message, else print the secret. For students who need more support: Give students the first two lines of the points counter (total = 0, count = 0) and the while line, and ask them to fill in the loop body and the print after it. For early finishers: Make the guessing game tell the player when they are within 3 of the secret ("Very close!"). The hard part, on purpose: A while loop that never stops. Ask which line changes what the question tests, and have them trace two rounds on paper before changing anything. When students get stuck: The program keeps asking for ever. Ask: Which line changes the value the while question tests? Fix: Store the change (+= or x = x + ...), and check the question can become False. / NameError on the while line. Ask: Does the variable have a value before the loop asks about it? Fix: Give it a starting value before the while line, one that keeps the loop running the first time. / The 0 that should stop the counter is added or counted. Ask: When does the program check for 0, before or after adding? Fix: Only add when the points are not 0 (an if inside the loop), or check before adding. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=import+random%0A%0Asecret+%3D+random.randint%281%2C+20%29%0Aguess+%3D+0%0Atries+%3D+0%0Awhile+guess+%21%3D+secret%3A%0A++++guess+%3D+int%28input%28%22Guess+a+number+from+1+to+20%3A+%22%29%29%0A++++tries+%2B%3D+1%0A++++if+guess+%3C+secret%3A%0A++++++++print%28%22Higher%22%29%0A++++elif+guess+%3E+secret%3A%0A++++++++print%28%22Lower%22%29%0Aprint%28%22Got+it+in+%22+%2B+str%28tries%29+%2B+%22+tries%21%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-loops/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a points counter

Write a **points counter** for a game or a sports day. It keeps asking for points until someone types `0`, adding each score to a total. Then it prints the total and how many scores were added, such as `Total: 23 from 4 scores.`

<!-- Speaker note: What this step is for: A running total is the same pattern as the guessing game: a while loop, a value that changes each lap, and a line after the loop. -->

<!-- Speaker note: Teacher: points must start at a value that is not 0, or the loop never runs. Let students discover this, then ask why. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a points counter

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=%23+Points+counter%3A+keep+asking+for+points+until+0+is+typed.%0A%23+Then+print+the+total+and+how+many+scores+were+added.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-loops/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Loops that wait for the right answer are everywhere: PIN pads, game loops, and programs that keep asking until the input is valid. Next lesson puts a whole menu inside a loop that runs until you choose to quit.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**n = 1. while n &lt; 20: n = n * 2. What is n when the loop stops?**

* 32. n goes 1, 2, 4, 8, 16, 32; at 32 the question n &lt; 20 is False, so the loop stops.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson puts a whole menu inside while True and leaves it with break, then tests the app against a table of cases. Guessing by halving is the idea behind binary search, which comes back in algorithms. -->
