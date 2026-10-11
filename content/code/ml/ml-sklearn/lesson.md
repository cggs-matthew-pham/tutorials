---
order: 4
unit: tools
title: The same model in scikit-learn
summary: "Build the nearest-neighbour model and the fair test again with scikit-learn, the library data scientists use, then compare it with a decision tree."
language: python
recipes: [import-from, object, attribute]
hook: "Everything you built by hand has a name in scikit-learn, a library used in science, banks and hospitals. Now you know what it does inside."
---
**scikit-learn** is a Python library of machine-learning models. It does in a few lines what you wrote by hand: `train_test_split` shuffles and splits, `KNeighborsClassifier(n_neighbors=1)` is your nearest-neighbour model, `fit` gives it the training examples, `score` tests it, and `predict` guesses a new penguin. The data is read with pandas (from Data detective): `X` is the measurements and `y` is the answers. It takes several seconds to load the first time.

## Predict

```step
stage: predict
code: models.py#predict
check:
  type: predict
  q: "What does it print?"
  options: ["1.0 (100%)", "About 0.94", "0.5", "An error"]
  actual: "1.0. score(X_train, y_train) tests the model on the penguins it learned from, and with n_neighbors=1 each one finds itself, exactly as in the last lesson."
```

The model is scored on `X_train` and `y_train`. What did you find last lesson about testing on training data?

## Run

```step
stage: run
code: models.py#run
try: { playground: python, starter: "models.py#run", files: [../sets/penguins.csv], height: 480 }
check: { type: reflect, text: "I can match each line with the part I wrote by hand in the last two lessons." }
unlocks: [train-and-score-a-model, predict-with-a-model]
```

Run it (wait for scikit-learn to load). Then change the mystery penguin's measurements and run again.

## Investigate

```step
stage: investigate
code: models.py#run
insight: "scikit-learn's split, fit, score and predict are the steps you built by hand; knowing them makes the library's answers something you can check, not magic."
tasks:
  - check:
      type: match
      q: "Match each scikit-learn line with what you wrote by hand."
      pairs:
        - ["train_test_split(X, y, test_size=0.25, random_state=1)", "shuffle with a seed, then penguins[:250] and penguins[250:]"]
        - ["KNeighborsClassifier(n_neighbors=1)", "nearest(): copy the closest penguin's species"]
        - ["model.fit(X_train, y_train)", "keeping the training penguins as the examples"]
        - ["model.score(X_test, y_test)", "accuracy(test, train): the share guessed right"]
  - check:
      type: question
      q: "Why is the mystery penguin made with columns=X.columns?"
      options: ["The model needs the same measurements, in the same order and with the same names, as it was trained on", "pandas needs a name for every table", "To make it print nicely", "It is not needed"]
      answer: 0
      explain: "The model learned from bill length then flipper length. A new example must be given the same way, or its numbers mean something else."
  - check:
      type: bug
      code: models.py#bug
      text: "This says the model is 100% accurate. Click the line that is wrong."
      answer: 12
      fault: logic
      misconception: test-on-train
      explain: "It scores the model on X_train, the penguins it learned from. The test set, X_test and y_test, shows how good it really is."
```

### By hand and by library

The same four steps.

### The same columns

Why the mystery penguin needs them.

### Spot the bug

A score that is too good.

## Modify

```step
stage: modify
insight: "Models have settings, and different kinds of model learn differently; a fair test compares them."
try: { playground: python, starter: "models.py#run", files: [../sets/penguins.csv], height: 480 }
tasks:
  - hint: "Change n_neighbors=1 to n_neighbors=5: the 5 nearest penguins vote."
    check: { type: code, text: "Let the 5 nearest penguins vote, and compare the test accuracy.", rules: { contains: ["n_neighbors=5"] } }
  - hint:
      - "from sklearn.tree import DecisionTreeClassifier, then tree = DecisionTreeClassifier(max_depth=3, random_state=1)."
      - "fit it on the same training data and score it on the same test data."
    check: { type: code, text: "Train a decision tree on the same data, and compare its test accuracy.", rules: { contains: ["DecisionTreeClassifier("] } }
```

### Five neighbours

Let the **5** nearest penguins vote instead of 1. Better, worse or the same?

### A decision tree

A **decision tree** learns `if` rules from the data, like the ones you wrote in Lesson 1 but chosen by the computer. Train one on the same data and compare.

## Make: the best measurements

```step
stage: make
insight: "Goals only: try different measurements, test each fairly, and explain what you find."
try: { playground: python, starter: "models.py#make", files: [../sets/penguins.csv], height: 480 }
check: { type: code, text: "Try at least three choices of measurements, test each fairly, and report the best.", rules: { contains: ["train_test_split(", "score("], loops: 1 } }
```

Which measurements make the best model? Try at least three choices of columns (add `bill_depth_mm` and `body_mass_g`), test each one fairly with both models, and report the best. If one choice makes the neighbours model much **worse**, think about last lesson's question on bigger numbers.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Adding body mass (in grams, around 4000) made the nearest-neighbour model worse, but not the tree. Why?"
  options: ["Grams are big numbers, so body mass swamps the distance; a tree looks at one measurement at a time, so it does not mind", "Body mass is wrong in the data", "Trees are always better", "Four measurements are too many"]
  answer: 0
  explain: "Distance-based models need measurements on similar scales; scikit-learn's StandardScaler rescales them. Choosing and preparing the data is half of machine learning."
```

Next: put the model behind a Gradio app, so anyone can use it.
