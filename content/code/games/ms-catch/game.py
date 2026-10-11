# region: predict
def touches(sx, sy, x, y):
    return abs(sx - x) < 12 and abs(sy - y) < 8

print(touches(10, -76, 0, -80))
print(touches(30, -80, 0, -80))
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
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score), 0, 88, 10, "#FFF")
# endregion
# region: bug
def init():
    global score
    score = 0

def update():
    global score
    for star in stars:
        star.move()
        if star.touches(px, -80):
            score = 1
            star.restart()
# endregion
# region: sol-lives
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed

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
    global stars, px, score, lives
    lives = 3
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    px = 0
    score = 0

def update():
    global px, score, lives
    if lives == 0:
        return
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    for star in stars:
        star.move()
        if star.touches(px, -80):
            score += 1
            star.restart()
        elif star.y < -100:
            lives -= 1
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score) + "   Lives: " + str(lives), 0, 88, 10, "#FFF")
    if lives == 0:
        screen.drawText("GAME OVER", 0, 0, 20, "rgb(255,100,100)")
# endregion
# region: sol-restart
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed

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
    global stars, px, score, lives
    lives = 3
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    px = 0
    score = 0

def update():
    global px, score, lives
    if lives == 0:
        if pressed("SPACE"):
            init()
        return
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    for star in stars:
        star.move()
        if star.touches(px, -80):
            score += 1
            star.restart()
        elif star.y < -100:
            lives -= 1
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score) + "   Lives: " + str(lives), 0, 88, 10, "#FFF")
    if lives == 0:
        screen.drawText("GAME OVER", 0, 0, 20, "rgb(255,100,100)")
        screen.drawText("Press SPACE to play again", 0, -20, 8, "#FFF")
# endregion
# region: make
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
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score), 0, 88, 10, "#FFF")

# Your own power-up: a different kind of star (a GoldStar class?) worth more points.
# endregion
# region: sol-make
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
    gold = Star(0)
    gold.speed = 2.5
    gold.gold = True
    stars.append(gold)
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
            if hasattr(star, "gold"):
                score += 5
            else:
                score += 1
            star.restart()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score), 0, 88, 10, "#FFF")
# endregion
# region: clip
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
    px = 20
    score = 0

def update():
    global px, score
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("Score: " + str(score), 0, 88, 10, "#FFF")
# endregion
