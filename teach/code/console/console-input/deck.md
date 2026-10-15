---
marp: true
theme: default
html: true
---

# Ask and store

Console bridge: text in, text out · Text in, text out

<!-- Speaker note: Students meet input, store the typed answer in a name, and use it in the reply. About 30 minutes (Predict and Run 8 min · Investigate 8 min · Make 14 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** ask a question with input, store the typed answer in a name, and use it in what the program says back.

- I can ask a question with input and store the answer in a name.
- I can use the stored answer in what the program prints.
- I can say that what is typed comes back as text.

---

## Why it matters

> A login box, a quiz question and a chatbot all ask something and then use the answer. The answer has to be stored somewhere first.

<!-- Speaker note: Last lesson the program said the same thing every time. Now it will **ask**, wait for you, and use your answer. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
name = input("What is your name? ")
print("Hello, " + name)
```

**You run it and type Ada. What does the last line show?**

- Hello, Ada
- Nothing: the program has no answer to show
- Hello, name
- Hello, What is your name? 

<!-- Speaker note: What happens: Hello, Ada. input gives back what was typed, and name = stores it. The last line joins Hello, onto whatever name holds, which is Ada. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a vote before running. Wrong options: the name as a word, the prompt stored in the name, no answer at all. Ask one pair from each option to explain: the question is shown, not stored. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=name+%3D+input%28%22What+is+your+name%3F+%22%29%0Aprint%28%22Hello%2C+%22+%2B+name%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-input/?full=step-2#step-2)

<!-- Speaker note: Run it, type an answer in the console and press Enter. Run it again with a different answer. | Line | What it does | Why | |---|---|---| | `name = input("What is your name? ")` | Shows the question, waits for typing, stores the answer in `name` | The words in the brackets are shown to the person. The answer is what they type | | `print("Hello, " + name)` | Joins Hello, onto the stored answer and shows it | `name` has no quotes, so Python uses what it holds | The answer is stored as **text**, whatever is typed. The program is now different every time it runs. -->

<!-- Speaker note: Teacher: students run it several times with different answers. Ask: what changed each time, and what stayed the same? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Hello, Ada. input gives back what was typed, and name = stores it. The last line joins Hello, onto whatever name holds, which is Ada.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
name = input("What is your name? ")
print("Hello, " + name)
```

<!-- Speaker note: What this step is for: input hands back whatever was typed. If you do not store it in a name, it is gone. -->

<!-- Speaker note: Teacher: the bug is a very common first slip. Ask what happened to the typed text. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the answer

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
name = input("What is your name? ")
print("Hello, " + name)
```

</div>
<div>

**Fill in what name holds and what the last line shows for each answer.**

| typed | name holds | last line shows |
|---|---|---|
| Ada | Ada | Hello, Ada |
| Sam | ? | ? |
| 42 | ? | ? |

* Answer: Sam, Hello, Sam, 42, Hello, 42

</div>
</div>

<!-- Speaker note: Whatever is typed is stored as text and shown back as typed, even digits. -->

<style scoped>section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The program asks, but then stops with a NameError on line 2. Click the line that needs to change.**

```
 1  input("What is your name? ")
 2  print("Hello, " + name)
```

* Answer: line 1

<!-- Speaker note: The answer was typed but not stored: no name catches it. name = input(...) puts the answer in name. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Write a program that asks **two** questions (for example a name and a favourite animal) and prints one sentence that uses both answers.

<!-- Speaker note: Hints, in order: Store each answer under its own name: one input line per question. / Use both names in the final print, with + between the pieces and spaces inside the quotes. For students who need more support: Give the first question and ask the student to add the second. For early finishers: Ask for three things and print a card with one line per answer. The hard part, on purpose: Remembering that input needs a name to catch the answer. Ask where the typed text went. When students get stuck: A NameError on the first line that uses the answer. Ask: Which line stores what was typed? Fix: Write name = in front of input so the answer is stored under that name. / The question shows but there is no space before the answer. Ask: What is inside the quotes of the question? Fix: End the question text with a space, such as "Name? ". -->

<!-- Speaker note: Teacher: students choose their own two questions. Circulate and ask each to read the program aloud, line by line. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Ask+two+questions+and+print+one+sentence+that+uses+both+answers.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-input/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is the difference between input("Name? ") on its own and name = input("Name? ")?**

* Both ask and wait. Only the second stores the answer, so the program can use it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the answer is always text, so adding a typed number to a number fails. Joining numbers onto text takes str. -->
