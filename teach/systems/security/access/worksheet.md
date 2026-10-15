---
title: "Who are you, and what may you do?"
subtitle: "Security and privacy · How systems are kept safe · Lesson 3"
---

# Who are you, and what may you do?

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** You and your teacher both sign in to the same school system. Why can your teacher change marks and you can't?


:::teacher-note

**In one sentence:** Students sign in as different users, try to read and change files, switch on multi-factor sign-in and fix a permissions table, to distinguish authentication from authorisation and apply least privilege (AC9TDI10K01 node 3).

**Students should be able to say:** I can explain the difference between authentication and authorisation. I can explain why multi-factor sign-in is safer. I can set permissions so each role has only what it needs.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**Sam the student signs in with the right password, then tries to change the class marks. What happens?**

☐ It works, but only for Sam's own mark

☐ Denied: signing in proves who Sam is, but students aren't allowed to change marks

☐ Sam is signed out

☐ It works: Sam signed in correctly

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Denied. The password proved it is Sam (authentication); the permissions say students may only read Marks (authorisation).

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: two checks


:::keep-together

### One request, two checks

1. $\text{Sam types "maple"}$ — Authentication: is the password right for Sam?
2. $\text{signed in as Sam (student)}$ — The system now knows who is asking.
3. $\text{"change Marks"}$ — Authorisation: what may students do with Marks?
4. $\text{Students: Marks = read}$ — The permissions table says read only.
5. $\text{denied}$ — Signed in, but not allowed. Least privilege: each role gets only what its job needs.

Now name the authentication step.

**Which is **authentication**?**

☐ Logging out

☐ Being allowed to read a file

☐ Typing your password to prove who you are

☐ Changing the permissions table

:::


:::teacher-note

**Answer:** Typing your password to prove who you are

Authentication answers "who are you?"; authorisation answers "what may you do?"

:::


:::keep-together

### Find the mistake

**Sam explains what signing in allows. Click the line where it first goes wrong.**

```
 1  Sam signs in with the right password.
 2  So the system knows it really is Sam.
 3  So Sam is allowed to do anything on the system.
 4  So Sam can change the class marks.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: signing in only proves who Sam is. What Sam may do is a separate check, the permissions for students.

:::


:::keep-together

### Why multi-factor?

**Why add a code from a phone (multi-factor sign-in)?**

☐ It replaces permissions

☐ It speeds up signing in

☐ A stolen password alone is no longer enough to get in

☐ It makes the password shorter

:::


:::teacher-note

**Answer:** A stolen password alone is no longer enough to get in

An attacker would need your password and your phone.

:::


:::typical

## Vary: one change at a time


**A teacher.** 

**Wrong password.** 

**Multi-factor.** 

**The admin role.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Access control


:::keep-together

### Sort them

**Authentication (who are you?) or authorisation (what may you do?)**

Groups: Authentication, Authorisation

- Typing a password: {{field-15}}
- A fingerprint unlock: {{field-15}}
- A code from an app on your phone: {{field-15}}
- Students may read but not change Marks: {{field-15}}
- Only the class teacher can open the gradebook: {{field-15}}
- A shared folder set to view only: {{field-15}}

:::


:::teacher-note

**Answer:** Typing a password → Authentication; A fingerprint unlock → Authentication; A code from an app on your phone → Authentication; Students may read but not change Marks → Authorisation; Only the class teacher can open the gradebook → Authorisation; A shared folder set to view only → Authorisation

Proving identity is authentication; rules about actions are authorisation.

:::


:::keep-together

### Strong passwords

**Which password is strongest?**

☐ maple

☐ Password1!

☐ purple-otter-sings-at-dawn

☐ 12345678

:::


:::teacher-note

**Answer:** purple-otter-sings-at-dawn

Length beats tricks: a long passphrase of unrelated words is hard to guess and easy to remember.

:::


:::keep-together

### Review: DNS

**Review: what does DNS do?**

☐ Encrypts web pages

☐ Blocks phishing

☐ Turns a name into an IP address

☐ Checks passwords

:::


:::teacher-note

**Answer:** Turns a name into an IP address

It is the internet's address book.

:::


## Make: least privilege

Then: which account would an attacker most want to steal, and how would you protect it?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Give one example of authentication and one of authorisation. Why use multi-factor sign-in?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Authentication: a password or fingerprint. Authorisation: students may only read marks. MFA means a stolen password alone isn't enough.

:::

