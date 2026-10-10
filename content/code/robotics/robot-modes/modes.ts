// One robot, many jobs: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The line-following function is lesson 5's program, now named.

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
input.onButtonPressed(Button.A, function () {
    mode = "go"
})
input.onButtonPressed(Button.B, function () {
    mode = "follow"
})
input.onButtonPressed(Button.AB, function () {
    mode = "stop"
})
let mode = ""
robot.elecfreaksCuteBot.start()
mode = "stop"
basic.forever(function () {
    if (mode == "go") {
        robot.motorTank(50, 50)
    } else if (mode == "follow") {
        followLine()
    } else {
        robot.motorStop()
    }
})
// endregion

// region: bug
input.onButtonPressed(Button.A, function () {
    mode = "go"
})
let mode = ""
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    mode = "stop"
    if (mode == "go") {
        robot.motorTank(50, 50)
    } else {
        robot.motorStop()
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
input.onButtonPressed(Button.A, function () {
    mode = "go"
})
input.onButtonPressed(Button.B, function () {
    mode = "follow"
})
input.onButtonPressed(Button.AB, function () {
    mode = "stop"
})
let mode = ""
robot.elecfreaksCuteBot.start()
mode = "stop"
basic.forever(function () {
    if (mode == "go") {
        robot.motorTank(50, 50)
    } else if (mode == "follow") {
        followLine()
    } else {
        robot.motorStop()
    }
})
// endregion

// region: sol-show
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
input.onButtonPressed(Button.A, function () {
    mode = "go"
    basic.showArrow(ArrowNames.North)
})
input.onButtonPressed(Button.B, function () {
    mode = "follow"
    basic.showIcon(IconNames.Diamond)
})
input.onButtonPressed(Button.AB, function () {
    mode = "stop"
    basic.showIcon(IconNames.Square)
})
let mode = ""
robot.elecfreaksCuteBot.start()
mode = "stop"
basic.forever(function () {
    if (mode == "go") {
        robot.motorTank(50, 50)
    } else if (mode == "follow") {
        followLine()
    } else {
        robot.motorStop()
    }
})
// endregion

// region: sol-explore
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
input.onButtonPressed(Button.A, function () {
    mode = "go"
    basic.showArrow(ArrowNames.North)
})
input.onButtonPressed(Button.B, function () {
    mode = "follow"
    basic.showIcon(IconNames.Diamond)
})
input.onButtonPressed(Button.AB, function () {
    mode = "stop"
    basic.showIcon(IconNames.Square)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    mode = "explore"
})
let mode = ""
robot.elecfreaksCuteBot.start()
mode = "stop"
basic.forever(function () {
    if (mode == "go") {
        robot.motorTank(50, 50)
    } else if (mode == "follow") {
        followLine()
    } else if (mode == "explore") {
        if (robot.obstacleDistance() < 15) {
            robot.motorTank(50, -50, 500)
        } else {
            robot.motorTank(50, 50)
        }
    } else {
        robot.motorStop()
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
input.onButtonPressed(Button.A, function () {
    mode = "go"
})
input.onButtonPressed(Button.B, function () {
    mode = "follow"
})
input.onButtonPressed(Button.AB, function () {
    mode = "stop"
})
let mode = ""
robot.elecfreaksCuteBot.start()
mode = "stop"
basic.forever(function () {
    if (mode == "go") {
        robot.motorTank(50, 50)
    } else if (mode == "follow") {
        followLine()
    } else {
        robot.motorStop()
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
input.onButtonPressed(Button.A, function () {
    mode = "go"
})
input.onButtonPressed(Button.B, function () {
    mode = "follow"
})
input.onButtonPressed(Button.AB, function () {
    mode = "stop"
})
input.onGesture(Gesture.Shake, function () {
    mode = "guard"
})
let mode = ""
robot.elecfreaksCuteBot.start()
mode = "stop"
basic.forever(function () {
    if (mode == "go") {
        robot.motorTank(50, 50)
    } else if (mode == "follow") {
        followLine()
    } else if (mode == "guard") {
        robot.motorStop()
        if (robot.obstacleDistance() < 20) {
            robot.setColor(0xff0000)
            robot.playTone(880, 200)
        } else {
            robot.setColor(0x000000)
        }
    } else {
        robot.motorStop()
    }
})
// endregion
