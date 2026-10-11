# region: predict
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])

emperor = pd.DataFrame([[80.0, 350.0]], columns=columns)
print(model.predict(emperor)[0])
# endregion
# region: run
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])

mysteries = pd.DataFrame([[39.0, 190.0], [48.0, 195.0], [80.0, 350.0], [20.0, 120.0]], columns=columns)
guesses = model.predict(mysteries)
chances = model.predict_proba(mysteries)
for i in range(len(guesses)):
    print(str(list(mysteries.iloc[i])) + ": " + guesses[i] + ", " + str(round(max(chances[i]) * 100)) + "% sure")
# endregion
# region: sol-far
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
columns = ["bill_length_mm", "flipper_length_mm"]
model = KNeighborsClassifier(n_neighbors=5)
model.fit(penguins[columns], penguins["species"])

mysteries = pd.DataFrame([[39.0, 190.0], [48.0, 195.0], [80.0, 350.0], [20.0, 120.0]], columns=columns)
guesses = model.predict(mysteries)
chances = model.predict_proba(mysteries)
distances, places = model.kneighbors(mysteries)
for i in range(len(guesses)):
    if distances[i][0] > 10:
        print(str(list(mysteries.iloc[i])) + ": not like any penguin in the data")
    else:
        print(str(list(mysteries.iloc[i])) + ": " + guesses[i] + ", " + str(round(max(chances[i]) * 100)) + "% sure")
# endregion
# region: sol-sex
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv").dropna()
for target in ["species", "sex", "island"]:
    X = penguins[["bill_length_mm", "flipper_length_mm"]]
    y = penguins[target]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)
    model = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
    print(target + ": " + str(round(model.score(X_test, y_test) * 100)) + "%")
# endregion
