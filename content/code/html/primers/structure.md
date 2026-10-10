---
title: HTML structure in 5 minutes
---
## The idea in plain words

A web page is a text file. **HTML** is the set of labels, called **tags**, that say what each piece of text is. `<h1>` labels the main heading, `<p>` a paragraph, `<ul>` a list. Most tags come in pairs: an opening tag `<p>` and a closing tag `</p>` with a slash, wrapped around the text they label.

Tags go inside other tags, like boxes inside boxes: a `<strong>` word inside a `<p>`, list items inside a list, rows inside a table. The inner tag always closes first. Some tags also carry extra information, called **attributes**, inside the opening tag: a link's address, `<a href="...">`, or an image's file, `<img src="...">`.

The **browser** (Chrome, Safari, Edge) reads the file and draws the page. The tags say what things are; the browser decides how they look, and later CSS changes that look.

## Why it matters

- **Meaning, not just looks.** A real heading tag tells search engines and screen readers "this is a heading", so people can jump between sections. Big bold text that is only made to look like a heading does not.
- **Structure first.** A page with a clear tree of tags is easy to style, change and, later, to control with JavaScript.
- **Everyone uses it.** Every website, from a school page to a shop, is built from these same few dozen tags.

## An everyday picture, and where it breaks

Tags are like the labels on a filing system: a folder labelled "Sports day" holds a sheet labelled "When", which holds a note labelled "important". Close each folder before the one it sits in.

Where it breaks: a filing clerk would refuse a badly labelled folder, but a browser never refuses. When the tags are wrong, it shows its best guess with no error message. A missing `</strong>` turns the rest of the page bold, and overlapping tags are quietly repaired. That is why students must look at the page after every change.

## Try it yourself (5 minutes)

1. Open the HTML playground. Type `<h1>My page</h1>` and watch the preview.
2. Add `<p>Line one` then press Enter and type `line two</p>`. The page shows one line: the browser ignores line breaks in the code.
3. Split it into two paragraphs, each with its own `<p>` and `</p>`.
4. Put `<strong>` around one word, then delete its `</strong>`. Watch the bold spread, then put it back.

## Questions students ask

- **"Why didn't my new line show up?"** The browser ignores line breaks in the code. Start a new paragraph with `<p>`.
- **"Why is everything bold?"** A `</strong>` is missing. Find where the bold should stop.
- **"Why is there no error message?"** Browsers are built to show something rather than nothing, so they guess. Checking the page is our error message.
- **"Do I need `<!DOCTYPE html>` and `<head>`?"** A real page has them as a standard wrapper. In the playground they are optional, and students copy them as they are for now.

## How it connects

The Structure unit builds the tree: headings and paragraphs, then lists and links, images, and tables. The Style unit then uses that tree: CSS rules pick out tags by name or class. Later, JavaScript finds and changes the same tags, which is why the DOM course calls the page a tree.
