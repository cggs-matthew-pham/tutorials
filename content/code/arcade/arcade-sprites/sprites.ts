// Sprites on the screen: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
scene.setBackgroundColor(9)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
// endregion

// region: corners
scene.setBackgroundColor(9)
let sun = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    `, SpriteKind.Player)
sun.setPosition(140, 15)
let cloud = sprites.create(img`
    . . . 1 1 . . . . .
    . 1 1 1 1 1 . . . .
    1 1 1 1 1 1 1 1 1 .
    1 1 1 1 1 1 1 1 1 1
    . 1 1 1 1 1 1 1 1 .
    `, SpriteKind.Player)
cloud.setPosition(80, 30)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
// endregion

// region: modify
scene.setBackgroundColor(9)
let sun = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    `, SpriteKind.Player)
sun.setPosition(140, 15)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
// endregion

// region: sol-restyle
scene.setBackgroundColor(8)
let sun = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    `, SpriteKind.Player)
sun.setPosition(20, 15)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
// endregion

// region: sol-third
scene.setBackgroundColor(9)
let sun = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    `, SpriteKind.Player)
sun.setPosition(140, 15)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
let flower = sprites.create(img`
    . 2 . 2 .
    2 2 5 2 2
    . 2 2 2 .
    . . 7 . .
    . . 7 . .
    `, SpriteKind.Player)
flower.setPosition(120, 110)
// endregion

// region: make
scene.setBackgroundColor(7)
// endregion

// region: sol-make
scene.setBackgroundColor(7)
let moon = sprites.create(img`
    . 1 1 1 .
    1 1 1 . .
    1 1 . . .
    1 1 1 . .
    . 1 1 1 .
    `, SpriteKind.Player)
moon.setPosition(10, 10)
let bird = sprites.create(img`
    f . . . f
    . f . f .
    . . f . .
    `, SpriteKind.Player)
bird.setPosition(80, 20)
let frog = sprites.create(img`
    . 7 . 7 .
    7 f 7 f 7
    7 7 7 7 7
    . 7 7 7 .
    `, SpriteKind.Player)
frog.setPosition(80, 60)
let log = sprites.create(img`
    e e e e e e e e e e
    e d d d d d d d d e
    e e e e e e e e e e
    `, SpriteKind.Player)
log.setPosition(40, 112)
// endregion

// region: title
scene.setBackgroundColor(15)
let title = sprites.create(img`
    2 2 2 . 2 2 2 . 2 . 2 . 2 2 2
    2 . . . 2 . 2 . 2 2 2 . 2 . .
    2 . 2 . 2 2 2 . 2 . 2 . 2 2 .
    2 . 2 . 2 . 2 . 2 . 2 . 2 . .
    2 2 2 . 2 . 2 . 2 . 2 . 2 2 2
    `, SpriteKind.Player)
title.setPosition(80, 100)
let hero = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
hero.setPosition(30, 20)
let monster = sprites.create(img`
    a . . a
    a a a a
    a 1 1 a
    a a a a
    `, SpriteKind.Player)
monster.setPosition(130, 20)
// endregion
