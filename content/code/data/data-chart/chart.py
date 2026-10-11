# region: predict
counts = {"pop": 3, "rock": 2}
for genre in counts:
    print(genre.ljust(6) + "#" * counts[genre])
# endregion
# region: run
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

counts = {}
for song in songs:
    genre = song["genre"]
    if genre in counts:
        counts[genre] = counts[genre] + 1
    else:
        counts[genre] = 1

for genre in counts:
    print(genre.ljust(12) + "#" * counts[genre] + " " + str(counts[genre]))
# endregion
# region: bug
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

counts = {}
for song in songs:
    genre = song["genre"]
    counts[genre] = counts[genre] + 1
print(counts)
# endregion
# region: sol-decades
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

counts = {}
for song in songs:
    decade = int(song["year"]) // 10 * 10
    if decade in counts:
        counts[decade] = counts[decade] + 1
    else:
        counts[decade] = 1

for decade in counts:
    print(str(decade).ljust(12) + "#" * counts[decade] + " " + str(counts[decade]))
# endregion
# region: sol-three
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

counts = {}
for song in songs:
    genre = song["genre"]
    if genre in counts:
        counts[genre] = counts[genre] + 1
    else:
        counts[genre] = 1

for genre in counts:
    if counts[genre] >= 3:
        print(genre.ljust(12) + "#" * counts[genre] + " " + str(counts[genre]))
# endregion
# region: make
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

# Total minutes for each genre, then a bar for each: one # for every 5 minutes.
# endregion
# region: sol-make
import csv

with open("music.csv") as f:
    songs = list(csv.DictReader(f))

minutes = {}
for song in songs:
    genre = song["genre"]
    if genre in minutes:
        minutes[genre] = minutes[genre] + float(song["minutes"])
    else:
        minutes[genre] = float(song["minutes"])

for genre in minutes:
    bar = "#" * int(minutes[genre] / 5)
    print(genre.ljust(12) + bar + " " + str(round(minutes[genre])) + " min")
# endregion
