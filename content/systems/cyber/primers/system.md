---
title: Secure the system in 5 minutes
---
## The idea in plain words

A **threat model** starts with a **data-flow diagram**: where data moves (from a browser to an app), where it is stored (a database) and who can change it (an admin). At each point, ask what could go wrong (read on the way, copied from storage, used by the wrong person) and pick the defence that fits (HTTPS, hashing and encryption, access control and MFA).

Weaknesses come in three kinds: **software** (flaws in code, fixed by updating and testing), **user** (people tricked or weak passwords, reduced by training, strong passwords and MFA) and **supply chain** (something the app relies on, such as an add-on or library, goes bad; reduced by checking and updating what you depend on). These lessons describe weaknesses and how to fix them; they do not practise attacks.

The **Australian Privacy Principles** (in the Privacy Act 1988) say how organisations covered by the Act must handle personal information: collect only what is needed (APP 3), tell people what and why (APP 5), use it only for that purpose unless they agree (APP 6), keep it secure (APP 11) and let people see and correct it (APP 12). Even when a small club isn't legally covered, they are good practice.

## The words

**threat model**, **data-flow diagram**, **vulnerability**, **software**, **user** and **supply chain** weaknesses, **patch**, **Australian Privacy Principles**, **personal information**.
