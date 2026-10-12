---
marp: true
theme: default
html: true
---

# A bag that grows

Deeper Python in the console · Lists and dictionaries

<!-- Speaker note: Students keep an inventory in a list that grows with append() and shrinks with remove(), check with in before removing, list it with join(), and build a shopping list app. About 45 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** add to a list with append(), take out with remove(), check with in, and list it with join().

- I can add to and remove from a list while the program runs.
- I can check whether something is in a list with in before removing it.
- I can show a list neatly with join().

<!-- Speaker note: Before class: Read the unit primer first. `bag.append(x)` adds to the end; `bag.remove(x)` takes the first `x` out and stops with a ValueError if it is not there, so check with `x in bag` first. `", ".join(bag)` joins a list of texts into one, with a comma and space between. `items.sort()` puts the list itself in order. Students met `break` and `while True` in the console bridge. Teacher: Bug task: ask what should happen when someone drops something they do not have. -->

---

## Why it matters

> A shopping basket, a playlist, a to-do list: all lists that grow and shrink while the program runs.

<!-- Speaker note: The adventurer needs a **bag**: a list that starts empty, grows when something is taken and shrinks when it is dropped. Lists have their own commands for that, called with a dot, like text. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
bag = ["lamp", "map"]
bag.append("key")
bag.remove("map")
print(bag)
print("map" in bag)
```

**What is the first line it prints?**

- ['lamp', 'map', 'key']
- ['lamp', 'key']
- ['lamp', 'map']
- ['key', 'lamp']

<!-- Speaker note: What happens: ['lamp', 'key']. append() put "key" on the end; remove() took "map" out. The second line is False: "map" is no longer in the bag. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the bag as boxes; add one on the end, cross one out. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=bag+%3D+%5B%5D%0Awhile+True%3A%0A++++command+%3D+input%28%22%3E+%22%29.strip%28%29.lower%28%29%0A++++words+%3D+command.split%28%29%0A++++if+command+%3D%3D+%22quit%22%3A%0A++++++++break%0A++++elif+command+%3D%3D+%22bag%22%3A%0A++++++++print%28%22You+carry%3A+%22+%2B+%22%2C+%22.join%28bag%29%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22take%22%3A%0A++++++++bag.append%28words%5B1%5D%29%0A++++++++print%28%22You+take+the+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22drop%22%3A%0A++++++++if+words%5B1%5D+in+bag%3A%0A++++++++++++bag.remove%28words%5B1%5D%29%0A++++++++++++print%28%22You+drop+the+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++++++else%3A%0A++++++++++++print%28%22You+don%27t+have+a+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++else%3A%0A++++++++print%28%22Try%3A+take+lamp%2C+drop+lamp%2C+bag+or+quit%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/deeper/deeper-lists/?full=step-2#step-2)

<!-- Speaker note: Run it and try: `take lamp`, `take key`, `bag`, `drop map`, `drop lamp`, `bag`, `quit`. The loop keeps asking until `quit` (`break` leaves it, as in the console bridge). Students should be able to say: I can explain what happens to the list when I take and drop things. -->

<!-- Speaker note: Teacher: give students the list of commands to type, then let them invent their own. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* ['lamp', 'key']. append() put "key" on the end; remove() took "map" out. The second line is False: "map" is no longer in the bag.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
bag = []
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "take":
        bag.append(words[1])
        print("You take the " + words[1] + ".")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: take lamp, drop lamp, bag or quit")
```

<!-- Speaker note: What this step is for: A list changes while the program runs; checking with in before remove() is what stops a mistake from crashing it. -->

<!-- Speaker note: Teacher: drop map is the interesting row: nothing changes, thanks to the in check. -->

<style scoped>pre, marp-pre { font-size: 0.54em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the bag

**Start with an empty bag. Fill in how many things are in it after each command.**

| command | things in the bag |
|---|---|
| take lamp | 1 |
| take key | ? |
| drop map | ? |
| drop lamp | ? |
| take rope | ? |

* Answer: 2, 2, 1, 2

<!-- Speaker note: drop map changes nothing, because the map is not in the bag: the in check catches it. After drop lamp the bag holds only the key; take rope adds a second thing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why check first?

**Why does the drop part check if words[1] in bag first?**

- remove() stops with an error if the item is not in the list
- in sorts the list
- It is not needed
- To make the program faster

* Answer: remove() stops with an error if the item is not in the list

<!-- Speaker note: remove() only works for items that are there. Checking with in first lets the program reply politely instead of stopping. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**You type map and it stops with ValueError: list.remove(x): x not in list. Click the line where it stops.**

```
 1  bag = ["lamp", "key"]
 2  item = input("Drop what? ")
 3  bag.remove(item)
 4  print(bag)
```

* Answer: line 3

<!-- Speaker note: remove() stops with an error when the item is not in the list. Check first: if item in bag: bag.remove(item). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **How many?:** When the command is `bag`, also print how many things are in it.
- **A full bag:** The bag holds at most **3** things. Taking a fourth prints `Your bag is full.`

<!-- Speaker note: What this step is for: len() and in answer questions about a list; a rule like a full bag is one check before append(). Hints, in order: len(bag) is how many things are in it. Add a line to the bag command that prints it. / Before bag.append(...), check if len(bag) < 3:. Otherwise print that the bag is full. For students who need more support: Give students the loop and the done command, and ask them to add add, remove and show one at a time. For early finishers: Let the shopping list remember how many of each item (milk x2), ready for next lesson's dictionaries. The hard part, on purpose: Checking with in before remove(). Let the ValueError happen first, then ask what the program should say when the thing isn't in the bag. When students get stuck: ValueError: list.remove(x): x not in list. Ask: Was the item in the list? Did you check first? Fix: if item in bag: bag.remove(item), with an else that replies. / TypeError when joining the list. Ask: Is everything in the list text? Fix: Only lists of text can be joined; store words, or use str() first. / The list prints as ['lamp', 'key'] with brackets and quotes. Ask: How do you want it to look? Fix: Use ", ".join(bag) to print lamp, key. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=bag+%3D+%5B%5D%0Awhile+True%3A%0A++++command+%3D+input%28%22%3E+%22%29.strip%28%29.lower%28%29%0A++++words+%3D+command.split%28%29%0A++++if+command+%3D%3D+%22quit%22%3A%0A++++++++break%0A++++elif+command+%3D%3D+%22bag%22%3A%0A++++++++print%28%22You+carry%3A+%22+%2B+%22%2C+%22.join%28bag%29%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22take%22%3A%0A++++++++bag.append%28words%5B1%5D%29%0A++++++++print%28%22You+take+the+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++elif+len%28words%29+%3D%3D+2+and+words%5B0%5D+%3D%3D+%22drop%22%3A%0A++++++++if+words%5B1%5D+in+bag%3A%0A++++++++++++bag.remove%28words%5B1%5D%29%0A++++++++++++print%28%22You+drop+the+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++++++else%3A%0A++++++++++++print%28%22You+don%27t+have+a+%22+%2B+words%5B1%5D+%2B+%22.%22%29%0A++++else%3A%0A++++++++print%28%22Try%3A+take+lamp%2C+drop+lamp%2C+bag+or+quit%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/deeper/deeper-lists/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a shopping list

Write a **shopping list** app. It keeps asking `add, remove, show or done`. `add` asks what to add; `remove` asks what to remove (and says so if it is not on the list); `show` prints the list in order (`items.sort()` puts it in order); `done` prints the final list and stops.

<!-- Speaker note: What this step is for: The same list commands make a different app: add, remove with a check, show in order, finish. -->

<!-- Speaker note: Teacher: students write the loop themselves. Point them to the bag program as a pattern. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make a shopping list

{{embed: https://tutorials.learningwaypoints.com/_playground/index.html?code=%23+A+shopping+list%3A+add+items%2C+remove+items%2C+show+the+list+in+order%2C+until+%22done%22.%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/deeper/deeper-lists/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Next lesson adds the map: rooms and exits stored in **dictionaries**, so the adventurer can walk from room to room.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**bag = ["lamp"]. What happens with bag.remove("key"), and how do you avoid it?**

* It stops with a ValueError because key is not in the bag. Check first: if "key" in bag: bag.remove("key").

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson stores rooms and exits in dictionaries. The bag comes back in the text adventure. -->
