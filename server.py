from __future__ import annotations

import json
import mimetypes
from datetime import datetime
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "data" / "events.json"


class EventPulseHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        route = parsed.path

        if route == "/api/health":
            self._send_json({"ok": True, "serverTime": datetime.utcnow().isoformat() + "Z"})
            return

        if route == "/api/events/today":
            self._serve_events()
            return

        self._serve_static(route)

    def _serve_events(self) -> None:
        if not DATA_FILE.exists():
            self._send_json(
                {
                    "verifiedDate": None,
                    "events": [],
                    "error": "Event data file is missing.",
                },
                status=HTTPStatus.NOT_FOUND,
            )
            return

        payload = json.loads(DATA_FILE.read_text(encoding="utf-8"))
        self._send_json(payload)

    def _serve_static(self, route: str) -> None:
        path = "index.html" if route in {"", "/"} else route.lstrip("/")
        file_path = (ROOT / path).resolve()

        if ROOT not in file_path.parents and file_path != ROOT:
            self.send_error(HTTPStatus.FORBIDDEN, "Forbidden")
            return

        if not file_path.exists() or not file_path.is_file():
            self.send_error(HTTPStatus.NOT_FOUND, "Not found")
            return

        mime_type, _ = mimetypes.guess_type(str(file_path))
        content = file_path.read_bytes()

        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", mime_type or "application/octet-stream")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def _send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK) -> None:
        content = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    def log_message(self, format: str, *args) -> None:  # noqa: A003
        return


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", 8000), EventPulseHandler)
    print("Event Pulse backend running on http://127.0.0.1:8000")
    server.serve_forever()


if __name__ == "__main__":
    main()
