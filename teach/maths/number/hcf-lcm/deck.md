---
marp: true
theme: default
html: true
---

# HCF and LCM

Number Foundations · Squares, powers and primes

<!-- Speaker note: Students grow two factor trees, sort the primes in a Venn diagram, and find the HCF (shared primes) and LCM (all the primes) of two numbers, then choose between them in context (AC9M7N02, node 3). About 45 minutes (Predict and Run 8 min · Investigate 15 min · Modify 10 min · Practise and Make 12 min). -->

---

## Today

**We are learning to** put two prime factorisations side by side. The primes they share multiply to the highest common factor; all the primes (shared ones once) multiply to the lowest common multiple.

- I can find the HCF and LCM of two numbers from their prime factorisations.
- I can explain why the method works.
- I can decide whether a problem needs the HCF or the LCM.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need prime factorisation with exponents (previous lesson). The one idea: shared primes give the HCF; all the primes, shared ones once, give the LCM. The common mistake is taking the product as the LCM (Zoe's mistake), which counts shared primes twice. Listing factors and multiples is a fine check, but this lesson aims at the prime method, which the next unit uses for common denominators. -->

---

## Why it matters

> One bus leaves every 12 minutes, another every 18. Both leave at 8:00. When do they next leave together? Primes answer it without listing every time.

<!-- Speaker note: The **highest common factor** (HCF) of two numbers is the biggest number that divides both. The **lowest common multiple** (LCM) is the smallest number both divide into. You can find them by listing, but prime factorisations are quicker for big numbers: - **HCF:** multiply the primes the two numbers **share**. - **LCM:** multiply **all** the primes, counting each shared one once. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**What is the highest common factor of 12 and 18?**

- 2
- 3
- 6
- 36

<!-- Speaker note: What happens: 6. 6 divides both 12 and 18, and nothing bigger does. 2 and 3 are common factors but not the highest; 36 is a common multiple. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: students who chose 2 or 3 found a common factor but not the highest. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fmaths%2Fnumber%2Fhcf-lcm%2Fstep-2&code=widget%3A+factortree%0Anumber%3A+36%0Asecond%3A+48%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/maths/number/hcf-lcm/?full=step-2#step-2)

<!-- Speaker note: When both trees are finished, a diagram sorts their primes. -->

<!-- Speaker note: Teacher: ask what is in the middle of the diagram, and why it divides both numbers. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 6. 6 divides both 12 and 18, and nothing bigger does. 2 and 3 are common factors but not the highest; 36 is a common multiple.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Two factorisations side by side

Here is the method for 12 and 18.

Now try one: the HCF of 24 and 36.

$$12 = 2^2 \times 3, \quad 18 = 2 \times 3^2$$

1) $\text{HCF} = 2 \times 3 = 6$ — Shared primes: each prime in both, to its lower power.
2) $\text{LCM} = 2^2 \times 3^2 = 36$ — All the primes, each to its higher power (shared ones once).
3) $6 \times 36 = 216 = 12 \times 18$ — A check: HCF × LCM = the two numbers multiplied.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 12 = 2^2 × 3, 18 = 2 × 3^2 and say "Write both prime factorisations." Line 1: write HCF = 2 × 3 = 6 and say "Shared primes: each prime in both, to its lower power." Line 2: write LCM = 2^2 × 3^2 = 36 and say "All the primes, each to its higher power (shared ones once)." Line 3: write 6 × 36 = 216 = 12 × 18 and say "A check: HCF × LCM = the two numbers multiplied." -->

<!-- Speaker note: Teacher: for the buses, ask what would happen at 6 minutes (the HCF). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two factorisations side by side

**Find the HCF of 24 and 36.**

* Answer: 12

<!-- Speaker note: 24 = 2³ × 3 and 36 = 2² × 3². Shared: 2 × 2 × 3 = 12. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Zoe finds the LCM of 6 and 8. Click the line where her working goes wrong.**

```
 1  Find the lowest common multiple of 6 and 8.
 2  6 = 2 × 3 and 8 = 2³
 3  Multiply the two numbers: 6 × 8 = 48
 4  So the LCM of 6 and 8 is 48.
```

* Answer: line 3

<!-- Speaker note: Line 3: 6 × 8 counts the shared 2 twice. All the primes, the shared one once: 2³ × 3 = 24. 24 is a multiple of both, and lower than 48. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## HCF or LCM?

**Bus A leaves every 12 minutes and bus B every 18 minutes. Both leave at 8:00. After how many minutes do they next leave together? Write each step with its reason.**

* Answer: $12 = 2^2 \times 3$ and $18 = 2 \times 3^2$ (prime factorisations, from factor trees); They leave together at common multiples of 12 and 18 (each bus leaves at multiples of its own time); LCM $= 2^2 \times 3^2 = 36$ (the lowest common multiple: all the primes, shared ones once)

<!-- Speaker note: 36 minutes, at 8:36: bus A has made 3 trips and bus B 2. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## One change at a time



- **A new pair:** Each task changes one thing.
- **An LCM:** 
- **In context:** 
- **Nothing shared:** 

[Open this step](https://tutorials.learningwaypoints.com/maths/number/hcf-lcm/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One change at a time: a new pair on the board, an LCM, an HCF in context, then numbers that share no primes. Hints, in order: Finish both trees, then read the middle of the diagram. For students who need more support: Use the board's Venn diagram for every pair, and list factors or multiples as a check. For early finishers: Check that HCF × LCM = the two numbers multiplied for three pairs. Explain why with the Venn diagram. The hard part, on purpose: Deciding whether a problem needs the HCF or the LCM. Ask whether the answer should be smaller than the numbers (sharing) or bigger (lining up again) before any calculation. When students get stuck: A student multiplies the two numbers for the LCM (Zoe's mistake). Ask: Is there a smaller number both divide into? Fix: Count each shared prime once: all the primes, not both lists. / A student gives a common factor that is not the highest. Ask: Does a bigger number also divide both? Fix: Multiply all the shared primes, not just one. / A student cannot tell whether a problem needs the HCF or the LCM. Ask: Is the answer smaller than the numbers (sharing out) or bigger (meeting again)? Fix: Sharing into equal groups: HCF. Events lining up: LCM. -->

<!-- Speaker note: Teacher: for the bags, ask how many apples and pears go in each bag. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## LCM

**Find the LCM of 4 and 10.**

* Answer: 20

<!-- Speaker note: 4 = 2² and 10 = 2 × 5: LCM = 2² × 5 = 20. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## HCF

**Find the HCF of 18 and 30.**

* Answer: 6

<!-- Speaker note: 18 = 2 × 3² and 30 = 2 × 3 × 5. Shared: 2 × 3 = 6. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A common denominator

**To add $\tfrac{1}{6} + \tfrac{1}{8}$, both fractions need the same denominator. What is the smallest one that works?**

* Answer: 24

<!-- Speaker note: The LCM of 6 and 8 is 24 (the next lessons use this). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: prime factors

**Review: what is the prime factorisation of 50?**

- $2 \times 25$
- $5 \times 10$
- $2 \times 5^2$
- $2^2 \times 5$

* Answer: $2 \times 5^2$

<!-- Speaker note: 50 = 2 × 25 = 2 × 5 × 5 = 2 × 5². -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: HCF 6, LCM 36

Check: grow trees for your two numbers on paper and compare their primes.

<!-- Speaker note: What this step is for: Working backwards from an HCF and an LCM to the two numbers uses the primes in both directions, and the product check (HCF × LCM) ties them together. Hints, in order: 6 = 2 × 3 and 36 = 2² × 3². Both numbers contain 2 × 3. / One number takes the extra 2, the other the extra 3. -->

<!-- Speaker note: Teacher: compare methods; some students list multiples of 6 up to 36. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Find the HCF and LCM of 20 and 30.**

* 20 = 2² × 5 and 30 = 2 × 3 × 5. HCF = 2 × 5 = 10; LCM = 2² × 3 × 5 = 60.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next: the fractions unit, where the LCM of two denominators is the lowest common denominator (AC9M7N06). Where it leads: simplifying fractions in one step (dividing by the HCF), and algebraic HCFs when factorising. -->
