---
title: "Threat models"
subtitle: "Cyber safety and privacy · Secure the system · Lesson 5"
---

# Threat models

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The club app has HTTPS: the padlock is showing. Is it secure?


:::teacher-note

**In one sentence:** Students use a data-flow diagram of the club app to name a risk and a defence at each point where data travels, is stored or is changed, then threat-model two new features (AC9TDI10P13 node 1). Defensive and conceptual. A 5E mission lesson.

**Students should be able to say:** I can follow data through a system on a data-flow diagram. I can name what could go wrong where data travels, is stored or is changed. I can match a defence to each point.

**Width:** the unmarked parts are the floor every student does (Engage, Explore, Explain, Evaluate). Typical and Wider sections add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Engage


:::keep-together

**The club app uses HTTPS (the padlock). Which data does that protect?**

☐ Everything: the stored passwords and the admin page too

☐ Only data travelling between the browser and the app

☐ Only the photos

☐ Nothing: the padlock is decoration

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Only data on the way. Stored passwords and who may use the admin page need their own defences.

:::


## Explore

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Explain: follow the data

A **threat model** follows the data through a system and asks, at each point, what could go wrong and what stops it.

1. $\text{draw the flow}$ — Browser → app → database, plus anyone who can change things (the admin).
2. $\text{travelling}$ — Data on the network can be read on the way: encrypt it (HTTPS).
3. $\text{stored}$ — Data in a database can be copied: hash passwords, encrypt the rest.
4. $\text{who may act}$ — A page that changes data can be used by the wrong person: access control and MFA.
5. $\text{check}$ — Every point has a defence; no single defence covers every point.

### Find the mistake

:::keep-together

**Sam secures the club app. Click the line where it first goes wrong.**

```
 1  The club app has three points where data is at risk.
 2  At sign-in, passwords travel from the browser to the app.
 3  Sam turns on HTTPS, which encrypts data on the way.
 4  So all three points are now safe.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4: HTTPS only protects data while it travels. The stored passwords and the admin page are still open.

:::


:::typical

## Elaborate: photos

:::


## Make: Elaborate: messages


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Name two points in a web app where data is at risk, and the defence for each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Travelling between browser and server (HTTPS); stored passwords (salted hashes); the admin page (access control and MFA).

:::

