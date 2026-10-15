---
marp: true
theme: default
html: true
---

# Pages for everyone

Your site, for real · Ready for real people

<!-- Speaker note: Students predict what a screen reader says for a picture with no alt and a "click here" link, move through an accessible page with the keyboard, match problems to fixes, find headings chosen for size, fix pictures and labels, then check their own page and test it with a classmate. About 55 minutes (Predict and Run 10 min · Investigate 10 min · Modify 10 min · Make (check and classmate test) 25 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: WebAIM: The WebAIM Million (accessibility of the top million home pages), https://webaim.org/projects/million/ (checked 12 October 2026); W3C WAI: Easy checks, a first review of web accessibility, https://www.w3.org/WAI/test-evaluate/preliminary/ (checked 12 October 2026); ABS: 5.5 million Australians have disability (Survey of Disability, Ageing and Carers, 2022), https://www.abs.gov.au/media-centre/media-releases/55-million-australians-have-disability (checked 12 October 2026). -->

---

## Today

**We are learning to** check a page works for everyone: pictures described with alt, headings as the page's outline, labels joined to their boxes, links that say where they go, readable colours; then test it with a classmate.

- I can check a page for alt text, headings, labels, link text, contrast and keyboard use.
- I can fix a page so a screen reader and a keyboard can use it.
- I can test my page with a real person and fix what they find.

<!-- Speaker note: Before class: The lesson works on any page, from any route through the Web pathway: Bootstrap and Vue pages end up as ordinary tags in the browser, so the same checks apply. Nothing new is taught about HTML: alt, headings, labels and links all appear in HTML & CSS; this lesson is about **why** they matter and **checking** for them. The checklist follows the most common failures in automated checks of real home pages (missing alt text, missing form labels, low contrast and empty or vague links top the WebAIM Million survey every year). Contrast is hard to judge by eye: in Chrome or Edge, right-click the page, Inspect, and the colour picker shows a contrast ratio (4.5 or more for normal text). Screen readers: Narrator (Windows, Ctrl + Windows + Enter) or VoiceOver (Mac, Command + F5) let students hear their page; turn them off the same way. The classmate test is the important part: a five-minute test with one person finds more problems than a checklist. Students give one task and watch without helping. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

## Why it matters

> About one in five people has a disability. A page built with the right tags works for screen readers, keyboards and phones as well as for you.

<!-- Speaker note: Not everyone uses a page the way you do. Some people hear it through a **screen reader**, which reads the tags aloud; some use only a **keyboard**; some see it small or with poor contrast. A page works for all of them when its tags say what each part is. The checklist: 1. **Pictures** have `alt` text that says what they show (or `alt=""` if they are only decoration). 2. **Headings** are the page's outline: one `<h1>`, then `<h2>`, then `<h3>`, never chosen for their size. 3. **Boxes** have a `<label>` joined by `for` and `id`. 4. **Links** say where they go: not "click here". 5. **Colours** are easy to read: dark text on a light background, or the other way round. 6. **The keyboard** reaches everything: press Tab through the page. The same list works for a hand-built page, a Bootstrap page or a Vue app: they all end up as tags in the browser. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<img src="trophy.svg" width="80">
<p><a href="https://example.com/rooms">Click here</a></p>
```

**A screen reader reaches the picture, then the link. What does it say?**

- It describes the picture's colours
- Something like "trophy dot svg, image", then "Click here, link"
- Nothing: it skips pictures and links
- "A gold trophy", then "Library meeting room, link"

<!-- Speaker note: What happens: With no alt text, many screen readers read the file name. And "Click here" says nothing about where the link goes, especially when a screen reader lists all the links on a page. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: if you can, play a screen reader reading a page with no alt (Narrator or VoiceOver). -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3EChess+club%3C%2Fh1%3E%0A%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+gold+trophy%22+width%3D%2280%22%3E%0A%3Ch2%3EWhen+we+meet%3C%2Fh2%3E%0A%3Cp%3EWednesdays+at+lunch%2C+in+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frooms%22%3Elibrary+meeting+room%3C%2Fa%3E.%3C%2Fp%3E%0A%3Ch2%3EJoin%3C%2Fh2%3E%0A%3Clabel+for%3D%22name%22%3EName%3C%2Flabel%3E%0A%3Cinput+id%3D%22name%22+type%3D%22text%22%3E%0A%3Cbutton%3EJoin%3C%2Fbutton%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/site/site-everyone/?full=step-2#step-2)

<!-- Speaker note: This version passes the checklist. Click into the preview, then press **Tab** again and again: the keyboard moves through the link, the box and the button. Click the word **Name**: the cursor jumps into its box. Students should be able to say: I clicked into the preview and pressed Tab: the link, the box and the button each got a focus outline in turn. -->

<!-- Speaker note: Teacher: everyone presses Tab through the preview. Ask what the outline around each part is for. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* With no alt text, many screen readers read the file name. And "Click here" says nothing about where the link goes, especially when a screen reader lists all the links on a page.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h1>Chess club</h1>
<img src="trophy.svg" width="80">
<h4>When we meet</h4>
<p>Wednesdays at lunch. <a href="https://example.com/rooms">Click here</a> for the room.</p>
<h4>Join</h4>
<p>Name</p>
<input type="text">
<button>Join</button>
```

<!-- Speaker note: What this step is for: Most fixes are the right tag or attribute, not a new look: alt, heading levels, labels and link text. -->

<!-- Speaker note: Teacher: for the bug, ask how a screen reader user moves around a page (by headings). -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Find the fixes

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Chess club</h1>
<img src="trophy.svg" width="80">
<h4>When we meet</h4>
<p>Wednesdays at lunch. <a href="https://example.com/rooms">Click here</a> for the room.</p>
<h4>Join</h4>
<p>Name</p>
<input type="text">
<button>Join</button>
```

</div>
<div>

**This version looks almost the same but fails the checklist. Match each problem with its fix.**

| | |
|---|---|
| `<img src="trophy.svg"> has no words` | A. make it an h2, the next level of the outline |
| `<h4>When we meet</h4> comes straight after the h1` | B. link text that says where it goes: library meeting room |
| `<p>Name</p> above the box` | C. a label with for="name", and id="name" on the input |
| `Click here` | D. add alt="A gold trophy" |

* Answer: &lt;img src="trophy.svg"&gt; has no words → D. add alt="A gold trophy"; &lt;h4&gt;When we meet&lt;/h4&gt; comes straight after the h1 → A. make it an h2, the next level of the outline; &lt;p&gt;Name&lt;/p&gt; above the box → C. a label with for="name", and id="name" on the input; Click here → B. link text that says where it goes: library meeting room

</div>
</div>

<!-- Speaker note: Each fix is a tag or an attribute that tells the browser what the part is. The page looks the same; it works for more people. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**A screen reader user jumps between headings to find the parts of this page, and hears levels 1, 4, 4: it sounds as if two levels are missing. Click the two lines that are wrong.**

```
 1  <h1>Robotics club</h1>
 2  <h4>What we build</h4>
 3  <p>Robots that follow lines.</p>
 4  <h4>When we meet</h4>
 5  <p>Fridays after school.</p>
```

* Answer: line 2 and 4

<!-- Speaker note: h4 was chosen because it looks small. Headings are the page's outline: the parts under the h1 are h2. Make them smaller with CSS if you want. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Describe the pictures:** alt for each one.
- **Name the boxes:** Labels joined to their boxes.

<!-- Speaker note: What this step is for: Fixing a page for everyone is small, exact changes to tags and attributes. Hints, in order: Each picture needs an alt that says what it shows, for someone who can't see it. / Add alt="…" inside each img tag, describing that picture. / A label names a box. for on the label and id on the box must match. / Swap each p for a label with for="…", and give its input the same id. For students who need more support: Give students the six points as a printed tick sheet for their own page. For early finishers: Run Chrome's Lighthouse accessibility check (Inspect, Lighthouse) on a real website and on your page. Listen to your page with Narrator or VoiceOver. The hard part, on purpose: Students think a page that looks right is right. Ask "how would someone who can't see it, or can't use a mouse, do this?" and let them try with only Tab and Enter. When students get stuck: Clicking the label does not put the cursor in the box. Ask: Do for and id match exactly, capitals included? Fix: Use the same word in both: for="name" and id="name". / Tab skips a button or link. Ask: Is it a real button or a tag (a, input) that can take focus, or a div made to look like one? Fix: Use button or a; a clickable div is invisible to the keyboard. / Long alt text that repeats the caption. Ask: What would you say to a friend on the phone about this picture? Fix: A short description; alt="" if the picture is only decoration. -->

<!-- Speaker note: Teacher: ask students to say each alt text aloud: does it say what the picture shows? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3EArt+show%3C%2Fh1%3E%0A%3Cimg+src%3D%22star.svg%22+width%3D%2260%22%3E%0A%3Cimg+src%3D%22medal.svg%22+width%3D%2260%22%3E%0A%3Ch2%3ESign+up%3C%2Fh2%3E%0A%3Cp%3EYour+name%3C%2Fp%3E%0A%3Cinput+type%3D%22text%22%3E%0A%3Cp%3EYour+year%3C%2Fp%3E%0A%3Cinput+type%3D%22number%22%3E%0A%3Cbutton%3ESign+up%3C%2Fbutton%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/site/site-everyone/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: check your own page

Paste in a page you have made, from any course. Then:

1. Go through the **six points** above and fix what you find.
2. **Test it with a classmate.** Give them one job (join the club, find the meeting time, answer the first question) and watch without helping. Then ask them to do it again with only the keyboard. Note every place they hesitated.
3. Fix the **three biggest** problems they found.

<!-- Speaker note: What this step is for: Goals only: apply the checklist to their own page, then test it with a real person. -->

<!-- Speaker note: Teacher: pair students. The tester only tries; the maker only watches and notes, then fixes. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: check your own page

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Paste+a+page+you+have+made+here+%28from+HTML+%26+CSS%2C+Bootstrap%2C+the+DOM+course+or+Vue%29%2C%0A+++++then+check+it+against+the+list+in+the+lesson+and+fix+what+you+find.+--%3E%0A%3Ch1%3EMy+page%3C%2Fh1%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/site/site-everyone/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Next: **put it online**.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Name two changes that make a page work for a screen reader without changing how it looks.**

* For example: alt text on pictures, labels joined to boxes, headings in order, link text that says where it goes.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: put the page online. For Digital Technologies, this lesson covers designing the user experience and testing it with users (Years 9 and 10, AC9TDI10P07). Class idea: everyone tests a classmate's page with only the keyboard. -->
