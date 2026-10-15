---
marp: true
theme: default
html: true
---

# Final challenge: a quiz page

The DOM and the browser console · Final challenge: a quiz page

<!-- Speaker note: Students build and extend a quiz page from an array of questions, buttons made for each choice, click handlers, a score and a question number, fix an answer check that is always true, add colour feedback and a total, and make a quiz of their own. About 65 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 25 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put it all together: a list of questions as data, buttons made for each choice, a score that remembers, and feedback on every click.

- I can build a page that reacts to clicks with data from an array.
- I can keep a score and a question number in variables.
- I can make a quiz of my own and test it with someone.

<!-- Speaker note: Before class: Read the unit primer first. This is the final challenge; it marks "Challenge complete". It mirrors the p5.js and Python challenges: a list of data, a loop, a handler, a score. Everything has been taught; the new part is putting it together. The questions are an array of objects, buttons are made from the choices, `check(choice)` is the handler, `current` and `score` are the only variables that change. The bug is a single `=` in an `if`: no error, every answer is right; the p5 course had `>` where `<` belonged. Quizzes that save results or send them anywhere are out of scope: the playground sends nothing. Large projects belong to the teacher (a unit project, a class quiz bank). -->

---

## Why it matters

> A quiz is a list of questions, a number for where you are, a score, and a click: everything you have learned in one page.

<!-- Speaker note: Your quiz keeps its questions as **data**, in an array of objects, and uses everything from the course: - an **array of objects** holds the questions (`questions[current].text`), - **`createElement`** makes a button for each choice, - **click handlers** check the answer, - **variables** above the handlers keep `current` (which question) and `score`, - an **`if`** decides what to say, and another decides when the quiz is over. **The hard part** is keeping track of what changes. Only two variables change: `current` and `score`. Everything on the page is a picture of them and of `questions[current]`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<p id="q">What is 3 + 4?</p>
<button id="a1">6</button>
<button id="a2">7</button>
<p id="result"></p>
<script>
  function pick(answer) {
    const result = document.querySelector("#result");
    if (answer === 7) {
      result.textContent = "Correct!";
    } else {
      result.textContent = "Try again";
    }
  }
  document.querySelector("#a1").addEventListener("click", function () {
    pick(6);
  });
  document.querySelector("#a2").addEventListener("click", function () {
    pick(7);
  });
</script>
```

**A student clicks 6, then clicks 7. What does the result say at the end?**

- Correct! Try again
- Correct!
- Try again
- Nothing: the result is empty

<!-- Speaker note: What happens: Correct! Each click runs pick and sets the result. The second click replaces the first message: textContent replaces the words. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the page says after each click. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Correct! Each click runs pick and sets the result. The second click replaces the first message: textContent replaces the words.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/dom/dom-quiz/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/dom/dom-quiz/?full=step-2#step-2)

<!-- Speaker note: Play the quiz: three questions, a score and a message at the end. The questions are an **array of objects** at the top; the rest of the page is built from them. Students should be able to say: I played the quiz through and saw the score and the final message. -->

<!-- Speaker note: Teacher: let students play and call out scores. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 52 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-quiz/?full=step-3#step-3)

<!-- Speaker note: What this step is for: The quiz is data plus two variables: the array of questions, the number of the current question, and the score; each click checks one answer, changes the variables, then shows the next question. -->

<!-- Speaker note: Teacher: for the bug, ask "does one = compare, or put?" -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which piece does what?

**Match each piece with what it does.**

| | |
|---|---|
| `questions[current].answer` | A. makes one button for each choice |
| `for (const c of q.choices) { … }` | B. next question or the end |
| `current = current + 1;` | C. moves on to the next question |
| `if (current < questions.length) { … } else { … }` | D. the right answer shown now |

* Answer: questions[current].answer → D. the right answer shown now; for (const c of q.choices) { … } → A. makes one button for each choice; current = current + 1; → C. moves on to the next question; if (current &lt; questions.length) { … } else { … } → B. next question or the end

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A fourth question

**You want to add a fourth question. What is the smallest change?**

- Add a new function
- Change the score
- Add a new button in the HTML
- Add one more object to the questions array

* Answer: Add one more object to the questions array

<!-- Speaker note: The page is built from the array. One more object gives one more question, with its own choices and answer: nothing else needs to change. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**Every answer says Correct!, even the wrong ones. There is no red error. Click the line that is wrong.**

```
 1  <p id="question"></p>
 2  <div id="choices"></div>
 3  <p id="feedback"></p>
 4  <script>
 5    const questions = [
 6      { text: "Capital of France?", choices: ["Paris", "Rome"], answer: "Paris" },
 7      { text: "Capital of Japan?", choices: ["Seoul", "Tokyo"], answer: "Tokyo" },
 8    ];
 9    let current = 0;
10    const questionEl = document.querySelector("#question");
11    const choicesEl = document.querySelector("#choices");
12    const feedbackEl = document.querySelector("#feedback");
13    function showQuestion() {
14      const q = questions[current];
15      questionEl.textContent = q.text;
16      choicesEl.textContent = "";
17      for (const choice of q.choices) {
18        const button = document.createElement("button");
19        button.textContent = choice;
20        button.addEventListener("click", function () {
21          check(choice);
22        });
23        choicesEl.append(button);
24      }
25    }
26    function check(choice) {
27      if (choice = questions[current].answer) {
28        feedbackEl.textContent = "Correct!";
29      } else {
30        feedbackEl.textContent = "Not quite";
31      }
32      current = current + 1;
33      if (current < questions.length) {
34        showQuestion();
35      }
36    }
37    showQuestion();
38  </script>
```

* Answer: line 27

<!-- Speaker note: One = puts the answer into choice and is always true. Compare with three: choice === questions[current].answer. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Colours:** Right is green, wrong is red.
- **Out of three:** Use the length of the array.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-quiz/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Feedback can be shown with a colour, and the end message can say how many were right out of how many. Hints, in order: The feedback line is a paragraph like any other. What can you change about it? / Inside each branch, set feedbackEl.style.color: green when correct, crimson when not. / The end message is built by joining pieces of text. / Join "You scored ", the score, " of " and questions.length. For students who need more support: Give the whole quiz and ask students to add only questions of their own, then the colour feedback. For early finishers: Shuffle the questions, add a timer with setInterval, or give harder questions more points using a property on each object. The hard part, on purpose: Where the data lives: the page is built from the array, and only current and score change. Draw those two boxes on the board. When students get stuck: Every answer is correct. Ask: Does the check use ===? Fix: Compare with three equal signs. / Cannot read properties of undefined (reading text). Ask: Has current gone past the end of the array? Fix: Stop at questions.length before showing the next question. / The buttons pile up. Ask: Is the old choices box emptied first? Fix: Set choicesEl.textContent = "" before making new buttons. / The score is wrong after Play again. Ask: Was the score set back to 0? Fix: Reset current, score and the text on the page. -->

<!-- Speaker note: Teacher: ask which two variables change when a question is answered. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your own quiz

Make your own quiz on a topic you know well, with at least **five questions**, a **score**, **feedback** on every answer, and a **Play again** button. Then ask a friend to play it, watch what they do, and change one thing. The page on this lesson is a space quiz. Large projects, such as many quizzes or a timer, belong in your own time.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/dom/dom-quiz/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a quiz on a topic you know, with at least five questions, a score, feedback, and a Play again button. -->

<!-- Speaker note: Teacher: pairs write their questions on paper first; swap and play before changing. -->

---

## Where this leads

**Challenge complete** when the three required checks are done. From here: the real browser console (optional), a bigger project of your own, or the Python web apps course for pages that remember.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Which two variables change as the quiz is played?**

* current, the number of the question on the screen, and score, how many were right.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Optional next lesson: the real browser console. Beyond the course: the Python web apps course, to keep results between visits. -->
