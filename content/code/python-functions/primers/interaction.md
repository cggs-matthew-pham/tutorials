---
title: Events and buttons in 5 minutes
---
## The idea in plain words

Until now programs ran top to bottom and stopped. **Event-driven** programs set things up, then **wait**. When something happens (a click, a key, a timer), they run a function. `onscreenclick(stamp)` means "when the picture is clicked, run stamp". The function handed over is called a **callback**. `mainloop()` keeps the program waiting until you press Stop.

A **button** is three things: a rectangle drawn on screen, a label, and a **hit test**, the check that a click landed inside the rectangle.

## Why programmers use them

Every app works this way: it waits for you, then reacts. Building a button by hand shows what tools like Gradio and every phone app do behind the scenes. The visible button is the small part; drawing it, checking the click and updating the screen are the rest.

## An everyday picture, and where it breaks

A callback is like leaving your phone number with a shop: "call me when it arrives". You do not keep asking; they call you.

Where it breaks: you give them your number, not a phone call. `onscreenclick(stamp)` hands over the name; `onscreenclick(stamp())` with brackets calls the function immediately, once, which is the classic bug.

## Try it yourself (5 minutes)

1. Run the stamp program from the Events lesson and click around the picture. Press Stop.
2. Change `dot(30, "orange")` to a different size and colour.
3. In the Build a button lesson, click inside and outside the button and watch what is printed.

## Questions students ask

- **"Why doesn't the program end?"** `mainloop()` keeps it waiting for events. Press Stop to end it.
- **"Why don't my keys work?"** Click the picture first, so it is listening for keys.
- **"What is global for?"** A function that changes a variable made outside it, like a score, needs `global score` as its first line.

## How it connects

The final challenge is an event-driven game: a timer moves the turtle, clicks catch it, and buttons start the game and buy upgrades.
