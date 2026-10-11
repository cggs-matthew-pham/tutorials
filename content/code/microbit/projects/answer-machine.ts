let answers = ["YES", "NO", "MAYBE", "ASK AGAIN", "DEFINITELY"]
input.onGesture(Gesture.Shake, function () {
    basic.showString(answers[randint(0, answers.length - 1)])
})
