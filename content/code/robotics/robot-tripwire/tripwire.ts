// Tripwire (optional): starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// One program, two roles: A+B makes a robot the tripwire (it stays still and watches); the other robot patrols the line.
// The tripwire sees the other robot with its distance sensor; the simulator counts robots as obstacles.

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
    role = "tripwire"
    robot.motorStop()
    basic.showIcon(IconNames.Target)
})
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
basic.forever(function () {
    if (role == "tripwire") {
        if (robot.obstacleDistance() < 20) {
            basic.showIcon(IconNames.Surprised)
        } else {
            basic.showIcon(IconNames.Target)
        }
    } else {
        followLine()
    }
})
// endregion

// region: bug
basic.forever(function () {
    if (role == "tripwire") {
        if (robot.obstacleDistance() < 20) {
            radio.sendString("trick")
        }
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
    role = "tripwire"
    robot.motorStop()
    basic.showIcon(IconNames.Target)
})
input.onButtonPressed(Button.A, function () {
    if (role == "tripwire") {
        armed = true
        basic.showIcon(IconNames.Yes)
    }
})
let armed = false
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
basic.forever(function () {
    if (role == "tripwire") {
        if (armed && robot.obstacleDistance() < 20) {
            armed = false
            radio.sendString("trick")
            basic.showIcon(IconNames.No)
        }
    } else {
        followLine()
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
    role = "tripwire"
    robot.motorStop()
    basic.showIcon(IconNames.Target)
})
input.onButtonPressed(Button.A, function () {
    if (role == "tripwire") {
        armed = true
        basic.showIcon(IconNames.Yes)
    }
})
radio.onReceivedString(function (receivedString) {
    if (role == "robot" && receivedString == "trick") {
        mode = "trick"
    }
})
let armed = false
let mode = ""
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
mode = "patrol"
basic.forever(function () {
    if (role == "tripwire") {
        if (armed && robot.obstacleDistance() < 20) {
            armed = false
            radio.sendString("trick")
            basic.showIcon(IconNames.No)
        }
    } else {
        if (mode == "trick") {
            robot.setColor(0xff00ff)
            robot.motorTank(50, -50, 300)
            robot.motorTank(-50, 50, 300)
            robot.motorTank(50, -50, 300)
            robot.motorTank(-50, 50, 300)
            robot.motorStop()
            robot.setColor(0x000000)
            mode = "patrol"
        } else {
            followLine()
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
    role = "tripwire"
    robot.motorStop()
    basic.showIcon(IconNames.Target)
})
input.onButtonPressed(Button.A, function () {
    if (role == "tripwire") {
        armed = true
        basic.showIcon(IconNames.Yes)
    }
})
radio.onReceivedString(function (receivedString) {
    if (role == "robot" && receivedString == "trick") {
        mode = "trick"
    }
})
let passes = 0
let armed = false
let mode = ""
let role = ""
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
role = "robot"
mode = "patrol"
basic.forever(function () {
    if (role == "tripwire") {
        if (armed && robot.obstacleDistance() < 20) {
            armed = false
            radio.sendString("trick")
            passes += 1
            basic.showNumber(passes)
            basic.pause(5000)
            armed = true
            basic.showIcon(IconNames.Yes)
        }
    } else {
        if (mode == "trick") {
            robot.setColor(0xff00ff)
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
            robot.motorTank(50, -50, 300)
            robot.motorTank(-50, 50, 300)
            robot.motorTank(50, -50, 300)
            robot.motorTank(-50, 50, 300)
            robot.motorStop()
            robot.setColor(0x000000)
            mode = "patrol"
        } else {
            followLine()
        }
    }
})
// endregion
