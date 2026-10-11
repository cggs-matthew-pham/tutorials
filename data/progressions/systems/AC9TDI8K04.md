# AC9TDI8K04 — Integer representation in binary

**Year 7-8**
**Strand:** Knowledge and Understanding

## ACARA Descriptor

Explain how and why digital systems represent integers in binary

## Prior Knowledge

Students can explain how data is represented using binary through off and on states (AC9TDI6K04) and how digital systems use integers to represent text, image and audio data (AC9TDI8K03). They understand the concept of binary as on/off, but have not yet explained binary place value, the relationship between bits and representable range, or how circuits perform binary operations.

## Progression Endpoint

Students explain how integers are represented in binary using place value (powers of 2), the relationship between bits, bytes and representable range, and why digital systems use binary — connecting electronic on/off states to logic gates and data encoding.

## Waypoint Sequence (4 waypoints, 1 hinge)

#### 1. Binary place value and counting ⚑

Students can count in binary, convert between binary and decimal, and explain binary place value as powers of 2

**⚑ Hinge:** Students who cannot fluently convert between binary and decimal cannot reason about representable ranges (Node 2), understand how logic gates combine binary states (Node 3), or trace the K03 encoding chain through to binary (Node 4). Conversion errors propagate through all subsequent nodes.

**Response modes:**
- ◆ Practise here: Binary conversion is a mechanical skill that all subsequent understanding depends on. Width is thin — there are no meaningfully different contexts for conversion. What helps is more practice: more conversions, more checking, building fluency until conversion is automatic.

**Minimum width:** Count in binary from 0 to at least 15; convert a given decimal number to binary and back

**Typical width:** Convert numbers in both directions confidently; explain that each binary digit represents a power of 2; predict what range of values a given number of bits can represent

**Wider:**
- Limited width — binary conversion is a mechanical skill that does not vary meaningfully across contexts. Extensions such as binary addition go further conceptually rather than broadening the application of place value.

**Success criteria:**
- Correctly converts at least three decimal numbers to binary
- Correctly converts at least three binary numbers to decimal
- Explains that each position in a binary number represents a power of 2

#### 2. Bits, bytes and range

Students can explain the relationship between the number of bits and the range of values that can be represented, and use standard units (byte = 8 bits)

**Response modes:**
- ⊕ Integration point: This node connects binary representation (K04) back to data encoding (K03) — the bits/bytes/range relationship grounds the earlier encoding discussion in concrete number theory. Students who only memorise '1 byte = 8 bits' without connecting it to K03 RGB/audio examples have not integrated the two standards.

**Minimum width:** State that 1 byte = 8 bits and can represent values from 0 to 255

**Typical width:** Explain why 8 bits gives 256 possible values (2^8); predict the range for different bit counts; connect byte size to practical examples from K03 (e.g. RGB values 0-255 are one byte per channel, 16-bit audio uses 2 bytes per sample)

**Wider:**
- Calculate the storage requirements for a small image or short audio clip using bit depth and resolution, connecting bits/bytes to real data representation from K03
- Limited width — overflow errors go further conceptually rather than applying the bits-to-range relationship across more contexts.

**Success criteria:**
- States that 1 byte = 8 bits and can represent values from 0 to 255
- Does not confuse bit count with the values themselves (e.g. 8 bits does not mean the number 8)

**Related standards:**
- AC9TDI8K03

#### 3. Why binary — circuits and logic gates

Students can explain why digital systems use binary by connecting electronic on/off states to how circuits perform operations using logic gates

**Response modes:**
- ◎ Scaffold reasoning: The why-binary question requires students to reason through a chain: electronic components have two reliable states → those states can be encoded as 0/1 → circuits can combine those states using Boolean logic → therefore binary is the natural foundation. Students who skip this reasoning and accept 'computers use binary' as a given cannot explain why binary was chosen over other number bases.

**Minimum width:** Explain that computers use binary because electronic components have two reliable states (on/off); identify that circuits with switches can represent AND or OR operations

**Typical width:** Demonstrate how a 2-switch circuit represents AND and OR gates; explain the output for each combination of inputs; connect this to why binary is the foundation for all computation

**Wider:**
- Limited width — logic gates and circuit-level operations do not vary meaningfully across contexts. Extensions such as adder circuits or the history of binary vs analogue computing go further conceptually rather than broadening the application.

**Success criteria:**
- Explains that binary maps to the two reliable states of electronic components
- Demonstrates the output of AND and OR gates for given inputs
- Connects logic gates to why digital systems are built on binary

#### 4. Binary connects to data encoding

Students can explain how binary integer representation underpins the encoding of text, images and audio, connecting K04 to K03

**Response modes:**
- ⊕ Integration point: This node is the explicit cross-standard integration point between K03 and K04. Students must assemble the full encoding chain — data type → integer → binary — to demonstrate that both standards are genuinely understood and not held as separate compartments.

**Minimum width:** Trace one example from data to binary: convert a character to its Unicode integer, then convert that integer to binary

**Typical width:** Trace the full encoding chain for two data types (e.g. a character via Unicode to binary, and a pixel colour via RGB to binary); explain why binary is the final representation for all data types

**Wider:**
- Limited width — the integration of binary with data encoding is the endpoint of this standard. Extensions such as file formats or compression go beyond the standard's scope into Year 9-10 territory.

**Success criteria:**
- Traces a character from text to Unicode value to binary representation
- Explains that all data types ultimately become sequences of binary digits
- Connects the encoding chain from K03 (data as integers) to K04 (integers as binary)

**Related standards:**
- AC9TDI8K03
