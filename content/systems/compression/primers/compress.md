---
title: Compression in 5 minutes
---
## The idea in plain words

Data is big: a phone photo is tens of millions of numbers. **Compression** stores the same data in fewer numbers, so it takes less space and less time to send.

**Run-length encoding** (RLE) stores runs: instead of white, white, white, black, black, black, black, white, store 3, 4, 1 (how many of each colour in turn). Decompressing gives back exactly the same picture, so RLE is **lossless**. It works well when data has long runs (icons, diagrams, faxes) and badly when every value differs (a checkerboard, a photo, noise), where it can even make data bigger.

**Lossy** compression throws away detail people are unlikely to notice: here, shades close to each other are treated as the same, so runs get longer. The data gets much smaller, but what is thrown away is gone for good. JPEG and MP3 are lossy; PNG and ZIP are lossless.

## Why it matters

Choosing the wrong kind has consequences: a lossy medical scan, legal photo or spreadsheet could change what someone sees or decides. Streaming music and photos online is only practical because of lossy compression.

## What students get wrong

- **Forgetting where the runs start.** A row that starts black needs a 0 first (no whites).
- **Thinking compression always saves space.** Data with no runs can get bigger.
- **Thinking lost detail can be recovered.** Once a lossy file is saved, the original values are gone.

## Where it comes from

The pixel codes are CS Unplugged's Image representation activity (csunplugged.org, CC BY-SA 4.0).

## The words

**compression**, **run-length encoding**, **lossless**, **lossy**, **compression ratio**, **tolerance**.
