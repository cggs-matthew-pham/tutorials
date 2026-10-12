---
marp: true
theme: default
html: true
---

# Names and addresses

Security and privacy · How systems are kept safe

<!-- Speaker note: Students look up names in a DNS board and follow each packet's address through a router table, to explain how domain names and IP addresses get data to the right computer and why a lookalike name is dangerous (AC9TDI10K01 node 2). About 40 minutes (Predict and Try 6 min · Worked example 12 min · Vary 10 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** every device on the internet has an IP address, and every packet carries the address it is going to. DNS turns a name like school.edu.au into that address, and routers use their tables to send each packet the right way. A name that only looks right gets a different address, and a different computer.

- I can explain what DNS and IP addresses do.
- I can describe how a router uses an address.
- I can spot a lookalike name.

<!-- Speaker note: Before class: Try the board yourself. Every address on it comes from the ranges kept for documentation and examples (192.0.2.x, 198.51.100.x, 203.0.113.x), so none is a real site. The one idea: names map to addresses through DNS, packets carry addresses, routers forward by the start of the address. Lookalike names (phishing) reach other computers. Hands-on: on a school computer, `nslookup` or `ping` a well-known site to see a real address (check the school network allows it). Teacher: Try: ask whose computer 198.51.100.66 might be. Teacher: Worked example: compare the router table with postcodes. Teacher: Vary: ask why nothing is sent for a name that doesn't exist. -->

---

## Why it matters

> You type a website's name, but computers find each other by numbers. Who turns the name into the number, and what happens if one letter is wrong?

<!-- Speaker note: On the internet, devices find each other by **IP addresses**: numbers such as 203.0.113.10. Every packet carries the address it is going to. People use names instead, so a **DNS** server (the Domain Name System) looks up the address for each name. **Routers** then read the address on each packet and use their tables to choose where to send it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**An email links to **schoo1.edu.au** (a number 1 instead of the letter l). The real site is **school.edu.au**. Where will the link take you?**

- Nowhere: the name is invalid
- To the school, because it ends in .edu.au
- To the school, because DNS fixes small typos
- To whatever computer schoo1.edu.au points to: a different one

<!-- Speaker note: What happens: To a different computer. DNS looks up the exact name, and schoo1.edu.au is a separate name with its own address, owned by someone else. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "DNS fixes typos" hold Sam's misconception. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fsecurity%2Faddresses%2Fstep-2&code=widget%3A+security%0Amode%3A+dns%0Aaddress%3A+school.edu.au%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/security/addresses/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Compare the router table row each one used. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* To a different computer. DNS looks up the exact name, and schoo1.edu.au is a separate name with its own address, owned by someone else.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## school.edu.au

Now say what DNS does.

$$\text{school.edu.au} \to \text{DNS}$$

1) $\text{answer: } 203.0.113.10$ — The IP address of the school's web server.
2) $\text{packet: to } 203.0.113.10$ — Every packet carries that address (and where it came from).
3) $\text{router table: } 203.0.113.x \to \text{row 1}$ — The router matches the start of the address to choose a way.
4) $\text{schoo1.edu.au} \to 198.51.100.66$ — A different name has a different address: a different computer.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write school.edu.au DNS and say "Your laptop asks a DNS server for the name's address." Line 1: write answer: 203.0.113.10 and say "The IP address of the school's web server." Line 2: write packet: to 203.0.113.10 and say "Every packet carries that address (and where it came from)." Line 3: write router table: 203.0.113.x row 1 and say "The router matches the start of the address to choose a way." Line 4: write schoo1.edu.au 198.51.100.66 and say "A different name has a different address: a different computer." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## school.edu.au

**What does DNS do?**

- Turns a name like school.edu.au into an IP address
- Checks the website is safe
- Speeds up the internet
- Encrypts the web page

* Answer: Turns a name like school.edu.au into an IP address

<!-- Speaker note: DNS is the internet's address book: name in, IP address out. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam decides an email link is safe. Click the line where it first goes wrong.**

```
 1  An email says: reset your school password at schoo1.edu.au.
 2  The name looks like the school's website.
 3  So DNS will send me to the school's computer.
 4  So it is safe to type my password there.
```

* Answer: line 3

<!-- Speaker note: Line 3: DNS looks up the exact name. schoo1.edu.au has its own address, so the link goes to someone else's computer: a phishing site. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Private and public

**Your laptop at home is 192.168.1.23, but websites see 198.51.100.7. Why?**

- The laptop has two network cards
- 192.168… is a private address used only inside your home; your router uses one public address for the internet
- Websites can't read addresses
- The laptop changes its address for each website

* Answer: 192.168… is a private address used only inside your home; your router uses one public address for the internet

<!-- Speaker note: Private addresses (like 192.168.x.x) are reused in millions of homes; the router shares one public address for all of them. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one name at a time



- **Part of the school:** 
- **Another site:** 
- **No such name:** 
- **Reading the table:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/security/addresses/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one name: a part of the school site, an outside site, a name that doesn't exist, then reading which router row each used. For students who need more support: Show a name split into parts (library . school . edu . au) and read it right to left. For early finishers: IPv4 addresses have four numbers from 0 to 255. How many is that, and why did the world run out? (About 4.3 billion; look up IPv6.) The hard part, on purpose: The difference between a name looking right and being right. Make students read names character by character, aloud. When students get stuck: A student trusts schoo1.edu.au (Sam's mistake). Ask: Is that the same name, character by character? Fix: A different name has a different address. / A student thinks the IP address is a person. Ask: How many people use your home's public address? Fix: It identifies a device or network, not a person. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Real or not?

**Which link goes to the real school site **school.edu.au**?**

- https://school-edu-au.example
- https://school.edu.au/login
- https://school.edu.au.login-help.example
- https://schooI.edu.au (capital I)

* Answer: https://school.edu.au/login

<!-- Speaker note: Only the first ends in exactly school.edu.au. The others are other people's names dressed up. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## IP addresses

**What does an IP address identify?**

- A website's owner
- A device (or a network's router) on the internet
- A password
- A person

* Answer: A device (or a network's router) on the internet

<!-- Speaker note: It is the address packets are delivered to. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: HTTPS

**Review: where does HTTPS encrypt your data?**

- At the website only
- On your device, before it is sent
- At the router
- At the DNS server

* Answer: On your device, before it is sent

<!-- Speaker note: Encrypted on your device, decrypted by the website. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: check before you click

Then: write one rule for checking a link before you click it.

[Open this step](https://tutorials.learningwaypoints.com/systems/security/addresses/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Finding the one safe link among lookalikes with the board reverses the process: students start from a list of names and use addresses to decide. Hints, in order: Look up each name and compare its address with the school's. / The school's portal is at 203.0.113.10. / A name that ends in exactly school.edu.au goes to the school. -->

<!-- Speaker note: Teacher: collect students' rules for checking links. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**What does DNS do? Why is schoo1.edu.au not the school?**

* Turns a name into an IP address. It is a different name, so DNS gives a different address: someone else's computer.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Who are you, and what may you do? (sign-in and permissions). Builds on: Networks (packets and routers). Links to Data representation: each part of an IPv4 address is one byte. -->
