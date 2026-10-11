---
order: 1
unit: layers
node: AC9TDI10K01 n1
title: What the operating system does
summary: "Apps never talk to hardware directly. They ask the operating system, and the OS uses a driver for each device, so one app works with any webcam or storage. Because every request goes through it, the OS can also decide which apps may use what."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "There are thousands of different webcams, and your video call app works with all of them. How?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8474
  url: http://127.0.0.1:8474/index.html
  readySelector: ".sccard"
  layout: full
explainPicture: { ref: os.yml#explain-pic, caption: "Three layers: apps ask the operating system, the operating system uses a driver for each piece of hardware." }
explainClip:
  query: { code: "@os.yml#explain", fresh: 1, id: explain }
  caption: "Apps, the OS and drivers"
  say: "The video call app asks the operating system for the camera."
  clip:
    - click: "Video call: start the camera"
    - caption: { text: "The app asks the OS; the OS uses webcam A's driver.", say: "The OS uses webcam A's driver." }
    - wait: 1200
    - click: Swap webcam
    - click: "Video call: start the camera"
    - expect: { selector: "#gsum", contains: "webcam B driver" }
    - caption: { text: "A different webcam: same app, a different driver.", say: "A new webcam needs a different driver, not a new app." }
    - wait: 1500
---
A computer runs many apps on many kinds of hardware. The **operating system** (OS: Windows, macOS, Android, iOS, ChromeOS) sits in between. Apps ask the OS to do things; the OS talks to each device through a **driver**, a small program that knows that one device.

## Predict: a new webcam

```step
stage: predict
insight: "Committing to what a new webcam means for the app tests the new move: apps talk to the OS, the OS uses a driver, so hardware can change without changing the app."
check:
  type: predict
  q: "You plug in a new brand of webcam. What has to change so your video call app can use it?"
  options: ["The OS needs a driver for the new webcam; the app stays the same", "The video call app must be rewritten", "Nothing at all: every webcam works the same inside", "The whole computer must be replaced"]
  actual: "The OS needs a driver. The app asks the OS for \"the camera\", and the OS uses whichever driver matches the webcam plugged in."
```

## Try: swap the hardware

```step
stage: run
insight: "Swapping the webcam and the storage and using the same apps settles the prediction: the apps don't change, only the driver the OS uses."
try: { playground: board, starter: "os.yml#run", height: 560 }
check: { type: board, text: "Start the camera, then swap the webcam and start it again. Save a file, swap the storage and save again. Did the apps change?", when: "c = 2 and s = 2 and o = 1 and q >= 3", explain: "The apps stayed the same; the OS used a different driver each time. That is the OS hiding the hardware from the apps." }
```

Was your prediction right? Read the message under the layers after each press.

## Worked example: one request

```step
stage: investigate
insight: "Following one request through the layers models the new move, including the OS deciding whether to allow it. Sam thinks apps talk straight to hardware, the misconception planted after the method."
tasks:
  - check:
      type: question
      q: "What is a **driver**?"
      options: ["A small program that lets the OS use one particular device", "The person using the computer", "An app that plays videos", "The cable that connects a device"]
      answer: 0
      feedback: [null, "Not a person: a piece of software.", "Apps ask the OS; drivers sit underneath it.", "The cable carries signals; the driver is software."]
      explain: "Each device comes with a driver that turns the OS's general requests (\"take a picture\") into that device's own commands."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam explains why new hardware needs new apps. Click the line where it first goes wrong."
      answer: 2
      fault: logic
      misconception: apps-talk-to-hardware
      explain: "Line 2: apps ask the OS, and the OS uses the device's driver. A new webcam needs a new driver, not a new app."
  - check:
      type: question
      q: "Because every app has to ask the OS, what else can the OS do?"
      options: ["Decide which apps may use the camera, microphone, files and network", "Make every app faster", "Fix bugs in the apps", "Stop the hardware wearing out"]
      answer: 0
      feedback: [null, "Speed depends on the app and the hardware.", "Apps are fixed by their makers.", "Hardware wears out anyway."]
      explain: "The OS is the gatekeeper: that is why your phone asks \"Allow this app to use the camera?\""
```

### Through the layers

```worked
\text{app: "start the camera"} :: The app asks for a camera, not for a particular brand.
\text{OS: is this app allowed?} :: The OS checks its permissions for that app.
\text{OS} \to \text{driver for webcam B} :: The OS picks the driver for the webcam that is plugged in.
\text{driver} \to \text{webcam B} :: The driver sends that device's own commands.
\text{picture} \to \text{OS} \to \text{app} :: The result comes back up the same way.
```

Now say what a driver is.

### Find the mistake

### The gatekeeper

## Vary: change one thing

```step
stage: modify
insight: "Each task changes one thing: a webcam with no driver, then its driver installed, then the OS refusing an app, then allowing it."
try: { playground: board, starter: "os.yml#modify", height: 560 }
tasks:
  - check: { type: board, text: "Swap to webcam B and start the video call. Webcam B's driver is missing. What happens?", when: "c = 2 and d = 0 and o = 0 and q >= 1", explain: "Without a driver, the OS can't use the device, even though it is plugged in." }
  - check: { type: board, text: "Install the driver and try again.", when: "c = 2 and d = 1 and o = 1", explain: "With the driver, the same app works." }
  - check: { type: board, text: "Press the Game's camera button. What does the OS do?", when: "g = 0 and o = 0 and q >= 1", explain: "The OS refused: Game has no permission to use the camera." }
  - check: { type: board, text: "Allow Game to use the camera and try again.", when: "g = 1 and o = 1", explain: "Now the OS lets Game through. Only give an app permissions it really needs." }
```

### No driver

### Driver installed

### Refused

### Allowed

## Practise: the OS

```step
stage: practise
insight: "Spotting the OS's two jobs (hiding hardware, controlling access) in everyday devices, and a review of packets."
tasks:
  - check:
      type: question
      q: "Your school laptop saves files to the internal drive or a USB stick, and the Save button looks the same either way. Why?"
      options: ["The app asks the OS to save; the OS uses the right driver for each", "Both drives are the same inside", "The app checks which drive it is", "USB sticks pretend to be internal drives"]
      answer: 0
      feedback: [null, "They are very different inside.", "The app doesn't need to know.", "The OS and its drivers handle the difference."]
      explain: "The OS hides the difference, so every app saves the same way."
  - check:
      type: question
      q: "A torch app asks for permission to read your contacts. What should you do?"
      options: ["Refuse: a torch doesn't need your contacts", "Allow it: apps know what they need", "Allow it, then uninstall later", "It doesn't matter"]
      answer: 0
      feedback: [null, "Apps sometimes ask for more than they need.", "By then the data may be gone.", "Your contacts are other people's private data."]
      explain: "Give each app only the permissions its job needs."
  - check:
      type: question
      q: "Review: with TCP, what happens when a packet is lost?"
      options: ["It is sent again", "The whole message restarts", "Nothing", "The router rebuilds it"]
      answer: 0
      feedback: [null, "Only the missing packet.", "TCP notices it was never confirmed.", "Routers don't rebuild packets."]
      explain: "The receiver never confirms it, so it is resent."
```

### Saving anywhere

### App permissions

### Review: packets

## Make: set up a new computer

```step
stage: make
insight: "Getting a new computer working with only the access each app needs reverses the process: students start from what should happen and set up drivers and permissions."
try: { playground: board, starter: "os.yml#make", height: 560 }
hint: ["The video call should work with webcam B.", "Webcam B needs its driver.", "Game doesn't need the camera: leave it off."]
check: { type: board, text: "Set this computer up: webcam B plugged in and working for the video call, the game NOT allowed to use the camera, and a file saved to the USB stick.", when: "c = 2 and d = 1 and g = 0 and s = 2 and q >= 2", explain: "Driver installed, least privilege for the game, and the OS saves to whichever storage is there. Both of the OS's jobs at once." }
```

Then: on your own phone, find one app with a permission it doesn't need.
