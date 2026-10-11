---
order: 2
unit: layers
node: AC9TDI10K01 n2
introduces: [ip-dns]
title: Names and addresses
summary: "Every device on the internet has an IP address, and every packet carries the address it is going to. DNS turns a name like school.edu.au into that address, and routers use their tables to send each packet the right way. A name that only looks right gets a different address, and a different computer."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "You type a website's name, but computers find each other by numbers. Who turns the name into the number, and what happens if one letter is wrong?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8475
  url: http://127.0.0.1:8475/index.html
  readySelector: "#scaddr"
  layout: full
explainPicture: { ref: dns.yml#explain-pic, caption: "school.edu.au: DNS answers 203.0.113.10, the packet carries that address, and row 1 of the router's table sends it to the school network." }
explainClip:
  query: { code: "@dns.yml#explain", fresh: 1, id: explain }
  caption: "From a name to an address"
  say: "Type the school's web address."
  clip:
    - type: { into: Address, text: "school.edu.au" }
    - press: Enter
    - expect: { selector: "#gsum", contains: "203.0.113.10" }
    - caption: { text: "DNS turns the name into an IP address; the router's table sends the packet on.", say: "DNS gives the address. The router's table sends it on." }
    - wait: 1600
    - type: { into: Address, text: "schoo1.edu.au" }
    - press: Enter
    - caption: { text: "One letter different: a different address, a different computer.", say: "One letter different: a different computer." }
    - wait: 1600
---
On the internet, devices find each other by **IP addresses**: numbers such as 203.0.113.10. Every packet carries the address it is going to. People use names instead, so a **DNS** server (the Domain Name System) looks up the address for each name. **Routers** then read the address on each packet and use their tables to choose where to send it.

## Predict: one letter different

```step
stage: predict
insight: "Committing to where a lookalike name leads tests the new move: DNS maps each exact name to its own address, so a different name reaches a different computer, however similar it looks."
check:
  type: predict
  q: "An email links to **schoo1.edu.au** (a number 1 instead of the letter l). The real site is **school.edu.au**. Where will the link take you?"
  options: ["To whatever computer schoo1.edu.au points to: a different one", "To the school, because DNS fixes small typos", "Nowhere: the name is invalid", "To the school, because it ends in .edu.au"]
  actual: "To a different computer. DNS looks up the exact name, and schoo1.edu.au is a separate name with its own address, owned by someone else."
```

## Try: look them up

```step
stage: run
insight: "Looking up both names settles the prediction: two different IP addresses, two different computers."
try: { playground: board, starter: "dns.yml#run", height: 560 }
check: { type: board, text: "Press Go for school.edu.au, then look up schoo1.edu.au. Where does each one go?", when: "l = 1 and f >= 2", explain: "school.edu.au is 203.0.113.10; schoo1.edu.au is 198.51.100.66, a different computer that is not the school's." }
```

Was your prediction right? Compare the router table row each one used.

## Worked example: following a name

```step
stage: investigate
insight: "Tracing one name through DNS, the packet's address and the router's table models the new move. Sam trusts a lookalike name, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "What does DNS do?"
      options: ["Turns a name like school.edu.au into an IP address", "Encrypts the web page", "Checks the website is safe", "Speeds up the internet"]
      answer: 0
      feedback: [null, "That is HTTPS.", "DNS answers for any name, safe or not.", "Its job is the lookup."]
      explain: "DNS is the internet's address book: name in, IP address out."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam decides an email link is safe. Click the line where it first goes wrong."
      answer: 3
      fault: logic
      misconception: lookalike-domain
      explain: "Line 3: DNS looks up the exact name. schoo1.edu.au has its own address, so the link goes to someone else's computer: a phishing site."
  - check:
      type: question
      q: "Your laptop at home is 192.168.1.23, but websites see 198.51.100.7. Why?"
      options: ["192.168… is a private address used only inside your home; your router uses one public address for the internet", "The laptop changes its address for each website", "Websites can't read addresses", "The laptop has two network cards"]
      answer: 0
      feedback: [null, "Its private address stays the same at home.", "They see the router's public address.", "One card is enough; the router does the swapping."]
      explain: "Private addresses (like 192.168.x.x) are reused in millions of homes; the router shares one public address for all of them."
```

### school.edu.au

```worked
\text{school.edu.au} \to \text{DNS} :: Your laptop asks a DNS server for the name's address.
\text{answer: } 203.0.113.10 :: The IP address of the school's web server.
\text{packet: to } 203.0.113.10 :: Every packet carries that address (and where it came from).
\text{router table: } 203.0.113.x \to \text{row 1} :: The router matches the start of the address to choose a way.
\text{schoo1.edu.au} \to 198.51.100.66 :: A different name has a different address: a different computer.
```

Now say what DNS does.

### Find the mistake

### Private and public

## Vary: one name at a time

```step
stage: modify
insight: "Each task changes one name: a part of the school site, an outside site, a name that doesn't exist, then reading which router row each used."
try: { playground: board, starter: "dns.yml#modify", height: 560 }
tasks:
  - check: { type: board, text: "Look up library.school.edu.au. Which router row sends it?", when: "r = 1 and x = 1 and l = 0 and f >= 1", explain: "203.0.113.20 starts 203.0.113, so row 1 sends it to the school network." }
  - check: { type: board, text: "Look up weather.example.", when: "k = 1 and x = 2", explain: "192.0.2.44 matches row 2: it goes out to the internet provider." }
  - check: { type: board, text: "Look up a name that doesn't exist, such as nowhere.example.", when: "k = 0 and f >= 1", explain: "DNS has no address for it, so nothing is sent." }
  - check:
      type: question
      q: "Why does the router only look at the start of the address?"
      options: ["Addresses are grouped by network, so the start says which way to send it", "The rest is secret", "The rest is the same for every website", "Routers can only read three numbers"]
      answer: 0
      feedback: [null, "Addresses aren't secret.", "The last part identifies the device.", "Routers read whole addresses; the start is enough to choose a way."]
      explain: "Like a postcode: the start of the address says which network, so a router only needs a row for each group."
```

### Part of the school

### Another site

### No such name

### Reading the table

## Practise: names and addresses

```step
stage: practise
insight: "Spotting lookalike names, what an IP address identifies, and a review of encryption."
tasks:
  - check:
      type: question
      q: "Which link goes to the real school site **school.edu.au**?"
      options: ["https://school.edu.au/login", "https://school.edu.au.login-help.example", "https://schooI.edu.au (capital I)", "https://school-edu-au.example"]
      answer: 0
      feedback: [null, "Read to the end: the real name is what comes before the first single slash, here login-help.example.", "A capital I looks like a lower case l.", "Hyphens make a different name."]
      explain: "Only the first ends in exactly school.edu.au. The others are other people's names dressed up."
  - check:
      type: question
      q: "What does an IP address identify?"
      options: ["A device (or a network's router) on the internet", "A person", "A website's owner", "A password"]
      answer: 0
      feedback: [null, "Many people can share one address.", "Owners are recorded elsewhere.", "Nothing to do with passwords."]
      explain: "It is the address packets are delivered to."
  - check:
      type: question
      q: "Review: where does HTTPS encrypt your data?"
      options: ["On your device, before it is sent", "At the router", "At the DNS server", "At the website only"]
      answer: 0
      feedback: [null, "Then the first hop would be readable.", "DNS only looks up names.", "It is encrypted on your device and decrypted at the website."]
      explain: "Encrypted on your device, decrypted by the website."
```

### Real or not?

### IP addresses

### Review: HTTPS

## Make: check before you click

```step
stage: make
insight: "Finding the one safe link among lookalikes with the board reverses the process: students start from a list of names and use addresses to decide."
try: { playground: board, starter: "dns.yml#make", height: 560 }
hint: ["Look up each name and compare its address with the school's.", "The school's portal is at 203.0.113.10.", "A name that ends in exactly school.edu.au goes to the school."]
check: { type: board, text: "An email offers these links: schoo1.edu.au, school.edu.au, library.school.edu.au. Look up all three, and finish on one that reaches the real school portal.", when: "f >= 3 and r = 1 and x = 1", explain: "Both school.edu.au and library.school.edu.au reach the school (203.0.113.x); schoo1.edu.au does not. Typing the address yourself is safer than clicking." }
```

Then: write one rule for checking a link before you click it.
