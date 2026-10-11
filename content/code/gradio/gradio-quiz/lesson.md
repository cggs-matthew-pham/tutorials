---
order: 3
unit: quiz
introduces: [dict, list-change]
title: A quiz app
summary: "Keep a quiz's questions as data, make a Radio input for each one with a loop, and write the function that marks the answers and gives feedback."
language: python
hook: "Quiz apps, flashcards and online tests are all the same idea: questions stored as data, and code that checks the answers."
---
A quiz is **data**: each question has its text, its choices and its answer. Here each question is a **dictionary**, which looks a value up by its name (its key): `q["answer"]`. The questions are in a list, so a loop can make one **Radio** input for each (`inputs.append(...)` adds it to the end of the `inputs` list), and the marking function can check every answer the same way.

## Predict

```step
stage: predict
code: quiz.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["1", "2", "0", "An error"]
  actual: "1. The first answer, \"8\", matches; the second, \"54\", does not match \"56\"."
```

The loop compares `answers[0]` with question 0's answer, then `answers[1]` with question 1's. How many match?

## Run

```step
stage: run
code: quiz.py#run
try: { playground: python, starter: "quiz.py#run", height: 600 }
check: { type: reflect, text: "I can explain how the three Radio inputs were made from the list." }
unlocks: [a-quiz-question]
```

Run it, answer the questions and press **Submit**. Get one wrong on purpose and read the feedback. Then change a question's text in the list and run again: the app changes with the data.

## Investigate

```step
stage: investigate
code: quiz.py#run
insight: "Questions as data means one loop makes the inputs and one loop marks the answers; adding a question is adding data (and one more parameter)."
tasks:
  - check:
      type: question
      q: "Where do the three Radio inputs come from?"
      options: ["The loop over questions appends one Radio for each question", "gr.Interface makes one for each question by itself", "There are three Radio lines written by hand", "The mark function"]
      answer: 0
      explain: "inputs starts empty, and the loop appends a gr.Radio with that question's choices and text. Four questions would make four inputs."
  - check:
      type: question
      q: "What does mark get as a1 when the first question is answered Mercury?"
      options: ["\"Mercury\"", "True", "0", "The whole question"]
      answer: 0
      explain: "A Radio gives the chosen text. mark compares it with q[\"answer\"]."
  - check:
      type: bug
      code: quiz.py#bug
      text: "The score is never more than 1, even with every answer right. Click the line that is wrong."
      answer: 16
      fault: logic
      misconception: return-in-loop
      explain: "return is indented inside the loop, so the function ends after the first question. Return after the loop, not inside it."
```

### Inputs from data

One Radio per question.

### What an answer is

The chosen text.

### Spot the bug

A score that stops at 1.

## Modify

```step
stage: modify
insight: "Changing a quiz is mostly changing data; the code needs only a parameter per question and a message per score."
try: { playground: python, starter: "quiz.py#run", height: 600 }
tasks:
  - hint: "Add a fourth dictionary to the list, then a fourth parameter: def mark(a1, a2, a3, a4): and answers = [a1, a2, a3, a4]."
    check: { type: code, text: "Add a fourth question.", rules: { contains: ["a4"] } }
  - hint: "Before the return: if score == len(questions): add \"Perfect score!\" to the feedback."
    check: { type: code, text: "Add a message for a perfect score.", rules: { contains: ["== len(questions)"] } }
  - hint: "A Radio with nothing chosen gives None. Check if answers[i] is None: first, and say the question was not answered."
    check: { type: code, text: "Say which questions were not answered, instead of marking them wrong.", rules: { contains: ["is None"] } }
```

### A fourth question

Add a question of your own. What else has to change?

### Perfect score

Add a message to the feedback when every answer is right.

### No answer

A question left blank gives `None` (Python's word for "no value"). Say it was not answered, instead of "Not quite".

## Make: your own quiz

```step
stage: make
insight: "Goals only: a quiz on a topic you know, with questions as data, inputs made by a loop and helpful feedback."
try: { playground: python, starter: "quiz.py#make", height: 600 }
tasks:
  - check: { type: code, text: "Make a quiz of at least four questions on your own topic, with a Radio for each made by a loop.", rules: { contains: ["gr.Radio(", "\"answer\""], loops: 1 } }
  - check: { type: reflect, text: "A classmate took my quiz, and I fixed one thing they found confusing." }
```

### Your quiz

Make a quiz on something you know well (a sport, a game, a subject, music) with at least four questions and feedback that helps someone learn.

### Test it with someone

Swap with a classmate. Fix one thing they found confusing.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your teacher wants a quiz with 30 questions. What is the main problem with mark(a1, a2, ..., a30)?"
  options: ["A parameter per question is a lot to write; Python's *answers takes any number of them as a list", "Gradio allows only 10 inputs", "Radio cannot show 30 questions", "Nothing: it is fine"]
  answer: 0
  explain: "def mark(*answers): collects every input into one list, so the function works for any number of questions. It is the stretch for this lesson."
```

On a computer this same file is a real quiz app, and a teacher can host it as a Hugging Face Space for the class. The optional next lesson stores each question as an object with its own `check` method.
