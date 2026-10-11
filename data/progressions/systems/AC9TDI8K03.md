# AC9TDI8K03 — Representing text, image and audio

**Year 7-8**
**Strand:** Knowledge and Understanding

## ACARA Descriptor

Investigate how digital systems represent text, image and audio data using integers

## Prior Knowledge

Students can explain how digital systems use numbers to represent all types of data (AC9TDI6K03) and how data is represented using binary through off and on states (AC9TDI6K04). They understand the general principle that all data is numbers, but have not yet investigated the specific encoding schemes for text, image, or audio.

## Progression Endpoint

Students investigate how digital systems use integers to represent text (Unicode character values), images (RGB pixel values for bitmaps, geometry for SVG), and audio (amplitude samples at a given sampling rate and bit depth), and explain the encoding scheme for each data type.

## Waypoint Sequence (4 waypoints, 1 hinge)

#### 1. The principle: all data as integers ⚑

Students can explain that digital systems represent all data types — text, images, audio — as integers, and that different encoding schemes map integers to different kinds of information

**⚑ Hinge:** Students who do not understand that the same integer means different things in different encoding contexts will treat Nodes 2, 3 and 4 as three unrelated memorisation tasks rather than three instances of the same principle. Without this anchor, the three encoding schemes cannot be integrated at the standard level.

**Response modes:**
- ↔ Widen contexts: If students don't grasp that integers are mapped to meaning through encoding schemes, the three data types (text, images, audio) appear as disconnected facts. Seeing the principle applied across all three types IS the width that resolves the misconception.

**Minimum width:** State that text, images and audio are all stored as numbers in a digital system; give one example of how a number could represent non-numeric data

**Typical width:** Explain that different data types use different encoding schemes — the same integer means different things depending on whether the system is interpreting it as a character, a colour value, or a sound amplitude

**Wider:**
- Limited width — the encoding-scheme principle does not vary meaningfully across contexts. Reasoning about why a universal scheme would not work goes further conceptually rather than broadening the application of the principle.

**Success criteria:**
- States that all data types are represented as integers in digital systems
- Gives at least one example of how a number represents non-numeric information

**Related standards:**
- AC9TDI8K04

#### 2. Text as Unicode integers ★

Students can explain how digital systems represent text as a sequence of characters, each mapped to an integer using the Unicode character set

**Response modes:**
- ↔ Widen contexts: Applying the Unicode encoding scheme across diverse character types (letters, emoji, punctuation, non-Latin scripts) builds robust understanding of the mapping principle rather than a single memorised example. The language diversity direction also connects data representation to cultural and linguistic equity.

**Minimum width:** Use a Unicode table to find the integer value for given characters; explain that each character (letter, punctuation, emoji) has a unique number

**Typical width:** Encode a short word as a sequence of Unicode integers; explain why uppercase and lowercase letters have different values; identify that emoji are also Unicode characters

**Wider:**
- Investigate how Unicode handles diverse languages and writing systems — why ASCII was insufficient and what Unicode solved
- Research how Unicode versioning adds new characters (e.g. emoji) and what that means for backward compatibility

**Success criteria:**
- Correctly looks up Unicode values for given characters
- Explains that each character has a unique integer in the Unicode set
- Encodes at least a short word as a sequence of integers

**Related standards:**
- AC9TDI8K04

#### 3. Images as pixel colour values

Students can explain how digital systems represent bitmap images as RGB colour values per pixel, and how vector graphics use geometry instead

**Minimum width:** Explain that a bitmap image is a grid of pixels, each with RGB colour values from 0 to 255; identify the colour for a given RGB value

**Typical width:** Calculate the number of integers needed to store a small image given its resolution and colour depth; compare bitmap (PNG/JPEG) and vector (SVG) representations for the same image

**Wider:**
- Explore how SVG's geometry-based representation enables scaling without quality loss — why this matters for responsive design
- Limited width — investigating colour depth trade-offs (8-bit vs 24-bit) goes further technically rather than exploring image representation in a broader range of contexts.

**Success criteria:**
- Explains that bitmap images store RGB values (0-255) for each pixel
- Identifies the colour represented by a given RGB triplet
- Describes at least one difference between bitmap and vector image representation

**Related standards:**
- AC9TDI8K04
- AC9TDI8P01

#### 4. Audio as sampled amplitudes ★

Students can explain how digital systems represent audio by sampling the amplitude of a sound wave at regular intervals and storing each sample as an integer

**Response modes:**
- ⊕ Integration point: This node connects audio representation to both the principle node (Node 1 — all data as integers) and to K04 (binary representation of those integers). The Welcome to Country context integrates the encoding chain into a culturally meaningful whole.

**Minimum width:** Explain that audio is captured by measuring sound amplitude at regular time intervals; identify that each measurement is stored as an integer

**Typical width:** Explain how sampling rate (e.g. 44,100 Hz) and bit depth (e.g. 16-bit) determine audio quality; calculate the range of values for a given bit depth

**Wider:**
- Use a culturally meaningful context such as recording a Welcome to Country to trace how audio data is captured, converted to integers, stored and played back
- Limited width — investigating sampling rate and bit depth trade-offs goes further technically rather than applying audio representation to more contexts.

**Success criteria:**
- Explains that audio is represented by sampling amplitude at regular intervals
- States that each measurement is stored as an integer

**Related standards:**
- AC9TDI8K04
