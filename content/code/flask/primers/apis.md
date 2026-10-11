---
title: APIs in 5 minutes
---
## The idea in plain words

A page is for people; an **API** is for programs. An API route sends **data**, usually as **JSON**: in Flask, a route that returns a dictionary sends it as JSON, which almost any language reads straight back into a dictionary or list. A query string (`/api/members?name=ad`) asks a question; Flask reads it with `request.args.get("name", "")`.

**FastAPI** (the optional last lesson) builds APIs with **types**: `def next_year(age: int):` makes FastAPI read `age` from the address, turn it into a whole number, and reply **422** with an explanation when it cannot, before your code runs. Without the type, the value would be text. Routes are `@api.get("/address")`, the changing part of an address is `{group}`, and `uvicorn.run(api)` starts it.

## Why programmers use them

- **Apps talk to each other through APIs**: weather, maps, music and school systems all share data this way.
- **Checked inputs** stop bad data before it reaches your code; FastAPI also writes the API's documentation from the types.

## An everyday picture, and where it breaks

A library's catalogue terminal: you ask a question in a fixed form and get a printed list back, not a decorated poster. FastAPI's types are the librarian who refuses "twelve" in a box marked "number". It breaks because an API answers anyone who asks, so what it shares must be chosen carefully.

## Try it yourself (5 minutes)

1. Run Lesson 5's app and open `/api/members/Players`.
2. Try `/api/members/Nobody`: an empty answer, not an error.
3. In Lesson 6, try `/next-year?age=twelve` and read the 422 reply.

## Questions students ask

- **Why not just use the web page?** A program would have to pick the data out of the HTML; JSON gives it names and values directly.
- **Flask or FastAPI?** Flask for pages and forms, FastAPI for APIs; both can do either.
- **Is the data public?** Anyone with the address can read an API, so real APIs share only what is safe and protect the rest with logins or keys.
