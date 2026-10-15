---
title: "Final challenge: Catch the circle: cheat sheet"
subtitle: "Drawing and animation with p5.js"
---

# Final challenge: Catch the circle

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**frameCount**: How many frames have been drawn so far. It goes up by 1 every frame.

```javascript
frameCount
```

:::

:::keep-together

**mousePressed**: p5 runs this each time the mouse is clicked. You never call it yourself.

```javascript
function mousePressed() {
  ...
}
```

:::

:::keep-together

**dist**: The straight distance between two points. Two things touch when it is small.

```javascript
dist(mouseX, mouseY, ball.x, ball.y)
```

:::

:::keep-together

**sin and cos**: cos gives how far across and sin how far up or down for a point going round a circle (angle in radians; radians(30) converts degrees).

```javascript
150 + cos(angle) * 100
```

:::

:::keep-together

**map**: Turns a number in one range into the matching number in another.

```javascript
map(i, 0, 11, 255, 120)
```

:::
