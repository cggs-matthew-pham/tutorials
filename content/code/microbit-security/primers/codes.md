---
title: Ciphers and keys in 5 minutes
---
## The idea in plain words

A **cipher** is a method for scrambling a message with a **key**. The **Caesar cipher** shifts every letter by the key. It is easy to break because there are only 25 keys to try. **XOR** mixes a number with a key, and doing it again with the same key undoes it, so one shared key works both ways.

The strength of a cipher comes from how many keys there are and how little the scrambled message gives away. A long message does not make a weak cipher stronger.

## Why it matters

Modern ciphers have the same shape: a public method and a secret key, but with keys of 128 bits or more, so trying them all is impossible.

## An everyday picture, and where it breaks

A combination padlock: everyone knows how it works; only the number is secret. Where it breaks: a three-digit padlock has 1000 combinations, which can be tried in minutes. That is the Caesar cipher's problem.

## Try it yourself (5 minutes)

1. Open **The Caesar cipher** and run it.
2. Press A: HELLO becomes KHOOR.
3. Open **Breaking a Caesar cipher** and press A until the text reads as English.

## Questions students ask

- **"Why is it called Caesar?"** Julius Caesar is said to have used a shift of three.
- **"What is XOR?"** Compare two numbers bit by bit: 1 where they differ, 0 where they match.
