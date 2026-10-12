---
title: Digital systems
map: true
trail: units
summary: How computers work, without code. Short lessons on how data is stored as numbers, how networks move it and how it is kept safe. Each one is a board to try, a worked example and a few checks, for introducing an idea or revising it. They link to the coding lessons that put the same ideas to work.
pathways:
  - id: data
    title: Data representation
    summary: Bits and binary numbers, then text, colour, images and sound as numbers, then making data smaller.
    fit: "Start here to see how a computer stores every number, letter, colour and sound as 0s and 1s."
    about: "**Data representation** follows the Digital Technologies Knowledge and understanding strand: Years 7–8 AC9TDI8K04 (how and why digital systems represent integers in binary) and AC9TDI8K03 (text, image and audio data as integers). **Making data smaller** is Years 9–10 (AC9TDI10K03, simple compression). **How a web page is made** is Years 9–10 (AC9TDI10K02): content, structure and presentation, and why they are kept apart, with no coding needed; the Code pathway's HTML & CSS course puts it to work. No coding needed. The binary cards come from CS Unplugged; doing them with real cards first works well."
    courses:
      - { path: systems/data, id: data-representation, stage: foundations, tagline: "Bits, binary numbers, and how many patterns a few bits can make." }
      - { path: systems/compression, id: compression, stage: extensions, after: [data-representation], tagline: "Squash data and see what is lost." }
      - { path: systems/web, id: web-docs, stage: extensions, after: [data-representation], tagline: "Words, tags and style: three layers of every page." }
  - id: networks
    title: Networks and security
    summary: How data moves between computers, how it is kept safe, and how to protect your accounts and privacy.
    fit: "Start here to follow a message across the internet and see what keeps it private."
    about: "**Networks** follows AC9TDI8K02 (Years 7–8): wired and wireless links, packets and TCP, why data needs encrypting, and the whole journey of a message. The Code pathway's **Secret messages** course (MakeCode) builds, cracks and shares ciphers; these lessons show what encryption is for. **Security and privacy** (Years 9–10, AC9TDI10K01): the operating system, names and addresses, sign-in and permissions, hashes and keys, then a capture-the-flag finale. **Cyber safety and privacy** covers the Processes strand's privacy and security descriptors as missions on a made-up club app: Years 7–8 AC9TDI8P13 (passwords, second factors, phishing) and AC9TDI8P14 (digital footprint), Years 9–10 AC9TDI10P13 (threat models, kinds of weakness) and AC9TDI10P14 (the Australian Privacy Principles), then a security review that earns flags. It is defensive throughout. **Capture the flag** (Years 8–10) adds two skills, encoding is not encryption and what your own page gives away, then a capture the flag on the club's old archive that uses decoding, page source, the command line and the tiny processor. For more capture-the-flag practice beyond this site, picoCTF (Carnegie Mellon) is free for school students; check its account and age requirements first."
    courses:
      - { path: systems/networks, id: networks, stage: foundations, tagline: "Follow a packet across the internet." }
      - { path: systems/cyber, id: cyber, stage: foundations, tagline: "Keep the club's app, and yourself, safe." }
      - { path: systems/ctf, id: ctf, stage: extensions, after: [cyber, networks, web-docs], tagline: "Find what's exposed before anyone else does." }
      - { path: systems/security, id: security, stage: extensions, after: [networks], tagline: "What keeps your data safe, and what doesn't." }
  - id: hardware
    title: Hardware and logic
    summary: What is inside a computer, and how simple on-off switches add up to logic.
    fit: "Start here to open up a computer and build logic from switches."
    about: "**Inside a computer** follows AC9TDI8K01 (Years 7–8): what each specification measures, how it affects performance (finding the bottleneck), and choosing hardware for a job within a budget. Logic gates are introduced in Data representation (Why binary: logic gates); **From gates to a processor** (Years 9–10 extension) goes deeper: circuits from truth tables, adders, a latch that remembers, and a tiny processor that fetches, decodes and executes."
    courses:
      - { path: systems/hardware, id: hardware, stage: foundations, tagline: "Processor, memory and storage: what makes it fast." }
      - { path: systems/logic, id: logic, stage: extensions, after: [data-representation, hardware], tagline: "Build a calculator from switches." }
  - id: cli
    title: The command line
    summary: Use a computer by typing, as on servers and Raspberry Pis.
    fit: "Start here to run a computer the way servers are run: by typing."
    about: "**The command line** (Years 8–10) supports AC9TDI10K01 (what the operating system does, and access control): folders and paths, reading and finding, changing files, pipes and permissions, on a pretend Linux computer in the browser. For the real thing: a Raspberry Pi, WebVM in a browser tab, or Mac Terminal (teacher notes)."
    courses:
      - { path: systems/shell, id: shell, stage: foundations, tagline: "Talk to the computer in its own words." }
---
