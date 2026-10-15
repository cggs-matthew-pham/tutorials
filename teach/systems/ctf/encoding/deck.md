---
marp: true
theme: default
html: true
---

# Encoding is not encryption

Capture the flag · What gives secrets away

<!-- Speaker note: Students send a message past an eavesdropper and find that binary, hex and base64 hide nothing (public rules) while encryption with a shared key does, then decode stored and layered data and read an encrypted reply with the key word (AC9TDI8K02 node 4). A 5E mission lesson. About 40 minutes (Engage and Explore 10 min · Explain 8 min · Elaborate 16 min · Evaluate 6 min). -->

---

## Today

**We are learning to** binary, hex and base64 are encodings: the same data written another way by a public rule. They look scrambled, but anyone can turn them back, so they hide nothing. Encryption needs a secret key as well: without it, the data can't be read. Use encryption to keep something secret, and hashing (Security and privacy) to store passwords.

- I can say why binary, hex and base64 don't keep anything secret.
- I can say what encryption needs that encoding doesn't.
- I can choose encoding, encryption or hashing for a job.

<!-- Speaker note: Before class: Try the boards yourself. Every message and key word is made up. The one idea: encoding is a public rule (no key), so it hides nothing; encryption needs a secret key; passwords are stored as hashes. Simplifications: the board's cipher shifts each character by the letters of the key word (a Vigenère cipher). It stands in for real encryption, such as the AES behind HTTPS, whose keys are far too long to guess; a key word like gears could be guessed. Base64 is used everywhere to carry data safely through email and web pages, which is a good use of it: it was never meant to hide anything. Links: Networks (Who can see your data?) shows what encryption is for; Secret messages (Code) builds and cracks ciphers; Security and privacy covers hashing. Teacher: Evaluate: discuss the account page: what should it do instead? -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> The club app stored its admin password as cm9ib3RzMjAyNg==. It looks like nonsense. Is it safe?

<!-- Speaker note: **Your mission:** the club sends meeting places and stores passwords. Find out which ways of writing them actually keep them secret, before anyone else does. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Engage: predict

**The club app stored its admin password as cm9ib3RzMjAyNg== (base64). Could someone who copies it read the password?**

- Yes: base64 is a public rule anyone can undo
- Only with the club's key
- No: it looks like random letters
- Only if they guess it

<!-- Speaker note: What happens: Yes. Base64 has no key: anyone can decode it, and it says robots2026. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what makes something look secret. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fctf%2Fencoding%2Fstep-2&code=widget%3A+encode%0Amessage%3A+meet+at+the+lab+at+4%0Ashared%3A+gears%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/ctf/encoding/?full=step-2#step-2)

<!-- Speaker note:  -->

<!-- Speaker note: Teacher: ask why Eve could read the base64. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Yes. Base64 has no key: anyone can decode it, and it says robots2026.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Explain: encoding, encryption, hashing

**Sam stores the admin password. Click the line where it first goes wrong.**

```
 1  The club app stores the admin password.
 2  Sam writes it in hex: 72 6f 62 6f 74 73.
 3  Hex looks like nonsense, so nobody can read it.
 4  So the password is safe in the database.
```

* Answer: line 3

<!-- Speaker note: Line 3: hex is a public rule. Anyone who copies the database reads robots. Passwords should be stored as salted hashes. What this step is for: The teacher models deciding whether a form of data has a key. Sam trusts hex, the misconception planted after the method. -->

<!-- Speaker note: Teacher: sort encoding, encryption and hashing by the test: is there a key? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Elaborate: decode it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fctf%2Fencoding%2Fstep-4&code=widget%3A+encode%0Amode%3A+decode%0Adata%3A+cm9ib3RzMjAyNg%3D%3D%0Aplain%3A+robots2026%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/ctf/encoding/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change at a time: a single encoding, then layers of them, showing that stacking public rules still hides nothing. -->

<!-- Speaker note: Teacher: ask how they knew which rule each layer used. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Elaborate: Ava's reply



[Open this step](https://studio.learningwaypoints.com/tutorials/systems/ctf/encoding/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Reversing the explore: reading an encrypted reply needs the shared key, the one thing an encoding never has. Hints, in order: Try the public decoders first: do any work? / It's encrypted. You and Ava share a key word. For students who need more support: A card with the three rules and their characters, and the test: is there a key? For early finishers: Find base64 in the wild: open an email's raw source (Show original) and spot an attachment written as base64. The hard part, on purpose: Layers: students expect one decoder to finish the job. Ask them to look at what came out and ask which rule could make that. When students get stuck: A student thinks hex is secret (Sam's mistake). Ask: Did decoding it need anything secret? Fix: No key, no secret: encoding hides nothing. / A student picks a decoder at random. Ask: Which characters can each rule produce? Binary: 0 and 1. Hex: 0 to 9 and a to f. Base64: letters, digits, + and /, maybe = at the end. Fix: Match the characters to the rule. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Your friend says hex keeps a password safe. What do you tell them, and what should be used instead?**

* Hex is a public rule anyone can undo; store passwords as salted hashes, and encrypt (with a key) what must be read back.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: What your page gives away. -->
