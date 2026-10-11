---
title: Maths
map: true
trail: true
summary: Interactive maths lessons. Predict, try it on a board, study a worked example, change one thing at a time, practise, then make your own. Four pathways follow the curriculum's strands; start with whichever your class is working on. Teachers will find a ten-minute tour on the page For maths teachers, linked from the home page.
pathways:
  - id: algebra
    title: Algebra
    summary: From patterns and expressions to solving equations, then graphs of linear relations.
    fit: "Start here to use letters for numbers, solve equations, then turn rules into straight-line graphs."
    about: "Start with **Algebra Foundations**: patterns, expressions and equations, solved three ways (try and check, backtracking, the balance method) and always checked, then (Year 8) brackets, formulas, harder equations and inequalities. **Linear relations** then turns patterns and rules into tables and straight-line graphs, reads graphs of real data, and solves and models with lines. It uses negative numbers from Number Foundations."
    courses:
      - { path: maths/algebra, stage: foundations, tagline: "Expressions and equations, solved three ways and checked." }
      - { path: maths/linear-relations, id: linear-relations, stage: foundations, after: [maths/algebra, number-foundations], tagline: "Rules, tables and straight-line graphs." }
      - { title: Non-linear relations, stage: extensions, summary: "Quadratics, exponentials and their graphs.", after: [linear-relations], tagline: "Curves: quadratics and exponentials." }
  - id: number
    title: Number
    summary: Integers, fractions, decimals and percentages, ratios and powers.
    fit: "Start here for negative numbers, powers, fractions and percentages: the tools every other trail uses."
    about: "**Number Foundations** comes first for any course that uses negative numbers or the Cartesian plane, including Linear relations."
    courses:
      - { path: maths/number, id: number-foundations, stage: foundations, tagline: "Integers, powers, fractions, decimals and percentages." }
      - { title: Irrational numbers and index laws, stage: extensions, summary: "Surds, recurring decimals and the laws of exponents.", after: [number-foundations], tagline: "Surds and the laws of powers." }
  - id: space
    title: Geometry and measurement
    summary: Angles and shapes, then area, volume and circles; Pythagoras is next.
    fit: "Start here to measure angles, shapes, areas and volumes, and see why the formulas work."
    about: "**Angles and shapes** links to the coding pathway: the turtle already turns through exterior angles, and classifying shapes is an algorithm students can write."
    courses:
      - { path: maths/angles, id: angles-shapes, stage: foundations, tagline: "Angle facts, angle sums and naming shapes." }
      - { path: maths/measurement, id: area-volume, stage: foundations, after: [angles-shapes, number-foundations, maths/algebra], tagline: "Area, volume, circles and Pythagoras." }
      - { title: Trigonometry, stage: extensions, summary: "Similar triangles and the trigonometric ratios.", after: [area-volume], tagline: "Similar triangles and sin, cos and tan." }
  - id: data
    title: Statistics and probability
    summary: Collecting and displaying data, measures of centre, and chance.
    fit: "Start here to collect and display data, and work out how likely things are."
    courses:
      - { path: maths/data, id: data-chance, stage: foundations, after: [number-foundations], tagline: "Data displays, averages and chance." }
      - { title: Statistical investigations, stage: extensions, summary: "Sampling, variation and investigations with real data.", after: [data-chance], tagline: "Samples and investigations with real data." }
---
