---
title: "APIs: cheat sheet"
subtitle: "Web apps with Flask"
---

# APIs

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**send JSON**: Return a dictionary and Flask sends it as JSON, for other programs to read.

```python
@app.route("/api/members")
def api_members():
    return {"members": members}
```

:::

:::keep-together

**a FastAPI route**: The type after each parameter (int, str, float) is checked: a wrong value gets an error reply (422) before your code runs.

```python
@api.get("/year")
def year(y: int):
    return {"next": y + 1}
```

:::
