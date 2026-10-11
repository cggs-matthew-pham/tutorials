# AC9TDI10K03 — Data compression techniques

**Year 9-10**
**Strand:** Knowledge and Understanding

## ACARA Descriptor

investigate simple data compression techniques

## Prior Knowledge

Students can explain how digital systems represent text, image and audio data using binary (AC9TDI8K03) and how integers are represented in binary (AC9TDI8K04). They understand that different data types require different amounts of storage. They have not yet investigated how data can be compressed to reduce storage and transmission requirements.

## Progression Endpoint

Students investigate simple data compression techniques, including lossless methods such as run-length encoding and lossy methods, and explain the difference between lossy and lossless compression and the consequences of each.

## Waypoint Sequence (3 waypoints, 1 hinge)

#### 1. Why compression is needed

Students can explain why data compression is useful and identify contexts where it matters.

**Minimum width:** Explain what data compression is and give at least one reason why it is useful (e.g. file size, transmission speed, storage cost).

**Typical width:** Explain why compression is important in contexts including storage, transmission speed, energy use, and bandwidth cost; compare file sizes before and after a simple compression example.

**Wider:**
- Investigate the energy cost of transmitting large uncompressed files compared to compressed equivalents — connect this to environmental impact of digital systems
- Examine why compression is particularly important in low-bandwidth contexts such as remote First Nations communities and what trade-offs arise

**Success criteria:**
- Correctly explains what compression does (reduces file size)
- Gives at least one concrete reason why reducing file size matters

#### 2. Lossless compression — run-length encoding ⚑

Students can use run-length encoding to represent patterns in data in a compressed form and explain how the algorithm works.

**⚑ Hinge:** RLE procedural errors cascade into N3 — students who cannot correctly encode a sequence cannot calculate compression ratios or reason about when RLE is effective versus ineffective, which is the foundation for lossy/lossless comparison.

**Response modes:**
- ◆ Practise here: Run-length encoding requires students to apply a precise algorithmic procedure. Errors in counting runs or encoding the count-value pair are common. Sufficient practice with varied sequences — images, text repetitions, binary strings — builds the procedural fluency needed before the conceptual explanation is solid.

**Minimum width:** Apply run-length encoding to a simple sequence (e.g. a row of pixels) and explain how it reduces storage by representing repeated values as a count-value pair.

**Typical width:** Apply run-length encoding to image row data; calculate the compression ratio achieved; explain when RLE is effective (many repeated values) and when it is not (random/varied data).

**Wider:**
- Investigate additional lossless compression techniques (e.g. Huffman coding concepts) and explain how they generalise the principle of representing frequent patterns efficiently
- Apply RLE to different data sequences and identify what properties make data more or less compressible with this technique

**Success criteria:**
- Correctly applies RLE to encode a simple sequence
- Explains how the encoded form represents the original data

#### 3. Lossy vs lossless — trade-offs and consequences ★

Students can explain the difference between lossy and lossless compression, identify contexts where each is appropriate, and describe the consequences of using each.

**Response modes:**
- ↔ Widen contexts: The lossy/lossless distinction is abstract without concrete cases. Students need examples where the trade-off is consequential — medical imaging, audio quality, image artefacts — to understand why the distinction matters beyond a vocabulary definition.

**Minimum width:** Explain the difference between lossy and lossless compression and give one example of each; identify one consequence of using lossy compression.

**Typical width:** Explain that lossless compression preserves all original data (decompression recovers the original exactly) while lossy compression permanently discards information; describe appropriate contexts for each (e.g. medical images require lossless; music streaming tolerates lossy); explain why the same file format may not suit both contexts.

**Wider:**
- Compare audiovisual codecs (MP3 vs WAV, MP4 vs uncompressed video) and explain what information is discarded and why human perception makes this acceptable in most contexts
- Investigate the consequences of lossy compression in high-stakes domains — medical imaging, legal evidence, archival records — and explain why lossless is required
- Explore how image compression artefacts arise (e.g. JPEG block artefacts) and explain the algorithmic reason they appear

**Success criteria:**
- Correctly distinguishes lossless (exact recovery) from lossy (permanent data loss) compression
- Identifies an appropriate context for each type and justifies the choice
- Names at least one consequence of using lossy compression in an inappropriate context
