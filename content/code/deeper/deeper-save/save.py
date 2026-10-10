# region: predict
with open("note.txt", "w") as f:
    f.write("kitchen")
with open("note.txt", "w") as f:
    f.write("garden")
with open("note.txt") as f:
    print(f.read())
# endregion
# region: run
import json

try:
    with open("me.json") as f:
        me = json.load(f)
    me["visits"] = me["visits"] + 1
    print("Welcome back, " + me["name"] + ". This is visit " + str(me["visits"]) + ".")
except FileNotFoundError:
    name = input("What is your name? ")
    me = {"name": name, "visits": 1}
    print("Nice to meet you, " + name + ". Run me again.")

with open("me.json", "w") as f:
    json.dump(me, f)
# endregion
# region: bug
import json
with open("me.json", "w") as f:
    me = json.load(f)
print("Welcome back, " + me["name"])
# endregion
# region: m1
import json

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
    # Milestone 1: a save command goes here.
    else:
        print("Try: look, go north, take lamp, drop lamp, bag, save, load or quit")
    if "crown" in bag:
        print("You found the crown. You win!")
        break
# endregion
# region: sol-m1
import json

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
    elif command == "save":
        game = {"here": here, "bag": bag, "things": things}
        with open("game.json", "w") as f:
            json.dump(game, f)
        print("Saved.")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag, save, load or quit")
    if "crown" in bag:
        print("You found the crown. You win!")
        break
# endregion
# region: m2
import json

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
    elif command == "save":
        game = {"here": here, "bag": bag, "things": things}
        with open("game.json", "w") as f:
            json.dump(game, f)
        print("Saved.")
    # Milestone 2: a load command goes here.
    else:
        print("Try: look, go north, take lamp, drop lamp, bag, save, load or quit")
    if "crown" in bag:
        print("You found the crown. You win!")
        break
# endregion
# region: sol-m2
import json

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
    elif command == "save":
        game = {"here": here, "bag": bag, "things": things}
        with open("game.json", "w") as f:
            json.dump(game, f)
        print("Saved.")
    elif command == "load":
        try:
            with open("game.json") as f:
                game = json.load(f)
            here = game["here"]
            bag = game["bag"]
            things = game["things"]
            print("Loaded.")
            print(rooms[here])
        except FileNotFoundError:
            print("There is no saved game yet.")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag, save, load or quit")
    if "crown" in bag:
        print("You found the crown. You win!")
        break
# endregion
# region: m3
import json

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
    elif command == "save":
        game = {"here": here, "bag": bag, "things": things}
        with open("game.json", "w") as f:
            json.dump(game, f)
        print("Saved.")
    elif command == "load":
        try:
            with open("game.json") as f:
                game = json.load(f)
            here = game["here"]
            bag = game["bag"]
            things = game["things"]
            print("Loaded.")
            print(rooms[here])
        except FileNotFoundError:
            print("There is no saved game yet.")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag, save, load or quit")
    if "crown" in bag:
        print("You found the crown. You win!")
        break
# endregion
# region: sol-m3
import json

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
try:
    with open("game.json") as f:
        game = json.load(f)
    answer = input("Load your saved game? (yes or no) ").strip().lower()
    if answer == "yes":
        here = game["here"]
        bag = game["bag"]
        things = game["things"]
except FileNotFoundError:
    print("New game.")
print(rooms[here])
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        game = {"here": here, "bag": bag, "things": things}
        with open("game.json", "w") as f:
            json.dump(game, f)
        print("Saved. Goodbye!")
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
    elif command == "save":
        game = {"here": here, "bag": bag, "things": things}
        with open("game.json", "w") as f:
            json.dump(game, f)
        print("Saved.")
    elif command == "load":
        try:
            with open("game.json") as f:
                game = json.load(f)
            here = game["here"]
            bag = game["bag"]
            things = game["things"]
            print("Loaded.")
            print(rooms[here])
        except FileNotFoundError:
            print("There is no saved game yet.")
    else:
        print("Try: look, go north, take lamp, drop lamp, bag, save, load or quit")
    if "crown" in bag:
        print("You found the crown. You win!")
        break
# endregion
