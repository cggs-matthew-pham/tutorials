# region: predict
def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


print(distance({"bill": 40, "flipper": 190}, {"bill": 43, "flipper": 194}))
# endregion
# region: run
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


mystery = {"bill": 47.0, "flipper": 215.0}
match = nearest(mystery)
print("Nearest penguin: " + match["species"] + ", bill " + str(match["bill"]) + ", flipper " + str(match["flipper"]))
print("Distance: " + str(round(distance(match, mystery), 1)))
print("Guess: " + match["species"])
# endregion
# region: bug
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) > distance(best, new):
            best = p
    return best


mystery = {"bill": 47.0, "flipper": 215.0}
match = nearest(mystery)
print("Nearest penguin: " + match["species"] + ", bill " + str(match["bill"]) + ", flipper " + str(match["flipper"]))
print("Distance: " + str(round(distance(match, mystery), 1)))
print("Guess: " + match["species"])
# endregion
# region: sol-input
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


bill = float(input("Bill length (mm)? "))
flipper = float(input("Flipper length (mm)? "))
mystery = {"bill": bill, "flipper": flipper}
match = nearest(mystery)
print("Nearest penguin: " + match["species"] + ", bill " + str(match["bill"]) + ", flipper " + str(match["flipper"]))
print("Distance: " + str(round(distance(match, mystery), 1)))
print("Guess: " + match["species"])
# endregion
# region: sol-sure
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


mystery = {"bill": 47.0, "flipper": 215.0}
match = nearest(mystery)
print("Nearest penguin: " + match["species"] + ", bill " + str(match["bill"]) + ", flipper " + str(match["flipper"]))
print("Distance: " + str(round(distance(match, mystery), 1)))
if distance(match, mystery) > 10:
    print("Not sure: no penguin in the data is close")
else:
    print("Guess: " + match["species"])
# endregion
# region: make
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


mysteries = [
    {"bill": 38.0, "flipper": 185.0},
    {"bill": 49.5, "flipper": 196.0},
    {"bill": 46.0, "flipper": 218.0},
    {"bill": 44.0, "flipper": 201.0},
    {"bill": 60.0, "flipper": 240.0},
]

# Guess each mystery penguin's species, and print each guess with its distance.
# endregion
# region: sol-make
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new):
    best = penguins[0]
    for p in penguins:
        if distance(p, new) < distance(best, new):
            best = p
    return best


mysteries = [
    {"bill": 38.0, "flipper": 185.0},
    {"bill": 49.5, "flipper": 196.0},
    {"bill": 46.0, "flipper": 218.0},
    {"bill": 44.0, "flipper": 201.0},
    {"bill": 60.0, "flipper": 240.0},
]

for m in mysteries:
    match = nearest(m)
    print(str(m["bill"]) + ", " + str(m["flipper"]) + ": " + match["species"] + " (distance " + str(round(distance(match, m), 1)) + ")")
# endregion
