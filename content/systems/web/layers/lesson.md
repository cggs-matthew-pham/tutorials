---
order: 1
unit: layers
node: [AC9TDI10K02 n1, AC9TDI10K02 n2]
introduces: [web-layers]
title: Three layers
summary: "A web page is content (the words and pictures), structure (HTML tags saying what each part is) and presentation (CSS saying how it looks). Swap the style sheet and only the look changes; show the structure and see the tags underneath."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "One page, three completely different looks, and not a single word changed. What did change?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8486
  url: http://127.0.0.1:8486/index.html
  readySelector: ".wdview"
  layout: full
explainPicture: { ref: web.yml#explain-pic, caption: "The club page: its content (the words), its structure (header, headings, a list) and its presentation (the Ocean style sheet)." }
explainClip:
  query: { code: "@web.yml#explain", fresh: 1, id: explain }
  caption: "Content, structure, presentation"
  say: "The same page, three style sheets."
  clip:
    - click: Ocean
    - wait: 800
    - click: Poster
    - caption: { text: "Each style sheet changes only the look: the presentation.", say: "A new style sheet changes only the look." }
    - wait: 1200
    - click: "Show structure, off"
    - caption: { text: "Underneath, the structure stays the same: header, h1, nav, h2, a list.", say: "The structure underneath never changed." }
    - wait: 1400
    - click: "Style sheet, on"
    - expect: { selector: "#gsum", contains: "Style sheet off" }
    - caption: { text: "Style sheet off: the content and structure are all still there, in the browser's plain look.", say: "Switch the style off, and the words and structure are still there." }
    - wait: 1500
---
Every web page you read is built in three layers: **content** (what it says), **structure** (what each part is) and **presentation** (how it looks). You don't need to write code to see them: this board takes one page apart.

## Predict: style sheet off

```step
stage: predict
insight: "Committing to what is left without the style sheet tests the new move: presentation is a separate layer from the content and structure."
check:
  type: predict
  q: "You switch off a web page's style sheet (its CSS). What is left?"
  options: ["All the words, headings and lists, in a plain look", "A blank page", "The colours, but no words", "Nothing changes at all"]
  actual: "Everything except the look: the words (content) and the headings, list and menu (structure) are all still there, in the browser's plain default style."
```

## Try: swap the look

```step
stage: run
insight: "Swapping style sheets and switching the style off settles the prediction: only the presentation changes."
try: { playground: board, starter: "web.yml#run", height: 600 }
check: { type: board, text: "Try at least two style sheets and show the structure. Then switch the style sheet off. What is left?", when: "n >= 2 and e = 1 and p = 0", explain: "The words and the structure (header, headings, list) are all still there. The style sheet only ever held the look." }
```

Was your prediction right?

## Worked example: one part, three layers

```step
stage: investigate
insight: "Splitting one heading into its three layers models the new move. Sam thinks a style sheet changes what a part is, the misconception planted after the method."
tasks:
  - check:
      type: sort
      q: "Which layer is each one?"
      options: ["Content", "Structure", "Presentation"]
      items:
        - ["The words \"Bring a friend!\"", "Content"]
        - ["A photo of the robot", "Content"]
        - ["<h2> marking \"This week\" as a heading", "Structure"]
        - ["<ul> and <li> marking the list", "Structure"]
        - ["<nav> marking the menu", "Structure"]
        - ["color: teal", "Presentation"]
        - ["font-size: 30px", "Presentation"]
        - ["The page's background colour", "Presentation"]
      explain: "Content is what it says; structure is what each part is (HTML tags); presentation is how it looks (CSS rules)."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam compares the Plain and Poster styles. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: looks-is-structure
      explain: "Line 3: the style sheet changes how \"This week\" looks, never what it is. It is an h2 heading in every style. To make it a list item you change the HTML (structure)."
  - check:
      type: question
      q: "You want every heading on the page to be purple. Which layer do you change?"
      options: ["Presentation: one CSS rule", "Structure: change every heading tag", "Content: retype the headings", "All three"]
      answer: 0
      feedback: [null, "The tags say what the parts are; colour is the look.", "The words stay the same.", "Only the look changes."]
      explain: "h2 { color: purple; } in the style sheet: one rule, and the HTML is untouched."
```

### "This week", layer by layer

```worked
\text{content: } \textit{This week} :: The words on the page.
\text{structure: } \texttt{<h2>This week</h2>} :: The HTML tag says it is a level-2 heading.
\text{presentation: } \texttt{h2 \{ color: teal; font-size: 20px; \}} :: The CSS rule says how every h2 looks.
\text{change the style sheet} \Rightarrow \text{only presentation changes} :: Same words, same tag, a new look.
```

Now sort the parts of the page.

### Find the mistake

### Which layer?

## Vary: change one layer

```step
stage: modify
insight: "Each task changes one layer and checks the others stay put: a colour, a size, then the content itself (in the HTML), not the look."
try: { playground: board, starter: "web.yml#css", height: 640 }
tasks:
  - starter: "web.yml#css"
    check: { type: board, text: "In the style sheet, make the main heading (h1) a different colour. Did the structure or the words change?", when: "a = 1 and u = 1 and d = 1", explain: "Add or change a rule such as h1 { color: crimson; }. The look changed; the structure and the words didn't." }
  - starter: "web.yml#css"
    check: { type: board, text: "Now make every h2 heading at least 28 pixels tall, with one rule.", when: "f >= 28 and u = 1", explain: "h2 { font-size: 30px; } changes both h2 headings at once, because the rule applies to every h2." }
  - starter: "web.yml#html"
    check: { type: board, text: "This time edit the HTML: change the words \"This week\" to \"Today\". Which layer changed?", when: "d = 0 and u = 1 and t >= 1", explain: "The content changed; the structure (still an h2) and the look didn't." }
```

### Colour

### Size

### Content

## Practise: which layer?

```step
stage: practise
insight: "Naming the layer for everyday changes is the same move in mixed forms, plus a review of how text is stored."
tasks:
  - check:
      type: question
      q: "The school site gets a dark mode. Which layer changes?"
      options: ["Presentation", "Content", "Structure"]
      answer: 0
      feedback: [null, "The words stay the same.", "The headings stay headings."]
      explain: "Dark mode is a different style sheet: only the look."
  - check:
      type: question
      q: "The page is translated into French. Which layer changes?"
      options: ["Content", "Presentation", "Structure"]
      answer: 0
      feedback: [null, "The look can stay the same.", "Headings stay headings in French too."]
      explain: "The words change; the structure and look can stay."
  - check:
      type: question
      q: "Three lines of text become a bulleted list. Which layer changes?"
      options: ["Structure", "Content", "Presentation"]
      answer: 0
      feedback: [null, "The words are the same.", "The bullets come from the list structure, not a style."]
      explain: "Wrapping them in <ul> and <li> tags changes what they are: a list."
  - check:
      type: question
      q: "Review: how does the computer store the word \"Hi\" in the page?"
      options: ["As numbers: one character code for each letter", "As a picture of the letters", "As the CSS rules", "It isn't stored"]
      answer: 0
      feedback: [null, "Text is stored as codes; the look comes later.", "CSS is how it looks, not what it says.", "Everything on a computer is stored."]
      explain: "H is 72 and i is 105: content is numbers too."
```

### Dark mode

### French

### A list

### Review: text

## Make: a new look

```step
stage: make
insight: "Restyling the whole page without touching the HTML reverses the process: from a look you want to the presentation rules that make it."
try: { playground: board, starter: "web.yml#make", height: 640 }
hint: ["Only the style sheet box is yours to change.", "Try body { background: …; } and h1 { color: …; }.", "For example body { background: black; color: white; } and h1 { color: gold; }."]
check: { type: board, text: "Give the page a completely new look: a new background and a new heading colour, without changing the HTML.", when: "g = 1 and a = 1 and u = 1 and d = 1", explain: "New presentation, same content and structure. That separation is what lets one site have many looks." }
```

Then: open any website and imagine its style sheet switched off. What would its structure be?
