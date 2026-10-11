---
order: 27
unit: rates
node: AC9M8M05 n1
uses: [AC9M7N08 n1]
title: Rates
summary: "A rate compares two quantities with different units: 60 km per hour, $4 per kg, 80 beats per minute. The unit rate is how much for 1 of the second quantity: divide the first by the second. A ratio compares quantities in the same units. Speeds convert with 1 km/h = 1000 m ÷ 3600 s."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Speed limits, the price of petrol, your heart rate and how fast your phone downloads: all rates. Each one says 'this much per one of that'."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8318
  url: http://127.0.0.1:8318/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: rate.yml#explain-pic, caption: "At 60 km per hour, 2.5 hours matches 150 km: each hour adds another 60 km." }
explainClip:
  query: { code: "@rate.yml#explain", fresh: 1, id: explain }
  caption: "Per one hour"
  say: "A rate says how much for one."
  clip:
    - caption: { text: "60 km per hour: 1 hour matches 60 km.", say: "Sixty kilometres per hour. One hour matches sixty kilometres." }
    - wait: 900
    - caption: { text: "Each extra hour adds another 60 km.", say: "Each extra hour adds another sixty." }
    - click: Make the time bigger
    - click: Make the time bigger
    - click: Make the time bigger
    - expect: { selector: "#gsum", contains: "150 km" }
    - wait: 1500
---
A **rate** compares two quantities measured in **different units**: 60 km per hour (km/h), $4.50 per kilogram ($/kg), 80 beats per minute. A **ratio** compares quantities in the **same** units: 2 cups of flour to 3 cups of milk, 2 : 3.

The **unit rate** is the amount for **one** of the second quantity. Divide the first by the second, and keep the units:

$$150 \text{ km in } 2.5 \text{ h} \;\Rightarrow\; 150 \div 2.5 = 60 \text{ km per h}$$

Rates convert like units. For speed: 1 km = 1000 m and 1 h = 3600 s, so $54 \text{ km/h} = 54 \times 1000 \div 3600 = 15 \text{ m/s}$ (divide by 3.6).

## Predict: a car's speed

```step
stage: predict
insight: "Committing to a speed from a distance and a time shows whether they divide distance by time, and keep the units."
check:
  type: predict
  q: "A car travels 150 km in 2 hours at a steady speed. How far does it go in 1 hour?"
  options: ["75 km", "300 km", "152 km", "2/150 km"]
  actual: "75 km: 150 ÷ 2 = 75. The car's speed is 75 km per hour."
```

## Run: set the rate

```step
stage: run
insight: "Matching a rate to a distance and time on the double number line shows the unit rate as 'one hour's worth'."
try: { playground: board, starter: "rate.yml#run", height: 520 }
check: { type: board, text: "Set the rate and the time so that 2 hours matches 150 km. Was your prediction right?", when: "r = 75 and x = 2", explain: "75 km per hour × 2 h = 150 km." }
```

The top line is the distance, the bottom line the time. The dashed line marks 1 hour.

## Investigate: rate or ratio

```step
stage: investigate
insight: "Rates have two different units, ratios one; the unit rate divides in the right order (Mia divides the wrong way); speeds convert by × 1000 ÷ 3600."
tasks:
  - check:
      type: sort
      q: "Rate or ratio?"
      options: ["Rate", "Ratio"]
      items:
        - ["60 km per hour", "Rate"]
        - ["$3.50 per kg", "Rate"]
        - ["2 : 3 cordial to water", "Ratio"]
        - ["80 beats per minute", "Rate"]
        - ["3 boys to 4 girls", "Ratio"]
        - ["7 L per 100 km", "Rate"]
      explain: "A rate has two different units; a ratio compares the same kind of thing."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia works out the price of apples per kilogram. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: rate-inverted
      explain: "Line 2: dollars per kilogram is dollars ÷ kilograms: 12 ÷ 3 = $4 per kg. 3 ÷ 12 = 0.25 kg per dollar, a different rate."
  - check:
      type: number
      q: "Convert 90 km/h to metres per second."
      answer: 25
      tolerance: 0
      feedback:
        - ["324", "That multiplies by 3.6. Metres per second is the smaller number: divide by 3.6."]
      explain: "90 × 1000 = 90 000 m in 3600 s: 90 000 ÷ 3600 = 25 m/s."
```

### Rate or ratio

Here is the routine.

```worked
\text{distance} \div \text{time} :: Divide what you want "per" by the "one" quantity.
150 \div 2.5 = 60 :: 150 km in 2.5 h.
60 \text{ km/h} :: Keep both units in the answer.
60 \div 3.6 \approx 16.7 \text{ m/s} :: To convert km/h to m/s, × 1000 ÷ 3600, which is ÷ 3.6.
```

### Find the mistake

Read Mia's working. Dollars per kilogram: which number goes first?

### Convert a speed

## Modify: convert and compare

```step
stage: modify
insight: "Converting speeds and prices and comparing two rates with the same unit shows unit rates make comparisons fair."
try: { playground: board, starter: "rate.yml#free", height: 520 }
tasks:
  - starter: "rate.yml#free"
    hint: ["The board shows m/s in its notes.", "25 m/s × 3.6 = 90 km/h."]
    check: { type: board, text: "Set the rate r (in km/h) so the speed is 25 m/s.", when: "m = 25", explain: "25 m/s = 25 × 3.6 = 90 km/h." }
  - check:
      type: number
      q: "Cheese costs $0.80 per 100 g. What is that in dollars per kilogram?"
      answer: 8
      tolerance: 0
      explain: "1 kg = 1000 g = 10 × 100 g: $0.80 × 10 = $8 per kg."
  - check:
      type: question
      q: "Rice: 600 g for $4.80, or 1 kg for $7.50. Which is the better buy?"
      options: ["The 1 kg bag: $7.50 per kg, against $8.00 per kg", "The 600 g bag: it costs less", "They are the same", "You cannot tell without more information"]
      answer: 0
      feedback: [null, "It costs less, but you get less: compare per kg.", "$4.80 ÷ 0.6 = $8.00 per kg.", "Unit rates make it fair."]
      explain: "4.80 ÷ 0.6 = $8.00 per kg, so 1 kg for $7.50 is cheaper per kilogram."
  - check:
      type: question
      q: "Your heart beats 18 times in 15 seconds. What is that in beats per minute?"
      options: ["72", "18", "33", "270"]
      answer: 0
      feedback: [null, "That is per 15 seconds.", "That adds the numbers.", "That multiplies 18 by 15."]
      explain: "A minute is 4 lots of 15 seconds: 18 × 4 = 72 beats per minute."
```

### m/s to km/h

### Price per kilogram

### Best buy

### Heart rate

## Practise: rates

```step
stage: practise
insight: "Unit rates, conversions and rate or ratio, mixed; dividing the wrong way is the planted slip; the simplest-ratio review keeps ratios separate from rates."
tasks:
  - check:
      type: number
      q: "A train travels 240 km in 3 hours. What is its speed in km per hour?"
      answer: 80
      tolerance: 0
      explain: "240 ÷ 3 = 80 km/h."
  - check:
      type: number
      q: "Convert 36 km/h to metres per second."
      answer: 10
      tolerance: 0
      explain: "36 ÷ 3.6 = 10 m/s."
  - check:
      type: number
      q: "A 2 kg bag of flour costs $3.40. What is the price in dollars per kilogram?"
      answer: 1.7
      tolerance: 0
      feedback:
        - ["0.59", "That is kilograms per dollar. Dollars per kilogram: 3.40 ÷ 2."]
      explain: "3.40 ÷ 2 = $1.70 per kg."
  - check:
      type: question
      q: "Review: what is the ratio 12 : 18 in simplest form?"
      options: ["2 : 3", "3 : 2", "6 : 9", "12 : 18 is already simplest"]
      answer: 0
      feedback: [null, "The order matters: 12 first.", "6 : 9 can be simplified further.", "Both divide by 6."]
      explain: "Divide both by 6: 2 : 3."
```

### Speed

### Convert

### Price per kg

### Review: ratios

## Make: a long drive

```step
stage: make
insight: "Choosing the rate and the time to match a distance makes students use the unit rate both ways."
try: { playground: board, starter: "rate.yml#free", height: 520 }
hint: ["280 ÷ 3.5 = ?", "The time is 3 and a half hours."]
check: { type: board, text: "A drive covers 280 km in 3.5 hours at a steady speed. Set the rate and the time to match.", when: "r = 80 and x = 3.5", explain: "280 ÷ 3.5 = 80 km/h." }
```

Then give the speed in metres per second, to 1 decimal place.
