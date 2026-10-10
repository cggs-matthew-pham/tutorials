# region: add
a = input("First number: ")
b = input("Second number: ")
print(a + b)
# endregion

# region: fixed
a = int(input("First number: "))
b = int(input("Second number: "))
print(a + b)
# endregion

# region: check
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number, such as 12.")
# endregion

# region: bug
tickets = input("How many tickets? ")
cost = tickets * 12
print("That will be $" + str(cost))
# endregion

# region: modify
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
else:
    print("Please type your age as a number, such as 12.")
# endregion

# region: make
# Ticket machine: tickets cost $12 each.
# Ask how many tickets, check the answer is a number, then print the total cost.

# endregion

# region: sol-ten
text = input("How old are you? ")
if text.isdigit():
    age = int(text)
    print("Next year you will be " + str(age + 1) + ".")
    print("In ten years you will be " + str(age + 10) + ".")
else:
    print("Please type your age as a number, such as 12.")
# endregion

# region: sol-sum
first = input("First number: ")
second = input("Second number: ")
if first.isdigit() and second.isdigit():
    total = int(first) + int(second)
    print("The total is " + str(total) + ".")
else:
    print("Please type two whole numbers.")
# endregion

# region: sol-tickets
text = input("How many tickets? ")
if text.isdigit():
    tickets = int(text)
    print("That will be $" + str(tickets * 12) + ".")
else:
    print("Please type the number of tickets, such as 3.")
# endregion
