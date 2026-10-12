# region: spiral
from turtle import *

for i in range(30):
    forward(i * 5)
    right(90)
# endregion

# region: modify
from turtle import *

for i in range(30):
    forward(i * 5)
    right(90)

# Change one number so the spiral grows faster.
# Then make the line thicker on every pass.
# endregion

# region: sol-faster
from turtle import *

for i in range(30):
    forward(i * 10)
    right(90)
# endregion

# region: sol-thick
from turtle import *

for i in range(30):
    pensize(i + 1)
    forward(i * 5)
    right(90)
# endregion
