---
order: 3
unit: forms
title: Join the club
introduces: [list-change]
recipes: [attribute]
summary: "Make the club page's sign-up form work: the form sends its answers, a route reads them, adds the new member and goes back home."
language: python
hook: "In HTML & CSS the Join button did nothing. Now Python is behind the form, so it can really sign people up."
---
In HTML & CSS your club page had a form that went nowhere. With `method="post" action="/join"`, pressing the button **sends** the form's answers to the address `/join`. A route with `methods=["POST"]` receives them, and `request.form["name"]` looks up the box whose `name` attribute is `name`. `members.append(...)` adds the new member to the end of the list. Then `redirect("/")` sends the browser back to the home page.

## Predict

```step
stage: predict
code: club.py#predict
check:
  type: predict
  q: "You type Zoe and press Join. What does the page show?"
  options: ["['Ada', 'Zoe']", "['Ada']", "['Zoe']", "An error: Zoe is not in the list"]
  actual: "['Ada', 'Zoe']. join() appends what was typed in the box named name, then redirect(\"/\") shows the home page again, with the longer list."
```

Follow the answer: the form sends it to `/join`, `join()` appends it, then `redirect("/")` goes back home.

## Run

```step
stage: run
code: club.py#run
try: { playground: python, starter: "club.py#run", height: 560 }
check: { type: reflect, text: "I signed up two people, then pressed Run again and saw what happened to them." }
unlocks: [read-a-form, go-to-another-page]
```

Run it and join the club twice, with different groups. Then press **Run** again: where did the new members go?

## Investigate

```step
stage: investigate
code: club.py#run
insight: "A form sends each box that has a name attribute; the route reads them with request.form by that name, changes the data, then redirects to a page that shows it."
tasks:
  - check:
      type: question
      q: "Why does join() end with redirect(\"/\") instead of returning a page?"
      options: ["So the browser goes back to the home page, which shows the list with the new member", "To stop the form being sent", "Because POST routes cannot return HTML", "To save the member"]
      answer: 0
      explain: "The home route already shows the members. Redirecting there after a change is the usual pattern, and reloading the page then does not send the form twice."
  - check:
      type: question
      q: "What does request.form[\"group\"] give when someone chooses Champions?"
      options: ["\"Champions\"", "\"group\"", "The whole form", "3, because it is the third option"]
      answer: 0
      explain: "A select sends the chosen option's text under its name, group."
  - check:
      type: bug
      code: club.py#bug
      text: "Pressing Join gives 400 Bad Request. Click the line that is wrong."
      answer: 8
      fault: logic
      misconception: form-name-attr
      explain: "The box has an id but no name, so the form sends nothing for it, and request.form[\"name\"] has nothing to find. name=\"name\" sends it."
```

### Back home

Why a form ends with a redirect.

### A choice from a list

What a select sends.

### Spot the bug

A box the form does not send.

## Modify

```step
stage: modify
insight: "A server must check what it is sent: a blank or wrong answer gets the page back with a message instead of being saved."
try: { playground: python, starter: "club.py#run", height: 560 }
tasks:
  - hint:
      - "In join(), after reading name: if name == \"\": return the page with an error message instead of adding the member."
      - "`render_template_string(PAGE, members=members, error=\"Please type your name.\")`, and in the template `{% if error %}<p>{{ error }}</p>{% endif %}`."
    check: { type: code, text: "If the name is blank, show the page again with a message, and do not add anyone.", rules: { contains: ["if name == \"\""] } }
  - hint: "Add a Year box with name=\"year\", read it with request.form[\"year\"], store it in the member's dictionary and show it in the list."
    check: { type: code, text: "Also ask for each member's year level, and show it in the list.", rules: { contains: ["request.form[\"year\"]"] } }
```

### No blank names

Press Join with an empty box: a member with no name appears. Make the app refuse a blank name and say why.

### Year level

Ask for each member's **year** as well, and show it in the list.

## Make: record a win

```step
stage: make
insight: "Goals only: a form of your own that changes the data, a POST route that reads it, and a redirect to show the change."
try: { playground: python, starter: "club.py#make", height: 560 }
check: { type: code, text: "Add a form to record a win: choose a player, press the button, and their wins go up by 1.", rules: { contains: ["methods=[\"POST\"]", "request.form["] } }
```

Add a form under the results table: a dropdown of the players (made by the template) and an **Add a win** button that adds 1 to that player's wins.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Why should the server check the name, when the form could just say the box is required?"
  options: ["Anyone can send anything to /join without using your form, so the server must check what it gets", "Forms cannot check anything", "It is faster", "Browsers ignore required"]
  answer: 0
  explain: "A form's checks help honest users; the server's checks protect the data. Every real web app checks again on the server."
```

The members disappear on every Run, because they live in a variable. Next: save them to a file so they last.
