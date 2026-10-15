---
marp: true
theme: default
html: true
---

# A quiz app

Apps with Gradio · A quiz app

<!-- Speaker note: Students build a quiz app from a list of question dictionaries, make a Radio input for each question with a loop, mark the answers with feedback, then add a question, a perfect-score message and handling for blanks, and make and user-test a quiz of their own. About 50 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** keep a quiz's questions as data, make a Radio input for each one with a loop, and write the function that marks the answers and gives feedback.

- I can store questions as a list of dictionaries.
- I can make inputs from data with a loop, and mark answers with another loop.
- I can improve an app from a classmate's feedback.

<!-- Speaker note: Before class: Read the unit primer first. Each question is a dictionary (`q["q"]`, `q["choices"]`, `q["answer"]`), introduced here only as far as reading one. The inputs list starts empty and a loop appends a `gr.Radio` per question; `mark` takes one parameter per question (`a1, a2, a3`) and puts them in a list to compare by position. A Radio gives the chosen text, or `None` when nothing is chosen (the third Modify task). The bug task returns inside the loop, so only the first question is ever marked. The info question points at `*answers` (any number of inputs as a list) as a stretch. The Make ends with user testing: a classmate takes the quiz. -->

---

## Why it matters

> Quiz apps, flashcards and online tests are all the same idea: questions stored as data, and code that checks the answers.

<!-- Speaker note: A quiz is **data**: each question has its text, its choices and its answer. Here each question is a **dictionary**, which looks a value up by its name (its key): `q["answer"]`. The questions are in a list, so a loop can make one **Radio** input for each (`inputs.append(...)` adds it to the end of the `inputs` list), and the marking function can check every answer the same way. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**What does it print?**

- 2
- 0
- An error
- 1

<!-- Speaker note: What happens: 1. The first answer, "8", matches; the second, "54", does not match "56". Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: trace i through the loop on the board with the two answers. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 1. The first answer, "8", matches; the second, "54", does not match "56".

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/gradio/gradio-quiz/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/gradio/gradio-quiz/?full=step-2#step-2)

<!-- Speaker note: Run it, answer the questions and press **Submit**. Get one wrong on purpose and read the feedback. Then change a question's text in the list and run again: the app changes with the data. Students should be able to say: I can explain how the three Radio inputs were made from the list. -->

<!-- Speaker note: Teacher: change a question in the list and run again; the app follows the data. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 34 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/gradio/gradio-quiz/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Questions as data means one loop makes the inputs and one loop marks the answers; adding a question is adding data (and one more parameter). -->

<!-- Speaker note: Teacher: count the inputs, the questions and the parameters: three of each. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Inputs from data

**Where do the three Radio inputs come from?**

- There are three Radio lines written by hand
- The mark function
- gr.Interface makes one for each question by itself
- The loop over questions appends one Radio for each question

* Answer: The loop over questions appends one Radio for each question

<!-- Speaker note: inputs starts empty, and the loop appends a gr.Radio with that question's choices and text. Four questions would make four inputs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What an answer is

**What does mark get as a1 when the first question is answered Mercury?**

- "Mercury"
- True
- The whole question
- 0

* Answer: "Mercury"

<!-- Speaker note: A Radio gives the chosen text. mark compares it with q["answer"]. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

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

* Answer: line 16

<!-- Speaker note: return is indented inside the loop, so the function ends after the first question. Return after the loop, not inside it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **A fourth question:** Add a question of your own. What else has to change?
- **Perfect score:** Add a message to the feedback when every answer is right.
- **No answer:** A question left blank gives `None` (Python's word for "no value"). Say it was not answered, instead of "Not quite".

[Open this step](https://studio.learningwaypoints.com/tutorials/code/gradio/gradio-quiz/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Changing a quiz is mostly changing data; the code needs only a parameter per question and a message per score. Hints, in order: Add a fourth dictionary to the list, then a fourth parameter: def mark(a1, a2, a3, a4): and answers = [a1, a2, a3, a4]. / Before the return: if score == len(questions): add "Perfect score!" to the feedback. / A Radio with nothing chosen gives None. Check if answers[i] is None: first, and say the question was not answered. For students who need more support: Give students a fourth question dictionary written out, and ask them only to change the parameters to match. For early finishers: def mark(*answers): to accept any number of questions, or shuffle each question's choices (import random; random.shuffle). The hard part, on purpose: Marking by position: answers[i] against questions[i]. Ask students to trace i for two questions on paper. When students get stuck: The score is never more than 1. Ask: Is return inside the loop? Fix: Move return to after the loop (no indent under for). / TypeError: mark() takes 3 positional arguments but 4 were given. Ask: How many questions are there now, and how many parameters? Fix: Add a parameter for the new question, and add it to answers. / A right answer is marked wrong. Ask: Does the answer exactly match one of the choices, capitals and spaces included? Fix: Copy the answer text from the choices list. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own quiz



- **Your quiz:** Make a quiz on something you know well (a sport, a game, a subject, music) with at least four questions and feedback that helps someone learn.
- **Test it with someone:** Swap with a classmate. Fix one thing they found confusing.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/gradio/gradio-quiz/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a quiz on a topic you know, with questions as data, inputs made by a loop and helpful feedback. -->

<!-- Speaker note: Teacher: pairs swap quizzes and report one confusing thing. -->

---

## Where this leads

On a computer this same file is a real quiz app, and a teacher can host it as a Hugging Face Space for the class. The optional next lesson stores each question as an object with its own `check` method.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why keep the questions in a list instead of writing each Radio by hand?**

* One loop makes the inputs and one loop marks them, so adding a question means adding data, not new code.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The optional next lesson stores each question as an object with a check method. Machine learning with Gradio (coming later) puts a trained model behind the same kind of app. -->
