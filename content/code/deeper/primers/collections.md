---
title: Lists and dictionaries in 5 minutes
---
## The idea in plain words

A **list** keeps things in order and finds them by place. It can change while the program runs:

- `bag.append(x)` adds to the end; `bag.remove(x)` takes `x` out (an error if it is not there).
- `x in bag` is True or False; `len(bag)` is how many; `bag.sort()` puts it in order.
- `", ".join(bag)` shows a list of words neatly.

A **dictionary** finds things by **name** (its key) instead of by place: `{"north": "kitchen", "east": "garden"}`.

- `exits["north"]` looks up the value; `exits["west"] = "shed"` adds or changes one.
- `"west" in exits` checks for a key. Keys must match exactly.
- A value can be a list or another dictionary: `exits["hall"]["north"]`.

## Why programmers use them

- **Lists** for many things of the same kind in order: a bag, a queue, a playlist.
- **Dictionaries** for looking things up: contacts, scores by name, a map from rooms to exits, counting words.

## An everyday picture, and where it breaks

A list is a numbered queue; a dictionary is a phone's contacts, found by name. Where it breaks: contacts forgive small differences ("ada" finds "Ada"); a dictionary does not. "Hall" and "hall" are different keys.

## Try it yourself (5 minutes)

1. In Lesson 2, take three things, then type `bag`.
2. In Lesson 3, walk the map, then add a shed to the east of the garden.
3. Count the words in "the cat and the hat" by hand, then run the word counter.

## Questions students ask

- **List or dictionary?** By place and in order: a list. By name: a dictionary.
- **Why does my dictionary crash on a new word?** `counts["cat"]` does not exist until you set it. Check with `in` first.
