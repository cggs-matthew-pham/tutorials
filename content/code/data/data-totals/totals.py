# region: predict
total = 0
for n in [3, 4, 5]:
    total = total + n
print(total / 3)
# endregion
# region: run
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
longest = songs[0]
for song in songs:
    minutes = float(song["minutes"])
    total = total + minutes
    if minutes > float(longest["minutes"]):
        longest = song

print("Average length: " + str(round(total / len(songs), 1)) + " minutes")
print("Longest: " + longest["title"] + " (" + longest["minutes"] + " minutes)")
# endregion
# region: bug
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
for song in songs:
    total = float(song["minutes"])
print("Total: " + str(total) + " minutes")
# endregion
# region: sol-rock
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
count = 0
longest = songs[0]
for song in songs:
    if song["genre"] == "rock":
        minutes = float(song["minutes"])
        total = total + minutes
        count = count + 1
    if float(song["minutes"]) > float(longest["minutes"]):
        longest = song

print("Average rock song: " + str(round(total / count, 1)) + " minutes")
print("Longest: " + longest["title"] + " (" + longest["minutes"] + " minutes)")
# endregion
# region: sol-oldest
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

total = 0
longest = songs[0]
oldest = songs[0]
for song in songs:
    minutes = float(song["minutes"])
    total = total + minutes
    if minutes > float(longest["minutes"]):
        longest = song
    if int(song["year"]) < int(oldest["year"]):
        oldest = song

print("Average length: " + str(round(total / len(songs), 1)) + " minutes")
print("Longest: " + longest["title"] + " (" + longest["minutes"] + " minutes)")
print("Oldest: " + oldest["title"] + " (" + oldest["year"] + ")")
# endregion
# region: make
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

# Ask for a genre. Print how many songs it has, their average length and its shortest song.
# endregion
# region: sol-make
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

genre = input("Which genre? ").strip().lower()
matches = []
for song in songs:
    if song["genre"].lower() == genre:
        matches.append(song)

if len(matches) == 0:
    print("No songs in that genre.")
else:
    total = 0
    shortest = matches[0]
    for song in matches:
        minutes = float(song["minutes"])
        total = total + minutes
        if minutes < float(shortest["minutes"]):
            shortest = song
    print(str(len(matches)) + " songs, " + str(round(total / len(matches), 1)) + " minutes on average")
    print("Shortest: " + shortest["title"] + " (" + shortest["minutes"] + " minutes)")
# endregion
