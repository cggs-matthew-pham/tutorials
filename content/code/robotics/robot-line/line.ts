// Follow the line: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The simulator's line sensors are on/off (on the line or not), so steering is by which sensors see the line.

// region: predict
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else {
        robot.motorTank(40, 10)
    }
})
// endregion

// region: investigate
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
})
// endregion

// region: bug
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(40, 10)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(10, 40)
    } else {
        robot.motorStop()
    }
})
// endregion

// region: modify
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
})
// endregion

// region: sol-fast
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(60, 60)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
})
// endregion

// region: sol-lost
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(60, 60)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
        robot.setColor(0xff0000)
    }
})
// endregion

// region: make
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
})
// endregion

// region: sol-make
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 10) {
        robot.motorStop()
    } else if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(10, 40)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 10)
    } else {
        robot.motorStop()
    }
})
// endregion
