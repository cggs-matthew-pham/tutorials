---
order: 7
unit: challenge
assumes: [js-event, text-content, create-element, append-element, class-list]
title: "Final challenge: a quiz page"
summary: "Put it all together: a list of questions as data, buttons made for each choice, a score that remembers, and feedback on every click."
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-dom" 8131
  url: http://127.0.0.1:8131/index.html
  ready: HTML and JavaScript code
  layout: full
pacing:
  keyDelayMs: 12
explainPicture: page.html#run
explainClip:
  query: {code: "", zoom: 1.4}
  caption: "A quiz is a click, a check and some feedback"
  clip:
    - caption: "A question, two answer buttons, and a place for the result."
    - type: {into: "HTML and JavaScript code", text: "<p id=\"q\">What is 3 + 4?</p>\n<button id=\"a1\">6</button>\n<button id=\"a2\">7</button>\n<p id=\"result\"></p>\n", append: true}
    - caption: "One function checks an answer: an if decides what to say."
    - type: {into: "HTML and JavaScript code", text: "<script>\n  const result = document.querySelector(\"#result\");\n  function pick(answer) {\n    if (answer === 7) {\n      result.textContent = \"Correct!\";\n    } else {\n      result.textContent = \"Try again\";\n    }\n  }\n", append: true}
    - caption: "Each button calls pick with its own answer."
    - type: {into: "HTML and JavaScript code", text: "  document.querySelector(\"#a1\").addEventListener(\"click\", function () {\n    pick(6);\n  });\n  document.querySelector(\"#a2\").addEventListener(\"click\", function () {\n    pick(7);\n  });\n</script>\n", append: true}
    - click: "Run ▶"
    - expect: {selector: "#status", contains: "Running"}
    - wait: 600
    - click: {selector: "#a1", preview: true}
    - expect: {selector: "#result", contains: "Try again", preview: true}
    - caption: "The wrong answer says try again."
    - click: {selector: "#a2", preview: true}
    - expect: {selector: "#result", contains: "Correct!", preview: true}
    - caption: "The right one says Correct. The challenge does this for a whole list of questions."
hook: "A quiz is a list of questions, a number for where you are, a score, and a click: everything you have learned in one page."
---
Your quiz keeps its questions as **data**, in an array of objects, and uses everything from the course:

- an **array of objects** holds the questions (`questions[current].text`),
- **`createElement`** makes a button for each choice,
- **click handlers** check the answer,
- **variables** above the handlers keep `current` (which question) and `score`,
- an **`if`** decides what to say, and another decides when the quiz is over.

**The hard part** is keeping track of what changes. Only two variables change: `current` and `score`. Everything on the page is a picture of them and of `questions[current]`.

## Predict

```step
stage: predict
code: page.html#predict
check:
  type: predict
  q: "A student clicks 6, then clicks 7. What does the result say at the end?"
  options: ["Correct!", "Try again", "Correct! Try again", "Nothing: the result is empty"]
  actual: "Correct! Each click runs pick and sets the result. The second click replaces the first message: textContent replaces the words."
```

Does the second click add to the first message, or replace it?

## Run

```step
stage: run
code: page.html#run
try: { playground: dom, starter: "page.html#run", height: 430 }
check: { type: reflect, text: "I played the quiz through and saw the score and the final message." }
```

Play the quiz: three questions, a score and a message at the end. The questions are an **array of objects** at the top; the rest of the page is built from them.

## Investigate

```step
stage: investigate
code: page.html#run
insight: "The quiz is data plus two variables: the array of questions, the number of the current question, and the score; each click checks one answer, changes the variables, then shows the next question."
tasks:
  - check:
      type: match
      q: "Match each piece with what it does."
      pairs:
        - ["questions[current].answer", "the right answer shown now"]
        - ["for (const c of q.choices) { … }", "makes one button for each choice"]
        - ["current = current + 1;", "moves on to the next question"]
        - ["if (current < questions.length) { … } else { … }", "next question or the end"]
  - check:
      type: question
      q: "You want to add a fourth question. What is the smallest change?"
      options: ["Add one more object to the questions array", "Add a new function", "Add a new button in the HTML", "Change the score"]
      answer: 0
      explain: "The page is built from the array. One more object gives one more question, with its own choices and answer: nothing else needs to change."
  - check:
      type: bug
      code: page.html#bug
      text: "Every answer says Correct!, even the wrong ones. There is no red error. Click the line that is wrong."
      answer: 27
      fault: logic
      misconception: assign-in-if
      explain: "One = puts the answer into choice and is always true. Compare with three: choice === questions[current].answer."
```

### Which piece does what?

Data, buttons, memory and decisions.

### A fourth question

Where the data lives.

### Spot the bug

Every answer is right.

## Modify

```step
stage: modify
insight: "Feedback can be shown with a colour, and the end message can say how many were right out of how many."
try: { playground: dom, starter: "page.html#run", height: 430 }
tasks:
  - hint:
      - "The feedback line is a paragraph like any other. What can you change about it?"
      - "Inside each branch, set feedbackEl.style.color: green when correct, crimson when not."
    expected: page.html#sol-colour
    check: { type: code, text: "Show the feedback in green when right and crimson when wrong.", rules: { contains: [".style.color"] } }
  - hint:
      - "The end message is built by joining pieces of text."
      - "Join \"You scored \", the score, \" of \" and questions.length."
    expected: page.html#sol-total
    try: { playground: dom, starter: "page.html#sol-colour", height: 430 }
    check: { type: code, text: "Finish with You scored 2 of 3 instead of Score: 2.", rules: { contains: ["questions.length", "scored"] } }
```

### Colours

Right is green, wrong is red.

### Out of three

Use the length of the array.

## Make: your own quiz

```step
stage: make
insight: "Goals only: a quiz on a topic you know, with at least five questions, a score, feedback, and a Play again button."
try: { playground: dom, starter: "page.html#make", height: 430 }
check: { type: reflect, text: "I made a quiz on a topic I know, with at least five questions, a score, feedback and a Play again button. A friend played it and I changed one thing." }
```

Make your own quiz on a topic you know well, with at least **five questions**, a **score**, **feedback** on every answer, and a **Play again** button. Then ask a friend to play it, watch what they do, and change one thing. The page on this lesson is a space quiz. Large projects, such as many quizzes or a timer, belong in your own time.

## Where this leads

```step
stage: info
check:
  type: question
  q: "A bigger version of your quiz saves the best score for next time. What would it need that this page does not have?"
  options: ["A way to store data between visits, such as a server or the browser's own storage", "A longer array", "More buttons", "A second script"]
  answer: 0
  explain: "A page forgets everything when it is closed. Remembering between visits needs somewhere to keep data: in the browser, or on a server, as in the Python web apps course."
```

**Challenge complete** when the three required checks are done. From here: the real browser console (optional), a bigger project of your own, or the Python web apps course for pages that remember.
