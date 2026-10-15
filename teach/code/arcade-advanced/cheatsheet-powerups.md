---
title: "Power-ups: cheat sheet"
subtitle: "Arcade advanced skills"
---

# Power-ups

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**follow**: The engine steers one sprite towards another at a speed. Sprites.

![follow](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/follow.png?v=008d297808416033)

```makecode
enemy.follow(mySprite, 40)
```

:::

:::keep-together

**true or false**: A variable can hold true or false, to remember what is happening now. Logic.

![true or false](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/true-or-false.png?v=63c36d001cc78ced)

```makecode
let shield = false
```

:::

:::keep-together

**count down**: Check there is some left first, then use one up, so the count never goes below zero.

![count down](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/count-down.png?v=9e074f7ec36485da)

```makecode
if (ammo > 0) {
    blocks
    ammo += -1
}
```

:::
