# region: predict
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
# endregion
# region: run
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
# endregion
# region: bug
import gradio as gr

questions = [
    {"q": "Which planet is closest to the Sun?", "choices": ["Venus", "Mercury", "Mars"], "answer": "Mercury"},
    {"q": "How many legs does a spider have?", "choices": ["6", "8", "10"], "answer": "8"},
    {"q": "What is 7 x 8?", "choices": ["54", "56", "64"], "answer": "56"},
]


def mark(a1, a2, a3):
    answers = [a1, a2, a3]
    score = 0
    for i in range(len(questions)):
        if answers[i] == questions[i]["answer"]:
            score = score + 1
        return str(score) + " out of " + str(len(questions))


inputs = []
for q in questions:
    inputs.append(gr.Radio(q["choices"], label=q["q"]))

gr.Interface(fn=mark, inputs=inputs, outputs=gr.Textbox(label="Score")).launch()
# endregion
# region: sol-four
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
# endregion
# region: sol-message
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
# endregion
# region: sol-blank
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
# endregion
# region: make
import gradio as gr

questions = [
    # Your own quiz: at least four questions on a topic you know well.
]

# Then a mark function and the app, as in the Run step.
# endregion
# region: sol-make
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
# endregion
