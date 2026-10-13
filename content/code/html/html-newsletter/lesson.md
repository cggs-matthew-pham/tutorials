---
order: 8
unit: links
moveId: read-for-the-job
reviews: [tag-pairs, nesting, css-rule, list-items, attribute-link, image-alt, class-pick]
recipes: [page-wrapper]
assumes: [heading, paragraph, emphasis, style-block, css-rule, text-colour, font, list, attribute, link, image, class, class-selector]
title: Fix the newsletter
summary: Read a whole page, find the part that does a job, and change just that part.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8133
  url: http://127.0.0.1:8133/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
voice: true
hook: "Almost every job in web design starts with a page someone else wrote, and the skill is finding the right part to change."
---
Real pages are longer than the ones you have built so far. They start with the same few lines, called the **page wrapper**, which you can copy as it is for now: `<!DOCTYPE html>` says this is a web page, `<head>` holds information about the page (its `<title>` on the browser tab, and the `<style>` block with the rules), and `<body>` holds everything that shows.

Every step here is a job on a school newsletter. Read the page, find the part that does the job, and change only that part.

## Read the page

```step
stage: investigate
code: page.html#newsletter
insight: "Before changing a page, say what each part is for: the head holds information and rules, the body holds what shows."
tasks:
  - check:
      type: match
      q: "Match each part of the page with its job."
      pairs:
        - ["<!DOCTYPE html>", "tells the browser this is a web page"]
        - ["<title>School newsletter</title>", "the name on the browser tab, which is not on the page itself"]
        - ["<style> … </style>", "the rules for how the page looks"]
        - ["<body> … </body>", "everything that shows on the page"]
        - ["<h2>Book fair</h2>", "a heading for one section"]
      explain: "The wrapper holds the page's information and rules. Only what is inside <body> shows on the page."
  - check:
      type: question
      q: "You want every h2 heading to be teal. Which part of the page do you change?"
      options:
        - "The h2 rule inside <style>"
        - "The <title>"
        - "The <!DOCTYPE html> line"
        - "The words inside the <body>"
      answer: 0
      fault: logic
      explain: "The h2 rule says how every h2 looks, so changing its colour changes them all at once. The title, the first line and the words do not set colours."
```

### Match the parts

What does each part of this page do?

### Find the rule

One part of the page decides how headings look.

## Split the article

```step
stage: modify
try: { playground: html, starter: "page.html#article", height: 440 }
insight: "Tags, not line breaks, decide the paragraphs: the whole article came out as one."
expected: page.html#sol-article
tasks:
  - hint:
      - "End the paragraph with `</p>` where one idea finishes, and start the next with `<p>`."
      - "Three paragraphs: the new books, the book fair, and the raffle."
    check: { type: code, text: "Split the article into separate paragraphs.", rules: { contains: ["</p><p>"] } }
    expected: page.html#sol-split
  - hint:
      - "A section heading is an `<h2>`, with its closing tag, on its own line."
      - "Put it just above the paragraph about the book fair."
    check: { type: code, text: "Add an <h2> heading, Book fair, above the book fair paragraph.", rules: { tags: [h2] } }
    expected: page.html#sol-article
```

### Make three paragraphs

The article is one long paragraph. Split it into one paragraph for the new books, one for the book fair and one for the raffle.

### Add a heading

Add an `<h2>` heading, `Book fair`, above the book fair paragraph.

## Fix the crossed tag

```step
stage: investigate
code: page.html#crossed
insight: "Tags that overlap give no error message, only the browser's best guess."
check:
  type: bug
  code: page.html#crossed
  answer: 9
  fault: syntax
  misconception: tag-overlap
  text: "The words in the library come out slanted as well, but only 10 am should be. Click the line that causes it."
  explain: "On line 9, <em> opens inside <strong> but </strong> closes before </em>, so the browser guesses and slants more than 10 am. The last tag opened must close first: </em> then </strong>."
```

The browser never complains about a crossed tag; it just guesses.

## Add a list, a link and a picture

```step
stage: modify
try: { playground: html, starter: "page.html#additions", height: 460 }
insight: "A list, a link and a picture are three different kinds of change, in the right place inside the body."
expected: page.html#sol-additions
tasks:
  - hint:
      - "A bulleted list is `<ul>` with one `<li>` for each thing."
      - "Put it under the heading `What to bring`."
    check: { type: code, text: "Add a bulleted list of two things to bring.", rules: { tags: [ul, li] } }
    expected: page.html#sol-list
  - hint:
      - "Put `<a href=\"...\">` before the words and `</a>` after them."
      - "The address goes inside the quotes after `href=`."
    check: { type: code, text: "Make the words book fair a link to https://example.com/bookfair.", rules: { contains: ["href=\"https://example.com/bookfair\""] } }
    expected: page.html#sol-link
  - hint:
      - "The picture is `book.svg`. Its tag has no closing tag."
      - "alt says what the picture shows, as if telling someone on the phone."
    check: { type: code, text: "Add the book picture with alt words under the Library news heading.", rules: { contains: ["src=\"book.svg\"", "alt=\""] } }
    expected: page.html#sol-additions
```

### Add a list

Under a new `<h2>` heading, `What to bring`, add a bulleted list: a gold coin and a bag.

### Add a link

Make the words `book fair` in the second paragraph a link to `https://example.com/bookfair`.

### Add a picture

Add `book.svg` under the `Library news` heading, with `alt` words that describe it.

## Mark the headline story

```step
stage: modify
try: { playground: html, starter: "page.html#headline", height: 460 }
insight: "A class picks the one story to stand out, and a rule in the style block says how."
expected: page.html#sol-headline
tasks:
  - hint:
      - "A class is an attribute, so it goes inside the opening tag of the paragraph."
      - "After `p` and a space, write `class=` and the name in quotes."
    check: { type: code, text: "Mark the first story with the class headline.", rules: { contains: ["class=\"headline\""] } }
    expected: page.html#sol-class
  - hint:
      - "Add `.headline { ... }` inside the `<style>` block, below the other rules."
      - "The dot goes in the CSS only. Try `background-color: lightyellow;`."
    check: { type: code, text: "Add a rule for the class headline with a background colour.", rules: { contains: [".headline{", "background-color:"] } }
    expected: page.html#sol-headline
```

### Mark one story

The newsletter has two stories. Mark the first one, the book news, with the class `headline`.

### Style the class

Add a rule for `.headline` that gives it a `lightyellow` background.

```teacher
summary: Students read a whole newsletter page and change just the part that does each job, using what they met in Lessons 1 to 7.
time: 45
timing: "Read the page 8 min · Split the article 10 min · Crossed tag 5 min · List, link, picture 12 min · Headline 10 min"
goals:
  - I can find the part of a page that does a job and change just that part.
  - I can say what the head and the body of a page are for.
  - I can use paragraphs, lists, links, pictures and classes together in one page.
before: |
  This is a review lesson: nothing new is taught, and each step uses ideas from earlier lessons. Do the last step yourself first (about 5 minutes).

  The page wrapper (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`) is a recipe to copy for now. The `<title>` shows on the browser tab, the `<style>` block sits in the `<head>`, and only the `<body>` shows on the page. The newsletter pulls together headings and paragraphs, nesting, rules, lists, links, pictures and classes.
running:
  - "Read the page: the match is about where each part lives. Ask where the rules for heading colours are."
  - "Split the article: they did this in lesson 1. A student who types Enter instead of `</p><p>` is repeating the first misconception."
  - "Crossed tag: ask which tag was opened last."
  - "List, link and picture: three small changes in one page; check each one on the page before moving on."
  - "Headline: the class goes in the HTML and the rule in the style block; watch for a dot in the HTML or a name that does not match."
stuck:
  - see: Nothing changes when the student edits a tag.
    ask: Is the change inside the body, or in the head?
    fix: Only the body shows. Move the change between <body> and </body>.
  - see: The new rule does nothing.
    ask: Does the name after the dot match the class in the tag exactly?
    fix: Make the names identical and keep the dot in the CSS only.
  - see: The whole page after the heading is bold or a link.
    ask: Where does the tag end?
    fix: Add the missing closing tag, such as </a> or </strong>.
stretch: "Add a second heading rule that makes every h2 teal, and a class for a third story in a different colour."
support: "Give students only the Read the page and Mark the headline steps, and a copy of the page with the paragraphs already split."
leads: "Next unit is Parts of a page: tables, the named parts of a page, links within a page and forms. Class idea: ask students to open a school page and find its wrapper parts in the browser's view-source."
exit:
  q: "A student adds a heading to the head of the page, and nothing shows. Why?"
  a: "Only what is inside the body shows on the page. The head holds the title and the rules."
solutions:
  step-2#t1: page.html#sol-split
  step-2#t2: page.html#sol-article
  step-4#t1: page.html#sol-list
  step-4#t2: page.html#sol-link
  step-4#t3: page.html#sol-additions
  step-5#t1: page.html#sol-class
  step-5#t2: page.html#sol-headline
struggle: "Choosing which part to change. Ask them to name the job first, then point to the part of the page that does it."
class:
  activities:
    - at: start
      kind: discussion
      title: Where does it live?
      minutes: 3
      do: |
        Look at the newsletter. With your partner, say which part of the page you would change to rename the browser tab, and which to change a heading's colour.
      notes: "Listen for the title and the style block. The aim is to find a part by its job, not by searching the code."
    - at: end
      kind: activity
      title: Swap and spot
      minutes: 4
      do: |
        Swap newsletters with a partner. Find one list, one link, one picture and one class, and say the job of each.
      notes: "A student who cannot find a part is a good prompt to ask which tags they know that part uses."
```

```code page.html#newsletter
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    h2 {
      color: navy;
    }
  </style>
</head>
<body>
<h1>Library news</h1>
<p>The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The book fair starts on Monday in the library.</p>
</body>
</html>
```

```code page.html#article
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<p>The library has 200 new books this term.
The book fair starts on Monday in the library.
Bring a gold coin for the raffle.</p>
</body>
</html>
```

```code page.html#sol-split
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<p>The library has 200 new books this term.</p><p>The book fair starts on Monday in the library.</p><p>Bring a gold coin for the raffle.</p>
</body>
</html>
```

```code page.html#sol-article
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<p>The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The book fair starts on Monday in the library.</p>
<p>Bring a gold coin for the raffle.</p>
</body>
</html>
```

```code page.html#crossed
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<h2>Book fair</h2>
<p>The book fair starts <strong>Monday at <em>10 am</strong> in the library</em>.</p>
</body>
</html>
```

```code page.html#additions
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<p>The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The book fair starts on Monday in the library.</p>
</body>
</html>
```

```code page.html#sol-list
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<p>The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The book fair starts on Monday in the library.</p>
<h2>What to bring</h2>
<ul>
  <li>A gold coin</li>
  <li>A bag</li>
</ul>
</body>
</html>
```

```code page.html#sol-link
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<p>The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The <a href="https://example.com/bookfair">book fair</a> starts on Monday in the library.</p>
<h2>What to bring</h2>
<ul>
  <li>A gold coin</li>
  <li>A bag</li>
</ul>
</body>
</html>
```

```code page.html#sol-additions
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<img src="book.svg" alt="An open book" width="120">
<p>The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The <a href="https://example.com/bookfair">book fair</a> starts on Monday in the library.</p>
<h2>What to bring</h2>
<ul>
  <li>A gold coin</li>
  <li>A bag</li>
</ul>
</body>
</html>
```

```code page.html#headline
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    h1 {
      color: navy;
    }
  </style>
</head>
<body>
<h1>Library news</h1>
<p>The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The book fair starts on Monday in the library.</p>
</body>
</html>
```

```code page.html#sol-class
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    h1 {
      color: navy;
    }
  </style>
</head>
<body>
<h1>Library news</h1>
<p class="headline">The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The book fair starts on Monday in the library.</p>
</body>
</html>
```

```code page.html#sol-headline
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    h1 {
      color: navy;
    }
    .headline {
      background-color: lightyellow;
    }
  </style>
</head>
<body>
<h1>Library news</h1>
<p class="headline">The library has 200 new books this term.</p>
<h2>Book fair</h2>
<p>The book fair starts on Monday in the library.</p>
</body>
</html>
```
