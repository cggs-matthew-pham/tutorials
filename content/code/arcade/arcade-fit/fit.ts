// Will it work in Arcade?: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let fruit: Sprite = null
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fruit = sprites.create(img`
    . . 7 .
    . 2 2 .
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Food)
    fruit.setPosition(randint(10, 150), 0)
    fruit.vy = 40
    fruit.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: modify
let fruit: Sprite = null
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fruit = sprites.create(img`
    . . 7 .
    . 2 2 .
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Food)
    fruit.setPosition(randint(10, 150), 0)
    fruit.vy = 40
    fruit.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: sol-dodger
let fruit: Sprite = null
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fruit = sprites.create(img`
    . c c .
    c b c c
    c c c c
    . c c .
    `, SpriteKind.Enemy)
    fruit.setPosition(randint(10, 150), 0)
    fruit.vy = 40
    fruit.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// endregion

// region: sol-shooter
let fruit: Sprite = null
scene.setBackgroundColor(9)
let basket = sprites.create(img`
    e . . . . . . e
    e e e e e e e e
    . e e e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
basket.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fruit = sprites.create(img`
    . c c .
    c b c c
    c c c c
    . c c .
    `, SpriteKind.Enemy)
    fruit.setPosition(randint(10, 150), 0)
    fruit.vy = 40
    fruit.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.createProjectileFromSprite(img`
    5
    5
    `, basket, 0, -100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: crates
scene.setBackgroundColor(9)
let crate1 = sprites.create(img`
    e e e e e e
    e d d d d e
    e d e e d e
    e d d d d e
    e e e e e e
    `, SpriteKind.Food)
crate1.setPosition(80, 110)
let crate2 = sprites.create(img`
    e e e e e e
    e d d d d e
    e d e e d e
    e d d d d e
    e e e e e e
    `, SpriteKind.Food)
crate2.setPosition(80, 105)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
ball.setPosition(80, 10)
ball.ay = 200
// endregion

// region: make
scene.setBackgroundColor(15)
// endregion

// region: sol-make
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 1 . .
    . 1 1 1 .
    1 1 1 1 1
    `, SpriteKind.Player)
ship.setPosition(80, 100)
controller.moveSprite(ship)
let star = sprites.create(img`
    . 5 .
    5 5 5
    . 5 .
    `, SpriteKind.Food)
star.setPosition(randint(10, 150), randint(10, 60))
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 60))
    info.changeScoreBy(1)
})
// endregion

// region: car
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . 2 2 2 2 .
    2 2 2 2 9 2
    f . . . . f
    `, SpriteKind.Player)
controller.moveSprite(car)
car.setStayInScreen(true)
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    . 2 2 2 2 .
    2 9 2 2 2 2
    f . . . . f
    `)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    . 2 2 2 2 .
    2 2 2 2 9 2
    f . . . . f
    `)
})
// endregion

// region: sol-car
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . 2 2 2 2 .
    2 2 2 2 9 2
    f . . . . f
    `, SpriteKind.Player)
controller.moveSprite(car)
car.setStayInScreen(true)
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    . 2 2 2 2 .
    2 9 2 2 2 2
    f . . . . f
    `)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    . 2 2 2 2 .
    2 2 2 2 9 2
    f . . . . f
    `)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    f 9 9 f
    . 2 2 .
    . 2 2 .
    f 2 2 f
    `)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    car.setImage(img`
    f 2 2 f
    . 2 2 .
    . 2 2 .
    f 9 9 f
    `)
})
// endregion
