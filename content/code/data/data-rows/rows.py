# region: predict
song = {"title": "Royals", "year": "2013"}
print(song["year"] + "1")
# endregion
# region: run
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

print(str(len(songs)) + " songs")
print(songs[0])
for song in songs:
    if song["genre"] == "rock":
        print(song["title"] + " by " + song["artist"])
# endregion
# region: bug
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

for song in songs:
    if song["year"] >= 2020:
        print(song["title"])
# endregion
# region: sol-recent
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

print(str(len(songs)) + " songs")
print(songs[0])
for song in songs:
    if int(song["year"]) >= 2010:
        print(song["title"] + " by " + song["artist"])
# endregion
# region: sol-count
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

count = 0
for song in songs:
    if song["genre"] == "pop":
        count = count + 1
print(str(count) + " pop songs")
# endregion
# region: make
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

# Ask for a genre, then list its songs and say how many there are.
# endregion
# region: sol-make
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

genre = input("Which genre? ").strip()
count = 0
for song in songs:
    if song["genre"].lower() == genre.lower():
        print(song["title"] + " (" + song["year"] + ")")
        count = count + 1
print(str(count) + " " + genre + " songs")
# endregion
