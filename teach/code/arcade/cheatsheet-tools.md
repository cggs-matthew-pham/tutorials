---
title: "Collections and tools: cheat sheet"
subtitle: "MakeCode Arcade"
---

# Collections and tools

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**projectile from sprite**: Fires a sprite of kind Projectile from another sprite, with a speed across and down. It is destroyed when it leaves the screen. Sprites.

![projectile from sprite](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/projectile-from-sprite.png?v=0942772a3c8be78e)

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

![array of sprites of kind](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/array-of-sprites-of-kind.png?v=4775ccc640b3a40a)

```makecode
sprites.allOfKind(SpriteKind.Enemy)
```

:::

:::keep-together

**for element of list**: Runs its blocks once for each item in the list, with value as that item. Loops.

![for element of list](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/for-element-of-list.png?v=53af7efaa601c29c)

```makecode
for (let value of list) {
    blocks
}
```

:::

:::keep-together

**function**: Names a group of blocks. They run only when you call the function. Functions › Make a Function.

![function](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/function.png?v=af9a29a19690c69e)

```makecode
function spawnEnemy () {
    blocks
}
```

:::

:::keep-together

**function with a parameter**: A parameter is a value the caller hands in, so one function can do the job differently each time. Click + on the function block.

![function with a parameter](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/function-with-a-parameter.png?v=0cbbd63e882fd779)

```makecode
function spawnEnemy (speed: number) {
    blocks
}
```

:::
