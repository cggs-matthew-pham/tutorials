// Levels: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let enemy: Sprite = null
let speeds = [40, 70, 100]
let level = 0
let goal = 5
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    game.splash("Level " + (level + 1))
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(speeds[level], speeds[level])
    enemy.setBounceOnWall(true)
}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(randint(10, 150), randint(10, 110))
info.setLife(3)
startLevel()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
// endregion

// region: sol-colours
let enemy: Sprite = null
let speeds = [40, 70, 100]
let colours = [9, 7, 2]
let level = 0
let goal = 5
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    scene.setBackgroundColor(colours[level])
    game.splash("Level " + (level + 1))
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(speeds[level], speeds[level])
    enemy.setBounceOnWall(true)
}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(randint(10, 150), randint(10, 110))
info.setLife(3)
startLevel()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
// endregion

// region: sol-bonus
let enemy: Sprite = null
let speeds = [40, 70, 100]
let level = 0
let goal = 5
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    game.splash("Level " + (level + 1))
    info.changeLifeBy(1)
    enemy = sprites.create(img`
        a . . a
        a a a a
        a 1 1 a
        a a a a
        `, SpriteKind.Enemy)
    enemy.setPosition(80, 10)
    enemy.setVelocity(speeds[level], speeds[level])
    enemy.setBounceOnWall(true)
}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(randint(10, 150), randint(10, 110))
info.setLife(3)
startLevel()
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(80, 10)
})
// endregion

// region: make
let rock: Sprite = null
let level = 0
function startLevel () {

}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// endregion

// region: sol-make
let rock: Sprite = null
let speeds = [-40, -70, -100]
let colours = [9, 4, 2]
let level = 0
let goal = 10
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    scene.setBackgroundColor(colours[level])
    game.splash("Level " + (level + 1))
}
let player = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(player)
player.setStayInScreen(true)
info.setLife(3)
startLevel()
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e .
        e e e e
        e e e e
        . e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = speeds[level]
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 10
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
// endregion

// region: fishing
let fish: Sprite = null
let waters = [9, 8, 15]
let fishSpeeds = [30, 60, 90]
let level = 0
let goal = 5
function startLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    scene.setBackgroundColor(waters[level])
    game.splash("Level " + (level + 1))
}
let net = sprites.create(img`
    1 . 1 . 1
    . 1 . 1 .
    1 . 1 . 1
    . 1 . 1 .
    `, SpriteKind.Player)
controller.moveSprite(net)
net.setStayInScreen(true)
startLevel()
game.onUpdateInterval(800, function () {
    fish = sprites.create(img`
        . . 4 4 4 . 4
        . 4 4 4 4 4 4
        4 f 4 4 4 . 4
        . 4 4 4 . . .
        `, SpriteKind.Food)
    fish.setPosition(0, randint(10, 110))
    fish.vx = fishSpeeds[level]
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() >= goal) {
        level += 1
        goal += 5
        if (level == 3) {
            game.gameOver(true)
        } else {
            startLevel()
        }
    }
})
// endregion
