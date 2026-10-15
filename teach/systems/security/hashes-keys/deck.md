---
marp: true
theme: default
html: true
---

# Hashes and keys

Security and privacy · How systems are kept safe

<!-- Speaker note: Students sign in against a stored hash, see one letter change the whole hash, add a salt, and send a message locked with a public padlock past an eavesdropper, to explain how hashing protects stored passwords and public key encryption protects data in transit (AC9TDI10K01 node 4). About 45 minutes (Predict and Try 6 min · Worked example 13 min · Vary 12 min · Practise and Make 14 min). -->

---

## Today

**We are learning to** good sites never store your password. They store a hash: a one-way scramble that is always the same for the same password, so a login can be checked, but can't be turned back. A salt makes the same password hash differently for each person. Public key encryption works like an open padlock: anyone can lock a message with it, but only the owner's private key opens it.

- I can explain how sites check passwords without storing them.
- I can explain what a salt adds.
- I can explain how a public key and a private key work together.

<!-- Speaker note: Before class: Try the boards yourself. The hash is real SHA-256 (shown short); the passwords in the lesson are practice ones. Tell students never to type a real password into any board. The kit's typical width: public key cryptography (as in TLS/HTTPS) secures data in transit; hashing secures stored passwords; they address different threats. Simplifications: the padlock is an analogy; HTTPS uses public keys to agree a shared key, then faster encryption for the rest. Links: Secret messages' key sharing (agreeing a key in public) is the other half of how HTTPS starts. Teacher: Try: count how many digits changed for one letter. Teacher: Worked example: ask why the same password must always give the same hash. Teacher: Vary: ask why two identical hashes in a stolen list would be a giveaway without salt. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Why it matters

> Websites get hacked and their password lists stolen. If the site did its job, the attackers still don't get your password. How?

<!-- Speaker note: This lesson covers two tools that protect data. A **hash** protects passwords where they are **stored**. **Public key** encryption protects secrets while they **travel**, and it is how HTTPS starts. A **hash** turns any text into a fixed-length scramble. The same input always gives the same hash, but there is no way to work backwards from the hash to the input. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**A website is hacked and its list of passwords is stolen. If the site did its job properly, what do the attackers find for your account?**

- Your password, encrypted with a key they will find nearby
- Nothing at all
- Your password
- A hash: a scramble that can't be turned back into your password

<!-- Speaker note: What happens: A hash. The site never kept the password: it stores the hash, and at sign-in hashes what you type and compares. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "your password" assume sites keep it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fsecurity%2Fhashes-keys%2Fstep-2&code=widget%3A+security%0Amode%3A+hash%0Aleak+sam%3A+49ead2b1066b%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/security/hashes-keys/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Watch how many digits change for one letter. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* A hash. The site never kept the password: it stores the hash, and at sign-in hashes what you type and compares.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Two tools

Now explain how a site checks a password.

$$\text{maple} \to 49ead2b1066b\ldots$$

1) $\text{sign in: hash(typed) = stored?}$ — The site compares hashes; it never needs the password.
2) $\text{Maple} \to \text{a completely different hash}$ — One small change changes everything, and it can't be reversed.
3) $\text{salt} + \text{maple}$ — Adding each user's salt makes the same password hash differently for each person.
4) $\text{public key} = \text{open padlock}$ — Anyone can lock a message for Alice with it.
5) $\text{private key} = \text{the only key}$ — Only Alice can open it. HTTPS uses this to set up a secret with a website.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write maple 49ead2b1066b and say "Hashing: a fixed-length scramble of the password." Line 1: write sign in: hash(typed) = stored? and say "The site compares hashes; it never needs the password." Line 2: write Maple a completely different hash and say "One small change changes everything, and it can't be reversed." Line 3: write salt + maple and say "Adding each user's salt makes the same password hash differently for each person." Line 4: write public key = open padlock and say "Anyone can lock a message for Alice with it." Line 5: write private key = the only key and say "Only Alice can open it. HTTPS uses this to set up a secret with a website." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two tools

**Why can a site check your password without storing it?**

- The same password always gives the same hash, so it compares hashes
- It can't: every site stores passwords
- It asks your email provider
- It stores the password in a secret place

* Answer: The same password always gives the same hash, so it compares hashes

<!-- Speaker note: Hash what is typed; if it equals the stored hash, the password was right. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains how Forgot password works. Click the line where it first goes wrong.**

```
 1  I forgot my password, so I click Forgot password.
 2  The site stores only a hash of my password.
 3  So it turns the hash back and emails me my password.
 4  Then I can sign in again.
```

* Answer: line 3

<!-- Speaker note: Line 3: a hash can't be turned back. That is why sites send a reset link instead; a site that emails you your old password is storing it, which is a warning sign. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Padlocks

**Bob wants to send Alice a secret. Alice has published her open padlock (public key). Who can open a box Bob locks with it?**

- Bob
- Only Alice, with her private key
- Eve, if she copies the box
- Anyone with Alice's padlock

* Answer: Only Alice, with her private key

<!-- Speaker note: Public key: anyone can lock, only the private key opens. HTTPS uses this to agree a secret key with a website. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change at a time



- **Salt:** 
- **Alice's padlock:** 
- **Bob's own padlock:** 
- **No padlock:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/security/hashes-keys/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: a salt for the same password, then the lock Bob uses (Alice's, his own, none). For students who need more support: Two cards: Stored → hash (one way). Sent → public key locks, private key opens. For early finishers: Why do security experts recommend a password manager? What does it change about using the same password on several sites? The hard part, on purpose: Hashing is one-way and the public key only locks: both run against intuition. Use the padlock and the meat grinder (you can't un-mince) as anchors. When students get stuck: A student says the site turns the hash back (Sam's mistake). Ask: Why does the site send a reset link instead of your password? Fix: It can't reverse the hash. / A student thinks the public key opens the box. Ask: Eve has a padlock too. Can she open the box? Fix: Public keys only lock; the private key opens. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Emailed passwords

**A site emails you your old password when you click Forgot password. What does that tell you?**

- It stores your password, not a hash: a bad sign
- It is very secure
- It uses public key encryption
- Nothing

* Answer: It stores your password, not a hash: a bad sign

<!-- Speaker note: A hash can't be reversed, so a well-built site can only send a reset link. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Passphrases

**Why are long passphrases safer even when sites store hashes?**

- Attackers hash lists of common passwords and compare; a long unusual passphrase isn't on those lists
- Long passwords make the hash longer
- They aren't safer
- Hashes only work on long passwords

* Answer: Attackers hash lists of common passwords and compare; a long unusual passphrase isn't on those lists

<!-- Speaker note: Guessing still works on common passwords: hash the guess, compare. Length and unusual words defeat the guess lists. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which key?

**Which key do you use to send someone a secret?**

- Their public key
- Their private key
- Your private key
- No key

* Answer: Their public key

<!-- Speaker note: Lock with the receiver's public key; only their private key opens it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: access

**Review: which is authorisation?**

- Only teachers may change marks
- A fingerprint
- A code from your phone
- Typing a password

* Answer: Only teachers may change marks

<!-- Speaker note: Authorisation is what you may do once signed in. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a strong passphrase

Then: why should you never use the same password on two sites, even a strong one?

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/security/hashes-keys/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Building a passphrase that meets a strength rule reverses the process: students start from what makes a hash hard to guess and make a password to match. Hints, in order: Use four or more words that don't go together. / Separate them with spaces or hyphens. / Aim for 20 characters or more. Don't use a real password here. -->

<!-- Speaker note: Teacher: remind students not to type a real password; it is a made-up passphrase. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why can't attackers read passwords from a list of hashes? Which key locks a message for Alice?**

* A hash can't be reversed; only guesses can be hashed and compared. Alice's public key; only her private key opens it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Capture the flag (use everything from this course to find and fix the weaknesses in a school portal). Links: Secret messages (key sharing, challenge and response). -->
