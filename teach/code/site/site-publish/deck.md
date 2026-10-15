---
marp: true
theme: default
html: true
---

# Put it online

Your site, for real · Ready for real people

<!-- Speaker note: Students predict that a downloaded page loses its pictures, download a page and its files into one folder and open it from their computer, match paths to where they look, sort what is safe to publish, find a path from one computer, fix three paths, and publish their own page. About 55 minutes (Predict and Run 15 min · Investigate 10 min · Modify 5 min · Make (publish) 25 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. Sources: GitHub Docs: Creating a GitHub Pages site, https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site (checked 12 October 2026); Netlify Docs: Netlify Drop, https://docs.netlify.com/site-deploys/create-deploys/#netlify-drop (checked 12 October 2026). -->

---

## Today

**We are learning to** a website is a folder of files: download the page and every file it uses, make every path relative, test the folder on your own computer, then publish it to a host.

- I can download a page and every file it uses into one folder.
- I can make every path in a page relative, so it works online.
- I can publish a page and check it from another device.

<!-- Speaker note: Before class: A website is a folder: `index.html` (the name hosts show first) and the files it uses, side by side. The playground's **Download** button saves the page as `index.html`, wrapped in a full HTML page if the student's code has no `<!DOCTYPE>`, and lists the files it uses from beside it (pictures, `bootstrap.min.css`, `vue.js`, `weather.json`), each with its own download link. Opening `index.html` by double-clicking tests nearly everything; a page that uses `fetch` needs a host (browsers block `fetch` from a file on the computer). **Publishing is teacher-led**, because every host needs an account. Choose one before the lesson and check your school's rules on accounts, age and what students may publish: - **GitHub Pages:** free, needs a GitHub account (13 or older); upload the folder to a repository and turn on Pages. Good for students who go on to code. - **Netlify Drop:** drag the folder onto app.netlify.com/drop; a free account keeps the site online. - **Your school's own website or learning platform**, if it can host a folder of files; often the simplest for younger students, with no new accounts. - **No accounts at all:** students can still finish (the publish step is a "typical" step); the downloaded folder on a USB stick or shared drive is a working site. Privacy: the sort task covers what stays off a public page. Check that no page names a student or the school, and that photos follow the school's consent rules. -->

---

## Why it matters

> Every website you visit is a folder of files on a computer that is always switched on. Yours can be one too.

<!-- Speaker note: A website is a **folder of files**: the page, called `index.html`, and every picture, stylesheet, script and data file it uses, side by side. A **host** keeps the folder on a computer that is always online and gives it an address. To get your page ready: 1. Press **Download** in the playground. It saves `index.html` and lists every file the page uses from beside it (pictures, `bootstrap.min.css`, `vue.js`, `weather.json`). Download each one into the **same folder**. 2. Check every path is **relative**: `src="trophy.svg"` means "beside this page". A path from your own computer (`C:/Users/…`) only works on your computer. 3. **Test the folder**: open `index.html` from your computer. If it works there, it will work online. (A page that uses `fetch` needs a host to test; the rest work by double-clicking.) 4. **Publish** it with your teacher: the host and how to sign in depend on your school. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h1>Chess club</h1>
<img src="trophy.svg" alt="A gold trophy" width="80">
<p>Chess every Wednesday at lunch.</p>
```

**You download only index.html and open it from your Downloads folder. What do you see?**

- An error message
- A blank page
- Everything, just as in the playground
- The heading and text, with a broken picture where the trophy was

<!-- Speaker note: What happens: The page, with a broken picture. src="trophy.svg" means "beside this page", and trophy.svg is not beside it in Downloads. Put it in the same folder. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: have everyone download only index.html first and open it, before the Run step, so the broken picture is their own. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3EChess+club%3C%2Fh1%3E%0A%3Cimg+src%3D%22trophy.svg%22+alt%3D%22A+gold+trophy%22+width%3D%2280%22%3E%0A%3Cp%3EChess+every+Wednesday+at+lunch%2C+in+the+library.%3C%2Fp%3E%0A%3Ch2%3EOur+groups%3C%2Fh2%3E%0A%3Cul%3E%0A++%3Cli%3E%3Cimg+src%3D%22star.svg%22+alt%3D%22%22+width%3D%2220%22%3E+Beginners%3C%2Fli%3E%0A++%3Cli%3E%3Cimg+src%3D%22medal.svg%22+alt%3D%22%22+width%3D%2220%22%3E+Players%3C%2Fli%3E%0A%3C%2Ful%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/site/site-publish/?full=step-2#step-2)

<!-- Speaker note: Press **Download**, then download each file it lists into the same folder. Open `index.html` from that folder. If a picture is broken, which file is missing? Students should be able to say: I downloaded the page and its files into one folder, opened index.html from my computer, and every picture showed. -->

<!-- Speaker note: Teacher: check each student's folder: index.html plus every listed file, all side by side. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The page, with a broken picture. src="trophy.svg" means "beside this page", and trophy.svg is not beside it in Downloads. Put it in the same folder.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h1>Chess club</h1>
<img src="trophy.svg" alt="A gold trophy" width="80">
<p>Chess every Wednesday at lunch, in the library.</p>
<h2>Our groups</h2>
<ul>
  <li><img src="star.svg" alt="" width="20"> Beginners</li>
  <li><img src="medal.svg" alt="" width="20"> Players</li>
</ul>
```

<!-- Speaker note: What this step is for: A relative path is read from where the page is; anything that points at one computer, or at nothing, breaks online. -->

<!-- Speaker note: Teacher: for the sort, ask "could a stranger use this to find you?" -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where does it look?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Chess club</h1>
<img src="trophy.svg" alt="A gold trophy" width="80">
<p>Chess every Wednesday at lunch, in the library.</p>
<h2>Our groups</h2>
<ul>
  <li><img src="star.svg" alt="" width="20"> Beginners</li>
  <li><img src="medal.svg" alt="" width="20"> Players</li>
</ul>
```

</div>
<div>

**Where does each path look for its file?**

| | |
|---|---|
| `trophy.svg` | A. in a folder called images, beside the page |
| `images/trophy.svg` | B. on another website |
| `C:/Users/ada/Desktop/trophy.svg` | C. on Ada's computer only |
| `https://example.com/trophy.svg` | D. beside the page, in the same folder |

* Answer: trophy.svg → D. beside the page, in the same folder; images/trophy.svg → A. in a folder called images, beside the page; C:/Users/ada/Desktop/trophy.svg → C. on Ada's computer only; https://example.com/trophy.svg → B. on another website

</div>
</div>

<!-- Speaker note: Relative paths travel with the folder: the page finds its files wherever the folder goes. Paths on one computer break everywhere else. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Safe to publish?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Chess club</h1>
<img src="trophy.svg" alt="A gold trophy" width="80">
<p>Chess every Wednesday at lunch, in the library.</p>
<h2>Our groups</h2>
<ul>
  <li><img src="star.svg" alt="" width="20"> Beginners</li>
  <li><img src="medal.svg" alt="" width="20"> Players</li>
</ul>
```

</div>
<div>

**Which of these are fine on a public page for a school club, and which stay off it?**

Groups: Fine to publish · Keep it off

The club's name and meeting day · Pictures you drew yourself · Your full name and your school's address · Photos of classmates · Your email address or phone number

* Answer: The club's name and meeting day → Fine to publish; Pictures you drew yourself → Fine to publish; Your full name and your school's address → Keep it off; Photos of classmates → Keep it off; Your email address or phone number → Keep it off

</div>
</div>

<!-- Speaker note: Anything online can be copied and kept. Leave out what identifies a person, and ask before using anyone's photo; your school will have its own rules too. -->

<style scoped>section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**On Ada's computer both pictures show. Online, the trophy is a broken picture and the medal is fine. Click the line that is wrong.**

```
 1  <h1>Chess club</h1>
 2  <img src="C:/Users/ada/Desktop/trophy.svg" alt="A gold trophy" width="80">
 3  <img src="medal.svg" alt="A medal" width="80">
 4  <p>Chess every Wednesday at lunch.</p>
```

* Answer: line 2

<!-- Speaker note: C:/Users/ada/Desktop/ is a folder on Ada's computer, not on the web. Put trophy.svg in the site's folder and write src="trophy.svg". -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify

Sam's page works on Sam's computer only. Fix its paths. The preview already shows what will go wrong online: the pictures and the Bootstrap look are missing until each path is right.

<!-- Speaker note: What this step is for: Making a page ready to publish is making every path relative to the page. Hints, in order: Each file will sit beside index.html, so each path is just the file's name. / src="star.svg", src="medal.svg" and href="bootstrap.min.css". For students who need more support: Prepare one folder for the class (the run page and its pictures) so everyone publishes the same site first, then their own. For early finishers: Make a second page (about.html) and link the two with relative links. Add the page's language and a description in the head. Run Lighthouse on the published page. The hard part, on purpose: Things work on the student's computer and not online, and they can't see why. Ask "where is this file, and where does the path look?" before checking anything for them. When students get stuck: Pictures are broken when index.html is opened from the computer. Ask: Is the picture file in the same folder as index.html, with exactly the same name? Fix: Download it into that folder; names must match, capitals included. / A Bootstrap or Vue page looks plain or does nothing once downloaded. Ask: Is bootstrap.min.css (or vue.js) in the folder? Fix: Download the library from the list the Download button shows. / The fetch lesson's page says Loading for ever on the computer. Ask: Was it opened by double-clicking? Fix: fetch needs a host: test it once it is published. -->

<!-- Speaker note: Teacher: point at the preview: the broken pictures are what Sam's visitors would see. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Clink+rel%3D%22stylesheet%22+href%3D%22C%3A%2FUsers%2Fsam%2FDownloads%2Fbootstrap.min.css%22%3E%0A%0A%3Cdiv+class%3D%22container+mt-3%22%3E%0A++%3Ch1%3EArt+show%3C%2Fh1%3E%0A++%3Cimg+src%3D%22%2FUsers%2Fsam%2FPictures%2Fstar.svg%22+alt%3D%22A+star%22+width%3D%2260%22%3E%0A++%3Cimg+src%3D%22file%3A%2F%2F%2FC%3A%2FUsers%2Fsam%2FDesktop%2Fmedal.svg%22+alt%3D%22A+medal+for+the+best+painting%22+width%3D%2260%22%3E%0A++%3Cp+class%3D%22lead%22%3EYear+8+paintings+in+the+hall%2C+Thursday+after+school.%3C%2Fp%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/site/site-publish/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: publish your page

Publish the page you checked in **Pages for everyone**:

1. Paste it in, press **Download**, and put `index.html` and every file it lists in one folder.
2. Open `index.html` from the folder and check every part works.
3. Publish the folder in the way your teacher shows you: for example GitHub Pages, Netlify Drop, or your school's own website.
4. Open the address on another device, such as a classmate's laptop.

<!-- Speaker note: What this step is for: Goals only: the student's own checked page, as a folder, online at an address. -->

<!-- Speaker note: Teacher: publish together with the host you chose; open each address on another device. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make: publish your page

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Paste+the+page+you+checked+in+the+last+lesson+here.+Press+Download%2C+then+put+index.html%0A+++++and+every+file+it+lists+in+one+folder%2C+and+open+index.html+from+your+computer+to+test+it.+--%3E%0A%3Ch1%3EMy+page%3C%2Fh1%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/site/site-publish/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

## Where this leads

Your page is ready for real people, and online. A page that needs a server of its own (saving data for everyone, a login) is a web app: **Web apps with Flask**.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does src="C:/Users/ada/Desktop/trophy.svg" break online, and what should it be?**

* It points at a folder on Ada's computer, which the web can't reach; put trophy.svg beside the page and write src="trophy.svg".

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Web apps with Flask: sites that run code on a server, for logins and shared data. Class idea: a shared class gallery page linking every student's published page. -->
