---
title: Keys, checks and challenges in 5 minutes
---
## The idea in plain words

Three problems remain after a message is scrambled:

- **How do both ends get the same key?** A **key exchange** lets two ends agree on a key in public: each mixes a private number with public numbers, swaps the mixes, and mixes again.
- **Was the message changed?** A **checksum** is a number worked out from the message and sent with it. Mixing in a secret key stops anyone without the key making a matching number.
- **Is this message fresh, from someone with the key?** A **challenge and response**: the receiver sends a random number, and the sender answers using the key. A new challenge means an old answer is useless.

## Everyday pictures, and where they break

Key exchange: mixing paint. Each person adds a private colour to a common one and shares the result; adding their own colour to the other's mixture gives both the same final colour. It breaks because numbers can be un-mixed if they are small.

Challenge and response: a bank asking for a random character of your password. It breaks if the question repeats.

## Try it yourself (5 minutes)

1. Open **Agreeing a key in the open** and press A on both simulated micro:bits. Compare the numbers.
2. Open **Prove it with a challenge** and knock a few times. Watch the challenge and answer change.

## Questions students ask

- **"If everyone hears the mixes, why is the key safe?"** With huge numbers, working back from the mix is far too slow.
- **"Is the classroom version real security?"** No: the numbers are tiny. It shows the shape of the idea.
