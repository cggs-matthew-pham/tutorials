---
order: 4
unit: angle-sums
node: AC9M7M05 n1
title: Angles in a triangle
summary: However you change a triangle, its three angles add to 180°. Tear off the corners and they make a straight line.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A roof truss, a bike frame, a folded paper plane: triangles of every shape. One thing about their angles never changes."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8162
  url: http://127.0.0.1:8162/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: geo.yml#explain-pic, caption: "An obtuse triangle: $24° + 127° + 29° = 180°$." }
explainClip:
  query: { code: "@geo.yml#explain", fresh: 1, id: explain }
  caption: "A triangle's angles add to 180°"
  say: "A triangle's three angles always add to one hundred and eighty degrees."
  clip:
    - caption: { text: "This triangle: the three angles add to 180°.", say: "In this triangle, the three angles add to one hundred and eighty." }
    - wait: 400
    - caption: { text: "Make one angle big. The others shrink: still 180°.", say: "Make one angle big, and the others shrink. Still one eighty." }
    - click: Obtuse
    - wait: 600
    - caption: { text: "Very flat: still 180°.", say: "Even a very flat triangle: still one eighty." }
    - click: Very flat
    - wait: 600
    - caption: { text: "Why? Tear off the corners: they make a straight line.", say: "Why? Tear off the corners, and they make a straight line." }
    - click: Tear off the corners
    - expect: { selector: "#gsum", contains: "= 180°" }
    - wait: 1500
---
An **angle** measures a turn, in degrees ($°$). A full turn is $360°$, and the angles on a straight line add to $180°$.

A triangle has three corners, so three angles inside it. In this lesson you find out what happens to their total when you change the triangle's shape.

## Predict: a stretched triangle

```step
stage: predict
insight: "Committing to what happens to the total before dragging makes the board a test of their idea, not a demonstration."
check:
  type: predict
  q: "You drag one corner of a triangle so one angle gets much bigger. What happens to the total of the three angles?"
  options:
    - "It stays the same"
    - "It gets bigger"
    - "It gets smaller"
    - "It depends on how long the sides are"
  actual: "It stays the same: 180°. As one angle grows, the other two shrink by exactly as much."
```

Picture a triangle you could pull out into a long, thin shape. Which angles change?

## Run: change the triangle

```step
stage: run
insight: "Dragging the corners and watching the total shows that the angles change but their sum never does."
try: { playground: board, starter: "geo.yml#run", height: 600 }
check: { type: board, text: "Drag the corners until one angle is more than $120°$. What is the total now?", when: "m > 120" }
```

Drag any corner to a new dot. The board measures each angle and adds them up under the triangle. Make tall, wide and flat triangles. Was your prediction right?

## Investigate: why 180°?

```step
stage: investigate
try: { playground: board, starter: "geo.yml#tear", height: 720 }
insight: "Tearing off the corners and putting them side by side shows why the total is fixed: the three angles fill a straight line, which is 180°. Kai's mistake ties the angles to the side lengths."
tasks:
  - starter: "geo.yml#tear"
    check: { type: board, text: "Press **Tear off the corners**. Then drag a corner and watch the torn pieces.", when: "t = 1" }
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai compares a small triangle with one twice as big. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: angle-sum-size
      explain: "Line 3: making every side twice as long does not change the angles, only the size. The big triangle's angles are still 50°, 60° and 70°, adding to 180°."
  - check:
      type: question
      q: "Why do the three torn corners always make a straight line?"
      options: ["Because the angles add to $180°$, and a straight line is $180°$", "Because every triangle has a $90°$ angle", "Because the corners are all the same size"]
      answer: 0
      feedback: [null, "Try the board: many triangles have no right angle.", "Look at the torn pieces: they are often different sizes."]
      explain: "Side by side at one point, the three angles fill a straight line exactly. Angles on a straight line add to 180°, so the triangle's angles do too."
```

### Tear off the corners

Here is the argument, the way you would do it with a paper triangle.

```worked
\text{Draw any triangle} :: Cut it out of paper, and mark its three angles A, B and C.
\text{Tear off the three corners} :: Each piece keeps one angle.
\text{Put the points together} :: Place the three corners side by side, all touching at one point.
\text{They fill a straight line} :: The outside edges of A and C line up into one straight line.
A + B + C = 180° :: Angles on a straight line add to 180°, so the triangle's angles do too.
```

On the board, press **Tear off the corners**, then drag a corner. The pieces change, but they always fill the line.

### Find the mistake

Read Kai's working one line at a time. Which line ties the angles to the length of the sides?

### Why a straight line?

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a right angle (the other two must make 90°), a very flat triangle (the other two are tiny), then two edge cases that the 180° rule decides."
try: { playground: board, starter: "geo.yml#right", height: 720 }
tasks:
  - starter: "geo.yml#right"
    hint: ["A right angle is a square corner. Use the dots: one side across, one side straight up.", "Put C straight above A."]
    check: { type: board, text: "Make a triangle with a right angle ($90°$). What do the other two angles add to?", when: "m = 90", explain: "The other two add to 90°: 180° − 90°." }
  - starter: "geo.yml#flat"
    hint: "Pull one corner until the triangle is nearly a line. Tear off the corners to see the pieces."
    check: { type: board, text: "Make a triangle with an angle of more than $150°$. How big are the other two?", when: "m > 150", explain: "Less than 30° together: the big angle leaves very little of the 180°." }
  - check:
      type: answer
      q: "A triangle has three equal angles. How big is each one?"
      answer: "60"
      feedback:
        - ["90", "Three angles of 90° would add to 270°."]
        - ["180", "180° is the total. Share it between three equal angles."]
      explain: "180° ÷ 3 = 60°."
  - check:
      type: question
      q: "Edge case: can a triangle have two right angles?"
      options: ["No: two right angles already make $180°$, leaving $0°$ for the third", "Yes, if it is big enough", "Yes, if the third angle is very small"]
      answer: 0
      feedback: [null, "Size does not change the angles. Add the two right angles: what is left for the third?", "The third angle would have to be 0°. Try it on the board: the sides would never meet."]
      explain: "90° + 90° = 180°, so the third angle would be 0°: the two sides would be parallel and never meet."
```

### A right angle

Each task changes one thing. First: make a square corner.

### Very flat

Now make one angle very big.

### Three equal angles

### Two right angles?

## Practise: use the rule

```step
stage: practise
insight: "Recognising possible triangles, a measurement that is nearly 180°, and the size question, mixed; the review keeps angles on a straight line from Year 6 fresh."
tasks:
  - check:
      type: question
      q: "Which three angles could be the angles of a triangle?"
      options: ["$40°, 60°, 80°$", "$50°, 60°, 80°$", "$90°, 90°, 10°$"]
      answer: 0
      feedback: [null, "Add them: 190°. A triangle's angles add to 180°.", "Add them: 190°, and two right angles leave nothing for the third."]
      explain: "40° + 60° + 80° = 180°."
  - check:
      type: question
      q: "Lia measures a paper triangle with a protractor: $57°, 68°, 56°$. That adds to $181°$. What is the best explanation?"
      options: ["Her measurements are a little out: a protractor reads to about a degree", "Her triangle is a special one that adds to $181°$", "She has measured the wrong angles"]
      answer: 0
      feedback: [null, "Every triangle's angles add to exactly 180°. What about the measuring?", "Possibly, but 181° is so close to 180° that small measuring errors are the likely reason."]
      explain: "Real measurements are rounded. 181° is within a degree or two of 180°, which is what measuring three angles by hand gives."
  - check:
      type: question
      q: "Triangle P has sides 3 cm, 4 cm and 5 cm. Triangle Q has sides 30 cm, 40 cm and 50 cm. How do their angle sums compare?"
      options: ["They are the same: $180°$", "Q's is 10 times bigger", "Q's is bigger, but not 10 times"]
      answer: 0
      feedback: [null, "Longer sides do not make the angles bigger: Q is P enlarged, with the same angles.", "The angles of Q are the same as P's; only the sides are longer."]
      explain: "Every triangle's angles add to 180°. Q is P made 10 times bigger, with exactly the same angles."
  - check:
      type: answer
      q: "Review: two angles sit side by side on a straight line. One is $130°$. How big is the other?"
      answer: "50"
      feedback:
        - ["230", "Angles on a straight line add to 180°, not 360°."]
        - ["130", "Together they make a straight line, 180°. How much is left after 130°?"]
      explain: "180° − 130° = 50°."
```

### Possible?

### Measuring by hand

### Bigger triangle

### Review

## Make: one angle equals the other two

```step
stage: make
insight: "Building a triangle where one angle equals the other two together reverses the lesson: from the 180° rule to a shape it forces, a right angle."
try: { playground: board, starter: "geo.yml#make", height: 600 }
hint: ["If one angle equals the other two added together, it is half of the total.", "Half of 180° is 90°: make a square corner."]
check: { type: board, text: "Make a triangle where one angle is exactly the other two added together.", when: "m = 90", explain: "If one angle equals the other two together, it is half of 180°: a right angle. Here 90° = the other two added." }
```

Think first: if one angle is the other two added together, what fraction of $180°$ is it? Then build it.

Stretch: can a triangle have one angle that is exactly twice the sum of the other two? How big is it?
