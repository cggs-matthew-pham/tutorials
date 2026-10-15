---
title: "Final challenge: a quiz page"
subtitle: "The DOM and the browser console · Final challenge: a quiz page · Lesson 7"
---

# Final challenge: a quiz page

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A quiz is a list of questions, a number for where you are, a score, and a click: everything you have learned in one page.


:::teacher-note

**In one sentence:** Students build and extend a quiz page from an array of questions, buttons made for each choice, click handlers, a score and a question number, fix an answer check that is always true, add colour feedback and a total, and make a quiz of their own.

**Students should be able to say:** I can build a page that reacts to clicks with data from an array. I can keep a score and a question number in variables. I can make a quiz of my own and test it with someone.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Does the second click add to the first message, or replace it?

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

:::keep-together

**A student clicks 6, then clicks 7. What does the result say at the end?**

☐ Correct! Try again

☐ Correct!

☐ Try again

☐ Nothing: the result is empty

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Correct! Each click runs pick and sets the result. The second click replaces the first message: textContent replaces the words.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1>Capital cities quiz</h1>
<p id="question"></p>
<div id="choices"></div>
<p id="feedback"></p>
<p>Score: <span id="score">0</span></p>
<script>
  const questions = [
    { text: "What is the capital of France?", choices: ["Paris", "Rome", "Madrid"], answer: "Paris" },
    { text: "What is the capital of Japan?", choices: ["Seoul", "Tokyo", "Beijing"], answer: "Tokyo" },
    { text: "What is the capital of Australia?", choices: ["Sydney", "Canberra", "Perth"], answer: "Canberra" },
  ];
  let current = 0;
  let score = 0;
  const questionEl = document.querySelector("#question");
  const choicesEl = document.querySelector("#choices");
  const feedbackEl = document.querySelector("#feedback");
  const scoreEl = document.querySelector("#score");

  function showQuestion() {
    const q = questions[current];
    questionEl.textContent = q.text;
    choicesEl.textContent = "";
    for (const choice of q.choices) {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", function () {
        check(choice);
      });
      choicesEl.append(button);
    }
  }

  function check(choice) {
    if (choice === questions[current].answer) {
      score = score + 1;
      scoreEl.textContent = score;
      feedbackEl.textContent = "Correct!";
    } else {
      feedbackEl.textContent = "Not quite: it was " + questions[current].answer;
    }
    current = current + 1;
    if (current < questions.length) {
      showQuestion();
    } else {
      questionEl.textContent = "Finished! Score: " + score;
      choicesEl.textContent = "";
    }
  }

  showQuestion();
</script>
```

:::keep-together

### Which piece does what?

**Match each piece with what it does.**

A. makes one button for each choice

B. next question or the end

C. moves on to the next question

D. the right answer shown now

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `questions[current].answer` | |
| `for (const c of q.choices) { … }` | |
| `current = current + 1;` | |
| `if (current < questions.length) { … } else { … }` | |

:::


:::teacher-note

**Answer:** questions[current].answer → D. the right answer shown now; for (const c of q.choices) { … } → A. makes one button for each choice; current = current + 1; → C. moves on to the next question; if (current &lt; questions.length) { … } else { … } → B. next question or the end

:::


:::keep-together

### A fourth question

**You want to add a fourth question. What is the smallest change?**

☐ Add a new function

☐ Change the score

☐ Add a new button in the HTML

☐ Add one more object to the questions array

:::


:::teacher-note

**Answer:** Add one more object to the questions array

The page is built from the array. One more object gives one more question, with its own choices and answer: nothing else needs to change.

:::


:::keep-together

### Spot the bug

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 27

One = puts the answer into choice and is always true. Compare with three: choice === questions[current].answer.

:::


:::typical

## Modify


**Colours.** Right is green, wrong is red.

**Out of three.** Use the length of the array.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Colours:**

```html
<h1>Capital cities quiz</h1>
<p id="question"></p>
<div id="choices"></div>
<p id="feedback"></p>
<p>Score: <span id="score">0</span></p>
<script>
  const questions = [
    { text: "What is the capital of France?", choices: ["Paris", "Rome", "Madrid"], answer: "Paris" },
    { text: "What is the capital of Japan?", choices: ["Seoul", "Tokyo", "Beijing"], answer: "Tokyo" },
    { text: "What is the capital of Australia?", choices: ["Sydney", "Canberra", "Perth"], answer: "Canberra" },
  ];
  let current = 0;
  let score = 0;
  const questionEl = document.querySelector("#question");
  const choicesEl = document.querySelector("#choices");
  const feedbackEl = document.querySelector("#feedback");
  const scoreEl = document.querySelector("#score");

  function showQuestion() {
    const q = questions[current];
    questionEl.textContent = q.text;
    choicesEl.textContent = "";
    for (const choice of q.choices) {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", function () {
        check(choice);
      });
      choicesEl.append(button);
    }
  }

  function check(choice) {
    if (choice === questions[current].answer) {
      score = score + 1;
      scoreEl.textContent = score;
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    } else {
      feedbackEl.textContent = "Not quite: it was " + questions[current].answer;
      feedbackEl.style.color = "crimson";
    }
    current = current + 1;
    if (current < questions.length) {
      showQuestion();
    } else {
      questionEl.textContent = "Finished! Score: " + score;
      choicesEl.textContent = "";
    }
  }

  showQuestion();
</script>
```

**Out of three:**

```html
<h1>Capital cities quiz</h1>
<p id="question"></p>
<div id="choices"></div>
<p id="feedback"></p>
<p>Score: <span id="score">0</span></p>
<script>
  const questions = [
    { text: "What is the capital of France?", choices: ["Paris", "Rome", "Madrid"], answer: "Paris" },
    { text: "What is the capital of Japan?", choices: ["Seoul", "Tokyo", "Beijing"], answer: "Tokyo" },
    { text: "What is the capital of Australia?", choices: ["Sydney", "Canberra", "Perth"], answer: "Canberra" },
  ];
  let current = 0;
  let score = 0;
  const questionEl = document.querySelector("#question");
  const choicesEl = document.querySelector("#choices");
  const feedbackEl = document.querySelector("#feedback");
  const scoreEl = document.querySelector("#score");

  function showQuestion() {
    const q = questions[current];
    questionEl.textContent = q.text;
    choicesEl.textContent = "";
    for (const choice of q.choices) {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", function () {
        check(choice);
      });
      choicesEl.append(button);
    }
  }

  function check(choice) {
    if (choice === questions[current].answer) {
      score = score + 1;
      scoreEl.textContent = score;
      feedbackEl.textContent = "Correct!";
    } else {
      feedbackEl.textContent = "Not quite: it was " + questions[current].answer;
    }
    current = current + 1;
    if (current < questions.length) {
      showQuestion();
    } else {
      questionEl.textContent = "Finished! You scored " + score + " of " + questions.length;
      choicesEl.textContent = "";
    }
  }

  showQuestion();
</script>
```

:::

:::


## Make: your own quiz

Make your own quiz on a topic you know well, with at least **five questions**, a **score**, **feedback** on every answer, and a **Play again** button. Then ask a friend to play it, watch what they do, and change one thing. The page on this lesson is a space quiz. Large projects, such as many quizzes or a timer, belong in your own time.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Space quiz</h1>
<p id="question"></p>
<div id="choices"></div>
<p id="feedback"></p>
<p>Score: <span id="score">0</span></p>
<button id="again" class="hidden">Play again</button>
<style>.hidden { display: none; }</style>
<script>
  const questions = [
    { text: "Which planet is closest to the Sun?", choices: ["Mercury", "Venus", "Mars"], answer: "Mercury" },
    { text: "What is the Moon?", choices: ["A star", "A moon of Earth", "A planet"], answer: "A moon of Earth" },
    { text: "Which planet has rings you can see easily?", choices: ["Saturn", "Mars", "Earth"], answer: "Saturn" },
    { text: "What do we call our galaxy?", choices: ["Andromeda", "The Milky Way", "Orion"], answer: "The Milky Way" },
    { text: "How many planets orbit the Sun?", choices: ["Eight", "Nine", "Seven"], answer: "Eight" },
  ];
  let current = 0;
  let score = 0;
  const questionEl = document.querySelector("#question");
  const choicesEl = document.querySelector("#choices");
  const feedbackEl = document.querySelector("#feedback");
  const scoreEl = document.querySelector("#score");
  const again = document.querySelector("#again");

  function showQuestion() {
    const q = questions[current];
    questionEl.textContent = q.text;
    choicesEl.textContent = "";
    for (const choice of q.choices) {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", function () {
        check(choice);
      });
      choicesEl.append(button);
    }
  }

  function check(choice) {
    if (choice === questions[current].answer) {
      score = score + 1;
      scoreEl.textContent = score;
      feedbackEl.textContent = "Correct!";
    } else {
      feedbackEl.textContent = "Not quite: it was " + questions[current].answer;
    }
    current = current + 1;
    if (current < questions.length) {
      showQuestion();
    } else {
      questionEl.textContent = "Finished! You scored " + score + " of " + questions.length;
      choicesEl.textContent = "";
      again.classList.remove("hidden");
    }
  }

  again.addEventListener("click", function () {
    current = 0;
    score = 0;
    scoreEl.textContent = score;
    feedbackEl.textContent = "";
    again.classList.add("hidden");
    showQuestion();
  });

  showQuestion();
</script>
```

:::


:::wider

## Where this leads

**Challenge complete** when the three required checks are done. From here: the real browser console (optional), a bigger project of your own, or the Python web apps course for pages that remember.

:::


## Exit ticket

:::keep-together

**Which two variables change as the quiz is played?**

{{lines-3}}

:::


:::teacher-note

**Answer:** current, the number of the question on the screen, and score, how many were right.

:::

