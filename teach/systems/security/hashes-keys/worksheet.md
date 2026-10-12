---
title: "Hashes and keys"
subtitle: "Security and privacy · How systems are kept safe · Lesson 4"
---

# Hashes and keys

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Websites get hacked and their password lists stolen. If the site did its job, the attackers still don't get your password. How?


:::teacher-note

**In one sentence:** Students sign in against a stored hash, see one letter change the whole hash, add a salt, and send a message locked with a public padlock past an eavesdropper, to explain how hashing protects stored passwords and public key encryption protects data in transit (AC9TDI10K01 node 4).

**Students should be able to say:** I can explain how sites check passwords without storing them. I can explain what a salt adds. I can explain how a public key and a private key work together.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**A website is hacked and its list of passwords is stolen. If the site did its job properly, what do the attackers find for your account?**

☐ Your password, encrypted with a key they will find nearby

☐ Nothing at all

☐ Your password

☐ A hash: a scramble that can't be turned back into your password

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** A hash. The site never kept the password: it stores the hash, and at sign-in hashes what you type and compares.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: hashes and padlocks


:::keep-together

### Two tools

1. $\text{maple} \to 49ead2b1066b\ldots$ — Hashing: a fixed-length scramble of the password.
2. $\text{sign in: hash(typed) = stored?}$ — The site compares hashes; it never needs the password.
3. $\text{Maple} \to \text{a completely different hash}$ — One small change changes everything, and it can't be reversed.
4. $\text{salt} + \text{maple}$ — Adding each user's salt makes the same password hash differently for each person.
5. $\text{public key} = \text{open padlock}$ — Anyone can lock a message for Alice with it.
6. $\text{private key} = \text{the only key}$ — Only Alice can open it. HTTPS uses this to set up a secret with a website.

Now explain how a site checks a password.

**Why can a site check your password without storing it?**

☐ The same password always gives the same hash, so it compares hashes

☐ It can't: every site stores passwords

☐ It asks your email provider

☐ It stores the password in a secret place

:::


:::teacher-note

**Answer:** The same password always gives the same hash, so it compares hashes

Hash what is typed; if it equals the stored hash, the password was right.

:::


:::keep-together

### Find the mistake

**Sam explains how Forgot password works. Click the line where it first goes wrong.**

```
 1  I forgot my password, so I click Forgot password.
 2  The site stores only a hash of my password.
 3  So it turns the hash back and emails me my password.
 4  Then I can sign in again.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: a hash can't be turned back. That is why sites send a reset link instead; a site that emails you your old password is storing it, which is a warning sign.

:::


:::keep-together

### Padlocks

**Bob wants to send Alice a secret. Alice has published her open padlock (public key). Who can open a box Bob locks with it?**

☐ Bob

☐ Only Alice, with her private key

☐ Eve, if she copies the box

☐ Anyone with Alice's padlock

:::


:::teacher-note

**Answer:** Only Alice, with her private key

Public key: anyone can lock, only the private key opens. HTTPS uses this to agree a secret key with a website.

:::


:::typical

## Vary: one change at a time


**Salt.** 

**Alice's padlock.** 

**Bob's own padlock.** 

**No padlock.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Hashes and keys


:::keep-together

### Emailed passwords

**A site emails you your old password when you click Forgot password. What does that tell you?**

☐ It stores your password, not a hash: a bad sign

☐ It is very secure

☐ It uses public key encryption

☐ Nothing

:::


:::teacher-note

**Answer:** It stores your password, not a hash: a bad sign

A hash can't be reversed, so a well-built site can only send a reset link.

:::


:::keep-together

### Passphrases

**Why are long passphrases safer even when sites store hashes?**

☐ Attackers hash lists of common passwords and compare; a long unusual passphrase isn't on those lists

☐ Long passwords make the hash longer

☐ They aren't safer

☐ Hashes only work on long passwords

:::


:::teacher-note

**Answer:** Attackers hash lists of common passwords and compare; a long unusual passphrase isn't on those lists

Guessing still works on common passwords: hash the guess, compare. Length and unusual words defeat the guess lists.

:::


:::keep-together

### Which key?

**Which key do you use to send someone a secret?**

☐ Their public key

☐ Their private key

☐ Your private key

☐ No key

:::


:::teacher-note

**Answer:** Their public key

Lock with the receiver's public key; only their private key opens it.

:::


:::keep-together

### Review: access

**Review: which is authorisation?**

☐ Only teachers may change marks

☐ A fingerprint

☐ A code from your phone

☐ Typing a password

:::


:::teacher-note

**Answer:** Only teachers may change marks

Authorisation is what you may do once signed in.

:::


## Make: a strong passphrase

Then: why should you never use the same password on two sites, even a strong one?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why can't attackers read passwords from a list of hashes? Which key locks a message for Alice?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A hash can't be reversed; only guesses can be hashed and compared. Alice's public key; only her private key opens it.

:::

