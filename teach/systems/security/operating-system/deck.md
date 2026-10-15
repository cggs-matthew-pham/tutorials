---
marp: true
theme: default
html: true
---

# What the operating system does

Security and privacy · How systems are kept safe

<!-- Speaker note: Students swap webcams and storage under unchanged apps, install a missing driver and grant or refuse an app's camera permission, to explain how the operating system hides hardware from applications and controls access (AC9TDI10K01 node 1). About 35 minutes (Predict and Try 6 min · Worked example 9 min · Vary 10 min · Practise and Make 10 min). -->

---

## Today

**We are learning to** apps never talk to hardware directly. They ask the operating system, and the OS uses a driver for each device, so one app works with any webcam or storage. Because every request goes through it, the OS can also decide which apps may use what.

- I can explain what the operating system does between apps and hardware.
- I can say what a driver is for.
- I can explain how the OS controls what apps may use.

<!-- Speaker note: Before class: Try the board yourself. The one idea: the OS is a layer of abstraction (apps ask for "a camera"; drivers handle each device) and, because it is in the middle, it is the gatekeeper for access. The access idea returns in lesson 3. Hands-on: show Device Manager (Windows) or System Information (macOS) on a school laptop, and a phone's app permission screen. Teacher: Try: ask what stayed the same and what changed each time. Teacher: Worked example: ask who checks the permission, the app or the OS. Teacher: Vary: ask why the OS refuses before the camera is even touched. -->

---

## Why it matters

> There are thousands of different webcams, and your video call app works with all of them. How?

<!-- Speaker note: A computer runs many apps on many kinds of hardware. The **operating system** (OS: Windows, macOS, Android, iOS, ChromeOS) sits in between. Apps ask the OS to do things; the OS talks to each device through a **driver**, a small program that knows that one device. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**You plug in a new brand of webcam. What has to change so your video call app can use it?**

- Nothing at all: every webcam works the same inside
- The OS needs a driver for the new webcam; the app stays the same
- The whole computer must be replaced
- The video call app must be rewritten

<!-- Speaker note: What happens: The OS needs a driver. The app asks the OS for "the camera", and the OS uses whichever driver matches the webcam plugged in. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose "rewrite the app" hold Sam's misconception. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-board/index.html?id=deck%2Fsystems%2Fsecurity%2Foperating-system%2Fstep-2&code=widget%3A+security%0Amode%3A+os%0Adriver%3A+on%0A&fresh=1}}

[Open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/systems/security/operating-system/?full=step-2#step-2)

<!-- Speaker note: Was your prediction right? Read the message under the layers after each press. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The OS needs a driver. The app asks the OS for "the camera", and the OS uses whichever driver matches the webcam plugged in.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Through the layers

Now say what a driver is.

$$\text{app: "start the camera"}$$

1) $\text{OS: is this app allowed?}$ — The OS checks its permissions for that app.
2) $\text{OS} \to \text{driver for webcam B}$ — The OS picks the driver for the webcam that is plugged in.
3) $\text{driver} \to \text{webcam B}$ — The driver sends that device's own commands.
4) $\text{picture} \to \text{OS} \to \text{app}$ — The result comes back up the same way.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write app: "start the camera" and say "The app asks for a camera, not for a particular brand." Line 1: write OS: is this app allowed? and say "The OS checks its permissions for that app." Line 2: write OS driver for webcam B and say "The OS picks the driver for the webcam that is plugged in." Line 3: write driver webcam B and say "The driver sends that device's own commands." Line 4: write picture OS app and say "The result comes back up the same way." -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Through the layers

**What is a **driver**?**

- The cable that connects a device
- The person using the computer
- An app that plays videos
- A small program that lets the OS use one particular device

* Answer: A small program that lets the OS use one particular device

<!-- Speaker note: Each device comes with a driver that turns the OS's general requests ("take a picture") into that device's own commands. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Sam explains why new hardware needs new apps. Click the line where it first goes wrong.**

```
 1  A new brand of webcam is plugged in.
 2  The video call app talks straight to the webcam.
 3  So the app has to be rewritten for the new webcam.
 4  That is why every app needs an update for new hardware.
```

* Answer: line 2

<!-- Speaker note: Line 2: apps ask the OS, and the OS uses the device's driver. A new webcam needs a new driver, not a new app. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The gatekeeper

**Because every app has to ask the OS, what else can the OS do?**

- Stop the hardware wearing out
- Decide which apps may use the camera, microphone, files and network
- Make every app faster
- Fix bugs in the apps

* Answer: Decide which apps may use the camera, microphone, files and network

<!-- Speaker note: The OS is the gatekeeper: that is why your phone asks "Allow this app to use the camera?" -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Vary: change one thing



- **No driver:** 
- **Driver installed:** 
- **Refused:** 
- **Allowed:** 

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/security/operating-system/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Each task changes one thing: a webcam with no driver, then its driver installed, then the OS refusing an app, then allowing it. For students who need more support: A three-layer diagram card: Apps / Operating system (permissions, drivers) / Hardware. For early finishers: Why can a phone app ask for the camera but not read another app's files? Look up what a sandbox is. The hard part, on purpose: The layers are invisible in everyday use. Keep pointing at the three rows on the board and ask "who is talking to whom?" When students get stuck: A student says the app talks to the webcam (Sam's mistake). Ask: Which row does the app's request go to first? Fix: To the OS, which uses the driver. / A student confuses drivers and apps. Ask: Which one would you see on your home screen? Fix: Apps; drivers are hidden inside the OS. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Saving anywhere

**Your school laptop saves files to the internal drive or a USB stick, and the Save button looks the same either way. Why?**

- Both drives are the same inside
- The app checks which drive it is
- The app asks the OS to save; the OS uses the right driver for each
- USB sticks pretend to be internal drives

* Answer: The app asks the OS to save; the OS uses the right driver for each

<!-- Speaker note: The OS hides the difference, so every app saves the same way. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## App permissions

**A torch app asks for permission to read your contacts. What should you do?**

- It doesn't matter
- Refuse: a torch doesn't need your contacts
- Allow it: apps know what they need
- Allow it, then uninstall later

* Answer: Refuse: a torch doesn't need your contacts

<!-- Speaker note: Give each app only the permissions its job needs. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: packets

**Review: with TCP, what happens when a packet is lost?**

- The router rebuilds it
- Nothing
- The whole message restarts
- It is sent again

* Answer: It is sent again

<!-- Speaker note: The receiver never confirms it, so it is resent. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: set up a new computer

Then: on your own phone, find one app with a permission it doesn't need.

[Open this step](https://studio.learningwaypoints.com/tutorials/systems/security/operating-system/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Getting a new computer working with only the access each app needs reverses the process: students start from what should happen and set up drivers and permissions. Hints, in order: The video call should work with webcam B. / Webcam B needs its driver. / Game doesn't need the camera: leave it off. -->

<!-- Speaker note: Teacher: compare: did anyone give the game camera access, and why not? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why doesn't a video app need updating when you buy a new webcam? Give one way the OS protects you.**

* It asks the OS, which uses the new webcam's driver. It decides which apps may use the camera, microphone or files.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: Names and addresses (DNS and IP). Where it leads: Who are you, and what may you do? (sign-in and permissions on a shared system). -->
