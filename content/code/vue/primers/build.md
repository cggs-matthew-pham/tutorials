---
title: Computed values and components in 5 minutes
---
## The idea in plain words

Two tools for building real apps. A **computed** value is worked out from other data, `computed(() => adults.value * 12)`, and Vue works it out again whenever that data changes: a basket total, a count of unread messages. A **component** is a tag of your own, `app.component("player-card", { props: [...], template: `...` })`, written once and used many times; **props** are the data each copy is given, passed with a colon (`:wins="p.wins"`).

## Why programmers use it

- **Computed values can't go stale:** they are never set by hand, only worked out.
- **Components remove copy and paste:** change the template once and every card changes.
- **Props make components reusable:** the same card shows any player.

## An everyday picture, and where it breaks

A spreadsheet: a total cell is a formula, so it updates when the numbers change (computed), and a template letter with blanks is filled in for each person (a component with props). It breaks because a spreadsheet works out every formula; Vue works out only values made with `computed`. A plain calculation in setup is like typing the total in by hand: right once, then wrong.

## Try it yourself (5 minutes)

1. In the tickets page, change the adult price to 15 and watch the total.
2. Change `computed(…)` back to a plain calculation and click: the total stops.
3. In the ladder page, take the colon off `:wins` and see what the cards show.

## Questions students ask

- **Ref or computed?** If you set it, a ref. If you work it out from other data, a computed.
- **Why does my card show p.wins?** The colon is missing: `:wins="p.wins"`.
- **Can a card change its own props?** No: data flows down. Change it in the app's data instead.

## How it connects

The final challenge uses both: a computed count of tasks left and a component for each task.
