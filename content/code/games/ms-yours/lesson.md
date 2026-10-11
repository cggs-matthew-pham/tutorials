---
order: 5
unit: game
title: Make it yours
summary: "Add sound with audio.beep, draw your own sprites in microStudio's sprite editor, then finish a game of your own and decide how to share it safely."
language: python
hook: "The same game feels completely different with your own pictures and sounds: that is most of what makes a game yours."
---
Your catching game works. Now make it look and sound like **your** game. microStudio has a **Sprites** tab for drawing pictures pixel by pixel, and `audio.beep()` plays notes from a short piece of text, such as `"C E G"`.

## Predict

```step
stage: predict
code: game.py#predict
check:
  type: predict
  q: "What do you hear while this game runs?"
  options: ["Three quick notes, C E G, once every second", "One long note that never stops", "C E G 60 times a second", "Nothing: beep only works in draw()"]
  actual: "Three notes once a second. t goes up 60 times a second, and t % 60 == 0 is true only when t is 60, 120, 180... : once every second."
```

`t % 60` is what is left over when `t` is divided by 60. When is it `0`?

## Run

```step
stage: run
code: game.py#run
try: { playground: microstudio, starter: "game.py#run" }
check: { type: reflect, text: "I have heard the catch sound, here and in my microStudio game." }
```

The catching game, with a sound on every catch (turn your sound on). Put it in microStudio and run it there too.

## Investigate

```step
stage: investigate
code: game.py#run
insight: "Sound and pictures are calls in the same loop: a beep where something happens in update, a sprite where a shape was drawn in draw."
tasks:
  - check:
      type: question
      q: "Where is the best place for a sound when a life is lost?"
      options: ["In update(), in the if that takes the life", "In draw(), every frame", "In init()", "In the Star class's draw()"]
      answer: 0
      explain: "A sound belongs where the thing happens, once. draw() runs 60 times a second, so a beep there would play over and over."
  - check:
      type: question
      q: "You drew a sprite called star in the Sprites tab. Which line draws it where the star is?"
      options: ["screen.drawSprite(\"star\", self.x, self.y, 12, 12)", "screen.fillRound(\"star\", self.x, self.y)", "star.draw(\"sprite\")", "sprites.star(self.x, self.y)"]
      answer: 0
      explain: "screen.drawSprite takes the sprite's name, where to draw it, and how big. It replaces the fillRound line in the star's draw()."
  - check:
      type: question
      q: "You publish your game on microStudio so anyone can play it. What should you leave out?"
      options: ["Your full name, school, photo and anything else that says who or where you are", "Your nickname", "Instructions for how to play", "The sprites you drew"]
      answer: 0
      explain: "A public game can be played and copied by anyone. A nickname is fine; anything that identifies you or where you are is not."
```

### Where does the sound go?

Once, where it happens.

### Draw a sprite

From shape to picture.

### Sharing safely

What a stranger can see.

## Modify

```step
stage: modify
code: game.py#run
insight: "A sprite replaces a shape: same place, same size, a picture instead of a dot."
tasks:
  - hint:
      - "In microStudio's Sprites tab, add a sprite and name it star; draw it (16 × 16 is plenty). Make another called player."
      - "In the star's draw(), replace the fillRound line with screen.drawSprite(\"star\", self.x, self.y, 12, 12). Do the same for the paddle in draw()."
    check: { type: reflect, text: "My stars and my player are sprites I drew." }
  - hint:
      - "Play a different beep for a miss or a game over, where it happens in update()."
      - "Try \"duration 100 C E G\" for shorter notes, or \"saw C2\" for a growl."
    check: { type: reflect, text: "My game has at least two different sounds." }
```

### Your own sprites

Draw a **star** and a **player** in microStudio's Sprites tab, and draw them in the game instead of the dot and the box:

```python
def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        screen.drawSprite("star", star.x, star.y, 12, 12)
    screen.drawSprite("player", px, -80, 24, 12)
```

### Your own sounds

Give the game **two different sounds**: one for a catch and another for something else.

## Make: your game

```step
stage: make
insight: "Goals only: a game of your own with a goal, a way to win or lose, your own sprites and sounds, and a friend's playtest."
check: { type: reflect, text: "I made my own game, a friend played it, and I changed something because of what they said." }
```

Make a game of your own, starting from your catching game or from an empty project: dodge instead of catch, a maze, a racing game, a clicker. It needs a **goal**, a way to **win or lose**, and your own **sprites and sounds**. Then ask a friend to play it **without telling them how**, watch what they do, and change one thing.

**Sharing.** A microStudio project is private until you make it **public**: then anyone can play it, and copy its code, from microStudio's **Explore** page. Ask your teacher before you publish, use a nickname, and leave out your name, school and photos. A guest's projects are deleted after about 15 days, so if you are a guest, make an account or copy your code somewhere safe.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your game needs a level 2 where the stars fall faster. What is the smallest change?"
  options: ["A level variable, and a speed in each star that is multiplied by it", "A second copy of the whole game", "A new class for every star", "Changing every number in the code by hand"]
  answer: 0
  explain: "One variable for the level, used where the speed is set, gives level 2, 3 and 10 for free. Copying the game would double every later fix."
```

From here: microStudio's documentation (the **Help** tab) has maps, music, gamepads and multiplayer. The same ideas carry into bigger engines such as Godot, whose GDScript looks a lot like Python.
