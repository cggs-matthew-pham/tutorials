---
title: Engineering
trail: units
summary: "Build it, test it, improve it. An elective layer on top of the core curriculum for schools with kits, a makerspace or a STEM elective: mechanisms, circuits and microcontrollers, CAD and 3D printing. Each lesson teaches one engineering idea on a board or simulator, then a design brief tests it against criteria. It applies maths, science and code rather than re-teaching them."
pathways:
  - id: mechanisms
    title: Mechanisms
    summary: Gears, levers and pulleys trade speed or distance for force; cranks, cams and linkages change one motion into another.
    fit: "Start here: no kits needed, and every lesson works in the browser."
    about: "Design and Technologies (Engineering principles and systems) is the home; ratio from Maths, forces and simple machines from Science and loops from Code are applied, not taught. Each lesson is the maths shape (Predict, Try on a board, Worked example, Vary, Practise, Make) around a design brief with criteria and constraints. LEGO Technic or Meccano gears make a good hands-on start before the board."
    courses:
      - { path: engineering/mechanisms, id: mechanisms, stage: foundations, tagline: "Gears, levers and pulleys: trade speed or distance for strength." }
      - { path: engineering/linkages, id: linkages, stage: extensions, after: [mechanisms], tagline: "Change how things move." }
  - id: physical
    title: Physical computing
    summary: Circuits, sensors and motors, from the micro:bit in Tinkercad to Arduino C++ on real hardware.
    fit: "Start here to wire real circuits and program a microcontroller in text code."
    about: "Builds on micro:bit Foundations (Code). Circuits on the micro:bit in Tinkercad, then the same circuits on an Arduino Uno in blocks, then in C++, then on a breadboard. Common parts (buttons, sensors, servos, displays) get Reference cards. Power, motor drivers and batteries are a Years 9–10 extension. A Raspberry Pi Pico nod shows the same ideas in MicroPython."
    courses:
      - { path: engineering/circuits, id: circuits, stage: foundations, tagline: "Wire an LED, a button and a sensor." }
      - { path: engineering/arduino, id: arduino, stage: foundations, after: [circuits], tagline: "From blocks to C++ on a real board." }
      - { path: engineering/power, id: power, stage: extensions, after: [arduino], tagline: "Make it move." }
      - { path: engineering/projects, id: projects, stage: extensions, after: [arduino], tagline: "Design, build and prove it." }
  - id: cad
    title: CAD and fabrication
    summary: Design parts to size in Tinkercad and Onshape, then 3D print or laser cut them.
    fit: "Start here to design a part that fits, then print it."
    about: "Tinkercad 3D (same class accounts as Tinkercad Circuits) for the first course, Onshape (free for education, in the browser) for parametric design. Each lesson's board models the idea (sizes, clearances, orientation, slicer settings, kerf) so it can be checked; a step in each lesson does it for real in Tinkercad, a slicer or on the school's printer or laser cutter. Calibrate the fit lessons to your own printer."
    courses:
      - { path: engineering/cad, id: cad, stage: foundations, tagline: "Design a part that fits." }
      - { path: engineering/parametric, id: parametric, stage: extensions, after: [cad], tagline: "Change one number, update the model." }
  - id: boards
    title: Design your own board
    summary: From breadboard to protoboard and soldering, then a schematic and a PCB.
    fit: "Start here to turn a breadboard circuit into a board of your own."
    courses:
      - { path: engineering/pcb, id: pcb, stage: extensions, tagline: "Design a circuit board." }
---
