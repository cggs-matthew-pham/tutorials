# AC9TDI10K01 — Managing and securing networked systems

**Year 9-10**
**Strand:** Knowledge and Understanding

## ACARA Descriptor

investigate how hardware and software manage, control and secure access to data in networked digital systems

## Prior Knowledge

Students can investigate how data is transmitted and secured in wired and wireless networks, including the use of protocols (AC9TDI8K02). They can explain how hardware specifications affect performance (AC9TDI8K01). They have not yet examined the software layer (OS, access control, cryptography) that manages and secures data in networked systems.

## Progression Endpoint

Students investigate how hardware and software components — including operating systems, access control mechanisms, and cryptographic protocols — work together to manage, control and secure access to data in networked digital systems.

## Waypoint Sequence (5 waypoints, 3 hinges)

#### 1. The OS as a hardware abstraction layer

Students can explain how the operating system hides the complexity of different hardware from applications, allowing software to treat different hardware uniformly.

**Minimum width:** Explain, using one example, how the OS allows applications to interact with hardware without knowing the hardware's specifics.

**Typical width:** Explain how the OS abstracts different input devices, storage types, and network interfaces; describe the role of device drivers in this abstraction.

**Wider:**
- Compare how the same application behaves across different operating systems and explain what the OS must do to make this possible
- Investigate how OS-level hardware abstraction affects accessibility features — for example, how the OS allows screen readers to work across multiple input types

**Success criteria:**
- Correctly describes the OS as sitting between hardware and applications
- Uses a specific example to illustrate how abstraction works (e.g. mouse and touchscreen treated the same by an application)

#### 2. Network addressing and routing ⚑ ★

Students can explain how domain names and IP addresses allow data to be transmitted to specific devices on a network.

**⚑ Hinge:** Confusion between IP addresses and domain names, or misunderstanding of how packets are routed, propagates into N4 and N5 — students cannot reason about where cryptographic protection applies or trace a complete data flow without correctly understanding how addressing and routing work.

**Response modes:**
- ↔ Widen contexts: Students frequently conflate IP addresses with domain names, or assume routing is a single hop. Multiple tracing activities — DNS lookup, packet path, address types — resolve these conflations more effectively than repeating the same explanation.

**Minimum width:** Explain the role of IP addresses in identifying devices on a network and describe how DNS translates domain names to IP addresses.

**Typical width:** Explain how IP addresses, DNS and routing tables work together to direct data packets to the correct destination across a network; describe the difference between public and private IP addresses.

**Wider:**
- Trace a DNS lookup and packet routing path for a request to a website, identifying each step from browser to server
- Investigate how the transition from IPv4 to IPv6 addresses the limitation of available addresses and what this means for networked device growth

**Success criteria:**
- Correctly distinguishes IP addresses from domain names
- Explains the role of DNS in translating between the two
- Describes how routing tables direct packets toward their destination

#### 3. Access control mechanisms ⚑

Students can describe elements of access control — including authentication and permissions — and explain why they are necessary in networked systems.

**⚑ Hinge:** Conflation of authentication and authorisation cascades into N5 — students who cannot distinguish 'proving identity' from 'granting access rights' cannot analyse how a networked system's security components coordinate.

**Response modes:**
- ◎ Scaffold reasoning: Students often conflate authentication and authorisation. A reasoning scaffold — who are you? (authentication) → what are you allowed to do? (authorisation) → what should the system block? (enforcement) — helps students distinguish these systematically rather than mixing up the terms.

**Minimum width:** Describe at least one access control mechanism (e.g. passwords/authentication OR file permissions) and explain what it protects against.

**Typical width:** Explain the difference between authentication (proving identity) and permissions/authorisation (what an authenticated user may do); describe how each operates in a networked system with multiple users.

**Wider:**
- Investigate how role-based access control (RBAC) is implemented in enterprise systems and why it is more scalable than individual permission assignment
- Examine how misconfigured permissions have caused real data breaches — what access control failure occurred and what should have been in place

**Success criteria:**
- Distinguishes authentication from authorisation/permissions correctly
- Explains what a specific access control mechanism protects against in a networked context

#### 4. Cryptographic security mechanisms ⚑ ★

Students can explain how public key cryptography and hashing are used to secure the transmission and storage of data in networked systems.

**⚑ Hinge:** Conflating encryption with hashing, or treating all cryptography as identical, breaks the N5 integration — students cannot correctly identify which mechanism protects data in transit versus at rest.

**Response modes:**
- ↔ Widen contexts: Cryptography is conceptually dense — students often conflate encryption with hashing, or assume all encryption is the same. Multiple concrete examples (HTTPS padlock, password storage, certificate chain) each illuminate a different aspect and build the distinction through contrast.

**Minimum width:** Explain, in plain language, how one cryptographic mechanism (e.g. TLS for transmission OR hashing for storage) protects data.

**Typical width:** Explain how public key cryptography (e.g. TLS) secures data in transit and how hashing (e.g. SHA-1) protects stored data; describe the different threat each addresses.

**Wider:**
- Investigate how certificate authorities establish trust in public key cryptography — what happens when a certificate is invalid or expired?
- Explore how modern systems combine symmetric and asymmetric encryption to gain the security benefits of asymmetric without the performance cost
- Research how First Nations community health data is protected using encryption standards in remote health systems — why data sovereignty requirements shape cryptographic choices

**Success criteria:**
- Correctly explains what public key cryptography protects (data in transit) and how it does so
- Correctly explains what hashing protects (stored data / integrity verification) and how it differs from encryption

#### 5. Integration — how hardware and software work together in secured networks ★

Students can investigate a networked digital system and explain how its hardware and software components — addressing, access control, and cryptography — work together to manage and secure data.

**Response modes:**
- ⊕ Integration point: Nodes 1–4 address hardware abstraction, addressing, access control, and cryptography as separate components. The integration node is where students must coordinate all four — understanding that securing a networked system requires all mechanisms to work together. Phase failure here is describing each mechanism correctly but unable to explain how they interact.

**Minimum width:** Describe how at least two components (e.g. OS + authentication, OR routing + TLS) work together to secure data in a networked system.

**Typical width:** Trace data through a networked system — from a user request, through DNS/routing, authenticated access, to encrypted transmission — and identify where each security mechanism operates.

**Wider:**
- Configure a simple simulated network and observe packets moving between devices — identify what is encrypted, what is routed, and what access controls are applied at each stage
- Analyse a real or simulated network breach to identify which layers of the system failed and what should have prevented it

**Success criteria:**
- Identifies the role of at least two distinct components in securing data in a networked system
- Explains how the components interact — not just what each does individually

**Related standards:**
- AC9TDI10P13
- AC9TDI10P14
