---
title: "Chance: cheat sheet"
subtitle: "Data and chance"
---

# Chance

> The words and methods from this unit, with an example of each.

:::keep-together

**sample space**: Every possible outcome, listed once. Check whether the outcomes are equally likely.

$$\{1, 2, 3, 4, 5, 6\}$$

:::

:::keep-together

**probability**: For equally likely outcomes. Otherwise use sizes or counts. From 0 (impossible) to 1 (certain); all outcomes add to 1.

$$P(\text{even}) = \dfrac{\text{favourable}}{\text{total}} = \dfrac{3}{6} = \dfrac{1}{2}$$

_A half-red spinner: P(red) = 1/2, P(blue) = P(green) = 1/4_

:::

:::keep-together

**expected count**: Expected count = probability × trials. Real results vary around it, more so in short experiments.

$$60 \times \tfrac{1}{6} = 10$$

:::

:::keep-together

**relative frequency**: The experiment's estimate of the probability. Over many trials it settles close to the probability (the law of large numbers); nothing is ever 'due'.

$$\dfrac{\text{count}}{\text{trials}} = \dfrac{13}{20} = 0.65$$

_2000 flips: the relative frequency of heads settles near 0.5_

:::

:::keep-together

**complementary events**: An event and its complement cover every outcome once. For 'at least one', count the outcomes with none and subtract from 1.

$$P(\text{not } A) = 1 - P(A)$$

_Roll 5 or 6 (A) and the other four outcomes (not A)_

:::

:::keep-together

**Venn diagram and two-way table**: Two yes/no properties make four groups: one only, both, the other only, neither. Each is a region of the Venn diagram and a cell of the table.

$$\text{both first: only} = \text{total} - \text{both}$$

_The same 30 students as a Venn diagram and a two-way table_

:::

:::keep-together

**grid and tree diagram**: Two events make pairs: a grid or a tree lists every pair once, and the number of outcomes is the two counts multiplied. HT and TH are different outcomes.

$$\text{outcomes} = 3 \times 2 = 6$$

_A spinner with three equal parts, then a coin: 6 outcomes, 3 of them heads_

:::

:::keep-together

**and, or, not**: And is the overlap; or is one, the other or both; not A is everything outside A. Count each outcome once.

$$P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$$

_Dog or cat: everything inside the circles, 19 of 30_

:::

:::keep-together

**simulation**: Run many trials with random numbers (=RANDBETWEEN(1,6) is a dice) and compare the relative frequency with the probability. Short runs can be well off.

$$\text{relative frequency} = \dfrac{\text{count}}{\text{trials}}$$

_Two dice with a total of 10 or more chosen (6 of 36), ready to simulate_

:::
