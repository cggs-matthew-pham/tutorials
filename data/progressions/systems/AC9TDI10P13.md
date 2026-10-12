# AC9TDI10P13 — Cyber security threat models

**Year 9-10**
**Strand:** Processes and Production Skills

## ACARA Descriptor

develop cyber security threat models, and explore a software, user or software supply chain vulnerability

## Prior Knowledge

Students can explain how multi-factor authentication protects accounts and manage basic security settings (AC9TDI8P13). They understand access control concepts from AC9TDI10K01. They have not yet modelled how data moves through a system, constructed a threat model, or explored how specific vulnerabilities can be exploited.

## Progression Endpoint

Students develop cyber security threat models to identify where data is at risk in a system, and explore a specific software, user or software supply chain vulnerability.

## Waypoint Sequence (3 waypoints, 1 hinge)

#### 1. Data flow diagrams for threat modelling ⚑

Students can use a data flow diagram to trace how private information moves through a system and identify where it is most at risk.

**⚑ Hinge:** Data flow diagrams are the analytical foundation for N2 and N3 — students who cannot map how data moves through a system cannot identify where it is at risk (N2) or trace the steps of exploiting a vulnerability (N3).

**Response modes:**
- ◎ Scaffold reasoning: Threat modelling requires systematic thinking — for every data flow, what is the threat? Students who approach security intuitively spot obvious threats (password interception) but miss subtler ones (session token exposure, plaintext in logs). The data flow diagram provides the structure that makes systematic threat identification possible.

**Minimum width:** Draw a data flow diagram for a simple system showing at least two data flows; identify one point where the data could be at risk.

**Typical width:** Map how data moves between user, application and server in a web-based system using a data flow diagram; identify points where data is transmitted, stored, or processed; for each point, identify what threat exists and why that point is a target.

**Wider:**
- Map data flows in a more complex system with multiple actors (user, server, third-party APIs) and identify threats at each boundary
- Compare the data flow diagram for the same system with and without a specific security control — explain how the control changes the threat profile

**Success criteria:**
- Data flow diagram correctly shows at least two data flows between system components
- At least one threat is identified at a specific point in the diagram with an explanation of why that point is at risk

#### 2. Understanding vulnerability types ★

Students can describe the nature of software, user and software supply chain vulnerabilities and explain how each can be exploited.

**Response modes:**
- ↔ Widen contexts: Vulnerability categories are best understood through distinct real-world cases — a social engineering example, a software bug example, and a supply chain example each illuminate a different attack surface. Students who only see one category often conflate the others.

**Minimum width:** Describe at least one type of vulnerability (software, user, or supply chain) and explain how it could be exploited.

**Typical width:** Describe each of the three vulnerability types — software vulnerabilities (flaws in code), user vulnerabilities (social engineering, weak credentials), and software supply chain vulnerabilities (compromised dependencies); explain a realistic exploitation path for each.

**Wider:**
- Research a real-world cyber attack and classify the vulnerabilities exploited — explain the exploitation chain
- Investigate how prompt injection attacks can change the intended behaviour of generative AI models — explain why this is a software supply chain concern in AI-integrated systems
- Examine how dependency vulnerabilities in software supply chains have caused high-profile breaches — explain what the vulnerability was and how it propagated

**Success criteria:**
- Correctly describes at least one vulnerability type
- Explains a realistic path by which the vulnerability could be exploited (not just that it exists)

#### 3. Exploring a specific vulnerability

Students can systematically explore a specific vulnerability in their own software by tracing the exploitation path and observing the impact.

**Minimum width:** Identify one vulnerability in a system (own or provided); trace the steps involved in exploiting it; describe what an attacker could access or do.

**Typical width:** Systematically explore a vulnerability in own software — map the exploitation path (e.g. changing a login cookie value to that of another user); observe the impact; explain what the vulnerability allows an attacker to do and why the system is susceptible.

**Wider:**
- Explore an authentication bypass vulnerability and explain what access control decision it subverts — what should the system have checked that it didn't?
- Investigate the full impact of a successfully exploited vulnerability — not just initial access but what data or capabilities become exposed as a consequence

**Success criteria:**
- Identifies a specific vulnerability and traces at least the first step of exploitation
- Describes the impact — what an attacker would gain or access as a result

**Related standards:**
- AC9TDI10K01
- AC9TDI10P14
