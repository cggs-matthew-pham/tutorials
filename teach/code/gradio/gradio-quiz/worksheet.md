---
title: "A quiz app"
subtitle: "Apps with Gradio · A quiz app · Lesson 3"
---

# A quiz app

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Quiz apps, flashcards and online tests are all the same idea: questions stored as data, and code that checks the answers.


:::teacher-note

**In one sentence:** Students build a quiz app from a list of question dictionaries, make a Radio input for each question with a loop, mark the answers with feedback, then add a question, a perfect-score message and handling for blanks, and make and user-test a quiz of their own.

**Students should be able to say:** I can store questions as a list of dictionaries. I can make inputs from data with a loop, and mark answers with another loop. I can improve an app from a classmate's feedback.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The loop compares `answers[0]` with question 0's answer, then `answers[1]` with question 1's. How many match?

```python
questions = [
    {"q": "How many legs does a spider have?", "answer": "8"},
    {"q": "What is 7 x 8?", "answer": "56"},
]
answers = ["8", "54"]
score = 0
for i in range(len(questions)):
    if answers[i] == questions[i]["answer"]:
        score = score + 1
print(score)
```

:::keep-together

**What does it print?**

☐ 2

☐ 0

☐ An error

☐ 1

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 1. The first answer, "8", matches; the second, "54", does not match "56".

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```python
import gradio as gr

questions = [
    {"q": "Which planet is closest to the Sun?", "choices": ["Venus", "Mercury", "Mars"], "answer": "Mercury"},
    {"q": "How many legs does a spider have?", "choices": ["6", "8", "10"], "answer": "8"},
    {"q": "What is 7 x 8?", "choices": ["54", "56", "64"], "answer": "56"},
]


def mark(a1, a2, a3):
    answers = [a1, a2, a3]
    score = 0
    feedback = ""
    for i in range(len(questions)):
        q = questions[i]
        if answers[i] == q["answer"]:
            score = score + 1
            feedback = feedback + "Right: " + q["q"] + "\n"
        else:
            feedback = feedback + "Not quite: " + q["q"] + " The answer is " + q["answer"] + ".\n"
    return str(score) + " out of " + str(len(questions)), feedback


inputs = []
for q in questions:
    inputs.append(gr.Radio(q["choices"], label=q["q"]))

gr.Interface(
    fn=mark,
    inputs=inputs,
    outputs=[gr.Textbox(label="Score"), gr.Textbox(label="Feedback")],
    title="Quick quiz",
).launch()
```

:::keep-together

### Inputs from data

**Where do the three Radio inputs come from?**

☐ There are three Radio lines written by hand

☐ The mark function

☐ gr.Interface makes one for each question by itself

☐ The loop over questions appends one Radio for each question

:::


:::teacher-note

**Answer:** The loop over questions appends one Radio for each question

inputs starts empty, and the loop appends a gr.Radio with that question's choices and text. Four questions would make four inputs.

:::


:::keep-together

### What an answer is

**What does mark get as a1 when the first question is answered Mercury?**

☐ "Mercury"

☐ True

☐ The whole question

☐ 0

:::


:::teacher-note

**Answer:** "Mercury"

A Radio gives the chosen text. mark compares it with q["answer"].

:::


:::keep-together

### Spot the bug

**The score is never more than 1, even with every answer right. Click the line that is wrong.**

```
 1  import gradio as gr
 2  
 3  questions = [
 4      {"q": "Which planet is closest to the Sun?", "choices": ["Venus", "Mercury", "Mars"], "answer": "Mercury"},
 5      {"q": "How many legs does a spider have?", "choices": ["6", "8", "10"], "answer": "8"},
 6      {"q": "What is 7 x 8?", "choices": ["54", "56", "64"], "answer": "56"},
 7  ]
 8  
 9  
10  def mark(a1, a2, a3):
11      answers = [a1, a2, a3]
12      score = 0
13      for i in range(len(questions)):
14          if answers[i] == questions[i]["answer"]:
15              score = score + 1
16          return str(score) + " out of " + str(len(questions))
17  
18  
19  inputs = []
20  for q in questions:
21      inputs.append(gr.Radio(q["choices"], label=q["q"]))
22  
23  gr.Interface(fn=mark, inputs=inputs, outputs=gr.Textbox(label="Score")).launch()
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 16

return is indented inside the loop, so the function ends after the first question. Return after the loop, not inside it.

:::


:::typical

## Modify


**A fourth question.** Add a question of your own. What else has to change?

**Perfect score.** Add a message to the feedback when every answer is right.

**No answer.** A question left blank gives `None` (Python's word for "no value"). Say it was not answered, instead of "Not quite".

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**A fourth question:**

```python
import gradio as gr

questions = [
    {"q": "Which planet is closest to the Sun?", "choices": ["Venus", "Mercury", "Mars"], "answer": "Mercury"},
    {"q": "How many legs does a spider have?", "choices": ["6", "8", "10"], "answer": "8"},
    {"q": "What is 7 x 8?", "choices": ["54", "56", "64"], "answer": "56"},
    {"q": "Which gas do plants take in?", "choices": ["Oxygen", "Carbon dioxide", "Helium"], "answer": "Carbon dioxide"},
]


def mark(a1, a2, a3, a4):
    answers = [a1, a2, a3, a4]
    score = 0
    feedback = ""
    for i in range(len(questions)):
        q = questions[i]
        if answers[i] == q["answer"]:
            score = score + 1
            feedback = feedback + "Right: " + q["q"] + "\n"
        else:
            feedback = feedback + "Not quite: " + q["q"] + " The answer is " + q["answer"] + ".\n"
    return str(score) + " out of " + str(len(questions)), feedback


inputs = []
for q in questions:
    inputs.append(gr.Radio(q["choices"], label=q["q"]))

gr.Interface(
    fn=mark,
    inputs=inputs,
    outputs=[gr.Textbox(label="Score"), gr.Textbox(label="Feedback")],
    title="Quick quiz",
).launch()
```

**Perfect score:**

```python
import gradio as gr

questions = [
    {"q": "Which planet is closest to the Sun?", "choices": ["Venus", "Mercury", "Mars"], "answer": "Mercury"},
    {"q": "How many legs does a spider have?", "choices": ["6", "8", "10"], "answer": "8"},
    {"q": "What is 7 x 8?", "choices": ["54", "56", "64"], "answer": "56"},
]


def mark(a1, a2, a3):
    answers = [a1, a2, a3]
    score = 0
    feedback = ""
    for i in range(len(questions)):
        q = questions[i]
        if answers[i] == q["answer"]:
            score = score + 1
            feedback = feedback + "Right: " + q["q"] + "\n"
        else:
            feedback = feedback + "Not quite: " + q["q"] + " The answer is " + q["answer"] + ".\n"
    if score == len(questions):
        feedback = feedback + "Perfect score!"
    elif score == 0:
        feedback = feedback + "Have another go."
    return str(score) + " out of " + str(len(questions)), feedback


inputs = []
for q in questions:
    inputs.append(gr.Radio(q["choices"], label=q["q"]))

gr.Interface(
    fn=mark,
    inputs=inputs,
    outputs=[gr.Textbox(label="Score"), gr.Textbox(label="Feedback")],
    title="Quick quiz",
).launch()
```

**No answer:**

```python
import gradio as gr

questions = [
    {"q": "Which planet is closest to the Sun?", "choices": ["Venus", "Mercury", "Mars"], "answer": "Mercury"},
    {"q": "How many legs does a spider have?", "choices": ["6", "8", "10"], "answer": "8"},
    {"q": "What is 7 x 8?", "choices": ["54", "56", "64"], "answer": "56"},
]


def mark(a1, a2, a3):
    answers = [a1, a2, a3]
    score = 0
    feedback = ""
    for i in range(len(questions)):
        q = questions[i]
        if answers[i] is None:
            feedback = feedback + "No answer: " + q["q"] + "\n"
        elif answers[i] == q["answer"]:
            score = score + 1
            feedback = feedback + "Right: " + q["q"] + "\n"
        else:
            feedback = feedback + "Not quite: " + q["q"] + " The answer is " + q["answer"] + ".\n"
    return str(score) + " out of " + str(len(questions)), feedback


inputs = []
for q in questions:
    inputs.append(gr.Radio(q["choices"], label=q["q"]))

gr.Interface(
    fn=mark,
    inputs=inputs,
    outputs=[gr.Textbox(label="Score"), gr.Textbox(label="Feedback")],
    title="Quick quiz",
).launch()
```

:::

:::


## Make: your own quiz


**Your quiz.** Make a quiz on something you know well (a sport, a game, a subject, music) with at least four questions and feedback that helps someone learn.

**Test it with someone.** Swap with a classmate. Fix one thing they found confusing.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Your quiz:**

```python
import gradio as gr

questions = [
    {"q": "Which instrument has 88 keys?", "choices": ["Piano", "Organ", "Accordion"], "answer": "Piano"},
    {"q": "How many strings does a violin have?", "choices": ["4", "5", "6"], "answer": "4"},
    {"q": "Which family is the trumpet in?", "choices": ["Woodwind", "Brass", "Percussion"], "answer": "Brass"},
    {"q": "What does forte mean?", "choices": ["Loud", "Soft", "Fast"], "answer": "Loud"},
]


def mark(a1, a2, a3, a4):
    answers = [a1, a2, a3, a4]
    score = 0
    feedback = ""
    for i in range(len(questions)):
        q = questions[i]
        if answers[i] == q["answer"]:
            score = score + 1
        else:
            feedback = feedback + q["q"] + " The answer is " + q["answer"] + ".\n"
    return str(score) + " out of " + str(len(questions)), feedback


inputs = []
for q in questions:
    inputs.append(gr.Radio(q["choices"], label=q["q"]))

gr.Interface(fn=mark, inputs=inputs, outputs=[gr.Textbox(label="Score"), gr.Textbox(label="To learn")], title="Music quiz").launch()
```

:::


:::wider

## Where this leads

On a computer this same file is a real quiz app, and a teacher can host it as a Hugging Face Space for the class. The optional next lesson stores each question as an object with its own `check` method.

:::


## Exit ticket

:::keep-together

**Why keep the questions in a list instead of writing each Radio by hand?**

{{lines-3}}

:::


:::teacher-note

**Answer:** One loop makes the inputs and one loop marks them, so adding a question means adding data, not new code.

:::

