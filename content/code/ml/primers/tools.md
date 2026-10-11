---
title: Real tools in 5 minutes
---
## The idea in plain words

**scikit-learn** is the standard Python library for machine learning. Everything built by hand has a line in it: `train_test_split` (shuffle and split), `KNeighborsClassifier` (nearest neighbour), `fit` (learn from the training examples), `score` (accuracy on given data), `predict` (guess new examples). A **decision tree** learns `if` rules from the data, like Lesson 1's but chosen by the computer.

A model becomes useful in an **app**: a Gradio function turns slider values into a one-row table with the training columns, and the model predicts. `predict_proba` says how the 5 nearest penguins voted, which tells the user how sure it is.

**Limits.** A model can only answer with what it was trained on (an emperor penguin is called Gentoo), and it can be 100% sure and wrong. It knows the world its data came from (three islands, 2007 to 2009). A **model card** says what a model does, how well on a fair test, and where not to trust it.

## Why programmers use them

- **Libraries are tested and fast**, so data scientists spend their time on data and questions, not on writing distance loops.
- **Apps put models in people's hands**; model cards and fair tests keep them honest.

## An everyday picture, and where it breaks

scikit-learn is a well-made toolkit: you still need to know which tool does what, and to check the result. It breaks if you trust it blindly: the same `fit` and `score` on the wrong data give a convincing wrong answer.

## Try it yourself (5 minutes)

1. Run Lesson 4 and match each line with Lessons 2 and 3.
2. Add body mass to the measurements and watch nearest neighbour get worse (grams swamp the distance).
3. In Lesson 5, find measurements the app is only 60% sure about.

## Questions students ask

- **Why train the app's model on all the data?** Testing showed the method works; for use, it should learn from every example.
- **Why does it take a while to start?** The browser downloads scikit-learn the first time (about 19 MB), then keeps it.
- **Is this how big AI works?** The same ideas (examples, fair tests, honest limits), with far more data and bigger models.
