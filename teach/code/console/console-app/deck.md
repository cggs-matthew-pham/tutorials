---
marp: true
theme: default
html: true
---

# Challenge: a console app

Console bridge: text in, text out · Console challenge

<!-- Speaker note: Students read a working café till, predict a change, then build a console app with a menu, a checked number and a total. About 45 minutes (Predict and Run 8 min · Investigate 8 min · Modify 8 min · Make 20 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read a working café till, change one thing and predict the result, then make a console app of your own with a menu, a checked number, a total and tests.

- I can read a longer console program and say what each part does.
- I can add a feature to a working app.
- I can build a console app from a menu, a check and a total.

---

## Why it matters

> Every app you use is a menu, a check and a total, wearing a nicer coat. Today you build one.

<!-- Speaker note: This is the end of the console course. The program below uses everything: `input`, a checked number, `while True`, `break`, a running total and a function. Read it first, then make an app of your own. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        how_many = input("How many cakes? ")
        if how_many.isdigit():
            total += 5 * int(how_many)
            print("Cakes added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```

**You choose 1, then 2 with a quantity of 3, then 3. What total does the last line show?**

<!-- Speaker note: What happens: 19. One coffee is $4. Choice 2 asks how many and adds $5 for each, so 3 cakes add $15, and 4 + 15 = 19. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students read the program and work out the total by hand before running. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Work it out by hand <span style="font-size:.6em;color:#64748b">(4 min)</span>

Work out the total on paper with your partner. Compare before you run.

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=total+%3D+0%0Awhile+True%3A%0A++++choice+%3D+input%28%221+coffee+%244%2C+2+cake+%245%2C+3+pay%3A+%22%29%0A++++if+choice+%3D%3D+%221%22%3A%0A++++++++total+%2B%3D+4%0A++++++++print%28%22Coffee+added.+Total%3A+%24%22+%2B+str%28total%29%29%0A++++elif+choice+%3D%3D+%222%22%3A%0A++++++++how_many+%3D+input%28%22How+many+cakes%3F+%22%29%0A++++++++if+how_many.isdigit%28%29%3A%0A++++++++++++total+%2B%3D+5+*+int%28how_many%29%0A++++++++++++print%28%22Cakes+added.+Total%3A+%24%22+%2B+str%28total%29%29%0A++++++++else%3A%0A++++++++++++print%28%22Please+type+a+number.%22%29%0A++++elif+choice+%3D%3D+%223%22%3A%0A++++++++break%0A++++else%3A%0A++++++++print%28%22Please+choose+1%2C+2+or+3.%22%29%0Aprint%28%22Please+pay+%24%22+%2B+str%28total%29%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-app/?full=step-2#step-2)

<!-- Speaker note: Run it and compare with your prediction. Try a quantity that is a word. -->

<!-- Speaker note: Teacher: run with a word as the quantity. Ask which line protected the program. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 19. One coffee is $4. Choice 2 asks how many and adds $5 for each, so 3 cakes add $15, and 4 + 15 = 19.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
total = 0
while True:
    choice = input("1 coffee $4, 2 cake $5, 3 pay: ")
    if choice == "1":
        total += 4
        print("Coffee added. Total: $" + str(total))
    elif choice == "2":
        how_many = input("How many cakes? ")
        if how_many.isdigit():
            total += 5 * int(how_many)
            print("Cakes added. Total: $" + str(total))
        else:
            print("Please type a number.")
    elif choice == "3":
        break
    else:
        print("Please choose 1, 2 or 3.")
print("Please pay $" + str(total))
```

<!-- Speaker note: What this step is for: A bigger app is the small moves working together. You can predict a change by following the parts it touches. -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does the job?

**Which part stops the program crashing when the quantity is a word?**

- The while True
- The function
- The break
- The isdigit check before int

* Answer: The isdigit check before int

<!-- Speaker note: text.isdigit() asks whether the quantity is all digits before int is used. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow a change

**You choose 2 and type 2 as the quantity, and then choose 3. What is the total?**

* Answer: 10

<!-- Speaker note: Two cakes at $5 each are $10. The total starts at 0 and cake adds price × quantity. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Change **one** thing at a time, predicting each result before you run it. Add a new item to the menu with its own price, and make pay choice 4.

<!-- Speaker note: What this step is for: Predict first, then run: the gap between them shows what you do not yet understand. Hints, in order: Copy the cake branch and change the name and the price. / Add a line to the menu text so people know the new choice, and move pay to choice 4. For students who need more support: Give the café with one branch missing and ask for it. For early finishers: Save the order to a list and print every item at the end. The hard part, on purpose: Planning before typing. Ask for the choices and what ends the program. When students get stuck: The menu never ends. Ask: Which line runs break? Fix: One branch needs a break, indented inside the loop. / A crash when a word is typed for a quantity. Ask: Is int called before or after the isdigit check? Fix: Check inside an if first, and convert inside it. -->

<!-- Speaker note: Teacher: encourage one change and a run at a time. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=total+%3D+0%0Awhile+True%3A%0A++++choice+%3D+input%28%221+coffee+%244%2C+2+cake+%245%2C+3+pay%3A+%22%29%0A++++if+choice+%3D%3D+%221%22%3A%0A++++++++total+%2B%3D+4%0A++++++++print%28%22Coffee+added.+Total%3A+%24%22+%2B+str%28total%29%29%0A++++elif+choice+%3D%3D+%222%22%3A%0A++++++++how_many+%3D+input%28%22How+many+cakes%3F+%22%29%0A++++++++if+how_many.isdigit%28%29%3A%0A++++++++++++total+%2B%3D+5+*+int%28how_many%29%0A++++++++++++print%28%22Cakes+added.+Total%3A+%24%22+%2B+str%28total%29%29%0A++++++++else%3A%0A++++++++++++print%28%22Please+type+a+number.%22%29%0A++++elif+choice+%3D%3D+%223%22%3A%0A++++++++break%0A++++else%3A%0A++++++++print%28%22Please+choose+1%2C+2+or+3.%22%29%0Aprint%28%22Please+pay+%24%22+%2B+str%28total%29%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-app/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a console app of your own. Pick a theme: a game shop, a canteen order, a fitness log or a unit converter. It needs:

- a menu that keeps showing (`while True`) and a way to quit (`break`)
- at least one number typed by the person and checked before use
- a total that builds up (`+=`)
- a reply for a wrong choice

Then write three test cases for the part that works out replies, including one wrong input. Change one thing and predict what will happen before you run it.

You have finished the console course. Every Python extension starts from here.

<!-- Speaker note: Hints, in order: Plan it on paper first: what are the choices, what is stored, when does it end? / Start from the café and change the theme, the prices and the replies. -->

<!-- Speaker note: Teacher: this is the main task. Milestones: it runs and shows a menu; a choice adds to a total; a typed number is checked; it quits with break; three test cases pass. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Your+console+app%3A+a+menu%2C+a+checked+number%2C+a+running+total%2C+and+a+way+to+quit.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/console/console-app/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## App showcase <span style="font-size:.6em;color:#64748b">(6 min)</span>

Show your app to another pair. They try it, including a wrong input, and tell you one thing that works well and one that could be better.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name three moves your app uses and the line that shows each.**

* Any three of: input, int with isdigit, while True with break, +=, if/elif/else, a function.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The Python extensions all start here: objects, data detective, deeper console Python, and apps with Gradio. -->
