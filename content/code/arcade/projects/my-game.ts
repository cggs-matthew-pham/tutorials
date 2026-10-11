let speeds = [30, 50, 70]
let level = 0
let hero = sprites.create(img`
    . 2 2 .
    2 2 2 2
    2 2 2 2
    . 2 2 .
    `, SpriteKind.Player)
controller.moveSprite(hero)
hero.setStayInScreen(true)
function startLevel() {
    for (let old of sprites.allOfKind(SpriteKind.Enemy)) {
        old.destroy()
    }
    let rock = sprites.create(img`
        e e e
        e e e
        e e e
        `, SpriteKind.Enemy)
    rock.setPosition(randint(10, 150), 0)
    rock.vy = speeds[level]
    rock.setBounceOnWall(true)
    rock.vx = speeds[level]
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
game.onUpdateInterval(10000, function () {
    level = level + 1
    if (level < speeds.length) {
        game.splash("Level " + (level + 1))
        startLevel()
    } else {
        game.over(true)
    }
})
startLevel()
