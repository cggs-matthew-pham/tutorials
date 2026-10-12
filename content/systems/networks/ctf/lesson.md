---
order: 5
unit: ctf
node: [AC9TDI8K02 n2, AC9TDI8K02 n5]
shape: 5e
title: Network capture the flag
summary: "Four flags hidden in the club's own network traffic, each found with an idea from this course: which packets anyone on the Wi-Fi could read, putting packets back in number order, which packet TCP must ask for again, and the quickest route round an overloaded router. Then fix every device that still sends readable data."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The club's network is sending its secrets where anyone can pick them up. Find four of them before someone else does."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8545
  url: http://127.0.0.1:8545/index.html
  readySelector: ".cywrap"
  layout: full
explainPicture: { ref: netctf.yml#explain-pic, caption: "Eight routers from A to H, with each link's delay in milliseconds. Router E is overloaded and loses packets." }
explainClip:
  query: { code: "@netctf.yml#explain", fresh: 1, id: explain }
  caption: "Build a route"
  say: "Get the message from A to H."
  clip:
    - click: "Router A"
    - click: "Router C"
    - click: "Router E"
    - caption: { text: "A, C, E: quick links, but E is overloaded.", say: "A, C, then E. Quick, but E is overloaded." }
    - wait: 1000
    - click: "Router G"
    - click: "Router H"
    - expect: { selector: "#gsum", contains: "12 ms" }
    - caption: { text: "12 ms, but packets get lost at E and have to be sent again. Is there a route that avoids it?", say: "Twelve milliseconds, but packets get lost at E." }
    - wait: 1500
---
A **capture the flag** (CTF) is a security challenge: you look for what a system gives away, with permission, and each find is a **flag**, a secret like **WP{…}** to type in. This is the club's own network, and you're checking it for the club. Each flag needs one idea from this course.

## Engage: who can see it?

```step
stage: predict
insight: "Committing to what others on a shared Wi-Fi can pick up frames the hunt: unencrypted data is readable to anyone on the network."
check:
  type: predict
  q: "A device on the club Wi-Fi sends a message without HTTPS. Who could read it?"
  options: ["Anyone on the same network who picks it up, and anyone along its way", "Only the device it was sent to", "Only people without the Wi-Fi password", "Nobody: Wi-Fi scrambles everything"]
  actual: "Anyone on the network or along the way who captures it. Only encryption all the way (HTTPS) keeps it private."
```

## Explore: four flags

```step
stage: run
insight: "Each flag needs one idea from the course applied to the club's traffic; the hints escalate and never give the flag."
try: { playground: board, starter: "netctf.yml#capture", height: 600 }
tasks:
  - starter: "netctf.yml#capture"
    hint: ["Open every packet.", "Scrambled packets were encrypted. Which ones can you read?"]
    check:
      type: flag
      q: "Flag 1 (who can see your data?). This capture shows what anyone on the club Wi-Fi could pick up. One readable packet holds the flag."
      hash: 5312e974dc85a2b34a337387658f47a50de343b23d6637345ee68db317b5f06b
      explain: "The Room 12 display sends plain text. The HTTPS packets were scrambled for everyone but the device and its site."
  - starter: "netctf.yml#reorder"
    hint: ["The packets took different routes, so they arrived out of order.", "Each packet carries its number. Put them back from 1 up."]
    check:
      type: flag
      q: "Flag 2 (packets). A message from the club server arrived out of order. Put the packets back in order and read it."
      hash: 093f1308490ca0800a0304724e67f71dfb16eff6ebadd6eb1b0e5e04b83dc3bc
      explain: "The numbers let the receiver rebuild the message whatever order the packets arrive in."
  - starter: "netctf.yml#lost"
    hint: ["Check the numbers from 1 to 16 one at a time.", "Which number isn't there?"]
    check:
      type: flag
      q: "Flag 3 (TCP). One packet of the backup never arrived. Which one must TCP ask for again? The flag is WP{resend- then its number, then }."
      hash: 40e0b52a7b0c2825dbbd4a02607e0d386e4feb8e6ae45f6295048c9341ff4591
      explain: "Packet 11. Because packets are numbered, TCP can ask for just the missing one, not the whole backup."
  - starter: "netctf.yml#route"
    hint: ["Try a few routes from A to H and compare their delays.", "The quickest routes go through E, which loses packets. Avoid it.", "Add up the delays for every route that avoids E."]
    check:
      type: flag
      q: "Flag 4 (routes). Find the quickest route from A to H that avoids the overloaded router E. The flag is WP{ then the routers' letters in order, then }."
      hash: 15e7b659e641aca2a3e124c08abf4105e50662eb6287c706b592fa4cd44c6808
      explain: "A, B, D, G, H: 19 ms. Routes through E are quicker on paper (12 ms) but lose packets; routers send traffic round trouble the same way."
```

### Flag 1: the capture

### Flag 2: out of order

### Flag 3: the lost packet

### Flag 4: the route

## Explain: what the flags show

```step
stage: investigate
insight: "Naming the idea behind each flag; Sam trusts the Wi-Fi password, the misconception planted after the method."
check:
  type: bug
  code: "working.txt#sam"
  text: "Sam checks the club network. Click the line where it first goes wrong."
  answer: 3
  fault: logic
  misconception: wifi-password-is-https
  explain: "Line 3: everyone with the password is on the network too, and past the router the data travels the internet. Only HTTPS protects it all the way."
```

```worked
\text{Flag 1} :: Data sent without encryption can be read by anyone who picks it up.
\text{Flag 2} :: Packets take different routes; their numbers put the message back together.
\text{Flag 3} :: Numbers also show which packet is missing, so TCP asks for just that one.
\text{Flag 4} :: Routers send packets round busy or broken parts of the network.
```

### Find the mistake

## Elaborate: fix the network

```step
stage: make
insight: "Ending a CTF the way defenders do: every readable device is fixed, and the wrong fixes only make it seem safer."
try: { playground: board, starter: "netctf.yml#fix", height: 640 }
hint: ["Which devices sent readable packets?", "Ask of each fix: after it, can someone who captures the packet read it?"]
check: { type: board, text: "Fix every club device that sends readable data.", when: "u = 0", explain: "Encrypted printing, HTTPS for the display and an encrypted camera stream: the capture now shows nothing anyone can read." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "You're on a café's free Wi-Fi. Which is safe to do?"
      options: ["Use sites with HTTPS (the padlock): what you send is encrypted all the way", "Anything: the café's Wi-Fi has a password on the wall", "Only use sites without HTTPS, because they load faster", "Nothing at all, even with HTTPS"]
      answer: 0
      feedback: [null, "Everyone in the café has that password.", "Without HTTPS, anyone there could read it.", "HTTPS protects what you send, even on a shared network."]
      explain: "HTTPS encrypts from your device to the site, whoever else is on the network."
  - check: { type: reflect, text: "I can use what I know about packets, TCP, routes and encryption to check a network and say how to fix it." }
```

### The café

### Look back
