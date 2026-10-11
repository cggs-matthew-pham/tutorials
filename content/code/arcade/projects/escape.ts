scene.setBackgroundColor(1)
info.setLife(3)
let hero = sprites.create(img`
    . 8 8 .
    8 8 8 8
    8 8 8 8
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(hero)
hero.setStayInScreen(true)
let ghost = sprites.create(img`
    2 2 2 2
    2 f 2 f
    2 2 2 2
    2 . 2 .
    `, SpriteKind.Enemy)
ghost.setPosition(randint(0, 160), 0)
game.onUpdate(function () {
    if (ghost.x < hero.x) {
        ghost.vx = 30
    } else {
        ghost.vx = -30
    }
    if (ghost.y < hero.y) {
        ghost.vy = 30
    } else {
        ghost.vy = -30
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.setPosition(randint(0, 160), 0)
})
info.startCountdown(30)
info.onCountdownEnd(function () {
    game.over(true)
})
