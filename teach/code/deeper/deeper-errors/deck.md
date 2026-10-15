---
marp: true
theme: default
html: true
---

# When things go wrong

Deeper Python in the console · Errors and the adventure

<!-- Speaker note: Students catch errors with try and except so typed mistakes get a reply instead of a crash, compare it with checking first (isdigit), and catch two kinds of error in one program. About 45 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** catch an error with try and except, so a typing mistake gets a helpful reply and the program asks again.

- I can use try and except to catch an error and carry on.
- I can name the kind of error to catch (ValueError, KeyError, ZeroDivisionError).
- I can explain why a caught error is not the same as a sensible answer.

<!-- Speaker note: Before class: Read the unit primer first. `try:` runs its lines; if one causes the named error, Python jumps to `except ThatError:` and then carries on after it. Only the named error is caught: the bug task catches `ValueError` when the error is a `KeyError`, so the program still stops. `int()` accepts " 4 " and "-2" but not "3.5" or "three", so a caught error does not check whether a number is sensible (the first Investigate question). Avoid a bare `except:` that catches everything: it hides real mistakes. Teacher: Bug task: read the error's name in the message, then the except line. -->

---

## Why it matters

> Apps you trust never crash when you mistype: they catch the mistake, say what they wanted, and ask again.

<!-- Speaker note: In the console bridge you checked typed numbers with `isdigit()` **before** using them. Another way is to just **try**, and say what to do if it goes wrong. `try` runs some lines; if one of them causes a `ValueError`, Python jumps to `except ValueError:` instead of stopping the program. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
text = "twelve"
try:
    age = int(text)
    print("Next year: " + str(age + 1))
except ValueError:
    print("That is not a number.")
print("Done")
```

**What does it print?**

- Only Done
- Next year: 13 then Done
- It stops with a ValueError
- That is not a number. then Done

<!-- Speaker note: What happens: That is not a number. then Done. int("twelve") causes a ValueError, so Python skips the rest of try and runs the except lines. Then the program carries on after them. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: trace it on the board. The line after int() never runs. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=while+True%3A%0A++++text+%3D+input%28%22How+many+tickets%3F+%22%29%0A++++try%3A%0A++++++++tickets+%3D+int%28text%29%0A++++++++break%0A++++except+ValueError%3A%0A++++++++print%28%22Please+type+a+whole+number%2C+such+as+3.%22%29%0Aprint%28%22That+will+be+%24%22+%2B+str%28tickets+*+12%29+%2B+%22.%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-errors/?full=step-2#step-2)

<!-- Speaker note: Try `three`, then `3.5`, then ` 4 `. The loop asks again after each mistake; `break` leaves it once `int()` works. Students should be able to say: I can explain how the program keeps asking until it gets a whole number. -->

<!-- Speaker note: Teacher: ask students to find every kind of answer that gets through (including -2). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* That is not a number. then Done. int("twelve") causes a ValueError, so Python skips the rest of try and runs the except lines. Then the program carries on after them.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
while True:
    text = input("How many tickets? ")
    try:
        tickets = int(text)
        break
    except ValueError:
        print("Please type a whole number, such as 3.")
print("That will be $" + str(tickets * 12) + ".")
```

<!-- Speaker note: What this step is for: try and except catch one named kind of error; the program decides what still counts as wrong. -->

<!-- Speaker note: Teacher: compare with isdigit() from the console bridge. Both are fine; try is the usual Python way. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which answers pass?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
while True:
    text = input("How many tickets? ")
    try:
        tickets = int(text)
        break
    except ValueError:
        print("Please type a whole number, such as 3.")
print("That will be $" + str(tickets * 12) + ".")
```

</div>
<div>

**Which answer does int() accept, so the loop stops?**

- 3.5
- 3 tickets
- -2
- three

* Answer: -2

</div>
</div>

<!-- Speaker note: int("-2") is the number -2, so nothing goes wrong and the loop stops, charging $-24. A caught error is not the same as a sensible answer: the program still has to check the number. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Try or check first?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
while True:
    text = input("How many tickets? ")
    try:
        tickets = int(text)
        break
    except ValueError:
        print("Please type a whole number, such as 3.")
print("That will be $" + str(tickets * 12) + ".")
```

</div>
<div>

**Compared with isdigit() in the console bridge, what does try let you do?**

- Skip the input
- Never get errors at all
- Turn letters into numbers
- Just try it, and handle the error if it happens

* Answer: Just try it, and handle the error if it happens

</div>
</div>

<!-- Speaker note: isdigit() checks first; try does it and catches the error. Python programmers often say it is easier to ask forgiveness than permission. -->

<style scoped>section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This should say There is no such room, but it stops with KeyError: attic. Click the line that is wrong.**

```
 1  rooms = {"hall": "A long hall."}
 2  try:
 3      print(rooms["attic"])
 4  except ValueError:
 5      print("There is no such room.")
```

* Answer: line 4

<!-- Speaker note: except ValueError only catches a ValueError. A missing key is a KeyError, so it should be except KeyError:. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

A canteen with two kinds of mistake: an item that is not on the menu (`KeyError`) and a number that is not a number (`ValueError`). Try both.

- **One to ten:** Only accept **1 to 10** of an item.
- **Quit:** Let the customer type `quit` instead of an item.

<!-- Speaker note: What this step is for: A caught error keeps the program running; the code inside try decides what still counts as a good answer. Hints, in order: After count = int(text), only break if the count is between 1 and 10. / if count >= 1 and count <= 10: then break; otherwise print Choose 1 to 10. / Before the try in the first loop, add: if item == "quit": break, and say goodbye instead of asking how many. For students who need more support: Give students the try and the first except of the calculator, and ask them to add the second except. For early finishers: Make a function ask_number(question) that keeps asking until it gets a whole number, and use it twice. The hard part, on purpose: Catching the error that actually happens. Ask them to read the error's name in the message and match it to the except, rather than catching everything. When students get stuck: The program still stops with an error. Ask: Which error does the message name, and which does your except catch? Fix: Catch the error the message names (KeyError, not ValueError). / The loop never ends, even with a good answer. Ask: Where is break, and does it run when the answer is good? Fix: Put break inside try, after the line that might fail. / NameError on a variable after the loop. Ask: Was the variable given a value inside try before the loop ended? Fix: Only leave the loop (break) once the value has been set. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=prices+%3D+%7B%22pie%22%3A+5%2C+%22drink%22%3A+3%2C+%22fruit%22%3A+2%7D%0Awhile+True%3A%0A++++item+%3D+input%28%22What+would+you+like%3F+%22%29.strip%28%29.lower%28%29%0A++++try%3A%0A++++++++price+%3D+prices%5Bitem%5D%0A++++++++break%0A++++except+KeyError%3A%0A++++++++print%28%22We+have%3A+%22+%2B+%22%2C+%22.join%28prices%29%29%0Awhile+True%3A%0A++++text+%3D+input%28%22How+many%3F+%22%29%0A++++try%3A%0A++++++++count+%3D+int%28text%29%0A++++++++break%0A++++except+ValueError%3A%0A++++++++print%28%22Please+type+a+whole+number.%22%29%0Aprint%28%22That+will+be+%24%22+%2B+str%28price+*+count%29+%2B+%22.%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-errors/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a safe calculator

Ask for two whole numbers and print the first divided by the second. Catch **two** kinds of mistake, each with its own `except` and its own message: a typing mistake (`ValueError`) and dividing by zero (`ZeroDivisionError`). After either, ask again.

<!-- Speaker note: What this step is for: One try can have several excepts, one for each kind of thing that can go wrong. -->

<!-- Speaker note: Teacher: two excepts after one try. Ask which one runs for 10 / 0 and for ten. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a safe calculator

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+A+safe+calculator%3A+ask+for+two+numbers+and+divide+the+first+by+the+second.%0A%23+Catch+typing+mistakes+and+dividing+by+zero%2C+and+ask+again.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-errors/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Next: the text adventure, built from the parser, the bag, the map and safe input.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**try: n = int("3.5") except ValueError: n = 0. What is n?**

* 0: int("3.5") causes a ValueError, so the except line runs.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson is the text adventure. Later, saving and loading a game uses the same idea for a missing file (FileNotFoundError). -->
