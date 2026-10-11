---
order: 3
unit: area
node: AC9M7M01 n2
title: Area problems
summary: "Pick the base and the height at a right angle to it, put both lengths in the same unit, and split a shape into rectangles and triangles. Area is in square units: m², cm²."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "How much paint for the end wall of a house, with its triangle of roof? Real shapes mix rectangles and triangles, and real measurements mix metres and centimetres."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8275
  url: http://127.0.0.1:8275/index.html
  readySelector: "#sl-s"
  layout: full
explainPicture: { ref: area.yml#explain-pic, caption: "Base 10 cm, height 4 cm, and a slanted side of 5 cm. The area uses the base and the height at a right angle to it: $\\tfrac{1}{2} \\times 10 \\times 4 = 20$ cm²." }
explainClip:
  query: { code: "@area.yml#explain", fresh: 1, id: explain }
  caption: "Choose the right lengths"
  say: "Use the base and the height at a right angle."
  clip:
    - caption: { text: "Three lengths: base, height, and a slanted side.", say: "There are three lengths: a base, a height, and a slanted side." }
    - wait: 1200
    - caption: { text: "The slant changes as the top moves. The area does not.", say: "The slanted side changes as the top moves. The area does not." }
    - click: Move the top left
    - click: Move the top left
    - expect: { selector: "#gsum", contains: "= 20" }
    - wait: 800
    - caption: { text: "So use the base and the height: ½ × 10 × 4 = 20.", say: "So use the base and the height: twenty square centimetres." }
    - wait: 1200
---
Area problems come with extra information. Three moves sort them out:

- **Choose the base and its height.** The height is at a right angle to the base; a slanted side is not needed.
- **Use one unit.** Change every length to the same unit (100 cm = 1 m) before you multiply. Area comes out in square units: m² or cm².
- **Split the shape.** A shape made of rectangles and triangles has area equal to the sum of the parts (or a big shape minus a missing part).

## Predict: metres and centimetres

```step
stage: predict
insight: "Committing to an area for a 4 m by 250 cm room shows whether they convert to one unit before multiplying."
check:
  type: predict
  q: "A room is 4 m long and 250 cm wide. What is its area?"
  options: ["10 m²", "1000 m²", "1000 cm", "6.5 m²"]
  actual: "10 m². 250 cm = 2.5 m, and 4 × 2.5 = 10 m². 1000 mixes metres with centimetres; 6.5 adds."
```

Write both lengths in metres first.

## Run: a 4 m by 2.5 m room

```step
stage: run
insight: "Building the room in metres on the board shows the area in m², with a half-metre row of squares."
try: { playground: board, starter: "area.yml#run", height: 520 }
check: { type: board, text: "Make a rectangle with base 4 m and height 2.5 m (250 cm). What is its area? Was your prediction right?", when: "b = 4 and h = 2.5", explain: "4 × 2.5 = 10 m²: two full rows of 4 square metres, and a half row of 4 halves." }
```

Each grid square is 1 m by 1 m: one square metre.

## Investigate: choose, convert, split

```step
stage: investigate
insight: "Area problems need the right lengths, one unit and a split into parts; Ivy multiplies centimetres by metres. Students own the working for the house shape and pick the reason at the key step."
tasks:
  - check:
      type: reasoning
      q: "The end wall of a house is a rectangle 6 m wide and 4 m high, with a triangle of roof on top: base 6 m, height 3 m. Find the area of the whole wall. Write your steps."
      steps:
        - ["Rectangle: $6 \\times 4 = 24$ m²", "a rectangle's area is length × width"]
        - ["Triangle: $\\tfrac{1}{2} \\times 6 \\times 3 = 9$ m²", "a triangle is half of base × height"]
        - ["Wall: $24 + 9 = 33$ m²", "the whole is the sum of its parts"]
      picks:
        - step: 2
          options: ["A triangle is half of base × height", "A triangle is base × height", "Add the base and the height"]
          answer: 0
          feedback: [null, "That is the parallelogram two triangles make: 18, not 9.", "Area multiplies lengths."]
      answer: "33"
      feedback:
        - ["42", "The roof triangle is half of 6 × 3: 9, not 18."]
        - ["24", "That is the rectangle only. Add the roof."]
      explain: "24 + 9 = 33 m²."
  - check:
      type: bug
      code: "working.txt#ivy"
      text: "Ivy finds the area of a rug. Click the line where her working goes wrong."
      answer: 3
      fault: logic
      misconception: area-units
      explain: "Line 3: 50 is in centimetres and 2 in metres. Change 50 cm to 0.5 m: 0.5 × 2 = 1 m²."
  - picture: { ref: area.yml#explain-pic, caption: "A triangle with base 10 cm, height 4 cm and a slanted side of 5 cm." }
    check:
      type: question
      q: "Which two lengths give this triangle's area?"
      options: ["The base 10 cm and the height 4 cm", "The base 10 cm and the slanted side 5 cm", "The height 4 cm and the slanted side 5 cm", "All three: 10 + 4 + 5"]
      answer: 0
      feedback: [null, "The slanted side is not at a right angle to the base.", "Use the base and its height.", "Adding the sides gives a perimeter, not an area."]
      explain: "½ × 10 × 4 = 20 cm². The 5 cm side is extra information."
```

### Three moves

Here are the three moves.

```worked
\tfrac{1}{2} \times 10 \times 4 = 20 \text{ cm}^2 :: Choose: the base and the height at a right angle to it. Ignore the slanted 5 cm side.
250 \text{ cm} = 2.5 \text{ m}, \quad 4 \times 2.5 = 10 \text{ m}^2 :: Convert: both lengths in metres, then multiply.
24 + 9 = 33 \text{ m}^2 :: Split: a rectangle (6 × 4) plus a triangle (½ × 6 × 3).
8 \times 5 - 3 \times 2 = 34 \text{ m}^2 :: Or subtract: a rectangle with a corner missing is the big rectangle minus the corner.
```

Your working can be short notes. Then choose the reason for the key step.

### Find the mistake

Read Ivy's working. Are both lengths in the same unit?

### Which lengths?

## Modify: one change at a time

```step
stage: modify
insight: "One change at a time: a sail on the board, a shape with a missing corner (subtract), square metres to square centimetres, a two-step paint problem, then choosing a sensible unit."
try: { playground: board, starter: "area.yml#sail", height: 540 }
tasks:
  - starter: "area.yml#sail"
    hint: "The sail's base is along the boom (3 m) and its height up the mast (5 m)."
    check: { type: board, text: "A sail is a right-angled triangle: 3 m along the bottom and 5 m up the mast. Make it and read its area.", when: "b = 3 and h = 5", explain: "½ × 3 × 5 = 7.5 m²." }
  - check:
      type: answer
      q: "A rectangular garden 8 m by 5 m has a 3 m by 2 m shed in one corner. What area of garden is left, in m²?"
      answer: "34"
      feedback:
        - ["46", "That adds the shed. Take it away."]
        - ["40", "That is the whole garden. Take away the shed."]
      explain: "8 × 5 − 3 × 2 = 40 − 6 = 34 m²."
  - check:
      type: answer
      q: "How many square centimetres are in 1 square metre?"
      answer: "10000"
      feedback:
        - ["100", "100 cm fit along each side, and 100 rows of them: 100 × 100."]
      explain: "1 m² is 100 cm by 100 cm: 100 × 100 = 10 000 cm²."
  - check:
      type: answer
      q: "A wall 5 m wide and 2.4 m high is painted. One litre of paint covers 4 m². How many litres are needed?"
      answer: "3"
      feedback:
        - ["12", "12 m² is the area. Each litre covers 4 m²."]
        - ["48", "Divide the area by 4, not multiply."]
      explain: "5 × 2.4 = 12 m², and 12 ÷ 4 = 3 litres."
  - check:
      type: question
      q: "Edge case: which unit suits the area of a school oval?"
      options: ["m²", "cm²", "mm²", "m"]
      answer: 0
      feedback: [null, "cm² would give hundreds of millions: too small a unit.", "Far too small.", "m measures length, not area."]
      explain: "Square metres: an oval is about 10 000 m² (one hectare, a 100 m by 100 m square)."
```

### A sail

Each task changes one thing.

### Take a part away

### Square units

### Two steps: paint

### A sensible unit

## Practise: area problems

```step
stage: practise
insight: "A split shape, a unit change and extra information, mixed; mixed units are the planted slip; the review keeps percentages fresh."
tasks:
  - check:
      type: answer
      q: "A flag is a 10 cm by 4 cm rectangle with a triangle on one end: base 4 cm, height 3 cm. Total area, in cm²?"
      answer: "46"
      feedback:
        - ["52", "Halve the triangle: ½ × 4 × 3 = 6."]
      explain: "40 + 6 = 46 cm²."
  - check:
      type: answer
      q: "A path is 300 cm long and 2 m wide. Its area, in m²?"
      answer: "6"
      feedback:
        - ["600", "300 cm = 3 m. Then 3 × 2."]
      explain: "300 cm = 3 m, and 3 × 2 = 6 m²."
  - check:
      type: answer
      q: "A right-angled triangle has base 12 cm, height 5 cm and sloping side 13 cm. Area, in cm²?"
      answer: "30"
      feedback:
        - ["78", "13 is a slanted side. Use the height, 5 cm."]
        - ["60", "Halve it."]
      explain: "½ × 12 × 5 = 30 cm²."
  - check:
      type: answer
      q: "Review: find 25% of 48."
      answer: "12"
      feedback:
        - ["23", "That is 48 − 25. 25% is a quarter."]
      explain: "A quarter of 48: 12."
```

### Split

### Convert

### Extra information

### Review: percentages

## Make: a tall sail

```step
stage: make
insight: "Designing a sail with a set area and a shape condition means searching base and height pairs, not just using a formula forwards."
try: { playground: board, starter: "area.yml#make", height: 540 }
hint: ["½ × b × h = 12, so b × h = 24.", "Pick a pair where the height is bigger than the base."]
check: { type: board, text: "Design a right-angled sail with area 12 m² that is taller than it is wide.", when: "a = 12 and h > b", explain: "b × h = 24 with h bigger: base 3 m and height 8 m, or base 4 m and height 6 m." }
```

Then work out the cost of the sailcloth at $15 per m².
