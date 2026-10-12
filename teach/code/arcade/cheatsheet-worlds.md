---
title: "Gravity and levels: cheat sheet"
subtitle: "MakeCode Arcade"
---

# Gravity and levels

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**list**: Many values in order under one name. Places start at 0. Arrays.

![list](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/list.png?v=fd1e3883713ec6ad)

```makecode
let speeds = [40, 60, 90]
```

:::

:::keep-together

**get value at**: The item at a place in the list, counted from 0. Arrays.

![get value at](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/get-value-at.png?v=e706b899547d3357)

```makecode
speeds[0]
```

:::

:::keep-together

**set variable**: Puts a value in a variable, throwing the old value away. Make the variable in Variables first.

![set variable](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-variable.png?v=3890c56910a6c666)

```makecode
let level = 1
```

:::

:::keep-together

**set ay**: Acceleration down: the sprite falls faster and faster, like gravity. Sprites; choose ay in the dropdown.

![set ay](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/set-ay.png?v=eaf94828babbb71f)

```makecode
mySprite.ay = 300
```

:::

:::keep-together

**sprite bottom**: The y of the bottom edge of a sprite. Sprites; choose bottom in the x dropdown.

![sprite bottom](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/sprite-bottom.png?v=d58f0849c2d2d21c)

```makecode
mySprite.bottom
```

:::

:::keep-together

**splash**: Shows a message and waits for A. Game.

![splash](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/splash.png?v=a4c2099b301ce2e3)

```makecode
game.splash("Level 1")
```

:::

:::keep-together

**destroy all of kind**: Removes every sprite of a kind at once. Sprites.

![destroy all of kind](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/destroy-all-of-kind.png?v=fe17024d78191b25)

```makecode
sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
```

:::
