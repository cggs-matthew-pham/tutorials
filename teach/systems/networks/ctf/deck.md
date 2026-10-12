---
marp: true
theme: default
html: true
---

# Network capture the flag

Networks · Network capture the flag

<!-- Speaker note: The Networks challenge. Students find four flags in the club's own (made-up) network traffic, each with one idea from the course (readable unencrypted packets, packet numbers to reorder a message, the packet TCP must resend, and the quickest route round an overloaded router), then fix every device that sends readable data (AC9TDI8K02 nodes 2 and 5). Defensive throughout. A 5E mission lesson. About 45 minutes (Engage 3 min · Explore (flags) 25 min · Explain 5 min · Elaborate 7 min · Evaluate 5 min). -->

---

## Today

**We are learning to** four flags hidden in the club's own network traffic, each found with an idea from this course: which packets anyone on the Wi-Fi could read, putting packets back in number order, which packet TCP must ask for again, and the quickest route round an overloaded router. Then fix every device that still sends readable data.

- I can find which data on a network anyone could read.
- I can use packet numbers to rebuild a message and find a missing packet.
- I can find a route round a busy router and say how to fix readable traffic.

<!-- Speaker note: Before class: Try each flag yourself. Everything is made up and runs on the board. Flags (for you, not students): 1 WP{plain-text-is-public} (the Room 12 display's packet), 2 WP{numbers-put-it-back} (packets in number order), 3 WP{resend-11}, 4 WP{ABDGH} (19 ms; through E is 12 ms but loses packets). Format: like most capture-the-flag events (picoCTF among them), each student works alone and only the score is shared. To run it as a class event, pairs race to four flags and you keep score. Rules of the game: only capture traffic on a network you own or have permission to check, as here. Real tools (such as Wireshark) capture packets the same way; using them on networks you don't own is against school rules and the law. Simplifications: the capture shows one packet per device; real captures show thousands. A Wi-Fi password does encrypt the radio link from each device to the router (WPA2/WPA3), but others with the password are on the same network, and past the router the data crosses the internet, so HTTPS is what protects it end to end. Teacher: Evaluate: discuss what to check before using a café's Wi-Fi. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Why it matters

> The club's network is sending its secrets where anyone can pick them up. Find four of them before someone else does.

<!-- Speaker note: A **capture the flag** (CTF) is a security challenge: you look for what a system gives away, with permission, and each find is a **flag**, a secret like **WP{…}** to type in. This is the club's own network, and you're checking it for the club. Each flag needs one idea from this course. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**A device on the club Wi-Fi sends a message without HTTPS. Who could read it?**

- Anyone on the same network who picks it up, and anyone along its way
- Nobody: Wi-Fi scrambles everything
- Only the device it was sent to
- Only people without the Wi-Fi password

<!-- Speaker note: What happens: Anyone on the network or along the way who captures it. Only encryption all the way (HTTPS) keeps it private. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what the Wi-Fi password protects, and from whom. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fnetworks%2Fctf%2Fstep-2&code=widget%3A+netctf%0Amode%3A+capture%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/networks/ctf/?full=step-2#step-2)

<!-- Speaker note:  -->

<!-- Speaker note: Teacher: circulate; ask which lesson's idea each flag needs before giving a hint. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Anyone on the network or along the way who captures it. Only encryption all the way (HTTPS) keeps it private.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: what the flags show

**Sam checks the club network. Click the line where it first goes wrong.**

```
 1  The club Wi-Fi has a password.
 2  Only members know the password.
 3  So everything sent on the club Wi-Fi is private.
 4  So the display board doesn't need HTTPS.
```

* Answer: line 3

<!-- Speaker note: Line 3: everyone with the password is on the network too, and past the router the data travels the internet. Only HTTPS protects it all the way. What this step is for: Naming the idea behind each flag; Sam trusts the Wi-Fi password, the misconception planted after the method. -->

<!-- Speaker note: Teacher: name the idea behind each flag together. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: fix the network



[Open this step](https://tutorials.learningwaypoints.com/systems/networks/ctf/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Ending a CTF the way defenders do: every readable device is fixed, and the wrong fixes only make it seem safer. Hints, in order: Which devices sent readable packets? / Ask of each fix: after it, can someone who captures the packet read it? For students who need more support: A card with the four ideas: encryption, packet numbers, TCP resends, routes. For early finishers: Change the map: if the link from D to G became 15 ms, which route would you use? Work it out, then design your own map with a busy router and a unique best route. The hard part, on purpose: Flag 4: students take the first route that reaches H. Ask them to list every route that avoids E and add up each one. When students get stuck: A student thinks the Wi-Fi password makes everything private (Sam's mistake). Ask: Who else knows the password? Where does the data go after the router? Fix: Only HTTPS protects it all the way. / A student tries to read the out-of-order message as it arrived. Ask: What does each packet carry besides its piece of the message? Fix: Its number: put them in number order. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why do packets carry numbers? Give two reasons.**

* So the receiver can put them back in order, and so it can tell which one is missing and ask for just that one (TCP).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: End of the course. Capture the flag (Digital systems) and Security and privacy have more. -->
