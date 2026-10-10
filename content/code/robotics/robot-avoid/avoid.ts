// Avoid and explore: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorTank(50, -50, 500)
    } else {
        robot.motorTank(50, 50)
    }
})
// endregion

// region: bug
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() > 15) {
        robot.motorTank(50, -50, 500)
    } else {
        robot.motorTank(50, 50)
    }
})
// endregion

// region: modify
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorTank(50, -50, 500)
    } else {
        robot.motorTank(50, 50)
    }
})
// endregion

// region: sol-back
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorTank(-50, -50, 300)
        robot.motorTank(50, -50, 500)
    } else {
        robot.motorTank(50, 50)
    }
})
// endregion

// region: sol-lights
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.setColor(0xff0000)
        robot.motorTank(-50, -50, 300)
        robot.motorTank(50, -50, 500)
    } else {
        robot.setColor(0x00ff00)
        robot.motorTank(50, 50)
    }
})
// endregion

// region: make
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorTank(-50, -50, 300)
        robot.motorTank(50, -50, 500)
    } else {
        robot.motorTank(50, 50)
    }
})
// endregion

// region: sol-make
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorTank(-50, -50, 300)
        if (randint(0, 1) == 0) {
            robot.motorTank(50, -50, 500)
        } else {
            robot.motorTank(-50, 50, 500)
        }
    } else {
        robot.motorTank(50, 50)
    }
})
// endregion
