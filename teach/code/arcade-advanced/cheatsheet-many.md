---
title: "Many sprites: cheat sheet"
subtitle: "Arcade advanced skills"
---

# Many sprites

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**create sprite**: Makes a sprite: a picture the game can move and test. Sprites; click the picture to draw your own. The kind says what it is.

![create sprite](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/create-sprite.png?v=683f2aa72c2348d8)

```makecode
let mySprite = sprites.create(img`
    . . . . . . . .
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    . 5 f 5 5 f 5 .
    . 5 5 5 5 5 5 .
    . 5 f f f f 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
```

:::

:::keep-together

**set background color**: Fills the screen with one colour. Scene.

![set background color](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/set-background-color.png?v=b25c0a05363959b2)

```makecode
scene.setBackgroundColor(9)
```

:::

:::keep-together

**set position**: Puts a sprite at x (across, 0 to 160) and y (down, 0 to 120). The middle is 80, 60. Sprites.

![set position](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/set-position.png?v=ab2e7c93dc766e4a)

```makecode
mySprite.setPosition(80, 60)
```

:::

:::keep-together

**set x**: Sets one part of the position. y counts down from the top. Sprites; choose x or y in the dropdown.

![set x](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/set-x.png?v=105d5b5490848528)

```makecode
mySprite.x = 80
```

:::

:::keep-together

**move with buttons**: The arrow keys (or WASD) move the sprite. Add two numbers for the speed across and down. Controller.

![move with buttons](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/move-with-buttons.png?v=2869c3b9b300038b)

```makecode
controller.moveSprite(mySprite)
```

:::

:::keep-together

**stay in screen**: Stops a sprite going off the edge. Sprites › set stay in screen.

![stay in screen](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/stay-in-screen.png?v=01dcea22a4b9dfa7)

```makecode
mySprite.setStayInScreen(true)
```

:::

:::keep-together

**set vx**: Speed across: positive moves right, negative moves left. vy is speed down. Sprites; choose vx in the dropdown.

![set vx](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/set-vx.png?v=d1111bae6df8bda8)

```makecode
mySprite.vx = 50
```

:::

:::keep-together

**bounce on wall**: The sprite bounces back at the edge of the screen. Sprites › set bounce on wall.

![bounce on wall](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/bounce-on-wall.png?v=4ad9fc7238be4dc2)

```makecode
mySprite.setBounceOnWall(true)
```

:::

:::keep-together

**on A pressed**: Runs its blocks every time A is pressed (space or Z on the keyboard). Controller.

![on A pressed](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/on-a-pressed.png?v=07149ea04a274721)

```makecode
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    blocks
})
```

:::

:::keep-together

**on overlap**: Runs when a sprite of the first kind touches a sprite of the second kind. sprite is the first, otherSprite the second. Sprites › Overlaps.

![on overlap](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/on-overlap.png?v=e2535ec5bee1575a)

```makecode
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    blocks
})
```

:::

:::keep-together

**destroy**: Removes a sprite from the game. Sprites.

![destroy](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/destroy.png?v=92a6a2ed4067f43b)

```makecode
otherSprite.destroy()
```

:::

:::keep-together

**pick random**: A whole number chosen at random, from the first number to the second. Math.

![pick random](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/pick-random.png?v=253f41bbd7f75c17)

```makecode
randint(0, 160)
```

:::

:::keep-together

**change score**: Adds to the score. Use a negative number to take away. Info.

![change score](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/change-score.png?v=987fd9e18096f8ed)

```makecode
info.changeScoreBy(1)
```

:::

:::keep-together

**set life**: Shows hearts for lives. At zero lives the game ends by itself. Info.

![set life](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/set-life.png?v=3a9fe1b80eba57ac)

```makecode
info.setLife(3)
```

:::

:::keep-together

**change life**: Adds or takes away lives. Info.

![change life](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/change-life.png?v=9a71e0a972da69d2)

```makecode
info.changeLifeBy(-1)
```

:::

:::keep-together

**hit costs a life**: A hit destroys what hit you and costs a life, so one touch counts once. At 0 lives the game ends by itself.

![hit costs a life](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/hit-costs-a-life.png?v=6fc3029da5a4805e)

```makecode
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
```

:::

:::keep-together

**on game update every**: A timer: runs its blocks every so many milliseconds (1000 ms is one second). Game.

![on game update every](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/on-game-update-every.png?v=aa50b481514873e7)

```makecode
game.onUpdateInterval(1000, function () {
    blocks
})
```

:::

:::keep-together

**projectile from sprite**: Fires a sprite of kind Projectile from another sprite, with a speed across and down. It is destroyed when it leaves the screen. Sprites.

![projectile from sprite](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/projectile-from-sprite.png?v=0942772a3c8be78e)

```makecode
let projectile = sprites.createProjectileFromSprite(img`
    . 2 .
    2 4 2
    . 2 .
    `, mySprite, 0, -100)
```

:::

:::keep-together

**array of sprites of kind**: A list of every sprite of a kind in the game right now. Sprites.

![array of sprites of kind](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/array-of-sprites-of-kind.png?v=4775ccc640b3a40a)

```makecode
sprites.allOfKind(SpriteKind.Enemy)
```

:::

:::keep-together

**for element of list**: Runs its blocks once for each item in the list, with value as that item. Loops.

![for element of list](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/for-element-of-list.png?v=53af7efaa601c29c)

```makecode
for (let value of list) {
    blocks
}
```

:::

:::keep-together

**function**: Names a group of blocks. They run only when you call the function. Functions › Make a Function.

![function](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/function.png?v=af9a29a19690c69e)

```makecode
function spawnEnemy () {
    blocks
}
```

:::

:::keep-together

**function with a parameter**: A parameter is a value the caller hands in, so one function can do the job differently each time. Click + on the function block.

![function with a parameter](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/function-with-a-parameter.png?v=0cbbd63e882fd779)

```makecode
function spawnEnemy (speed: number) {
    blocks
}
```

:::

:::keep-together

**jump from ground**: The jump goes inside an if that asks whether the player is on the floor, so it only works from the ground.

![jump from ground](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/jump-from-ground.png?v=6a61c549bc95ef5e)

```makecode
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.bottom >= 100) {
        player.vy = -150
    }
})
```

:::
