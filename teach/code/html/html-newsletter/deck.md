---
marp: true
theme: default
html: true
---

# Fix the newsletter

Structure and style a page · Lists, links and pictures

<!-- Speaker note: Students read a whole newsletter page and change just the part that does each job, using what they met in Lessons 1 to 7. About 45 minutes (Read the page 8 min · Split the article 10 min · Crossed tag 5 min · List, link, picture 12 min · Headline 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** read a whole page, find the part that does a job, and change just that part.

- I can find the part of a page that does a job and change just that part.
- I can say what the head and the body of a page are for.
- I can use paragraphs, lists, links, pictures and classes together in one page.

<!-- Speaker note: Before class: This is a review lesson: nothing new is taught, and each step uses ideas from earlier lessons. Do the last step yourself first (about 5 minutes). The page wrapper (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`) is a recipe to copy for now. The `<title>` shows on the browser tab, the `<style>` block sits in the `<head>`, and only the `<body>` shows on the page. The newsletter pulls together headings and paragraphs, nesting, rules, lists, links, pictures and classes. Teacher: Read the page: the match is about where each part lives. Ask where the rules for heading colours are. Teacher: Split the article: they did this in lesson 1. A student who types Enter instead of `</p><p>` is repeating the first misconception. Teacher: Crossed tag: ask which tag was opened last. Teacher: List, link and picture: three small changes in one page; check each one on the page before moving on. Teacher: Headline: the class goes in the HTML and the rule in the style block; watch for a dot in the HTML or a name that does not match. -->

---

## Why it matters

> Almost every job in web design starts with a page someone else wrote, and the skill is finding the right part to change.

<!-- Speaker note: Real pages are longer than the ones you have built so far. They start with the same few lines, called the **page wrapper**, which you can copy as it is for now: `<!DOCTYPE html>` says this is a web page, `<head>` holds information about the page (its `<title>` on the browser tab, and the `<style>` block with the rules), and `<body>` holds everything that shows. Every step here is a job on a school newsletter. Read the page, find the part that does the job, and change only that part. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Where does it live? <span style="font-size:.6em;color:#64748b">(3 min)</span>

Look at the newsletter. With your partner, say which part of the page you would change to rename the browser tab, and which to change a heading's colour.

<!-- Speaker note: Listen for the title and the style block. The aim is to find a part by its job, not by searching the code. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Read the page

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

<!-- Speaker note: What this step is for: Before changing a page, say what each part is for: the head holds information and rules, the body holds what shows. -->

<style scoped>pre, marp-pre { font-size: 0.6em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

**Match each part of the page with its job.**

| | |
|---|---|
| `<!DOCTYPE html>` | A. the name on the browser tab, which is not on the page itself |
| `<title>School newsletter</title>` | B. the rules for how the page looks |
| `<style> … </style>` | C. a heading for one section |
| `<body> … </body>` | D. tells the browser this is a web page |
| `<h2>Book fair</h2>` | E. everything that shows on the page |

* Answer: &lt;!DOCTYPE html&gt; → D. tells the browser this is a web page; &lt;title&gt;School newsletter&lt;/title&gt; → A. the name on the browser tab, which is not on the page itself; &lt;style&gt; … &lt;/style&gt; → B. the rules for how the page looks; &lt;body&gt; … &lt;/body&gt; → E. everything that shows on the page; &lt;h2&gt;Book fair&lt;/h2&gt; → C. a heading for one section

<!-- Speaker note: The wrapper holds the page's information and rules. Only what is inside <body> shows on the page. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the rule

**You want every h2 heading to be teal. Which part of the page do you change?**

- The &lt;title&gt;
- The &lt;!DOCTYPE html&gt; line
- The words inside the &lt;body&gt;
- The h2 rule inside &lt;style&gt;

* Answer: The h2 rule inside &lt;style&gt;

<!-- Speaker note: The h2 rule says how every h2 looks, so changing its colour changes them all at once. The title, the first line and the words do not set colours. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Split the article



- **Make three paragraphs:** The article is one long paragraph. Split it into one paragraph for the new books, one for the book fair and one for the raffle.
- **Add a heading:** Add an `<h2>` heading, `Book fair`, above the book fair paragraph.

<!-- Speaker note: What this step is for: Tags, not line breaks, decide the paragraphs: the whole article came out as one. Hints, in order: End the paragraph with `</p>` where one idea finishes, and start the next with `<p>`. / Three paragraphs: the new books, the book fair, and the raffle. / A section heading is an `<h2>`, with its closing tag, on its own line. / Put it just above the paragraph about the book fair. For students who need more support: Give students only the Read the page and Mark the headline steps, and a copy of the page with the paragraphs already split. For early finishers: Add a second heading rule that makes every h2 teal, and a class for a third story in a different colour. The hard part, on purpose: Choosing which part to change. Ask them to name the job first, then point to the part of the page that does it. When students get stuck: Nothing changes when the student edits a tag. Ask: Is the change inside the body, or in the head? Fix: Only the body shows. Move the change between <body> and </body>. / The new rule does nothing. Ask: Does the name after the dot match the class in the tag exactly? Fix: Make the names identical and keep the dot in the CSS only. / The whole page after the heading is bold or a link. Ask: Where does the tag end? Fix: Add the missing closing tag, such as </a> or </strong>. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Split the article

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21DOCTYPE+html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A++%3Ctitle%3ESchool+newsletter%3C%2Ftitle%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A%3Cp%3EThe+library+has+200+new+books+this+term.%0AThe+book+fair+starts+on+Monday+in+the+library.%0ABring+a+gold+coin+for+the+raffle.%3C%2Fp%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/html-newsletter/?full=step-2#step-2)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Fix the crossed tag

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

<!-- Speaker note: The browser never complains about a crossed tag; it just guesses. What this step is for: Tags that overlap give no error message, only the browser's best guess. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Fix the crossed tag

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

* Answer: line 9

<!-- Speaker note: On line 9, <em> opens inside <strong> but </strong> closes before </em>, so the browser guesses and slants more than 10 am. The last tag opened must close first: </em> then </strong>. What this step is for: Tags that overlap give no error message, only the browser's best guess. -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Add a list, a link and a picture



- **Add a list:** Under a new `<h2>` heading, `What to bring`, add a bulleted list: a gold coin and a bag.
- **Add a link:** Make the words `book fair` in the second paragraph a link to `https://example.com/bookfair`.
- **Add a picture:** Add `book.svg` under the `Library news` heading, with `alt` words that describe it.

<!-- Speaker note: What this step is for: A list, a link and a picture are three different kinds of change, in the right place inside the body. Hints, in order: A bulleted list is `<ul>` with one `<li>` for each thing. / Put it under the heading `What to bring`. / Put `<a href="...">` before the words and `</a>` after them. / The address goes inside the quotes after `href=`. / The picture is `book.svg`. Its tag has no closing tag. / alt says what the picture shows, as if telling someone on the phone. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Add a list, a link and a picture

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21DOCTYPE+html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A++%3Ctitle%3ESchool+newsletter%3C%2Ftitle%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A%3Cp%3EThe+library+has+200+new+books+this+term.%3C%2Fp%3E%0A%3Ch2%3EBook+fair%3C%2Fh2%3E%0A%3Cp%3EThe+book+fair+starts+on+Monday+in+the+library.%3C%2Fp%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/html-newsletter/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Mark the headline story



- **Mark one story:** The newsletter has two stories. Mark the first one, the book news, with the class `headline`.
- **Style the class:** Add a rule for `.headline` that gives it a `lightyellow` background.

<!-- Speaker note: What this step is for: A class picks the one story to stand out, and a rule in the style block says how. Hints, in order: A class is an attribute, so it goes inside the opening tag of the paragraph. / After `p` and a space, write `class=` and the name in quotes. / Add `.headline { ... }` inside the `<style>` block, below the other rules. / The dot goes in the CSS only. Try `background-color: lightyellow;`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Mark the headline story

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21DOCTYPE+html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A++%3Ctitle%3ESchool+newsletter%3C%2Ftitle%3E%0A++%3Cstyle%3E%0A++++h1+%7B%0A++++++color%3A+navy%3B%0A++++%7D%0A++%3C%2Fstyle%3E%0A%3C%2Fhead%3E%0A%3Cbody%3E%0A%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A%3Cp%3EThe+library+has+200+new+books+this+term.%3C%2Fp%3E%0A%3Ch2%3EBook+fair%3C%2Fh2%3E%0A%3Cp%3EThe+book+fair+starts+on+Monday+in+the+library.%3C%2Fp%3E%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/html-newsletter/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Swap and spot <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap newsletters with a partner. Find one list, one link, one picture and one class, and say the job of each.

<!-- Speaker note: A student who cannot find a part is a good prompt to ask which tags they know that part uses. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student adds a heading to the head of the page, and nothing shows. Why?**

* Only what is inside the body shows on the page. The head holds the title and the rules.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit is Parts of a page: tables, the named parts of a page, links within a page and forms. Class idea: ask students to open a school page and find its wrapper parts in the browser's view-source. -->
