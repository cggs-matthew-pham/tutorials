---
title: "Defend the system: cheat sheet"
subtitle: "Secret messages"
---

# Defend the system

> The blocks from this unit. Find each one in the MakeCode toolbox (the category is at the end of each line).

:::keep-together

**list**: Many values in order under one name. Places start at 0. Advanced › Arrays.

![list](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/list.png?v=ee34909f625f5a53)

```makecode
let answers = ["Yes", "No"]
```

:::

:::keep-together

**get value at**: The item at a place in the list, counted from 0. Arrays.

![get value at](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/get-value-at.png?v=a1cc5a095ef3b5eb)

```makecode
answers[0]
```

:::

:::keep-together

**length of list**: How many items are in the list. The last place is the length − 1. Arrays.

![length of list](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/length-of-list.png?v=cacaaf90f3d9f82b)

```makecode
answers.length
```

:::

:::keep-together

**shared code**: Send a place number; both micro:bits must hold the same list in the same order.

![shared code](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/shared-code.png?v=c62759be1085673d)

```makecode
let words = ["Hi", "Yes", "No"]
radio.onReceivedNumber(function (receivedNumber) {
    basic.showString(words[receivedNumber])
})
```

:::
