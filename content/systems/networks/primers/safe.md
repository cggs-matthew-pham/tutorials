---
title: Keeping data safe in 5 minutes
---
## The idea in plain words

Packets pass through equipment you don't control: the café's Wi-Fi, your internet provider, routers in other countries. Anyone along the way can copy them, so anything sent as plain text (a password, a card number) can be read. **Encryption** scrambles the data with a key before it leaves your device; only someone with the key can reverse it. Encryption has to be reversible, or the receiver couldn't read it either.

On the web, **HTTPS** (the padlock) encrypts everything between your browser and the website. A purchase online is the whole chain at once: encrypted on your laptop, split into packets, sent over Wi-Fi then cables, routed, resent if lost (TCP), put back in order and decrypted by the shop.

## Links

The Code pathway's **Secret messages** course builds ciphers (Caesar, XOR), cracks them and shares keys on micro:bits. These lessons show what encryption is for; that course shows how ciphers work.

## What students get wrong

- **"Only the receiver sees my message."** Every router on the path handles it.
- **Encryption happens at the router.** It happens on your device, before the data leaves.

## The words

**encryption**, **decryption**, **key**, **plain text**, **cipher text**, **HTTPS**, **eavesdropper**.
