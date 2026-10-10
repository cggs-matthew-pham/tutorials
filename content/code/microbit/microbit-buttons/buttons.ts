// Buttons and gestures: starters and solutions (MakeCode JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
})
// endregion

// region: events
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
})
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Surprised)
})
basic.forever(function () {
    basic.showIcon(IconNames.Asleep)
    basic.pause(5000)
})
// endregion

// region: bug
if (input.buttonIsPressed(Button.A)) {
    basic.showIcon(IconNames.Heart)
}
// endregion

// region: modify
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
})
// endregion

// region: sol-restyle
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.No)
})
// endregion

// region: sol-both
basic.showIcon(IconNames.Asleep)
input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Heart)
})
// endregion

// region: make
basic.showIcon(IconNames.Square)
// endregion

// region: sol-make
basic.showIcon(IconNames.Square)
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.West)
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.East)
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.No)
})
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Surprised)
})
// endregion

// region: indicator
input.onButtonPressed(Button.A, function () {
    basic.showArrow(ArrowNames.West)
    basic.clearScreen()
    basic.showArrow(ArrowNames.West)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    basic.showArrow(ArrowNames.East)
    basic.clearScreen()
    basic.showArrow(ArrowNames.East)
    basic.clearScreen()
})
// endregion
