---
marp: true
theme: default
html: true
---

# Text into numbers

Console bridge: text in, text out · Numbers from text

<!-- Speaker note: Students learn that input gives back text, and turn it into a number with int. About 30 minutes (Predict and Run 8 min · Investigate 8 min · Modify 4 min · Mix it up 3 min · Make 7 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** what input gives back is always text, so turn it into a number with int before calculating with it.

- I can say that input always gives back text.
- I can turn typed digits into a number with int.
- I can calculate with a typed number and print the result.

---

## Why it matters

> Every app that asks for an age, a quantity or a PIN has to turn what you typed into a number before it can calculate.

<!-- Speaker note: Last lesson you turned a number into text. Typed answers go the other way: they arrive as **text**, even when the person types digits. To calculate with them, the program turns the text into a number. -->

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

<!-- Speaker note: Teacher: the 55 answer surprises many students. Let them argue before running. Ask the 55 voters to explain, then run it. -->

<style scoped>pre, marp-pre { font-size: 0.81em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=a+%3D+input%28%22First+number%3A+%22%29%0Ab+%3D+input%28%22Second+number%3A+%22%29%0Aprint%28a+%2B+b%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-numbers/?full=step-2#step-2)

<!-- Speaker note: Run it with 5 and 5. Then change the first two lines to `a = int(input("First number: "))` and `b = int(input("Second number: "))`, and run it again. | Line | What it does | Why | |---|---|---| | `input("First number: ")` | Gives back the typed answer as text | Typed digits are still text, "5" not 5 | | `int(...)` | Turns text made of digits into a whole number | Now `+` adds instead of joining | | `print(a + b)` | Shows the total | Both are numbers, so there is nothing to convert back to text | -->

<!-- Speaker note: Teacher: run it with 5 and 5, then fix it with int. Ask what changed in the output and why. -->

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
a = input("First number: ")
b = input("Second number: ")
print(a + b)
print(int(a) + int(b))
print(a + " and " + b)
print(int(a) * 2)
```

<!-- Speaker note: What this step is for: Typed text and numbers look the same on screen but behave differently: + joins text and adds numbers. -->

<!-- Speaker note: Teacher: the trace shows the same two answers giving 53 and 8. Ask students to say which lines work with text and which with numbers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the lines

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
a = input("First number: ")
b = input("Second number: ")
print(a + b)
print(int(a) + int(b))
print(a + " and " + b)
print(int(a) * 2)
```

</div>
<div>

**You type 5 for the first answer and 3 for the second. Fill in what each line shows.**

| line | shows |
|---|---|
| print(a + b) | 53 |
| print(int(a) + int(b)) | ? |
| print(a + " and " + b) | ? |
| print(int(a) * 2) | ? |

* Answer: 8, 5 and 3, 10

</div>
</div>

<!-- Speaker note: With a and b as text, a + b joins them: 53. int(a) + int(b) adds the numbers: 8. A number is only needed when the program calculates. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**A ticket costs $12. You type 3, and it prints That will be $333333333333. Click the line that causes it.**

```
 1  tickets = input("How many tickets? ")
 2  cost = tickets * 12
 3  print("That will be $" + str(cost))
```

* Answer: line 2

<!-- Speaker note: tickets holds the text "3", and text times 12 repeats it 12 times. Turn it into a number first: int(tickets) * 12. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

The program asks for an age and says what it will be next year. Change it so it also says what the age will be in ten years.

<!-- Speaker note: What this step is for: Once the text is a number, it works in any calculation. Hints, in order: Add a line under the first print, using age + 10. Remember str for the number. For students who need more support: Give the program with int missing and ask the student where it goes. For early finishers: Ask for two numbers and print their sum, difference and product. The hard part, on purpose: Believing the typed 5 is already a number. Ask whether quotes are around it. When students get stuck: The total is a long repeated string of digits. Ask: What does input give back, a number or text? Fix: Put int( ) around the input line so the answer is stored as a number. / An error when adding a number to text in the print line. Ask: Which piece of the line is a number? Fix: Put str( ) around that piece, as in the last lesson. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=age+%3D+int%28input%28%22How+old+are+you%3F+%22%29%29%0Aprint%28%22Next+year+you+will+be+%22+%2B+str%28age+%2B+1%29+%2B+%22.%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-numbers/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```python
name = input("What is your name? ")
age = int(input("How old are you? "))
print(name + " will be " + str(age + 1) + " next year.")
```

<!-- Speaker note: This mixes the last three lessons: ask and store, text into a number, a number back into text. What this step is for: Two answers, two jobs: one stays text, one becomes a number, and the result goes back to text. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
name = input("What is your name? ")
age = int(input("How old are you? "))
print(name + " will be " + str(age + 1) + " next year.")
```

</div>
<div>

**The person types Sam, then 11. What does the program print?**

- Sam will be 111 next year.
- Sam will be 12 next year.
- Sam will be age + 1 next year.
- It stops with an error

* Answer: Sam will be 12 next year.

</div>
</div>

<!-- Speaker note: name stays text. int makes age the number 11, age + 1 is 12, and str makes the 12 into text so it joins. What this step is for: Two answers, two jobs: one stays text, one becomes a number, and the result goes back to text. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Tickets to the school play cost **$12** each. Write a ticket machine that asks how many tickets and prints the total, such as `That will be $36.` Test it with 3. (Typing a word will stop it for now. Two lessons from now it learns to cope.)

<!-- Speaker note: Hints, in order: tickets = int(input("How many tickets? ")) turns the answer into a number as it is stored. / Work out the total, then use str() to join it onto the text. -->

<!-- Speaker note: Teacher: students use their own price. Ask them to test with a few quantities. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Ticket+machine%3A+tickets+cost+%2412+each.%0A%23+Ask+how+many+tickets%2C+then+print+the+total+cost.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-numbers/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**a = input("?") and the person types 7. What is a + a, and what is int(a) + int(a)?**

* a + a is 77 (text joined). int(a) + int(a) is 14.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: what happens when someone types a word instead of a number, and how a program checks first. -->
