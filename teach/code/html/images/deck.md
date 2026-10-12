---
marp: true
theme: default
html: true
---

# Images

HTML & CSS · Structure

<!-- Speaker note: Students show pictures with <img>, learn that src must name the file exactly, and write alt text that describes the picture for people who cannot see it. About 45 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Make 10 min · Newsletter 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** show pictures with the img tag, and describe them with alt for people who cannot see them.

- I can show a picture with &lt;img src="..." alt="..."&gt;.
- I can explain why &lt;img&gt; has no closing tag.
- I can write alt text that says what a picture shows.
- I can find why a picture does not show by checking the file name.

<!-- Speaker note: Before class: Do the Make task yourself (about 5 minutes). The playground has four pictures students can use: `trophy.svg`, `medal.svg`, `book.svg` and `ball.svg`. They are drawn for this course, so there are no copyright questions; if you add your own photos later, use ones you are allowed to share. **alt text** is the description a screen reader reads aloud, and what everyone sees if the picture cannot load. It matters for accessibility, and it is a quick, real way to talk about designing for all users. Teacher: The missing medal: `medal.png` instead of `medal.svg`. A common real mistake when a file is saved in a different format. -->

---

## Why it matters

> Every photo, icon and logo on a website is an img tag, and its alt text is what a screen reader says aloud.

<!-- Speaker note: A picture is a file of its own. The page does not hold the picture: it says which file to show and where. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h2>Winners</h2>
<img src="trophey.svg" alt="A gold trophy">
<p>Well done, Owls!</p>
```

**The picture file is called trophy.svg, but the code says trophey.svg. What will the page show?**

- An error message
- The words A gold trophy, with a small broken-picture icon
- Nothing at all where the picture should be
- The trophy anyway: the name is close enough

<!-- Speaker note: What happens: The words A gold trophy (with a broken-picture icon). The browser cannot find the file, so it shows the alt words instead. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect an error or nothing. The page shows the alt words, because the file name is spelt wrong. That reveals what alt is for. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch2%3EWinners%3C%2Fh2%3E%0A%3Cimg+src%3D%22trophey.svg%22+alt%3D%22A+gold+trophy%22%3E%0A%3Cp%3EWell+done%2C+Owls%21%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/images/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then fix the file name to `trophy.svg` and watch the picture appear. Students should be able to say: I can explain what alt is for. -->

<!-- Speaker note: Teacher: fixing one letter makes the picture appear. The name must match exactly: spelling, the ending after the dot, and capitals. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The words A gold trophy (with a broken-picture icon). The browser cannot find the file, so it shows the alt words instead.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="120">
<p>Well done, Owls!</p>
```

<!-- Speaker note: What this step is for: An image is one tag with attributes and no closing tag; each attribute does one job. -->

<!-- Speaker note: Teacher: the match task names each attribute's job. For alt, ask: how would you describe this picture to someone on the phone? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="120">
<p>Well done, Owls!</p>
```

</div>
<div>

**Match each part with its job.**

| | |
|---|---|
| `<img` | A. which picture file to show |
| `src="trophy.svg"` | B. how wide to show it, in pixels |
| `alt="A gold trophy"` | C. words for people who cannot see the picture |
| `width="120"` | D. starts a picture (no closing tag) |

* Answer: &lt;img → D. starts a picture (no closing tag); src="trophy.svg" → A. which picture file to show; alt="A gold trophy" → C. words for people who cannot see the picture; width="120" → B. how wide to show it, in pixels

</div>
</div>

<!-- Speaker note: Each attribute does one job. The picture itself is a separate file; the tag only says which file and how to show it. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Good alt text

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="120">
<p>Well done, Owls!</p>
```

</div>
<div>

**Which alt is best for a photo of the relay team holding the trophy?**

- alt="photo.png"
- alt="image"
- No alt at all
- alt="The Owls relay team holding the trophy"

* Answer: alt="The Owls relay team holding the trophy"

</div>
</div>

<!-- Speaker note: alt should say what the picture shows, as you would describe it to someone on the phone. A screen reader reads it aloud. -->

<style scoped>section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The missing medal

**The trophy shows, but the medal does not: only its alt words appear. The picture file is called medal.svg. Click the line that causes it.**

```
 1  <h2>Winners</h2>
 2  <img src="trophy.svg" alt="A gold trophy" width="120">
 3  <p>First place: Owls</p>
 4  <img src="medal.png" alt="A silver medal" width="120">
 5  <p>Second place: Hawks</p>
```

* Answer: line 4

<!-- Speaker note: Line 4 asks for medal.png, but the file is medal.svg. The name, the ending after the dot and the capitals must all match the file exactly. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Pictures inside other tags

A picture can go inside a link (click the picture to follow it) or inside a list item, next to words.

```html
<a href="https://example.com/results"><img src="trophy.svg" alt="A gold trophy: see the results" width="80"></a>
<ul>
  <li><img src="medal.svg" alt="A silver medal" width="40"> Second place</li>
  <li><img src="ball.svg" alt="A soccer ball" width="40"> Soccer final</li>
</ul>
```

**In this code, what happens when someone clicks the trophy?**

- Nothing: pictures cannot be clicked
- The alt words appear
- The link opens, because the picture is inside the &lt;a&gt; tag
- The picture gets bigger

* Answer: The link opens, because the picture is inside the &lt;a&gt; tag

<!-- Speaker note: An <img> can go inside other tags. Inside <a>, the picture becomes the thing people click. Inside <li>, it sits in a list item beside the words. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Make it smaller:** Show the trophy 100 pixels wide.
- **Add second place:** Add the medal picture (`medal.svg`) with a good `alt`, and a line for second place: the Hawks.
- **Make the trophy a link:** Wrap the trophy picture in a link to `https://example.com/results`, so clicking the picture opens the results.

<!-- Speaker note: What this step is for: Changing an attribute's value, then adding a second image with its own alt. Hints, in order: Add width="100" inside the img tag, before the >. / Copy the whole img line, then change src and alt. / The file is medal.svg. Describe the picture in alt. / Put `<a href="...">` just before the trophy's img tag, and `</a>` just after it. For students who need more support: Give students the Modify starter and ask them only to add width and then copy the img line for the medal. For early finishers: Make a small gallery: three pictures in a row, each with alt and a caption paragraph underneath. (Later, Flexbox will line them up properly.) The hard part, on purpose: File names that must match exactly, and what alt is for. When a picture is missing, ask them to compare src with the file name letter by letter. When students get stuck: A small broken-picture icon, or only the alt words, where the picture should be. Ask: Is the file name in src exactly the same as the picture's name, including the ending after the dot? Fix: Copy the file name exactly, such as src="trophy.svg". / The picture is stretched or squashed. Ask: Did you set both width and height? Fix: Set only width; the browser keeps the picture's shape. / The words alt= or src= show on the page. Ask: Are the attributes inside the angle brackets of the img tag? Fix: Every attribute goes inside the tag, before the >: <img src="..." alt="...">. -->

<!-- Speaker note: Teacher: `width` changes the size; leave out `height` so the picture keeps its shape. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch2%3EWinners%3C%2Fh2%3E%0A%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+gold+trophy%22%3E%0A%3Cp%3EFirst+place%3A+Owls%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/images/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a page for a school club: a title, a picture, and a paragraph about when it meets. The pictures you can use are `trophy.svg`, `medal.svg`, `book.svg` and `ball.svg`.

<!-- Speaker note: Hints, in order: Pick one of the four pictures. Its file name goes in src. / Write alt as if describing the picture to someone on the phone. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+The+pictures+you+can+use%3A+trophy.svg%2C+medal.svg%2C+book.svg%2C+ball.svg+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/images/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Add a picture to the newsletter

Add the book picture (`book.svg`) under the `Library news` heading, 120 pixels wide, with an `alt` that describes it.

<!-- Speaker note: What this step is for: A real page uses images beside its text, each with alt. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Add a picture to the newsletter

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch1%3ELibrary+news%3C%2Fh1%3E%0A%3Cp%3EThe+library+has+200+new+books+this+term.%3C%2Fp%3E%0A%3Ch2%3EBook+fair%3C%2Fh2%3E%0A%3Cp%3EThe+book+fair+starts+on+Monday+in+the+library.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/images/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A picture shows only its alt words and a broken icon. Give one likely reason.**

* The file name in src does not match the picture file exactly (spelling, ending or capitals), so the browser cannot find it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson is tables, for data in rows and columns. Images come back in the Components unit (cards and a gallery). Accessibility: alt text is required by web accessibility guidelines (WCAG), and good alt text is part of being a good web designer. Class idea: close your eyes while a partner reads only the alt text of a page aloud. -->
