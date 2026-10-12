---
title: "Shapes and movement: cheat sheet"
subtitle: "Drawing and animation with p5.js"
---

# Shapes and movement

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**createCanvas**: Makes the drawing area: width, then height, in pixels. Put it first in setup(). (0, 0) is the top left and y counts down.

```javascript
createCanvas(400, 300);
```

:::

:::keep-together

**background**: Fills the whole canvas with a colour. One number is grey (0 black, 255 white); three are red, green, blue.

```javascript
background(220);
```

:::

:::keep-together

**circle**: Draws a circle: x and y of its middle, then its width.

```javascript
circle(200, 150, 80);
```

:::

:::keep-together

**rect**: Draws a rectangle: x and y of its top-left corner, then width and height.

```javascript
rect(50, 40, 100, 60);
```

:::

:::keep-together

**line**: Draws a line from one point to another: x1, y1, x2, y2.

```javascript
line(20, 20, 180, 100);
```

:::

:::keep-together

**triangle**: Draws a triangle from its three corners: x1, y1, x2, y2, x3, y3.

```javascript
triangle(100, 20, 60, 100, 140, 100);
```

:::

:::keep-together

**text**: Writes words on the canvas at x, y. Join a number on with +: "Score: " + score.

```javascript
text("Hello", 20, 30);
```

:::

:::keep-together

**fill**: Sets the colour of shapes drawn after it (red, green, blue, each 0 to 255). It does not change shapes already drawn.

```javascript
fill(255, 120, 160);
```

:::

:::keep-together

**stroke**: Sets the colour of outlines drawn after it.

```javascript
stroke(0);
```

:::

:::keep-together

**noStroke**: Draws shapes with no outline.

```javascript
noStroke();
```

:::

:::keep-together

**setup**: Runs once, when the sketch starts. Make the canvas and set things up here.

```javascript
function setup() {
  createCanvas(400, 300);
}
```

:::

:::keep-together

**draw**: Runs again and again, about 60 times a second. Clear the canvas, then draw things where they are now.

```javascript
function draw() {
  background(220);
}
```

:::

:::keep-together

**let**: Makes a variable. Put it above setup() to keep its value between frames.

```javascript
let x = 0;
```

:::

:::keep-together

**change a variable**: Moves the value on a little: x goes up by 2 each time this runs.

```javascript
x = x + 2;
```

:::

:::keep-together

**mouseX and mouseY**: Where the mouse is on the canvas, updated every frame.

```javascript
mouseX, mouseY
```

:::

:::keep-together

**if**: Does the code in the braces only when the condition is true. Compare with &lt;, &gt;, ===.

```javascript
if (x > 300) {
  x = 0;
}
```

:::

:::keep-together

**if else**: Chooses between two things.

```javascript
if (x > 150) {
  fill(255, 0, 0);
} else {
  fill(0, 0, 255);
}
```

:::

:::keep-together

**and, or**: &amp;&amp; means both must be true; || means either one.

```javascript
if (x > 50 && x < 150) {
  ...
}
```

:::
