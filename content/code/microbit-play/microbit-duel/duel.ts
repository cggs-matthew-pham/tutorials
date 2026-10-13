// Radio duel: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// Both micro:bits run the same program. Messages: 0 = get ready, 1 = go, 2 = I pressed first, 3 = I won the match.

// region: start
let racing = false
radio.setGroup(7)
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
    racing = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    radio.sendNumber(1)
    basic.showIcon(IconNames.Heart)
    racing = true
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        basic.showIcon(IconNames.Heart)
        racing = true
    }
})
// endregion

// region: sol-m1
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
}
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(0)
    racing = false
    basic.clearScreen()
    basic.pause(randint(1000, 4000))
    radio.sendNumber(1)
    go()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        go()
    }
})
// endregion

// region: m2
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
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

})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        racing = false
        basic.clearScreen()
    } else if (receivedNumber == 1) {
        go()
    }
})
// endregion

// region: sol-m2
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
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

// region: m3
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
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

// region: sol-m3
let wins = 0
let racing = false
radio.setGroup(7)
function go () {
    basic.showIcon(IconNames.Heart)
    racing = true
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
        wins += 1
        if (wins == 3) {
            radio.sendNumber(3)
            basic.showIcon(IconNames.Yes)
        } else {
            basic.showIcon(IconNames.Happy)
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(wins)
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
    } else if (receivedNumber == 3) {
        basic.showIcon(IconNames.Skull)
    }
})
// endregion
