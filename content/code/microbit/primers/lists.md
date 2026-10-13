---
title: Lists in 5 minutes
---
## The idea in plain words

A **list** (MakeCode calls it an **array**, in **Advanced › Arrays**) holds many values in order under one name, such as `answers`. Each item has a **place** (an **index**) counted from **0**, so a list of 3 uses places 0, 1 and 2. **get value at** takes out the item at a place.

**pick random** (in **Math**) gives a whole number between two numbers, a new one each time. **length of array** counts the items. To pick an item at random: *get value at (pick random 0 to length − 1)*. Using the length means the list can grow without changing anything else.

## Why programmers use them

Lists keep many related values together (a playlist, a menu, a class roll), so one block can work with any of them: the item at a place a button chose, or the item at a random place.

## An everyday picture, and where it breaks

A list is a row of numbered lockers, starting at locker 0. Picking at random is drawing a locker number from a hat.

Where it breaks: people count from 1, so locker 3 in a row of 3 does not exist. And a hat that still holds only the numbers 0 to 2 never picks the two lockers added later: a fixed range on a list that grew.

## Try it yourself (5 minutes)

1. In the Lists lesson, press A: place 1 is the second word, No.
2. Change *get value at 1* to 3 on a three-item list: nothing shows.
3. In Pick from a list, shake the magic 8-ball a few times. Add an answer and shake again: it comes up, because the range uses the length.

## Questions students ask

- **"Why does it start at 0?"** It counts how far from the start an item is: the first is 0 steps away.
- **"Why does one item never come up?"** The random range misses its place. Pick from 0 to length − 1.
- **"Can it repeat?"** Yes. pick random has no memory of the last pick.

## How it connects

The Pocket pet picks a trick at random from a list. In the next course, a list both micro:bits share becomes a code for radio messages.
