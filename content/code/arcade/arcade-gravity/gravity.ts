// Gravity and jumping: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: fall
scene.setBackgroundColor(9)
let ball = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
ball.setPosition(80, 10)
ball.ay = 300
// endregion

// region: jumper
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(80, 20)
player.ay = 300
controller.moveSprite(player, 80, 0)
game.onUpdate(function () {
    if (player.bottom > 100) {
        player.bottom = 100
        player.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    player.vy = -150
})
// endregion

// region: sol-ground
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(80, 20)
player.ay = 300
controller.moveSprite(player, 80, 0)
game.onUpdate(function () {
    if (player.bottom > 100) {
        player.bottom = 100
        player.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.bottom >= 100) {
        player.vy = -150
    }
})
// endregion

// region: make
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(30, 90)
info.setLife(3)
// endregion

// region: sol-make
let rock: Sprite = null
scene.setBackgroundColor(9)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(30, 90)
info.setLife(3)
player.ay = 300
game.onUpdate(function () {
    if (player.bottom > 100) {
        player.bottom = 100
        player.vy = 0
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.bottom >= 100) {
        player.vy = -150
    }
})
game.onUpdateInterval(1500, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        `, SpriteKind.Enemy)
    rock.setPosition(160, 98)
    rock.vx = -60
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// endregion

// region: trampoline
scene.setBackgroundColor(1)
let acrobat = sprites.create(img`
    . a a .
    a a a a
    . 2 2 .
    . 2 2 .
    `, SpriteKind.Player)
acrobat.setPosition(80, 20)
acrobat.ay = 300
controller.moveSprite(acrobat, 60, 0)
game.onUpdate(function () {
    if (acrobat.bottom > 100) {
        acrobat.bottom = 100
        acrobat.vy = -180
    }
})
// endregion
