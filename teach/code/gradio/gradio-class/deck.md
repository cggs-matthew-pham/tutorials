---
marp: true
theme: default
html: true
---

# A class for questions

Apps with Gradio · A quiz app

<!-- Speaker note: An optional lesson. Students rebuild the quiz with a Question class whose objects check answers and give feedback, then add a hint method and points, and rebuild their own quiz with objects. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** store each question as an object of your own class, Question, with a check method, so each question knows how to mark itself.

- I can write a class with __init__ and methods that use self.
- I can explain what self means inside a method.
- I can add a method or an attribute to a class and use it.

<!-- Speaker note: Before class: Optional: not needed for completing the course. Students who did Objects with turtles have met classes; for others the lesson introduces them briefly. `class Question` stores each question's text, choices and answer as attributes (`self.answer`), set in `__init__`, and has methods `check(guess)` and `feedback(guess)`. Python passes the object as the first argument of every method, so the first parameter is `self` (the bug task leaves it out, and the error says it got 2 arguments instead of 1). `mark` now asks each question to check itself. The info question introduces the idea behind designing with objects: different kinds of question can each have a check method. -->

---

## Why it matters

> Big apps are built from objects that look after themselves: a question that knows its answer and how to give feedback is easier to reuse than loose dictionaries.

<!-- Speaker note: Optional. Last lesson each question was a dictionary, and `mark` did all the work. A **class** is a kind of object you design yourself: `class Question` says what every question **has** (its text, choices and answer, stored as `self.text`, `self.choices`, `self.answer`) and what it can **do** (its **methods**: `check(guess)` and `feedback(guess)`). `Question("What is 7 x 8?", [...], "56")` makes one. If you did Objects with turtles, this is the same idea. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What does the first print show?**

- False
- "54"
- True
- "56"

<!-- Speaker note: What happens: False. q.check("54") compares "54" with q.answer, which is "56". The second print shows Right: What is 7 x 8? Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw one Question object as a box with its three values and two methods. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* False. q.check("54") compares "54" with q.answer, which is "56". The second print shows Right: What is 7 x 8?

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/gradio/gradio-class/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/gradio/gradio-class/?full=step-2#step-2)

<!-- Speaker note: Run it: the same quiz as last lesson, but each question marks itself. Compare `mark` here with last lesson's. Students should be able to say: I can explain what self.answer means inside check. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 41 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/gradio/gradio-class/?full=step-3#step-3)

<!-- Speaker note: What this step is for: A class bundles a question's data with the code that uses it; each object answers check and feedback with its own values. -->

<!-- Speaker note: Teacher: ask what self is when questions[2].check(...) runs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Whose answer?

**Inside check, what is self.answer for the second question in the list?**

- Nothing until mark sets it
- "Mercury": the first question's answer
- Every question's answer
- "8": self is the question check was called on

* Answer: "8": self is the question check was called on

<!-- Speaker note: questions[1].check(...) runs check with self being questions[1], so self.answer is that question's own answer. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What mark lost

**Compared with last lesson, what got simpler in mark?**

- It has no parameters
- It no longer needs a loop
- Nothing
- It asks each question to check and give feedback, instead of knowing how itself

* Answer: It asks each question to check and give feedback, instead of knowing how itself

<!-- Speaker note: The marking rules live in the class. Changing how feedback looks means changing one method, for every question at once. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 7

<!-- Speaker note: Python passes the object itself as the first argument of every method, so a method's first parameter is self: def check(self, guess):. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Hints:** Add a `hint` method (such as the answer's first letter) and use it in the feedback, so a wrong answer gets a hint instead of the answer.
- **Points:** Give each question a number of **points**, and make the score add them up (harder questions worth more).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/gradio/gradio-class/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A new behaviour is a new method; a new piece of data is a new attribute set in __init__. Hints, in order: def hint(self): return "It starts with " + self.answer[0] / In feedback, use self.hint() instead of giving the answer away. / Add points to __init__ (self.points = points), give each Question a points value, and add questions[i].points to the score. For students who need more support: Give students the hint method written out, and ask them only to use it in feedback. For early finishers: Make a TypedQuestion class with its own check that compares lower-case text, for questions answered in a Textbox. The hard part, on purpose: What self is inside a method. Ask which question check was called on, and what self.answer is for it. When students get stuck: TypeError: ... takes 1 positional argument but 2 were given. Ask: Is self the first parameter of the method? Fix: def check(self, guess):. / AttributeError: 'Question' object has no attribute 'points'. Ask: Is points stored in __init__ with self.? Fix: self.points = points in __init__, and pass a value when making each Question. / NameError: name 'answer' is not defined, inside a method. Ask: Does the method use self.answer, or just answer? Fix: Use self.answer: the object's own value. -->

<!-- Speaker note: Teacher: hint first (a method), then points (an attribute in __init__). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your quiz with objects

Rebuild your quiz from last lesson with `Question` objects, and add something of your own to the class: a hint, points, a topic, or a method that says how hard the question is.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/gradio/gradio-class/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: your own quiz built from Question objects, with something only a class makes easy. -->

---

## Where this leads

Real apps (and Gradio itself) are built from classes: `gr.Radio` and `gr.Textbox` are classes, and each component you made is an object.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What is self inside a method?**

* The object the method was called on, so self.answer is that object's own answer.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Gradio's components are classes too. Machine learning with Gradio (coming later) and games with microStudio build on objects. -->
