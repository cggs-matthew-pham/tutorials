---
order: 4
unit: ai
title: Train a recycling sorter
summary: Train an image model in Teachable Machine, then test it on photos it has never seen. It works on photos like its training photos and fails on others, so to fix a model you change its data.
language: makecode
hook: "Recycling centres use cameras and trained models to sort paper from plastic on a fast conveyor belt. Before a centre trusts one, someone has to test it on items it has never seen."
---
A recycling centre wants a camera that sorts **Paper** from **Plastic**. You will train a model in **Teachable Machine**, then test it on the board's photos: paper and plastic items your model has never seen, in different places and light.

**To train a model:** open [Teachable Machine](https://teachablemachine.withgoogle.com/train/image) in a new tab and choose **Image Project**, then **Standard**. Name one class **Paper** and one **Plastic**, add about 20 photos of each, and click **Train Model**. Then click **Export Model**, choose **Upload my model**, and copy the link it gives you into the board.

**No webcam, or no paper and plastic on your desk?** Download photos to upload instead (in each class, choose **Upload** and select every photo in its folder): [plain photos](../../../_playground-board/media/classifier/recycling/recycling-biased.zip) and [varied photos](../../../_playground-board/media/classifier/recycling/recycling-good.zip).

## Predict

```step
stage: predict
insight: "Students expect a model that works on their own desk to have learned what paper is. Committing to that first makes the messy-bench result mean something."
check:
  type: predict
  q: "Your model gets your own items right almost every time on the webcam. The board tests it on other paper and plastic photographed on a messy bench. Its score on the messy bench will be…"
  options: ["Much lower than on plain backgrounds", "About the same: it has learned what paper is", "Exactly 50%: it guesses", "Higher: more objects help it"]
  actual: "Much lower. The model learned from photos on one plain background, so the background is part of what it learned. On a messy bench it is often wrong."
```

## Train and test

```step
stage: run
insight: "Seeing the plain and messy scores side by side settles the prediction: the model works on photos like its training photos."
try: { playground: board, starter: "boards.yml#try", height: 760 }
check: { type: board, text: "Train two classes (Paper and Plastic) on one plain background, paste your link and test it.", when: "n_total = 16" }
```

Train **Paper** and **Plastic** with about 20 photos each, all on the same plain desk (or upload the **plain photos**). Paste your link and click **Load**. Compare the **plain background** and **messy bench** scores.

## Read the results

```step
stage: investigate
insight: "Accuracy by group shows where a model fails, not just how much; what the failures share points to what was missing from the training data."
tasks:
  - check:
      type: number
      q: "A model gets 23 of 32 test photos right. What is its accuracy, as a percentage (to the nearest whole number)?"
      answer: 72
      tolerance: 0.5
      explain: "Accuracy is correct ÷ total: 23 ÷ 32 = 0.72, or 72%."
  - check:
      type: question
      q: "This model scores: plain 8/8, messy 4/8, low light 5/8, not paper or plastic 0/8. Its training photos were all on one plain desk. Why does it fail on the messy bench?"
      options: ["It cannot tell the item from the background it was trained on", "It needs more training epochs", "Messy photos are harder for every model, so nothing can be done", "It has forgotten what paper is"]
      answer: 0
      feedback: [null, "Changing settings does not show it new backgrounds. What was missing from its photos?", "A model trained on messy backgrounds does much better on them.", "It never knew what paper is: it only knows the photos it was given."]
      explain: "Every training photo had the same plain desk, so the desk is part of what the model learned. On a cluttered bench it is guessing."
  - check:
      type: question
      q: "Another model scores well everywhere except low light. Which fix is most likely to work?"
      options: ["Add training photos taken in low light", "Add more photos on the same bright desk", "Train for longer", "Rename the classes"]
      answer: 0
      explain: "Look for what the failures share (low light), then add training photos that have it. Change the data, not the settings."
  - check:
      type: question
      q: "Sam's model scores 50% on the messy bench. Sam adds 100 more photos of the same items on the same desk. The messy score doesn't change. What went wrong?"
      options: ["The new photos were like the old ones, so they added no variety", "100 photos is too many", "Sam needed to delete the old photos first", "The board's test is unfair"]
      answer: 0
      feedback: [null, "More photos can help, but only if they are different from the ones the model already has.", "The old photos are fine; they just don't show any other backgrounds.", "Every model is tested on the same photos."]
      explain: "More of the same data teaches the model nothing new. Sam needs photos on different backgrounds."
```

### Accuracy

**Accuracy** is the number correct divided by the number tested. A score for each **group** of test photos (plain, messy, low light) shows **where** a model fails, not just how often.

### What the failures share

To find what is wrong, look at the ✗ photos and ask what they have in common that is not the item: the background, the light, the angle. Then compare that with the training photos.

| Step | What to write | Why |
|---|---|---|
| 1 | overall = 23 ÷ 32 = 72% | Accuracy is correct ÷ total |
| 2 | plain 8/8, messy 4/8, low light 5/8, neither 0/8 | Groups show where it fails |
| 3 | The messy failures all have a cluttered background | Look for what the failures share |
| 4 | The training photos were all on one plain desk | The model can't tell item from background |
| 5 | Fix: add training photos on cluttered backgrounds | Change the data, not the settings |

### Your turn

Same model, different results: it fails only in low light. Work through steps 3 to 5 for it.

### Sam's model

## Fix the data

```step
stage: modify
insight: "Each change to the training data, one at a time, shows its own effect on the scores."
try: { playground: board, starter: "boards.yml#all", height: 760 }
tasks:
  - check: { type: board, text: "Retrain with photos on at least three different backgrounds. Get the messy bench to 75% or more.", when: "acc_messy >= 0.75" }
  - check:
      type: question
      q: "You train Paper with 60 photos and Plastic with 10. Which way does the model lean when it is unsure?"
      options: ["Towards Paper", "Towards Plastic", "Neither: the number of photos doesn't matter"]
      answer: 0
      explain: "A class with many more examples wins most close calls. Give each class about the same number of photos."
  - check: { type: board, text: "The model labels a can or a bottle of glass as paper or plastic. Add a Neither class and get the 'not paper or plastic' group to 75% or more.", when: "has_neither = 1 and acc_neither >= 0.75" }
```

### Backgrounds

Retrain your model with photos of the items on **at least three different backgrounds** (or upload the **varied photos**). Export, paste the new link and **Load**.

### Unbalanced classes

### Neither

Look at the **not paper or plastic** group: the model gives a can or a jar a label anyway, often with high confidence. A model always picks one of its classes. Add a third class called **Neither** with photos of other things (cans, glass, fruit), retrain and test again.

## Diagnose

```step
stage: practise
insight: "Naming the problem and the data fix without training again checks that the idea transfers."
tasks:
  - check:
      type: question
      q: "A model was trained on photos taken at midday by a window. It scores 100% plain, 88% messy, 25% low light. What is the problem, and the fix?"
      options: ["No dim photos in training: add photos taken in low light", "Too few classes: add a Neither class", "Too many photos: delete some", "The test is unfair: ignore low light"]
      answer: 0
  - check:
      type: question
      q: "A model scores 90% on paper and plastic but labels every can as Plastic with 95% confidence. What is the problem, and the fix?"
      options: ["It has no class for other things: add a Neither class", "High confidence means it is right: nothing to fix", "It needs more plastic photos", "Cans are too shiny for any model"]
      answer: 0
      feedback: [null, "Find a ✗ with a long confidence bar: a model can be confident and wrong.", "More plastic photos would make it even more likely to say Plastic.", "A model trained with cans in a Neither class learns them."]
  - check:
      type: question
      q: "Paper has 80 photos and Plastic has 15. The model calls most plastic items Paper. What is the problem, and the fix?"
      options: ["The classes are unbalanced: give each class about the same number of photos", "Plastic is harder to see: add a filter", "It needs a Neither class", "Retrain with the same photos"]
      answer: 0
```

### Midday photos

### A confident can

### Lopsided classes

## Make a sorter you would trust

```step
stage: make
insight: "Meeting a target on every group, not just overall, is what testing before trusting means."
try: { playground: board, starter: "boards.yml#all", height: 760 }
check: { type: board, text: "Build a sorter that gets 80% or more overall and 75% or more in low light.", when: "acc_all >= 0.8 and acc_dim >= 0.75" }
```

Use what you found: varied backgrounds and light, balanced classes, and a **Neither** class. Then ask a classmate to bring three items your model has never seen. Does it still work?

## Evaluate

```step
stage: info
check: { type: reflect, text: "I wrote which items or conditions my sorter would still get wrong, and what a recycling centre should test before trusting it." }
```

Write one or two sentences: which items or conditions your sorter would still get wrong, and what a real recycling centre would need to test before trusting it.

**Revision summary**

- A model learns only from the examples you give it: it works on inputs like its training data and fails on others.
- **Accuracy** = correct ÷ total. Test on photos the model has never seen, and look at each **group**, not just the overall score.
- Find what the failures share, then **change the data**: more variety, balanced classes, a class for "none of these".
- A model always picks one of its classes, and it can be confident and wrong.
