---
title: "Building blocks: cheat sheet"
subtitle: "Drawing and animation with p5.js"
---

# Building blocks

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**array**: Makes a list. The first item is heights[0], because counting starts at 0.

```javascript
let heights = [40, 90, 150];
```

:::

:::keep-together

**array item**: One item of a list, by its place.

```javascript
heights[0]
```

:::

:::keep-together

**length**: How many items are in a list.

```javascript
heights.length
```

:::

:::keep-together

**push**: Adds an item to the end of a list.

```javascript
heights.push(120);
```

:::

:::keep-together

**for count**: Repeats the code in the braces, with i counting 0, 1, 2, ... up to one less than 6.

```javascript
for (let i = 0; i < 6; i++) {
  ...
}
```

:::

:::keep-together

**for of**: Does the code once for each item of a list, with star as that item.

```javascript
for (let star of stars) {
  ...
}
```

:::

:::keep-together

**random**: A random number from the first number up to (not including) the second.

```javascript
random(10, 100)
```

:::

:::keep-together

**object**: Keeps the values of one thing together, each with a name.

```javascript
let star = { x: 20, y: 30, speed: 2 };
```

:::

:::keep-together

**property**: Reads one value of an object with a dot. Change it the same way: star.y = star.y + 1;

```javascript
star.y
```

:::

:::keep-together

**function**: Gives code a name. The names in the brackets are parameters. It runs only when called: drawFlower(80, 100);

```javascript
function drawFlower(x, y) {
  ...
}
```

:::
