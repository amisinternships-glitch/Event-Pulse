const http = require("http");
const fs = require("fs");
const path = require("path");
const https = require("https");

const PORT = 8787;
const HOST = "127.0.0.1";
const ROOT = __dirname;
const TICKETMASTER_API_KEY = "7RdoA5svTZHy3mRpU1GgaGAR5dNtBB6F";
const TIME_ZONE = "America/Chicago";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function getCentralDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(date);
  const getValue = (type) => parts.find((part) => part.type === type).value;

  return {
    year: Number(getValue("year")),
    month: Number(getValue("month")),
    day: Number(getValue("day"))
  };
}

function getTimeZoneOffsetMillis(date, timeZone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset"
  });
  const offsetToken = formatter
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")
    .value.replace("GMT", "");

  if (!offsetToken) {
    return 0;
  }

  const normalized = offsetToken.includes(":") ? offsetToken : `${offsetToken}:00`;
  const sign = normalized.startsWith("-") ? -1 : 1;
  const [hours, minutes] = normalized.replace(/[+-]/, "").split(":").map(Number);
  return sign * ((hours * 60) + minutes) * 60 * 1000;
}

function getCentralDayRange() {
  const current = getCentralDateParts(new Date());
  const startCentralUtc = Date.UTC(current.year, current.month - 1, current.day, 0, 0, 0);
  const endCentralUtc = Date.UTC(current.year, current.month - 1, current.day + 1, 0, 0, 0);
  const startOffset = getTimeZoneOffsetMillis(new Date(startCentralUtc), TIME_ZONE);
  const endOffset = getTimeZoneOffsetMillis(new Date(endCentralUtc), TIME_ZONE);

  return {
    start: new Date(startCentralUtc - startOffset).toISOString().replace(".000Z", "Z"),
    end: new Date(endCentralUtc - endOffset).toISOString().replace(".000Z", "Z")
  };
}

function writeJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function fetchTicketmasterEvents() {
  const { start, end } = getCentralDayRange();
  const url = new URL("https://app.ticketmaster.com/discovery/v2/events.json");
  url.searchParams.set("apikey", TICKETMASTER_API_KEY);
  url.searchParams.set("countryCode", "US");
  url.searchParams.set("classificationName", "music");
  url.searchParams.set("size", "100");
  url.searchParams.set("sort", "date,asc");
  url.searchParams.set("startDateTime", start);
  url.searchParams.set("endDateTime", end);

  return new Promise((resolve, reject) => {
    https
      .get(url, (upstream) => {
        let data = "";

        upstream.on("data", (chunk) => {
          data += chunk;
        });

        upstream.on("end", () => {
          if (upstream.statusCode && upstream.statusCode >= 400) {
            reject(new Error(`Ticketmaster upstream failed with status ${upstream.statusCode}`));
            return;
          }

          resolve(data);
        });
      })
      .on("error", reject);
  });
}

function serveFile(filePath, response) {
  const resolvedPath = path.join(ROOT, filePath === "/" ? "index.html" : filePath);
  const safePath = path.normalize(resolvedPath);

  if (!safePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(safePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      });
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    response.writeHead(200, {
      "Content-Type": MIME_TYPES[path.extname(safePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(content);
  });
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (requestUrl.pathname === "/api/events/today") {
    try {
      const payload = await fetchTicketmasterEvents();
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      });
      response.end(payload);
    } catch (error) {
      writeJson(response, 502, {
        error: error.message
      });
    }
    return;
  }

  const pathname = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  serveFile(pathname, response);
});

server.listen(PORT, HOST, () => {
  console.log(`Sonara server running at http://${HOST}:${PORT}`);
});
