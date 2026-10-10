// Power-ups: starters and solutions (MakeCode Arcade JavaScript; students see blocks).
// Each region is loaded into the editor on its own; the file as a whole is not one program.

// region: predict
let rock: Sprite = null
let star: Sprite = null
let shield = false
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    shield = true
    scene.setBackgroundColor(8)
})
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
    info.changeScoreBy(1)
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: m1
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    shield = true
    shieldTime = 5
    scene.setBackgroundColor(8)
})
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
    info.changeScoreBy(1)
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: sol-m1
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    shield = true
    shieldTime = 5
    scene.setBackgroundColor(8)
})
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
    info.changeScoreBy(1)
    if (shield) {
        shieldTime += -1
        if (shieldTime == 0) {
            shield = false
            scene.setBackgroundColor(15)
        }
    }
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: m2
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
let ammo = 0
let prize = 0
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    prize = randint(0, 1)
    if (prize == 0) {
        shield = true
        shieldTime = 5
        scene.setBackgroundColor(8)
    } else {

    }
})
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
    info.changeScoreBy(1)
    if (shield) {
        shieldTime += -1
        if (shieldTime == 0) {
            shield = false
            scene.setBackgroundColor(15)
        }
    }
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: sol-m2
let shot: Sprite = null
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
let ammo = 0
let prize = 0
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    prize = randint(0, 1)
    if (prize == 0) {
        shield = true
        shieldTime = 5
        scene.setBackgroundColor(8)
    } else {
        ammo = 5
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        shot = sprites.createProjectileFromSprite(img`
            4 4 4
            `, ship, 100, 0)
        ammo += -1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(2)
})
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
    info.changeScoreBy(1)
    if (shield) {
        shieldTime += -1
        if (shieldTime == 0) {
            shield = false
            scene.setBackgroundColor(15)
        }
    }
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: sol-m3
let shot: Sprite = null
let rock: Sprite = null
let star: Sprite = null
let shield = false
let shieldTime = 0
let ammo = 0
let prize = 0
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (shield) {
        info.changeScoreBy(5)
    } else {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    prize = randint(0, 2)
    if (prize == 0) {
        shield = true
        shieldTime = 5
        scene.setBackgroundColor(8)
    } else if (prize == 1) {
        ammo = 5
    } else {
        info.changeLifeBy(1)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (ammo > 0) {
        shot = sprites.createProjectileFromSprite(img`
            4 4 4
            `, ship, 100, 0)
        ammo += -1
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(2)
})
scene.setBackgroundColor(15)
let ship = sprites.create(img`
    8 8 . . . . . .
    8 9 9 9 9 . . .
    8 9 1 1 9 9 9 9
    8 9 9 9 9 . . .
    8 8 . . . . . .
    `, SpriteKind.Player)
ship.setPosition(20, 60)
controller.moveSprite(ship, 0, 100)
ship.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    rock = sprites.create(img`
        . e e e .
        e e d e e
        e d e e e
        . e e e .
        `, SpriteKind.Enemy)
    rock.setPosition(160, randint(10, 110))
    rock.vx = -50
    rock.setFlag(SpriteFlag.AutoDestroy, true)
    info.changeScoreBy(1)
    if (shield) {
        shieldTime += -1
        if (shieldTime == 0) {
            shield = false
            scene.setBackgroundColor(15)
        }
    }
})
game.onUpdateInterval(5000, function () {
    star = sprites.create(img`
        . . 5 . .
        5 5 5 5 5
        . 5 5 5 .
        . 5 . 5 .
        `, SpriteKind.Food)
    star.setPosition(160, randint(10, 110))
    star.vx = -30
    star.setFlag(SpriteFlag.AutoDestroy, true)
})
// endregion

// region: boost
let boosting = false
let boostTime = 0
scene.setBackgroundColor(7)
let runner = sprites.create(img`
    . 4 4 .
    4 f 4 4
    . 2 2 .
    . 2 2 .
    . f f .
    `, SpriteKind.Player)
controller.moveSprite(runner, 50, 50)
runner.setStayInScreen(true)
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (boosting == false) {
        boosting = true
        boostTime = 3
        controller.moveSprite(runner, 120, 120)
    }
})
game.onUpdateInterval(1000, function () {
    if (boosting) {
        boostTime += -1
        if (boostTime == 0) {
            boosting = false
            controller.moveSprite(runner, 50, 50)
        }
    }
})
// endregion
