// Code with ML blocks: starters and solutions (MakeCode JavaScript with the Machine Learning blocks; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.
// The lesson's extension (ml) gives practice actions (still, walking, running, jumping, waving, clapping); in the
// simulator, the ML panel beside the micro:bit picks the action. With a real model, use the project CreateAI opens:
// its actions are the ones you trained.

// region: predict
ml.onStart(ml.event.Jumping, function () {
    jumps += 1
    basic.showNumber(jumps)
})
ml.onStart(ml.event.Still, function () {
    basic.showIcon(IconNames.Asleep)
})
let jumps = 0
// endregion

// region: sol-running
ml.onStart(ml.event.Jumping, function () {
    jumps += 1
    basic.showNumber(jumps)
})
ml.onStart(ml.event.Still, function () {
    basic.showIcon(IconNames.Asleep)
})
ml.onStopDetailed(ml.event.Running, function (duration) {
    running += duration
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(Math.round(running / 1000))
})
let running = 0
let jumps = 0
// endregion

// region: sol-unknown
ml.onStart(ml.event.Jumping, function () {
    jumps += 1
    basic.showNumber(jumps)
})
ml.onStart(ml.event.Still, function () {
    basic.showIcon(IconNames.Asleep)
})
ml.onStart(ml.event.Unknown, function () {
    basic.showString("?")
})
let jumps = 0
// endregion

// region: make
ml.onStart(ml.event.Still, function () {
    basic.showIcon(IconNames.Asleep)
})
// endregion

// region: sol-make
ml.onStart(ml.event.Still, function () {
    basic.showIcon(IconNames.Asleep)
})
ml.onStart(ml.event.Walking, function () {
    basic.showArrow(ArrowNames.East)
})
ml.onStart(ml.event.Running, function () {
    basic.showIcon(IconNames.Rabbit)
})
ml.onStart(ml.event.Jumping, function () {
    jumps += 1
    basic.showNumber(jumps)
})
ml.onStart(ml.event.Unknown, function () {
    basic.clearScreen()
})
ml.onStopDetailed(ml.event.Running, function (duration) {
    running += duration
})
input.onButtonPressed(Button.A, function () {
    serial.writeValue("jumps", jumps)
    serial.writeValue("running", Math.round(running / 1000))
})
let running = 0
let jumps = 0
// endregion
