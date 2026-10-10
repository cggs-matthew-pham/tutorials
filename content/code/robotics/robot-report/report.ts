// Report back: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// One program, two roles: every micro:bit starts as a robot; A+B makes one the base station.

// region: predict
function followLine () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
}
input.onButtonPressed(Button.AB, function () {
    role = "base"
    robot.motorStop()
    basic.showString("B")
})
radio.onReceivedString(function (receivedString) {
    if (role == "base") {
        basic.showIcon(IconNames.No)
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    }
})
let alerted = false
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
basic.forever(function () {
    if (role == "robot") {
        if (robot.obstacleDistance() < 15) {
            robot.motorStop()
            if (!(alerted)) {
                radio.sendString("blocked")
                alerted = true
            }
        } else {
            alerted = false
            followLine()
        }
    }
})
// endregion

// region: bug
basic.forever(function () {
    if (role == "robot") {
        if (robot.obstacleDistance() < 15) {
            robot.motorStop()
            radio.sendString("blocked")
        } else {
            followLine()
        }
    }
})
// endregion

// region: modify
function followLine () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
}
input.onButtonPressed(Button.AB, function () {
    role = "base"
    robot.motorStop()
    basic.showString("B")
})
radio.onReceivedString(function (receivedString) {
    if (role == "base") {
        basic.showIcon(IconNames.No)
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    }
})
let alerted = false
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
basic.forever(function () {
    if (role == "robot") {
        if (robot.obstacleDistance() < 15) {
            robot.motorStop()
            if (!(alerted)) {
                radio.sendString("blocked")
                alerted = true
            }
        } else {
            alerted = false
            followLine()
        }
    }
})
// endregion

// region: sol-clear
function followLine () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
}
input.onButtonPressed(Button.AB, function () {
    role = "base"
    robot.motorStop()
    basic.showString("B")
})
radio.onReceivedString(function (receivedString) {
    if (role == "base") {
        if (receivedString == "clear") {
            basic.showIcon(IconNames.Yes)
        } else {
            basic.showIcon(IconNames.No)
            music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
        }
    }
})
let alerted = false
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
basic.forever(function () {
    if (role == "robot") {
        if (robot.obstacleDistance() < 15) {
            robot.motorStop()
            if (!(alerted)) {
                radio.sendString("blocked")
                alerted = true
            }
        } else {
            if (alerted) {
                radio.sendString("clear")
            }
            alerted = false
            followLine()
        }
    }
})
// endregion

// region: sol-count
function followLine () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
}
input.onButtonPressed(Button.AB, function () {
    role = "base"
    robot.motorStop()
    basic.showString("B")
})
radio.onReceivedString(function (receivedString) {
    if (role == "base") {
        if (receivedString == "clear") {
            basic.showIcon(IconNames.Yes)
        } else {
            alerts += 1
            basic.showNumber(alerts)
            music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
        }
    }
})
let alerts = 0
let alerted = false
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
basic.forever(function () {
    if (role == "robot") {
        if (robot.obstacleDistance() < 15) {
            robot.motorStop()
            if (!(alerted)) {
                radio.sendString("blocked")
                alerted = true
            }
        } else {
            if (alerted) {
                radio.sendString("clear")
            }
            alerted = false
            followLine()
        }
    }
})
// endregion

// region: make
function followLine () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
}
input.onButtonPressed(Button.AB, function () {
    role = "base"
    robot.motorStop()
    basic.showString("B")
})
radio.onReceivedString(function (receivedString) {
    if (role == "base") {
        basic.showIcon(IconNames.No)
    }
})
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
basic.forever(function () {
    if (role == "robot") {
        followLine()
    }
})
// endregion

// region: sol-make
function followLine () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
}
input.onButtonPressed(Button.AB, function () {
    role = "base"
    robot.motorStop()
    basic.showString("B")
})
radio.onReceivedString(function (receivedString) {
    if (role == "base" && receivedString == "snake") {
        basic.showIcon(IconNames.Snake)
        music.play(music.stringPlayable("C5 A C5 A C5 A - - ", 240), music.PlaybackMode.InBackground)
    }
})
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
basic.forever(function () {
    if (role == "robot") {
        if (robot.obstacleDistance() < 15) {
            robot.motorStop()
            robot.setColor(0xff0000)
            radio.sendString("snake")
            basic.pause(2000)
            robot.motorTank(50, -50, 1200)
            robot.setColor(0x000000)
        } else {
            followLine()
        }
    }
})
// endregion
