# region: predict
bag = ["lamp", "map"]
bag.append("key")
bag.remove("map")
print(bag)
print("map" in bag)
# endregion

# region: bag
bag = []
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "take":
        bag.append(words[1])
        print("You take the " + words[1] + ".")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: take lamp, drop lamp, bag or quit")
# endregion

# region: bug
bag = ["lamp", "key"]
item = input("Drop what? ")
bag.remove(item)
print(bag)
# endregion

# region: make
# A shopping list: add items, remove items, show the list in order, until "done".

# endregion

# region: sol-count
bag = []
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
        print("That is " + str(len(bag)) + " things.")
    elif len(words) == 2 and words[0] == "take":
        bag.append(words[1])
        print("You take the " + words[1] + ".")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: take lamp, drop lamp, bag or quit")
# endregion

# region: sol-full
bag = []
while True:
    command = input("> ").strip().lower()
    words = command.split()
    if command == "quit":
        break
    elif command == "bag":
        print("You carry: " + ", ".join(bag))
    elif len(words) == 2 and words[0] == "take":
        if len(bag) < 3:
            bag.append(words[1])
            print("You take the " + words[1] + ".")
        else:
            print("Your bag is full.")
    elif len(words) == 2 and words[0] == "drop":
        if words[1] in bag:
            bag.remove(words[1])
            print("You drop the " + words[1] + ".")
        else:
            print("You don't have a " + words[1] + ".")
    else:
        print("Try: take lamp, drop lamp, bag or quit")
# endregion

# region: sol-shopping
items = []
while True:
    command = input("add, remove, show or done: ").strip().lower()
    if command == "done":
        break
    elif command == "add":
        items.append(input("What? ").strip().lower())
    elif command == "remove":
        item = input("What? ").strip().lower()
        if item in items:
            items.remove(item)
        else:
            print(item + " is not on the list.")
    elif command == "show":
        items.sort()
        print(", ".join(items))
print("Final list: " + ", ".join(items))
# endregion
