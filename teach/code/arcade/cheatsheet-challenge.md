---
title: "Final challenge: Space dodger: cheat sheet"
subtitle: "MakeCode Arcade"
---

# Final challenge: Space dodger

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**auto destroy**: The sprite is removed once it leaves the screen, so old ones do not pile up. Sprites › set flag.

![auto destroy](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/auto-destroy.png?v=a57e2b00800ba1c6)

```makecode
rock.setFlag(SpriteFlag.AutoDestroy, true)
```

:::

:::keep-together

**true or false**: A variable can hold true or false, to remember what is happening now. Logic.

![true or false](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/true-or-false.png?v=63c36d001cc78ced)

```makecode
let shield = false
```

:::

:::keep-together

**high score**: The best score so far in this browser. The game over screen shows it by itself. Info.

![high score](https://tutorials.learningwaypoints.com/_pictures/makecode/arcade/high-score.png?v=313873fc23d71e0c)

```makecode
info.highScore()
```

:::
