const fs = require("node:fs/promises");
const path = require("node:path");

const FALLBACK_FILE = path.join(process.cwd(), "data", "events.json");
const TICKETMASTER_ENDPOINT = "https://app.ticketmaster.com/discovery/v2/events.json";

const STATE_TIMEZONES = {
  AL: "CT",
  AK: "AK",
  AZ: "MT",
  AR: "CT",
  CA: "PT",
  CO: "MT",
  CT: "ET",
  DE: "ET",
  FL: "ET",
  GA: "ET",
  HI: "HT",
  ID: "MT",
  IL: "CT",
  IN: "ET",
  IA: "CT",
  KS: "CT",
  KY: "ET",
  LA: "CT",
  ME: "ET",
  MD: "ET",
  MA: "ET",
  MI: "ET",
  MN: "CT",
  MS: "CT",
  MO: "CT",
  MT: "MT",
  NE: "CT",
  NV: "PT",
  NH: "ET",
  NJ: "ET",
  NM: "MT",
  NY: "ET",
  NC: "ET",
  ND: "CT",
  OH: "ET",
  OK: "CT",
  OR: "PT",
  PA: "ET",
  RI: "ET",
  SC: "ET",
  SD: "CT",
  TN: "CT",
  TX: "CT",
  UT: "MT",
  VT: "ET",
  VA: "ET",
  WA: "PT",
  WV: "ET",
  WI: "CT",
  WY: "MT",
  DC: "ET",
};

function formatDateInTimezone(date, timeZone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function formatLongDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateString}T12:00:00Z`));
}

function toUtcRangeForChicagoDay(dateString) {
  return {
    startDateTime: `${dateString}T00:00:00Z`,
    endDateTime: `${dateString}T23:59:59Z`,
  };
}

function toDisplayTime(localTime, zone) {
  if (!localTime) {
    return `Time TBD ${zone}`;
  }

  const [hoursRaw, minutes] = localTime.split(":");
  const hours24 = Number(hoursRaw);
  const meridiem = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes} ${meridiem} ${zone}`;
}

function buildVenueRuleMap(fallbackEvents) {
  return new Map(
    fallbackEvents.map((event) => [
      `${event.venue}::${event.city}`,
      {
        security: event.security,
        venueInfo: event.venueInfo,
      },
    ])
  );
}

function makeGenericVenueInfo(eventUrl, longDate) {
  return [
    {
      label: "Verification",
      title: "Live event listing",
      copy: `This event was fetched from the live ticketing feed for ${longDate}.`,
      url: eventUrl,
    },
    {
      label: "Venue rules",
      title: "Check official venue page",
      copy: "Review the venue's official event page before arrival for bag policy, bottle rules, and restricted items.",
      url: eventUrl,
    },
  ];
}

function normalizeTicketmasterEvent(event, venueRuleMap, dateString) {
  const venue = event?._embedded?.venues?.[0];
  if (!venue?.location?.latitude || !venue?.location?.longitude) {
    return null;
  }

  const stateCode = venue.state?.stateCode || venue.country?.countryCode || "";
  const city = `${venue.city?.name || "Unknown City"}, ${stateCode}`.trim();
  const venueName = venue.name || "Venue";
  const zone = STATE_TIMEZONES[stateCode] || "CT";
  const localTime = event.dates?.start?.localTime || null;
  const eventUrl = event.url || venue.url || "https://www.ticketmaster.com";
  const key = `${venueName}::${city}`;
  const venueRules = venueRuleMap.get(key);
  const longDate = formatLongDate(dateString);

  return {
    id: event.id,
    name: event.name,
    type: "Concert",
    city,
    venue: venueName,
    timeZone: zone,
    coordinates: {
      lat: Number(venue.location.latitude),
      lng: Number(venue.location.longitude),
    },
    startTime: toDisplayTime(localTime, zone),
    capacity: `Verified ${longDate}`,
    verifiedDate: dateString,
    security: venueRules?.security || {
      status: "Venue policy in effect",
      summary: "Check the official venue page before arrival for entry restrictions and approved items.",
    },
    venueInfo: venueRules?.venueInfo || makeGenericVenueInfo(eventUrl, longDate),
  };
}

async function readFallbackPayload() {
  const raw = await fs.readFile(FALLBACK_FILE, "utf8");
  return JSON.parse(raw);
}

function normalizeRequestedDate(dateString) {
  if (typeof dateString !== "string") {
    return null;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(dateString) ? dateString : null;
}

async function getEventsPayload(requestedDate) {
  const fallbackPayload = await readFallbackPayload();
  const dateString =
    normalizeRequestedDate(requestedDate) ||
    formatDateInTimezone(new Date(), "America/Chicago");
  const { startDateTime, endDateTime } = toUtcRangeForChicagoDay(dateString);
  const apiKey = process.env.TICKETMASTER_API_KEY;
  const fallbackMatchesRequestedDate = fallbackPayload.verifiedDate === dateString;

  if (!apiKey) {
    return {
      verifiedDate: dateString,
      events: fallbackMatchesRequestedDate ? fallbackPayload.events || [] : [],
      source: "fallback",
      note: "Set TICKETMASTER_API_KEY in your hosting environment to enable live daily event updates.",
    };
  }

  const searchParams = new URLSearchParams({
    apikey: apiKey,
    countryCode: "US",
    classificationName: "music",
    startDateTime,
    endDateTime,
    size: "50",
    sort: "date,asc",
  });

  const response = await fetch(`${TICKETMASTER_ENDPOINT}?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error(`Ticketmaster returned ${response.status}`);
  }

  const payload = await response.json();
  const venueRuleMap = buildVenueRuleMap(fallbackPayload.events || []);
  const events = (payload?._embedded?.events || [])
    .map((event) => normalizeTicketmasterEvent(event, venueRuleMap, dateString))
    .filter(Boolean)
    .slice(0, 20);

  if (!events.length) {
    return {
      verifiedDate: dateString,
      events: fallbackMatchesRequestedDate ? fallbackPayload.events || [] : [],
      source: fallbackMatchesRequestedDate ? "fallback" : "ticketmaster-live",
      note: fallbackMatchesRequestedDate
        ? "Live feed returned no eligible events; serving the curated fallback set."
        : "Live feed returned no eligible events for the selected date.",
    };
  }

  return {
    verifiedDate: dateString,
    events,
    source: "ticketmaster-live",
  };
}

module.exports = {
  getEventsPayload,
};
