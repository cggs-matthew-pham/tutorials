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
      - { path: code/python-foundations, stage: foundations }
      - { path: code/python-functions, stage: foundations, after: [code/python-foundations] }
      - { path: code/console, stage: foundations, after: [code/python-functions] }
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
    about: "Start with **Structure and style a page**: how a page is built from tags and given colour with CSS rules. **Layout and components** then lays the same page out with boxes, Flexbox and cards. The extensions bring in JavaScript, first drawing and animating with p5.js (the same ideas as turtle), then changing a real page when people click and type. **Pages with Bootstrap** rebuilds the club page from ready-made parts (with a look at Bulma, Tailwind, daisyUI and Pico). **Apps with Vue** follows the DOM course: the page keeps up with the data by itself, ending in a to-do app and the same app in Vue, Preact and Svelte. Every route ends with **Your site, for real**: make your page work for everyone, then put it online."
    courses:
      - { path: code/html, stage: foundations }
      - { path: code/css, stage: foundations, after: [code/html] }
      - { path: code/bootstrap, stage: extensions, after: [code/css] }
      - { path: code/p5, stage: extensions, after: [code/html] }
      - { path: code/dom, stage: extensions, after: [code/p5, code/css] }
      - { path: code/vue, stage: extensions, after: [code/dom] }
      - { path: code/site, stage: extensions, after: [code/css] }
      - { path: code/flask, stage: extensions, after: [code/html, code/console] }
  - id: makecode
    title: MakeCode
    summary: Blocks first, then Python, with real devices and games.
    fit: "Start here if you're new to code, or want to program a micro:bit, a robot or a game with blocks."
    about: "MakeCode starts with blocks and shows the same program in Python, so it suits younger students and students new to code. Two foundations tracks run side by side, so start with either: **micro:bit Foundations** (pictures, loops, buttons, variables, sensors, decisions and lists, all in the simulator, ending with a pocket pet), then **micro:bit: talk and play** (functions, radio and timing, ending with a reaction game and a radio duel); or **Arcade Foundations** (games with sprites, speed, overlaps, score and lives, timers, decisions and projectiles, ending with Space dodger), then **Arcade advanced skills** (every sprite of a kind, functions, gravity and jumping, levels and power-ups, ending with working out which games Arcade does well; each unit points to a MakeCode skillmap that practises it). **Robotics challenges** follows micro:bit: talk and play: learn each idea in the robot simulator, then run it on a real two-wheeled robot (the lessons use the Elecfreaks Cutebot; other supported robots change one block). **micro:bit and the computer** also follows micro:bit: talk and play: graph a micro:bit's sensors on the computer, send it commands, build a radio bridge, then train an image model in Teachable Machine and send its labels to a micro:bit. **AI robots** brings the two together: a robot driven by your model, kept safe when the model is unsure, silent or wrong. **Secret messages** is about keeping radio messages private, unchanged and trusted: ciphers, a key exchange, checksums and a challenge–response lock, ending in a capture-the-flag finale."
    courses:
      - { path: code/microbit, stage: foundations }
      - { path: code/microbit-play, stage: foundations, after: [code/microbit] }
      - { path: code/arcade, stage: foundations }
      - { path: code/arcade-advanced, stage: foundations, after: [code/arcade] }
      - { path: code/robotics, stage: extensions, after: [code/microbit-play] }
      - { path: code/microbit-computer, stage: extensions, after: [code/microbit-play] }
      - { path: code/ai-robots, stage: extensions, after: [code/robotics, code/microbit-computer] }
      - { path: code/microbit-security, stage: extensions, after: [code/microbit-play] }
---
