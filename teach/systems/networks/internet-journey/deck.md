---
marp: true
theme: default
html: true
---

# Across the internet

Networks · Keeping it safe

<!-- Speaker note: Students follow an online purchase from laptop to shop on a board and its step log, connecting wired and wireless links, packets, TCP and HTTPS encryption into one end-to-end account, then put the journey in order themselves (AC9TDI8K02 node 5). About 40 minutes (Predict and Try 8 min · Worked example 10 min · Vary 10 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** buying something online uses everything at once: your browser encrypts the data (HTTPS), it is split into packets, the packets cross Wi-Fi and then cables, routers pass them on by different routes, TCP gets any lost packet sent again, and the shop puts them in order and decrypts them.

- I can describe the journey of data across the internet.
- I can say where packets, a protocol and encryption each play a part.
- I can point out which parts of the trip are wired and which are wireless.

<!-- Speaker note: Before class: Try the board yourself and read the log. The integration node: everything from this course in one scenario (the kit's example is an online purchase). The board simplifies: one home Wi-Fi hop, one fibre hop, two routes; real trips cross many networks, and HTTPS uses a key agreed when the page loads (Secret messages lesson 6 shows how keys can be agreed in public). Years 9–10 (AC9TDI10K01) takes this further: addresses, domain names, routing, and public key encryption. Teacher: Try: pause after each log line and name the lesson it comes from. Teacher: Worked example: ask where most of the internet's cables are (including under the sea). Teacher: Vary: link each experience (slow page, gap) to its cause. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> You press Buy. Less than a second later, a shop on the other side of the world has your order, and nobody on the way could read your card number. What happened in between?

<!-- Speaker note: Each lesson in this course showed one part of how the internet works: links, packets, TCP and encryption. A single purchase online uses all of them at once. The board shows the trip from your laptop to an online shop, with a step-by-step log of what happens. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Your card number travels from your laptop to an online shop. Where does it get encrypted?**

- At the internet provider
- At the shop, when it arrives
- At your home router
- On your laptop, before it leaves

<!-- Speaker note: What happens: On your laptop, by the browser (HTTPS), before it leaves. Anywhere later would leave the first part of the trip, including the Wi-Fi, readable. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose the router hold Sam's misconception; ask what Eve on the Wi-Fi would see. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fnetworks%2Finternet-journey%2Fstep-2&code=widget%3A+network%0Amode%3A+journey%0Amessage%3A+CARD+4111+2222%0Ahttps%3A+on%0Adrop%3A+2%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/networks/internet-journey/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Which parts of the trip were wireless, and which wired? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* On your laptop, by the browser (HTTPS), before it leaves. Anywhere later would leave the first part of the trip, including the Wi-Fi, readable.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Follow the purchase

Now pick out the wireless part.

$$\text{encrypt (HTTPS)}$$

1) $\text{split into packets}$ — Numbered packets (Packets).
2) $\text{Wi-Fi, then fibre}$ — Wireless first, then wired links (Wired or wireless).
3) $\text{routers, different routes}$ — Each packet is passed on towards the shop.
4) $\text{lost packet sent again}$ — TCP: the shop never confirmed it, so it was resent.
5) $\text{reorder, decrypt}$ — The shop rebuilds the message by number and decrypts it with its key.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write encrypt (HTTPS) and say "On the laptop, before anything is sent (Who can see your data?)." Line 1: write split into packets and say "Numbered packets (Packets)." Line 2: write Wi-Fi, then fibre and say "Wireless first, then wired links (Wired or wireless)." Line 3: write routers, different routes and say "Each packet is passed on towards the shop." Line 4: write lost packet sent again and say "TCP: the shop never confirmed it, so it was resent." Line 5: write reorder, decrypt and say "The shop rebuilds the message by number and decrypts it with its key." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Follow the purchase

**Which part of this journey is wireless?**

- None of it
- Home router to the provider
- Provider to the shop
- Laptop to the home router (Wi-Fi)

* Answer: Laptop to the home router (Wi-Fi)

<!-- Speaker note: Only the first hop is wireless here. Most of the internet is cables and fibre, including under the sea. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam describes how the card number is protected. Click the line where it first goes wrong.**

```
 1  I type my card number and press Buy.
 2  My laptop splits it into packets.
 3  My home router encrypts the packets.
 4  The packets travel across the internet to the shop.
```

* Answer: line 3

<!-- Speaker note: Line 3: the browser encrypts the data on the laptop (HTTPS) before it is sent. If the router did it, the packets would cross the Wi-Fi as plain text, where anyone nearby could copy them. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## HTTPS off

**With HTTPS **off**, who could read the card number?**

- Only the shop
- Anyone on the Wi-Fi or any network along the way
- Nobody, because it is split into packets
- Only the internet provider

* Answer: Anyone on the Wi-Fi or any network along the way

<!-- Speaker note: Without encryption, every link and router on the way handles readable packets. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **HTTPS off:** 
- **HTTPS on:** 
- **Slow at the far end:** 
- **Without TCP:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/networks/internet-journey/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one setting of the journey: HTTPS off, HTTPS on again, then which property or protocol is responsible for each experience. For students who need more support: Give the eight journey steps on cards to order before the board. For early finishers: Look up a map of undersea internet cables. Which ones connect Australia to the rest of the world? The hard part, on purpose: Holding the whole chain at once. Use the board's log as the scaffold and have students say which earlier lesson each line comes from. When students get stuck: A student puts encryption at the router (Sam's mistake). Ask: What travels over the Wi-Fi if the router encrypts? Fix: Plain text, readable by anyone nearby. Encrypt on the device. / A student thinks the whole internet is wireless. Ask: How does data get between countries? Fix: Mostly fibre, including undersea cables; wireless is usually just the first hop. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mobile video

**You watch a video on the school bus on mobile data. Which part of the trip is wireless?**

- The video company's servers
- The fibre between cities
- Phone to the mobile tower
- None

* Answer: Phone to the mobile tower

<!-- Speaker note: Phone to tower is wireless; from the tower onwards it is mostly fibre. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which protocol?

**Which protocol puts a web page's packets back in order and asks for lost ones?**

- Fibre
- TCP
- Wi-Fi
- HTTPS

* Answer: TCP

<!-- Speaker note: TCP numbers, acknowledges and resends packets. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: decrypt

**Review: a message was encrypted with key 2. You receive **JK**. What did it say?**

- IJ
- JK
- LM
- HI

* Answer: HI

<!-- Speaker note: J → H and K → I: HI. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: put the journey in order

Then: which steps would change if you used mobile data instead of home Wi-Fi?

<!-- Speaker note: What this step is for: Ordering the whole journey from scratch reverses the board: students rebuild the chain themselves, with one wrong step left out. -->

<!-- Speaker note: Teacher: ask why the extra line is wrong. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Describe the journey of a password from your phone to a website in four steps, naming where encryption, packets and TCP each come in.**

* Encrypted on the phone (HTTPS); split into packets; sent over wireless then wired links through routers, with TCP resending lost packets; put back in order and decrypted by the website.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Network capture the flag (the course challenge). Next (Years 9–10): Security and privacy (addresses and routing, passwords and hashing, public key encryption). Code links: Secret messages. -->
