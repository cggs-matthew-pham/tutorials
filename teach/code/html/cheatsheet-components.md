---
title: "Components and layout: cheat sheet"
subtitle: "HTML & CSS"
---

# Components and layout

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;button&gt;**: A button.

```html
<button>Click me</button>
```

:::

:::keep-together

**&lt;header&gt;**: The top part of a page: usually the title and the menu. Looks like a div; the name tells browsers and screen readers what it is.

```html
<header>
  <h1>Site name</h1>
</header>
```

:::

:::keep-together

**&lt;nav&gt;**: The main menu of links.

```html
<nav>
  <a href="#">Home</a>
</nav>
```

:::

:::keep-together

**&lt;main&gt;**: The main content of the page. One per page.

```html
<main>
  The page's main content
</main>
```

:::

:::keep-together

**&lt;section&gt;**: One part of the page, usually with its own heading.

```html
<section>
  <h2>Part</h2>
</section>
```

:::

:::keep-together

**&lt;footer&gt;**: The bottom part of a page: contact details, small print.

```html
<footer>
  Contact and small print
</footer>
```

:::

:::keep-together

**&lt;form&gt;**: Holds the fields and the button that sends them. On its own, a form sends nowhere: code behind it does the work.

```html
<form>
  fields
  <button>Send</button>
</form>
```

:::

:::keep-together

**label and input**: An input is a box to type in. Its label says what to type; for and id must match, so clicking the label puts the cursor in the box.

```html
<label for="name">Name</label>
<input id="name" type="text">
```

:::

:::keep-together

**&lt;select&gt; drop-down**: A drop-down list: one option to choose.

```html
<select id="house">
  <option>Owls</option>
  <option>Hawks</option>
</select>
```

:::

:::keep-together

**display: flex**: Put it on the box that holds the items (the parent): its children line up in a row.

```html
display: flex;
```

:::

:::keep-together

**gap**: Space between the items in a flex row (on the parent, with display: flex).

```html
gap: 16px;
```

:::

:::keep-together

**flex-wrap**: Let items move to the next line when the row is full.

```html
flex-wrap: wrap;
```

:::

:::keep-together

**justify-content**: Where the items sit along the row: flex-start, center, flex-end or space-between.

```html
justify-content: center;
```

:::

:::keep-together

**list-style**: Remove the bullets or numbers from a list: menus are lists without bullets.

```html
list-style: none;
```

:::
