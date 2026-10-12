---
order: 2
unit: moving
node: AC9TDI8K02 n2
introduces: [packets]
shape: 5e
title: Packets
summary: "Data is sent as small numbered packets, not one long stream. You watch a message go to pieces, invent your own fix, then put names to it: routers pass packets on by different routes, numbers put them back in order, and TCP has the receiver confirm each one so a lost packet is sent again."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The internet never sends your message in one piece. So how does it ever arrive whole?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8471
  url: http://127.0.0.1:8471/index.html
  readySelector: ".nwbox"
  layout: full
explainPicture: { ref: packets.yml#explain-pic, caption: "A message on its way to Ali: numbered packets, six routers and more than one route." }
explainClip:
  query: { code: "@packets.yml#explain", fresh: 1, id: explain }
  caption: "Sending in packets"
  say: "The message is split into numbered packets."
  clip:
    - caption: { text: "MEET AT NOON becomes 4 packets of 3 characters.", say: "Four numbered packets set off." }
    - click: { selector: "button.go" }
    - wait: 3200
    - caption: { text: "Router C is busy: packet 2 is lost, and the others take different routes.", say: "One is lost. The others arrive out of order." }
    - wait: 4200
    - expect: { selector: "#gsum", contains: "Delivered" }
    - caption: { text: "TCP asks for packet 2 again; the numbers put the message back in order.", say: "The missing packet is sent again, and the numbers fix the order." }
    - wait: 1800
---

**Your mission:** get the message **MEET AT NOON** to your friend Ali, across a network of six routers. One of them, router C, is busy.

## Engage: one message, many pieces

```step
stage: predict
insight: "Students say what they already think before anything is named. Most picture one pipe from sender to receiver; writing it down makes the surprise in Explore theirs, and gives the teacher their ideas to work with."
check:
  type: predict
  q: "The internet never sends a message in one piece. MEET AT NOON is chopped into 4 pieces, and each piece finds its own way to Ali through routers, some of them busy. What could go wrong on the way? Write your best guess."
  actual: "The pieces took different routes, so they arrived in a different order, and one was lost at busy router C. With nothing but letters on them, Ali's computer just joined them in the order they came."
```

When you send a message, a photo or a video, it is chopped into small pieces. The pieces travel separately, through computers run by other people, and some of those computers are busy. There is no right answer yet: write what you think.

## Explore: what happens to the pieces?

```step
stage: run
insight: "Open investigation before any explanation. Students watch the pieces, change things, and record what they saw. Nothing on this board is a fix, and nothing is named: the sort separates what they saw from what they assumed."
try: { playground: board, starter: "packets.yml#explore", height: 540 }
tasks:
  - check: { type: board, text: "Send the message at least three times. Follow the pieces: which way does each one go, and what does Ali get?", when: "f >= 3", explain: "The same thing happens every time: the pieces split up at the first routers, one goes missing at C, and the rest arrive in a different order from how they left." }
  - check:
      type: sort
      q: "Sort what you saw on the board."
      options: ["I saw this", "I didn't see this"]
      items:
        - ["The pieces took different routes to Ali", "I saw this", "Some went through C, some through D."]
        - ["A piece went missing at router C", "I saw this", "It was lost at the busy router and never arrived."]
        - ["The pieces arrived in a different order from how they left", "I saw this", "The route through D is quicker than the one through busy C."]
        - ["The routers put the pieces back in order", "I didn't see this", "Routers only pass pieces on. Nothing on the way sorted them."]
        - ["Ali's computer showed where a piece was missing", "I didn't see this", "It just joined what came. With only letters on the pieces, it can't tell anything is missing."]
        - ["The missing piece was sent again", "I didn't see this", "Nothing asked for it, so nothing sent it."]
      explain: "Pieces go their own ways, can be lost, and arrive in any order. Nothing on the way fixes that, and Ali's computer has nothing to fix it with."
  - check: { type: board, text: "Try your own changes: a different piece size, or click a link to break it. Send after each change. What makes things better, and what makes them worse?", when: "(n - 4)^2 + x >= 1 and f >= 4", explain: "Smaller pieces just make more pieces to jumble. Breaking links changes the routes: if no piece can reach busy C, the message gets through. Keep that in mind for the next board." }
```

Your guess from the start is beside the board. Compare it with what happens.

### Watch the pieces

### What did you see?

### Try your own changes

## Explore: invent a fix

```step
stage: run
insight: "Students invent the fix before it has a name. The board offers two plain switches, Numbers and Ask again, and two goals with more than one route to success: keeping every link means needing both switches; with the switches off, the only way is to avoid busy C. The two fixes set up the question Explain answers: why the internet chose the first."
try: { playground: board, starter: "packets.yml#invent", height: 560 }
tasks:
  - hint: ["What would Ali's computer need on each piece to know where it goes?", "Numbers put the pieces in order, and show a gap where one is missing. What could fill the gap?", "Switch on Numbers and Ask again, then send."]
    check: { type: board, text: "Get MEET AT NOON to Ali exactly, with every link working and router C still busy. Use the switches however you like.", when: "k = 1 and x = 0", explain: "Numbers let Ali's computer put the pieces in order and see that number 2 was missing. Ask again had it confirm each piece it got, so the one never confirmed was sent again." }
  - hint: ["The trouble starts at router C.", "Click links to break them so that no piece can go near C.", "Break the link from C to E, then send."]
    check: { type: board, text: "Now find a different way, with both switches off.", when: "k = 1 and q = 0 and t = 0", explain: "With C cut off, every piece took the same route through D, so they arrived in order and none was lost." }
```

There is more than one way to get the message there. Find two.

### Keep every link

### Switches off

## Explain: what you invented has names

```step
stage: investigate
insight: "Students explain first, in their own words, from what they did; only then are the words packet, router, acknowledgement and TCP attached to their idea. Comparing their two fixes answers why the internet numbers and resends rather than avoiding busy routers. Sam's mistake comes after the method."
tasks:
  - check:
      type: reasoning
      q: "In your own words: how did your first fix get the whole message to Ali, in order, with every link working? Say what each piece carried and what Ali's computer did."
      placeholder: "For example: put a ... on each piece, so ..."
      steps:
        - ["Each piece carried a number as well as its letters.", "so Ali's computer knows where each piece goes"]
        - ["Ali's computer put the pieces in order by their numbers.", "they took different routes, so they arrived in a different order"]
        - ["It confirmed each piece it got, and saw that number 2 was missing.", "a gap in the numbers shows what was lost"]
        - ["Only piece 2 was sent again.", "it was the only piece never confirmed"]
      picks:
        - step: 4
          q: "Why was only piece 2 sent again?"
          options: ["It was the only piece Ali's computer never confirmed", "The whole message has to be sent again", "Router C kept a copy and passed it on later", "Every piece is sent twice anyway"]
          answer: 0
          feedback: [null, "Watch the board: only one piece went round again.", "C lost the piece; it was sent again from you.", "Only the missing piece went again."]
      criteria: ["I said what each piece carries.", "I said where the pieces are put back in order.", "I said what happens to a lost piece, and why only that one goes again."]
      explain: "Numbers put the pieces in order and show the gap; confirming each piece means only the one never confirmed is sent again."
  - check:
      type: match
      q: "Match each name to what you did on the board."
      pairs:
        - ["Packet", "A piece of the message, with its number and where it is going"]
        - ["Router", "A computer on the way that passes each piece on"]
        - ["Acknowledgement", "Ali's computer confirming a piece arrived"]
        - ["TCP", "The rules your Ask again switch followed: confirm each piece, send again any that isn't confirmed"]
      explain: "Your Numbers and Ask again switches are how TCP works: numbered packets, acknowledged by the receiver, with unacknowledged ones sent again."
  - check:
      type: question
      q: "Your second fix, cutting off router C, also worked, with no numbers at all. Why does the internet use numbers and resending instead?"
      options: ["Nobody knows ahead of time which router will be busy or which link will break, so every message needs a way to recover", "Cutting links is against the rules of the internet", "Numbered packets travel faster", "Routers can only pass on numbered packets"]
      answer: 0
      feedback: [null, "It worked here because you knew C was the problem. Would you know that for every message?", "Numbers don't change the speed; they let the receiver fix the order.", "Your unnumbered pieces were passed on fine."]
      explain: "You could avoid C because you could see it was busy. Real networks change all the time, so the receiver needs a way to fix whatever happens: numbers and acknowledgements."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains what happens to a lost packet. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: resend-whole-message
      explain: "Line 3: with TCP, the receiver confirms each packet it gets. Only the packet that was never confirmed is sent again, not the whole message."
```

### Explain it yourself

Before you see any new words, write how your first fix worked, your own way. Notes are fine. Then compare with a model.

### Give it names

What you invented has names. The pieces are **packets**: each carries a piece of the data, a **number** and the address it is going to. **Routers** are the computers along the way; each one reads a packet's address and passes it on. When Ali's computer confirms a packet, that is an **acknowledgement**. Your Ask again switch was **TCP**: the set of rules that has the receiver acknowledge each packet, so any packet never acknowledged is sent again. Your first fix, step by step:

```worked
\text{MEE | T·A | T·N | OON} :: Split into 4 packets of 3 characters (· is the space). Each gets a number: 1 to 4.
\text{routes differ} :: Each router passes each packet on. Busy router C is slow.
\text{arrive: } 3, 1, 4 :: Packet 2 was lost at C; the others arrived out of order.
\text{TCP: acknowledge } 1, 3, 4 :: Ali's computer confirms each packet it gets. Packet 2 is never confirmed.
\text{packet 2 sent again} :: Only the missing packet is resent.
1, 2, 3, 4 \to \text{MEET AT NOON} :: The numbers put the message back in order.
```

### Two fixes

### Find the mistake

## Elaborate: when the network breaks

```step
stage: modify
insight: "The idea in new situations, one change at a time: TCP and spare routes working together when a link breaks, every route broken, then live video, where resending is the wrong choice."
try: { playground: board, starter: "packets.yml#elaborate", height: 520 }
tasks:
  - check: { type: board, text: "Roadworks cut the cable from D to E. Click that link to break it, then send. Now every packet has to go through busy C. Does Ali still get the message?", when: "x >= 1 and k = 1", explain: "Every packet went through C, and packet 2 was lost there, but TCP had it sent again. Spare routes and resending together keep the network working." }
  - check: { type: board, text: "How much can break before Ali is cut off? Break links until nothing can reach Ali, then try to send.", when: "u = 1", explain: "With every route broken, nothing gets through, however good TCP is. That is why networks are built with spare links." }
  - check:
      type: question
      q: "A live video call doesn't wait for lost packets: it doesn't use TCP. A packet goes missing during a call. What do you notice?"
      options: ["A small glitch, and the call carries on", "The call freezes until the packet is sent again", "The whole call starts again", "Nothing: packets are never lost on calls"]
      answer: 0
      feedback: [null, "That is what TCP would do. A call that skips TCP never waits.", "Not even TCP resends the whole thing; only the missing packet.", "Calls go through the same busy routers as everything else."]
      explain: "On a live call a late packet is useless, so it is skipped and you see a glitch. For a file or a message, TCP waits for the missing packet, because every piece matters."
```

### Roadworks

### Cut off

### Video calls

## Evaluate: look back

```step
stage: info
insight: "A transfer question in a situation students know, then students judge their own understanding against the goals and against what they wrote in Engage."
tasks:
  - check:
      type: question
      q: "A download sits at 99% for a few seconds, then finishes. What was probably happening?"
      options: ["A few packets were lost, and the computer was waiting for them to be sent again", "The whole file was being downloaded a second time", "The routers were putting the packets in order", "The last packet is always the biggest"]
      answer: 0
      feedback: [null, "Only missing packets are sent again, not the whole file.", "The receiver puts packets in order, not the routers.", "Packets are about the same size."]
      explain: "TCP waits until every packet has been acknowledged. A few lost near the end means a short wait while they are sent again."
  - check: { type: reflect, text: "I read my guess from the start again, and I can say what I would add or change now." }
  - check: { type: reflect, text: "I can explain why data is sent in packets, what happens when one is lost, and how TCP gets the whole message there in order." }
```

### Downloads

### My first guess

### I can
