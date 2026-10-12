---
title: "Names and addresses"
subtitle: "Security and privacy · How systems are kept safe · Lesson 2"
---

# Names and addresses

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** You type a website's name, but computers find each other by numbers. Who turns the name into the number, and what happens if one letter is wrong?


:::teacher-note

**In one sentence:** Students look up names in a DNS board and follow each packet's address through a router table, to explain how domain names and IP addresses get data to the right computer and why a lookalike name is dangerous (AC9TDI10K01 node 2).

**Students should be able to say:** I can explain what DNS and IP addresses do. I can describe how a router uses an address. I can spot a lookalike name.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**An email links to **schoo1.edu.au** (a number 1 instead of the letter l). The real site is **school.edu.au**. Where will the link take you?**

☐ Nowhere: the name is invalid

☐ To the school, because it ends in .edu.au

☐ To the school, because DNS fixes small typos

☐ To whatever computer schoo1.edu.au points to: a different one

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** To a different computer. DNS looks up the exact name, and schoo1.edu.au is a separate name with its own address, owned by someone else.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: following a name


:::keep-together

### school.edu.au

1. $\text{school.edu.au} \to \text{DNS}$ — Your laptop asks a DNS server for the name's address.
2. $\text{answer: } 203.0.113.10$ — The IP address of the school's web server.
3. $\text{packet: to } 203.0.113.10$ — Every packet carries that address (and where it came from).
4. $\text{router table: } 203.0.113.x \to \text{row 1}$ — The router matches the start of the address to choose a way.
5. $\text{schoo1.edu.au} \to 198.51.100.66$ — A different name has a different address: a different computer.

Now say what DNS does.

**What does DNS do?**

☐ Turns a name like school.edu.au into an IP address

☐ Checks the website is safe

☐ Speeds up the internet

☐ Encrypts the web page

:::


:::teacher-note

**Answer:** Turns a name like school.edu.au into an IP address

DNS is the internet's address book: name in, IP address out.

:::


:::keep-together

### Find the mistake

**Sam decides an email link is safe. Click the line where it first goes wrong.**

```
 1  An email says: reset your school password at schoo1.edu.au.
 2  The name looks like the school's website.
 3  So DNS will send me to the school's computer.
 4  So it is safe to type my password there.
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3: DNS looks up the exact name. schoo1.edu.au has its own address, so the link goes to someone else's computer: a phishing site.

:::


:::keep-together

### Private and public

**Your laptop at home is 192.168.1.23, but websites see 198.51.100.7. Why?**

☐ The laptop has two network cards

☐ 192.168… is a private address used only inside your home; your router uses one public address for the internet

☐ Websites can't read addresses

☐ The laptop changes its address for each website

:::


:::teacher-note

**Answer:** 192.168… is a private address used only inside your home; your router uses one public address for the internet

Private addresses (like 192.168.x.x) are reused in millions of homes; the router shares one public address for all of them.

:::


:::typical

## Vary: one name at a time


**Part of the school.** 

**Another site.** 

**No such name.** 

**Reading the table.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Names and addresses


:::keep-together

### Real or not?

**Which link goes to the real school site **school.edu.au**?**

☐ https://school-edu-au.example

☐ https://school.edu.au/login

☐ https://school.edu.au.login-help.example

☐ https://schooI.edu.au (capital I)

:::


:::teacher-note

**Answer:** https://school.edu.au/login

Only the first ends in exactly school.edu.au. The others are other people's names dressed up.

:::


:::keep-together

### IP addresses

**What does an IP address identify?**

☐ A website's owner

☐ A device (or a network's router) on the internet

☐ A password

☐ A person

:::


:::teacher-note

**Answer:** A device (or a network's router) on the internet

It is the address packets are delivered to.

:::


:::keep-together

### Review: HTTPS

**Review: where does HTTPS encrypt your data?**

☐ At the website only

☐ On your device, before it is sent

☐ At the router

☐ At the DNS server

:::


:::teacher-note

**Answer:** On your device, before it is sent

Encrypted on your device, decrypted by the website.

:::


## Make: check before you click

Then: write one rule for checking a link before you click it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**What does DNS do? Why is schoo1.edu.au not the school?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Turns a name into an IP address. It is a different name, so DNS gives a different address: someone else's computer.

:::

