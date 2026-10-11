---
title: Models by hand in 5 minutes
---
## The idea in plain words

A **model** takes measurements and gives an answer: here, a penguin's bill and flipper length in, its species out. Its **accuracy** is how often it is right.

- **Rules** (Lesson 1): `if flipper > 206: return "Gentoo"`. A person chooses the numbers by looking at the data. On the Palmer Penguins they get 95% right.
- **Nearest neighbour** (Lesson 2): keep every example, and answer with the species of the most similar one. Similarity is a **distance**: Pythagoras on the two measurements. Nobody writes rules; the examples are the knowledge. A small distance means a confident guess.
- **A fair test** (Lesson 3): shuffle the data, train on most of it and **test on the rest**. Tested on its own training data, nearest neighbour scores 100% (each penguin finds itself), which proves nothing; on unseen penguins it scores about 95%.

## Why programmers use them

- **Machine learning finds patterns in examples** when rules are too hard to write: recognising photos, sounds, handwriting or movement.
- **Fair testing** is how anyone knows whether a model works, from school projects to medical tools.

## An everyday picture, and where it breaks

Nearest neighbour is identifying a bird by finding the most similar picture in a field guide. A fair test is a practice exam with questions you have not seen. It breaks because the model never knows when nothing in the guide matches: it always picks the closest picture.

## Try it yourself (5 minutes)

1. Run Lesson 1's rules and change 206 to 200.
2. In Lesson 2, try a mystery penguin of 50, 196 and read the distance.
3. In Lesson 3, compare the two scores, then change the seed.

## Questions students ask

- **Is nearest neighbour really machine learning?** Yes: it learns from examples, and scikit-learn has it (`KNeighborsClassifier`).
- **Why do the flippers matter more?** Their numbers are bigger, so differences in them dominate the distance (Lesson 4 comes back to this).
- **Where does the data come from?** Scientists at Palmer Station, Antarctica (Gorman, Williams and Fraser 2014), shared free for teaching.
