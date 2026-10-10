// Score, lives and timers: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let rock: Sprite = null
info.setLife(3)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, 60)
    rock.vx = -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
// endregion

// region: dodge
let rock: Sprite = null
info.setLife(3)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
// endregion

// region: sol-faster
let rock: Sprite = null
info.setLife(3)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
game.onUpdateInterval(500, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
// endregion

// region: sol-heart
let rock: Sprite = null
info.setLife(3)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let heart = sprites.create(img`
    2 2 . 2 2
    2 2 2 2 2
    . 2 2 2 .
    . . 2 . .
    `, SpriteKind.Food)
heart.setPosition(80, 60)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
})
// endregion

// region: make
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
// endregion

// region: sol-make
let bat: Sprite = null
info.setLife(3)
info.startCountdown(30)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
mySprite.setPosition(20, 60)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    bat = sprites.create(img`
        f . . . f
        f f a f f
        . f f f .
        `, SpriteKind.Enemy)
    bat.setPosition(160, randint(10, 110))
    bat.vx = -60
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
// endregion

// region: rain
let drop: Sprite = null
scene.setBackgroundColor(11)
info.setLife(3)
info.startCountdown(20)
let walker = sprites.create(img`
    . 2 2 2 .
    2 2 2 2 2
    . . e . .
    . 8 8 . .
    . 8 8 . .
    `, SpriteKind.Player)
walker.setPosition(80, 108)
controller.moveSprite(walker, 100, 0)
game.onUpdateInterval(800, function () {
    drop = sprites.create(img`
        . 9 .
        9 9 9
        . 9 .
        `, SpriteKind.Enemy)
    drop.setPosition(randint(5, 155), 0)
    drop.vy = 40
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
// endregion
