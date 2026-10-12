---
title: "A class for questions"
subtitle: "Apps with Gradio · A quiz app · Lesson 4"
---

# A class for questions

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Big apps are built from objects that look after themselves: a question that knows its answer and how to give feedback is easier to reuse than loose dictionaries.


:::teacher-note

**In one sentence:** An optional lesson. Students rebuild the quiz with a Question class whose objects check answers and give feedback, then add a hint method and points, and rebuild their own quiz with objects.

**Students should be able to say:** I can write a class with __init__ and methods that use self. I can explain what self means inside a method. I can add a method or an attribute to a class and use it.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`q.check("54")` runs the `check` method for this question, with `self` being `q`. What does it compare?

```python
class Question:
    def __init__(self, text, choices, answer):
        self.text = text
        self.choices = choices
        self.answer = answer

    def check(self, guess):
        return guess == self.answer

    def feedback(self, guess):
        if self.check(guess):
            return "Right: " + self.text
        return "Not quite: " + self.text + " The answer is " + self.answer + "."


q = Question("What is 7 x 8?", ["54", "56", "64"], "56")
print(q.check("54"))
print(q.feedback("56"))
```

:::keep-together

**What does the first print show?**

☐ False

☐ "54"

☐ True

☐ "56"

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** False. q.check("54") compares "54" with q.answer, which is "56". The second print shows Right: What is 7 x 8?

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import gradio as gr

class Question:
    def __init__(self, text, choices, answer):
        self.text = text
        self.choices = choices
        self.answer = answer

    def check(self, guess):
        return guess == self.answer

    def feedback(self, guess):
        if self.check(guess):
            return "Right: " + self.text
        return "Not quite: " + self.text + " The answer is " + self.answer + "."


questions = [
    Question("Which planet is closest to the Sun?", ["Venus", "Mercury", "Mars"], "Mercury"),
    Question("How many legs does a spider have?", ["6", "8", "10"], "8"),
    Question("What is 7 x 8?", ["54", "56", "64"], "56"),
]


def mark(a1, a2, a3):
    answers = [a1, a2, a3]
    score = 0
    lines = ""
    for i in range(len(questions)):
        if questions[i].check(answers[i]):
            score = score + 1
        lines = lines + questions[i].feedback(answers[i]) + "\n"
    return str(score) + " out of " + str(len(questions)), lines


inputs = []
for q in questions:
    inputs.append(gr.Radio(q.choices, label=q.text))

gr.Interface(fn=mark, inputs=inputs, outputs=[gr.Textbox(label="Score"), gr.Textbox(label="Feedback")], title="Quick quiz").launch()
```

:::keep-together

### Whose answer?

**Inside check, what is self.answer for the second question in the list?**

☐ Nothing until mark sets it

☐ "Mercury": the first question's answer

☐ Every question's answer

☐ "8": self is the question check was called on

:::


:::teacher-note

**Answer:** "8": self is the question check was called on

questions[1].check(...) runs check with self being questions[1], so self.answer is that question's own answer.

:::


:::keep-together

### What mark lost

**Compared with last lesson, what got simpler in mark?**

☐ It has no parameters

☐ It no longer needs a loop

☐ Nothing

☐ It asks each question to check and give feedback, instead of knowing how itself

:::


:::teacher-note

**Answer:** It asks each question to check and give feedback, instead of knowing how itself

The marking rules live in the class. Changing how feedback looks means changing one method, for every question at once.

:::


:::keep-together

### Spot the bug

**q.check("56") stops with TypeError: Question.check() takes 1 positional argument but 2 were given. Click the line that is wrong.**

```
 1  class Question:
 2      def __init__(self, text, choices, answer):
 3          self.text = text
 4          self.choices = choices
 5          self.answer = answer
 6  
 7      def check(guess):
 8          return guess == self.answer
 9  
10      def feedback(self, guess):
11          if self.check(guess):
12              return "Right: " + self.text
13          return "Not quite: " + self.text + " The answer is " + self.answer + "."
14  
15  
16  q = Question("What is 7 x 8?", ["54", "56", "64"], "56")
17  print(q.check("56"))
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

Python passes the object itself as the first argument of every method, so a method's first parameter is self: def check(self, guess):.

:::


:::typical

## Modify


**Hints.** Add a `hint` method (such as the answer's first letter) and use it in the feedback, so a wrong answer gets a hint instead of the answer.

**Points.** Give each question a number of **points**, and make the score add them up (harder questions worth more).

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Hints:**

```python
import gradio as gr

class Question:
    def __init__(self, text, choices, answer):
        self.text = text
        self.choices = choices
        self.answer = answer

    def check(self, guess):
        return guess == self.answer

    def hint(self):
        return "It starts with " + self.answer[0]

    def feedback(self, guess):
        if self.check(guess):
            return "Right: " + self.text
        return "Not quite: " + self.text + " " + self.hint() + "."


questions = [
    Question("Which planet is closest to the Sun?", ["Venus", "Mercury", "Mars"], "Mercury"),
    Question("How many legs does a spider have?", ["6", "8", "10"], "8"),
    Question("What is 7 x 8?", ["54", "56", "64"], "56"),
]


def mark(a1, a2, a3):
    answers = [a1, a2, a3]
    score = 0
    lines = ""
    for i in range(len(questions)):
        if questions[i].check(answers[i]):
            score = score + 1
        lines = lines + questions[i].feedback(answers[i]) + "\n"
    return str(score) + " out of " + str(len(questions)), lines


inputs = []
for q in questions:
    inputs.append(gr.Radio(q.choices, label=q.text))

gr.Interface(fn=mark, inputs=inputs, outputs=[gr.Textbox(label="Score"), gr.Textbox(label="Feedback")], title="Quick quiz").launch()
```

**Points:**

```python
import gradio as gr

class Question:
    def __init__(self, text, choices, answer, points):
        self.text = text
        self.choices = choices
        self.answer = answer
        self.points = points

    def check(self, guess):
        return guess == self.answer

    def feedback(self, guess):
        if self.check(guess):
            return "Right: " + self.text
        return "Not quite: " + self.text + " The answer is " + self.answer + "."


questions = [
    Question("Which planet is closest to the Sun?", ["Venus", "Mercury", "Mars"], "Mercury", 1),
    Question("How many legs does a spider have?", ["6", "8", "10"], "8", 1),
    Question("What is 7 x 8?", ["54", "56", "64"], "56", 2),
]


def mark(a1, a2, a3):
    answers = [a1, a2, a3]
    score = 0
    lines = ""
    for i in range(len(questions)):
        if questions[i].check(answers[i]):
            score = score + questions[i].points
        lines = lines + questions[i].feedback(answers[i]) + "\n"
    total = 0
    for q in questions:
        total = total + q.points
    return str(score) + " out of " + str(total), lines


inputs = []
for q in questions:
    inputs.append(gr.Radio(q.choices, label=q.text))

gr.Interface(fn=mark, inputs=inputs, outputs=[gr.Textbox(label="Score"), gr.Textbox(label="Feedback")], title="Quick quiz").launch()
```

:::

:::


## Make: your quiz with objects

Rebuild your quiz from last lesson with `Question` objects, and add something of your own to the class: a hint, points, a topic, or a method that says how hard the question is.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```python
import gradio as gr

class Question:
    def __init__(self, text, choices, answer):
        self.text = text
        self.choices = choices
        self.answer = answer

    def check(self, guess):
        return guess == self.answer

    def feedback(self, guess):
        if self.check(guess):
            return "Right: " + self.text
        return "Not quite: " + self.text + " The answer is " + self.answer + "."


questions = [
    Question("Which instrument has 88 keys?", ["Piano", "Organ", "Accordion"], "Piano"),
    Question("How many strings does a violin have?", ["4", "5", "6"], "4"),
    Question("Which family is the trumpet in?", ["Woodwind", "Brass", "Percussion"], "Brass"),
    Question("What does forte mean?", ["Loud", "Soft", "Fast"], "Loud"),
]


def mark(a1, a2, a3, a4):
    answers = [a1, a2, a3, a4]
    score = 0
    lines = ""
    for i in range(len(questions)):
        if questions[i].check(answers[i]):
            score = score + 1
        lines = lines + questions[i].feedback(answers[i]) + "\n"
    return str(score) + " out of " + str(len(questions)), lines


inputs = []
for q in questions:
    inputs.append(gr.Radio(q.choices, label=q.text))

gr.Interface(fn=mark, inputs=inputs, outputs=[gr.Textbox(label="Score"), gr.Textbox(label="Feedback")], title="Music quiz").launch()
```

:::


:::wider

## Where this leads

Real apps (and Gradio itself) are built from classes: `gr.Radio` and `gr.Textbox` are classes, and each component you made is an object.

:::


## Exit ticket

:::keep-together

**What is self inside a method?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The object the method was called on, so self.answer is that object's own answer.

:::

