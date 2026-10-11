---
order: 8
node: [AC9S9U01 n6, AC9S9U01 n7]
unit: control
optional: true
title: "Quick check: feedback loops and what goes wrong"
summary: "A few quick questions on tracing a negative feedback loop in two examples, and finding which part has failed in a disorder. Taught in class; use this to check yourself."
language: science
hook: "Your body keeps glucose and temperature steady all day. What happens when one part of the loop stops working?"
---
Your teacher covers other feedback examples and disorders in class. These questions check the basics: the parts of a loop, two examples, and what a failure does.

## Tracing a loop

```step
stage: investigate
insight: "Node 6: the parts of a loop in two named examples, with the set point of each."
tasks:
  - check: {"type":"sort","q":"Which part of the temperature loop is it?","options":["Receptor","Control centre","Effector"],"items":[["Temperature sensors in the skin and blood","Receptor"],["The hypothalamus in the brain","Control centre"],["Sweat glands","Effector","Effectors carry out the response."],["Muscles that shiver","Effector"],["Nerve endings that detect cold","Receptor"]]}
  - check: {"type":"question","q":"Blood glucose rises after a meal. What reverses the change?","options":["Insulin is released, cells take up glucose, and blood glucose falls back towards its set point","More glucose is released from the liver","Insulin makes blood glucose rise further","Nothing: it stays high until the next meal"],"answer":0,"feedback":[null,"The liver adds glucose when levels are low, not high.","That would be positive feedback, which pushes further from the set point.","The body responds quickly to bring it back."],"explain":"Negative feedback: the change is detected, and the response reverses it. As glucose returns to the set point, less insulin is released."}
  - check: {"type":"question","q":"Which pair names a feedback example and its set point?","options":["Body temperature, about 37 °C","Sweating, about 37 °C","Shivering, about 5 mmol/L","Insulin, about 37 °C"],"answer":0,"explain":"A set point is the value being held: body temperature near 37 °C, or blood glucose near 5 mmol/L. Sweating, shivering and insulin are responses."}
  - check: {"type":"match","q":"On a hot day, match each part of the temperature loop.","pairs":[["Body temperature held near 37 °C","Set point"],["Exercise raises body temperature to 38 °C","A change away from the set point"],["Sweating and more blood flow to the skin","Corrective response"],["The hypothalamus detects 37 °C again, so sweating slows","The return is detected"]]}
  - check: {"type":"reflect","text":"I can trace a feedback loop for temperature or blood glucose: the set point, the change, the corrective response and the return detected, and I can name receptor, control centre and effector."}
```

### Parts of the loop

### Blood glucose

### Set points

### The whole loop

### I can

## When the loop fails

```step
stage: investigate
insight: "Node 7: find the failed component in a named disorder and say the consequence."
tasks:
  - check: {"type":"question","q":"In type 1 diabetes the pancreas stops making insulin. What happens to blood glucose after a meal?","options":["It stays too high, because cells are not told to take up glucose","It falls too low","It stays at the set point","It stops being measured"],"answer":0,"feedback":[null,"Low glucose is the problem with too much insulin.","Without insulin the loop cannot return it to the set point.","It can still be measured; the response is what is missing."],"explain":"The signal that triggers the response is missing, so the loop cannot bring glucose back down. Homeostasis is disrupted."}
  - check: {"type":"question","q":"A person's sweat glands do not work. Which part of the temperature loop has failed, and what is the consequence?","options":["The effector: they cannot cool by sweating and can overheat in hot weather","The receptor: they cannot feel heat","The set point: it is lower than normal","Nothing: sweating is not needed"],"answer":0,"feedback":[null,"They can still sense heat; the response is what fails.","The set point is a target, not a part that fails like this.","Sweating is one of the main ways the body cools."],"explain":"Receptors and the control centre still work, but one effector cannot carry out the response, so the body cannot cool as well."}
  - check: {"type":"sort","q":"Which part of the loop has failed?","options":["Receptor","Control centre","Effector"],"items":[["Cold sensors in the skin send no signals","Receptor"],["The brain does not process the signal","Control centre"],["Muscles do not shiver when told to","Effector"]]}
  - check: {"type":"reflect","text":"I can name which part of a feedback loop has failed in a disorder and explain what happens to the body as a result."}
```

### Type 1 diabetes

### Sweat glands

### Where is the fault?

### I can
