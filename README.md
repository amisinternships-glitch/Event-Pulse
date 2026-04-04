# Event Pulse

Event Pulse now uses a lightweight Python backend to serve the app and daily event data.

## Run locally

From `/Users/ami/Desktop/Event Pulse`:

```bash
python3 server.py
```

Then open:

```text
http://127.0.0.1:8000
```

## API

- `GET /api/health`
- `GET /api/events/today`

Daily event data is stored in:

```text
data/events.json
```

The front-end now loads its event list from that API instead of relying on hardcoded browser-only data.
