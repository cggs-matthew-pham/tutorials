// Else and chasing: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 60)
controller.moveSprite(mouse)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 60)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 30
    } else {
        cat.vx = -30
    }
})
// endregion

// region: chase
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 100)
controller.moveSprite(mouse)
mouse.setStayInScreen(true)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 20)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 30
    } else {
        cat.vx = -30
    }
})
// endregion

// region: sign
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 60)
controller.moveSprite(mouse)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 60)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = -30
    } else {
        cat.vx = 30
    }
})
// endregion

// region: sol-y
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 100)
controller.moveSprite(mouse)
mouse.setStayInScreen(true)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 20)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 30
    } else {
        cat.vx = -30
    }
    if (cat.y < mouse.y) {
        cat.vy = 30
    } else {
        cat.vy = -30
    }
})
// endregion

// region: sol-caught
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 100)
controller.moveSprite(mouse)
mouse.setStayInScreen(true)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 20)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 30
    } else {
        cat.vx = -30
    }
    if (cat.y < mouse.y) {
        cat.vy = 30
    } else {
        cat.vy = -30
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
// endregion

// region: make
scene.setBackgroundColor(13)
let guard = sprites.create(img`
    . 8 8 .
    8 8 8 8
    . 1 1 .
    . 8 8 .
    `, SpriteKind.Enemy)
guard.setPosition(80, 60)
guard.vx = 40
// endregion

// region: sol-make
scene.setBackgroundColor(13)
let guard = sprites.create(img`
    . 8 8 .
    8 8 8 8
    . 1 1 .
    . 8 8 .
    `, SpriteKind.Enemy)
guard.setPosition(80, 60)
guard.vx = 40
game.onUpdate(function () {
    if (guard.x > 140) {
        guard.vx = -40
    } else if (guard.x < 20) {
        guard.vx = 40
    }
})
// endregion

// region: follow
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 100)
controller.moveSprite(mouse)
mouse.setStayInScreen(true)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 20)
cat.follow(mouse, 30)
// endregion

// region: sheepdog
scene.setBackgroundColor(7)
let dog = sprites.create(img`
    f f . . . .
    f 1 f f f f
    . f f f f .
    . f . . f .
    `, SpriteKind.Player)
dog.setPosition(80, 100)
controller.moveSprite(dog)
let sheep = sprites.create(img`
    . 1 1 1 1 .
    1 1 1 1 1 f
    1 1 1 1 1 f
    . f . . f .
    `, SpriteKind.Food)
sheep.setPosition(80, 60)
game.onUpdate(function () {
    if (sheep.x < dog.x) {
        sheep.vx = -20
    } else {
        sheep.vx = 20
    }
})
// endregion
