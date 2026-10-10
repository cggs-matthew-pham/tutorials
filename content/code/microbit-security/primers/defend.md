---
title: Defending a system in 5 minutes
---
## The idea in plain words

Security work has two sides: **red team** (try to find weaknesses) and **blue team** (defend). This course takes the blue team's side: students audit a system they own and fix each weakness.

A good audit asks three questions about any message: **Who can read it?** **Could it have been changed?** **Is it fresh and from the right sender?** Each has a tool: a cipher, a keyed checksum, a challenge and response. A system is as strong as the weakest of the three.

A **capture-the-flag** (CTF) contest is a set of puzzles, each with a secret answer, the flag. It is a friendly way to practise.

## An everyday picture, and where it breaks

A house: locks on the doors (private), a seal on a parcel (unchanged), asking for the secret word at the door (fresh and from the right person). Where it breaks: a house has an owner who watches. A radio message has no one watching it, so the checks have to live in the message.

## Try it yourself (5 minutes)

1. Open **Defend the door lock** and run the weak lock.
2. Ask: who could read the code, who could tell a damaged message, and what happens to a code heard yesterday?

## Questions students ask

- **"Is this enough to protect a real door?"** No. Real locks use proven tools and well-guarded keys.
- **"Can we try breaking each other's locks?"** Give the pair-swap in the teacher notes a go: you try your own key on a partner's lock. It should open for the key and no one else.
