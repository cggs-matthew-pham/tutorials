# A small stand-in for the requests library in the browser playground: requests.get(url, params=...) with .json(),
# .text, .status_code, .ok and .raise_for_status(). The same student code runs with the real requests on a computer.
import json as _json
import types
from urllib.parse import urlencode
import js


class RequestException(Exception):
    pass


class ConnectionError(RequestException):
    pass


class Timeout(RequestException):
    pass


class HTTPError(RequestException):
    pass


exceptions = types.SimpleNamespace(RequestException=RequestException, ConnectionError=ConnectionError, Timeout=Timeout, HTTPError=HTTPError)


class Response:
    def __init__(self, url, status_code, text):
        self.url, self.status_code, self.text = url, status_code, text

    @property
    def ok(self):
        return 200 <= self.status_code < 400

    def json(self):
        return _json.loads(self.text)

    def raise_for_status(self):
        if not self.ok:
            raise HTTPError(str(self.status_code) + " Error for url: " + self.url)

    def __repr__(self):
        return "<Response [" + str(self.status_code) + "]>"


def get(url, params=None, timeout=None, headers=None):
    if params:
        url = url + ("&" if "?" in url else "?") + urlencode(params)
    r = js.wpFetch(url)
    if r.error:
        raise ConnectionError("Could not reach " + url.split("?")[0] + " (no connection, or the site does not allow it)")
    return Response(url, int(r.status), str(r.text))
