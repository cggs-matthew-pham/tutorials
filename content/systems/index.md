---
title: Digital systems
trail: units
summary: How computers work, without code. Short lessons on how data is stored as numbers, how networks move it and how it is kept safe. Each one is a board to try, a worked example and a few checks, for introducing an idea or revising it. They link to the coding lessons that put the same ideas to work.
pathways:
  - id: data
    title: Data representation
    summary: Bits and binary numbers, then text, colour, images and sound as numbers, then making data smaller.
    fit: "Start here to see how a computer stores every number, letter, colour and sound as 0s and 1s."
    about: "**Data representation** follows the Digital Technologies Knowledge and understanding strand: Years 7–8 AC9TDI8K04 (how and why digital systems represent integers in binary) and AC9TDI8K03 (text, image and audio data as integers). **Making data smaller** is Years 9–10 (AC9TDI10K03, simple compression). No coding needed. The binary cards come from CS Unplugged; doing them with real cards first works well."
    courses:
      - { path: systems/data, id: data-representation, stage: foundations, tagline: "Bits, binary numbers, and how many patterns a few bits can make." }
      - { title: Making data smaller, id: compression, stage: extensions, after: [data-representation], summary: "Run-length encoding, and when it is fine to throw data away (lossy and lossless).", tagline: "Squash data and see what is lost." }
  - id: networks
    title: Networks and security
    summary: How data moves between computers, and how it is kept safe on the way.
    fit: "Start here to follow a message across the internet and see what keeps it private."
    courses:
      - { title: Networks, id: networks, stage: foundations, summary: "Packets, addresses and routes: how a message finds its way, and what happens when a link breaks.", tagline: "Follow a packet across the internet." }
      - { title: Security and privacy, id: security, stage: extensions, after: [networks], summary: "What encryption is for, hashing passwords and spotting phishing. The coding course Secret messages builds the ciphers themselves.", tagline: "What keeps your data safe, and what doesn't." }
  - id: hardware
    title: Hardware and logic
    summary: What is inside a computer, and how simple on-off switches add up to logic.
    fit: "Start here to open up a computer and build logic from switches."
    courses:
      - { title: Inside a computer, id: hardware, stage: foundations, summary: "Processor, memory and storage, and choosing hardware for a job.", tagline: "Processor, memory and storage." }
      - { title: Logic gates, id: logic, stage: extensions, summary: "AND, OR and NOT as switches, and truth tables.", tagline: "Build logic from on and off." }
---
