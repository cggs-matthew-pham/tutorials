---
marp: true
theme: default
html: true
---

# Print text

Console bridge: text in, text out · Text in, text out

<!-- Speaker note: Students meet print, text in quotes, and joining text with +, then make a four-line sign. About 30 minutes (Predict and Run 8 min · Investigate 12 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** show text on the screen with print, and join pieces of text into one line with +.

- I can show a line of text with print.
- I can say why text needs quotes.
- I can join pieces of text with + and say where the spaces come from.

---

## Why it matters

> Chatbots, game menus and error messages all start the same way: a program puts a line of text on the screen.

<!-- Speaker note: Until now your programs made pictures. Many programs make **text** instead. This course is about programs you talk to: they show a line, wait for you, and reply. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
name = "Ada"
print("Hello")
print("Hi, " + name)
```

**What will the program show?**

- Two lines: Hello, then Hi, + Ada
- Two lines: Hello, then Hi,Ada
- Two lines: Hello, then Hi, Ada
- One line: Hello Hi, Ada

<!-- Speaker note: What happens: Two lines: Hello, then Hi, Ada. Each print starts a new line. The + joins the two pieces exactly as typed, and the space after the comma is inside the quotes, so it stays. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: show the two-line program and take a vote. The wrong options are a slip about new lines, a slip about what + does, and a slip about spaces. -->

<style scoped>pre, marp-pre { font-size: 0.81em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=name+%3D+%22Ada%22%0Aprint%28%22Hello%22%29%0Aprint%28%22Hi%2C+%22+%2B+name%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-print/?full=step-2#step-2)

<!-- Speaker note: Run it and compare with your prediction. | Line | What it does | Why | |---|---|---| | `name = "Ada"` | Stores the text Ada under the name `name` | Text goes in quotes. The quotes are not shown | | `print("Hello")` | Shows Hello and moves to a new line | Each `print` is one line of output | | `print("Hi, " + name)` | Joins two pieces of text and shows the result | `+` glues text together. It adds nothing, not even a space | -->

<!-- Speaker note: Teacher: run it live, then change the space inside the quotes and run again. Ask where the space came from. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Two lines: Hello, then Hi, Ada. Each print starts a new line. The + joins the two pieces exactly as typed, and the space after the comma is inside the quotes, so it stays.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
name = "Ada"
print("Hello")
print("Hi, " + name)
print("Hi," + name)
print(name + name)
```

<!-- Speaker note: What this step is for: Quotes make text. print shows exactly the text it is given, and + joins pieces with nothing in between. -->

<!-- Speaker note: Teacher: the trace is the key idea, that + adds nothing. Ask a student to read a line aloud as if they were the computer. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the lines

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
name = "Ada"
print("Hello")
print("Hi, " + name)
print("Hi," + name)
print(name + name)
```

</div>
<div>

**Fill in what each line shows.**

| line | shows |
|---|---|
| print("Hello") | Hello |
| print("Hi, " + name) | ? |
| print("Hi," + name) | ? |
| print(name + name) | ? |

* Answer: Hi, Ada, Hi,Ada, AdaAda

</div>
</div>

<!-- Speaker note: A space only appears if it is inside the quotes. name + name joins Ada onto Ada with nothing between. -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should show three lines, but the program stops with an error. Click the wrong line.**

```
 1  print("Welcome")
 2  print(Hi there)
 3  print("Goodbye")
```

* Answer: line 2

<!-- Speaker note: Without quotes, Python reads Hi there as names it has never heard of. Text needs quotes around it: print("Hi there"). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Put the lines in order

**Put the lines in order so the screen shows a line of stars, then Room 12, then Welcome, then a line of stars.**

```python
print("Room 12")
print("*****")
print("Welcome")
print("*****")
```

<!-- Speaker note: print runs the lines from the top down, so the order of the lines is the order on the screen. Correct order: print("*****") print("Room 12") print("Welcome") print("*****") -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a four-line sign for your classroom door. Store a name once at the top, use it in at least two of the lines, and run it.

<!-- Speaker note: Hints, in order: Set name once at the top, then use it in more than one print line. / Each print is one line: print("Welcome, " + name). For students who need more support: Give the sign with one line missing and ask the student to complete it. For early finishers: Print a box of stars around a message, using more than four print lines. The hard part, on purpose: Telling apart a name and text in quotes. Ask what print would show for the name without quotes. When students get stuck: A NameError mentioning a word the student meant as text. Ask: Is that word inside quotes? Fix: Text needs quotes. Without them Python looks for a name. / Words run together on the screen ("HiAda"). Ask: Where did the space come from in the first program? Fix: A space is a character. Put it inside the quotes, such as "Hi, ". -->

<!-- Speaker note: Teacher: students choose their own sign. Show a friend a finished one and ask what each line does. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Make+a+four-line+sign.+Store+a+name+once+and+use+it+twice.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-print/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Read it like a computer <span style="font-size:.6em;color:#64748b">(3 min)</span>

Swap signs with a partner. Read their program line by line and say aloud what each print shows. Does the screen match?

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**print("Hi, " + "Sam") shows what, and why is there a space?**

* Hi, Sam. The space is inside the first quotes. The + adds nothing.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the program asks a question and uses the answer, so it is no longer the same every time. -->
