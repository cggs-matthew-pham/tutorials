---
marp: true
theme: default
html: true
---

# Check first

Console bridge: text in, text out · Numbers from text

<!-- Speaker note: Students learn to check typed text with isdigit before converting it, so a typo gets a reply, not a crash. About 30 minutes (Predict and Run 8 min · Investigate 8 min · Modify 5 min · Mix it up 3 min · Make 8 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** ask the typed text whether it is all digits with isdigit, and use an if to choose, so a typo gets an answer instead of a crash.

- I can use isdigit to check typed text before turning it into a number.
- I can say why the check goes before the conversion.
- I can write a program that replies politely to a typo.

---

## Why it matters

> Type a word into a quantity box and a good app says so politely. A careless one crashes. The difference is one question asked before the number is used.

<!-- Speaker note: Last lesson `int()` turned typed digits into a number. But `int("twelve")` stops the program with an error. A careful program **checks first**, and chooses what to do. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number.")
```

**You run it and type twelve. What happens?**

- It prints Please type your age as a number.
- It prints Next year you will be 13.
- It stops with an error on the int line
- It prints nothing at all

<!-- Speaker note: What happens: It prints Please type your age as a number. The if asks whether the text is all digits first. twelve is not, so the else path runs, and int is never reached. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a vote before running. The wrong options are three real beliefs: int reads words, the crash happens anyway, and nothing happens. Ask the 'error' voters what they think isdigit does, and the '13' voters whether Python can read words. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=text+%3D+input%28%22How+old+are+you%3F+%22%29%0Aif+text.isdigit%28%29%3A%0A++++age+%3D+int%28text%29%0A++++print%28%22Next+year+you+will+be+%22+%2B+str%28age+%2B+1%29+%2B+%22.%22%29%0Aelse%3A%0A++++print%28%22Please+type+your+age+as+a+number.%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-check/?full=step-2#step-2)

<!-- Speaker note: Run it three times: with `12`, with `twelve`, and with `-3`. | Line | What it does | Why | |---|---|---| | `if text.isdigit():` | Asks the text: are you made only of digits? | The dot means "ask this text". The answer is `True` or `False`, which an `if` can use | | `age = int(text)` | Turns the text into a number | Only runs when the check said yes, so it cannot fail | | `else:` | Runs when the check said no | The person gets a reply instead of a crash | A minus sign is not a digit, so `-3` fails the check. That suits an age. -->

<!-- Speaker note: Teacher: run with 12, twelve and -3. Ask which path each took. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It prints Please type your age as a number. The if asks whether the text is all digits first. twelve is not, so the else path runs, and int is never reached.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number.")
```

<!-- Speaker note: What this step is for: The check goes before the conversion. Asking first is what stops the crash. -->

<!-- Speaker note: Teacher: the bug is about order. Ask a student to say what the program does first. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the check

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number.")
```

</div>
<div>

**For each answer typed, fill in what text.isdigit() gives and what the program prints.**

| typed | text.isdigit() | prints |
|---|---|---|
| 12 | True | Next year you will be 13. |
| twelve | ? | ? |
| 9 | ? | ? |
| 4.5 | ? | ? |

* Answer: False, Please type your age as a number., True, Next year you will be 10., False, Please type your age as a number.

</div>
</div>

<!-- Speaker note: isdigit() is True only when every character is a digit from 0 to 9. A full stop is not a digit, so 4.5 fails too. -->

<style scoped>section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The program has a check, but typing twelve still crashes it. Click the line that is in the wrong place.**

```
 1  text = input("How old are you? ")
 2  age = int(text)
 3  if text.isdigit():
 4      print("Next year you will be " + str(age + 1) + ".")
 5  else:
 6      print("Please type your age as a number.")
```

* Answer: line 2

<!-- Speaker note: int(text) runs on line 2, before the check on line 3, so the crash happens before the program has asked. The conversion has to go inside the if. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change the program so it asks for **two** numbers, checks both, and prints their total. If either answer is not a number, print a message instead.

<!-- Speaker note: What this step is for: Two checks joined with and: the if runs only when both are true. Hints, in order: Ask for two answers, store them as text, and check both: first.isdigit() and second.isdigit(). / Inside the if, convert each with int and print the total. For students who need more support: Give the if / else with the middle lines missing and ask the student to complete them. For early finishers: What does the check say for an empty answer? Try it and fix the message. The hard part, on purpose: Putting the conversion before the check. Ask which line runs first. When students get stuck: The program still crashes on a word. Ask: Is int( ) inside the if, or before it? Fix: Store the text first, check it, and convert only inside the if. / A NameError for age or number in the else path. Ask: Where is that name made, and does the else path reach it? Fix: Names made inside the if exist only on that path. The else path should only use the text. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=text+%3D+input%28%22How+old+are+you%3F+%22%29%0Aif+text.isdigit%28%29%3A%0A++++age+%3D+int%28text%29%0A++++print%28%22Next+year+you+will+be+%22+%2B+str%28age+%2B+1%29+%2B+%22.%22%29%0Aelse%3A%0A++++print%28%22Please+type+your+age+as+a+number.%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-check/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```python
text = input("How many tickets? ")
if text.isdigit():
    print("That will be $" + str(int(text) * 12) + ".")
else:
    print("Please type a number.")
```

<!-- Speaker note: This mixes the last lesson and `if`: a typed number, converted, and used. What this step is for: isdigit checks the shape of the text, not whether the answer makes sense. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
text = input("How many tickets? ")
if text.isdigit():
    print("That will be $" + str(int(text) * 12) + ".")
else:
    print("Please type a number.")
```

</div>
<div>

**The person types 0. What does the program print?**

- Please type a number.
- That will be $0.
- It stops with an error

* Answer: That will be $0.

</div>
</div>

<!-- Speaker note: isdigit is True for 0, so the program calculates 0 tickets at $12, which is $0. The check only asks whether the text is all digits. What this step is for: isdigit checks the shape of the text, not whether the answer makes sense. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets, checks the answer is a number, and prints the total, such as `That will be $36.` If the answer is not a number, it prints a helpful message. Test it with 3, with 0 and with `three`.

<!-- Speaker note: Hints, in order: Store the answer as text first, then check it, then convert it inside the if. / Put the cost calculation inside the if, and a helpful message in the else. -->

<!-- Speaker note: Teacher: students test with a number, zero and a word. Ask them to try something to break it (the empty answer, a space). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Ticket+machine%3A+tickets+cost+%2412+each.%0A%23+Ask+how+many+tickets%2C+check+the+answer+is+a+number%2C+then+print+the+total+cost.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-check/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Break my machine <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap seats and try to crash your partner's ticket machine with unusual answers. Can you find one?

<!-- Speaker note: Empty answers, spaces, negative numbers and decimals are all good tries. Ask what the check says for each. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the check go before int, and what does text.isdigit() give?**

* int stops the program on text that is not digits, so the program asks first. isdigit gives True or False.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: instead of ending after one bad answer, the program keeps asking until it gets a good one. -->
