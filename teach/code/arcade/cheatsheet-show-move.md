---
title: "Sprites and movement: cheat sheet"
subtitle: "MakeCode Arcade"
---

# Sprites and movement

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**create sprite**: Makes a sprite: a picture the game can move and test. Sprites; click the picture to draw your own. The kind says what it is.

![create sprite](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/create-sprite.png?v=683f2aa72c2348d8)

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

![set background color](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-background-color.png?v=b25c0a05363959b2)

```makecode
scene.setBackgroundColor(9)
```

:::

:::keep-together

**set position**: Puts a sprite at x (across, 0 to 160) and y (down, 0 to 120). The middle is 80, 60. Sprites.

![set position](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-position.png?v=ab2e7c93dc766e4a)

```makecode
mySprite.setPosition(80, 60)
```

:::

:::keep-together

**set x**: Sets one part of the position. y counts down from the top. Sprites; choose x or y in the dropdown.

![set x](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-x.png?v=105d5b5490848528)

```makecode
mySprite.x = 80
```

:::

:::keep-together

**move with buttons**: The arrow keys (or WASD) move the sprite. Add two numbers for the speed across and down. Controller.

![move with buttons](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/move-with-buttons.png?v=2869c3b9b300038b)

```makecode
controller.moveSprite(mySprite)
```

:::

:::keep-together

**stay in screen**: Stops a sprite going off the edge. Sprites › set stay in screen.

![stay in screen](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/stay-in-screen.png?v=01dcea22a4b9dfa7)

```makecode
mySprite.setStayInScreen(true)
```

:::

:::keep-together

**set velocity**: How far the sprite moves every frame, across and down. It keeps moving until something changes it. Sprites.

![set velocity](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-velocity.png?v=96fe6a45dc83f60a)

```makecode
mySprite.setVelocity(50, 0)
```

:::

:::keep-together

**set vx**: Speed across: positive moves right, negative moves left. vy is speed down. Sprites; choose vx in the dropdown.

![set vx](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-vx.png?v=d1111bae6df8bda8)

```makecode
mySprite.vx = 50
```

:::

:::keep-together

**bounce on wall**: The sprite bounces back at the edge of the screen. Sprites › set bounce on wall.

![bounce on wall](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/bounce-on-wall.png?v=4ad9fc7238be4dc2)

```makecode
mySprite.setBounceOnWall(true)
```

:::

:::keep-together

**on A pressed**: Runs its blocks every time A is pressed (space or Z on the keyboard). Controller.

![on A pressed](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/on-a-pressed.png?v=07149ea04a274721)

```makecode
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    blocks
})
```

:::

:::keep-together

**change variable**: Adds to a variable. Change by -1 counts down. Variables.

![change variable](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/change-variable.png?v=ab7517896d787ea8)

```makecode
level += 1
```

:::
