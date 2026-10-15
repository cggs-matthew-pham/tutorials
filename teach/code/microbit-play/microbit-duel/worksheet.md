---
title: "Radio duel"
subtitle: "micro:bit: talk and play · Final challenge: Reaction duel · Lesson 8"
---

# Radio duel

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Quiz shows use buzzers that lock out everyone else the moment one player presses. That is a few radio messages and a true/false variable.


:::teacher-note

**In one sentence:** Students turn the reaction game into a two-player race over radio, using a shared message code, a function to remove copied blocks, a true/false variable and a score.

**Students should be able to say:** I can keep two micro:bits in step with an agreed code of messages. I can replace copied blocks with a function. I can make only the first press count, using a true/false variable.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4b5a0ce2a28b.png?v=2990d1eee81e0f89)

:::keep-together

**Player 1 presses B. When the heart appears, where does it show?**

☐ Only on player 1's micro:bit

☐ On both, at almost the same moment

☐ Only on player 2's micro:bit

☐ Nowhere until A is pressed

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** On both. Player 1's micro:bit sends 1 and shows its own heart; player 2's shows its heart when the 1 arrives.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4b5a0ce2a28b.png?v=2990d1eee81e0f89)

:::keep-together

### The code

**Match each message with what it means in the duel.**

A. I pressed first: you lose this round

B. go: show the heart and start racing

C. get ready: clear the screen, no racing yet

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `0` | |
| `1` | |
| `2` | |

:::


:::teacher-note

**Answer:** 0 → C. get ready: clear the screen, no racing yet; 1 → B. go: show the heart and start racing; 2 → A. I pressed first: you lose this round

:::


:::keep-together

### Two copies

**The blocks 'show heart, set racing to true' appear in two places. You change the heart to a diamond in one place only. What goes wrong?**

☐ The player who pressed B sees a different signal from the other player

☐ Both see the diamond

☐ Nothing

☐ The radio stops working

:::


:::teacher-note

**Answer:** The player who pressed B sees a different signal from the other player

Copied blocks have to be changed in every copy. Forget one and the two players see different signals: an unfair race. A function keeps one copy.

:::


:::keep-together

### In Python

```python
def on_received_number(receivedNumber):
    global racing
    if receivedNumber == 0:
        racing = False
        basic.clear_screen()
    elif receivedNumber == 1:
        basic.show_icon(IconNames.HEART)
        racing = True
radio.on_received_number(on_received_number)
```

`elif` is Python's short way to write *else if*.

**The receiving part in Python. Match each line with what it does.**

A. checks for get ready

B. otherwise, checks for go

C. remembers that a round is on

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `if receivedNumber == 0:` | |
| `elif receivedNumber == 1:` | |
| `racing = True` | |

:::


:::teacher-note

**Answer:** if receivedNumber == 0: → A. checks for get ready; elif receivedNumber == 1: → B. otherwise, checks for go; racing = True → C. remembers that a round is on

:::


:::typical

## Milestone 1: one go function

Make a function **go** that shows the heart and sets `racing` to true. Call it in **both** places, so there is one copy to change.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bea0c0ef734d.png?v=e54c0c344d58ee25)

:::

:::


:::typical

## Milestone 2: first press wins

- When **A** is pressed while racing: stop racing, send **2**, show a happy face.
- When **2** arrives while racing: stop racing, show a sad face.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/e73e6fa24ba4.png?v=1c099efe548f16f7)

:::

:::


## Make: Milestone 3: first to three

Make it a **match**: the first player to win **three** rounds wins.

- Count your round wins; **A+B** shows them.
- At three wins, send **3** and show a trophy.
- When **3** arrives, show game over.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/5d57a98aaa8f.png?v=9bd756e71b4eec05)

:::


:::wider

## Fair play

Play a match against a partner. Agree a group number of your own before you start.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Exit ticket

:::keep-together

**In a duel, the first micro:bit radios 1 just before it shows a heart, and the second shows a heart when 1 arrives. Why do the two hearts appear at almost the same time?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The first sends message 1 just before showing its heart, and the second shows its heart as soon as 1 arrives.

:::

