# region: predict
secret = 7
guess = 0
while guess != secret:
    guess = int(input("Guess my number: "))
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it!")
# endregion

# region: game
import random

secret = random.randint(1, 20)
guess = 0
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 20: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it in " + str(tries) + " tries!")
# endregion

# region: bug
total = 0
while total < 100:
    points = int(input("Points scored: "))
    total + points
print("You reached " + str(total) + " points!")
# endregion

# region: modify
import random

secret = random.randint(1, 20)
guess = 0
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 20: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it in " + str(tries) + " tries!")
# endregion

# region: make
# Points counter: keep asking for points until 0 is typed.
# Then print the total and how many scores were added.

# endregion

# region: sol-hundred
import random

secret = random.randint(1, 100)
guess = 0
tries = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 100: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
print("Got it in " + str(tries) + " tries!")
# endregion

# region: sol-limit
import random

secret = random.randint(1, 20)
guess = 0
tries = 0
while guess != secret and tries < 5:
    guess = int(input("Guess a number from 1 to 20: "))
    tries += 1
    if guess < secret:
        print("Higher")
    elif guess > secret:
        print("Lower")
if guess == secret:
    print("Got it in " + str(tries) + " tries!")
else:
    print("Out of tries! It was " + str(secret) + ".")
# endregion

# region: sol-counter
total = 0
count = 0
points = -1
while points != 0:
    points = int(input("Points (0 to stop): "))
    if points != 0:
        total += points
        count += 1
print("Total: " + str(total) + " from " + str(count) + " scores.")
# endregion
