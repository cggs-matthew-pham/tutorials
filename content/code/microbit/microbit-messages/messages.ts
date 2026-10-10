// Messages with meaning: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// Both simulated micro:bits run the same program, so each one is a sender and a receiver.

// region: predict
let words = ["Hi", "Yes", "No"]
radio.setGroup(1)
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(words[receivedNumber])
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(2)
})
// endregion

// region: chooser
let words = ["Hi", "Yes", "No"]
let choice = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    choice += 1
    if (choice == words.length) {
        choice = 0
    }
    basic.showString(words[choice])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(choice)
    basic.showIcon(IconNames.Yes)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(words[receivedNumber])
})
// endregion

// region: sol-word
let words = ["Hi", "Yes", "No", "Help"]
let choice = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    choice += 1
    if (choice == words.length) {
        choice = 0
    }
    basic.showString(words[choice])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(choice)
    basic.showIcon(IconNames.Yes)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(words[receivedNumber])
})
// endregion

// region: sol-reply
let words = ["Hi", "Yes", "No", "Help"]
let choice = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    choice += 1
    if (choice == words.length) {
        choice = 0
    }
    basic.showString(words[choice])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(choice)
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 99) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showString(words[receivedNumber])
        radio.sendNumber(99)
    }
})
// endregion

// region: make
radio.setGroup(1)
// endregion

// region: sol-make
let moods = ["Happy", "Tired", "Hungry", "Excited"]
let mood = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    mood += 1
    if (mood == moods.length) {
        mood = 0
    }
    basic.showString(moods[mood])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(mood)
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(moods[receivedNumber])
})
// endregion

// region: buzzer
let answers = ["A", "B", "C"]
let pick = 0
radio.setGroup(1)
input.onButtonPressed(Button.A, function () {
    pick += 1
    if (pick == answers.length) {
        pick = 0
    }
    basic.showString(answers[pick])
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(pick)
    basic.clearScreen()
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(answers[receivedNumber])
})
// endregion
