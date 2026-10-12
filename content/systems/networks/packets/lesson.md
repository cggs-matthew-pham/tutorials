---
order: 2
unit: moving
node: AC9TDI8K02 n2
introduces: [packets]
shape: 5e
title: Packets
summary: "Data is sent as small numbered packets, not one long stream. Routers pass each packet on, so packets can take different routes, arrive out of order or get lost. The TCP protocol has the receiver confirm each packet; any packet not confirmed is sent again, and the numbers put the message back in order."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Your message to Ali is about to be chopped into pieces and scattered across a network. Can you get it there in one piece?"
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

## Engage: a message in pieces

```step
stage: predict
insight: "Committing to what Ali receives when the pieces carry only their letters sets up the new move: pieces travel separately, so they need numbers to be put back in order, and a way to replace any that go missing."
check:
  type: predict
  q: "The network chops your message into 4 pieces of 3 letters. Each piece finds its own way to Ali. The pieces carry their letters and nothing else. What will Ali's computer show?"
  options: ["MEET AT NOON, exactly as you sent it", "The pieces joined in a jumbled order, maybe with one missing", "Nothing, until every piece has arrived in order", "The message in order, because the routers sort the pieces"]
  actual: "Jumbled, and here a piece was lost as well. With nothing but letters, Ali's computer can only join the pieces in the order they arrive."
```

## Explore: get the message to Ali

```step
stage: run
insight: "Students make the message work by switching on the two things the lesson is about, in the order they need them: numbers fix the order, then TCP fills the gap the numbers reveal. Each failure is the reason for the next fix."
try: { playground: board, starter: "packets.yml#explore", height: 540 }
tasks:
  - check: { type: board, text: "Send it as it is. What does Ali get?", when: "q = 0 and t = 0 and a >= 1", explain: "The pieces arrived jumbled, and the one lost at busy router C is simply missing. Ali's computer had no way to know the right order, or that anything was lost." }
  - hint: ["Each piece needs something that says where it goes in the message.", "Switch on Numbers, then send again."]
    check: { type: board, text: "Fix the order. Switch on one thing, then send again.", when: "q = 1 and t = 0 and a >= 1", explain: "With numbers, Ali's computer puts the pieces back in order. Now it can also see that number 2 is missing: there is a gap ▢ where it should be." }
  - hint: ["Ali's computer knows which number is missing. Who could send it again?", "Switch on TCP, then send."]
    check: { type: board, text: "Fill the gap. Ali's computer can now see which number is missing. Switch on what you need, then send.", when: "q = 1 and t = 1 and k = 1 and r > 0", explain: "With TCP, Ali's computer confirms each piece it gets. Piece 2 was never confirmed, so it was sent again, and the numbers put it in its place." }
```

Was your prediction right? Watch which way each piece goes.

### Send it as it is

### Fix the order

### Fill the gap

## Explain: packets, routers and TCP

```step
stage: investigate
insight: "The teacher models the mission live, naming each part of what students just did: packets, routers, numbers, acknowledgements. Sam's mistake (resend everything) comes after the method."
tasks:
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

What you just did has names. The pieces are **packets**: each carries a piece of the data, a **number** and the address it is going to. **Routers** are the computers along the way; each one reads a packet's address and passes it on. **TCP** is the set of rules that has the receiver confirm (**acknowledge**) each packet, so any packet never confirmed is sent again. Your mission, one step at a time:

```worked
\text{MEE | T·A | T·N | OON} :: Split into 4 packets of 3 characters (· is the space). Each gets a number: 1 to 4.
\text{routes differ} :: Each router passes each packet on. Busy router C is slow.
\text{arrive: } 3, 1, 4 :: Packet 2 was lost at C; the others arrived out of order.
\text{TCP: confirm } 1, 3, 4 :: Ali's computer acknowledges each packet it gets. Packet 2 is never confirmed.
\text{packet 2 sent again} :: Only the missing packet is resent.
1, 2, 3, 4 \to \text{MEET AT NOON} :: The numbers put the message back in order.
```

### Find the mistake

### Why packets?

## Elaborate: when the network breaks

```step
stage: modify
insight: "The same idea in a new situation, one change at a time: a broken link (packets go round it), then every route broken (spare links are why networks keep working)."
try: { playground: board, starter: "packets.yml#elaborate", height: 520 }
tasks:
  - check: { type: board, text: "Roadworks cut the cable from C to E. Click that link to break it, then send. Does Ali still get the message?", when: "x > 0 and k = 1", explain: "The packets went round the broken link through D. The network keeps working because there is more than one route." }
  - check: { type: board, text: "How much can break before Ali is cut off? Break links until nothing can reach Ali, then try to send.", when: "u = 1", explain: "With every route broken, nothing gets through: that is why networks are built with spare links." }
```

### Roadworks

### Cut off

## Elaborate: the fast route

```step
stage: make
insight: "Reversing the process: instead of watching TCP recover a loss, students design the routes so nothing is lost and nothing waits."
try: { playground: board, starter: "packets.yml#make", height: 520 }
hint: ["Router C is busy: slow, and it loses packets.", "Break a link so no route goes through C.", "Breaking C to E is enough: every packet then goes through D."]
check: { type: board, text: "Ali needs the message fast, with nothing lost and nothing resent. Break links so every packet avoids busy router C, then send.", when: "x >= 1 and k = 1 and o = 0 and r = 0", explain: "With C cut off, every packet took the same route through D, so they arrived in order and none was lost. Real routers try to avoid busy routes for the same reason." }
```

Then: what would happen if D broke too?

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "A live video call doesn't wait for lost packets: it doesn't use TCP. A packet goes missing during a call. What do you notice?"
      options: ["A small glitch, and the call carries on", "The call freezes until the packet is sent again", "The whole call starts again", "Nothing: packets are never lost on calls"]
      answer: 0
      feedback: [null, "That is what TCP would do. A call that skips TCP never waits.", "Not even TCP resends the whole thing; only the missing packet.", "Calls go through the same busy routers as everything else."]
      explain: "On a live call a late packet is useless, so it is skipped and you see a glitch. For a file or a message, TCP waits for the missing packet, because every piece matters."
  - check: { type: reflect, text: "I compared my prediction with what Ali got, and I can explain why packets carry numbers and why TCP resends only the missing one." }
```

### Video calls

### Look back
