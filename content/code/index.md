---
title: Code
summary: Learn to program by predicting, running, investigating, modifying and making. Three pathways share the same big ideas; start with whichever fits your class.
pathways:
  - id: python
    title: Python
    summary: From drawing with a turtle to apps, games and machine learning.
    about: "Start with **Python Foundations with Turtle**: commands, loops, variables, decisions, lists, functions and events, ending in a game you build in milestones. The **console bridge** then shows the same logic as text in and text out, and every extension starts from it: deeper Python in the console, web apps with Gradio (and machine learning after both), and games."
    courses:
      - { path: code/python, stage: foundations }
      - { id: console-bridge, title: "Console bridge: text in, text out", stage: foundations, summary: "input(), print() and a text menu: the same logic without the turtle. Every extension starts here.", after: [code/python] }
      - { id: console-deep, title: Deeper Python in the console, stage: extensions, summary: "Strings, dictionaries, files and errors.", after: [console-bridge] }
      - { path: code/gradio, stage: extensions, after: [console-bridge] }
      - { title: Machine learning with Gradio, stage: extensions, summary: "Train small models on data, and put a model behind an app.", after: [console-deep, code/gradio] }
      - { title: Games with microStudio, stage: extensions, summary: "Sprites, maps, sound and a game loop in text code.", after: [console-bridge] }
  - id: web
    title: Web
    summary: Build pages, then make them draw, move and react.
    about: "Start with **HTML & CSS**: how a page is built from tags and styled with rules. The extensions bring in JavaScript, first drawing and animating with p5.js (the same ideas as turtle), then changing a real page when people click and type."
    courses:
      - { path: code/html, stage: foundations }
      - { title: Drawing and animation with p5.js, stage: extensions, summary: "JavaScript on a canvas: the same ideas as turtle, in a new language." }
      - { title: "The DOM and the browser console", stage: extensions, summary: "JavaScript that changes a real page when people click and type." }
  - id: makecode
    title: MakeCode
    summary: Blocks first, then Python, with real devices and games.
    about: "MakeCode starts with blocks and shows the same program in Python, so it suits younger students and students new to code. Two foundations courses run side by side, so start with either: **micro:bit Foundations** (pictures, buttons, sensors, decisions, lists, functions and radio, all in the simulator) and **MakeCode Arcade** (games with sprites, overlaps, scores and levels, ending with working out which games Arcade does well). **Robotics challenges** follows micro:bit Foundations: learn each idea in the robot simulator, then run it on a real two-wheeled robot (the lessons use the Elecfreaks Cutebot; other supported robots change one block). **micro:bit and the computer** also follows Foundations: graph a micro:bit's sensors on the computer, send it commands, build a radio bridge, then train an image model in Teachable Machine and send its labels to a micro:bit. **AI robots** brings the two together: a robot driven by your model, kept safe when the model is unsure, silent or wrong."
    courses:
      - { path: code/microbit, stage: foundations }
      - { path: code/arcade, stage: foundations }
      - { path: code/robotics, stage: extensions, after: [code/microbit] }
      - { path: code/microbit-computer, stage: extensions, after: [code/microbit] }
      - { path: code/ai-robots, stage: extensions, after: [code/robotics, code/microbit-computer] }
---
