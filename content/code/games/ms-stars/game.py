# region: predict
class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100

stars = []
for i in range(4):
    stars.append(Star(-60 + i * 40))
print(stars[2].x)
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
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def init():
    global stars
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
# endregion
# region: bug
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        y -= self.speed
        if self.y < -100:
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def init():
    global stars
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
# endregion
# region: sol-colour
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10
        self.colour = random.choice(["rgb(255,210,0)", "rgb(255,120,160)", "rgb(120,220,255)"])

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, self.colour)

def init():
    global stars
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
# endregion
# region: sol-more
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10

    def move(self):
        self.y -= self.speed
        if self.y < -100:
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def init():
    global stars
    stars = []
    for i in range(8):
        stars.append(Star(-84 + i * 24))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
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
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

def init():
    global stars
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()

# Your own class: something else on the screen with its own move and draw methods.
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
            self.y = 100
            self.x = random.randint(-90, 90)

    def draw(self):
        screen.fillRound(self.x, self.y, 8, 8, "rgb(255,210,0)")

class Cloud:
    def __init__(self, y):
        self.x = -120
        self.y = y

    def move(self):
        self.x += 0.3
        if self.x > 120:
            self.x = -120

    def draw(self):
        screen.fillRound(self.x, self.y, 30, 12, "rgb(200,200,220)")

def init():
    global stars, clouds
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))
    clouds = [Cloud(60), Cloud(20)]

def update():
    for star in stars:
        star.move()
    for cloud in clouds:
        cloud.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for cloud in clouds:
        cloud.draw()
    for star in stars:
        star.draw()
# endregion
# region: clip
import random

class Star:
    def __init__(self, x):
        self.x = x
        self.y = 100
        self.speed = random.randint(5, 15) / 10


def init():
    global stars
    stars = []
    for i in range(4):
        stars.append(Star(-60 + i * 40))

def update():
    for star in stars:
        star.move()

def draw():
    screen.clear("rgb(10,10,40)")
    for star in stars:
        star.draw()
# endregion
