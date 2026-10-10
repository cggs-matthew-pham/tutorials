// Tournament: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// Both micro:bits run the same program. Messages: 0 = get ready, 1 = go, 2 = I pressed first, 3 = I am champion.
// scores: place 0 is this micro:bit's player, place 1 is the other player.

// region: board
let scores = [2, 1]
function showScores () {
    basic.showNumber(scores[0])
    basic.showString("-")
    basic.showNumber(scores[1])
}
input.onButtonPressed(Button.AB, function () {
    showScores()
})
// endregion

// region: m1
let scores = [0, 0]
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
}
function showScores () {
    basic.showNumber(scores[0])
    basic.showString("-")
    basic.showNumber(scores[1])
}
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
    racing = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    radio.sendNumber(1)
    go()
})
input.onButtonPressed(Button.A, function () {
    if (racing) {
        racing = false
        radio.sendNumber(2)
        basic.showIcon(IconNames.Happy)
    }
})
input.onButtonPressed(Button.AB, function () {
    showScores()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        go()
    } else if (receivedNumber == 2) {
        if (racing) {
            racing = false
            basic.showIcon(IconNames.Sad)
        }
    }
})
// endregion

// region: sol-m1
let scores = [0, 0]
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
}
function showScores () {
    basic.showNumber(scores[0])
    basic.showString("-")
    basic.showNumber(scores[1])
}
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
    racing = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    radio.sendNumber(1)
    go()
})
input.onButtonPressed(Button.A, function () {
    if (racing) {
        racing = false
        radio.sendNumber(2)
        scores[0] = scores[0] + 1
        basic.showIcon(IconNames.Happy)
    }
})
input.onButtonPressed(Button.AB, function () {
    showScores()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        go()
    } else if (receivedNumber == 2) {
        if (racing) {
            racing = false
            scores[1] = scores[1] + 1
            basic.showIcon(IconNames.Sad)
        }
    }
})
// endregion

// region: sol-m2
let scores = [0, 0]
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
}
function showScores () {
    basic.showNumber(scores[0])
    basic.showString("-")
    basic.showNumber(scores[1])
}
function startRound () {
    radio.sendNumber(0)
    racing = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    radio.sendNumber(1)
    go()
}
input.onButtonPressed(Button.B, function () {
    startRound()
})
input.onButtonPressed(Button.A, function () {
    if (racing) {
        racing = false
        radio.sendNumber(2)
        scores[0] = scores[0] + 1
        basic.showIcon(IconNames.Happy)
        basic.pause(1000)
        showScores()
        startRound()
    }
})
input.onButtonPressed(Button.AB, function () {
    showScores()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        go()
    } else if (receivedNumber == 2) {
        if (racing) {
            racing = false
            scores[1] = scores[1] + 1
            basic.showIcon(IconNames.Sad)
            basic.pause(1000)
            showScores()
        }
    }
})
// endregion

// region: sol-m3
let scores = [0, 0]
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
}
function showScores () {
    basic.showNumber(scores[0])
    basic.showString("-")
    basic.showNumber(scores[1])
}
function startRound () {
    radio.sendNumber(0)
    racing = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    radio.sendNumber(1)
    go()
}
function newTournament () {
    scores = [0, 0]
}
input.onButtonPressed(Button.B, function () {
    startRound()
})
input.onButtonPressed(Button.A, function () {
    if (racing) {
        racing = false
        radio.sendNumber(2)
        scores[0] = scores[0] + 1
        basic.showIcon(IconNames.Happy)
        basic.pause(1000)
        showScores()
        if (scores[0] == 3) {
            radio.sendNumber(3)
            basic.showString("Champion")
            newTournament()
        } else {
            startRound()
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    showScores()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        go()
    } else if (receivedNumber == 2) {
        if (racing) {
            racing = false
            scores[1] = scores[1] + 1
            basic.showIcon(IconNames.Sad)
            basic.pause(1000)
            showScores()
        }
    } else if (receivedNumber == 3) {
        basic.showString("Game over")
        newTournament()
    }
})
// endregion

// region: m2
let scores = [0, 0]
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
}
function showScores () {
    basic.showNumber(scores[0])
    basic.showString("-")
    basic.showNumber(scores[1])
}
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
    racing = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    radio.sendNumber(1)
    go()
})
input.onButtonPressed(Button.A, function () {
    if (racing) {
        racing = false
        radio.sendNumber(2)
        scores[0] = scores[0] + 1
        basic.showIcon(IconNames.Happy)
    }
})
input.onButtonPressed(Button.AB, function () {
    showScores()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        go()
    } else if (receivedNumber == 2) {
        if (racing) {
            racing = false
            scores[1] = scores[1] + 1
            basic.showIcon(IconNames.Sad)
        }
    }
})
// endregion

// region: m3
let scores = [0, 0]
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
}
function showScores () {
    basic.showNumber(scores[0])
    basic.showString("-")
    basic.showNumber(scores[1])
}
function startRound () {
    radio.sendNumber(0)
    racing = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    radio.sendNumber(1)
    go()
}
input.onButtonPressed(Button.B, function () {
    startRound()
})
input.onButtonPressed(Button.A, function () {
    if (racing) {
        racing = false
        radio.sendNumber(2)
        scores[0] = scores[0] + 1
        basic.showIcon(IconNames.Happy)
        basic.pause(1000)
        showScores()
        startRound()
    }
})
input.onButtonPressed(Button.AB, function () {
    showScores()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        go()
    } else if (receivedNumber == 2) {
        if (racing) {
            racing = false
            scores[1] = scores[1] + 1
            basic.showIcon(IconNames.Sad)
            basic.pause(1000)
            showScores()
        }
    }
})
// endregion
