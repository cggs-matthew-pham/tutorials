---
marp: true
theme: default
html: true
---

# Make it yours

Games with microStudio · A whole game

<!-- Speaker note: Students add sounds with audio.beep where things happen, draw their own sprites in microStudio and draw them with screen.drawSprite, then make and playtest a game of their own and decide how to share it safely. About 60 minutes (Predict and Run 10 min · Investigate 10 min · Modify 15 min · Make 25 min (or longer as a project)). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** add sound with audio.beep, draw your own sprites in microStudio's sprite editor, then finish a game of your own and decide how to share it safely.

- I can add sounds and my own sprites to a game.
- I can make a game with a goal and a way to win or lose.
- I can improve my game after watching someone play it.
- I can decide what is safe to share when I publish a game.

<!-- Speaker note: Before class: Read the unit primer first. Turn sound on (headphones help). `audio.beep("C E G")` plays notes from text; words such as `duration 100`, `tempo 160`, `square`, `saw` and `sine` change how. Sprites are drawn in microStudio's **Sprites** tab and named there; `screen.drawSprite("name", x, y, width, height)` draws one (our site's games cannot show students' sprites, so the Modify step has no game on the page). **Sharing:** a project is private until it is made public; a public project can be played and copied by anyone from microStudio's Explore page, under the student's nickname. Decide your rule before the lesson (for example: publish only with your OK, nicknames only). Guest projects are deleted after about 15 days, so guests should make an account or keep a copy of their code. The Make step can run as a longer project; the Python pathway's For teachers notes suit a showcase. -->

---

## Why it matters

> The same game feels completely different with your own pictures and sounds: that is most of what makes a game yours.

<!-- Speaker note: Your catching game works. Now make it look and sound like **your** game. microStudio has a **Sprites** tab for drawing pictures pixel by pixel, and `audio.beep()` plays notes from a short piece of text, such as `"C E G"`. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def init():
    global t, seconds
    t = 0
    seconds = 0

def update():
    global t, seconds
    t += 1
    if t % 60 == 0:
        seconds += 1
        audio.beep("C E G")

def draw():
    screen.clear("rgb(10,10,40)")
    screen.drawText(str(seconds) + " seconds", 0, 0, 16, "#FFF")
```

**What do you hear while this game runs?**

- One long note that never stops
- Three quick notes, C E G, once every second
- Nothing: beep only works in draw()
- C E G 60 times a second

<!-- Speaker note: What happens: Three notes once a second. t goes up 60 times a second, and t % 60 == 0 is true only when t is 60, 120, 180... : once every second. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: count t up in 60s on the board; circle the multiples of 60. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Three notes once a second. t goes up 60 times a second, and t % 60 == 0 is true only when t is 60, 120, 180... : once every second.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/games/ms-yours/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/games/ms-yours/?full=step-2#step-2)

<!-- Speaker note: The catching game, with a sound on every catch (turn your sound on). Put it in microStudio and run it there too. Students should be able to say: I have heard the catch sound, here and in my microStudio game. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 54 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/games/ms-yours/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Sound and pictures are calls in the same loop: a beep where something happens in update, a sprite where a shape was drawn in draw. -->

<!-- Speaker note: Teacher: ask why a beep in draw() would be a bad idea, then let one student try it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where does the sound go?

**Where is the best place for a sound when a life is lost?**

- In init()
- In update(), in the if that takes the life
- In draw(), every frame
- In the Star class's draw()

* Answer: In update(), in the if that takes the life

<!-- Speaker note: A sound belongs where the thing happens, once. draw() runs 60 times a second, so a beep there would play over and over. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Draw a sprite

**You drew a sprite called star in the Sprites tab. Which line draws it where the star is?**

- star.draw("sprite")
- screen.drawSprite("star", self.x, self.y, 12, 12)
- screen.fillRound("star", self.x, self.y)
- sprites.star(self.x, self.y)

* Answer: screen.drawSprite("star", self.x, self.y, 12, 12)

<!-- Speaker note: screen.drawSprite takes the sprite's name, where to draw it, and how big. It replaces the fillRound line in the star's draw(). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sharing safely

**You publish your game on microStudio so anyone can play it. What should you leave out?**

- Your nickname
- The sprites you drew
- Your full name, school, photo and anything else that says who or where you are
- Instructions for how to play

* Answer: Your full name, school, photo and anything else that says who or where you are

<!-- Speaker note: A public game can be played and copied by anyone. A nickname is fine; anything that identifies you or where you are is not. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Your own sprites:** Draw a **star** and a **player** in microStudio's Sprites tab, and draw them in the game instead of the dot and the box:
- **Your own sounds:** Give the game **two different sounds**: one for a catch and another for something else.

<!-- Speaker note: What this step is for: A sprite replaces a shape: same place, same size, a picture instead of a dot. Hints, in order: In microStudio's Sprites tab, add a sprite and name it star; draw it (16 × 16 is plenty). Make another called player. / In the star's draw(), replace the fillRound line with screen.drawSprite("star", self.x, self.y, 12, 12). Do the same for the paddle in draw(). / Play a different beep for a miss or a game over, where it happens in update(). / Try "duration 100 C E G" for shorter notes, or "saw C2" for a growl. For students who need more support: Start the Make step from the catching game and change only the sprites, the sounds and one rule. For early finishers: Add a title screen: a mode variable ("title", "play", "over") that update() and draw() check first. The hard part, on purpose: Finishing: a game of their own is open-ended. Agree a small goal first (one change to the rules, own sprites, two sounds), then add. When students get stuck: The sprite does not show. Ask: Is the name in drawSprite exactly the sprite's name in the Sprites tab? Fix: Use the same name, in lower case, in quotes. / The sound plays over and over. Ask: Is the beep in draw(), or in an if that is true for many frames? Fix: Move it into update(), in the if where the thing happens once. / No sound at all. Ask: Has the game been clicked, and is the sound on? Fix: Browsers only allow sound after a click in the page. / Their guest project has gone. Ask: Did they make an account, or keep a copy? Fix: Guest projects are deleted after about 15 days; make accounts for longer work. -->

<!-- Speaker note: Teacher: show the Sprites tab on the projector; 16 × 16 pixels is enough. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: your game

Make a game of your own, starting from your catching game or from an empty project: dodge instead of catch, a maze, a racing game, a clicker. It needs a **goal**, a way to **win or lose**, and your own **sprites and sounds**. Then ask a friend to play it **without telling them how**, watch what they do, and change one thing.

**Sharing.** A microStudio project is private until you make it **public**: then anyone can play it, and copy its code, from microStudio's **Explore** page. Ask your teacher before you publish, use a nickname, and leave out your name, school and photos. A guest's projects are deleted after about 15 days, so if you are a guest, make an account or copy your code somewhere safe.

<!-- Speaker note: What this step is for: Goals only: a game of your own with a goal, a way to win or lose, your own sprites and sounds, and a friend's playtest. -->

<!-- Speaker note: Teacher: playtest in pairs: the player plays without being told how, the maker watches and writes down one change. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

## Where this leads

From here: microStudio's documentation (the **Help** tab) has maps, music, gamepads and multiplayer. The same ideas carry into bigger engines such as Godot, whose GDScript looks a lot like Python.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a catch sound go in update() and not in draw()?**

* It should play once, when the catch happens; draw() runs every frame, so a sound there would repeat 60 times a second.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: The Python pathway's other extensions (data, web apps) use the same Python. microStudio's Help tab covers maps, music and multiplayer; Godot's GDScript is a natural next engine. -->
