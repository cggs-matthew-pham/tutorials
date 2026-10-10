# region: predict
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
}
here = "hall"
for move in ["north", "south", "west", "east", "east"]:
    if move in exits[here]:
        here = exits[here][move]
print(here)
# endregion

# region: start
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
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
}
bag = []
here = "hall"
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "look":
        print(rooms[here])
        print("Exits: " + ", ".join(exits[here]))
        if len(things[here]) > 0:
            print("You see: " + ", ".join(things[here]))
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            here = exits[here][words[1]]
            print(rooms[here])
        else:
            print("You can't go that way.")
    # Milestone 1: take and drop go here.
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
# endregion

# region: m2
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass. A locked shed stands to the east.",
    "shed": "A dusty shed. Something glints in the corner.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
    "shed": {"west": "garden"},
}
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
    "shed": ["crown"],
}
bag = []
here = "hall"
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "look":
        print(rooms[here])
        print("Exits: " + ", ".join(exits[here]))
        if len(things[here]) > 0:
            print("You see: " + ", ".join(things[here]))
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            # Milestone 2: the shed is locked unless the key is in the bag.
            here = exits[here][words[1]]
            print(rooms[here])
        else:
            print("You can't go that way.")
    elif len(words) == 2 and words[0] == "take":
        if words[1] in things[here]:
            things[here].remove(words[1])
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("There is no " + words[1] + " here.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            things[here].append(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
# endregion

# region: m3
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass. A locked shed stands to the east.",
    "shed": "A dusty shed. Something glints in the corner.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
    "shed": {"west": "garden"},
}
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
    "shed": ["crown"],
}
bag = []
here = "hall"
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "look":
        print(rooms[here])
        print("Exits: " + ", ".join(exits[here]))
        if len(things[here]) > 0:
            print("You see: " + ", ".join(things[here]))
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            if exits[here][words[1]] == "shed" and "key" not in bag:
                print("The shed is locked.")
            else:
                here = exits[here][words[1]]
                print(rooms[here])
        else:
            print("You can't go that way.")
    elif len(words) == 2 and words[0] == "take":
        if words[1] in things[here]:
            things[here].remove(words[1])
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("There is no " + words[1] + " here.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            things[here].append(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
    # Milestone 3: check here whether the player has won.
# endregion

# region: sol-m1
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
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
}
bag = []
here = "hall"
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "look":
        print(rooms[here])
        print("Exits: " + ", ".join(exits[here]))
        if len(things[here]) > 0:
            print("You see: " + ", ".join(things[here]))
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            here = exits[here][words[1]]
            print(rooms[here])
        else:
            print("You can't go that way.")
    elif len(words) == 2 and words[0] == "take":
        if words[1] in things[here]:
            things[here].remove(words[1])
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("There is no " + words[1] + " here.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            things[here].append(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
# endregion

# region: sol-m2
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass. A locked shed stands to the east.",
    "shed": "A dusty shed. Something glints in the corner.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
    "shed": {"west": "garden"},
}
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
    "shed": ["crown"],
}
bag = []
here = "hall"
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "look":
        print(rooms[here])
        print("Exits: " + ", ".join(exits[here]))
        if len(things[here]) > 0:
            print("You see: " + ", ".join(things[here]))
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            if exits[here][words[1]] == "shed" and "key" not in bag:
                print("The shed is locked.")
            else:
                here = exits[here][words[1]]
                print(rooms[here])
        else:
            print("You can't go that way.")
    elif len(words) == 2 and words[0] == "take":
        if words[1] in things[here]:
            things[here].remove(words[1])
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("There is no " + words[1] + " here.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            things[here].append(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
# endregion

# region: sol-m3
rooms = {
    "hall": "A long hall with a creaky floor.",
    "kitchen": "A kitchen that smells of toast.",
    "garden": "A garden full of tall grass. A locked shed stands to the east.",
    "shed": "A dusty shed. Something glints in the corner.",
}
exits = {
    "hall": {"north": "kitchen", "east": "garden"},
    "kitchen": {"south": "hall"},
    "garden": {"west": "hall", "east": "shed"},
    "shed": {"west": "garden"},
}
things = {
    "hall": ["lamp"],
    "kitchen": ["key"],
    "garden": [],
    "shed": ["crown"],
}
bag = []
here = "hall"
moves = 0
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "look":
        print(rooms[here])
        print("Exits: " + ", ".join(exits[here]))
        if len(things[here]) > 0:
            print("You see: " + ", ".join(things[here]))
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "go":
        if words[1] in exits[here]:
            if exits[here][words[1]] == "shed" and "key" not in bag:
                print("The shed is locked.")
            else:
                here = exits[here][words[1]]
                moves += 1
                print(rooms[here])
        else:
            print("You can't go that way.")
    elif len(words) == 2 and words[0] == "take":
        if words[1] in things[here]:
            things[here].remove(words[1])
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("There is no " + words[1] + " here.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            things[here].append(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag or quit")
    if "crown" in bag:
        print("You found the crown in " + str(moves) + " moves. You win!")
        break
# endregion
