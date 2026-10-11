# A small stand-in for Gradio in the browser playground. The same student code runs in real Gradio:
# gr.Interface(fn, inputs, outputs).launch() with Textbox, Number, Slider, Dropdown, Radio, Checkbox, Dataframe and BarPlot.
import wp_runtime


class Component:
    kind = "text"

    def __init__(self, label=None, value=None, **kw):
        self.label, self.value, self.kw = label, value, kw

    def spec(self):
        extra = {k: v for k, v in self.kw.items() if isinstance(v, (int, float, str, list, bool))}
        return {"kind": self.kind, "label": self.label or "", "value": _plain(self.value), **extra}


class Textbox(Component):
    kind = "text"


class Number(Component):
    kind = "number"


class Checkbox(Component):
    kind = "checkbox"


class Slider(Component):
    kind = "slider"

    def __init__(self, minimum=0, maximum=100, value=None, step=1, label=None, **kw):
        super().__init__(label, value if value is not None else minimum, minimum=minimum, maximum=maximum, step=step, **kw)


class Dropdown(Component):
    kind = "dropdown"

    def __init__(self, choices=None, value=None, label=None, **kw):
        super().__init__(label, value, choices=[str(c) for c in (choices or [])], **kw)


class Radio(Component):
    kind = "radio"

    def __init__(self, choices=None, value=None, label=None, **kw):
        super().__init__(label, value, choices=[str(c) for c in (choices or [])], **kw)


class Dataframe(Component):
    kind = "table"


class BarPlot(Component):
    kind = "bar"

    def __init__(self, value=None, x=None, y=None, label=None, **kw):
        super().__init__(label, value, x=x, y=y, **kw)


_SHORT = {"text": Textbox, "textbox": Textbox, "number": Number, "checkbox": Checkbox, "dataframe": Dataframe}


def _plain(v):
    """Values the page can show: a pandas DataFrame becomes columns and rows."""
    try:
        import pandas
        if isinstance(v, pandas.DataFrame):
            rows = v.astype(object).where(v.notna(), None).values.tolist()
            return {"columns": [str(c) for c in v.columns], "rows": rows}
    except ImportError:
        pass
    if isinstance(v, (str, int, float, bool)) or v is None:
        return v
    if isinstance(v, (list, tuple)):
        return [_plain(x) for x in v]
    return str(v)


class Interface:
    def __init__(self, fn, inputs, outputs, title=None, description=None, **kw):
        as_list = lambda c: c if isinstance(c, list) else [c]
        make = lambda c: _SHORT[c.lower()]() if isinstance(c, str) else c
        self.fn, self.title, self.description = fn, title, description
        self.inputs = [make(c) for c in as_list(inputs)]
        self.outputs = [make(c) for c in as_list(outputs)]

    def launch(self, **kw):
        wp_runtime.register("gradio", self, {
            "title": self.title, "description": self.description,
            "inputs": [c.spec() for c in self.inputs], "outputs": [c.spec() for c in self.outputs],
        })

    def _call(self, values):
        args = []
        for v, c in zip(values, self.inputs):
            if c.kind in ("number", "slider"):
                v = float(v) if v not in ("", None) else 0
                if v == int(v) and (c.kind == "slider" and float(c.kw.get("step", 1)) == int(float(c.kw.get("step", 1)))):
                    v = int(v)
            args.append(v)
        out = self.fn(*args)
        out = list(out) if isinstance(out, tuple) and len(self.outputs) > 1 else [out]
        return [_plain(v) for v in out]
