# region: predict
answers = ["5", "", "three", "4.5"]
total = 0
for a in answers:
    try:
        total = total + float(a)
    except ValueError:
        print("Skipped: '" + a + "'")
print(total)
# endregion
# region: run
import csv


def clean_hours(text):
    try:
        hours = float(text)
    except ValueError:
        return None
    if hours < 0 or hours > 168:
        return None
    return hours


assert clean_hours("5") == 5
assert clean_hours("4.5") == 4.5
assert clean_hours("three") is None
assert clean_hours("") is None
assert clean_hours("-1") is None
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

total = 0
count = 0
for row in rows:
    hours = clean_hours(row["hours"])
    if hours is None:
        print("Skipped " + row["student"] + ": '" + row["hours"] + "'")
    else:
        total = total + hours
        count = count + 1

print("Average: " + str(round(total / count, 1)) + " hours of music a week, from " + str(count) + " answers")
# endregion
# region: bug
def clean_hours(text):
    try:
        hours = float(text)
    except ValueError:
        return None
    if hours < 0 and hours > 168:
        return None
    return hours


assert clean_hours("5") == 5
assert clean_hours("400") is None
print("All tests pass")
# endregion
# region: sol-genre
import csv


def clean_hours(text):
    try:
        hours = float(text)
    except ValueError:
        return None
    if hours < 0 or hours > 168:
        return None
    return hours


def clean_genre(text):
    return text.strip().lower()


assert clean_hours("5") == 5
assert clean_hours("4.5") == 4.5
assert clean_hours("three") is None
assert clean_hours("") is None
assert clean_hours("-1") is None
assert clean_genre(" Hip Hop ") == "hip hop"
assert clean_genre("POP") == "pop"
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

for row in rows:
    print(row["student"] + ": " + clean_genre(row["genre"]))
# endregion
# region: sol-repeat
import csv


def clean_hours(text):
    try:
        hours = float(text)
    except ValueError:
        return None
    if hours < 0 or hours > 168:
        return None
    return hours


assert clean_hours("5") == 5
assert clean_hours("4.5") == 4.5
assert clean_hours("three") is None
assert clean_hours("") is None
assert clean_hours("-1") is None
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

total = 0
count = 0
seen = []
for row in rows:
    hours = clean_hours(row["hours"])
    if row["student"] in seen:
        print("Skipped " + row["student"] + ": a repeat")
    elif hours is None:
        print("Skipped " + row["student"] + ": '" + row["hours"] + "'")
    else:
        total = total + hours
        count = count + 1
        seen.append(row["student"])

print("Average: " + str(round(total / count, 1)) + " hours of music a week, from " + str(count) + " answers")
# endregion
# region: make
import csv


def clean_genre(text):
    return text.strip().lower()


assert clean_genre(" Hip Hop ") == "hip hop"
assert clean_genre("POP") == "pop"
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

# Count the class's favourite genres, using clean_genre, and skip blank answers.
# Then draw a bar chart, as in Lesson 3.
# endregion
# region: sol-make
import csv


def clean_genre(text):
    return text.strip().lower()


assert clean_genre(" Hip Hop ") == "hip hop"
assert clean_genre("POP") == "pop"
print("All tests pass")

with open("survey.csv") as f:
    rows = list(csv.DictReader(f))

counts = {}
for row in rows:
    genre = clean_genre(row["genre"])
    if genre != "":
        if genre in counts:
            counts[genre] = counts[genre] + 1
        else:
            counts[genre] = 1

for genre in counts:
    print(genre.ljust(12) + "#" * counts[genre] + " " + str(counts[genre]))
# endregion
