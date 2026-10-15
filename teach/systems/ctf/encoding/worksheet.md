---
title: "Encoding is not encryption"
subtitle: "Capture the flag · What gives secrets away · Lesson 1"
---

# Encoding is not encryption

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The club app stored its admin password as cm9ib3RzMjAyNg==. It looks like nonsense. Is it safe?


:::teacher-note

**In one sentence:** Students send a message past an eavesdropper and find that binary, hex and base64 hide nothing (public rules) while encryption with a shared key does, then decode stored and layered data and read an encrypted reply with the key word (AC9TDI8K02 node 4). A 5E mission lesson.

**Students should be able to say:** I can say why binary, hex and base64 don't keep anything secret. I can say what encryption needs that encoding doesn't. I can choose encoding, encryption or hashing for a job.

**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Engage


:::keep-together

**The club app stored its admin password as cm9ib3RzMjAyNg== (base64). Could someone who copies it read the password?**

☐ Yes: base64 is a public rule anyone can undo

☐ Only with the club's key

☐ No: it looks like random letters

☐ Only if they guess it

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Yes. Base64 has no key: anyone can decode it, and it says robots2026.

:::


## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explain: encoding, encryption, hashing

1. $\text{encoding}$ — Binary, hex, base64: the same data by a public rule. No key, so anyone can undo it.
2. $\text{encryption}$ — A rule plus a secret key. Without the key, it can't be read; with it, it can.
3. $\text{hashing}$ — One-way: you can check a password against it, but not turn it back. For storing passwords.
4. $\text{test}$ — Ask: is there a secret key? If not, it isn't secret.

### Find the mistake

:::keep-together

**Sam stores the admin password. Click the line where it first goes wrong.**

```
 1  The club app stores the admin password.
 2  Sam writes it in hex: 72 6f 62 6f 74 73.
 3  Hex looks like nonsense, so nobody can read it.
 4  So the password is safe in the database.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: hex is a public rule. Anyone who copies the database reads robots. Passwords should be stored as salted hashes.

:::


:::typical

## Elaborate: decode it

:::


## Make: Elaborate: Ava's reply


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Your friend says hex keeps a password safe. What do you tell them, and what should be used instead?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Hex is a public rule anyone can undo; store passwords as salted hashes, and encrypt (with a key) what must be read back.

:::

