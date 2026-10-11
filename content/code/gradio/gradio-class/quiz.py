# region: predict
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
# endregion
# region: run
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
# endregion
# region: bug
class Question:
    def __init__(self, text, choices, answer):
        self.text = text
        self.choices = choices
        self.answer = answer

    def check(guess):
        return guess == self.answer

    def feedback(self, guess):
        if self.check(guess):
            return "Right: " + self.text
        return "Not quite: " + self.text + " The answer is " + self.answer + "."


q = Question("What is 7 x 8?", ["54", "56", "64"], "56")
print(q.check("56"))
# endregion
# region: sol-hint
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
# endregion
# region: sol-points
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
# endregion
# region: make
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


# Your own quiz with Question objects: at least four questions, and the app.
# endregion
# region: sol-make
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
# endregion
