---
title: "What the operating system does"
subtitle: "Security and privacy · How systems are kept safe · Lesson 1"
---

# What the operating system does

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** There are thousands of different webcams, and your video call app works with all of them. How?


:::teacher-note

**In one sentence:** Students swap webcams and storage under unchanged apps, install a missing driver and grant or refuse an app's camera permission, to explain how the operating system hides hardware from applications and controls access (AC9TDI10K01 node 1).

**Students should be able to say:** I can explain what the operating system does between apps and hardware. I can say what a driver is for. I can explain how the OS controls what apps may use.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**You plug in a new brand of webcam. What has to change so your video call app can use it?**

☐ Nothing at all: every webcam works the same inside

☐ The OS needs a driver for the new webcam; the app stays the same

☐ The whole computer must be replaced

☐ The video call app must be rewritten

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The OS needs a driver. The app asks the OS for "the camera", and the OS uses whichever driver matches the webcam plugged in.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: one request


:::keep-together

### Through the layers

1. $\text{app: "start the camera"}$ — The app asks for a camera, not for a particular brand.
2. $\text{OS: is this app allowed?}$ — The OS checks its permissions for that app.
3. $\text{OS} \to \text{driver for webcam B}$ — The OS picks the driver for the webcam that is plugged in.
4. $\text{driver} \to \text{webcam B}$ — The driver sends that device's own commands.
5. $\text{picture} \to \text{OS} \to \text{app}$ — The result comes back up the same way.

Now say what a driver is.

**What is a **driver**?**

☐ The cable that connects a device

☐ The person using the computer

☐ An app that plays videos

☐ A small program that lets the OS use one particular device

:::


:::teacher-note

**Answer:** A small program that lets the OS use one particular device

Each device comes with a driver that turns the OS's general requests ("take a picture") into that device's own commands.

:::


:::keep-together

### Find the mistake

**Sam explains why new hardware needs new apps. Click the line where it first goes wrong.**

```
 1  A new brand of webcam is plugged in.
 2  The video call app talks straight to the webcam.
 3  So the app has to be rewritten for the new webcam.
 4  That is why every app needs an update for new hardware.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2: apps ask the OS, and the OS uses the device's driver. A new webcam needs a new driver, not a new app.

:::


:::keep-together

### The gatekeeper

**Because every app has to ask the OS, what else can the OS do?**

☐ Stop the hardware wearing out

☐ Decide which apps may use the camera, microphone, files and network

☐ Make every app faster

☐ Fix bugs in the apps

:::


:::teacher-note

**Answer:** Decide which apps may use the camera, microphone, files and network

The OS is the gatekeeper: that is why your phone asks "Allow this app to use the camera?"

:::


:::typical

## Vary: change one thing


**No driver.** 

**Driver installed.** 

**Refused.** 

**Allowed.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## The OS


:::keep-together

### Saving anywhere

**Your school laptop saves files to the internal drive or a USB stick, and the Save button looks the same either way. Why?**

☐ Both drives are the same inside

☐ The app checks which drive it is

☐ The app asks the OS to save; the OS uses the right driver for each

☐ USB sticks pretend to be internal drives

:::


:::teacher-note

**Answer:** The app asks the OS to save; the OS uses the right driver for each

The OS hides the difference, so every app saves the same way.

:::


:::keep-together

### App permissions

**A torch app asks for permission to read your contacts. What should you do?**

☐ It doesn't matter

☐ Refuse: a torch doesn't need your contacts

☐ Allow it: apps know what they need

☐ Allow it, then uninstall later

:::


:::teacher-note

**Answer:** Refuse: a torch doesn't need your contacts

Give each app only the permissions its job needs.

:::


:::keep-together

### Review: packets

**Review: with TCP, what happens when a packet is lost?**

☐ The router rebuilds it

☐ Nothing

☐ The whole message restarts

☐ It is sent again

:::


:::teacher-note

**Answer:** It is sent again

The receiver never confirms it, so it is resent.

:::


## Make: set up a new computer

Then: on your own phone, find one app with a permission it doesn't need.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Why doesn't a video app need updating when you buy a new webcam? Give one way the OS protects you.**

{{lines-3}}

:::


:::teacher-note

**Answer:** It asks the OS, which uses the new webcam's driver. It decides which apps may use the camera, microphone or files.

:::

