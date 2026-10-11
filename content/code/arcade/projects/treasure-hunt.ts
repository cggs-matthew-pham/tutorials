scene.setBackgroundColor(7)
let hero = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
controller.moveSprite(hero)
hero.setStayInScreen(true)
let coin = sprites.create(img`
    . 5 5 .
    5 5 4 5
    5 4 5 5
    . 5 5 .
    `, SpriteKind.Food)
coin.setPosition(randint(10, 150), randint(10, 110))
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.setPosition(randint(10, 150), randint(10, 110))
    if (info.score() >= 10) {
        scene.setBackgroundColor(9)
    }
})
