// Move with the controller: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
scene.setBackgroundColor(9)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
ball.setPosition(20, 60)
ball.setVelocity(50, 0)
// endregion

// region: drift
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
controller.moveSprite(plane)
plane.setStayInScreen(true)
let cloud = sprites.create(img`
    . . . 1 1 . . . . .
    . 1 1 1 1 1 . . . .
    1 1 1 1 1 1 1 1 1 .
    1 1 1 1 1 1 1 1 1 1
    `, SpriteKind.Player)
cloud.setPosition(80, 20)
cloud.setVelocity(30, 0)
cloud.setBounceOnWall(true)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    plane.setPosition(20, 60)
})
// endregion

// region: modify
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
controller.moveSprite(plane)
// endregion

// region: sol-across
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
controller.moveSprite(plane, 100, 0)
// endregion

// region: sol-dash
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
controller.moveSprite(plane)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    plane.x += 30
})
// endregion

// region: make
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
// endregion

// region: sol-make
scene.setBackgroundColor(9)
let plane = sprites.create(img`
    . . . . 2 . . .
    2 . . . 2 2 . .
    2 2 1 1 1 1 1 2
    2 . . . 2 2 . .
    . . . . 2 . . .
    `, SpriteKind.Player)
plane.setPosition(20, 60)
controller.moveSprite(plane)
plane.setStayInScreen(true)
let cloud = sprites.create(img`
    . . . 1 1 . . . . .
    . 1 1 1 1 1 . . . .
    1 1 1 1 1 1 1 1 1 .
    1 1 1 1 1 1 1 1 1 1
    `, SpriteKind.Player)
cloud.setPosition(80, 20)
cloud.setVelocity(-25, 10)
cloud.setBounceOnWall(true)
// endregion

// region: conveyor
scene.setBackgroundColor(11)
let worker = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
worker.setPosition(80, 100)
controller.moveSprite(worker, 100, 0)
let box1 = sprites.create(img`
    e e e e e
    e d d d e
    e e e e e
    `, SpriteKind.Player)
box1.setPosition(10, 60)
box1.vx = 20
let box2 = sprites.create(img`
    e e e e e
    e d d d e
    e e e e e
    `, SpriteKind.Player)
box2.setPosition(50, 60)
box2.vx = 20
// endregion
