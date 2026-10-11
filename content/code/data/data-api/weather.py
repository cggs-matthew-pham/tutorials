# region: predict
reply = {"daily": {"time": ["Mon", "Tue"], "temperature_2m_max": [18.5, 22.1]}}
print(reply["daily"]["temperature_2m_max"][1])
# endregion
# region: run
import json
import requests

URL = "https://api.open-meteo.com/v1/forecast"
canberra = {"latitude": -35.28, "longitude": 149.13, "timezone": "Australia/Sydney", "daily": "temperature_2m_max,temperature_2m_min"}

try:
    reply = requests.get(URL, params=canberra, timeout=10).json()
    print("Live forecast from Open-Meteo")
except requests.RequestException:
    with open("weather.json") as f:
        reply = json.load(f)
    print("No connection: using the saved forecast")

days = reply["daily"]
for i in range(len(days["time"])):
    print(days["time"][i] + ": " + str(days["temperature_2m_min"][i]) + " to " + str(days["temperature_2m_max"][i]) + " degrees")
print("Weather data by Open-Meteo.com (CC BY 4.0)")
# endregion
# region: bug
reply = {"daily": {"time": ["Mon", "Tue"], "temperature_2m_max": [18.5, 22.1]}}
for i in range(len(reply["daily"]["time"])):
    print(reply["temperature_2m_max"][i])
# endregion
# region: sol-hottest
import json
import requests

URL = "https://api.open-meteo.com/v1/forecast"
canberra = {"latitude": -35.28, "longitude": 149.13, "timezone": "Australia/Sydney", "daily": "temperature_2m_max,temperature_2m_min"}

try:
    reply = requests.get(URL, params=canberra, timeout=10).json()
    print("Live forecast from Open-Meteo")
except requests.RequestException:
    with open("weather.json") as f:
        reply = json.load(f)
    print("No connection: using the saved forecast")

days = reply["daily"]
for i in range(len(days["time"])):
    print(days["time"][i] + ": " + str(days["temperature_2m_min"][i]) + " to " + str(days["temperature_2m_max"][i]) + " degrees")

hottest = 0
for i in range(len(days["time"])):
    if days["temperature_2m_max"][i] > days["temperature_2m_max"][hottest]:
        hottest = i
print("Hottest: " + days["time"][hottest] + " at " + str(days["temperature_2m_max"][hottest]) + " degrees")
print("Weather data by Open-Meteo.com (CC BY 4.0)")
# endregion
# region: sol-rain
import json
import requests

URL = "https://api.open-meteo.com/v1/forecast"
canberra = {"latitude": -35.28, "longitude": 149.13, "timezone": "Australia/Sydney", "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum"}

try:
    reply = requests.get(URL, params=canberra, timeout=10).json()
    print("Live forecast from Open-Meteo")
except requests.RequestException:
    with open("weather.json") as f:
        reply = json.load(f)
    print("No connection: using the saved forecast")

days = reply["daily"]
for i in range(len(days["time"])):
    line = days["time"][i] + ": " + str(days["temperature_2m_min"][i]) + " to " + str(days["temperature_2m_max"][i]) + " degrees"
    if days["precipitation_sum"][i] > 0:
        line = line + ", rain " + str(days["precipitation_sum"][i]) + " mm"
    print(line)
print("Weather data by Open-Meteo.com (CC BY 4.0)")
# endregion
# region: make
import json
import requests

URL = "https://api.open-meteo.com/v1/forecast"
places = {
    "Canberra": {"latitude": -35.28, "longitude": 149.13},
    "Darwin": {"latitude": -12.46, "longitude": 130.84},
}

# Compare the week ahead in two places: which is warmer, and by how much on average?
# endregion
# region: sol-make
import json
import requests

URL = "https://api.open-meteo.com/v1/forecast"
places = {
    "Canberra": {"latitude": -35.28, "longitude": 149.13},
    "Darwin": {"latitude": -12.46, "longitude": 130.84},
}

averages = {}
for name in places:
    query = {"latitude": places[name]["latitude"], "longitude": places[name]["longitude"], "daily": "temperature_2m_max", "timezone": "auto"}
    try:
        days = requests.get(URL, params=query, timeout=10).json()["daily"]
        total = 0
        for t in days["temperature_2m_max"]:
            total = total + t
        averages[name] = total / len(days["temperature_2m_max"])
        print(name + ": " + str(round(averages[name], 1)) + " degrees on average")
    except requests.RequestException:
        print("Could not reach Open-Meteo for " + name)

if len(averages) == 2:
    difference = averages["Darwin"] - averages["Canberra"]
    print("Darwin is " + str(round(difference, 1)) + " degrees warmer on average")
print("Weather data by Open-Meteo.com (CC BY 4.0)")
# endregion
