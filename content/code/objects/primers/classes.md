---
title: Classes in 5 minutes
---
## The idea in plain words

A **class** describes a new kind of object. `class Star:` says what every star stores and what every star can do. `Star(100)` makes one star; make four and you have four separate stars from one pattern.

- `__init__` (say "init") runs each time a star is made. Inside it, `self` is the star being made, and `self.speed = 5` stores a speed **in that star**.
- Read an object's values with its name and a dot: `star.speed`, like a turtle's own commands.
- A **method** is a function inside the class, with `self` as its first parameter: `def move(self):`. `star.move()` runs it for that star. Methods put each kind of object's behaviour in one place.

This course stops there: no inheritance, getters and setters, or class diagrams.

## Why programmers use them

- **Many things of the same kind**: one class, any number of objects.
- **Behaviour lives with the data**: change how a star moves in one place and every star follows.
- **Programs read like the problem**: `star.move()` and `rock.touches(player)` say what they mean.

## An everyday picture, and where it breaks

A class is a cookie cutter and each object is a cookie: same shape, but each one can have its own icing (its own values). Methods are like a vending machine's buttons: you press "give drink" and the machine knows how.

Where it breaks: the cookie cutter does not make cookies by itself. A class does nothing until `Star(...)` makes an object, and its methods do nothing until they are called.

## Try it yourself (5 minutes)

1. In Lesson 4's Predict, change `Pet("Rex", 4)` to another pet and print its name.
2. Remove `self.` from `self.speed = ...` in Lesson 4's game and run it: read the AttributeError.
3. In Lesson 5, add `print("caught")` inside a new method `catch(self)` and call it when a star is caught.

## Questions students ask

- **Why self?** Python passes the object to every method. `self` is the name for "the star this method was called on".
- **Why two underscores in `__init__`?** Python's names for special methods have them. `__init__` is the one Python runs when an object is made.
