# A stand-in for uvicorn in the browser playground: uvicorn.run(app) shows a FastAPI app in the App tab.
import wp_runtime


def run(app, *args, **kwargs):
    wp_runtime.register("asgi", app)
    print(" * Your API is running in the App tab. (On a computer, uvicorn would serve it at http://127.0.0.1:8000)")
