---
title: Apps with Vue
summary: "Build pages that keep up with their data by themselves: data shown with {{ }}, lists with v-for, choices with v-if, events and inputs, computed values and components, ending in a to-do app. An optional last lesson builds the same app in Vue, Preact and Svelte."
tagline: "Build apps where the page keeps up with your data by itself."
order: 12
challenge: challenge
units:
  - { id: data, title: Data on the page, summary: "Show data, make a tag for each item, show a tag only when it is needed, and change the data from clicks and typing." }
  - { id: build, title: Building apps, summary: "Values worked out from data with computed, and components you make once and use many times." }
  - { id: challenge, title: "Final challenge: a to-do app", summary: "Build a to-do app in milestones. One optional lesson builds the same app in three frameworks." }
---
In the DOM course you changed the page yourself: find the element, then set its `textContent`. **Vue** turns that around. You keep the **data**, write the page once with the data in it, and Vue changes the page whenever the data changes. It runs right in the page (Vue's file sits beside it here), with nothing to install.
