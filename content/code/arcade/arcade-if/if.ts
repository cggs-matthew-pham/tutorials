// If, every frame: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(10, 60)
car.vx = 50
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
    }
})
// endregion

// region: in-start
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(10, 60)
car.vx = 50
if (car.x > 160) {
    car.x = 0
}
// endregion

// region: modify
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(80, 60)
controller.moveSprite(car, 100, 0)
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
    }
})
// endregion

// region: sol-left
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(80, 60)
controller.moveSprite(car, 100, 0)
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
    }
    if (car.x < 0) {
        car.x = 160
    }
})
// endregion

// region: sol-laps
scene.setBackgroundColor(7)
let car = sprites.create(img`
    . . 2 2 2 2 . .
    . 2 9 9 2 9 2 .
    2 2 2 2 2 2 2 2
    . f . . . . f .
    `, SpriteKind.Player)
car.setPosition(80, 60)
controller.moveSprite(car, 100, 0)
info.setScore(0)
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
        info.changeScoreBy(1)
    }
})
// endregion

// region: make
scene.setBackgroundColor(7)
let hero = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
hero.setPosition(80, 100)
controller.moveSprite(hero)
hero.setStayInScreen(true)
// endregion

// region: sol-make
scene.setBackgroundColor(7)
let hero = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
hero.setPosition(80, 100)
controller.moveSprite(hero)
hero.setStayInScreen(true)
game.onUpdate(function () {
    if (hero.y < 30) {
        scene.setBackgroundColor(9)
    }
    if (hero.y >= 30) {
        scene.setBackgroundColor(7)
    }
})
// endregion

// region: lift
scene.setBackgroundColor(13)
let lift = sprites.create(img`
    e e e e e e
    e 1 1 1 1 e
    e 1 f f 1 e
    e 1 f f 1 e
    e e e e e e
    `, SpriteKind.Player)
lift.setPosition(80, 110)
lift.vy = -20
game.onUpdate(function () {
    if (lift.y < 10) {
        lift.y = 110
    }
})
// endregion
