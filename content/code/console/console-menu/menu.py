# region: till
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Pay")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2 or 3: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2 or 3.")
print("Thank you!")
# endregion

# region: bug
total = 0
while True:
    choice = input("1 drink, 2 snack, 3 pay: ")
    if choice == 1:
        total += 3
    elif choice == 2:
        total += 2
    elif choice == 3:
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2 or 3.")
# endregion

# region: parsons
total = 0
while True:
    choice = input("1 add $3, 2 pay: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        print("Total: $" + str(total))
        break
# endregion

# region: modify
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Pay")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2 or 3: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2 or 3.")
print("Thank you!")
# endregion

# region: make
# Your own menu app: a quiz, a converter, a shop or a game shop.
# It needs: a function that prints the menu, a while True loop,
# at least three choices with if and elif, and a choice that quits with break.

# endregion

# region: sol-sandwich
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Add a sandwich ($5)")
    print("4. Pay")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2, 3 or 4: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        total += 5
    elif choice == "4":
        print("Total: $" + str(total))
        break
    else:
        print("Please type 1, 2, 3 or 4.")
print("Thank you!")
# endregion

# region: sol-cancel
def show_menu():
    print("1. Add a drink ($3)")
    print("2. Add a snack ($2)")
    print("3. Pay")
    print("4. Start again")

total = 0
while True:
    show_menu()
    choice = input("Choose 1, 2, 3 or 4: ")
    if choice == "1":
        total += 3
    elif choice == "2":
        total += 2
    elif choice == "3":
        print("Total: $" + str(total))
        break
    elif choice == "4":
        total = 0
        print("Order cleared.")
    else:
        print("Please type 1, 2, 3 or 4.")
print("Thank you!")
# endregion

# region: sol-app
def show_menu():
    print("1. Centimetres to metres")
    print("2. Minutes to seconds")
    print("3. Quit")

def ask_number(question):
    text = input(question)
    if text.isdigit():
        return int(text)
    print("That is not a whole number, so I will use 0.")
    return 0

while True:
    show_menu()
    choice = input("Choose 1, 2 or 3: ")
    if choice == "1":
        cm = ask_number("Centimetres: ")
        print(str(cm) + " cm is " + str(cm / 100) + " m")
    elif choice == "2":
        minutes = ask_number("Minutes: ")
        print(str(minutes) + " minutes is " + str(minutes * 60) + " seconds")
    elif choice == "3":
        print("Goodbye!")
        break
    else:
        print("Please type 1, 2 or 3.")
# endregion
