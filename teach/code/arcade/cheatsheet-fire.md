---
title: "Fire: cheat sheet"
subtitle: "Arcade Foundations"
---

# Fire

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

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
