---
title: Pages from Python in 5 minutes
---
## The idea in plain words

A **web app** makes its pages with code. The browser asks for an address (`/about`); a program on the server decides what to send back. In **Flask**, a **route** joins an address to a function: `@app.route("/about")` above `def about():`. Whatever the function returns, usually HTML text, is the page. An address with no route gets the standard **404 Not Found**.

A **template** is HTML with gaps, filled in from data: `{{ p["name"] }}` shows a value and `{% for p in players %} ... {% endfor %}` repeats a part for each item. `render_template_string(PAGE, players=players)` fills it in; the template sees only what is passed to it. A route can have a part that changes: `/player/<name>` passes whatever is in that place to the function.

## Why programmers use them

- **Pages that change**: the latest results, a page for every player, answers to a search.
- **One template, any amount of data**: 4 players or 400 need the same code.

## An everyday picture, and where it breaks

A restaurant: the address is the order, the route is the menu line that says which cook makes it, and the function is the cook. A template is a form letter with blanks. It breaks because the "cook" answers instantly and identically every time, and forgets everything between orders unless it writes it down (Lesson 4).

## Try it yourself (5 minutes)

1. Run Lesson 1's app and visit `/about`, then `/missing`.
2. In Lesson 2, add a fifth player to the list and run again: a new row and a new page appear.
3. Visit `/player/Zoe` and read the reply.

## Questions students ask

- **Is this a real website?** In the playground it runs only in your browser. On a computer, `python app.py` serves it at `http://127.0.0.1:5000`, and hosting it for others needs a server (a teacher job).
- **Why single quotes inside the HTML?** The HTML is inside a Python string in double quotes, so attributes use single quotes.
- **Where do templates go on a computer?** In a `templates` folder, loaded with `render_template("club.html")`. The `{{ }}` and `{% %}` work the same.
