---
marp: true
theme: default
html: true
---

# Numbers from text

Console bridge: text in, text out · Text in, text out

<!-- Speaker note: Students find out that input() always gives back text, turn it into a number with int(), and check it first with isdigit() so a typo gets a helpful reply instead of a crash. About 45 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** turn typed text into a number with int(), and check the text first with isdigit() so a typo does not crash the program.

- I can explain why input() gives back text, even when digits are typed.
- I can turn text into a number with int() and calculate with it.
- I can check an answer with isdigit() before turning it into a number.

<!-- Speaker note: Before class: Read the unit primer first. The surprise of the lesson: with no `int()`, typing 5 and 5 prints 55, because both answers are text and `+` joins text. `int("5")` is the number 5. `int("twelve")` stops the program with a ValueError, so programs check the text first: `text.isdigit()` is True only if every character is a digit 0 to 9 (so `-3` and `2.5` are False, which suits ages and ticket counts). The dot in `text.isdigit()` means "ask this text a question"; students met the same dot in `random.randint` in Catch the turtle. Teacher: Bug task: text times a number repeats the text. Python is not wrong; it was given text. -->

---

## Why it matters

> Every app that asks for a quantity, an age or a PIN has to turn what you typed into a number, and cope when you type something else.

<!-- Speaker note: Last lesson, `input()` gave back what was typed. It always gives back **text**, even when the person types digits. To calculate with it, the program has to turn the text into a number, and cope when someone types something that is not a number. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
a = input("First number: ")
b = input("Second number: ")
print(a + b)
```

**You run it and type 5, then 5. What does it print?**

- An error
- 5 + 5
- 55
- 10

<!-- Speaker note: What happens: 55. Both answers are text, "5" and "5", and + joins text, so the result is "55". Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students say 10. Let the 55 land, then ask: what kind of thing does input() give back? -->

<style scoped>pre, marp-pre { font-size: 0.81em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=a+%3D+input%28%22First+number%3A+%22%29%0Ab+%3D+input%28%22Second+number%3A+%22%29%0Aprint%28a+%2B+b%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-numbers/?full=step-2#step-2)

<!-- Speaker note: Run it with 5 and 5. Then change the first two lines to `a = int(input("First number: "))` and `b = int(input("Second number: "))`, and run it again. `int()` turns text made of digits into a whole number, so now `+` adds. Students should be able to say: I can explain why 5 and 5 gave 55, and what int() changes. -->

<!-- Speaker note: Teacher: change both lines to use int() and run again with the same answers. Keep both versions on the board side by side. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 55. Both answers are text, "5" and "5", and + joins text, so the result is "55".

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
    print("Please type your age as a number, such as 12.")
```

<!-- Speaker note: `text.isdigit()` asks the text a question: are all your characters digits? The dot means "ask this text". It gives `True` or `False`, so it fits straight into an `if`. What this step is for: int() only works on text made of digits, so a program checks the text first with isdigit(), and chooses what to do with if and else. -->

<!-- Speaker note: Teacher: do the trace before running. The -3 row surprises students: a minus sign is not a digit. -->

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
    print("Please type your age as a number, such as 12.")
```

</div>
<div>

**For each answer typed, fill in what text.isdigit() gives and what the program prints.**

| typed | text.isdigit() | prints |
|---|---|---|
| 12 | True | Next year you will be 13. |
| twelve | ? | ? |
| 9 | ? | ? |
| -3 | ? | ? |

* Answer: False, Please type your age as a number, such as 12., True, Next year you will be 10., False, Please type your age as a number, such as 12.

</div>
</div>

<!-- Speaker note: isdigit() is True only when every character is a digit from 0 to 9. A minus sign is not a digit, so -3 fails the check too, which suits an age. -->

<style scoped>section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Without the check

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number, such as 12.")
```

</div>
<div>

**What would happen if you removed the if line and typed twelve?**

- It prints 13
- It prints Next year you will be thirteen.
- It prints the else message
- It stops with a ValueError on the int() line

* Answer: It stops with a ValueError on the int() line

</div>
</div>

<!-- Speaker note: int("twelve") cannot turn letters into a number, so the program stops with a ValueError. Checking with isdigit() first lets it reply politely instead. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**A ticket costs $12. You type 3, and it prints That will be $333333333333. Click the line that causes it.**

```
 1  tickets = input("How many tickets? ")
 2  cost = tickets * 12
 3  print("That will be $" + str(cost))
```

* Answer: line 1

<!-- Speaker note: tickets holds the text "3", and text times 12 repeats it 12 times. Turning it into a number first fixes it: tickets = int(input("How many tickets? ")). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Ten years from now:** Also print how old the person will be in ten years.
- **Add two numbers safely:** Replace the program with one that asks for **two** numbers, checks both with `isdigit()`, and prints their total. If either answer is not a number, print a mess

<!-- Speaker note: What this step is for: Once text is a number, it can be used in any calculation; every number that comes from input() needs the same check. Hints, in order: Add a print line inside the if, under the first one, using age + 10. / Start a new program: ask for two answers with input(), and check both with isdigit() joined by and. / Inside the if, add int(first) + int(second) and print the total. For students who need more support: Give students the if and else lines of the ticket machine and ask them to fill in the calculation and the two print lines. For early finishers: Let the ticket machine offer a child price ($8) and an adult price ($12), asking for the number of each, and print the total. The hard part, on purpose: Telling text that looks like a number from a number. Ask what type input() gave back, and let them try int() on a word to see why isdigit() comes first. When students get stuck: ValueError: invalid literal for int() with base 10. Ask: What did you type, and is every character a digit? Fix: Check the text with isdigit() before int(), and reply with a message in the else. / Numbers are joined instead of added, such as 55. Ask: Has the text been turned into a number yet? Fix: Wrap the input in int() (after checking it), then add. / TypeError when printing the result. Ask: Is the number being joined onto text? Fix: Turn the number back into text with str() to join it: "Total: " + str(total). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=text+%3D+input%28%22How+old+are+you%3F+%22%29%0Aif+text.isdigit%28%29%3A%0A++++age+%3D+int%28text%29%0A++++print%28%22Next+year+you+will+be+%22+%2B+str%28age+%2B+1%29+%2B+%22.%22%29%0Aelse%3A%0A++++print%28%22Please+type+your+age+as+a+number%2C+such+as+12.%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-numbers/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a ticket machine

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets, checks the answer is a number, and prints the total cost, such as `That will be $36.` If the answer is not a number, it prints a helpful message instead. Test it with 3, with 0 and with `three`.

<!-- Speaker note: What this step is for: On their own: ask, check, convert, calculate, reply. This is the shape of every input in the course from now on. -->

<!-- Speaker note: Teacher: insist on the three tests (3, 0, three). Testing with a wrong answer on purpose is the habit this lesson builds. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a ticket machine

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=%23+Ticket+machine%3A+tickets+cost+%2412+each.%0A%23+Ask+how+many+tickets%2C+check+the+answer+is+a+number%2C+then+print+the+total+cost.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-numbers/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Checking what people type before using it is called **validation**. Real apps validate every box on a form. Next lesson keeps asking in a loop, so the program can keep going until it gets the answer it needs.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**a = input("Number: ") and you type 7. What does print(a * 2) show, and why?**

* 77. a is the text "7", and text times 2 repeats it. int(a) * 2 would give 14.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson uses while to keep asking, so a program can ask again after a bad answer and keep a running total. Class ideas: a canteen price calculator; a converter for a science practical (minutes to seconds). -->
