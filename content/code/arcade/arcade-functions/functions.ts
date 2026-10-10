// Functions: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
}
scene.setBackgroundColor(9)
spawnEnemy(20)
spawnEnemy(50)
spawnEnemy(100)
// endregion

// region: game
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
}
info.setLife(3)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(140, 60)
controller.moveSprite(player)
player.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    spawnEnemy(40)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// endregion

// region: bug-never-called
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
}
game.onUpdateInterval(1000, function () {

})
// endregion

// region: sol-random
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
}
info.setLife(3)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(140, 60)
controller.moveSprite(player)
player.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    spawnEnemy(randint(20, 100))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// endregion

// region: sol-score
let bug: Sprite = null
function spawnEnemy (speed: number) {
    bug = sprites.create(img`
        . 7 7 .
        7 f f 7
        7 7 7 7
        . 7 7 .
        `, SpriteKind.Enemy)
    bug.setPosition(0, randint(10, 110))
    bug.vx = speed
    info.changeScoreBy(1)
}
info.setLife(3)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
player.setPosition(140, 60)
controller.moveSprite(player)
player.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    spawnEnemy(40)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// endregion

// region: make
scene.setBackgroundColor(7)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
// endregion

// region: sol-make
let coin: Sprite = null
function makeCoin () {
    coin = sprites.create(img`
        . 5 5 .
        5 5 4 5
        5 4 5 5
        . 5 5 .
        `, SpriteKind.Food)
    coin.setPosition(randint(10, 150), randint(10, 110))
}
scene.setBackgroundColor(7)
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
makeCoin()
makeCoin()
makeCoin()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    makeCoin()
})
// endregion

// region: aquarium
let fish: Sprite = null
function addFish (speed: number) {
    fish = sprites.create(img`
        . . 4 4 4 . 4
        . 4 4 4 4 4 4
        4 f 4 4 4 . 4
        . 4 4 4 . . .
        `, SpriteKind.Food)
    fish.setPosition(randint(10, 150), randint(10, 110))
    fish.vx = speed
    fish.setBounceOnWall(true)
}
scene.setBackgroundColor(8)
addFish(20)
addFish(40)
addFish(60)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    addFish(randint(10, 80))
})
// endregion
