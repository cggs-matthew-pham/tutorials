# region: predict
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
# endregion
# region: run
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.restart()

    def touches(self, x, y):
        return abs(self.x - x) < 12 and abs(self.y - y) < 8

    def restart(self):
        self.y = 100
        self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global stars, px, score
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    px = 0
    score = 0

def update():
    global px, score
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    for star in stars:
        star.move()
        if star.touches(px, -80):
            score += 1
            audio.beep("E G")
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score), 0, 88, 10, "#FFF")
# endregion
