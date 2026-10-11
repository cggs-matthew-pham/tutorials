---
order: 2
unit: moving
node: AC9TDI8K02 n2
introduces: [packets]
title: Packets
summary: "Data is sent as small numbered packets, not one long stream. Routers pass each packet on, so packets can take different routes, arrive out of order or get lost. The TCP protocol has the receiver confirm each packet; any packet not confirmed is sent again, and the numbers put the message back in order."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "When you send a message, it doesn't travel in one piece. It is chopped up, scattered across the internet and rebuilt. How does it come back together?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8471
  url: http://127.0.0.1:8471/index.html
  readySelector: ".nwbox"
  layout: full
explainPicture: { ref: packets.yml#explain-pic, caption: "A message on its way: numbered packets, six routers and more than one route from you to your friend." }
explainClip:
  query: { code: "@packets.yml#explain", fresh: 1, id: explain }
  caption: "Sending in packets"
  say: "The message is split into numbered packets."
  clip:
    - caption: { text: "HELLO WORLD becomes 4 packets of 3 characters.", say: "Four numbered packets set off." }
    - click: { selector: "button.go" }
    - wait: 3200
    - caption: { text: "Router C is busy: packet 2 is lost, and the others take different routes.", say: "One is lost. The others arrive out of order." }
    - wait: 4200
    - expect: { selector: "#gsum", contains: "Delivered" }
    - caption: { text: "TCP asks for packet 2 again; the numbers put the message back in order.", say: "The missing packet is sent again, and the numbers fix the order." }
    - wait: 1800
---
Data isn't sent as one long stream. It is split into small **packets**. Each packet carries a piece of the data, a **number** and the address it is going to. **Routers** are the computers along the way that pass packets on, choosing a route for each one.

## Predict: back in order

```step
stage: predict
insight: "Committing to how the receiver gets the order right tests the new move before students see it: packets are numbered, can arrive in any order, and are sorted by number."
check:
  type: predict
  q: "A message is split into 4 numbered packets, and they take different routes to your friend. How does your friend's computer get the words in the right order?"
  options: ["It sorts the packets by their numbers", "Packets always arrive in the order they were sent", "It guesses from the words", "The routers keep them in order"]
  actual: "It sorts them by their numbers. Packets on different routes often arrive out of order, and some get lost, so each one carries its number."
```

## Try: send a message

```step
stage: run
insight: "Sending the message settles the prediction: packets arrive out of order (and one is sent again), then the numbers put them back."
try: { playground: board, starter: "packets.yml#run", height: 520 }
check: { type: board, text: "Press Send and watch. In what order did the packets arrive? Did the message come out right?", when: "o = 1 and k = 1", explain: "The packets arrived out of order and one was lost at the busy router and sent again, but the numbers put HELLO WORLD back together." }
```

Was your prediction right? Watch which route each packet takes.

## Worked example: one message, four packets

```step
stage: investigate
insight: "Following HELLO WORLD from split to reassembly models the new move, including a lost packet and TCP's acknowledgements. Sam thinks a lost packet means starting again, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "A message is 12 characters long. Each packet carries 3 characters. How many packets?"
      answer: "4"
      feedback:
        - ["36", "Divide, don't multiply: 12 characters shared into packets of 3."]
        - ["3", "3 is the size of each packet."]
      explain: "12 ÷ 3 = 4 packets."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains what happens to a lost packet. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: resend-whole-message
      explain: "Line 3: with TCP, the receiver confirms each packet it gets. Only the packet that was never confirmed is sent again, not the whole message."
  - check:
      type: question
      q: "Why split data into packets at all?"
      options: ["Many messages can share the same links, packets can go round busy or broken parts, and only a lost piece needs sending again", "Packets are encrypted, so they are safe", "Small packets are always faster than one big one", "Routers can't carry anything bigger than one letter"]
      answer: 0
      feedback: [null, "Packets are not encrypted unless the data was encrypted first.", "Each packet also carries its number and address, so there is a small cost; the benefits are sharing and recovery.", "Real packets carry about 1500 bytes."]
      explain: "Packets let everyone share the network, find a way round problems, and fix losses cheaply."
```

### Split, send, rebuild

```worked
\text{HEL | LO· | WOR | LD} :: Split into 4 packets of 3 characters (· is the space). Each gets a number: 1, 2, 3, 4.
\text{routes differ} :: Routers send packets different ways; the busy router C is slow.
\text{arrive: } 1, 3, 4 :: Packet 2 was lost at router C; 3 and 4 came another way.
\text{TCP: confirm each packet} :: The receiver confirms 1, 3 and 4. Packet 2 is never confirmed.
\text{packet 2 sent again} :: Only the missing packet is resent.
1, 2, 3, 4 \to \text{HELLO WORLD} :: The numbers put the message back in order.
```

Now count the packets for a 12-character message.

### Find the mistake

### Why packets?

## Vary: change one thing

```step
stage: modify
insight: "Each task changes one thing about the network: TCP off, TCP on again, a broken link, then no route at all, then what a router decides."
try: { playground: board, starter: "packets.yml#modify", height: 520 }
tasks:
  - check: { type: board, text: "Switch TCP off and send. What does your friend get?", when: "t = 0 and f >= 1 and k = 0", explain: "A gap: without TCP nobody asks for the lost packet, so the message arrives with a piece missing." }
  - check: { type: board, text: "Switch TCP on again and send.", when: "t = 1 and k = 1 and r > 0", explain: "The lost packet is asked for and sent again, so the whole message arrives." }
  - check: { type: board, text: "Click the link from C to E to break it, then send.", when: "x > 0 and k = 1", explain: "The packets go round the broken link through D. The network keeps working because there is more than one route." }
  - check: { type: board, text: "Break links until nothing can reach your friend, then try to send.", when: "u = 1", explain: "With every route broken, nothing gets through: that is why networks are built with spare links." }
  - check:
      type: question
      q: "What does a router do with each packet?"
      options: ["Reads its address and passes it on towards that address", "Reads the message and checks the spelling", "Keeps it until the whole message arrives", "Sends it back to the sender"]
      answer: 0
      feedback: [null, "Routers look only at the address, not the contents.", "Routers pass packets on straight away.", "Only lost packets are re-sent, by the sender, when asked."]
      explain: "A router reads the address and forwards the packet along a route towards it."
```

### TCP off

### TCP on

### A broken link

### No route

### What routers do

## Practise: packets

```step
stage: practise
insight: "Counting packets, putting packets back in order, what TCP's acknowledgements do, and a review of link properties."
tasks:
  - check:
      type: answer
      q: "A 20-character message is sent 4 characters a packet. How many packets?"
      answer: "5"
      feedback:
        - ["80", "Divide: 20 ÷ 4."]
        - ["4", "4 is the size of each packet."]
      explain: "20 ÷ 4 = 5 packets."
  - check:
      type: question
      q: "Three packets arrive in this order: #3 **·DAY**, #1 **GO**, #2 **OD** (· is a space). What message does the receiver show?"
      options: ["GOOD DAY", "·DAYGOOD", "DAY GOOD", "GOOD"]
      answer: 0
      feedback: [null, "That is arrival order. The receiver sorts by number.", "Sort by the numbers 1, 2, 3.", "Packet 3 arrived too."]
      explain: "Sorted 1, 2, 3: GO + OD + ·DAY = GOOD DAY."
  - check:
      type: question
      q: "In TCP, what is an acknowledgement?"
      options: ["A message back saying a packet arrived", "A packet's number", "A password for the network", "An error message"]
      answer: 0
      feedback: [null, "The number puts packets in order; the acknowledgement confirms they arrived.", "TCP isn't about passwords.", "It means the packet arrived fine."]
      explain: "The receiver acknowledges each packet. One that is never acknowledged is sent again."
  - check:
      type: question
      q: "Review: which link usually loses the most packets?"
      options: ["Wi-Fi far away through walls", "A cable", "Fibre", "They all lose the same"]
      answer: 0
      feedback: [null, "Cables are the most reliable.", "Fibre is very reliable.", "Wireless loses more."]
      explain: "Distance and walls weaken Wi-Fi, so more packets get lost and TCP has more to resend."
```

### Count packets

### Sort by number

### Acknowledgements

### Review: links

## Make: avoid the busy router

```step
stage: make
insight: "Breaking links to steer every packet away from the busy router reverses the process: students use routes to get the message there in order, with nothing lost."
try: { playground: board, starter: "packets.yml#make", height: 520 }
hint: ["Router C is busy: slow, and it loses packets.", "Break a link so no route goes through C.", "Breaking C to E is enough: every packet then goes through D."]
check: { type: board, text: "Break links so the message arrives in order with nothing sent again, then send it.", when: "x >= 1 and k = 1 and o = 0 and r = 0", explain: "With C cut off, every packet took the same route through D, so they arrived in order and none was lost. Real routers try to avoid busy routes for the same reason." }
```

Then: what would happen if D broke too?
