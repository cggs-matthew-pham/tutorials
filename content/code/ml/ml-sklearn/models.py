# region: predict
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print(model.score(X_train, y_train))
# endregion
# region: run
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_test, y_test) * 100)) + "%")

mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print("Mystery penguin: " + model.predict(mystery)[0])
# endregion
# region: bug
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_train, y_train) * 100)) + "%")
# endregion
# region: sol-five
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=5)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_test, y_test) * 100)) + "%")

mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print("Mystery penguin: " + model.predict(mystery)[0])
# endregion
# region: sol-tree
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

penguins = pd.read_csv("penguins.csv")
X = penguins[["bill_length_mm", "flipper_length_mm"]]
y = penguins["species"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)

model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_train, y_train)
print("Test accuracy: " + str(round(model.score(X_test, y_test) * 100)) + "%")

mystery = pd.DataFrame([[47.0, 215.0]], columns=X.columns)
print("Mystery penguin: " + model.predict(mystery)[0])

tree = DecisionTreeClassifier(max_depth=3, random_state=1)
tree.fit(X_train, y_train)
print("Decision tree: " + str(round(tree.score(X_test, y_test) * 100)) + "%")
# endregion
# region: make
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

penguins = pd.read_csv("penguins.csv")

# Which measurements make the best model? Try different columns for X, test each fairly, and report the best.
# endregion
# region: sol-make
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier

penguins = pd.read_csv("penguins.csv")

y = penguins["species"]
choices = [
    ["bill_length_mm", "flipper_length_mm"],
    ["bill_length_mm", "bill_depth_mm"],
    ["bill_length_mm", "bill_depth_mm", "flipper_length_mm"],
    ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"],
]
for columns in choices:
    X = penguins[columns]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=1)
    knn = KNeighborsClassifier(n_neighbors=5).fit(X_train, y_train)
    tree = DecisionTreeClassifier(max_depth=3, random_state=1).fit(X_train, y_train)
    print(", ".join(columns) + ": neighbours " + str(round(knn.score(X_test, y_test) * 100)) + "%, tree " + str(round(tree.score(X_test, y_test) * 100)) + "%")
# endregion
