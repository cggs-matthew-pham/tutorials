---
marp: true
theme: default
html: true
---

# Attributes and links

Structure and style a page · Lists, links and pictures

<!-- Speaker note: Students find out that a link is words plus an address in an href attribute, and that only the words show on the page. About 40 minutes (Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 4 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** send people to another page with a link, and find out that its address sits inside the opening tag.

- I can write a link with &lt;a href="..."&gt; and &lt;/a&gt;.
- I can say which part of a link people see and which part says where it goes.
- I can put an attribute inside an opening tag as name="value".

<!-- Speaker note: Before class: Read the unit primer "Lists, links and pictures in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes). An **attribute** is extra information about a tag, written inside the opening tag as `name="value"`. `href` is the attribute that holds a link's address. The surprise for students is that the address does not show: only the words between `<a>` and `</a>` do. Links to `example.com` open a real placeholder page, so students can test a click. Teacher: Mix it up: the list bug is from last lesson. Ask what closed the list before the third item. -->

---

## Why it matters

> Every click you make on the web, from a search result to a shop menu, follows a link written like this.

<!-- Speaker note: Some words on a page should take you somewhere else. A link does that, and it is the first tag you meet that needs extra information inside it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
```

**What will the page show, and what happens when someone clicks?**

- An error message, because href is not a tag
- https://example.com/rules, and a click on it opens the page
- Read the club rules before you join. The words club rules are the link, and a click opens the rules page
- Read the https://example.com/rules club rules before you join. A click on the address opens the page

<!-- Speaker note: What happens: Read the club rules before you join. Only the words between &lt;a&gt; and &lt;/a&gt; show, as a link. The address stays inside the tag and the click takes you there. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students pick the option where the address shows. Let them run it and click, then use Modify to change only the address and only the words, so they see the two parts are separate. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## What do you see? <span style="font-size:.6em;color:#64748b">(3 min)</span>

Look at the code with your partner. Say what the page will show, and then what a click will do.
Hold up 1, 2, 3 or 4 fingers for the option you chose.

<!-- Speaker note: Count the votes before anyone runs it. Ask one pair that picked an address option why. The idea to land: the address is information for the browser, not text for the reader. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ERead+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frules%22%3Eclub+rules%3C%2Fa%3E+before+you+join.%3C%2Fp%3E%0A%3Cp%3EAsk+your+house+captain+for+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Ftimetable%22%3Etimetable%3C%2Fa%3E.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/links/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction, then click a link (it opens in a new tab). Look for the two parts: the words that show, and the address that does not. | Code | What it does | Why | |---|---|---| | `<a href="https://example.com/rules">club rules</a>` | Makes a link | `<a>` opens it and `</a>` closes it. Whatever is between them is what people click | | `href="https://example.com/rules"` | Says where the link goes | This is an **attribute**: a `name="value"` pair. The address is the value, in quotes | | `<a href="…">` | The attribute sits in the opening tag | Information about a tag goes inside its opening tag, after the tag name and a space. The closing tag never has one | | `club rules` | The words people click | Only these show on the page. The address is not shown, and it is not what you click | Students should be able to say: I can say which part of a link people see, and which part says where it goes. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Read the club rules before you join. Only the words between &lt;a&gt; and &lt;/a&gt; show, as a link. The address stays inside the tag and the click takes you there.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h1>Sports day</h1>
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
<p>Ask your house captain for the <a href="https://example.com/timetable">timetable</a>.</p>
```

<!-- Speaker note: What this step is for: The attribute belongs inside the opening tag, as name="value"; anywhere else it is just text. -->

<!-- Speaker note: Teacher: the question is about where the attribute goes. In the bug, read line 4 aloud: the text after the > is just text. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which tag?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h1>Sports day</h1>
<p>Read the <a href="https://example.com/rules">club rules</a> before you join.</p>
<p>Ask your house captain for the <a href="https://example.com/timetable">timetable</a>.</p>
```

</div>
<div>

**Which opening tag makes a link to https://example.com/join?**

- &lt;a "https://example.com/join"&gt;
- &lt;a link="https://example.com/join"&gt;
- &lt;href="https://example.com/join"&gt;
- &lt;a href="https://example.com/join"&gt;

* Answer: &lt;a href="https://example.com/join"&gt;

</div>
</div>

<!-- Speaker note: The attribute is called href, so it is written href="address" after the a and a space, inside the opening tag. Other names, or a missing name, mean the browser does not know where to go. -->

<style scoped>section { font-size: 21px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The link that does not click

**The page shows Timetable href=... as plain text next to a word that does not click, while the other two links work. Click the line that causes it.**

```
 1  <h2>Pages</h2>
 2  <ul>
 3    <li><a href="https://example.com/rules">Rules</a></li>
 4    <li><a>Timetable href="https://example.com/timetable"</a></li>
 5    <li><a href="https://example.com/join">Join</a></li>
 6  </ul>
```

* Answer: line 4

<!-- Speaker note: On line 4 the href is after the > and so counts as text on the page. An attribute goes inside the opening tag: <a href="https://example.com/timetable">Timetable</a>. -->

<style scoped>pre, marp-pre { font-size: 0.77em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Change the address:** Make the link go to `https://example.com/join`. The words stay the same.
- **Change the words:** Change the link's words to `rulebook`. The address stays the same.
- **Add a link:** The last line has a word that should click. Make `timetable` a link to `https://example.com/timetable`.

<!-- Speaker note: What this step is for: The words and the address are separate parts of a link: change one and the other stays. Hints, in order: The address is the part inside the quotes after `href=`. / Change only what is between the quotes. Leave the words alone. / The words people click sit between `<a ...>` and `</a>`. / Change only those words. Leave the address alone. / Put `<a href="...">` just before the word timetable and `</a>` just after it. / The address is `https://example.com/timetable`. For students who need more support: Give students the Modify starter and do the first task together, then link one item in the Make list. For early finishers: Make a link to one of your own other pages in the playground, or a whole sentence into a link, and test where it ends. The hard part, on purpose: Putting the attribute in the right place. Ask which part of the tag is the opening one, rather than fixing the line. When students get stuck: The address shows on the page next to the words. Ask: Is the href inside the opening tag, before the first >? Fix: Move href="..." between a and the first >, so the tag reads <a href="...">. / The words are not a different colour and nothing clicks. Ask: Does the link have both its <a href="..."> and its </a>? Fix: Add the missing opening tag with href, or the closing </a>, around the words. / Everything after the link is clickable. Ask: Where does the link end? Fix: Add </a> straight after the words that should click. -->

<!-- Speaker note: Teacher: three small changes: the address only, the words only, then a new link. Ask which part of the tag each change touched. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3ESports+day%3C%2Fh1%3E%0A%3Cp%3ERead+the+%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Frules%22%3Eclub+rules%3C%2Fa%3E+before+you+join.%3C%2Fp%3E%0A%3Cp%3EAsk+your+house+captain+for+the+timetable.%3C%2Fp%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/links/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**Art should be the third club in the list, but it shows without a bullet and further left. Click the line that causes it.**

```
 1  <h2>Our clubs</h2>
 2  <ul>
 3    <li><a href="https://example.com/chess">Chess</a></li>
 4    <li><a href="https://example.com/robotics">Robotics</a></li>
 5  </ul>
 6    <li><a href="https://example.com/art">Art</a></li>
```

* Answer: line 6

<!-- Speaker note: Line 6 is outside the list: </ul> on line 5 already closed it. Every <li> must be inside the <ul>, links or not. What this step is for: Review of lists: every li belongs inside a list, even when each item is a link. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Here is a top 5 list. Change the title and the items to your own favourites (books, games, places, songs). Then make two of the items links. Use `https://example.com/` followed by a name as the address, and click each link to test it.

<!-- Speaker note: Hints, in order: Pick two items. Put `<a href="...">` just inside the `<li>`, before the words. / Close them in reverse order: `</a>` first, then `</li>`. -->

<!-- Speaker note: Teacher: the check ticks when the page has a list with a link in it; look at the page to see that two items are links. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch1%3EMy+top+5%3C%2Fh1%3E%0A%3Col%3E%0A++%3Cli%3EFirst+favourite%3C%2Fli%3E%0A++%3Cli%3ESecond+favourite%3C%2Fli%3E%0A++%3Cli%3EThird+favourite%3C%2Fli%3E%0A++%3Cli%3EFourth+favourite%3C%2Fli%3E%0A++%3Cli%3EFifth+favourite%3C%2Fli%3E%0A%3C%2Fol%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/links/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Swap and click <span style="font-size:.6em;color:#64748b">(4 min)</span>

Swap pages with a partner. Click each of their links, and say which words you clicked and where each one took you.

<!-- Speaker note: Listen for students who say they clicked the address. Ask which part of the tag holds it. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**In &lt;a href="https://example.com/rules"&gt;club rules&lt;/a&gt;, which part do people see on the page, and which part says where the link goes?**

* They see club rules. The href attribute, inside the opening tag, says where it goes.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson adds pictures, which are another tag with attributes: a name for the file and words for people who cannot see it. Class idea: show a real school page and hover over links to see the address in the browser's status bar. -->
