---
title: "Decide: cheat sheet"
subtitle: "micro:bit Foundations"
---

# Decide

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**acceleration**: Tilt: x is left (below 0) and right (above 0), y is forward and back. Input › more.

![acceleration](https://tutorials.learningwaypoints.com/_pictures/makecode/acceleration.png?v=70ba2835f0b413c2)

```makecode
input.acceleration(Dimension.X)
```

:::

:::keep-together

**if**: Runs the blocks inside only when the condition is true; does nothing when it is false. Logic.

![if](https://tutorials.learningwaypoints.com/_pictures/makecode/if.png?v=72087ebc2d4bdc6c)

```makecode
if (condition) {
    blocks
}
```

:::

:::keep-together

**if else**: Exactly one part runs: the first when the condition is true, else the second. Click + on an if block.

![if else](https://tutorials.learningwaypoints.com/_pictures/makecode/if-else.png?v=3ce26c09e1d69482)

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

![else if](https://tutorials.learningwaypoints.com/_pictures/makecode/else-if.png?v=363b938687118320)

```makecode
} else if (condition) {
```

:::
