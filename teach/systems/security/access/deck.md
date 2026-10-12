---
marp: true
theme: default
html: true
---

# Who are you, and what may you do?

Security and privacy · How systems are kept safe

<!-- Speaker note: Students sign in as different users, try to read and change files, switch on multi-factor sign-in and fix a permissions table, to distinguish authentication from authorisation and apply least privilege (AC9TDI10K01 node 3). About 40 minutes (Predict and Try 6 min · Worked example 10 min · Vary 12 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** access control has two parts. Authentication proves who you are (a password, and with multi-factor sign-in a code from your phone too). Authorisation (permissions) then decides what you may do. Give each role only what its job needs: least privilege.

- I can explain the difference between authentication and authorisation.
- I can explain why multi-factor sign-in is safer.
- I can set permissions so each role has only what it needs.

<!-- Speaker note: Before class: Try the board yourself. The practice accounts are on the board (Sam: maple, Ms Lee: orbit, Admin: quartz-river-71; MFA code 4096); they are made up and only work here. The one idea (the kit's typical width): authentication proves identity, authorisation decides actions; both are needed on a shared system. Least privilege limits the damage from a stolen or misused account. Real-world link: the school's own systems (who can see what in the learning management system); avoid showing real accounts. Teacher: Try: ask what was checked first, and what second. Teacher: Worked example: map each line to authentication or authorisation. Teacher: Vary: ask what an attacker would need with MFA on. -->

---

## Why it matters

> You and your teacher both sign in to the same school system. Why can your teacher change marks and you can't?

<!-- Speaker note: On a shared system (a school portal, a company network), **access control** decides who gets in and what they may do. It has two separate parts: - **Authentication**: proving who you are. Usually a password; with **multi-factor** sign-in, also something you have, such as a code on your phone. - **Authorisation**: what you may do once the system knows who you are, set by **permissions**. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Sam the student signs in with the right password, then tries to change the class marks. What happens?**

- It works, but only for Sam's own mark
- Denied: signing in proves who Sam is, but students aren't allowed to change marks
- Sam is signed out
- It works: Sam signed in correctly

<!-- Speaker note: What happens: Denied. The password proved it is Sam (authentication); the permissions say students may only read Marks (authorisation). Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "it works" hold Sam's misconception. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fsystems%2Fsecurity%2Faccess%2Fstep-2&code=widget%3A+security%0Amode%3A+access%0Aperms%3A+210+%2F+220+%2F+112%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/systems/security/access/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Now sign in as Ms Lee and try the same. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Denied. The password proved it is Sam (authentication); the permissions say students may only read Marks (authorisation).

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## One request, two checks

Now name the authentication step.

$$\text{Sam types "maple"}$$

1) $\text{signed in as Sam (student)}$ — The system now knows who is asking.
2) $\text{"change Marks"}$ — Authorisation: what may students do with Marks?
3) $\text{Students: Marks = read}$ — The permissions table says read only.
4) $\text{denied}$ — Signed in, but not allowed. Least privilege: each role gets only what its job needs.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write Sam types "maple" and say "Authentication: is the password right for Sam?" Line 1: write signed in as Sam (student) and say "The system now knows who is asking." Line 2: write "change Marks" and say "Authorisation: what may students do with Marks?" Line 3: write Students: Marks = read and say "The permissions table says read only." Line 4: write denied and say "Signed in, but not allowed. Least privilege: each role gets only what its job needs." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## One request, two checks

**Which is **authentication**?**

- Logging out
- Being allowed to read a file
- Typing your password to prove who you are
- Changing the permissions table

* Answer: Typing your password to prove who you are

<!-- Speaker note: Authentication answers "who are you?"; authorisation answers "what may you do?" -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains what signing in allows. Click the line where it first goes wrong.**

```
 1  Sam signs in with the right password.
 2  So the system knows it really is Sam.
 3  So Sam is allowed to do anything on the system.
 4  So Sam can change the class marks.
```

* Answer: line 3

<!-- Speaker note: Line 3: signing in only proves who Sam is. What Sam may do is a separate check, the permissions for students. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why multi-factor?

**Why add a code from a phone (multi-factor sign-in)?**

- It replaces permissions
- It speeds up signing in
- A stolen password alone is no longer enough to get in
- It makes the password shorter

* Answer: A stolen password alone is no longer enough to get in

<!-- Speaker note: An attacker would need your password and your phone. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: one change at a time



- **A teacher:** 
- **Wrong password:** 
- **Multi-factor:** 
- **The admin role:** 

[Open this step](https://tutorials.learningwaypoints.com/systems/security/access/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: a different user, a wrong password, multi-factor sign-in, then the admin's role. For students who need more support: Two questions on the board: Who are you? (authentication) What may you do? (authorisation). For early finishers: Some systems use roles (teacher, student) and some give permissions to each person. What are the trade-offs for a school? The hard part, on purpose: Students treat "signed in" as "allowed". Keep asking two questions in order: who are you? what may you do? When students get stuck: A student says Sam can do anything once signed in (Sam's mistake). Ask: What did the password prove? What decides the rest? Fix: Signing in proves who; permissions decide what. / A student gives every role everything to make it work. Ask: What does each job actually need? Fix: Least privilege: only that. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sort them

**Authentication (who are you?) or authorisation (what may you do?)**

Groups: Authentication · Authorisation

Typing a password · A fingerprint unlock · A code from an app on your phone · Students may read but not change Marks · Only the class teacher can open the gradebook · A shared folder set to view only

* Answer: Typing a password → Authentication; A fingerprint unlock → Authentication; A code from an app on your phone → Authentication; Students may read but not change Marks → Authorisation; Only the class teacher can open the gradebook → Authorisation; A shared folder set to view only → Authorisation

<!-- Speaker note: Proving identity is authentication; rules about actions are authorisation. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Strong passwords

**Which password is strongest?**

- maple
- Password1!
- purple-otter-sings-at-dawn
- 12345678

* Answer: purple-otter-sings-at-dawn

<!-- Speaker note: Length beats tricks: a long passphrase of unrelated words is hard to guess and easy to remember. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: DNS

**Review: what does DNS do?**

- Encrypts web pages
- Blocks phishing
- Turns a name into an IP address
- Checks passwords

* Answer: Turns a name into an IP address

<!-- Speaker note: It is the internet's address book. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: least privilege

Then: which account would an attacker most want to steal, and how would you protect it?

[Open this step](https://tutorials.learningwaypoints.com/systems/security/access/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Fixing a permissions table so every role has exactly what its job needs reverses the process: students start from the jobs and set the permissions. Hints, in order: Students: change their homework, read their marks, no settings. / Teachers: change homework and marks, no settings. / Admins: read homework and marks, change settings. -->

<!-- Speaker note: Teacher: ask why admins don't get to change marks. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Give one example of authentication and one of authorisation. Why use multi-factor sign-in?**

* Authentication: a password or fingerprint. Authorisation: students may only read marks. MFA means a stolen password alone isn't enough.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Hashes and keys (how passwords are stored and secrets shared). Links: Secret messages' challenge and response is another way to prove who you are. -->
