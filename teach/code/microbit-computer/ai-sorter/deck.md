---
marp: true
theme: default
html: true
---

# Train a recycling sorter

micro:bit and the computer · A model drives a build

<!-- Speaker note: Students train a Paper/Plastic image model in Teachable Machine, test it on photos it has never seen, and fix it by changing the training data. About 50 minutes (Predict 3 min · Train and test 12 min · Read the results 10 min · Fix the data 15 min · Diagnose 4 min · Make and Evaluate 6 min). -->

---

## Today

**We are learning to** train an image model in Teachable Machine, then test it on photos it has never seen. It works on photos like its training photos and fails on others, so to fix a model you change its data.

- I can train an image model and test it on photos it has never seen.
- I can work out accuracy, overall and for each group of test photos.
- I can find what a model's mistakes share and fix it by changing its training data.

<!-- Speaker note: Before class: **The idea:** a model learns only from the examples it is given. It works on new inputs that look like its training photos and fails on ones that don't. The fix is always in the data, not the settings. **How it works:** students train in **Teachable Machine** (Google's free site, no account needed to train), export with **Upload my model**, and paste the link into the board. The board tests the model on 40 fixed photos it has never seen, in five groups: plain background, messy bench, low light, crumpled or at odd angles, and things that are neither paper nor plastic. Checks tick on the board's scores, not on the training. **Before class:** on a student laptop on the school network, open Teachable Machine, train a tiny model, export it with Upload, and paste the link into the board. Bring a box of clean paper and plastic (and a few cans, jars or fruit) so every desk has variety. **Privacy:** training happens in the browser and photos are not uploaded. **Upload my model** puts the trained model (not the photos) online, and anyone with the link can use it. Train on objects, not faces. **No webcam?** The lesson links two folders of photos to upload instead: **plain** (30 per class on a white board: trains the biased model) and **varied** (messy benches, low light, odd angles and a Neither class: trains a good one). The photos come from TrashNet (MIT licence); the messy benches and low light are made from them. The test photos are similar in style to the downloadable ones, so a model trained only on the varied folder can do well without the webcam. That is fine: the point is what changes the scores. Teacher: Train and test: give students 8 minutes to train. Plain is usually high and messy low. Ask: what is different about the messy photos? Teacher: Read the results: model the table live with one student's results, one line at a time. Then students do the low-light version themselves. Teacher: Fix the data: one change at a time. Students who add more photos of the same desk see no change: that is Sam's mistake, so point back to it. Teacher: Neither: ask what label a can gets, and how confident the model is. Teacher: Evaluate: collect a few answers about what a recycling centre should test. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> Recycling centres use cameras and trained models to sort paper from plastic on a fast conveyor belt. Before a centre trusts one, someone has to test it on items it has never seen.

<!-- Speaker note: A recycling centre wants a camera that sorts **Paper** from **Plastic**. You will train a model in **Teachable Machine**, then test it on the board's photos: paper and plastic items your model has never seen, in different places and light. **To train a model:** open [Teachable Machine](https://teachablemachine.withgoogle.com/train/image) in a new tab and choose **Image Project**, then **Standard**. Name one class **Paper** and one **Plastic**, add about 20 photos of each, and click **Train Model**. Then click **Export Model**, choose **Upload my model**, and copy the link it gives you into the board. **No webcam, or no paper and plastic on your desk?** Download photos to upload instead (in each class, choose **Upload** and select every photo in its folder): [plain photos](../../../_playground-board/media/classifier/recycling/recycling-biased.zip) and [varied photos](../../../_playground-board/media/classifier/recycling/recycling-good.zip). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Your model gets your own items right almost every time on the webcam. The board tests it on other paper and plastic photographed on a messy bench. Its score on the messy bench will be…**

- Much lower than on plain backgrounds
- Exactly 50%: it guesses
- About the same: it has learned what paper is
- Higher: more objects help it

<!-- Speaker note: What happens: Much lower. The model learned from photos on one plain background, so the background is part of what it learned. On a messy bench it is often wrong. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: take a show of hands. Most expect 'about the same'. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fcode%2Fmicrobit-computer%2Fai-sorter%2Fstep-2&code=widget%3A+classifier%0Atestset%3A+recycling%0Agroups%3A+plain%2C+messy%0Awebcam%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/code/microbit-computer/ai-sorter/?full=step-2#step-2)

<!-- Speaker note: Train **Paper** and **Plastic** with about 20 photos each, all on the same plain desk (or upload the **plain photos**). Paste your link and click **Load**. Compare the **plain background** and **messy bench** scores. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Much lower. The model learned from photos on one plain background, so the background is part of what it learned. On a messy bench it is often wrong.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Accuracy

**A model gets 23 of 32 test photos right. What is its accuracy, as a percentage (to the nearest whole number)?**

* Answer: 72

<!-- Speaker note: Accuracy is correct ÷ total: 23 ÷ 32 = 0.72, or 72%. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What the failures share

**This model scores: plain 8/8, messy 4/8, low light 5/8, not paper or plastic 0/8. Its training photos were all on one plain desk. Why does it fail on the messy bench?**

- It needs more training epochs
- It cannot tell the item from the background it was trained on
- Messy photos are harder for every model, so nothing can be done
- It has forgotten what paper is

* Answer: It cannot tell the item from the background it was trained on

<!-- Speaker note: Every training photo had the same plain desk, so the desk is part of what the model learned. On a cluttered bench it is guessing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Your turn

**Another model scores well everywhere except low light. Which fix is most likely to work?**

- Rename the classes
- Add more photos on the same bright desk
- Add training photos taken in low light
- Train for longer

* Answer: Add training photos taken in low light

<!-- Speaker note: Look for what the failures share (low light), then add training photos that have it. Change the data, not the settings. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's model

**Sam's model scores 50% on the messy bench. Sam adds 100 more photos of the same items on the same desk. The messy score doesn't change. What went wrong?**

- The new photos were like the old ones, so they added no variety
- The board's test is unfair
- Sam needed to delete the old photos first
- 100 photos is too many

* Answer: The new photos were like the old ones, so they added no variety

<!-- Speaker note: More of the same data teaches the model nothing new. Sam needs photos on different backgrounds. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Fix the data



- **Backgrounds:** Retrain your model with photos of the items on **at least three different backgrounds** (or upload the **varied photos**). Export, paste the new link and **Load
- **Unbalanced classes:** 
- **Neither:** Look at the **not paper or plastic** group: the model gives a can or a jar a label anyway, often with high confidence. A model always picks one of its classes. 

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-computer/ai-sorter/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each change to the training data, one at a time, shows its own effect on the scores. For students who need more support: Use the downloaded photos instead of the webcam: plain first (the biased model), then varied. For early finishers: Add a fourth class (Cardboard or Glass). Which pairs of classes does the model mix up most, and why? The hard part, on purpose: Accepting that a model trained on one desk fails on a messy bench. Ask what the test photos have that the training photos don't, before adding more data. When students get stuck: The board says it could not load the model. Ask: Did you click Upload my model, and copy the whole link (ending in a slash)? Fix: Export again with Upload my model and paste the new link. / The board says the model has no class called Paper or Plastic. Ask: What did you name your classes in Teachable Machine? Fix: Rename the classes to Paper and Plastic, retrain, export and paste the new link. / A student keeps adding photos but the messy score doesn't change. Ask: Are the new photos different from the old ones? Fix: Take photos on new backgrounds: a book, a jumper, a cluttered pencil case. / A student changes Teachable Machine's training settings (epochs, learning rate) to fix it. Ask: Did the model see any messy backgrounds? Fix: Change the photos, not the settings. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Midday photos

**A model was trained on photos taken at midday by a window. It scores 100% plain, 88% messy, 25% low light. What is the problem, and the fix?**

- Too few classes: add a Neither class
- No dim photos in training: add photos taken in low light
- Too many photos: delete some
- The test is unfair: ignore low light

* Answer: No dim photos in training: add photos taken in low light

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A confident can

**A model scores 90% on paper and plastic but labels every can as Plastic with 95% confidence. What is the problem, and the fix?**

- High confidence means it is right: nothing to fix
- Cans are too shiny for any model
- It has no class for other things: add a Neither class
- It needs more plastic photos

* Answer: It has no class for other things: add a Neither class

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Lopsided classes

**Paper has 80 photos and Plastic has 15. The model calls most plastic items Paper. What is the problem, and the fix?**

- The classes are unbalanced: give each class about the same number of photos
- Plastic is harder to see: add a filter
- Retrain with the same photos
- It needs a Neither class

* Answer: The classes are unbalanced: give each class about the same number of photos

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make a sorter you would trust

Use what you found: varied backgrounds and light, balanced classes, and a **Neither** class. Then ask a classmate to bring three items your model has never seen. Does it still work?

[Open this step](https://tutorials.learningwaypoints.com/code/microbit-computer/ai-sorter/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Meeting a target on every group, not just overall, is what testing before trusting means. -->

---

## Evaluate

Write one or two sentences: which items or conditions your sorter would still get wrong, and what a real recycling centre would need to test before trusting it.

**Revision summary**

- A model learns only from the examples you give it: it works on inputs like its training data and fails on others.
- **Accuracy** = correct ÷ total. Test on photos the model has never seen, and look at each **group**, not just the overall score.
- Find what the failures share, then **change the data**: more variety, balanced classes, a class for "none of these".
- A model always picks one of its classes, and it can be confident and wrong.

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A model scores 95% on its own desk and 50% in the canteen. What do you do?**

* Find what the canteen photos have that the training photos don't (background, light), and add training photos like that.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: send the model's labels to a micro:bit that sorts with a servo flap. Real world: automated recycling sorters, and any camera system tested on people or places it wasn't trained on (who might it fail for?). -->
