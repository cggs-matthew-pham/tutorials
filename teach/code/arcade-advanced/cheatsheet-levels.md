---
title: "Levels: cheat sheet"
subtitle: "Arcade advanced skills"
---

# Levels

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**set velocity**: How far the sprite moves every frame, across and down. It keeps moving until something changes it. Sprites.

![set velocity](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/set-velocity.png?v=96fe6a45dc83f60a)

```makecode
mySprite.setVelocity(50, 0)
```

:::

:::keep-together

**game over**: Ends the game: true is a win, false is a loss. Game.

![game over](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/game-over.png?v=d0c8ec5b017e8ba4)

```makecode
game.gameOver(false)
```

:::

:::keep-together

**if else**: Exactly one part runs: the first when the condition is true, else the second. Click + on an if block.

![if else](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/if-else.png?v=3ce26c09e1d69482)

```makecode
if (condition) {
    blocks
} else {
    blocks
}
```

:::

:::keep-together

**list**: Many values in order under one name. Places start at 0. Arrays.

![list](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/list.png?v=fd1e3883713ec6ad)

```makecode
let speeds = [40, 60, 90]
```

:::

:::keep-together

**get value at**: The item at a place in the list, counted from 0. Arrays.

![get value at](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/get-value-at.png?v=e706b899547d3357)

```makecode
speeds[0]
```

:::

:::keep-together

**set variable**: Puts a value in a variable, throwing the old value away. Make the variable in Variables first.

![set variable](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/set-variable.png?v=3890c56910a6c666)

```makecode
let level = 1
```

:::

:::keep-together

**change variable**: Adds to a variable. Change by -1 counts down. Variables.

![change variable](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/change-variable.png?v=ab7517896d787ea8)

```makecode
level += 1
```

:::

:::keep-together

**splash**: Shows a message and waits for A. Game.

![splash](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/splash.png?v=a4c2099b301ce2e3)

```makecode
game.splash("Level 1")
```

:::

:::keep-together

**level up**: Goes in the event where the score changes, not in on game update. goal moves up, so the next level is further away.

![level up](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/level-up.png?v=86764a43f82d87c3)

```makecode
if (info.score() >= goal) {
    level += 1
    goal += 5
    game.splash("Level " + level)
}
```

:::

:::keep-together

**destroy all of kind**: Removes every sprite of a kind at once. Sprites.

![destroy all of kind](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/destroy-all-of-kind.png?v=fe17024d78191b25)

```makecode
sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
```

:::
