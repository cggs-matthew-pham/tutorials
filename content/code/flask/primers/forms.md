---
title: Forms and saving in 5 minutes
---
## The idea in plain words

**Forms.** `<form method="post" action="/join">` sends the form to `/join` when the button is pressed. Only boxes with a **`name` attribute** are sent, under that name. A route with `methods=["POST"]` reads them: `request.form["name"]`. After changing the data, `redirect("/")` sends the browser back to a page that shows the change. The server checks what it gets (a blank name, a repeat), because anyone can send anything to an address.

**Saving.** Variables last only while the app runs. Data that must last goes in a **file**: each sign-up adds a row to `members.csv` with `open(..., "a")` and `csv.writer`, and every page reads the file with `csv.DictReader`. `"a"` adds to the end; `"w"` empties the file first. Changing one row means reading every row, changing it, and writing them all back with `"w"`, header first.

## Why programmers use them

- **Forms are how people give a web app information**: sign-ups, searches, orders, comments.
- **Storage is what makes an app useful tomorrow.** Small apps use files; busy ones use a database, which copes with many people changing data at once.

## An everyday picture, and where it breaks

A sign-up sheet on a clipboard: the form is the sheet, the route is the person who reads it and copies each name into the club book (the file). It breaks because the person never guesses: a box without a `name` is invisible to them, and they will happily copy a blank line unless told to check.

## Try it yourself (5 minutes)

1. Run Lesson 3's app, join twice, then press Run: the new members are gone.
2. Run Lesson 4's app, join, press Run and reload: the member is still there. Open `members.csv` in the Files tab.
3. Remove `name="name"` from the input in Lesson 3 and press Join: 400 Bad Request.

## Questions students ask

- **What is 400, 404, 405, 500?** Status codes: 400 the request was wrong (a missing box), 404 no such page, 405 the route does not accept POST, 500 the code crashed.
- **Why redirect after a form?** So the page shows the result, and reloading it does not send the form again.
- **Where is members.csv?** In this browser, for this course (the Files tab). On a computer, next to `app.py`.
