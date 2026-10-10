// Projectiles and lists: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
let alien = sprites.create(img`
    . 7 . 7 .
    7 7 7 7 7
    7 f 7 f 7
    . 7 . 7 .
    `, SpriteKind.Enemy)
alien.setPosition(80, 20)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: invaders
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: kind
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: freeze
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.vy = 0
    }
})
// endregion

// region: modify
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
info.setLife(3)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
// endregion

// region: sol-hit
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
info.setLife(3)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: sol-crash
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
info.setLife(3)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// endregion

// region: make
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
game.onUpdateInterval(500, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
// endregion

// region: sol-make
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    9 . . . 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
game.onUpdateInterval(500, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        . 7 . 7 .
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
        info.changeScoreBy(1)
    }
})
// endregion

// region: fireworks
scene.setBackgroundColor(8)
let launcher = sprites.create(img`
    . e e .
    e e e e
    e e e e
    `, SpriteKind.Player)
launcher.setPosition(80, 115)
controller.moveSprite(launcher, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let rocket = sprites.createProjectileFromSprite(img`
        2
        2
        4
        `, launcher, 0, -60)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        value.vx = randint(-50, 50)
        value.vy = randint(-50, 50)
    }
})
// endregion
