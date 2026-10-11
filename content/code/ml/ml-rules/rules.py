# region: predict
def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 44:
        return "Chinstrap"
    return "Adelie"


print(guess(39.1, 181))
print(guess(50.0, 196))
print(guess(46.1, 211))
# endregion
# region: run
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 44:
        return "Chinstrap"
    return "Adelie"


correct = 0
for p in penguins:
    if guess(p["bill"], p["flipper"]) == p["species"]:
        correct = correct + 1
print(str(correct) + " of " + str(len(penguins)) + " right: " + str(round(100 * correct / len(penguins))) + "%")
# endregion
# region: bug
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": row["bill_length_mm"], "flipper": row["flipper_length_mm"]})

for p in penguins:
    if p["flipper"] > 206:
        print(p["species"])
# endregion
# region: sol-wrong
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 44:
        return "Chinstrap"
    return "Adelie"


correct = 0
for p in penguins:
    if guess(p["bill"], p["flipper"]) == p["species"]:
        correct = correct + 1
print(str(correct) + " of " + str(len(penguins)) + " right: " + str(round(100 * correct / len(penguins))) + "%")

for p in penguins:
    g = guess(p["bill"], p["flipper"])
    if g != p["species"]:
        print(p["species"] + " guessed as " + g + ": bill " + str(p["bill"]) + ", flipper " + str(p["flipper"]))
# endregion
# region: sol-better
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 45:
        return "Chinstrap"
    return "Adelie"


correct = 0
for p in penguins:
    if guess(p["bill"], p["flipper"]) == p["species"]:
        correct = correct + 1
print(str(correct) + " of " + str(len(penguins)) + " right: " + str(round(100 * correct / len(penguins))) + "%")
# endregion
# region: make
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

# Your own rules: add bill_depth_mm to each penguin, write guess(p) with it, and beat the Run step's accuracy.
# endregion
# region: sol-make
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"]), "depth": float(row["bill_depth_mm"])})


def guess(p):
    if p["depth"] < 16:
        return "Gentoo"
    if p["bill"] > 44:
        return "Chinstrap"
    return "Adelie"


correct = 0
for p in penguins:
    if guess(p) == p["species"]:
        correct = correct + 1
print(str(round(100 * correct / len(penguins))) + "% right")
# endregion
