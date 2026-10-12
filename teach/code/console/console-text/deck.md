---
marp: true
theme: default
html: true
---

# Text in, text out

Console bridge: text in, text out · Text in, text out

<!-- Speaker note: Students meet the console, the text version of the playground. They ask a question with input(), store the answer, reply with print(), join text with +, and turn a number into text with str(). About 45 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** ask a question with input(), answer with print(), join text with +, and turn a number into text with str().

- I can ask a question with input() and store the answer in a variable.
- I can join text with + and print it, spaces included.
- I can turn a number into text with str() before joining it.

<!-- Speaker note: Before class: Read the unit primer first. The playground looks different here: there is no turtle, so the right-hand side is a **console**. When the program reaches `input()`, a line appears in the console with a cursor; the student clicks it, types and presses Enter. Try the bug task yourself before class: `"Your score is " + 5` stops with a TypeError, because `+` cannot join a number onto text. `str(5)` turns the number into the text `"5"`. Teacher: Bug task: + joins text to text. A number has to become text first, with str(). Link it to len(name): len gives a number, so it needs str() too. -->

---

## Why it matters

> Chatbots, ticket machines and quiz apps all do the same three things: ask, wait for an answer, and reply.

<!-- Speaker note: The turtle course drew pictures. A **console** program works with text instead: it asks a question, waits for someone to type an answer, and replies. The ideas are the same ones you already know: variables, decisions, loops and functions. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
name = input("What is your name? ")
print("Hello, " + name + "!")
```

**You run it, type Ada and press Enter. What is the last line in the console?**

- Hello, name!
- Hello,Ada!
- Hello, Ada!
- Hello, + name + !

<!-- Speaker note: What happens: Hello, Ada! The answer Ada is stored in name, and + joins "Hello, ", Ada and "!" into one line. The space is inside the quotes, so it stays. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask students to write the exact line, punctuation and spaces included. The space after the comma is inside the quotes, so it stays. -->

<style scoped>pre, marp-pre { font-size: 0.62em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=name+%3D+input%28%22What+is+your+name%3F+%22%29%0Aprint%28%22Hello%2C+%22+%2B+name+%2B+%22%21%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-text/?full=step-2#step-2)

<!-- Speaker note: Run it. When the question appears in the console, click the line, type your name and press Enter. Compare the result with your prediction. Students should be able to say: I can explain where the answer I typed is stored, and how print uses it. -->

<!-- Speaker note: Teacher: show where to type. The answer goes into the variable on the left of the = sign, just like size = 100 in the turtle course. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Hello, Ada! The answer Ada is stored in name, and + joins "Hello, ", Ada and "!" into one line. The space is inside the quotes, so it stays.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
name = input("What is your name? ")
food = input("What is your favourite food? ")
print("Hello, " + name + "!")
print(name + " likes " + food + ".")
print("Your name has " + str(len(name)) + " letters.")
```

<!-- Speaker note: This program asks two questions. Run it in the playground above if you like, then work through the tasks. What this step is for: input() always gives back text, and + joins text exactly as written, spaces included. A number has to become text with str() before it can be joined. -->

<!-- Speaker note: Teacher: the spaces question is where most mistakes happen. Read the line aloud piece by piece: Bo, then space-likes-space, then pizza, then a full stop. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
name = input("What is your name? ")
food = input("What is your favourite food? ")
print("Hello, " + name + "!")
print(name + " likes " + food + ".")
print("Your name has " + str(len(name)) + " letters.")
```

</div>
<div>

**Match each part with what it does.**

| | |
|---|---|
| `input("What is your name? ")` | A. joins three pieces of text into one |
| `"Hello, " + name + "!"` | B. shows a line in the console |
| `str(len(name))` | C. turns the number of letters into text |
| `print(...)` | D. shows the question, waits, and gives back what was typed |

* Answer: input("What is your name? ") → D. shows the question, waits, and gives back what was typed; "Hello, " + name + "!" → A. joins three pieces of text into one; str(len(name)) → C. turns the number of letters into text; print(...) → B. shows a line in the console

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spaces count

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
name = input("What is your name? ")
food = input("What is your favourite food? ")
print("Hello, " + name + "!")
print(name + " likes " + food + ".")
print("Your name has " + str(len(name)) + " letters.")
```

</div>
<div>

**You type Bo, then pizza. What does the fourth line, print(name + " likes " + food + "."), show?**

- name likes food.
- Bo likes pizza
- Bolikespizza.
- Bo likes pizza.

* Answer: Bo likes pizza.

</div>
</div>

<!-- Speaker note: name holds Bo and food holds pizza. + joins Bo, " likes ", pizza and "." exactly as written, spaces and full stop included. -->

<style scoped>section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should print Your score is 5, but it stops with a TypeError. Click the line that causes it.**

```
 1  score = 5
 2  print("Your score is " + score)
```

* Answer: line 2

<!-- Speaker note: + can join text to text, but score is a number. str(score) turns it into the text "5" first: print("Your score is " + str(score)). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A second question:** Ask for a **favourite animal**, store it in a variable called `animal`, and print a sentence that uses both answers.
- **Count the letters:** Print a line such as `Ada has 3 letters.`

<!-- Speaker note: What this step is for: Each new question is one more input() stored in its own variable; each reply is text joined with +. Hints, in order: Copy the first line and change the variable name and the question. / Then print a sentence that joins name and animal: print(name + " would like a pet " + animal + ".") / len(name) is the number of letters, but it is a number. / Turn it into text with str() before joining it: str(len(name)). For students who need more support: Give students the three input() lines for the story machine and ask them to write only the print lines. For early finishers: Ask for a name and a year group, then print a two-line welcome that uses both and says how many letters are in the name. The hard part, on purpose: Joining a number onto text, and seeing that input() always gives text. When the TypeError appears, ask which part is a number before pointing at str(). When students get stuck: TypeError: cannot concatenate 'str' and 'int' objects. Ask: Is everything joined with + text? Which part is a number? Fix: Wrap the number in str(): "Score: " + str(score). / The console prints the word name instead of what was typed. Ask: Is name inside quotes? Fix: Variables go outside the quotes: "Hello, " + name, not "Hello, name". / Words run together, such as Bolikespizza. Ask: Where is the space: inside the quotes or outside? Fix: Put the space inside the quotes: " likes ". -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=name+%3D+input%28%22What+is+your+name%3F+%22%29%0Aprint%28%22Hello%2C+%22+%2B+name+%2B+%22%21%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-text/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a story machine

Write a **story machine**: it asks for three words (such as a name, a place and an animal), then prints a short story of two or three lines that uses all of them. Run it with silly answers and with sensible ones.

<!-- Speaker note: What this step is for: Without a starter, students show they can ask, store and join on their own. -->

<!-- Speaker note: Teacher: let students be silly with the story. Check they print the answers, not the variable names in quotes. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a story machine

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=%23+A+story+machine%3A+ask+for+three+words%2C+then+print+a+story+that+uses+them.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-text/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Every app with a text box does this: ask, store the answer in a variable, reply. Web forms and chatbots are the same idea with a nicer screen.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**age = 12. Why does print("I am " + age) stop with an error, and how do you fix it?**

* + cannot join a number onto text. Turn the number into text first: print("I am " + str(age)).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson turns typed text into a number with int(), so programs can calculate with what they are told, and checks the text first so a typo does not crash the program. Class ideas: a greeting kiosk for open night; a story machine shared around the room. -->
