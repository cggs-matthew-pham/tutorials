// Conductor and dancers: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The conductor sends a cue as each phrase of the tune starts; robots dance the move for that cue.
// Phrases: Twinkle Twinkle Little Star (traditional).

// region: predict
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
function phraseB () {
    radio.sendNumber(2)
    music.play(music.stringPlayable("F F E E D D C - ", 120), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.A, function () {
    phraseA()
    phraseB()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        wiggle()
        wiggle()
    } else if (receivedNumber == 2) {
        spin()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: bug
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.InBackground)
}
function phraseB () {
    radio.sendNumber(2)
    music.play(music.stringPlayable("F F E E D D C - ", 120), music.PlaybackMode.InBackground)
}
input.onButtonPressed(Button.A, function () {
    phraseA()
    phraseB()
})
// endregion

// region: modify
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
function phraseB () {
    radio.sendNumber(2)
    music.play(music.stringPlayable("F F E E D D C - ", 120), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.A, function () {
    phraseA()
    phraseB()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        wiggle()
        wiggle()
    } else if (receivedNumber == 2) {
        spin()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-phrase
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function shuffle () {
    robot.motorTank(50, 50, 300)
    robot.motorTank(-50, -50, 300)
    robot.motorStop()
}
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
function phraseB () {
    radio.sendNumber(2)
    music.play(music.stringPlayable("F F E E D D C - ", 120), music.PlaybackMode.UntilDone)
}
function phraseC () {
    radio.sendNumber(3)
    music.play(music.stringPlayable("G G F F E E D - ", 120), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.A, function () {
    phraseA()
    phraseB()
    phraseC()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        wiggle()
        wiggle()
    } else if (receivedNumber == 2) {
        spin()
    } else if (receivedNumber == 3) {
        shuffle()
        shuffle()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-lights
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function shuffle () {
    robot.motorTank(50, 50, 300)
    robot.motorTank(-50, -50, 300)
    robot.motorStop()
}
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
function phraseB () {
    radio.sendNumber(2)
    music.play(music.stringPlayable("F F E E D D C - ", 120), music.PlaybackMode.UntilDone)
}
function phraseC () {
    radio.sendNumber(3)
    music.play(music.stringPlayable("G G F F E E D - ", 120), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.A, function () {
    phraseA()
    phraseB()
    phraseC()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        robot.setColor(0xff0000)
        wiggle()
        wiggle()
    } else if (receivedNumber == 2) {
        robot.setColor(0x00ff00)
        spin()
    } else if (receivedNumber == 3) {
        robot.setColor(0x0000ff)
        shuffle()
        shuffle()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: make
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        wiggle()
        wiggle()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-make
function wiggle () {
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function zigzag () {
    robot.motorTank(50, 20, 500)
    robot.motorTank(20, 50, 500)
    robot.motorStop()
}
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("E D C D E E E - ", 120), music.PlaybackMode.UntilDone)
}
function phraseB () {
    radio.sendNumber(2)
    music.play(music.stringPlayable("D D D - E G G - ", 120), music.PlaybackMode.UntilDone)
}
function phraseC () {
    radio.sendNumber(3)
    music.play(music.stringPlayable("E D C D E E E E ", 120), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.AB, function () {
    phraseA()
    phraseB()
    phraseC()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        wiggle()
        wiggle()
    } else if (receivedNumber == 2) {
        zigzag()
    } else if (receivedNumber == 3) {
        spin()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion
