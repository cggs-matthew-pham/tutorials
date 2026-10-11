# region: predict
def init():
    global x
    x = 0

def update():
    global x
    x += 1

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
# endregion
# region: run
def init():
    global x
    x = -100

def update():
    global x
    x += 1
    if x > 100:
        x = -100

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
    screen.drawText("x = " + str(x), 0, 80, 10, "#FFF")
# endregion
# region: bug
def init():
    global x
    x = 0

def update():
    x += 1

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
# endregion
# region: sol-up
def init():
    global y
    y = -100

def update():
    global y
    y += 1
    if y > 100:
        y = -100

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(0, y, 10, 10, "rgb(255,210,0)")
    screen.drawText("y = " + str(y), 0, 80, 10, "#FFF")
# endregion
# region: sol-bounce
def init():
    global x, dx
    x = 0
    dx = 1

def update():
    global x, dx
    x += dx
    if x > 100 or x < -100:
        dx = -dx

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
# endregion
# region: make
def init():
    pass

def update():
    pass

def draw():
    screen.clear("rgb(10,10,40)")
# endregion
# region: sol-make
def init():
    global t
    t = 0

def update():
    global t
    t += 1

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(t % 200 - 100, 40, 12, 12, "rgb(255,210,0)")
    screen.fillRound(100 - t % 200, -40, 12, 12, "rgb(255,100,120)")
    screen.drawText("Frames: " + str(t), 0, 80, 10, "#FFF")
# endregion
