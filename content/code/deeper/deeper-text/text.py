# region: predict
command = "  Go NORTH "
command = command.strip().lower()
print(command)
print(len(command))
# endregion

# region: parser
command = input("What do you do? ")
command = command.strip().lower()
words = command.split()
print("You typed " + str(len(words)) + " words.")
if len(words) == 2:
    print("Verb: " + words[0])
    print("Thing: " + words[1])
else:
    print("Try two words, such as: go north")
# endregion

# region: bug
answer = input("Open the door? ")
if answer == "yes":
    print("The door opens.")
else:
    print("The door stays shut.")
# endregion

# region: make
# Ask for someone's full name, then print their initials and their name in capitals.

# endregion

# region: sol-quit
command = input("What do you do? ")
command = command.strip().lower()
words = command.split()
if command == "quit":
    print("Goodbye!")
elif len(words) == 2:
    print("Verb: " + words[0])
    print("Thing: " + words[1])
else:
    print("Try two words, such as: go north")
# endregion

# region: sol-verbs
command = input("What do you do? ")
command = command.strip().lower()
words = command.split()
if len(words) == 2:
    if words[0] in ["go", "take", "look"]:
        print("Verb: " + words[0])
        print("Thing: " + words[1])
    else:
        print("I don't understand " + words[0] + ".")
else:
    print("Try two words, such as: go north")
# endregion

# region: sol-initials
name = input("What is your full name? ")
words = name.strip().split()
initials = ""
for word in words:
    initials = initials + word[0].upper()
print("Initials: " + initials)
print("In capitals: " + name.strip().upper())
# endregion
