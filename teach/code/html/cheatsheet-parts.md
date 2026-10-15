---
title: "Parts of a page: cheat sheet"
subtitle: "Structure and style a page"
---

# Parts of a page

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;button&gt;**: A button.

```html
<button>Click me</button>
```

:::

:::keep-together

**&lt;table&gt;**: A table: &lt;tr&gt; is a row, &lt;th&gt; a heading cell, &lt;td&gt; a normal cell.

```html
<table>
  <tr>
    <th>Name</th>
    <th>Score</th>
  </tr>
  <tr>
    <td>Sam</td>
    <td>10</td>
  </tr>
</table>
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

**page parts**: The parts of a page, named: header, nav, main with its sections, and footer. They look like plain blocks; the names are for screen readers and search engines.

```html
<header>
  <h1>Site name</h1>
  <nav>
    <ul>
      <li><a href="https://example.com">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>Section title</h2>
    <p>Some text.</p>
  </section>
</main>
<footer>
  <p>Contact us</p>
</footer>
```

:::

:::keep-together

**jump link**: A link to a place on the same page. id names the place; href starts with # and the same name.

```html
<a href="#results">Link text</a>

<h2 id="results">Section title</h2>
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

**background-color**: The background colour.

```html
background-color: lightyellow;
```

:::
