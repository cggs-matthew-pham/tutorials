---
order: 18
unit: time
node: [AC9M8M04 n1, AC9M8M04 n2]
title: Time zones
summary: "A city with a bigger UTC offset is ahead; a smaller offset is behind. Find the difference between the two offsets, then add or take it away; the day changes when you cross midnight. A flight's arrival time is the departure time plus the flight, changed to the local time where it lands."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You call your cousin in London after school and wake her up at 5 am. A flight from Sydney lands in Los Angeles before it took off. Time zones explain both."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8309
  url: http://127.0.0.1:8309/index.html
  readySelector: "#gsum"
  layout: full
explainPicture: { ref: zones.yml#explain, caption: "9:00 am Monday in Sydney is 6:00 am in Perth, 11:00 pm Sunday in London and 7:00 am in Tokyo." }
explainClip:
  query: { code: "@zones.yml#explain", fresh: 1, id: explain }
  caption: "One moment, four clocks"
  say: "Move Sydney's time, and every city moves with it."
  clip:
    - caption: { text: "9 am Monday in Sydney: London is still on Sunday night.", say: "Nine on Monday morning in Sydney. London is still on Sunday night." }
    - wait: 1200
    - caption: { text: "One hour later in Sydney: one hour later everywhere.", say: "One hour later in Sydney is one hour later everywhere." }
    - click: Make the time in Sydney later
    - click: Make the time in Sydney later
    - click: Make the time in Sydney later
    - click: Make the time in Sydney later
    - expect: { selector: "#gsum", contains: "Sydney 10:00" }
    - wait: 1500
---
Each place keeps its own clock, set by its **time zone**. A zone is written as its **offset** from UTC (Coordinated Universal Time). This lesson uses the offsets for most of October: Sydney UTC+11 (daylight saving, from early October to early April; UTC+10 the rest of the year), Perth UTC+8, Tokyo UTC+9, London UTC+1 (until late October) and Los Angeles UTC−7 (until early November).

To change a time from one zone to another, find the **difference** between the offsets. A place with a bigger offset is **ahead** (later); a smaller offset is **behind** (earlier). Go by the offsets, not the map: Los Angeles is east of Sydney across the Pacific, but across the International Date Line, so it is 18 hours behind. Add or take away the difference, and change the **day** if you cross midnight. **24-hour time** (21:30, not 9:30 pm) avoids mixing up morning and night.

For a flight: add the flight time to the departure time (in the departure zone), then change to the arrival zone.

## Predict: London on Monday morning

```step
stage: predict
insight: "Committing to London's time from Sydney's shows whether they take the difference the right way and change the day."
check:
  type: predict
  q: "It is 9:00 am Monday in Sydney (UTC+11). What time is it in London (UTC+1)?"
  options: ["11:00 pm Sunday", "7:00 pm Monday", "7:00 pm Sunday", "10:00 am Monday"]
  actual: "11:00 pm Sunday. London is 10 hours behind Sydney: 9:00 am − 10 hours goes back past midnight to 11:00 pm the day before."
```

Is London ahead of Sydney or behind?

## Run: one moment, four clocks

```step
stage: run
insight: "Moving one city's time and watching the others shows the fixed differences and the day changing at midnight."
try: { playground: board, starter: "zones.yml#run", height: 600 }
check: { type: board, text: "Was your prediction right? Now set Sydney to 14:00. What time is it in London?", when: "t = 14", explain: "14:00 in Sydney is 04:00 Monday in London: 10 hours behind." }
```

The slider sets Sydney's time; the other cities follow.

## Investigate: ahead and behind

```step
stage: investigate
insight: "Find the difference of the offsets and its direction (Kim adds for a place behind); the day changes at midnight; 24-hour time removes am and pm slips."
tasks:
  - check:
      type: number
      q: "It is 14:00 in Sydney (UTC+11). What hour is it in Perth (UTC+8), in 24-hour time?"
      answer: 11
      tolerance: 0
      feedback:
        - ["17", "Perth's offset is smaller: it is behind, so take 3 hours away."]
      explain: "Perth is 11 − 8 = 3 hours behind: 14:00 − 3 = 11:00."
  - check:
      type: bug
      code: "working.txt#kim"
      text: "Kim finds the time in London. Click the line where her working goes wrong."
      answer: 2
      fault: logic
      misconception: tz-wrong-direction
      explain: "Line 2: London's offset (+1) is smaller than Sydney's (+11), so London is behind: take 10 hours away. 9:00 am Monday becomes 11:00 pm Sunday."
  - check:
      type: question
      q: "Why do flight times use 24-hour time?"
      options: ["21:30 cannot be mixed up with 9:30 in the morning", "It is shorter to write", "Airports are open 24 hours", "It changes the time zone"]
      answer: 0
      feedback: [null, "Not the reason.", "Not the reason.", "The zone does not change."]
      explain: "With 12-hour time, a missing am or pm causes 12-hour mistakes."
```

### Perth

Here is the routine.

```worked
+11 - (+1) = 10 :: The difference between the offsets: 10 hours.
\text{London's offset is smaller} :: So London is behind Sydney.
09{:}00 - 10\ \text{h} = 23{:}00\ \text{the day before} :: Take it away, crossing midnight back to Sunday.
```

Now find Perth's time.

### Find the mistake

Read Kim's working. Is London ahead of Sydney or behind?

### 24-hour time

## Modify: going the other way, and flights

```step
stage: modify
insight: "Converting into the starting city, a flight across the date line, a working-hours overlap and a target time in another city."
try: { playground: board, starter: "zones.yml#run", height: 600 }
tasks:
  - starter: "zones.yml#run"
    hint: ["Sydney is 10 hours ahead of London.", "9:00 + 10 hours."]
    check: { type: board, text: "It is 9:00 am Monday in London. Set Sydney's time to match.", when: "v = 9 and y = 0", explain: "Sydney is 10 hours ahead: 19:00 (7:00 pm) Monday." }
  - starter: "zones.yml#flight"
    hint: ["Add the 14 hours on Sydney's clock first.", "Then take away the 18 hours between Sydney and Los Angeles."]
    check:
      type: number
      q: "A flight leaves Sydney at 22:00 on Friday and takes 14 hours. At what hour (24-hour time) does it land in Los Angeles (UTC−7)? Work it out, then check on the board."
      answer: 18
      tolerance: 0
      feedback:
        - ["12", "That is the landing time on Sydney's clock. Los Angeles is 18 hours behind."]
      explain: "22:00 + 14 h = 12:00 Saturday in Sydney; Los Angeles is 18 hours behind: 18:00 Friday. It lands before it left, by the clock."
  - check:
      type: question
      q: "An office in Sydney works 9:00 to 17:00, and one in London (10 hours behind) works 9:00 to 17:00 their time. Is there an hour when both are at work?"
      options: ["No: when Sydney starts at 9:00, it is 23:00 in London; when London starts, Sydney has gone home", "Yes: 9:00 to 17:00 in both", "Yes: 12:00 to 13:00", "Only on Mondays"]
      answer: 0
      feedback: [null, "Their 9:00 is not the same moment.", "Noon in Sydney is 2:00 am in London.", "The days do not matter here."]
      explain: "Sydney's working day is London's 23:00 to 07:00: no overlap. A meeting needs someone to start early or stay late."
  - starter: "zones.yml#run"
    hint: ["Perth is 3 hours behind Sydney.", "Perth's 9:00 is Sydney's 12:00."]
    check: { type: board, text: "Plan a call between Sydney and Perth that is between 9:00 and 17:00 in both cities. Set Sydney's time, then write the time in both.", when: "t >= 12 and t <= 17", explain: "Perth is 3 hours behind, so Sydney's 12:00 to 17:00 is Perth's 9:00 to 14:00." }
```

### London to Sydney

### A flight

### Two offices

### Plan a call

## Practise: time zones

```step
stage: practise
insight: "Conversions both ways, a duration, and 12- and 24-hour time, mixed; adding for a place behind is the planted slip; durations in one zone come first."
tasks:
  - check:
      type: number
      q: "It is 10:00 in Sydney (UTC+11). What hour is it in Perth (UTC+8), in 24-hour time?"
      answer: 7
      tolerance: 0
      feedback:
        - ["13", "Perth's offset is smaller: it is behind. Take 3 hours away."]
      explain: "Perth is 3 hours behind: 10:00 − 3 = 07:00."
  - check:
      type: number
      q: "A train leaves at 08:45 and arrives at 17:20 the same day (one time zone). How many minutes is the trip?"
      answer: 515
      tolerance: 0
      explain: "08:45 to 17:00 is 8 h 15 min; plus 20 min is 8 h 35 min = 515 minutes."
  - check:
      type: question
      q: "What is 21:45 in 12-hour time?"
      options: ["9:45 pm", "9:45 am", "10:45 pm", "11:45 pm"]
      answer: 0
      feedback: [null, "After 12:00 it is pm.", "21 − 12 = 9, not 10.", "21 − 12 = 9."]
      explain: "21 − 12 = 9: 9:45 pm."
  - check:
      type: number
      q: "It is 23:00 on Sunday in Perth (UTC+8). What hour is it in Sydney (UTC+11), in 24-hour time? (It is Monday there.)"
      answer: 2
      tolerance: 0
      explain: "23:00 + 3 hours = 02:00 on Monday."
  - check:
      type: number
      q: "A flight leaves Perth at 06:00 Perth time and lands in Sydney at 13:00 Sydney time. How many hours is the flight?"
      answer: 4
      tolerance: 0
      feedback:
        - ["7", "The two times are on different clocks. 06:00 in Perth is 09:00 in Sydney."]
      explain: "06:00 in Perth is 09:00 in Sydney; 09:00 to 13:00 is 4 hours."
```

### Sydney to Perth

### A trip's length

### 12-hour time

### Past midnight

### A flight's length

## Make: plan an arrival

```step
stage: make
insight: "Choosing a departure so an arrival lands in a window brings the offset, the flight and the day together."
try: { playground: board, starter: "zones.yml#plan", height: 600 }
hint: ["The flight is 14 hours and Los Angeles is 18 hours behind Sydney.", "Arrival (LA time) = departure + 14 − 18 = departure − 4."]
check: { type: board, text: "A 14-hour flight leaves Sydney on Saturday. Choose a departure time so it lands in Los Angeles between 9:00 and 12:00 local time.", when: "a >= 9 and a <= 12", explain: "Departure − 4 hours is the landing time: leave between 13:00 and 16:00." }
```

Then write both times for your flight, in 24-hour time with the day, as you would on a ticket.
