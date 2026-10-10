# region: predict
text = "twelve"
try:
    age = int(text)
    print("Next year: " + str(age + 1))
except ValueError:
    print("That is not a number.")
print("Done")
# endregion

# region: tickets
while True:
    text = input("How many tickets? ")
    try:
        tickets = int(text)
        break
    except ValueError:
        print("Please type a whole number, such as 3.")
print("That will be $" + str(tickets * 12) + ".")
# endregion

# region: bug
rooms = {"hall": "A long hall."}
try:
    print(rooms["attic"])
except ValueError:
    print("There is no such room.")
# endregion

# region: canteen
prices = {"pie": 5, "drink": 3, "fruit": 2}
while True:
    item = input("What would you like? ").strip().lower()
    try:
        price = prices[item]
        break
    except KeyError:
        print("We have: " + ", ".join(prices))
while True:
    text = input("How many? ")
    try:
        count = int(text)
        break
    except ValueError:
        print("Please type a whole number.")
print("That will be $" + str(price * count) + ".")
# endregion

# region: make
# A safe calculator: ask for two numbers and divide the first by the second.
# Catch typing mistakes and dividing by zero, and ask again.

# endregion

# region: sol-range
prices = {"pie": 5, "drink": 3, "fruit": 2}
while True:
    item = input("What would you like? ").strip().lower()
    try:
        price = prices[item]
        break
    except KeyError:
        print("We have: " + ", ".join(prices))
while True:
    text = input("How many? ")
    try:
        count = int(text)
        if count >= 1 and count <= 10:
            break
        print("Choose 1 to 10.")
    except ValueError:
        print("Please type a whole number.")
print("That will be $" + str(price * count) + ".")
# endregion

# region: sol-quit
prices = {"pie": 5, "drink": 3, "fruit": 2}
price = 0
while True:
    item = input("What would you like? ").strip().lower()
    if item == "quit":
        break
    try:
        price = prices[item]
        break
    except KeyError:
        print("We have: " + ", ".join(prices))
if item != "quit":
    while True:
        text = input("How many? ")
        try:
            count = int(text)
            break
        except ValueError:
            print("Please type a whole number.")
    print("That will be $" + str(price * count) + ".")
else:
    print("Goodbye!")
# endregion

# region: sol-calculator
while True:
    try:
        a = int(input("First number: "))
        b = int(input("Divide it by: "))
        print("Answer: " + str(a / b))
        break
    except ValueError:
        print("Please type whole numbers.")
    except ZeroDivisionError:
        print("You can't divide by zero. Try again.")
# endregion
