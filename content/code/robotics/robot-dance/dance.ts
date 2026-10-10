// Moves as functions: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
input.onButtonPressed(Button.A, function () {
    wiggle()
    wiggle()
})
robot.elecfreaksCuteBot.start()
// endregion

// region: investigate
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
input.onButtonPressed(Button.A, function () {
    wiggle()
    wiggle()
})
input.onButtonPressed(Button.B, function () {
    spin()
})
robot.elecfreaksCuteBot.start()
// endregion

// region: bug
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
input.onButtonPressed(Button.A, function () {
    robot.motorTank(50, 50, 1000)
    robot.motorStop()
})
robot.elecfreaksCuteBot.start()
// endregion

// region: modify
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
input.onButtonPressed(Button.A, function () {
    wiggle()
    wiggle()
})
robot.elecfreaksCuteBot.start()
// endregion

// region: sol-spin
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
input.onButtonPressed(Button.A, function () {
    wiggle()
    wiggle()
})
input.onButtonPressed(Button.B, function () {
    spin()
})
robot.elecfreaksCuteBot.start()
// endregion

// region: sol-routine
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
input.onButtonPressed(Button.A, function () {
    wiggle()
    spin()
    wiggle()
})
input.onButtonPressed(Button.B, function () {
    spin()
})
robot.elecfreaksCuteBot.start()
// endregion

// region: make
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
robot.elecfreaksCuteBot.start()
// endregion

// region: sol-make
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function shuffle () {
    robot.motorTank(50, 50, 300)
    robot.motorTank(-50, -50, 300)
    robot.motorStop()
}
function twirl () {
    robot.motorTank(-50, 50, 1200)
    robot.motorStop()
}
input.onButtonPressed(Button.AB, function () {
    shuffle()
    wiggle()
    shuffle()
    twirl()
})
robot.elecfreaksCuteBot.start()
// endregion
