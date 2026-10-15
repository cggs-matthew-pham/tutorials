# The Python playground's helpers, loaded once into Pyodide (playground-py/worker.js). Students never see this file.
import builtins, json, os, sys
import js
from pyodide.ffi import run_sync, can_run_sync

HOME = "/home/pyodide"
_app = None  # (kind, app): "gradio" (an Interface), "flask" (a Flask app) or "asgi" (FastAPI through uvicorn.run)


def _input(prompt=""):
    sys.stdout.flush()
    sys.stderr.flush()
    if not js.wpJSPI or not can_run_sync():
        raise RuntimeError("This browser cannot pause a program to wait for input(). Update this browser, or try another one.")
    return str(run_sync(js.wpAsk(str(prompt))))


builtins.input = _input


def fresh_globals():
    """Each Run starts with nothing left over from the last one."""
    return {"__name__": "__main__", "__builtins__": builtins}


def reset():
    global _app
    _app = None
    os.chdir(HOME)
    # A module the student wrote as a file is imported afresh, so an edit to it shows on the next Run.
    for name, mod in list(sys.modules.items()):
        f = getattr(mod, "__file__", None) or ""
        if f.startswith(HOME + "/"):
            del sys.modules[name]


def register(kind, app, spec=None):
    """Called by app.run() (Flask), uvicorn.run(app) and Interface.launch(): the page shows the app."""
    global _app
    _app = (kind, app)
    js.wpApp(kind, json.dumps(spec) if spec is not None else None)


def hook_flask():
    import flask

    def run(self, *args, **kwargs):
        register("flask", self)
        print(" * Your app is running in the App tab. (On a computer, Flask would serve it at http://127.0.0.1:5000)")

    flask.Flask.run = run


def hook_fastapi():
    # Pyodide has no threads: run FastAPI's plain (def) routes inline instead of in a thread pool.
    import fastapi.routing, starlette.concurrency, fastapi.dependencies.utils as du

    async def inline(func, *args, **kwargs):
        return func(*args, **kwargs)

    starlette.concurrency.run_in_threadpool = fastapi.routing.run_in_threadpool = du.run_in_threadpool = inline


def call_gradio(values_json):
    kind, app = _app or (None, None)
    if kind != "gradio":
        raise RuntimeError("Run the program again: the app has stopped.")
    return json.dumps(app._call(json.loads(values_json)))


async def serve(method, path, form_json):
    """One page of the student's web app: [status, content type, body, final path]."""
    kind, app = _app or (None, None)
    form = json.loads(form_json) or None
    if kind == "flask":
        r = app.test_client().open(path, method=method, data=form, follow_redirects=True)
        final = r.request.full_path.rstrip("?") if r.request else path
        return json.dumps([r.status_code, r.headers.get("Content-Type", ""), r.get_data(as_text=True), final])
    if kind == "asgi":
        import httpx
        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://app", follow_redirects=True) as c:
            r = await c.request(method, path, data=form)
        final = r.url.raw_path.decode()
        return json.dumps([r.status_code, r.headers.get("content-type", ""), r.text, final])
    raise RuntimeError("Run the program again: the app has stopped.")
