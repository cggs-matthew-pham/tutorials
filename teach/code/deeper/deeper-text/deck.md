---
marp: true
theme: default
html: true
---

# Working with text

Deeper Python in the console · Working with text

<!-- Speaker note: Students tidy typed text with strip() and lower(), cut it into words with split(), pick words by place, and see why text must be tidied before it is compared. It is the first part of a text adventure. About 45 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** tidy typed text with strip() and lower(), cut it into words with split(), and pick out a word by its place.

- I can tidy typed text with strip() and lower().
- I can cut text into words with split() and pick a word by its place.
- I can explain why text should be tidied before it is compared.

<!-- Speaker note: Before class: Read the unit primer first. Text has its own commands, called with a dot: `command.strip()` removes spaces at both ends, `.lower()` and `.upper()` change capitals, and `.split()` gives a list of words. Each gives back new text; the original is unchanged unless you store the result (`command = command.strip()`). They can be chained: `input("> ").strip().lower()`. The bug task is the reason they matter: `"Yes" == "yes"` is False. `in` checks whether something is in a list. Teacher: Bug task: ask how many ways a person could type yes (Yes, YES, yes with a space). -->

---

## Why it matters

> Every search box, chat window and voice assistant starts the same way: tidy what was typed, then cut it into words.

<!-- Speaker note: What people type is messy: extra spaces, capitals, more words than you expect. Text has its own commands, called with a dot (`command.lower()`), that tidy it and cut it up. In this course you build the parts of a **text adventure**, starting with understanding a typed command. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
command = "  Go NORTH "
command = command.strip().lower()
print(command)
print(len(command))
```

**What is the second line it prints?**

<!-- Speaker note: What happens: 8. strip() removes the spaces at both ends and lower() makes the capitals small, so command is "go north": 2 letters, a space and 5 letters. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: write " Go NORTH " on the board and cross off what strip() and lower() change, then count. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=command+%3D+input%28%22What+do+you+do%3F+%22%29%0Acommand+%3D+command.strip%28%29.lower%28%29%0Awords+%3D+command.split%28%29%0Aprint%28%22You+typed+%22+%2B+str%28len%28words%29%29+%2B+%22+words.%22%29%0Aif+len%28words%29+%3D%3D+2%3A%0A++++print%28%22Verb%3A+%22+%2B+words%5B0%5D%29%0A++++print%28%22Thing%3A+%22+%2B+words%5B1%5D%29%0Aelse%3A%0A++++print%28%22Try+two+words%2C+such+as%3A+go+north%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-text/?full=step-2#step-2)

<!-- Speaker note: Run it and type a command such as `go north`, then try ` TAKE lamp ` and `look`. `split()` cuts the text into a **list** of words at the spaces, so `words[0]` is the first word. Students should be able to say: I can explain how the program finds the verb, however the command was typed. -->

<!-- Speaker note: Teacher: ask students to try to break it: extra spaces, capitals, one word, five words. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 8. strip() removes the spaces at both ends and lower() makes the capitals small, so command is "go north": 2 letters, a space and 5 letters.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
command = input("What do you do? ")
command = command.strip().lower()
words = command.split()
print("You typed " + str(len(words)) + " words.")
if len(words) == 2:
    print("Verb: " + words[0])
    print("Thing: " + words[1])
else:
    print("Try two words, such as: go north")
```

<!-- Speaker note: What this step is for: Tidying text before comparing it, and splitting it into words, turns messy typing into something a program can understand. -->

<!-- Speaker note: Teacher: words[1] is the second word, as list places start at 0. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which word?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
command = input("What do you do? ")
command = command.strip().lower()
words = command.split()
print("You typed " + str(len(words)) + " words.")
if len(words) == 2:
    print("Verb: " + words[0])
    print("Thing: " + words[1])
else:
    print("Try two words, such as: go north")
```

</div>
<div>

**You type   Take LAMP   (with spaces around it). What is words[1]?**

-  LAMP 
- take
- LAMP
- lamp

* Answer: lamp

</div>
</div>

<!-- Speaker note: strip() and lower() turn it into "take lamp"; split() makes ["take", "lamp"], and place 1 is "lamp". -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the words

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
command = input("What do you do? ")
command = command.strip().lower()
words = command.split()
print("You typed " + str(len(words)) + " words.")
if len(words) == 2:
    print("Verb: " + words[0])
    print("Thing: " + words[1])
else:
    print("Try two words, such as: go north")
```

</div>
<div>

**You type: pick up the red key. How many words does split() give?**

* Answer: 5

</div>
</div>

<!-- Speaker note: split() cuts at every space: pick, up, the, red, key. Five words, so the program asks for two. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**You type Yes and the door stays shut. Click the line that causes it.**

```
 1  answer = input("Open the door? ")
 2  if answer == "yes":
 3      print("The door opens.")
 4  else:
 5      print("The door stays shut.")
```

* Answer: line 2

<!-- Speaker note: "Yes" == "yes" is False: capitals count. Compare tidied text: answer.strip().lower() == "yes". -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Quit:** Make the program say goodbye when the command is `quit`.
- **Known verbs only:** Accept only the verbs `go`, `take` and `look`. For any other verb, print `I don't understand` and the word.

<!-- Speaker note: What this step is for: A program that understands commands checks the tidied text, and checks words against a list of the ones it knows. Hints, in order: Before the other checks, add if command == "quit": and print a goodbye. Change the next if to elif. / in checks whether something is in a list: words[0] in ["go", "take", "look"]. / Print the verb and thing only for known verbs; otherwise print I don't understand. For students who need more support: Give students the line that splits the name, and ask them to build the initials with a loop. For early finishers: Accept short commands too, such as n for go north, by checking a list of short forms. The hard part, on purpose: Seeing why Yes and yes differ, and what split() gives back. Have them print the tidied text and the list of words before they fix the comparison. When students get stuck: The program ignores a command that looks right. Ask: Was the text tidied before it was compared? Fix: Compare the tidied text: command.strip().lower() == "quit". / IndexError: list index out of range. Ask: How many words did split() give? Is there a words[1]? Fix: Check len(words) before using words[1]. / The text did not change after strip() or lower(). Ask: Was the result stored? Fix: command = command.lower(): the method gives back new text. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=command+%3D+input%28%22What+do+you+do%3F+%22%29%0Acommand+%3D+command.strip%28%29.lower%28%29%0Awords+%3D+command.split%28%29%0Aprint%28%22You+typed+%22+%2B+str%28len%28words%29%29+%2B+%22+words.%22%29%0Aif+len%28words%29+%3D%3D+2%3A%0A++++print%28%22Verb%3A+%22+%2B+words%5B0%5D%29%0A++++print%28%22Thing%3A+%22+%2B+words%5B1%5D%29%0Aelse%3A%0A++++print%28%22Try+two+words%2C+such+as%3A+go+north%22%29%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-text/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make initials

Ask for someone's **full name**. Print their **initials** (the first letter of each word, in capitals) and their whole name in capitals. `word[0]` is the first letter of a word, just as `words[0]` is the first word. Test it with extra spaces and with three names.

<!-- Speaker note: What this step is for: The same tools (strip, split, a place, upper) answer a new question: they are not just for adventures. -->

<!-- Speaker note: Teacher: word[0] is the first letter of a word, the same idea as words[0]. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make initials

{{embed: https://studio.learningwaypoints.com/tutorials/_playground/index.html?code=%23+Ask+for+someone%27s+full+name%2C+then+print+their+initials+and+their+name+in+capitals.%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/deeper/deeper-text/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Next lesson keeps things in a **list** that grows and shrinks: the adventurer's bag.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does "  Hello World ".strip().lower().split() give?**

* ["hello", "world"]: spaces off the ends, small letters, then cut into words.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson keeps an inventory in a list (append, remove, in). The parser from this lesson comes back in the text adventure. -->
