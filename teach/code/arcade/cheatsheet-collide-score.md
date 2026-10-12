---
title: "Collide and score: cheat sheet"
subtitle: "MakeCode Arcade"
---

# Collide and score

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**on overlap**: Runs when a sprite of the first kind touches a sprite of the second kind. sprite is the first, otherSprite the second. Sprites › Overlaps.

![on overlap](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/on-overlap.png?v=e2535ec5bee1575a)

```makecode
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    blocks
})
```

:::

:::keep-together

**destroy**: Removes a sprite from the game. Sprites.

![destroy](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/destroy.png?v=92a6a2ed4067f43b)

```makecode
otherSprite.destroy()
```

:::

:::keep-together

**pick random**: A whole number chosen at random, from the first number to the second. Math.

![pick random](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/pick-random.png?v=253f41bbd7f75c17)

```makecode
randint(0, 160)
```

:::

:::keep-together

**set score**: Shows a score at the top of the screen. Info.

![set score](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-score.png?v=498d0c3afcd7431b)

```makecode
info.setScore(0)
```

:::

:::keep-together

**change score**: Adds to the score. Use a negative number to take away. Info.

![change score](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/change-score.png?v=987fd9e18096f8ed)

```makecode
info.changeScoreBy(1)
```

:::

:::keep-together

**set life**: Shows hearts for lives. At zero lives the game ends by itself. Info.

![set life](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-life.png?v=3a9fe1b80eba57ac)

```makecode
info.setLife(3)
```

:::

:::keep-together

**change life**: Adds or takes away lives. Info.

![change life](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/change-life.png?v=9a71e0a972da69d2)

```makecode
info.changeLifeBy(-1)
```

:::

:::keep-together

**on game update every**: A timer: runs its blocks every so many milliseconds (1000 ms is one second). Game.

![on game update every](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/on-game-update-every.png?v=aa50b481514873e7)

```makecode
game.onUpdateInterval(1000, function () {
    blocks
})
```

:::

:::keep-together

**start countdown**: A timer in seconds at the top of the screen; the game ends when it reaches 0. Info.

![start countdown](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/start-countdown.png?v=d2e20d49c26b6edd)

```makecode
info.startCountdown(30)
```

:::
