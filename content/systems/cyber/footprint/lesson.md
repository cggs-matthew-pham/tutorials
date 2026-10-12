---
order: 4
unit: accounts
node: [AC9TDI8P14 n1, AC9TDI8P14 n2, AC9TDI8P14 n3]
shape: 5e
title: Your digital footprint
summary: "Your digital footprint is everything apps record about you: what you give them, and what they collect as you use them (where you are, what you open, when). A good app collects only what its purpose needs. You manage your own footprint by checking settings, which often start open."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Ava typed three things into the club app. It knows eight things about her. Where did the other five come from?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8496
  url: http://127.0.0.1:8496/index.html
  readySelector: ".cycard"
  layout: full
explainPicture: { ref: cyber.yml#explain-pic, caption: "The club app's sign-up form: nine fields and settings to mark Needed or Not needed for its purpose, news about meetings." }
explainClip:
  query: { code: "@cyber.yml#explain", fresh: 1, id: explain }
  caption: "Given or collected?"
  say: "What the club app knows about Ava."
  clip:
    - click: "Your name: She gave it"
    - caption: { text: "Her name: she typed it in, so she gave it.", say: "Her name, she gave it." }
    - wait: 1000
    - click: "Where your phone is when you open the app: Collected as she used the app"
    - expect: { selector: "#gsum", contains: "2 of 8" }
    - caption: { text: "Where her phone is: she never typed it. The app collected it as she used it.", say: "Her location, she never typed it. The app collected it." }
    - wait: 1500
---
**Your mission:** the club app is about to launch. Find out what it records about members, cut what it doesn't need, and help Ava set up her own account.

## Engage: what does it know?

```step
stage: predict
insight: "Committing to what an app knows tests the new move: apps collect data you never type."
check:
  type: predict
  q: "Ava types her name, school email and one poll answer into the club app. What else could the app know about her?"
  options: ["Lots: where she is, what she opens, when, and what device she uses", "Nothing: only what she typed", "Only her password", "Only what her teacher tells it"]
  actual: "Lots. As she uses the app it can record where her phone is, which pages she opens and for how long, when she signs in, and her device."
```

## Explore: given or collected?

```step
stage: run
insight: "Students sort a week of data and meet the passive half of a footprint by getting some wrong first."
try: { playground: board, starter: "cyber.yml#explore", height: 600 }
check: { type: board, text: "Sort everything the app recorded about Ava: did she give it, or was it collected as she used the app?", when: "k = n", explain: "Four she gave (name, email, photo, poll answer), four collected as she used it (location, pages and time, device, sign-in times). The collected half is easy to forget." }
```

Was your prediction right?

## Explain: does it need it?

```step
stage: investigate
insight: "The teacher models judging one field against the app's purpose. Sam collects in case, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam builds the sign-up form. Click the line where it first goes wrong."
  answer: 3
  fault: logic
  misconception: more-data-better
  explain: "Line 3: news about meetings needs no birth date or home address. Data kept in case can still leak, and adds to every member's footprint."
```

Your **digital footprint** is all the data about you that systems record: what you give and what they collect as you use them.

```worked
\text{purpose} :: Start from what the app is for: news about club meetings.
\text{Name} :: Needed: news is addressed to a person.
\text{School email} :: Needed: that's how the news arrives.
\text{Home address} :: Not needed: nothing is posted. Collecting it adds risk and nothing else.
\text{test} :: For each item ask: would the app still do its job without it? If yes, don't collect it.
```

### Find the mistake

## Elaborate: the sign-up form

```step
stage: modify
insight: "One change at a time: the same form for two purposes, so the same field can be needed for one and not the other."
try: { playground: board, starter: "cyber.yml#club", height: 640 }
tasks:
  - starter: "cyber.yml#club"
    check: { type: board, text: "The app's purpose is news about meetings. Mark every field and setting Needed or Not needed.", when: "k = n", explain: "Name, year level and school email. Everything else is footprint without a purpose." }
  - starter: "cyber.yml#excursion"
    check: { type: board, text: "Now the same form is for the excursion to the science museum. Mark each one again.", when: "k = n", explain: "A parent or carer phone becomes needed: someone must be reachable on the day. The purpose decides, not the field." }
```

### News about meetings

### The excursion

## Elaborate: Ava's settings

```step
stage: make
insight: "Managing one's own footprint: students set an account to its most private while keeping what the app is for, and read each setting's trade-off."
try: { playground: board, starter: "cyber.yml#make", height: 560 }
hint: ["Read what each setting does before you change it.", "Meeting reminders are why Ava joined: keep those."]
check: { type: board, text: "Ava's settings came open. Make her account as private as it can be while she still hears about meetings.", when: "s = 4 and f = 1", explain: "Profile members only, location off, ask before tags, ads off, reminders on. Settings often start open; checking them is how you manage your footprint." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "A free quiz app asks to see your contacts and your location. Its purpose is quizzes. What should you do?"
      options: ["Say no to both: quizzes don't need them", "Say yes: it's free", "Say yes to contacts only", "Say yes, then delete the app later"]
      answer: 0
      feedback: [null, "Free apps often pay for themselves with your data.", "Your friends' numbers aren't yours to give, and quizzes don't need them.", "Data already collected stays collected."]
      explain: "Test each permission against the purpose. If it isn't needed, don't allow it."
  - check: { type: reflect, text: "I can name data an app collects without my typing it, and judge whether it needs it." }
```

### The quiz app

### Look back
