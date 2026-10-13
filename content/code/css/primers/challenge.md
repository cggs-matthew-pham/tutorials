---
title: Running the final challenge
---
## The idea in plain words

The Course B challenge lays out the club page from Course A. There is nothing new in it. Students work in three **milestones**, and the support fades: the first gives the exact code, the second an outline as comments, the third only the goals. Then they make it their own.

1. **Header and menu:** the club name on the left and the menu on the right (Flexbox on the header and on `nav ul`), links styled with `nav a`.
2. **Hero and cards:** a hero section and three cards in a row that wraps, all cards sharing one class.
3. **Table, form and footer:** padded table cells, the sign-up form as a card, each label on its own line, and a padded footer.

The starter is the finished Course A club page, so a student who skipped Course A can still begin. Finishing the core lesson marks **Challenge complete** on the course page. Two optional lessons go further: **Grid** lays out rows and columns together, and **Make it react** adds JavaScript as a recipe.

## Why it matters

- **Putting it together.** Rules, boxes and rows have each been taught alone. Here they meet on a real page.
- **Reading the picture.** Planning the page as named parts is the habit that makes big tasks small.
- **Nothing hidden.** Because the page is theirs, students can show it and name the lesson behind each part.

## An everyday picture, and where it breaks

Decorating a room you have already built: the walls are up, and now you arrange the furniture. Where it breaks: you cannot see a room from the plans, but with CSS, every change shows up straight away. Use that, and check after every change.

## Try it yourself (5 minutes)

1. Do milestone 1 yourself in the playground, so you know where students get stuck.
2. Make the preview narrow. Do the cards drop onto new lines and not squash?
3. Copy a card to make a fourth. Does it need any new CSS?
4. Plan milestone 3 on paper: which earlier rule does each goal reuse?

## Questions students ask

- **"Where does `display: flex` go?"** On the box that holds the items. In the header that is the `header`, and for the links it is the `nav ul`.
- **"Why is my menu still in a column?"** The list holds the links, so the list needs `display: flex`.
- **"My cards are squashed."** The row needs `flex-wrap: wrap`, and the card needs a `min-width`.
- **"Can I start milestone 2 without finishing 1?"** Yes: Reset to this task's start loads a working earlier milestone.

## How it connects

The challenge reviews every move in both courses. Ask students to name three parts of the page and the rule behind each. After it, the optional Grid lesson, and then Bootstrap, the DOM course and a site of their own, build on this page.
