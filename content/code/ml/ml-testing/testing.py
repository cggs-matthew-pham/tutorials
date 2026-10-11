# region: predict
penguins = ["Adelie", "Adelie", "Chinstrap", "Gentoo", "Gentoo"]
train = penguins[:3]
test = penguins[3:]
print(test)
# endregion
# region: run
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:250]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


print("Tested on the penguins it learned from: " + str(accuracy(train, train)) + "%")
print("Tested on new penguins: " + str(accuracy(test, train)) + "%")
# endregion
# region: bug
import csv

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

train = penguins[:250]
test = penguins[:92]
print(len(train), len(test))
# endregion
# region: sol-small
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:30]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


print("Tested on the penguins it learned from: " + str(accuracy(train, train)) + "%")
print("Tested on new penguins: " + str(accuracy(test, train)) + "%")
# endregion
# region: sol-species
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:250]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


print("Tested on the penguins it learned from: " + str(accuracy(train, train)) + "%")
print("Tested on new penguins: " + str(accuracy(test, train)) + "%")

right = {}
total = {}
for p in test:
    s = p["species"]
    if s not in total:
        total[s] = 0
        right[s] = 0
    total[s] = total[s] + 1
    if nearest(p, train)["species"] == s:
        right[s] = right[s] + 1
for s in total:
    print(s + ": " + str(right[s]) + " of " + str(total[s]))
# endregion
# region: make
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:250]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


# Bring back the rules from Lesson 1 as guess(bill, flipper), and test both on the same test penguins: which wins?
# endregion
# region: sol-make
import csv
import random

penguins = []
with open("penguins.csv") as f:
    for row in csv.DictReader(f):
        penguins.append({"species": row["species"], "bill": float(row["bill_length_mm"]), "flipper": float(row["flipper_length_mm"])})

random.seed(1)
random.shuffle(penguins)
train = penguins[:250]
test = penguins[250:]


def distance(a, b):
    return ((a["bill"] - b["bill"]) ** 2 + (a["flipper"] - b["flipper"]) ** 2) ** 0.5


def nearest(new, known):
    best = known[0]
    for p in known:
        if distance(p, new) < distance(best, new):
            best = p
    return best


def accuracy(group, known):
    correct = 0
    for p in group:
        if nearest(p, known)["species"] == p["species"]:
            correct = correct + 1
    return round(100 * correct / len(group))


def guess(bill, flipper):
    if flipper > 206:
        return "Gentoo"
    if bill > 44:
        return "Chinstrap"
    return "Adelie"


rule_right = 0
for p in test:
    if guess(p["bill"], p["flipper"]) == p["species"]:
        rule_right = rule_right + 1
print("Rules: " + str(round(100 * rule_right / len(test))) + "%")
print("Nearest neighbour: " + str(accuracy(test, train)) + "%")
# endregion
