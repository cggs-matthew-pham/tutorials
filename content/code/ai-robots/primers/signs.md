---
title: Costly mistakes in 5 minutes
---
## The idea in plain words

Every model is sometimes wrong, and **some mistakes cost more** than others. A robot that mistakes Stop for Go can drive off a table; one that mistakes Left for Right only wastes time. So:

- A **higher confidence threshold** for the risky action: the board here sends **Go** only at 95% (others at 70%).
- The robot adds its own caution: it drives only after **Go twice in a row**, while **Stop** acts at once.
- The cost of caution is more **Unsure**, so more stops. Put caution where mistakes are costly, not everywhere.

## Why programmers use it

Self-driving cars, medical screening and spam filters all set thresholds by asking which mistake is worse: missing something, or a false alarm.

## An everyday picture, and where it breaks

You cross a road only when you're sure it's clear, but you'll step back at the first hint of a car. Where it breaks: be too cautious everywhere and you never cross.

## Try it yourself (5 minutes)

1. Print the signs from **Signs: some mistakes cost more** and train Go, Left, Right and Stop.
2. Hold Go far away or tilted: the board says Unsure while Left still counts.

## Questions students ask

- **"Why won't it send Go?"** It needs 95%: retrain Go with clearer, more varied photos.
- **"Why does the robot wait?"** It needs two Gos in a row: about a second of steady Go.

## How it connects

The delivery robot challenge adds the final rule: the robot's own sensor overrules the model.
