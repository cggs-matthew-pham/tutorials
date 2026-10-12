---
order: 5
node: AC9S10U05 n5
unit: newton
title: Push the wall, and it pushes you?
introduces: [force-pairs]
summary: "Forces come in pairs. When object A pushes or pulls object B, B pushes or pulls A back with a force of the same size in the opposite direction. The two forces act on different objects, so they never cancel each other out."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8281
  url: http://127.0.0.1:8281/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#book, caption: "The forces on a book: the Earth pulls it down; the table pushes it up. These two balance, but they are not a third-law pair: they both act on the book." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Newton's third law"
  say: "If you push something, it pushes you back just as hard."
  clip:
    - caption: { text: "A skater pushes on a wall. The wall pushes back on her, just as hard.", say: "A skater pushes on a wall. The wall pushes back on her, just as hard." }
    - wait: 3600
    - click: "Play"
    - wait: 1200
    - click: "The wall pushing the skater: less"
    - caption: { text: "That push from the wall moves her away. Once she lets go, she glides.", say: "The wall's push moves her away. Once she lets go, she glides." }
    - wait: 3600
    - caption: { text: "Her push acts on the wall; the wall's push acts on her. Different objects.", say: "Her push acts on the wall; the wall's push acts on her." }
    - wait: 1200
hook: "Stand on a skateboard and push a wall. You roll away from it. The wall didn't move, so what pushed you?"
---
You know a net force changes motion. This lesson asks where forces come from: they always come in pairs.

## Engage: the skater and the wall

```step
stage: predict
insight: "Students who think the skater moves 'because she pushed' haven't placed the force on her; the third law puts the wall's push on the skater."
check:
  type: predict
  q: "A skater stands still and pushes on a wall. She rolls backwards. What force made her move?"
  options: ["The wall pushing back on her", "Her own push on the wall", "Her muscles pushing her backwards", "Nothing: she moved without a force"]
  actual: "The wall pushing back on her. Her push acts on the wall (which is too heavy to move). By Newton's third law the wall pushes back on her with a force of the same size, and that force, on her, is what moves her."
```

## Explore: the wall pushes back

```step
stage: run
insight: "Seeing the only force on the skater is the wall's push makes the 'other half' of the pair the one that changes her motion."
try: { playground: board, starter: "boards.yml#skater", height: 640 }
check: { type: board, text: "Press Play while the wall pushes, then set its push to 0 (she lets go). Let her glide for a few seconds.", when: "P = 0 and v > 0 and t >= 3" }
```

The board shows only the forces on the **skater**. Her push on the wall acts on the wall, so it isn't drawn here.

## Explain: pairs of forces

```step
stage: investigate
insight: "Naming both forces in a pair (who on whom), then telling a third-law pair from two balanced forces on one object, is the hinge of the law."
tasks:
  - check:
      type: question
      q: "What does Newton's third law say?"
      options: ["When A exerts a force on B, B exerts an equal and opposite force on A", "Every force is balanced by another force on the same object", "Bigger objects push harder"]
      answer: 0
      feedback: [null, "Balanced forces act on one object; third-law pairs act on two.", "The pair is always the same size, whatever the masses."]
      explain: "Forces come in pairs: same size, same type, opposite directions, on different objects."
  - check:
      type: match
      q: "Match each force to its partner in the pair."
      pairs:
        - ["Your foot pushes back on the ground", "The ground pushes forward on your foot"]
        - ["A rocket pushes gas down", "The gas pushes the rocket up"]
        - ["The Earth pulls you down", "You pull the Earth up"]
        - ["A swimmer pushes water back", "The water pushes the swimmer forward"]
      explain: "Swap the two objects and reverse the direction: that's the partner."
  - check:
      type: question
      q: "A pile of books rests on a table. Its weight is 49 N down; the table pushes it up with 49 N. Are these a third-law pair?"
      options: ["No: both act on the book. The partner of the book's weight is the book pulling the Earth up", "Yes: they are equal and opposite", "Yes: they cancel out"]
      answer: 0
      feedback: [null, "Equal and opposite on the same object means balanced, not a third-law pair.", "Third-law pairs act on different objects, so they can't cancel."]
      explain: "Balanced forces act on one object. A third-law pair always acts on two objects: Earth pulls book, book pulls Earth; table pushes book, book pushes table."
  - check:
      type: question
      q: "A truck and a small car collide. Which feels the bigger force?"
      options: ["Neither: the forces on each are the same size", "The truck, because it is heavier", "The car, because it gets damaged more"]
      answer: 0
      feedback: [null, "Mass changes the effect, not the force.", "The car's bigger change in motion comes from its smaller mass (F = ma), not a bigger force."]
      explain: "Third law: the forces are equal. The car, with less mass, accelerates more (F = ma), which is why it fares worse."
  - check:
      type: question
      q: "A horse pulls a cart forward with 500 N. By the third law, the cart pulls back on the horse with 500 N. So how can the cart start moving?"
      options: ["The two forces act on different objects, so they don't cancel: the cart speeds up if the horse's pull is bigger than the friction on the cart", "The horse pulls a little harder than the cart pulls back", "It can't: equal and opposite forces cancel, so nothing moves"]
      answer: 0
      feedback: [null, "Third-law pairs are always exactly the same size. Look only at the forces on the cart.", "Only forces on the same object can cancel. These two act on different objects."]
      explain: "To see what the cart does, add only the forces on the cart: the horse's pull forward and friction back. The cart's pull acts on the horse, not the cart."
  - check: { type: reflect, text: "I can state Newton's third law, name both forces in a pair, and tell a pair from two balanced forces." }
```

### The law

### Partners

### The book on the table

### Truck and car

### Horse and cart

### In your own words

In your book: draw the skater and the wall as two separate pictures. On each, draw only the force acting on it. Label the pair "equal size, opposite directions".

## Elaborate: the book

```step
stage: modify
tier: typical
insight: "Balancing the book, then naming the partner of each force, separates 'balanced' from 'pair' on a familiar example."
try: { playground: board, starter: "boards.yml#book", height: 640 }
tasks:
  - check: { type: board, text: "Set the table's push so the forces on the book balance.", expect: { balanced: true } }
  - check:
      type: question
      q: "What is the partner of 'the table pushing the book up'?"
      options: ["The book pushing the table down", "The Earth pulling the book down", "The table pulling the Earth"]
      answer: 0
      feedback: [null, "That acts on the book too: it's the force the table's push balances.", "Swap the objects: table on book becomes book on table."]
      explain: "Swap the two objects and reverse the direction."
```

### Balance the book

### Find the partner

## Elaborate: walking

```step
stage: modify
tier: wider
insight: "Walking and rockets show the third law is how anything starts moving: by pushing on something else."
check:
  type: question
  q: "Why is it hard to walk on very slippery ice?"
  options: ["You can't push back on the ice hard enough, so it can't push you forward hard enough", "Ice is too cold for your muscles", "You push on the ice hard, but it pushes back on you less hard"]
  answer: 0
  feedback: [null, "Your muscles work; the grip doesn't.", "The pair is always equal. The trouble is that your push itself is small, because there is little friction to push against."]
  explain: "To walk forward you push back on the ground and it pushes you forward. With little friction, your backward push slips, and so does the forward push you get."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the skater with the forces on the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Newton's third law:** when object A pushes or pulls object B, B pushes or pulls A with a force of the same size in the opposite direction.
- The two forces in a pair act on **different objects**, so they never cancel each other.
- Balanced forces act on the **same** object (weight and support on a book); they are not a third-law pair.
- You move by pushing on something else: it pushes you (walking, swimming, rockets).
