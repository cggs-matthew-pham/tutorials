---
order: 4
unit: quiz
optional: true
introduces: [class, method, attribute, object]
title: A class for questions
summary: "Store each question as an object of your own class, Question, with a check method, so each question knows how to mark itself."
language: python
hook: "Big apps are built from objects that look after themselves: a question that knows its answer and how to give feedback is easier to reuse than loose dictionaries."
---
Optional. Last lesson each question was a dictionary, and `mark` did all the work. A **class** is a kind of object you design yourself: `class Question` says what every question **has** (its text, choices and answer, stored as `self.text`, `self.choices`, `self.answer`) and what it can **do** (its **methods**: `check(guess)` and `feedback(guess)`). `Question("What is 7 x 8?", [...], "56")` makes one. If you did Objects with turtles, this is the same idea.

## Predict

```step
stage: predict
code: quiz.py#predict
check:
  type: predict
  q: "What does the first print show?"
  options: ["False", "True", "\"54\"", "\"56\""]
  actual: "False. q.check(\"54\") compares \"54\" with q.answer, which is \"56\". The second print shows Right: What is 7 x 8?"
```

`q.check("54")` runs the `check` method for this question, with `self` being `q`. What does it compare?

## Run

```step
stage: run
code: quiz.py#run
try: { playground: python, starter: "quiz.py#run", height: 600 }
check: { type: reflect, text: "I can explain what self.answer means inside check." }
```

Run it: the same quiz as last lesson, but each question marks itself. Compare `mark` here with last lesson's.

## Investigate

```step
stage: investigate
code: quiz.py#run
insight: "A class bundles a question's data with the code that uses it; each object answers check and feedback with its own values."
tasks:
  - check:
      type: question
      q: "Inside check, what is self.answer for the second question in the list?"
      options: ["\"8\": self is the question check was called on", "\"Mercury\": the first question's answer", "Every question's answer", "Nothing until mark sets it"]
      answer: 0
      explain: "questions[1].check(...) runs check with self being questions[1], so self.answer is that question's own answer."
  - check:
      type: question
      q: "Compared with last lesson, what got simpler in mark?"
      options: ["It asks each question to check and give feedback, instead of knowing how itself", "It no longer needs a loop", "It has no parameters", "Nothing"]
      answer: 0
      explain: "The marking rules live in the class. Changing how feedback looks means changing one method, for every question at once."
  - check:
      type: bug
      code: quiz.py#bug
      text: "q.check(\"56\") stops with TypeError: Question.check() takes 1 positional argument but 2 were given. Click the line that is wrong."
      answer: 7
      fault: runtime
      misconception: method-self
      explain: "Python passes the object itself as the first argument of every method, so a method's first parameter is self: def check(self, guess):."
```

### Whose answer?

What `self` is.

### What mark lost

Where the rules live now.

### Spot the bug

A method missing `self`.

## Modify

```step
stage: modify
insight: "A new behaviour is a new method; a new piece of data is a new attribute set in __init__."
try: { playground: python, starter: "quiz.py#run", height: 600 }
tasks:
  - hint:
      - "def hint(self): return \"It starts with \" + self.answer[0]"
      - "In feedback, use self.hint() instead of giving the answer away."
    check: { type: code, text: "Add a hint method, and use it in feedback instead of giving the answer.", rules: { contains: ["def hint(self"] } }
  - hint: "Add points to __init__ (self.points = points), give each Question a points value, and add questions[i].points to the score."
    check: { type: code, text: "Give each question its own points, and score by points.", rules: { contains: ["self.points"] } }
```

### Hints

Add a `hint` method (such as the answer's first letter) and use it in the feedback, so a wrong answer gets a hint instead of the answer.

### Points

Give each question a number of **points**, and make the score add them up (harder questions worth more).

## Make: your quiz with objects

```step
stage: make
insight: "Goals only: your own quiz built from Question objects, with something only a class makes easy."
try: { playground: python, starter: "quiz.py#make", height: 600 }
check: { type: code, text: "Build a quiz of at least four Question objects, with the app.", rules: { contains: ["Question(", "gr.Radio("] } }
```

Rebuild your quiz from last lesson with `Question` objects, and add something of your own to the class: a hint, points, a topic, or a method that says how hard the question is.

## Where this leads

```step
stage: info
check:
  type: question
  q: "You want a second kind of question where the player types the answer. Where does the checking code go?"
  options: ["In its own class with its own check method, so mark can still just call check on every question", "In mark, with an if for each kind", "In gr.Interface", "Nowhere: it cannot be done"]
  answer: 0
  explain: "When every kind of question has a check method, mark does not need to know the difference. Designing with objects is about this."
```

Real apps (and Gradio itself) are built from classes: `gr.Radio` and `gr.Textbox` are classes, and each component you made is an object.
