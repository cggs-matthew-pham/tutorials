// Overlaps and kinds: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 4 5 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(120, 60)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: kinds
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 4 5 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(randint(10, 150), randint(10, 110))
let spike = sprites.create(img`
    . f . f
    f 2 f .
    . f 2 f
    f . f .
    `, SpriteKind.Enemy)
spike.setPosition(40, 30)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    otherSprite.destroy()
})
// endregion

// region: modify
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 4 5 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(120, 60)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: sol-random
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 4 5 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(120, 60)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
})
// endregion

// region: sol-worth
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
let coin = sprites.create(img`
    . 5 5 .
    5 4 5 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(120, 60)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(5)
})
// endregion

// region: make
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
// endregion

// region: sol-make
info.setScore(0)
let mySprite = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
let apple = sprites.create(img`
    . . 7 .
    . 2 2 .
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Food)
apple.setPosition(randint(10, 150), randint(10, 110))
let worm = sprites.create(img`
    . a a .
    a . . a
    a . . .
    . a a a
    `, SpriteKind.Enemy)
worm.setPosition(randint(10, 150), randint(10, 110))
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    otherSprite.destroy()
})
// endregion

// region: stall
scene.setBackgroundColor(13)
info.setScore(0)
let basket = sprites.create(img`
    e . . . . e
    e e e e e e
    . e e e e .
    `, SpriteKind.Player)
basket.setPosition(80, 110)
controller.moveSprite(basket, 100, 0)
let banana = sprites.create(img`
    . . . 5
    . . 5 5
    5 5 5 .
    `, SpriteKind.Food)
banana.setPosition(40, 0)
banana.vy = 30
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.setPosition(randint(10, 150), 0)
})
// endregion
