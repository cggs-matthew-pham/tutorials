---
order: 3
unit: archive
node: [AC9TDI8K02 n4, AC9TDI10P14 n3]
assumes: [text-as-numbers]
shape: 5e
title: "Capture the flag: the old archive"
summary: "The club's old archive server is being wiped on Friday. Before it goes, find out what it still gives away: five flags, each found with a skill from Digital systems (decoding, page source, the command line, a tiny processor and a key word). Then close the archive's leaks so the secrets can be changed."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Five club secrets are still sitting in the old archive. Find them before Friday, so they can be changed."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8544
  url: http://127.0.0.1:8544/index.html
  readySelector: ".srpage"
  layout: full
explainPicture: { ref: archive.yml#explain-pic, caption: "The old archive's front page: members only, with a password box. What does its source give away?" }
explainClip:
  query: { code: "@archive.yml#explain", fresh: 1, id: explain }
  caption: "Start with the page"
  say: "The archive's front page."
  clip:
    - caption: { text: "Members only, and a password box. But what does the browser receive?", say: "Members only. But what does the browser receive?" }
    - wait: 1000
    - click: "View source"
    - expect: { selector: ".srsrc", contains: "hidden" }
    - caption: { text: "Every line is yours to read. Look for anything that shouldn't be there.", say: "Every line is yours to read." }
    - wait: 1500
---
A **capture the flag** (CTF) is a security challenge: you look for what a system gives away, with permission, and each find is a **flag**, a secret like **WP{…}** to type in. The archive is the club's and yours to check. Every flag is something that should never have been there, so the club can change it.

## Engage: why look?

```step
stage: predict
insight: "Committing to why a club checks its own old server frames the challenge as defence: find what's exposed, then fix it."
check:
  type: predict
  q: "The archive is being wiped on Friday anyway. Why check what it gives away first?"
  options: ["Anything found may still be in use elsewhere, so it must be changed", "It doesn't matter: it's being wiped", "To copy the files", "To make the server faster"]
  actual: "Secrets that leaked may still work: the same passwords and codes are often reused. Find them, then change them."
```

## Explore: five flags

```step
stage: run
insight: "Each flag needs one skill from Digital systems applied to the archive; the hints escalate and never give the flag."
try: { playground: board, starter: "archive.yml#decode", height: 560 }
tasks:
  - starter: "archive.yml#decode"
    hint: ["Look at the characters: which rule could make them?", "It took more than one rule. Decode what comes out, too."]
    check:
      type: flag
      q: "Flag 1 (encoding). The archive's front page had this note. Decode it."
      hash: 165966ae6442842c06428fd18cf5f2cc5c997bbf97e96e8e87d924be15436e5f
      explain: "Base64, then hex: two public rules, no key. Encoding hides nothing."
  - starter: "archive.yml#page"
    hint: ["What does a visitor's browser receive that the page doesn't show?", "View source, and read every line."]
    check:
      type: flag
      q: "Flag 2 (page source). The front page shows nothing but a password box. What does it give away?"
      hash: d97f56dbdfbeaa1deedc7884fd7dc40d00a6b511f3df7c9cda90885974201f9e
      explain: "A hidden field held it: not shown, but sent to every visitor."
  - starter: "archive.yml#files"
    hint: ["Read readme.txt first.", "Out of sight: names starting with a dot are hidden from plain ls.", "The minutes are long: grep can pull out one line."]
    check:
      type: flag
      q: "Flag 3 (command line). The old minutes are somewhere in the archive folder. Find the flag in them."
      hash: f9718b9284435d7a60bd4de567f156d16679055bfca9db25221e6211c5067583
      explain: "ls -a shows the hidden folder .gears; grep Flag .gears/minutes.txt finds the line. Hidden is not private. Remember the folder's name."
  - starter: "archive.yml#cpu"
    hint: ["Run the program and write down its outputs.", "The outputs are character codes, like in Text as numbers.", "a is 97, b is 98, c is 99…"]
    check:
      type: flag
      q: "Flag 4 (processor). The archive's old program prints a word as numbers. Run it and read them as text. The flag is WP{ then the word, then }."
      hash: 7b2117e89aa0850a04ec133f942515a2497c53c07a386710ad3125c759df8d50
      explain: "99, 112, 117 are c, p, u: each output is 32 more than a capital letter's code, so the program turned CPU into lower case."
  - starter: "archive.yml#locked"
    hint: ["Do any public decoders work?", "It's encrypted with a key word you've already met in this archive.", "The hidden folder's name, without its dot."]
    check:
      type: flag
      q: "Flag 5 (key). The last note is encrypted with the club's key word. Decrypt it."
      hash: 1ba5dca56522d8dc1acea457118f8745d156c0af13c44ae4fec8e0a7dcaa3423
      explain: "The key word was gears, the hidden folder's name. A key kept next to the data it protects protects nothing."
```

### Flag 1: the note

### Flag 2: the page

### Flag 3: the minutes

### Flag 4: the old program

### Flag 5: the locked note

## Explain: what each flag shows

```step
stage: investigate
insight: "Naming the weakness behind each flag turns the hunt into a list of fixes."
check:
  type: question
  q: "Which flag shows that a key stored beside the data it protects is no protection?"
  options: ["Flag 5: the key word was the hidden folder's name", "Flag 1: the encoded note", "Flag 2: the hidden field", "Flag 4: the old program"]
  answer: 0
  feedback: [null, "That one had no key at all.", "That was a page giving away its data.", "That was numbers read as text."]
  explain: "Keys belong somewhere else (a password manager, the server), never next to what they lock."
```

```worked
\text{Flag 1} :: Encoding is not encryption: base64 and hex hide nothing.
\text{Flag 2} :: The page gives away its hidden field: keep data on the server.
\text{Flag 3} :: A hidden folder isn't private: use permissions, or don't keep it.
\text{Flag 4} :: Numbers in memory are text to anyone who reads them as codes.
\text{Flag 5} :: A key kept next to its data protects nothing.
```

### Which flag?

## Elaborate: close the archive

```step
stage: make
insight: "Ending a CTF the way defenders do: every finding becomes a fix."
try: { playground: board, starter: "archive.yml#close", height: 560 }
hint: ["For each leak: after the fix, does a visitor's browser still receive it?"]
check: { type: board, text: "Before Friday, fix what the archive's front page gives away.", when: "f = n", explain: "The backup value is gone, and the password check and the files are protected on the server. Then the club changes every secret you found." }
```

## Evaluate: look back

```step
stage: info
tasks:
  - check:
      type: question
      q: "You found five secrets in the archive. What should happen next?"
      options: ["Report them so each one is changed, and fix where they leaked", "Keep them in case they're useful", "Post them so everyone knows", "Nothing: the archive is being wiped"]
      answer: 0
      feedback: [null, "Keeping found secrets is how leaks spread.", "That leaks them further.", "They may still work elsewhere."]
      explain: "Find, report, change, fix: that's what a CTF is practice for."
  - check: { type: reflect, text: "I can use what I know about data, pages, files and keys to find what a system gives away, and say how to fix it." }
```

### What next?

### Look back
