// Showcase: starters and solutions (MakeCode JavaScript with the microbit-robot extension; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// A conductor plays a tune phrase by phrase and cues each move; the dancers' moves are functions with lights.

// region: predict
function wiggle () {
    robot.setColor(0xff00ff)
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.setColor(0x00ffff)
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
input.onButtonPressed(Button.AB, function () {
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

// region: m1
function wiggle () {
    robot.setColor(0xff00ff)
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.AB, function () {
    phraseA()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        wiggle()
        wiggle()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-m1
function wiggle () {
    robot.setColor(0xff00ff)
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.setColor(0x00ffff)
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function shuffle () {
    robot.setColor(0xffff00)
    robot.motorTank(50, 50, 300)
    robot.motorTank(-50, -50, 300)
    robot.motorStop()
}
function phraseA () {
    radio.sendNumber(1)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.AB, function () {
    phraseA()
})
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        wiggle()
        wiggle()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-m2
function wiggle () {
    robot.setColor(0xff00ff)
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.setColor(0x00ffff)
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function shuffle () {
    robot.setColor(0xffff00)
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
        spin()
    } else if (receivedNumber == 3) {
        shuffle()
        shuffle()
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion

// region: sol-m3
function wiggle () {
    robot.setColor(0xff00ff)
    robot.motorTank(50, -50, 300)
    robot.motorTank(-50, 50, 300)
    robot.motorStop()
}
function spin () {
    robot.setColor(0x00ffff)
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
function shuffle () {
    robot.setColor(0xffff00)
    robot.motorTank(50, 50, 300)
    robot.motorTank(-50, -50, 300)
    robot.motorStop()
}
function finale () {
    robot.setColor(0xff0000)
    robot.motorTank(50, -50, 600)
    robot.setColor(0x00ff00)
    robot.motorTank(-50, 50, 600)
    robot.setColor(0x0000ff)
    robot.motorTank(50, -50, 600)
    robot.motorStop()
    robot.setColor(0xffffff)
    basic.showIcon(IconNames.Heart)
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
function phraseD () {
    radio.sendNumber(4)
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
input.onButtonPressed(Button.AB, function () {
    phraseA()
    phraseB()
    phraseC()
    phraseD()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(0)
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
    } else if (receivedNumber == 4) {
        finale()
    } else {
        robot.motorStop()
        robot.setColor(0x000000)
    }
})
robot.elecfreaksCuteBot.start()
radio.setGroup(1)
// endregion
