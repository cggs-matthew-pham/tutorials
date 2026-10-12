# AC9TDI8P13 — Multi-factor auth and phishing

**Year 7-8**
**Strand:** Processes and Production Skills

## ACARA Descriptor

Explain how multi-factor authentication protects an account when the password is compromised and identify phishing and other cyber security threats

## Prior Knowledge

Students can use unique passphrases across accounts and explain the risks of password re-use (AC9TDI6P09). They understand password-based security but have not yet explored what happens when passwords are compromised, how MFA adds a second layer of protection, or how phishing attacks exploit human behaviour.

## Progression Endpoint

Students explain how multi-factor authentication protects an account even when the password is compromised, and identify phishing and other cyber security threats by recognising the techniques attackers use to exploit users.

## Waypoint Sequence (3 waypoints, 1 hinge)

#### 1. When passwords fail ⚑

Students can explain how a password can be compromised and why password-only security is insufficient

**⚑ Hinge:** Students who do not understand how passwords can be compromised cannot reason about why MFA is necessary at Node 2. The attack scenario (password obtained → attacker tries to log in → MFA blocks them) only makes sense if students understand the first step. Without it, MFA appears as arbitrary additional friction rather than a principled response.

**Response modes:**
- ↔ Widen contexts: Students who understand only one attack vector (e.g. guessing) do not grasp why password-only security is fundamentally insufficient. Seeing multiple compromise vectors (breach, phishing, shoulder surfing, reuse amplification) establishes that no single password hygiene practice is enough — which is why MFA exists.

**Minimum width:** Name at least two ways a password can be compromised (e.g. data breach, guessing, shoulder surfing); explain why this means passwords alone are not enough

**Typical width:** Explain how password reuse amplifies the impact of a single breach; connect to prior knowledge about unique passphrases

**Wider:**
- Limited width — password compromise is a small set of scenarios. The genuine breadth comes from how MFA and phishing awareness respond to these scenarios at later nodes.

**Success criteria:**
- Names at least two ways a password can be compromised
- Explains why password-only security is insufficient

**Related standards:**
- AC9TDI8K02

#### 2. How MFA protects accounts

Students can explain how multi-factor authentication adds a second layer of protection by requiring something beyond the password

**Response modes:**
- ◎ Scaffold reasoning: The protection MFA offers is only clear when students reason through the attack scenario: attacker has password → tries to log in → MFA requires second factor → attacker does not have it → account is protected. Students who accept 'MFA is more secure' without tracing this chain cannot explain why it works or when it would fail.

**Minimum width:** Explain that MFA requires a second factor (e.g. SMS code, one-time password) in addition to the password; explain how this protects the account even when the password is compromised

**Typical width:** Explain how MFA works in practice using a specific example (e.g. bank transfer requiring SMS token); identify different types of second factors (SMS, authenticator app, biometric)

**Wider:**
- Evaluate how MFA implementation varies across platforms — why some platforms use SMS while others use authenticator apps, and which is more secure
- Limited width — MFA is a single concept with a small number of implementations. More platforms is useful comparison but the core understanding is the same.

**Success criteria:**
- Explains that MFA requires something beyond the password
- Explains how MFA protects an account when the password is compromised

**Related standards:**
- AC9TDI8K02

#### 3. Identifying phishing and cyber threats ★

Students can identify phishing and other cyber security threats by recognising the techniques used to exploit users

**Response modes:**
- ▣ Build a repertoire: Phishing identification requires accumulating a repertoire of attack patterns — students need to recognise multiple techniques (domain spoofing, urgency, suspicious links, grammatical markers) rather than one. A broader repertoire means more robust identification in unfamiliar phishing examples.

**Minimum width:** Identify at least one phishing technique (e.g. unofficial email domain, urgency language, suspicious links); explain how it tries to exploit the user

**Typical width:** Identify multiple phishing techniques including email domain spoofing, grammatical errors as filtering mechanisms, and social engineering tactics; explain how each exploits human behaviour rather than technical vulnerabilities

**Wider:**
- Investigate a real phishing case and analyse the specific techniques used — what made it convincing and what were the red flags?
- Research how social engineering exploits human behaviour beyond phishing — pretexting, baiting, tailgating — as cyber security threats that technology alone cannot prevent

**Success criteria:**
- Identifies at least one phishing technique
- Explains how the technique exploits the user (not just that it is dangerous)

**Related standards:**
- AC9TDI8K02
- AC9TDI8P14
