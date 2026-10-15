---
title: "Fix the newsletter"
subtitle: "Structure and style a page · Lists, links and pictures · Lesson 8"
---

# Fix the newsletter

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Almost every job in web design starts with a page someone else wrote, and the skill is finding the right part to change.


:::teacher-note

**In one sentence:** Students read a whole newsletter page and change just the part that does each job, using what they met in Lessons 1 to 7.

**Students should be able to say:** I can find the part of a page that does a job and change just that part. I can say what the head and the body of a page are for. I can use paragraphs, lists, links, pictures and classes together in one page.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Read the page


```html
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

:::keep-together

### Match the parts

**Match each part of the page with its job.**

A. the name on the browser tab, which is not on the page itself

B. the rules for how the page looks

C. a heading for one section

D. tells the browser this is a web page

E. everything that shows on the page

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<!DOCTYPE html>` | |
| `<title>School newsletter</title>` | |
| `<style> … </style>` | |
| `<body> … </body>` | |
| `<h2>Book fair</h2>` | |

:::


:::teacher-note

**Answer:** &lt;!DOCTYPE html&gt; → D. tells the browser this is a web page; &lt;title&gt;School newsletter&lt;/title&gt; → A. the name on the browser tab, which is not on the page itself; &lt;style&gt; … &lt;/style&gt; → B. the rules for how the page looks; &lt;body&gt; … &lt;/body&gt; → E. everything that shows on the page; &lt;h2&gt;Book fair&lt;/h2&gt; → C. a heading for one section

The wrapper holds the page's information and rules. Only what is inside &lt;body&gt; shows on the page.

:::


:::keep-together

### Find the rule

**You want every h2 heading to be teal. Which part of the page do you change?**

☐ The &lt;title&gt;

☐ The &lt;!DOCTYPE html&gt; line

☐ The words inside the &lt;body&gt;

☐ The h2 rule inside &lt;style&gt;

:::


:::teacher-note

**Answer:** The h2 rule inside &lt;style&gt;

The h2 rule says how every h2 looks, so changing its colour changes them all at once. The title, the first line and the words do not set colours.

:::


:::typical

## Split the article


**Make three paragraphs.** The article is one long paragraph. Split it into one paragraph for the new books, one for the book fair and one for the raffle.

**Add a heading.** Add an `<h2>` heading, `Book fair`, above the book fair paragraph.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Make three paragraphs:**

```html
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

**Add a heading:**

```html
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

:::

:::


## Fix the crossed tag

The browser never complains about a crossed tag; it just guesses.

```html
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

:::keep-together

**The words in the library come out slanted as well, but only 10 am should be. Click the line that causes it.**

```
 1  <!DOCTYPE html>
 2  <html>
 3  <head>
 4    <title>School newsletter</title>
 5  </head>
 6  <body>
 7  <h1>Library news</h1>
 8  <h2>Book fair</h2>
 9  <p>The book fair starts <strong>Monday at <em>10 am</strong> in the library</em>.</p>
10  </body>
11  </html>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

On line 9, &lt;em&gt; opens inside &lt;strong&gt; but &lt;/strong&gt; closes before &lt;/em&gt;, so the browser guesses and slants more than 10 am. The last tag opened must close first: &lt;/em&gt; then &lt;/strong&gt;.

:::


:::typical

## Add a list, a link and a picture


**Add a list.** Under a new `<h2>` heading, `What to bring`, add a bulleted list: a gold coin and a bag.

**Add a link.** Make the words `book fair` in the second paragraph a link to `https://example.com/bookfair`.

**Add a picture.** Add `book.svg` under the `Library news` heading, with `alt` words that describe it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add a list:**

```html
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

**Add a link:**

```html
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

**Add a picture:**

```html
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

:::

:::


:::typical

## Mark the headline story


**Mark one story.** The newsletter has two stories. Mark the first one, the book news, with the class `headline`.

**Style the class.** Add a rule for `.headline` that gives it a `lightyellow` background.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Mark one story:**

```html
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

**Style the class:**

```html
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

:::

:::


## Exit ticket

:::keep-together

**A student adds a heading to the head of the page, and nothing shows. Why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Only what is inside the body shows on the page. The head holds the title and the rules.

:::

