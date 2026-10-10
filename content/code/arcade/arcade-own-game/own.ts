// Your own game: an example prototype, the starter and example solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: prototype
let flower: Sprite = null
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
scene.setBackgroundColor(7)
let bee = sprites.create(img`
    . . 1 1 . .
    . . 1 1 . .
    5 f 5 f 5 .
    5 f 5 f 5 f
    . 5 f 5 . .
    `, SpriteKind.Player)
controller.moveSprite(bee)
bee.setStayInScreen(true)
game.onUpdateInterval(1500, function () {
    flower = sprites.create(img`
        . 3 . 3 .
        3 3 5 3 3
        . 3 3 3 .
        . . 7 . .
        `, SpriteKind.Food)
    flower.setPosition(randint(10, 150), randint(10, 110))
})
// endregion

// region: start
scene.setBackgroundColor(9)
// endregion

// region: sol-m1
let fish: Sprite = null
let seal: Sprite = null
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(-3)
})
scene.setBackgroundColor(9)
let penguin = sprites.create(img`
    . f f .
    f 1 1 f
    f 1 1 f
    . 4 4 .
    `, SpriteKind.Player)
controller.moveSprite(penguin)
penguin.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fish = sprites.create(img`
        . 4 4 . 4
        4 4 4 4 .
        . 4 4 . 4
        `, SpriteKind.Food)
    fish.setPosition(randint(10, 150), randint(10, 110))
})
game.onUpdateInterval(3000, function () {
    seal = sprites.create(img`
        . c c c .
        c f c c c
        c c c c c
        `, SpriteKind.Enemy)
    seal.setPosition(160, randint(10, 110))
    seal.vx = -40
    seal.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: sol-m2
let fish: Sprite = null
let seal: Sprite = null
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() == 20) {
        game.gameOver(true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
scene.setBackgroundColor(9)
let penguin = sprites.create(img`
    . f f .
    f 1 1 f
    f 1 1 f
    . 4 4 .
    `, SpriteKind.Player)
controller.moveSprite(penguin)
penguin.setStayInScreen(true)
info.setLife(3)
info.startCountdown(60)
game.onUpdateInterval(1000, function () {
    fish = sprites.create(img`
        . 4 4 . 4
        4 4 4 4 .
        . 4 4 . 4
        `, SpriteKind.Food)
    fish.setPosition(randint(10, 150), randint(10, 110))
})
game.onUpdateInterval(3000, function () {
    seal = sprites.create(img`
        . c c c .
        c f c c c
        c c c c c
        `, SpriteKind.Enemy)
    seal.setPosition(160, randint(10, 110))
    seal.vx = -40
    seal.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: sol-m3
let fish: Sprite = null
let seal: Sprite = null
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() == 20) {
        game.gameOver(true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
scene.setBackgroundColor(9)
let penguin = sprites.create(img`
    . f f .
    f 1 1 f
    f 1 1 f
    . 4 4 .
    `, SpriteKind.Player)
controller.moveSprite(penguin)
penguin.setStayInScreen(true)
info.setLife(3)
info.startCountdown(60)
let orca = sprites.create(img`
    f f f f . f
    f 1 f f f f
    f f f f . f
    `, SpriteKind.Enemy)
orca.setPosition(150, 110)
orca.follow(penguin, 25)
game.onUpdateInterval(1000, function () {
    fish = sprites.create(img`
        . 4 4 . 4
        4 4 4 4 .
        . 4 4 . 4
        `, SpriteKind.Food)
    fish.setPosition(randint(10, 150), randint(10, 110))
})
game.onUpdateInterval(3000, function () {
    seal = sprites.create(img`
        . c c c .
        c f c c c
        c c c c c
        `, SpriteKind.Enemy)
    seal.setPosition(160, randint(10, 110))
    seal.vx = -40
    seal.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion
