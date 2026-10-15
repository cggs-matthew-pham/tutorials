---
marp: true
theme: default
html: true
---

# Pictures

Structure and style a page · Lists, links and pictures

<!-- Speaker note: Students show a picture with img, and learn that src must match the file name exactly and that alt describes the picture for people who cannot see it. About 40 minutes (Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 4 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** show a picture with the img tag, and describe it with alt for anyone who cannot see it.

- I can show a picture with &lt;img src="..." alt="..."&gt;.
- I can say why the file name in src must match exactly.
- I can write alt words that describe what the picture shows.

<!-- Speaker note: Before class: Read the unit primer "Lists, links and pictures in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes). An `<img>` tag has no closing tag, and the picture is a separate file. `src` names the file and `alt` describes it. The pictures students can use without uploading are `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg` and `music.svg`. Two ideas to land: a file name that is nearly right still fails, and alt is not a caption. Teacher: Mix it up: the picture inside a link needs the attribute lesson. Ask where the href goes. -->

---

## Why it matters

> Every photo, icon and logo on a website is an img tag, and its alt text is what a screen reader says aloud.

<!-- Speaker note: A picture is a file of its own. The page does not hold the picture: it says which file to show, and what the picture is for people who cannot see it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h2>Winners</h2>
<img src="trophey.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

**The picture file is called trophy.svg, but the code says trophey.svg. What will the page show?**

- An error message
- The words A gold trophy, with a small broken-picture icon
- Nothing at all where the picture should be
- The trophy anyway: the name is close enough

<!-- Speaker note: What happens: The words A gold trophy (with a broken-picture icon). The browser cannot find a file with that exact name, so it shows the alt words instead. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students pick the first option, that the close name still works. Let them run it and see the alt words. Fixing the name comes in Modify. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Close enough? <span style="font-size:.6em;color:#64748b">(3 min)</span>

With your partner, decide what the page shows when one letter of the file name is wrong.
Hold up 1, 2, 3 or 4 fingers for your answer.

<!-- Speaker note: Take a vote before running. Ask what the browser has to compare the name with. The aim is that the name must be exactly the file's. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch2%3EWinners%3C%2Fh2%3E%0A%3Cimg+src%3D%22trophey.svg%22+alt%3D%22A+gold+trophy%22+width%3D%22100%22%3E%0A%3Cp%3EWell+done%2C+Owls%21%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/images/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. The alt words show because the browser cannot find a file called `trophey.svg`. The table says what each part does. | Code | What it does | Why | |---|---|---| | `<img … >` | Shows a picture | `<img>` has no closing tag: there are no words to wrap, so everything it needs is in its attributes | | `src="trophy.svg"` | Names the picture file | The picture is a separate file. The name, the ending after the dot and the capitals must match the file exactly, or the browser cannot find it | | `alt="A gold trophy"` | Says what the picture shows | Screen readers read it aloud, and the browser shows it when the picture cannot load. It is not a caption: people who can see the picture do not see it | | `width="100"` | Sets the picture's width in pixels | Another attribute. Without it the picture shows at its own size | Students should be able to say: I can explain what alt is for. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The words A gold trophy (with a broken-picture icon). The browser cannot find a file with that exact name, so it shows the alt words instead.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

<!-- Speaker note: What this step is for: alt is for people who cannot see the picture, not a caption; src has to match the file exactly. -->

<!-- Speaker note: Teacher: the first question is the one for alt-is-caption. Ask who actually reads alt. Then they apply it to the relay photo and the missing medal. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where does alt show?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

</div>
<div>

**When does a person who can see the picture also see its alt words?**

- When they hold the mouse over the picture
- Only when the picture does not load, or when a screen reader reads the page aloud
- At the top of the page, as a title
- Under the picture, as its caption

* Answer: Only when the picture does not load, or when a screen reader reads the page aloud

</div>
</div>

<!-- Speaker note: alt is not shown beside a picture that loads. It stands in for the picture when it cannot be seen. A caption is a separate line of text, written as a paragraph. -->

<style scoped>section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Good alt text

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

</div>
<div>

**Which alt is best for a photo of the relay team holding the trophy?**

- No alt at all
- alt="The Owls relay team holding the trophy"
- alt="relay-photo.jpg"
- alt="image"

* Answer: alt="The Owls relay team holding the trophy"

</div>
</div>

<!-- Speaker note: alt should say what the picture shows, as you would describe it to someone on the phone. A word such as image, or the file name, tells them nothing. -->

<style scoped>section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The missing medal

**The trophy shows, but the medal does not: only its alt words appear. The picture file is called medal.svg. Click the line that causes it.**

```
 1  <h2>Winners</h2>
 2  <img src="trophy.svg" alt="A gold trophy" width="100">
 3  <p>First place: Owls</p>
 4  <img src="medal.png" alt="A silver medal" width="100">
 5  <p>Second place: Hawks</p>
```

* Answer: line 4

<!-- Speaker note: Line 4 asks for medal.png, but the file is medal.svg. The name, the ending after the dot and the capitals must all match the file exactly. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Change the picture:** Show `medal.svg` instead of the trophy. Only the file name changes.
- **Change the alt words:** The alt words still describe a trophy. Change them to `A silver medal`.
- **Change the size:** Make the picture `200` wide.

<!-- Speaker note: What this step is for: src picks the file, alt describes it, width sizes it: each is its own attribute, changed on its own. Hints, in order: The file name is the part inside the quotes after `src=`. / The picture to show is `medal.svg`. Match the name exactly. / `alt` is the attribute with the words in quotes. / Describe the medal as you would to someone on the phone: A silver medal. / Change the number inside the quotes after `width=`. For students who need more support: Give students the Modify starter and do the first task together, then change the alt words and the width. For early finishers: Add a second picture with its own alt, and make one of the pictures a link to a page. The hard part, on purpose: Believing that a nearly right file name will do. Let them see the alt words, then ask what the browser can compare the name to. When students get stuck: The picture shows as words and a small broken icon. Ask: Is the file name in src spelt exactly like the file, with the same ending? Fix: Copy the file name from the list of pictures, including .svg. / The student typed alt words but sees none under the picture. Ask: When do people see alt? Fix: alt only shows when the picture cannot load, and screen readers read it. A caption would be a paragraph under the picture. / Words after the picture are inside the tag, or the picture vanishes. Ask: Does the img tag end with > and have no closing tag? Fix: End the tag with > straight after the last attribute and start the next element after it. -->

<!-- Speaker note: Teacher: three single changes: the file, the alt words, then the size. Misspell the name once on purpose and ask what shows. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch2%3EWinners%3C%2Fh2%3E%0A%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+gold+trophy%22+width%3D%22100%22%3E%0A%3Cp%3EWell+done%2C+Owls%21%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/images/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**Put the lines in order so that clicking the trophy picture opens the results. One line is not needed.**

```html
  <img src="trophy.svg" alt="A gold trophy">
</img>
</a>
<a href="https://example.com/results">
```

<!-- Speaker note: The link's opening tag, with its href, comes first; the picture goes inside it; </a> closes the link. An <img> has no closing tag, so </img> is not needed. Correct order: <a href="https://example.com/results"> <img src="trophy.svg" alt="A gold trophy"> </a> What this step is for: A picture inside a link combines the image tag with an attribute on the tag around it. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a page for a school club: a title, a picture, and a paragraph about when it meets. The pictures you can use are `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg` and `music.svg`.

<!-- Speaker note: Hints, in order: Pick one picture. Its file name goes in `src`. / Write `alt` as if describing the picture to someone on the phone. -->

<!-- Speaker note: Teacher: the check ticks when the page has a heading, a picture with alt and a paragraph; read their alt words as a class. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+The+pictures+you+can+use%3A+trophy.svg%2C+medal.svg%2C+book.svg%2C+ball.svg%2C+star.svg%2C+music.svg+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/images/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Describe it to me <span style="font-size:.6em;color:#64748b">(4 min)</span>

Read your alt words to a partner without showing the picture. They say which picture you used.

<!-- Speaker note: A good alt lets the partner pick the right picture. If they cannot, ask what is missing from the words. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A student's picture does not show, only a few words. What do they check first, and what are the words?**

* They check that the file name in src matches the file exactly. The words are the alt text, which shows when the picture cannot load.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson names some of the elements with a class so that a CSS rule can style only those. Class idea: ask what a person using a screen reader hears when the alt says image. -->
