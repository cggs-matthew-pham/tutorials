// Drive and stop: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50, 1000)
robot.motorTank(50, -50, 500)
// endregion

// region: investigate
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50, 1000)
robot.motorTank(50, -50, 500)
robot.motorStop()
// endregion

// region: bug
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50, 1000)
robot.motorTank(-50, 50, 500)
robot.motorTank(50, 50, 1000)
// endregion

// region: modify
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50, 1000)
robot.motorTank(50, -50, 500)
robot.motorStop()
// endregion

// region: sol-back
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50, 1000)
robot.motorTank(50, -50, 500)
robot.motorTank(-50, -50, 1000)
robot.motorStop()
// endregion

// region: sol-curve
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50, 1000)
robot.motorTank(50, -50, 500)
robot.motorTank(50, 20, 2000)
robot.motorStop()
// endregion

// region: make
robot.elecfreaksCuteBot.start()
// endregion

// region: sol-make
robot.elecfreaksCuteBot.start()
for (let index = 0; index < 4; index++) {
    robot.motorTank(50, 50, 1000)
    robot.motorTank(50, -50, 400)
}
robot.motorStop()
// endregion
