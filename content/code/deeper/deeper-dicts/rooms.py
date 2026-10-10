# region: predict
exits = {"north": "kitchen", "east": "garden"}
print(exits["north"])
print("west" in exits)
# endregion

# region: rooms
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall"},
}
here = "hall"
while True:
    print(rooms[here])
    print("Exits: " + ", ".join(exits[here]))
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            here = exits[here][words[1]]
        else:
            print("You can't go that way.")
    else:
        print("Try: go north, or quit")
# endregion

# region: bug
rooms = {"hall": "A long hall.", "kitchen": "A warm kitchen."}
here = "Hall"
print(rooms[here])
# endregion

# region: make
# Count the words: ask for a sentence, then print how many times each word appears.

# endregion

# region: sol-attic
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass.",
    "attic": "A dusty attic full of old boxes.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden", "up": "attic"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall"},
    "attic": {"down": "hall"},
}
here = "hall"
while True:
    print(rooms[here])
    print("Exits: " + ", ".join(exits[here]))
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            here = exits[here][words[1]]
        else:
            print("You can't go that way.")
    else:
        print("Try: go north, or quit")
# endregion

# region: sol-moves
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall"},
}
here = "hall"
moves = 0
while True:
    print(rooms[here])
    print("Exits: " + ", ".join(exits[here]))
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        print("You made " + str(moves) + " moves.")
        break
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            here = exits[here][words[1]]
            moves += 1
        else:
            print("You can't go that way.")
    else:
        print("Try: go north, or quit")
# endregion

# region: sol-count
sentence = input("Type a sentence: ").strip().lower()
counts = {}
for word in sentence.split():
    if word in counts:
        counts[word] += 1
    else:
        counts[word] = 1
for word in counts:
    print(word + ": " + str(counts[word]))
# endregion
