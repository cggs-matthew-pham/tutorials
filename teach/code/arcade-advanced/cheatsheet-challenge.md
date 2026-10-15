---
title: "Final challenge: Power-ups and your own game: cheat sheet"
subtitle: "Arcade advanced skills"
---

# Final challenge: Power-ups and your own game

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**start countdown**: A timer in seconds at the top of the screen; the game ends when it reaches 0. Info.

![start countdown](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/start-countdown.png?v=d2e20d49c26b6edd)

```makecode
info.startCountdown(30)
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

**auto destroy**: The sprite is removed once it leaves the screen, so old ones do not pile up. Sprites › set flag.

![auto destroy](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/arcade/auto-destroy.png?v=a57e2b00800ba1c6)

```makecode
rock.setFlag(SpriteFlag.AutoDestroy, true)
```

:::
