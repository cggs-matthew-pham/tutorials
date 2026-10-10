---
title: Maths
summary: Interactive maths lessons. Predict, try it on a board, study a worked example, change one thing at a time, practise, then make your own. Four pathways follow the curriculum's strands; start with whichever your class is working on.
pathways:
  - id: algebra
    title: Algebra
    summary: From patterns and expressions to solving equations, then graphs of linear relations.
    about: "Start with **Algebra Foundations**: patterns, expressions and equations, solved three ways (try and check, backtracking, the balance method) and always checked. **Linear relations** then graphs equations as straight lines (its first lessons are being built), and needs negative numbers from Number Foundations."
    courses:
      - { path: maths/algebra, stage: foundations }
      - { path: maths/linear-relations, id: linear-relations, stage: foundations, after: [maths/algebra, number-foundations] }
      - { title: Non-linear relations, stage: extensions, summary: "Quadratics, exponentials and their graphs.", after: [linear-relations] }
  - id: number
    title: Number
    summary: Integers, fractions, decimals and percentages, ratios and powers.
    about: "**Number Foundations** comes first for any course that uses negative numbers or the Cartesian plane, including Linear relations."
    courses:
      - { id: number-foundations, title: Number Foundations, stage: foundations, summary: "Integers, the four operations with fractions and decimals, percentages, ratios, and powers of 10." }
      - { title: Irrational numbers and index laws, stage: extensions, summary: "Surds, recurring decimals and the laws of exponents.", after: [number-foundations] }
  - id: space
    title: Geometry and measurement
    summary: Angles, shapes and transformations, then area, volume and Pythagoras.
    about: "**Angles and shapes** links to the coding pathway: the turtle already turns through exterior angles, and classifying shapes is an algorithm students can write."
    courses:
      - { id: angles-shapes, title: Angles and shapes, stage: foundations, summary: "Angles and parallel lines, polygons, transformations on the Cartesian plane, and algorithms for classifying shapes." }
      - { id: area-volume, title: Area, volume and Pythagoras, stage: foundations, summary: "Area of composite shapes, volume of prisms, circles, and Pythagoras' theorem.", after: [angles-shapes] }
      - { title: Trigonometry, stage: extensions, summary: "Similar triangles and the trigonometric ratios.", after: [area-volume] }
  - id: data
    title: Statistics and probability
    summary: Collecting and displaying data, measures of centre, and chance.
    courses:
      - { id: data-chance, title: Data and chance, stage: foundations, summary: "Data displays, mean, median and mode, sample spaces and simulations." }
      - { title: Statistical investigations, stage: extensions, summary: "Sampling, variation and investigations with real data.", after: [data-chance] }
---
