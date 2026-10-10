from turtle import *


def square(size=100):
    """Draw a square."""
    for i in range(4):
        forward(size)
        right(90)


def triangle(size=100):
    """Draw an equilateral triangle."""
    for i in range(3):
        forward(size)
        left(120)


def polygon(sides=5, size=80):
    """Draw a shape with any number of equal sides."""
    for i in range(sides):
        forward(size)
        right(360 / sides)
