# AC9TDI8K02 — Wired and wireless networks

**Year 7-8**
**Strand:** Knowledge and Understanding

## ACARA Descriptor

Investigate how data is transmitted and secured in wired and wireless networks including the internet

## Prior Knowledge

Students can explain how digital systems form networks to transmit data (AC9TDI6K02). They have not yet compared wired and wireless network properties, explored encryption, or investigated how protocols handle transmission errors.

## Progression Endpoint

Students investigate how data is transmitted across wired and wireless networks including the internet, by comparing network properties (bandwidth, latency, reliability), explaining how protocols handle packet transmission and errors, and explaining why and how encryption secures data in transit.

## Waypoint Sequence (5 waypoints, 3 hinges)

#### 1. Wired vs wireless network properties ⚑ ★

Students can describe the properties of wired and wireless networks and compare their bandwidth, latency and reliability

**⚑ Hinge:** Network properties (bandwidth, latency, reliability) are the vocabulary for Nodes 2–5. Students who cannot name and distinguish these properties cannot reason about why packet loss matters (Node 2), why encryption adds latency (Node 3), or how internet segments work (Node 5).

**Response modes:**
- ↔ Widen contexts: Comparing bandwidth, latency and reliability across use cases (streaming, gaming, file transfer, remote access) builds the conceptual vocabulary needed for Nodes 2 and 5. Students who encounter only one network type cannot generalise the properties when analysing the full internet data journey.

**Minimum width:** Name at least two properties that differ between wired and wireless networks; state which is faster or more reliable in a given scenario

**Typical width:** Compare bandwidth, latency and reliability across wired and wireless networks; explain why each property matters for different uses (e.g. streaming vs file transfer vs gaming)

**Wider:**
- Research how network infrastructure decisions affect connectivity equity in different communities — why some areas have fibre and others rely on satellite or mobile
- Investigate how emerging wireless standards (e.g. Wi-Fi 6, 5G) are narrowing the gap with wired networks

**Success criteria:**
- Correctly names at least two properties that differ between wired and wireless networks
- Explains which network type is more suitable for a given use case and why

**Related standards:**
- AC9TDI8K01

#### 2. Packets and protocols ⚑

Students can explain how data is broken into packets for transmission and how protocols like TCP handle errors when packets are lost

**⚑ Hinge:** The packet/protocol model is the prerequisite for understanding why encryption is necessary (Node 3) — students must understand that packets travel through shared infrastructure they don't control before the need for encryption makes sense. Without it, Node 3's reasoning chain fails.

**Response modes:**
- ↔ Widen contexts: Understanding packet-based transmission is the foundation for both why encryption matters and why protocols exist. Broader contexts (different failure scenarios, different network paths) help students see that packet loss is systemic, not a one-off glitch.

**Minimum width:** Explain that data is broken into packets for transmission; identify that packets can be lost or delayed in transit

**Typical width:** Explain how TCP uses acknowledgements to confirm packets have been received; describe what happens when a router drops a packet and how the protocol recovers

**Wider:**
- Investigate how network problems propagate through systems — what a user experiences when packet loss occurs at different points in the network
- Limited width — tracing a full request path from device to server extends the concept further rather than applying packet transmission to a broader range of contexts.

**Success criteria:**
- Explains that data is transmitted in packets, not as a continuous stream
- Describes what happens when a packet is lost or delayed

**Related standards:**
- AC9TDI8K04

#### 3. Why data needs to be secured ⚑

Students can explain why cryptography is necessary for securing data transmitted across networks, connecting the need to how packets travel through shared infrastructure

**⚑ Hinge:** Students who accept 'encryption is good' without understanding the shared-infrastructure reasoning cannot explain how simple encryption works (Node 4) or trace the full internet data journey (Node 5). The need for encryption must be understood before the mechanism has meaning.

**Response modes:**
- ◎ Scaffold reasoning: The need for encryption is not obvious to students until they reason through the shared-infrastructure model. Scaffolding the chain (packets leave your device → travel through routers you don't control → anyone along the path can read them → therefore encryption is necessary) prevents students from accepting 'encryption is good' as a fact without understanding why.

**Minimum width:** Explain why data transmitted over a network needs to be encrypted; give one example of data that must be secured (e.g. credit card details, passwords)

**Typical width:** Explain why encryption is necessary using the shared-infrastructure model — packets pass through routers and systems the sender does not control, so anyone along the path could read unencrypted data

**Wider:**
- Research why different levels of encryption are used for different types of data — why HTTPS matters for banking but not for reading a public news article
- Investigate real cases where unencrypted data transmission led to security breaches — what was exposed and how

**Success criteria:**
- Explains why data needs encryption during transmission, not just storage
- Names at least one real scenario where encryption protects users

**Related standards:**
- AC9TDI8K04

#### 4. How simple encryption works

Students can explore how simple encryption algorithms transform data to protect it, and demonstrate an encrypt-decrypt cycle

**Response modes:**
- ◆ Practise here: Encryption algorithms at this level are mechanical demonstrations. The encrypt-decrypt cycle needs to be practised until the reversibility principle is automatic — students must be able to demonstrate it fluently before they can reason about why reversibility matters for secure communication.

**Minimum width:** Describe how a simple encryption algorithm (e.g. ROT13) transforms readable text into encrypted text; show that the process is reversible

**Typical width:** Demonstrate how ROT13 and XOR each encrypt and decrypt a short message; explain why XOR is more useful for digital systems because it operates on binary data

**Wider:**
- Apply XOR encryption to a short binary message and decrypt it — connect to K04's binary representation
- Limited width — encryption algorithms at this level are mechanical demonstrations. Understanding additional algorithms goes further technically rather than broadening the concept of how encryption protects data.

**Success criteria:**
- Describes how a simple algorithm transforms text into an encrypted form
- Demonstrates that encryption is reversible — the original message can be recovered

**Related standards:**
- AC9TDI8K03
- AC9TDI8K04

#### 5. How the internet transmits and secures data ★

Students can explain how the internet combines network infrastructure, packet transmission, protocols and encryption to transmit and secure data end to end

**Response modes:**
- ⊕ Integration point: This node synthesises all four preceding concepts — network properties, packet transmission, protocols, and encryption — into a single coherent account of how the internet works. Students who have understood each component separately often struggle to assemble them into an end-to-end chain. The integration task surfaces whether components were genuinely understood or merely memorised in isolation.

**Minimum width:** Describe the journey of a piece of data across the internet — from sender through networks to receiver — identifying where packets, protocols and encryption each play a role

**Typical width:** Trace a real scenario (e.g. making an online purchase) through the full chain: data is encrypted, broken into packets, transmitted across wired and wireless networks via routers, reassembled using TCP, and decrypted at the destination; identify which network properties affect the experience

**Wider:**
- Investigate how the internet uses both wired and wireless segments in a single data journey — where does fibre end and wireless begin for a typical request?
- Research how internet infrastructure differs between urban and remote communities and how this affects the transmission and security chain

**Success criteria:**
- Describes a data journey across the internet that includes at least packets, a protocol and encryption
- Identifies where in the journey wired and wireless networks are used

**Related standards:**
- AC9TDI8K01
- AC9TDI8K03
- AC9TDI8K04
