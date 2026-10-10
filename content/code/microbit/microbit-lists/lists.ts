// Lists: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let answers = ["Yes", "No", "Maybe"]
input.onButtonPressed(Button.A, function () {
    basic.showString(answers[1])
})
// endregion

// region: bug
let answers = ["Yes", "No", "Maybe"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(1, 3)])
})
// endregion

// region: ball
let answers = ["Yes", "No", "Maybe"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(0, answers.length - 1)])
})
// endregion

// region: sol-more
let answers = ["Yes", "No", "Maybe", "Ask again", "Never"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(0, answers.length - 1)])
})
// endregion

// region: sol-length
let answers = ["Yes", "No", "Maybe", "Ask again", "Never"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(0, answers.length - 1)])
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(answers.length)
})
// endregion

// region: make
input.onGesture(Gesture.Shake, function () {

})
// endregion

// region: sol-make
let choices = ["Rock", "Paper", "Scissors"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(choices[randint(0, choices.length - 1)])
})
// endregion

// region: picker
let names = ["Ava", "Ben", "Chloe", "Dev"]
input.onButtonPressed(Button.A, function () {
    basic.showString(names[randint(0, names.length - 1)])
})
// endregion
