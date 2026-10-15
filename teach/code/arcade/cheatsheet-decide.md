---
title: "Decide: cheat sheet"
subtitle: "Arcade Foundations"
---

# Decide

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**game over**: Ends the game: true is a win, false is a loss. Game.

![game over](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/game-over.png?v=d0c8ec5b017e8ba4)

```makecode
game.gameOver(false)
```

:::

:::keep-together

**on game update**: Runs its blocks every frame, about 30 times a second. Put an if here to keep checking something. Game.

![on game update](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/on-game-update.png?v=27a42bce11c5e88b)

```makecode
game.onUpdate(function () {
    blocks
})
```

:::

:::keep-together

**if**: Runs the blocks inside only when the condition is true. Logic.

![if](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/if.png?v=72087ebc2d4bdc6c)

```makecode
if (condition) {
    blocks
}
```

:::

:::keep-together

**check every frame**: An if inside on game update is asked every frame, so it acts the moment its question becomes true.

![check every frame](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/check-every-frame.png?v=b47aced8fa3d060f)

```makecode
game.onUpdate(function () {
    if (car.x > 160) {
        car.x = 0
    }
})
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

**else if**: Another question, asked only if the ones above were false. The first true one wins.

![else if](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/else-if.png?v=363b938687118320)

```makecode
} else if (condition) {
```

:::

:::keep-together

**compare**: Compares two numbers: true or false. Logic; drag a sprite x block into it from Sprites.

![compare](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/compare.png?v=25b42436484c3851)

```makecode
mySprite.x > 150
```

:::

:::keep-together

**follow**: The engine steers one sprite towards another at a speed. Sprites.

![follow](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/follow.png?v=008d297808416033)

```makecode
enemy.follow(mySprite, 40)
```

:::

:::keep-together

**jump**: A jump is a speed upwards (negative vy); gravity slows it and brings the sprite back down.

![jump](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/jump.png?v=e89050893519a5e7)

```makecode
mySprite.vy = -150
```

:::
