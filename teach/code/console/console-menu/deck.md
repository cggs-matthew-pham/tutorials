---
marp: true
theme: default
html: true
---

# A text menu

Console bridge: text in, text out · Loops and menus

<!-- Speaker note: Students put a menu inside while True, choose with if and elif, leave with break, and test the app against a table of cases. The Make task is a small app of their own, tested with cases they write. About 55 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 20 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put a menu inside while True, choose with if and elif, leave with break, and test the app against a table of cases.

- I can build a menu with while True, if and elif, and leave it with break.
- I can write test cases (what to type and what should be printed) and use them to check a program.
- I can plan and build a small text app of my own.

<!-- Speaker note: Before class: Read the unit primer first. `while True:` asks a question whose answer is always yes, so the loop runs until `break` leaves it. Each lap shows the menu (a function, `show_menu()`), asks for a choice and runs one branch. The bug task returns to last lesson's surprise: `input()` gives text, so `choice == 1` is never true; compare with `"1"`. The **test case** table is the new habit: what you type, and the output you expect, written **before** running. It is the "validate programs against a range of test cases" idea from the Years 9–10 curriculum, met here in a small form. Teacher: Bug task: ask what type of thing choice is. Show print(choice == 1) and print(choice == "1") in the playground. -->

---

## Why it matters

> Ticket machines, ATMs and the settings on a phone are all menus: show the choices, wait for one, do it, and show the menu again.

<!-- Speaker note: This lesson puts everything in the course together: a **menu** that shows the choices, waits for one, does it, and shows the menu again, until you choose to leave. Then you test it the way programmers do, against a table of cases. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Pay")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2 or 3: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2 or 3.")
print("Thank you!")
```

**You type 1, then 1, then 2, then 3. What total is printed?**

<!-- Speaker note: What happens: 8. Two drinks at $3 and one snack at $2 make 8. Choosing 3 prints the total, then break leaves the loop and Thank you! is printed. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: walk the four inputs on the board, keeping the total in a box that changes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=def+show_menu%28%29%3A%0A++++print%28%221.+Add+a+drink+%28%243%29%22%29%0A++++print%28%222.+Add+a+snack+%28%242%29%22%29%0A++++print%28%223.+Pay%22%29%0A%0Atotal+%3D+0%0Awhile+True%3A%0A++++show_menu%28%29%0A++++choice+%3D+input%28%22Choose+1%2C+2+or+3%3A+%22%29%0A++++if+choice+%3D%3D+%221%22%3A%0A++++++++total+%2B%3D+3%0A++++elif+choice+%3D%3D+%222%22%3A%0A++++++++total+%2B%3D+2%0A++++elif+choice+%3D%3D+%223%22%3A%0A++++++++print%28%22Total%3A+%24%22+%2B+str%28total%29%29%0A++++++++break%0A++++else%3A%0A++++++++print%28%22Please+type+1%2C+2+or+3.%22%29%0Aprint%28%22Thank+you%21%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-menu/?full=step-2#step-2)

<!-- Speaker note: Run it. Order a few things, type something that is not on the menu, then pay. Compare the result with your prediction. Students should be able to say: I can explain how the till keeps showing the menu, and how it stops. -->

<!-- Speaker note: Teacher: ask students to try to break it: letters, an empty answer, 10. The else catches them all. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 8. Two drinks at $3 and one snack at $2 make 8. Choosing 3 prints the total, then break leaves the loop and Thank you! is printed.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Pay")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2 or 3: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2 or 3.")
print("Thank you!")
```

<!-- Speaker note: `while True:` uses `True`, a value that is always yes. `show_menu()` is a function, so the menu text is written once and shown on every lap. What this step is for: A menu app is a loop, a decision and a way out; testing it means choosing inputs and writing down the output you expect before you run them. -->

<!-- Speaker note: Teacher: fill in the test cases before running, then run them. Ask which case they would never have thought to try. -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Test cases

**A test case is what you type and the output you expect. Fill in the total each case should print, then run each case to check.**

| what you type | total printed |
|---|---|
| 1, 3 | 3 |
| 2, 2, 3 | ? |
| 5, 1, 3 | ? |
| 3 | ? |

* Answer: 4, 3, 0

<!-- Speaker note: 5 is not on the menu, so the else replies and nothing is added. Paying straight away prints 0. Good test cases include normal choices, a wrong choice and the smallest order. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Whatever you type, this till only ever says Please type 1, 2 or 3. Click the first line that goes wrong.**

```
 1  total = 0
 2  while True:
 3      choice = input("1 drink, 2 snack, 3 pay: ")
 4      if choice == 1:
 5          total += 3
 6      elif choice == 2:
 7          total += 2
 8      elif choice == 3:
 9          print("Total: $" + str(total))
10          break
11      else:
12          print("Please type 1, 2 or 3.")
```

* Answer: line 4

<!-- Speaker note: input() gives back text, so choice is "1", never the number 1. "1" == 1 is False, so every choice falls through to the else. Compare with text: choice == "1". -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Build the loop

**Put the lines in order: a till that adds $3 for choice 1 and pays on choice 2.**

```python
        total += 3
        print("Total: $" + str(total))
total = 0
    choice = input("1 add $3, 2 pay: ")
    if choice == "1":
while True:
    elif choice == "2":
        break
```

<!-- Speaker note: The total starts before the loop. Inside while True: ask, then decide. Paying prints the total and then breaks out. Correct order: total = 0 while True: choice = input("1 add $3, 2 pay: ") if choice == "1": total += 3 elif choice == "2": print("Total: $" + str(total)) break -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The way out

**What does break do?**

- Shows the menu again
- Leaves the loop straight away; the program carries on after it
- Skips to the next choice
- Stops the whole program with an error

* Answer: Leaves the loop straight away; the program carries on after it

<!-- Speaker note: break leaves the loop it is in. The line after the loop, print("Thank you!"), still runs. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add a sandwich:** Add a **sandwich for $5** as choice 3. Paying becomes choice 4.
- **Start again:** Add a choice called **Start again** that clears the order (the total goes back to 0). Test it: order something, start again, then pay.

<!-- Speaker note: What this step is for: A new choice is a new elif and a new line in show_menu; the loop and the way out stay the same. Hints, in order: Add a line to show_menu, and a new elif with total += 5. / Paying moves to choice 4, so change that elif and the messages too. / A new elif sets total back to 0 and prints a message. Add it to show_menu as well. For students who need more support: Give students the till as a starter for their own app and ask them to change the choices, prices and messages first, then add one new choice. For early finishers: Add a running list of what was ordered (a list and .append()), and print it with the total when paying. The hard part, on purpose: Writing expected outputs before running, and comparing a choice with "1" rather than 1. Ask what they expect for each input first; don't run it for them. When students get stuck: Every choice gives the else message. Ask: Is the choice compared with text ("1") or a number (1)? Fix: Compare with text: if choice == "1":. / The menu never stops. Ask: Which choice reaches break? Is break indented inside that elif? Fix: Put break as the last line inside the quit choice's branch. / The total resets every lap. Ask: Where is total = 0, before the loop or inside it? Fix: Set the starting total before while True, so the loop does not reset it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=def+show_menu%28%29%3A%0A++++print%28%221.+Add+a+drink+%28%243%29%22%29%0A++++print%28%222.+Add+a+snack+%28%242%29%22%29%0A++++print%28%223.+Pay%22%29%0A%0Atotal+%3D+0%0Awhile+True%3A%0A++++show_menu%28%29%0A++++choice+%3D+input%28%22Choose+1%2C+2+or+3%3A+%22%29%0A++++if+choice+%3D%3D+%221%22%3A%0A++++++++total+%2B%3D+3%0A++++elif+choice+%3D%3D+%222%22%3A%0A++++++++total+%2B%3D+2%0A++++elif+choice+%3D%3D+%223%22%3A%0A++++++++print%28%22Total%3A+%24%22+%2B+str%28total%29%29%0A++++++++break%0A++++else%3A%0A++++++++print%28%22Please+type+1%2C+2+or+3.%22%29%0Aprint%28%22Thank+you%21%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-menu/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make your own app



- **Build the app:** Make a small menu app of your own: a **quiz** (each choice asks a question and keeps a score), a **converter** (centimetres to metres, minutes to seconds), or a
- **Test it:** Write three test cases in a table, like the one in Investigate: what you type, and what the app should print. Include one choice that is not on the menu. Run ea

<!-- Speaker note: What this step is for: Planning the menu and the test cases first is what turns a program into an app someone else can use. Hints, in order: Plan first: write the menu's choices on paper. One of them quits. / Copy the shape of the till: a show_menu function, total or score before the loop, while True, input, if and elif, and break on the quit choice. -->

<!-- Speaker note: Teacher: insist on paper plans (menu choices and three test cases) before typing. Swap apps and run each other's test cases. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make your own app

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=%23+Your+own+menu+app%3A+a+quiz%2C+a+converter%2C+a+shop+or+a+game+shop.%0A%23+It+needs%3A+a+function+that+prints+the+menu%2C+a+while+True+loop%2C%0A%23+at+least+three+choices+with+if+and+elif%2C+and+a+choice+that+quits+with+break.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/console/console-menu/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

You have built a real app: it talks to its user, checks what they type, keeps going until they leave, and passes its test cases. Every Python extension starts from here: games with many objects, data detective work with real data sets, and web apps where the menu becomes buttons.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In the till, what would happen if break were missing from the pay choice?**

* The total is printed, then the loop carries on and shows the menu again, for ever, because nothing else leaves while True.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes Python foundations. The extensions build on this program shape: Objects with turtles (many enemies in a game), Data detective (real data sets), and Apps, where the menu becomes buttons (Gradio). Class ideas: a canteen till; a revision quiz for another subject; a unit converter for a science practical. -->
