---
order: 4
unit: safe
node: AC9TDI8K02 n5
title: Across the internet
summary: "Buying something online uses everything at once: your browser encrypts the data (HTTPS), it is split into packets, the packets cross Wi-Fi and then cables, routers pass them on by different routes, TCP gets any lost packet sent again, and the shop puts them in order and decrypts them."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You press Buy. Less than a second later, a shop on the other side of the world has your order, and nobody on the way could read your card number. What happened in between?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8470
  url: http://127.0.0.1:8470/index.html
  readySelector: ".nwbox"
  layout: full
explainPicture: { ref: journey.yml#explain-pic, caption: "The journey of a purchase: Wi-Fi (wireless) to the home router, fibre (wired) to the provider, then routers to the shop. HTTPS keeps it encrypted the whole way." }
explainClip:
  query: { code: "@journey.yml#explain", fresh: 1, id: explain }
  caption: "One purchase, start to finish"
  say: "Press buy, and follow the card number."
  clip:
    - caption: { text: "Encrypted, split, Wi-Fi, fibre, routers…", say: "Encrypted, split into packets, then Wi-Fi and fibre." }
    - click: { selector: "button.go" }
    - wait: 5000
    - caption: { text: "…a lost packet sent again, put in order, decrypted by the shop.", say: "A lost packet is sent again; the shop rebuilds and decrypts it." }
    - wait: 4000
    - expect: { selector: "#gsum", contains: "Delivered" }
    - wait: 800
---
Each lesson in this course showed one part of how the internet works: links, packets, TCP and encryption. A single purchase online uses all of them at once. The board shows the trip from your laptop to an online shop, with a step-by-step log of what happens.

## Predict: where is it encrypted?

```step
stage: predict
insight: "Committing to where the card number is encrypted tests the integration: encryption must happen on your device, before the first link, or every link after it is exposed."
check:
  type: predict
  q: "Your card number travels from your laptop to an online shop. Where does it get encrypted?"
  options: ["On your laptop, before it leaves", "At your home router", "At the internet provider", "At the shop, when it arrives"]
  actual: "On your laptop, by the browser (HTTPS), before it leaves. Anywhere later would leave the first part of the trip, including the Wi-Fi, readable."
```

## Try: buy something

```step
stage: run
insight: "Sending with HTTPS on and reading the log settles the prediction and lays out the whole chain in order."
try: { playground: board, starter: "journey.yml#run", height: 560 }
check: { type: board, text: "Press Send and read the log as it fills in. Where was the data encrypted, and what happened to the lost packet?", when: "h = 1 and k = 1", explain: "Encrypted on the laptop first, split into packets, sent over Wi-Fi then fibre, routed, one packet sent again by TCP, put back in order and decrypted by the shop." }
```

Was your prediction right? Which parts of the trip were wireless, and which wired?

## Worked example: the whole chain

```step
stage: investigate
insight: "Labelling each stage of the journey with the idea from earlier lessons models the integration. Sam encrypts at the router, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "Which part of this journey is wireless?"
      options: ["Laptop to the home router (Wi-Fi)", "Home router to the provider", "Provider to the shop", "None of it"]
      answer: 0
      feedback: [null, "That part is fibre: wired.", "Those are wired links between routers.", "The first hop is Wi-Fi."]
      explain: "Only the first hop is wireless here. Most of the internet is cables and fibre, including under the sea."
  - check:
      type: bug
      code: "steps.txt#sam"
      text: "Sam describes how the card number is protected. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: encrypt-at-router
      explain: "Line 3: the browser encrypts the data on the laptop (HTTPS) before it is sent. If the router did it, the packets would cross the Wi-Fi as plain text, where anyone nearby could copy them."
  - check:
      type: question
      q: "With HTTPS **off**, who could read the card number?"
      options: ["Anyone on the Wi-Fi or any network along the way", "Only the shop", "Nobody, because it is split into packets", "Only the internet provider"]
      answer: 0
      feedback: [null, "Everyone on the path gets a copy.", "Splitting into packets doesn't hide anything: each packet is readable.", "Everyone on the path, not just the provider."]
      explain: "Without encryption, every link and router on the way handles readable packets."
```

### Follow the purchase

```worked
\text{encrypt (HTTPS)} :: On the laptop, before anything is sent (Who can see your data?).
\text{split into packets} :: Numbered packets (Packets).
\text{Wi-Fi, then fibre} :: Wireless first, then wired links (Wired or wireless).
\text{routers, different routes} :: Each packet is passed on towards the shop.
\text{lost packet sent again} :: TCP: the shop never confirmed it, so it was resent.
\text{reorder, decrypt} :: The shop rebuilds the message by number and decrypts it with its key.
```

Now pick out the wireless part.

### Find the mistake

### HTTPS off

## Vary: change one thing

```step
stage: modify
insight: "Each task changes one setting of the journey: HTTPS off, HTTPS on again, then which property or protocol is responsible for each experience."
try: { playground: board, starter: "journey.yml#modify", height: 560 }
tasks:
  - check: { type: board, text: "Switch HTTPS off and send. What does Eve see?", when: "h = 0 and f >= 1 and v = 1", explain: "The card number crosses the Wi-Fi in plain text, so Eve reads it." }
  - check: { type: board, text: "Switch HTTPS back on and send.", when: "h = 1 and f >= 1 and v = 0 and k = 1", explain: "Eve sees only scrambled text; the shop decrypts it." }
  - check:
      type: question
      q: "The page takes ages to load at the far end of the house. Which part of the journey is most likely to blame?"
      options: ["The Wi-Fi hop: distance and walls", "The fibre to the provider", "The shop's encryption", "TCP"]
      answer: 0
      feedback: [null, "Fibre is fast and reliable.", "Encryption takes almost no time.", "TCP helps when packets are lost; the cause is the weak Wi-Fi."]
      explain: "A weak Wi-Fi link loses packets and adds delay, so TCP has to keep resending."
  - check:
      type: question
      q: "Without TCP, what would the shop receive when a packet is lost?"
      options: ["A card number with a piece missing", "The whole number anyway", "Nothing at all", "Someone else's order"]
      answer: 0
      feedback: [null, "Nobody would ask for the lost packet.", "The other packets still arrive.", "Packets carry the shop's address."]
      explain: "A gap: that is why orders and payments use TCP."
```

### HTTPS off

### HTTPS on

### Slow at the far end

### Without TCP

## Practise: the internet

```step
stage: practise
insight: "Spotting where each idea appears in everyday internet use, and a review of encryption."
tasks:
  - check:
      type: question
      q: "You watch a video on the school bus on mobile data. Which part of the trip is wireless?"
      options: ["Phone to the mobile tower", "The fibre between cities", "The video company's servers", "None"]
      answer: 0
      feedback: [null, "Fibre is wired.", "Servers are wired into the network.", "The first hop is wireless."]
      explain: "Phone to tower is wireless; from the tower onwards it is mostly fibre."
  - check:
      type: question
      q: "Which protocol puts a web page's packets back in order and asks for lost ones?"
      options: ["TCP", "HTTPS", "Wi-Fi", "Fibre"]
      answer: 0
      feedback: [null, "HTTPS encrypts; TCP handles order and losses.", "Wi-Fi is a kind of link.", "Fibre is a kind of cable."]
      explain: "TCP numbers, acknowledges and resends packets."
  - check:
      type: question
      q: "Review: a message was encrypted with key 2. You receive **JK**. What did it say?"
      options: ["HI", "LM", "JK", "IJ"]
      answer: 0
      feedback: [null, "Decrypt by moving back 2, not forward.", "It needs decrypting.", "That is back 1."]
      explain: "J → H and K → I: HI."
```

### Mobile video

### Which protocol?

### Review: decrypt

## Make: put the journey in order

```step
stage: make
insight: "Ordering the whole journey from scratch reverses the board: students rebuild the chain themselves, with one wrong step left out."
check:
  type: parsons
  code: "steps.txt#order"
  extra: ["Your home router encrypts the card number."]
  text: "Put the journey of an online purchase in order. One line doesn't belong."
  explain: "Encrypt on the laptop, split into packets, Wi-Fi, cables and fibre, routers, TCP, put back in order, decrypt at the shop. The router never encrypts it: by then it would already have crossed the Wi-Fi."
```

Then: which steps would change if you used mobile data instead of home Wi-Fi?
