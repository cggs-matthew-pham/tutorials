// Patrol and alert: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// One program, two roles: A+B makes a micro:bit the base. The base sends "go" and "stop"; the robot reports "blocked" and "clear".
// Radio handlers only change the mode: forever drives the motors, so it would undo any move made in a handler.

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
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorStop()
    } else {
        followLine()
    }
})
// endregion

// region: bug
radio.onReceivedString(function (receivedString) {
    if (receivedString == "go") {
        followLine()
    }
})
// endregion

// region: m1
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

// region: sol-m1
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
input.onButtonPressed(Button.A, function () {
    radio.sendString("go")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("stop")
})
radio.onReceivedString(function (receivedString) {
    if (role == "robot") {
        if (receivedString == "go") {
            mode = "patrol"
        } else if (receivedString == "stop") {
            mode = "stop"
        }
    }
})
let mode = ""
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
mode = "stop"
basic.forever(function () {
    if (role == "robot") {
        if (mode == "patrol") {
            followLine()
        } else {
            robot.motorStop()
        }
    }
})
// endregion

// region: sol-m2
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
input.onButtonPressed(Button.A, function () {
    radio.sendString("go")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("stop")
})
radio.onReceivedString(function (receivedString) {
    if (role == "robot") {
        if (receivedString == "go") {
            mode = "patrol"
        } else if (receivedString == "stop") {
            mode = "stop"
        }
    } else if (role == "base") {
        if (receivedString == "blocked") {
            basic.showIcon(IconNames.No)
            music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
        } else if (receivedString == "clear") {
            basic.showIcon(IconNames.Yes)
        }
    }
})
let alerted = false
let mode = ""
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
mode = "stop"
basic.forever(function () {
    if (role == "robot") {
        if (mode == "patrol") {
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
        } else {
            robot.motorStop()
        }
    }
})
// endregion

// region: sol-m3
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
input.onButtonPressed(Button.A, function () {
    radio.sendString("go")
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("stop")
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showNumber(alerts)
})
radio.onReceivedString(function (receivedString) {
    if (role == "robot") {
        if (receivedString == "go") {
            mode = "patrol"
        } else if (receivedString == "stop") {
            mode = "stop"
        }
    } else if (role == "base") {
        if (receivedString == "blocked") {
            alerts += 1
            basic.showIcon(IconNames.No)
            music.play(music.tonePlayable(880, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
        } else if (receivedString == "clear") {
            basic.showIcon(IconNames.Yes)
        }
    }
})
let alerts = 0
let alerted = false
let mode = ""
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
mode = "stop"
basic.forever(function () {
    if (role == "robot") {
        if (mode == "patrol") {
            if (robot.obstacleDistance() < 15) {
                robot.motorStop()
                robot.setColor(0xff0000)
                if (!(alerted)) {
                    radio.sendString("blocked")
                    alerted = true
                }
            } else {
                if (alerted) {
                    radio.sendString("clear")
                }
                alerted = false
                robot.setColor(0x00ff00)
                followLine()
            }
        } else {
            robot.motorStop()
            robot.setColor(0x000000)
        }
    }
})
// endregion
