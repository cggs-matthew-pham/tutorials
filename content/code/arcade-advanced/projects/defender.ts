scene.setBackgroundColor(15)
info.setLife(3)
let ship = sprites.create(img`
    . . 9 . .
    . 9 9 9 .
    9 9 1 9 9
    `, SpriteKind.Player)
ship.setPosition(80, 110)
controller.moveSprite(ship, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let shot = sprites.createProjectileFromSprite(img`
        5
        5
        `, ship, 0, -100)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let alien of sprites.allOfKind(SpriteKind.Enemy)) {
        alien.vy = 0
    }
})
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . 7 . 7 .
        7 7 7 7 7
        7 f 7 f 7
        `, SpriteKind.Enemy)
    alien.setPosition(randint(10, 150), 0)
    alien.vy = 20
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
game.onUpdate(function () {
    for (let alien of sprites.allOfKind(SpriteKind.Enemy)) {
        if (alien.y > 120) {
            alien.destroy()
            info.changeLifeBy(-1)
        }
    }
})
