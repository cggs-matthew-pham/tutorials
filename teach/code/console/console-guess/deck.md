---
marp: true
theme: default
html: true
---

# Guess the number

Console bridge: text in, text out · Keep asking

<!-- Speaker note: Students read a guessing game made of moves they know, find the part that does each job, change one part, and build a dice game from the same pieces. About 35 minutes (Predict and Run 8 min · Investigate 9 min · Modify 8 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read a whole guessing game that uses loops, checks and a counter together, then change it and build a dice game from the same parts.

- I can point to the lines that do each job in a longer program.
- I can change one part of a program without breaking the rest.
- I can build a new loop from parts I know.

---

## Why it matters

> Real programs are longer than a few lines. The skill is to find the part that does a job, then change just that part.

<!-- Speaker note: This program uses only what you already know: `input`, `while`, a check, `+=` and `if` / `elif` / `else`. It is longer, so the skill now is **reading**: finding which part does which job, and how the parts depend on each other. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
secret = 7
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

**The secret is 7. You type 10, then 3, then 7. What number does the last line show?**

<!-- Speaker note: What happens: 3. tries starts at 1. The wrong guess 10 is followed by one more try, so tries is 2, then the wrong guess 3 makes it 3. 7 is right, so the loop ends and the program shows Got it in 3 tries! Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students read the program and work out the count by hand before running. -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Read it like a computer <span style="font-size:.6em;color:#64748b">(4 min)</span>

Read the program with your partner. One of you says each line aloud; the other keeps the value of tries on paper.

<!-- Speaker note: Count before anyone runs it. The common slip is forgetting tries starts at 1. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=secret+%3D+7%0Aguess+%3D+input%28%22Guess+a+number+from+1+to+20%3A+%22%29%0Atries+%3D+1%0Awhile+guess+%21%3D+str%28secret%29%3A%0A++++if+guess.isdigit%28%29+%3D%3D+False%3A%0A++++++++print%28%22Type+a+whole+number.%22%29%0A++++elif+int%28guess%29+%3C+secret%3A%0A++++++++print%28%22Too+low.%22%29%0A++++else%3A%0A++++++++print%28%22Too+high.%22%29%0A++++guess+%3D+input%28%22Try+again%3A+%22%29%0A++++tries+%2B%3D+1%0Aprint%28%22Got+it+in+%22+%2B+str%28tries%29+%2B+%22+tries%21%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-guess/?full=step-2#step-2)

<!-- Speaker note: Run it with 10, 3, 7. The secret is fixed at 7 for now, so you can follow it. Watch for which part of the program runs after each guess. Students should be able to say: I can point to the line that ends the loop and the line that counts the tries. -->

<!-- Speaker note: Teacher: run with 10, 3, 7. Ask which line ended the loop. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 3. tries starts at 1. The wrong guess 10 is followed by one more try, so tries is 2, then the wrong guess 3 makes it 3. 7 is right, so the loop ends and the program shows Got it in 3 tries!

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
import random

secret = random.randint(1, 20)
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

<!-- Speaker note: What this step is for: A longer program is made of parts that each do one job. Find the part, see what it depends on, and you can change it without breaking the rest. -->

<!-- Speaker note: Teacher: the match task is the key. Ask which part would you change to make the game harder? -->

<style scoped>pre, marp-pre { font-size: 0.68em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
import random

secret = random.randint(1, 20)
guess = input("Guess a number from 1 to 20: ")
tries = 1
while guess != str(secret):
    if guess.isdigit() == False:
        print("Type a whole number.")
    elif int(guess) < secret:
        print("Too low.")
    else:
        print("Too high.")
    guess = input("Try again: ")
    tries += 1
print("Got it in " + str(tries) + " tries!")
```

</div>
<div>

**Match each part of the program with its job.**

| | |
|---|---|
| `secret = random.randint(1, 20)` | A. keeps asking until the guess is the secret |
| `while guess != str(secret):` | B. counts every guess |
| `elif int(guess) < secret:` | C. tells the player the guess was too low |
| `tries += 1` | D. the computer picks a secret number |

* Answer: secret = random.randint(1, 20) → D. the computer picks a secret number; while guess != str(secret): → A. keeps asking until the guess is the secret; elif int(guess) &lt; secret: → C. tells the player the guess was too low; tries += 1 → B. counts every guess

</div>
</div>

<!-- Speaker note: The loop is the engine: it repeats the check, the hint, the new question and the count until the guess is right. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**With this version the program always says Got it in 2 tries, however many guesses it took. Click the wrong line.**

```
 1  secret = 7
 2  guess = input("Guess a number from 1 to 20: ")
 3  tries = 1
 4  while guess != str(secret):
 5      if guess.isdigit() == False:
 6          print("Type a whole number.")
 7      elif int(guess) < secret:
 8          print("Too low.")
 9      else:
10          print("Too high.")
11      guess = input("Try again: ")
12  tries += 1
13  print("Got it in " + str(tries) + " tries!")
```

* Answer: line 12

<!-- Speaker note: tries += 1 is not indented, so it runs once after the loop, not on every guess. Indent it so it runs on every pass. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change the game one step at a time. Run after each change.

- **A bigger range:** Pick the secret from 1 to 100.
- **Only five tries:** Stop after five wrong guesses and show the secret.

<!-- Speaker note: What this step is for: Change one part at a time and run after each change; the rest of the program should keep working. Hints, in order: Which line decides how big the secret can be? / Change the second number in randint. / The loop keeps going while the guess is wrong AND tries is under 5. / After the loop, use an if to say either Got it or reveal the secret. For students who need more support: Give the dice program with the loop condition missing and ask for it. For early finishers: Add a 'warm' hint when the guess is within 3 of the secret. The hard part, on purpose: Holding the whole program in mind. Split it into jobs and trace one pass. When students get stuck: The loop ends at once or never. Ask: What does the condition say, and what changes it? Fix: Trace the first two passes with the typed answers. / A TypeError comparing text with a number. Ask: Which side is text and which is a number? Fix: guess is text. Use int(guess) to compare it with the secret, or str(secret) to compare as text. -->

<!-- Speaker note: Teacher: encourage one change and a run at a time, and ask what each change affected. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=import+random%0A%0Asecret+%3D+random.randint%281%2C+20%29%0Aguess+%3D+input%28%22Guess+a+number+from+1+to+20%3A+%22%29%0Atries+%3D+1%0Awhile+guess+%21%3D+str%28secret%29%3A%0A++++if+guess.isdigit%28%29+%3D%3D+False%3A%0A++++++++print%28%22Type+a+whole+number.%22%29%0A++++elif+int%28guess%29+%3C+secret%3A%0A++++++++print%28%22Too+low.%22%29%0A++++else%3A%0A++++++++print%28%22Too+high.%22%29%0A++++guess+%3D+input%28%22Try+again%3A+%22%29%0A++++tries+%2B%3D+1%0Aprint%28%22Got+it+in+%22+%2B+str%28tries%29+%2B+%22+tries%21%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-guess/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a dice game with the same parts. The computer rolls a dice (a random number from 1 to 6) again and again until it gets a six, then prints how many rolls it took.

<!-- Speaker note: Hints, in order: Roll once before the loop. The loop keeps going while the roll is not 6. / Inside the loop roll again and add 1 to the count. -->

<!-- Speaker note: Teacher: the dice game is the same shape as the guessing game with the check removed. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Dice+game%3A+roll+until+a+six+comes+up%2C+and+count+the+rolls.%0Aimport+random%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-guess/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Which line in the guessing game makes it ask again, and which line counts the guesses?**

* guess = input("Try again: ") asks again, and tries += 1 counts.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: a menu that keeps showing until the person chooses to quit. -->
