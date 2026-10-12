---
marp: true
theme: default
html: true
---

# Money models

Number Foundations · Modelling

<!-- Speaker note: Students model pay and income tax in brackets, compare marginal and effective rates, and judge what a simple tax model leaves out (AC9M8N05, node 2). About 40 minutes (Predict and Run 8 min · Investigate 10 min · Modify 10 min · Practise and Make 12 min). Sources: Tax rates – Australian residents (ATO), https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents (checked 12 October 2026); Income tax rates and brackets, including the 14% rate from 1 July 2027 (SuperGuide), https://www.superguide.com.au/how-super-works/income-tax-rates-brackets (checked 12 October 2026). -->

---

## Today

**We are learning to** model a money problem by choosing what to calculate, then check the answer makes sense. Pay is the rate times the hours. Income tax is worked out in brackets: each part of the income is taxed at its own rate, so for incomes above $18 200 the rate on the last dollar (the marginal rate) is higher than the tax as a share of all the income (the effective rate).

- I can work out income tax across brackets.
- I can explain the difference between the marginal and effective rate.
- I can model pay with a rate, hours and overtime, and check the answer makes sense.

<!-- Speaker note: Before class: Do the Run board yourself first. Students need percentage change (previous lesson). The one idea: each part of the income is taxed at its own bracket's rate, so crossing into a higher bracket never lowers take-home pay. The common mistake is taxing the whole income at the top rate (Jay's mistake). The board uses a simplified version of Australia's 2026–27 resident rates (0%, 15%, 30%, 37%, 45%, with thresholds $18 200, $45 000, $135 000, $190 000), without the Medicare levy or offsets. Check the ATO's current rates before quoting them as exact; the 15% rate is legislated to fall to 14% from 1 July 2027. Wider: effective rates across incomes as a graph; superannuation contributions. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Why it matters

> People sometimes turn down a pay rise because it 'puts them in a higher tax bracket'. Do they lose money? A tax model answers it.

<!-- Speaker note: To **model** a money problem: say what you need to find, choose the calculation, work it out, then check the answer makes sense in the situation. - **Pay:** pay = rate × hours. Overtime at "time and a half" pays 1.5 × the rate. - **Income tax** (simplified from Australia's 2026–27 rates, without the Medicare levy): | Income | Rate on that part | |---|---| | \$0 to \$18 200 | 0% | | \$18 201 to \$45 000 | 15% | | \$45 001 to \$135 000 | 30% | | \$135 001 to \$190 000 | 37% | | over \$190 000 | 45% | Each **part** of the income is taxed at its own rate. The **marginal rate** is the rate on the last dollar; the **effective rate** is all the tax as a percentage of the income. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

**Your income goes from $45 000 to $45 001, into the 30% bracket. What happens to your tax?**

- You pay less tax
- Nothing changes
- It goes up 30 cents: only the extra dollar is taxed at 30%
- All $45 001 is now taxed at 30%

<!-- Speaker note: What happens: It goes up 30 cents. Only the part above $45 000 is taxed at 30%; the rest is taxed as before. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask what happens to the first $45 000 when income passes it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Try it

{{embed: https://tutorials.learningwaypoints.com/_playground-board/index.html?id=deck%2Fmaths%2Fnumber%2Fmoney-models%2Fstep-2&code=widget%3A+money%0Amode%3A+tax%0Aslider+i%3A+0%2C+200000%2C+30000%2C+1000%0Abrackets%3A+18200%3A+0%3B+45000%3A+15%3B+135000%3A+30%3B+190000%3A+37%3B+45%0Aunits%3A+%24%0A&fresh=1}}

[Open this step in the tutorial](https://tutorials.learningwaypoints.com/maths/number/money-models/?full=step-2#step-2)

<!-- Speaker note:  -->

<!-- Speaker note: Teacher: ask which rate goes up in steps and which rises smoothly. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It goes up 30 cents. Only the part above $45 000 is taxed at 30%; the rest is taxed as before.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Tax on $30 000

Here is the routine.

$$60\,000 - 45\,000 = 15\,000$$

1) $26\,800 \times 0.15 = 4020$ — The part from $18 200 to $45 000, at 15%.
2) $15\,000 \times 0.30 = 4500$ — The top part, at 30%.
3) $4020 + 4500 = 8520$ — Add the parts: the tax.
4) $8520 \div 60\,000 = 14.2\%$ — The effective rate.

<!-- Speaker note: Model this live on the board before revealing anything: write each line and say why, pausing to ask the class what comes next. Then click to reveal the lines and compare. Script. Start: write 60000 - 45000 = 15000 and say "The part in the 30% bracket." Line 1: write 26800 × 0.15 = 4020 and say "The part from 18 200 to 45 000, at 15%." Line 2: write 15000 × 0.30 = 4500 and say "The top part, at 30%." Line 3: write 4020 + 4500 = 8520 and say "Add the parts: the tax." Line 4: write 8520 ÷ 60000 = 14.2\% and say "The effective rate." -->

<!-- Speaker note: Teacher: ask Jay to split his income into parts. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Tax on $30 000

**What is the tax on an income of $30 000, in dollars?**

* Answer: 1770

<!-- Speaker note: 30 000 − 18 200 = 11 800, and 15% of 11 800 = $1770. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the mistake

**Jay works out his tax. Click the line where his model goes wrong.**

```
 1  Jay earns $50 000 a year.
 2  His income reaches the 30% bracket.
 3  So his tax is 30% of $50 000, which is $15 000.
```

* Answer: line 3

<!-- Speaker note: Line 3: only the part above $45 000 is taxed at 30%. Tax = 15% of 26 800 + 30% of 5000 = 4020 + 1500 = $5520. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Two rates

**Someone earns $60 000. Why is their effective tax rate (14.2%) lower than their marginal rate (30%)?**

- Because of the Medicare levy
- Effective rates are always half the marginal rate
- The marginal rate is wrong
- Most of their income is taxed at 0% or 15%; only the top part is taxed at 30%

* Answer: Most of their income is taxed at 0% or 15%; only the top part is taxed at 30%

<!-- Speaker note: The lower brackets pull the average down. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Brackets and pay



- **The 15% bracket:** 
- **Over 20%:** 
- **Pay:** 
- **Overtime:** 

[Open this step](https://tutorials.learningwaypoints.com/maths/number/money-models/?full=step-4#step-4)

<!-- Speaker note: What this step is for: Finding incomes with given taxes and rates, then modelling pay with a rate, hours and overtime. Hints, in order: Where does the 15% bracket end? / Try $90 000, then go higher. / Watch the effective rate as the income passes $90 000. For students who need more support: A table with one row per bracket: the part of the income, the rate, the tax. For early finishers: Plot the effective rate for incomes from $20 000 to $200 000. Why does it rise smoothly when the marginal rate jumps? The hard part, on purpose: Taxing parts, not the whole. Ask students to split the income into the bracket parts on paper before they calculate. When students get stuck: A student taxes the whole income at the top rate. Ask: Which part of the income is in the top bracket? Fix: Split the income into bracket parts; tax each part. / A student forgets the tax-free part. Ask: How much is taxed at 0%? Fix: Start from $18 200. / A student mixes up marginal and effective. Ask: Is that the rate on the last dollar, or the share of all the income? Fix: Marginal: last dollar. Effective: tax ÷ income. -->

<!-- Speaker note: Teacher: ask why time and a half is × 1.5. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Tax on $100 000

**What is the tax on $100 000, in dollars?**

* Answer: 20520

<!-- Speaker note: 4020 + 30% of 55 000 = 4020 + 16 500 = $20 520. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Effective rate

**What is the effective tax rate on $100 000, as a percentage to 2 decimal places?**

* Answer: 20.52

<!-- Speaker note: 20 520 ÷ 100 000 = 20.52%. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Improve the model

**How could this tax model be improved to match a real tax bill?**

- Remove the tax-free part
- Use one rate for everyone
- Add the Medicare levy and tax offsets
- Tax everything at the top rate

* Answer: Add the Medicare levy and tax offsets

<!-- Speaker note: The model leaves out the Medicare levy (usually 2%) and offsets, so real tax is a bit different. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Review: decrease

**Review: decrease $250 by 12%. What is the new amount, in dollars?**

* Answer: 220

<!-- Speaker note: 250 × 0.88 = $220. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## An overdrawn account

**A bank account is overdrawn: its balance is −$120. Then $85 is paid in and a $40 fee is taken. What is the balance now, in dollars?**

* Answer: -75

<!-- Speaker note: −120 + 85 − 40 = −75: still overdrawn, by $75. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: $50 000 to spend

Then say whether your answer makes sense, and what the model leaves out.

[Open this step](https://tutorials.learningwaypoints.com/maths/number/money-models/?full=step-6#step-6)

<!-- Speaker note: What this step is for: Searching for an income with a given after-tax amount uses the model in reverse and checks it in context. Hints, in order: Income after tax = income − tax. / Try incomes between $55 000 and $60 000. -->

<!-- Speaker note: Teacher: ask what the model leaves out. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Tax is 0% on the first $18 200 of income, 15% on the next part up to $45 000, and 30% on the part from $45 000 to $135 000. Find the tax on $50 000.**

* 15% of (45 000 − 18 200) = 15% of 26 800 = $4020, plus 30% of 5000 = $1500: $5520 in all.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: This completes AC9M8N05. Where it leads: financial mathematics in Years 9 and 10 (interest, budgets), and modelling with rates. -->
