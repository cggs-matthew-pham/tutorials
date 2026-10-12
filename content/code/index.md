---
title: Code
trail: units
summary: Learn to program by predicting, running, investigating, modifying and making. Three pathways share the same big ideas; start with whichever fits your class.
pathways:
  - id: python
    title: Python
    summary: From drawing with a turtle to apps, games and machine learning.
    fit: "Start here to type real code: drawing first, then apps, games and data."
    about: "Start with **Python Foundations with Turtle**: commands, loops, variables, decisions and lists. **Python functions and events** follows: your own functions, modules and events, ending in a game you build in milestones. The **console bridge** then shows the same logic as text in and text out, and every extension starts from it: deeper Python in the console, web apps with Gradio (and machine learning after both), and games."
    courses:
      - { path: code/python, stage: foundations }
      - { path: code/functions, stage: foundations, after: [code/python] }
      - { path: code/console, stage: foundations, after: [code/functions] }
      - { path: code/objects, stage: extensions, after: [code/console] }
      - { path: code/data, stage: extensions, after: [code/console] }
      - { path: code/deeper, stage: extensions, after: [code/console] }
      - { path: code/gradio, stage: extensions, after: [code/console] }
      - { path: code/ml, stage: extensions, after: [code/data] }
      - { path: code/games, stage: extensions, after: [code/objects] }
      - { path: code/flask, stage: extensions, after: [code/console, code/html] }
  - id: web
    title: Web
    summary: Build pages, then make them draw, move and react.
    fit: "Start here to build your own web pages, then make them draw, move and react."
    about: "Start with **HTML & CSS**: how a page is built from tags and styled with rules. The extensions bring in JavaScript, first drawing and animating with p5.js (the same ideas as turtle), then changing a real page when people click and type. **Pages with Bootstrap** rebuilds the club page from ready-made parts (with a look at Bulma, Tailwind, daisyUI and Pico). **Apps with Vue** follows the DOM course: the page keeps up with the data by itself, ending in a to-do app and the same app in Vue, Preact and Svelte. Every route ends with **Your site, for real**: make your page work for everyone, then put it online."
    courses:
      - { path: code/html, stage: foundations }
      - { path: code/bootstrap, stage: extensions, after: [code/html] }
      - { path: code/p5, stage: extensions, after: [code/html] }
      - { path: code/dom, stage: extensions, after: [code/p5] }
      - { path: code/vue, stage: extensions, after: [code/dom] }
      - { path: code/site, stage: extensions, after: [code/html] }
      - { path: code/flask, stage: extensions, after: [code/html, code/console] }
  - id: makecode
    title: MakeCode
    summary: Blocks first, then Python, with real devices and games.
    fit: "Start here if you're new to code, or want to program a micro:bit, a robot or a game with blocks."
    about: "MakeCode starts with blocks and shows the same program in Python, so it suits younger students and students new to code. Two foundations courses run side by side, so start with either: **micro:bit Foundations** (pictures, buttons, sensors, decisions, lists, functions and radio, all in the simulator) and **MakeCode Arcade** (games with sprites, overlaps, scores and levels, ending with working out which games Arcade does well). **Robotics challenges** follows micro:bit Foundations: learn each idea in the robot simulator, then run it on a real two-wheeled robot (the lessons use the Elecfreaks Cutebot; other supported robots change one block). **micro:bit and the computer** also follows Foundations: graph a micro:bit's sensors on the computer, send it commands, build a radio bridge, then train an image model in Teachable Machine and send its labels to a micro:bit. **AI robots** brings the two together: a robot driven by your model, kept safe when the model is unsure, silent or wrong. **Secret messages** is about keeping radio messages private, unchanged and trusted: ciphers, a key exchange, checksums and a challenge–response lock, ending in a capture-the-flag finale."
    courses:
      - { path: code/microbit, stage: foundations }
      - { path: code/arcade, stage: foundations }
      - { path: code/robotics, stage: extensions, after: [code/microbit] }
      - { path: code/microbit-computer, stage: extensions, after: [code/microbit] }
      - { path: code/ai-robots, stage: extensions, after: [code/robotics, code/microbit-computer] }
      - { path: code/microbit-security, stage: extensions, after: [code/microbit] }
---
