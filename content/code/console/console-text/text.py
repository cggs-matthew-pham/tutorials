# region: hello
name = input("What is your name? ")
print("Hello, " + name + "!")
# endregion

# region: parts
name = input("What is your name? ")
food = input("What is your favourite food? ")
print("Hello, " + name + "!")
print(name + " likes " + food + ".")
print("Your name has " + str(len(name)) + " letters.")
# endregion

# region: bug
score = 5
print("Your score is " + score)
# endregion

# region: modify
name = input("What is your name? ")
print("Hello, " + name + "!")
# endregion

# region: make
# A story machine: ask for three words, then print a story that uses them.

# endregion

# region: sol-animal
name = input("What is your name? ")
animal = input("What is your favourite animal? ")
print("Hello, " + name + "!")
print(name + " would like a pet " + animal + ".")
# endregion

# region: sol-letters
name = input("What is your name? ")
print("Hello, " + name + "!")
print(name + " has " + str(len(name)) + " letters.")
# endregion

# region: sol-story
hero = input("Give me a name: ")
place = input("Give me a place: ")
animal = input("Give me an animal: ")
print("One morning, " + hero + " went to " + place + ".")
print("There, a talking " + animal + " was waiting for " + hero + ".")
# endregion
