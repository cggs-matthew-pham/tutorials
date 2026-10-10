// Stop before you crash: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// robot.elecfreaksCuteBot.start() picks the robot. Schools with another supported robot change only that line.

// region: predict
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50)
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorStop()
    }
})
// endregion

// region: investigate
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50)
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorStop()
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: bug
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50)
if (robot.obstacleDistance() < 15) {
    robot.motorStop()
}
// endregion

// region: modify
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50)
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorStop()
    }
})
// endregion

// region: sol-distance
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50)
basic.forever(function () {
    if (robot.obstacleDistance() < 25) {
        robot.motorStop()
    }
})
// endregion

// region: sol-sign
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50)
basic.forever(function () {
    if (robot.obstacleDistance() < 15) {
        robot.motorStop()
        basic.showIcon(IconNames.No)
    }
})
// endregion

// region: make
robot.elecfreaksCuteBot.start()
basic.forever(function () {

})
// endregion

// region: sol-make
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() < 10) {
        robot.motorStop()
    } else if (robot.obstacleDistance() < 30) {
        robot.motorTank(20, 20)
    } else {
        robot.motorTank(50, 50)
    }
})
// endregion
