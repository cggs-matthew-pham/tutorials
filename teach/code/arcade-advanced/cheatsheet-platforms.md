---
title: "Platforms: cheat sheet"
subtitle: "Arcade advanced skills"
---

# Platforms

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

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

**set ay**: Acceleration down: the sprite falls faster and faster, like gravity. Sprites; choose ay in the dropdown.

![set ay](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/set-ay.png?v=eaf94828babbb71f)

```makecode
mySprite.ay = 300
```

:::

:::keep-together

**jump**: A jump is a speed upwards (negative vy); gravity slows it and brings the sprite back down.

![jump](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/jump.png?v=e89050893519a5e7)

```makecode
mySprite.vy = -150
```

:::

:::keep-together

**sprite bottom**: The y of the bottom edge of a sprite. Sprites; choose bottom in the x dropdown.

![sprite bottom](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/sprite-bottom.png?v=d58f0849c2d2d21c)

```makecode
mySprite.bottom
```

:::
