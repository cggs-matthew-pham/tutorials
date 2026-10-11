---
title: Security and privacy in 5 minutes
---
## The idea in plain words

The **operating system** sits between apps and hardware. Apps ask it to use the camera or save a file; it uses a **driver** for each device, so the same app works with any webcam, and it decides which apps may use what.

To reach a website, **DNS** turns its name into an **IP address**; every packet carries that address, and **routers** use their tables to send it the right way. A lookalike name (schoo1 instead of school) leads to a different address, and a different server.

**Authentication** proves who you are (a password, plus a code with multi-factor sign-in). **Authorisation** (permissions) decides what you may then do. Give each role only what its job needs (**least privilege**).

Passwords are stored as **hashes**: a one-way scramble, the same every time for the same password, so a login can be checked without storing the password. A **salt** makes identical passwords hash differently. **Public key** encryption is like an open padlock anyone can snap shut, while only its owner has the key; it is how HTTPS sets up a secret with a website.

## Links

The Code pathway's **Secret messages** course builds ciphers, key exchange and challenge-response on micro:bits, and ends with its own capture the flag.

## What students get wrong

- **Apps talk straight to hardware.** They go through the OS and its drivers.
- **A link that looks right is right.** One character can change the address.
- **Signing in means you can do anything.** Authentication and authorisation are separate.
- **Websites store your password.** Good ones store only a salted hash.
- **The public key opens the message.** It only locks; the private key opens.

## The words

**operating system**, **driver**, **IP address**, **DNS**, **router**, **authentication**, **authorisation**, **least privilege**, **multi-factor**, **hash**, **salt**, **public key**, **private key**.
