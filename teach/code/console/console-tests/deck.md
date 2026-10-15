---
marp: true
theme: default
html: true
---

# Test with a table

Console bridge: text in, text out · Menus and testing

<!-- Speaker note: Students write test cases as comparison lines, find a bug with a wrong-choice test, and fix the code. About 35 minutes (Predict and Run 8 min · Investigate 8 min · Modify 8 min · Mix it up 3 min · Make 8 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** write test cases (what to type and what the program should reply) as lines that print True or False, and include a wrong choice.

- I can write a test case as a line that shows True or False.
- I can include a wrong choice in my tests.
- I can fix code until all my tests show True.

---

## Why it matters

> Apps are tested before anyone uses them. A test case says what to type and what should come back, and the computer checks it every time.

<!-- Speaker note: A menu is awkward to test by typing: you have to type the same choices every time. If the menu's replies come from a **function**, you can test the function with one line per case, and the computer says `True` or `False` for each. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

**What do the three test lines show?**

- False, True, True
- True, True, True: if the first two work the third will too
- An error, because reply needs the loop
- True, True, False

<!-- Speaker note: What happens: True, True, False. reply("9") returns Please choose 1 or 2 with no full stop, but the test expects one. The first two cases only tried choices that work. The wrong-choice test is the one that found the slip. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the common slip is trusting the first two tests. Let students argue before running. Ask the all-True voters what would convince them the function works for every input. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=def+reply%28choice%29%3A%0A++++if+choice+%3D%3D+%221%22%3A%0A++++++++return+%22Added+%245%22%0A++++elif+choice+%3D%3D+%222%22%3A%0A++++++++return+%22Pay+now%22%0A++++else%3A%0A++++++++return+%22Please+choose+1+or+2%22%0A%0Aprint%28reply%28%221%22%29+%3D%3D+%22Added+%245%22%29%0Aprint%28reply%28%222%22%29+%3D%3D+%22Pay+now%22%29%0Aprint%28reply%28%229%22%29+%3D%3D+%22Please+choose+1+or+2.%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-tests/?full=step-2#step-2)

<!-- Speaker note: Run it and compare with your prediction. | Line | What it does | Why | |---|---|---| | `def reply(choice):` | The menu's replies, as a function | A function can be called with any choice, with no typing | | `reply("9") == "Please choose 1 or 2."` | One test case: given 9, expect this reply | `==` gives `True` when they match and `False` when they do not | | `print(...)` | Shows the result | Run all the tests at once and read down the `True`s and `False`s | -->

<!-- Speaker note: Teacher: ask which test found the bug and why the first two did not. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* True, True, False. reply("9") returns Please choose 1 or 2 with no full stop, but the test expects one. The first two cases only tried choices that work. The wrong-choice test is the one that found the slip.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

<!-- Speaker note: What this step is for: A test case is an input and the reply you expect. Good tests include the wrong inputs. -->

<!-- Speaker note: Teacher: the last trace line has a wrong expectation. A False test does not always mean the function is wrong: it can be the test. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Read the tests

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2"

print(reply("1") == "Added $5")
print(reply("2") == "Pay now")
print(reply("9") == "Please choose 1 or 2.")
```

</div>
<div>

**Fill in what each test shows.**

| test | shows |
|---|---|
| reply("1") == "Added $5" | True |
| reply("2") == "Pay now" | ? |
| reply("9") == "Please choose 1 or 2." | ? |
| reply("1") == "Added $4" | ? |

* Answer: True, False, False

</div>
</div>

<!-- Speaker note: A test shows True only when the function gives back exactly what the test expects. The last line is a wrong expectation, so it shows False even though the function is fine. -->

<style scoped>section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This test was meant to check the wrong-choice reply, but the program stops with an error before it runs. Click the wrong line.**

```
 1  def reply(choice):
 2      if choice == "1":
 3          return "Added $5"
 4      elif choice == "2":
 5          return "Pay now"
 6      else:
 7          return "Please choose 1 or 2."
 8  
 9  print(reply("9") = "Please choose 1 or 2.")
```

* Answer: line 9

<!-- Speaker note: A single = stores a value. A test compares with two: reply("9") == "Please choose 1 or 2.". -->

<style scoped>pre, marp-pre { font-size: 0.65em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add a test:** Add a test line for a wrong choice.
- **Fix the slip:** If it shows `False`, fix the function, and run the tests again.

<!-- Speaker note: What this step is for: Find the bug with a test, then fix the code and run all the tests again. Hints, in order: Copy a test line and change what you type, and what you expect, to a wrong choice such as 9. / The new test shows False. Compare the reply text in the function with the text in the test. For students who need more support: Give the test lines with the expected text missing and ask for it. For early finishers: Add a test for the choice 2 with the number typed as 2 instead of "2". What happens? The hard part, on purpose: Believing the program works because the easy tests pass. Ask which input has not been tried. When students get stuck: Every test shows False. Ask: Are the expected texts exactly the same as the replies, including spaces and full stops? Fix: Copy the reply text from the function into the test. / A SyntaxError on a test line. Ask: Is it = or == in the comparison? Fix: Tests compare with two equals signs. -->

<!-- Speaker note: Teacher: students add the missing test, watch it show False, and fix the function. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=def+reply%28choice%29%3A%0A++++if+choice+%3D%3D+%221%22%3A%0A++++++++return+%22Added+%245%22%0A++++elif+choice+%3D%3D+%222%22%3A%0A++++++++return+%22Pay+now%22%0A++++else%3A%0A++++++++return+%22Please+choose+1+or+2%22%0A%0Aprint%28reply%28%221%22%29+%3D%3D+%22Added+%245%22%29%0Aprint%28reply%28%222%22%29+%3D%3D+%22Pay+now%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-tests/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

while True:
    choice = input("1 add $5, 2 pay: ")
    print(reply(choice))
    if choice == "2":
        break
```

<!-- Speaker note: This mixes the menu loop and a function that gives back an answer. What this step is for: The menu loop calls the function and prints what it returns. The function can be tested on its own. -->

<style scoped>pre, marp-pre { font-size: 0.79em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
def reply(choice):
    if choice == "1":
        return "Added $5"
    elif choice == "2":
        return "Pay now"
    else:
        return "Please choose 1 or 2."

while True:
    choice = input("1 add $5, 2 pay: ")
    print(reply(choice))
    if choice == "2":
        break
```

</div>
<div>

**You type 1, then 9, then 2. What does the menu show?**

- Added $5, Pay now
- Added $5, Please choose 1 or 2., and it asks again
- Added $5, Please choose 1 or 2., Pay now
- Pay now only

* Answer: Added $5, Please choose 1 or 2., Pay now

</div>
</div>

<!-- Speaker note: Each pass prints what reply gives back. 2 shows Pay now, and then break ends the loop. What this step is for: The menu loop calls the function and prints what it returns. The function can be tested on its own. -->

<style scoped>section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Here is a till function. Write three test lines for it: what to type and what it should reply. Include a wrong choice. Run the tests and fix anything that shows `False`.

<!-- Speaker note: Hints, in order: One test per line: print(reply("typed") == "expected"). / Include a wrong choice such as 9, and a choice with a space, such as " 1". -->

<!-- Speaker note: Teacher: encourage unusual inputs: a space, an empty answer, a letter. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=def+reply%28choice%29%3A%0A++++if+choice+%3D%3D+%221%22%3A%0A++++++++return+%22Added+%245%22%0A++++elif+choice+%3D%3D+%222%22%3A%0A++++++++return+%22Pay+now%22%0A++++else%3A%0A++++++++return+%22Please+choose+1+or+2.%22%0A%0A%23+Write+three+test+lines.+Include+a+wrong+choice.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-tests/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Break my function <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap functions with a partner. Write a test that you think will find a bug in theirs.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why should a test list always include a wrong input?**

* Wrong inputs are where bugs hide. If only the cases that work are tested, a bug in the other cases is never found.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the challenge. Build a console app that uses every move so far, with test cases of your own. -->
