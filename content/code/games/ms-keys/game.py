# region: predict
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px
    px = 0

def update():
    global px
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
# endregion
# region: run
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px
    px = 0

def update():
    global px
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("px = " + str(px), 0, 80, 10, "#FFF")
# endregion
# region: bug
def init():
    global px
    px = 0

def update():
    global px
    if keyboard.LEFT:
        px -= 2
    if keyboard.RIGHT:
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
# endregion
# region: sol-edges
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px
    px = 0

def update():
    global px
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2
    if px > 90:
        px = 90
    if px < -90:
        px = -90

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("px = " + str(px), 0, 80, 10, "#FFF")
# endregion
# region: sol-updown
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px, py
    px = 0
    py = -80

def update():
    global px, py
    if pressed("UP"):
        py += 2
    if pressed("DOWN"):
        py -= 2
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, py, 24, 6, "rgb(100,200,255)")
    screen.drawText("px = " + str(px), 0, 80, 10, "#FFF")
# endregion
# region: make
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    pass

def update():
    pass

def draw():
    screen.clear("rgb(10,10,40)")
# endregion
# region: sol-make
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global x, y
    x = 0
    y = 0

def update():
    global x, y
    step = 1
    if pressed("SPACE"):
        step = 3
    if pressed("LEFT"):
        x -= step
    if pressed("RIGHT"):
        x += step
    if pressed("UP"):
        y += step
    if pressed("DOWN"):
        y -= step

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, y, 14, 14, "rgb(120,255,160)")
    screen.drawText("Hold SPACE to go fast", 0, 85, 8, "#FFF")
# endregion
