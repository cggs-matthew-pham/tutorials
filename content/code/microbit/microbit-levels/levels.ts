// Fake-outs and levels: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: decoy
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.pause(randint(1000, 3000))
    if (randint(0, 2) == 0) {
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Heart)
    }
})
// endregion

// region: targets
let level = 0
let targets = [800, 600, 450, 350, 300]
input.onButtonPressed(Button.AB, function () {
    basic.showString("Beat")
    basic.showNumber(targets[level])
})
// endregion

// region: m1
let start = 0
let waiting = false
let decoy = false
input.onButtonPressed(Button.B, function () {
    waiting = false
    decoy = false
    basic.clearScreen()
    basic.pause(randint(1000, 3000))
    if (randint(0, 2) == 0) {
        decoy = true
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Heart)
        start = input.runningTime()
        waiting = true
    }
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        basic.showNumber(input.runningTime() - start)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: sol-m1
let start = 0
let waiting = false
let decoy = false
input.onButtonPressed(Button.B, function () {
    waiting = false
    decoy = false
    basic.clearScreen()
    basic.pause(randint(1000, 3000))
    if (randint(0, 2) == 0) {
        decoy = true
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Heart)
        start = input.runningTime()
        waiting = true
    }
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        basic.showNumber(input.runningTime() - start)
    } else if (decoy) {
        decoy = false
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: m2
let start = 0
let waiting = false
let decoy = false
let reaction = 0
let level = 0
let targets = [800, 600, 450, 350, 300]
input.onButtonPressed(Button.B, function () {
    waiting = false
    decoy = false
    basic.clearScreen()
    basic.pause(randint(1000, 3000))
    if (randint(0, 2) == 0) {
        decoy = true
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Heart)
        start = input.runningTime()
        waiting = true
    }
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        reaction = input.runningTime() - start
        basic.showNumber(reaction)
    } else if (decoy) {
        decoy = false
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: sol-m2
let start = 0
let waiting = false
let decoy = false
let reaction = 0
let level = 0
let targets = [800, 600, 450, 350, 300]
input.onButtonPressed(Button.B, function () {
    waiting = false
    decoy = false
    basic.clearScreen()
    basic.pause(randint(1000, 3000))
    if (randint(0, 2) == 0) {
        decoy = true
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Heart)
        start = input.runningTime()
        waiting = true
    }
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        reaction = input.runningTime() - start
        if (reaction < targets[level]) {
            level += 1
            basic.showNumber(level)
        } else {
            basic.showIcon(IconNames.Sad)
        }
    } else if (decoy) {
        decoy = false
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: m3
let start = 0
let waiting = false
let decoy = false
let reaction = 0
let level = 0
let targets = [800, 600, 450, 350, 300]
input.onButtonPressed(Button.B, function () {
    waiting = false
    decoy = false
    basic.clearScreen()
    basic.pause(randint(1000, 3000))
    if (randint(0, 2) == 0) {
        decoy = true
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Heart)
        start = input.runningTime()
        waiting = true
    }
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        reaction = input.runningTime() - start
        if (reaction < targets[level]) {
            level += 1
            basic.showNumber(level)
        } else {
            basic.showIcon(IconNames.Sad)
        }
    } else if (decoy) {
        decoy = false
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: sol-m3
let start = 0
let waiting = false
let decoy = false
let reaction = 0
let level = 0
let lives = 3
let targets = [800, 600, 450, 350, 300]
input.onButtonPressed(Button.B, function () {
    waiting = false
    decoy = false
    basic.clearScreen()
    basic.pause(randint(1000, 3000))
    if (randint(0, 2) == 0) {
        decoy = true
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Heart)
        start = input.runningTime()
        waiting = true
    }
})
input.onButtonPressed(Button.A, function () {
    if (waiting) {
        waiting = false
        reaction = input.runningTime() - start
        if (reaction < targets[level]) {
            level += 1
            if (level == targets.length) {
                basic.showString("Champion")
                level = 0
                lives = 3
            } else {
                basic.showNumber(level)
            }
        } else {
            lives += -1
            basic.showIcon(IconNames.Sad)
        }
    } else if (decoy) {
        decoy = false
        lives += -1
        basic.showIcon(IconNames.Skull)
    } else {
        basic.showIcon(IconNames.No)
    }
    if (lives == 0) {
        basic.showString("Game over")
        basic.showNumber(level)
        level = 0
        lives = 3
    }
})
// endregion
