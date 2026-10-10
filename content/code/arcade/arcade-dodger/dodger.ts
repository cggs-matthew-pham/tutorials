// Space dodger: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let rock: Sprite = null
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, 60)
    rock.vx = -50
})
// endregion

// region: sol-m1
let rock: Sprite = null
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: m2
let rock: Sprite = null
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: sol-m2
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let rock: Sprite = null
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: m3
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let rock: Sprite = null
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: sol-m3
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let rock: Sprite = null
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(1000, function () {
    info.changeScoreBy(1)
    if (info.score() > info.highScore()) {
        scene.setBackgroundColor(8)
    }
})
// endregion

// region: crossing
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let car: Sprite = null
scene.setBackgroundColor(7)
let chick = sprites.create(img`
    . 5 5 .
    5 f 5 4
    5 5 5 .
    . 4 4 .
    `, SpriteKind.Player)
chick.setPosition(80, 112)
controller.moveSprite(chick, 60, 60)
chick.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(800, function () {
    car = sprites.create(img`
        2 2 2 2 2 .
        2 9 2 2 9 2
        2 2 2 2 2 2
        . f . . f .
        `, SpriteKind.Enemy)
    car.setPosition(0, randint(25, 95))
    car.vx = 60
    car.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdate(function () {
    if (chick.y < 10) {
        info.changeScoreBy(1)
        chick.setPosition(80, 112)
    }
})
// endregion
