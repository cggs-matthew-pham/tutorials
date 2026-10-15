---
title: "Working with text"
subtitle: "Deeper Python in the console · Working with text · Lesson 1"
---

# Working with text

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every search box, chat window and voice assistant starts the same way: tidy what was typed, then cut it into words.


:::teacher-note

**In one sentence:** Students tidy typed text with strip() and lower(), cut it into words with split(), pick words by place, and see why text must be tidied before it is compared. It is the first part of a text adventure.

**Students should be able to say:** I can tidy typed text with strip() and lower(). I can cut text into words with split() and pick a word by its place. I can explain why text should be tidied before it is compared.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`strip()` removes spaces from both ends of the text; `lower()` turns capitals into small letters. Each gives back new text. What will `len(command)` be?

```python
command = "  Go NORTH "
command = command.strip().lower()
print(command)
print(len(command))
```

:::keep-together

**What is the second line it prints?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 8. strip() removes the spaces at both ends and lower() makes the capitals small, so command is "go north": 2 letters, a space and 5 letters.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Which word?

**You type   Take LAMP   (with spaces around it). What is words[1]?**

☐  LAMP 

☐ take

☐ LAMP

☐ lamp

:::


:::teacher-note

**Answer:** lamp

strip() and lower() turn it into "take lamp"; split() makes ["take", "lamp"], and place 1 is "lamp".

:::


:::keep-together

### Count the words

**You type: pick up the red key. How many words does split() give?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 5

split() cuts at every space: pick, up, the, red, key. Five words, so the program asks for two.

:::


:::keep-together

### Spot the bug

**You type Yes and the door stays shut. Click the line that causes it.**

```
 1  answer = input("Open the door? ")
 2  if answer == "yes":
 3      print("The door opens.")
 4  else:
 5      print("The door stays shut.")
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

"Yes" == "yes" is False: capitals count. Compare tidied text: answer.strip().lower() == "yes".

:::


:::typical

## Modify


**Quit.** Make the program say goodbye when the command is `quit`.

**Known verbs only.** Accept only the verbs `go`, `take` and `look`. For any other verb, print `I don't understand` and the word.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Quit:**

```python
command = input("What do you do? ")
command = command.strip().lower()
words = command.split()
if command == "quit":
    print("Goodbye!")
elif len(words) == 2:
    print("Verb: " + words[0])
    print("Thing: " + words[1])
else:
    print("Try two words, such as: go north")
```

**Known verbs only:**

```python
command = input("What do you do? ")
command = command.strip().lower()
words = command.split()
if len(words) == 2:
    if words[0] in ["go", "take", "look"]:
        print("Verb: " + words[0])
        print("Thing: " + words[1])
    else:
        print("I don't understand " + words[0] + ".")
else:
    print("Try two words, such as: go north")
```

:::

:::


## Make initials

Ask for someone's **full name**. Print their **initials** (the first letter of each word, in capitals) and their whole name in capitals. `word[0]` is the first letter of a word, just as `words[0]` is the first word. Test it with extra spaces and with three names.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
name = input("What is your full name? ")
words = name.strip().split()
initials = ""
for word in words:
    initials = initials + word[0].upper()
print("Initials: " + initials)
print("In capitals: " + name.strip().upper())
```

:::


:::wider

## Where this leads

Next lesson keeps things in a **list** that grows and shrinks: the adventurer's bag.

:::


## Exit ticket

:::keep-together

**What does "  Hello World ".strip().lower().split() give?**

{{lines-3}}

:::


:::teacher-note

**Answer:** ["hello", "world"]: spaces off the ends, small letters, then cut into words.

:::

