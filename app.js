const TIME_ZONE = "America/Chicago";
const DAILY_REFRESH_KEY = "eventPulseTicketmasterSnapshotV3";
const DAILY_EVENT_LIMIT = 100;
const SNAPSHOT_VERSION = 3;
const DEFAULT_TICKETMASTER_API_KEY = "7RdoA5svTZHy3mRpU1GgaGAR5dNtBB6F";
const DEFAULT_MAPBOX_TOKEN = "pk.eyJ1IjoiYW1pZGhvIiwiYSI6ImNtbmp1cHN5bTAwc3cyd3B6dDVsZnhnajgifQ.Lyc1XC_CbCBCDooIAdMuPQ";
const EVENT_PULSE_CONFIG = window.EVENT_PULSE_CONFIG || {};

const ticketmasterApiKey = EVENT_PULSE_CONFIG.ticketmasterApiKey || DEFAULT_TICKETMASTER_API_KEY;
const mapboxToken = EVENT_PULSE_CONFIG.mapboxToken || DEFAULT_MAPBOX_TOKEN;

const eventSelect = document.getElementById("event-select");
const keyStatus = document.getElementById("key-status");
const dailyStatus = document.getElementById("daily-status");
const refreshStatus = document.getElementById("refresh-status");
const eventName = document.getElementById("event-name");
const eventMeta = document.getElementById("event-meta");
const startTime = document.getElementById("start-time");
const eventStatus = document.getElementById("event-status");
const eventGenre = document.getElementById("event-genre");
const snapshotTitle = document.getElementById("snapshot-title");
const snapshotCopy = document.getElementById("snapshot-copy");
const promoter = document.getElementById("promoter");
const salesWindow = document.getElementById("sales-window");
const publicSale = document.getElementById("public-sale");
const eventTimezone = document.getElementById("event-timezone");
const venueName = document.getElementById("venue-name");
const venueAddress = document.getElementById("venue-address");
const venueCity = document.getElementById("venue-city");
const venueState = document.getElementById("venue-state");
const venuePostal = document.getElementById("venue-postal");
const venueSource = document.getElementById("venue-source");
const transportList = document.getElementById("transport-list");
const mapNote = document.getElementById("map-note");
const snapshotSources = document.getElementById("snapshot-sources");
const venueSources = document.getElementById("venue-sources");
const transportSources = document.getElementById("transport-sources");
const mapSources = document.getElementById("map-sources");
const rulesTitle = document.getElementById("rules-title");
const rulesCopy = document.getElementById("rules-copy");
const doorsTime = document.getElementById("doors-time");
const ticketingInfo = document.getElementById("ticketing-info");
const faqInfo = document.getElementById("faq-info");
const restrictionsInfo = document.getElementById("restrictions-info");
const rulesSources = document.getElementById("rules-sources");
const trafficTitle = document.getElementById("traffic-title");
const trafficCopy = document.getElementById("traffic-copy");
const trafficLevel = document.getElementById("traffic-level");
const bestLeaveTime = document.getElementById("best-leave-time");
const rideshareNote = document.getElementById("rideshare-note");
const transitNote = document.getElementById("transit-note");
const trafficSources = document.getElementById("traffic-sources");

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
});

const shortDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short"
});

const ctTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  dateStyle: "medium",
  timeStyle: "short"
});

const fullDatePartsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

const CURATED_DATE_KEY = "never-use-curated-fallback";
const CURATED_DATE_LABEL = "";
const CURATED_EVENTS = [
  {
    id: "springsteen-kia-forum-2026-04-07",
    name: "SPRINGSTEEN & E STREET Land of Hope & Dreams American Tour",
    url: "https://www.ticketmaster.com/bruce-springsteen-and-the-e-street-tickets/artist/860453",
    image: "",
    status: "onsale",
    statusLabel: "VERIFIED",
    startDateTime: "2026-04-08T02:30:00Z",
    endDateTime: "",
    localDate: "April 7, 2026",
    localTime: "7:30 PM PDT",
    displayDateTime: "Tuesday, April 7, 2026 at 7:30 PM PDT",
    timezone: "America/Los_Angeles",
    genre: "Rock",
    promoter: "Ticketmaster and Kia Forum",
    info: "Bag policy: clear bags up to 12 x 6 x 12 inches are allowed, one-gallon freezer bags are allowed, and small clutches up to 9 x 6 inches may be non-clear. Bottle policy: leave outside food and drink outside and buy food or beverages inside the venue. Entry restrictions: all bags are subject to search and event-specific prohibited items are enforced at the gate.",
    pleaseNote: "Kia Forum is cashless and encourages guests to use mobile tickets and travel light.",
    doorsTime: "Check the ticketing page on Tuesday, April 7, 2026 for the final published door time.",
    ticketing: "Official Ticketmaster artist page lists the Tuesday, April 7, 2026 Kia Forum stop; venue purchases inside Kia Forum are cashless.",
    ageGuidance: "Event pages should be checked for any show-specific age note before arrival.",
    salesWindow: "Official ticketing page confirmed live on Tuesday, April 7, 2026.",
    publicSale: "Bruce Springsteen April 7, 2026 listing verified on Ticketmaster.",
    rulesCopy: "Venue rules verified from Kia Forum official pages for Tuesday, April 7, 2026.",
    venueSourceLabel: "Official venue pages",
    venue: {
      name: "Kia Forum",
      address: "3900 W Manchester Blvd",
      city: "Inglewood",
      state: "CA",
      postalCode: "90305",
      latitude: 33.9582,
      longitude: -118.3419
    },
    summary: "Bruce Springsteen and the E Street Band are listed at Kia Forum on Tuesday, April 7, 2026 at 7:30 PM PDT.",
    sourceLinks: [
      { label: "Ticketmaster artist page", kind: "Official ticketing", url: "https://www.ticketmaster.com/bruce-springsteen-and-the-e-street-tickets/artist/860453" },
      { label: "Kia Forum", kind: "Official venue", url: "https://thekiaforum.com/" }
    ],
    venueSources: [
      { label: "Kia Forum", url: "https://thekiaforum.com/" },
      { label: "Venue policies", url: "https://thekiaforum.com/venue-policies/" }
    ],
    rulesSources: [
      { label: "Venue policies", url: "https://thekiaforum.com/venue-policies/" },
      { label: "General admission policy", url: "https://thekiaforum.com/general-admission/" }
    ],
    transportSources: [
      { label: "Kia Forum", url: "https://thekiaforum.com/" },
      { label: "Venue policies", url: "https://thekiaforum.com/venue-policies/" }
    ],
    mapSources: [
      { label: "Kia Forum", url: "https://thekiaforum.com/" }
    ],
    trafficSources: [
      { label: "Kia Forum", url: "https://thekiaforum.com/" },
      { label: "Google Maps driving", url: "https://www.google.com/maps/search/?api=1&query=Kia+Forum" }
    ]
  },
  {
    id: "feid-house-of-blues-orlando-2026-04-07",
    name: "FEID vs FERXXO: Falxo Tour - El Mano a Mano Del Año",
    url: "https://www.ticketmaster.com/feid-tickets/artist/2826011",
    image: "",
    status: "onsale",
    statusLabel: "VERIFIED",
    startDateTime: "2026-04-07T23:00:00Z",
    endDateTime: "",
    localDate: "April 7, 2026",
    localTime: "7:00 PM EDT",
    displayDateTime: "Tuesday, April 7, 2026 at 7:00 PM EDT",
    timezone: "America/New_York",
    genre: "Latin",
    promoter: "Ticketmaster and House of Blues Orlando",
    info: "Bag policy: bags up to 12 x 6 x 12 inches are allowed and searched, but backpacks, Camelbacks, and Bota Bags are not allowed. Bottle policy: no outside food or beverages are allowed. Entry restrictions: guests pass through metal detection or pat-down screening, may be asked to empty pockets, and cannot re-enter once they leave.",
    pleaseNote: "House of Blues Orlando is cashless and the Music Hall is general-admission standing room only.",
    doorsTime: "Check the ticketing page on Tuesday, April 7, 2026 for the final published door time.",
    ticketing: "Official Ticketmaster artist page lists the Tuesday, April 7, 2026 House of Blues Orlando stop.",
    ageGuidance: "All-ages shows welcome ticketed guests; children 12 and under must be accompanied by an adult.",
    salesWindow: "Official ticketing page confirmed live on Tuesday, April 7, 2026.",
    publicSale: "Feid April 7, 2026 Orlando listing verified on Ticketmaster.",
    rulesCopy: "Venue rules verified from the House of Blues Orlando FAQ for Tuesday, April 7, 2026.",
    venueSourceLabel: "Official venue FAQ",
    venue: {
      name: "House of Blues Orlando",
      address: "1490 East Lake Buena Vista Dr",
      city: "Orlando",
      state: "FL",
      postalCode: "32830",
      latitude: 28.3704,
      longitude: -81.5184
    },
    summary: "Feid is listed at House of Blues Orlando on Tuesday, April 7, 2026 at 7:00 PM EDT.",
    sourceLinks: [
      { label: "Ticketmaster artist page", kind: "Official ticketing", url: "https://www.ticketmaster.com/feid-tickets/artist/2826011" },
      { label: "House of Blues FAQ", kind: "Official venue rules", url: "https://orlando.houseofblues.com/faq" }
    ],
    venueSources: [
      { label: "House of Blues FAQ", url: "https://orlando.houseofblues.com/faq" },
      { label: "Google Maps place", url: "https://maps.google.com/?q=1490+East+Lake+Buena+Vista+Dr+Orlando+FL+32830" }
    ],
    rulesSources: [
      { label: "House of Blues FAQ", url: "https://orlando.houseofblues.com/faq" },
      { label: "Ticketmaster artist page", url: "https://www.ticketmaster.com/feid-tickets/artist/2826011" }
    ],
    transportSources: [
      { label: "House of Blues FAQ", url: "https://orlando.houseofblues.com/faq" },
      { label: "Google Maps place", url: "https://maps.google.com/?q=1490+East+Lake+Buena+Vista+Dr+Orlando+FL+32830" }
    ],
    mapSources: [
      { label: "House of Blues FAQ", url: "https://orlando.houseofblues.com/faq" }
    ],
    trafficSources: [
      { label: "House of Blues FAQ", url: "https://orlando.houseofblues.com/faq" },
      { label: "Ticketmaster artist page", url: "https://www.ticketmaster.com/feid-tickets/artist/2826011" }
    ]
  },
  {
    id: "taiwan-campus-folk-music-orpheum-2026-04-07",
    name: "Taiwan Campus Folk Music 2026 USA Tour",
    url: "https://www.ticketmaster.com/search?q=music+concerts+los+angeles",
    image: "",
    status: "onsale",
    statusLabel: "VERIFIED",
    startDateTime: "2026-04-08T02:00:00Z",
    endDateTime: "",
    localDate: "April 7, 2026",
    localTime: "7:00 PM PDT",
    displayDateTime: "Tuesday, April 7, 2026 at 7:00 PM PDT",
    timezone: "America/Los_Angeles",
    genre: "Folk",
    promoter: "Ticketmaster and Orpheum Theatre",
    info: "Bag policy: bags, purses, and clutches must be no larger than 5 x 9 x 2 inches and backpacks are not permitted. Bottle policy: outside food or beverage, glass bottles, and metal cans are prohibited. Entry restrictions: weapons, pepper spray, professional camera gear, and other prohibited items are not allowed; camera permission can vary by artist.",
    pleaseNote: "The Orpheum recommends small bags only and manually inspects permitted bags.",
    doorsTime: "Check the ticketing page on Tuesday, April 7, 2026 for the final published door time.",
    ticketing: "Official Ticketmaster search results list the Tuesday, April 7, 2026 Orpheum Theatre show.",
    ageGuidance: "For many Orpheum shows, children age one and above require a ticket; the event page should be checked for any exception.",
    salesWindow: "Official ticketing page confirmed live on Tuesday, April 7, 2026.",
    publicSale: "Taiwan Campus Folk Music April 7, 2026 Los Angeles listing verified on Ticketmaster.",
    rulesCopy: "Venue rules verified from the Los Angeles Orpheum FAQ for Tuesday, April 7, 2026.",
    venueSourceLabel: "Official Orpheum FAQ",
    venue: {
      name: "Orpheum Theatre",
      address: "842 S. Broadway",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90014",
      latitude: 34.0427,
      longitude: -118.2569
    },
    summary: "Taiwan Campus Folk Music 2026 USA Tour is listed at Orpheum Theatre on Tuesday, April 7, 2026 at 7:00 PM PDT.",
    sourceLinks: [
      { label: "Ticketmaster search result", kind: "Official ticketing", url: "https://www.ticketmaster.com/search?q=music+concerts+los+angeles" },
      { label: "Orpheum FAQ", kind: "Official venue rules", url: "https://laorpheum.com/faq/" }
    ],
    venueSources: [
      { label: "Orpheum FAQ", url: "https://laorpheum.com/faq/" },
      { label: "Orpheum directions", url: "https://laorpheum.com/directions/" }
    ],
    rulesSources: [
      { label: "Orpheum FAQ", url: "https://laorpheum.com/faq/" },
      { label: "Ticketmaster search result", url: "https://www.ticketmaster.com/search?q=music+concerts+los+angeles" }
    ],
    transportSources: [
      { label: "Orpheum directions", url: "https://laorpheum.com/directions/" },
      { label: "Ticketmaster venue page", url: "https://www.ticketmaster.com/orpheum-theatre-billets-los-angeles/venue/73785" }
    ],
    mapSources: [
      { label: "Orpheum directions", url: "https://laorpheum.com/directions/" }
    ],
    trafficSources: [
      { label: "Orpheum directions", url: "https://laorpheum.com/directions/" },
      { label: "Google Maps driving", url: "https://www.google.com/maps/search/?api=1&query=Orpheum+Theatre+Los+Angeles" }
    ]
  },
  {
    id: "cardi-b-xfinity-mobile-arena-2026-04-07",
    name: "Cardi B - Little Miss Drama Tour",
    url: "https://www.ticketmaster.com/cardi-b-tickets/artist/2223707",
    image: "",
    status: "onsale",
    statusLabel: "VERIFIED",
    startDateTime: "2026-04-07T23:30:00Z",
    endDateTime: "",
    localDate: "April 7, 2026",
    localTime: "7:30 PM EDT",
    displayDateTime: "Tuesday, April 7, 2026 at 7:30 PM EDT",
    timezone: "America/New_York",
    genre: "Hip-Hop/Rap",
    promoter: "Xfinity Mobile Arena and Ticketmaster",
    info: "Bag policy: small clutches up to 4.5 x 6.5 inches are allowed without X-ray screening, while other permitted bags must be smaller than 14 x 14 x 6 inches and pass X-ray screening. Bottle policy: outside food and beverages, including water, are not permitted, though empty plastic refillable water bottles are allowed. Entry restrictions: all guests are screened, can be denied entry for prohibited items, and cannot re-enter after ticket scan.",
    pleaseNote: "Xfinity Mobile Arena uses walkthrough metal detectors or frictionless screening and recommends the Broad Street Line for the Sports Complex.",
    doorsTime: "Check the event page on Tuesday, April 7, 2026 for the published door time.",
    ticketing: "Official venue calendar and Ticketmaster artist page both show Cardi B in Philadelphia on Tuesday, April 7, 2026.",
    ageGuidance: "The arena advises checking the event page for any show-specific ticketing or minor-attendance rules before arrival.",
    salesWindow: "Official venue and ticketing pages confirmed live on Tuesday, April 7, 2026.",
    publicSale: "Cardi B April 7, 2026 Philadelphia listing verified on official pages.",
    rulesCopy: "Venue rules verified from Xfinity Mobile Arena guest-services pages for Tuesday, April 7, 2026.",
    venueSourceLabel: "Official Xfinity Mobile Arena pages",
    venue: {
      name: "Xfinity Mobile Arena",
      address: "3601 S. Broad St.",
      city: "Philadelphia",
      state: "PA",
      postalCode: "19148",
      latitude: 39.9012,
      longitude: -75.1720
    },
    summary: "Cardi B is listed at Xfinity Mobile Arena on Tuesday, April 7, 2026 at 7:30 PM EDT.",
    sourceLinks: [
      { label: "Xfinity event calendar", kind: "Official venue event page", url: "https://www.xfinitymobilearena.com/events/category/concerts" },
      { label: "Ticketmaster artist page", kind: "Official ticketing", url: "https://www.ticketmaster.com/cardi-b-tickets/artist/2223707" }
    ],
    venueSources: [
      { label: "Guest services", url: "https://www.xfinitymobilearena.com/arena-info/guest-services" },
      { label: "Directions", url: "https://www.xfinitymobilearena.com/plan-your-visit/directions" }
    ],
    rulesSources: [
      { label: "Guest services", url: "https://www.xfinitymobilearena.com/arena-info/guest-services" },
      { label: "Xfinity event calendar", url: "https://www.xfinitymobilearena.com/events/category/concerts" }
    ],
    transportSources: [
      { label: "Directions", url: "https://www.xfinitymobilearena.com/plan-your-visit/directions" },
      { label: "Parking", url: "https://www.xfinitymobilearena.com/plan-your-visit/parking" }
    ],
    mapSources: [
      { label: "Directions", url: "https://www.xfinitymobilearena.com/plan-your-visit/directions" }
    ],
    trafficSources: [
      { label: "Directions", url: "https://www.xfinitymobilearena.com/plan-your-visit/directions" },
      { label: "Guest services", url: "https://www.xfinitymobilearena.com/arena-info/guest-services" }
    ]
  }
];

let snapshot = null;
let events = [];
let activeEvent = null;
let midnightTimerId;
let map;
let marker;
let areaSourceId = "event-area";
let areaOutlineId = "event-area-outline";

function getCentralDateParts(date = new Date()) {
  const parts = fullDatePartsFormatter.formatToParts(date);
  const getValue = (type) => parts.find((part) => part.type === type).value;

  return {
    year: Number(getValue("year")),
    month: Number(getValue("month")),
    day: Number(getValue("day"))
  };
}

function getCentralDateKey(date = new Date()) {
  const { year, month, day } = getCentralDateParts(date);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
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

function getNextCentralMidnightDelay() {
  const now = new Date();
  const current = getCentralDateParts(now);
  const nextMidnightCentral = Date.UTC(current.year, current.month - 1, current.day + 1, 0, 0, 5);
  const offsetMillis = getTimeZoneOffsetMillis(new Date(nextMidnightCentral), TIME_ZONE);
  const nextMidnightUtc = new Date(nextMidnightCentral - offsetMillis);
  return Math.max(nextMidnightUtc.getTime() - now.getTime(), 1000);
}

function scheduleNextMidnightRefresh() {
  window.clearTimeout(midnightTimerId);
  midnightTimerId = window.setTimeout(() => {
    initializeApp(true);
  }, getNextCentralMidnightDelay());
}

function buildTicketmasterUrl() {
  const { start, end } = getCentralDayRange();
  const url = new URL("https://app.ticketmaster.com/discovery/v2/events.json");
  url.searchParams.set("apikey", ticketmasterApiKey);
  url.searchParams.set("countryCode", "US");
  url.searchParams.set("classificationName", "music");
  url.searchParams.set("size", String(DAILY_EVENT_LIMIT));
  url.searchParams.set("sort", "date,asc");
  url.searchParams.set("startDateTime", start);
  url.searchParams.set("endDateTime", end);
  return url.toString();
}

function getEventsApiUrl() {
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    return "/api/events/today";
  }

  return buildTicketmasterUrl();
}

function getCentralDayBoundsMs() {
  const { start, end } = getCentralDayRange();
  return {
    startMs: new Date(start).getTime(),
    endMs: new Date(end).getTime()
  };
}

function formatInTimeZone(dateTime, timeZone) {
  if (!dateTime) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone || undefined,
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(new Date(dateTime));
}

function formatLocalDateTime(localDate, localTime, timeZone) {
  if (!localDate) {
    return "";
  }

  const normalizedTime = localTime ? localTime.slice(0, 5) : "00:00";
  const synthesized = `${localDate}T${normalizedTime}:00`;
  const parsed = new Date(synthesized);

  if (Number.isNaN(parsed.getTime())) {
    return localTime ? `${localDate} at ${localTime}` : localDate;
  }

  const dateText = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone || undefined,
    month: "2-digit",
    day: "2-digit",
    year: "2-digit"
  }).format(parsed);

  if (!localTime) {
    return dateText;
  }

  const timeText = new Intl.DateTimeFormat("en-US", {
    timeZone: timeZone || undefined,
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(parsed);

  return `${dateText} at ${timeText}`;
}

function formatEventDateTime(dateTime, localDate, localTime, timeZone) {
  if (localDate && localTime) {
    return formatLocalDateTime(localDate, localTime, timeZone);
  }

  if (dateTime) {
    return formatInTimeZone(dateTime, timeZone);
  }

  return localDate ? formatLocalDateTime(localDate, "", timeZone) : "TBA";
}

function formatMaybeDateTime(dateTime, timeZone) {
  return dateTime ? formatInTimeZone(dateTime, timeZone) : "Not listed";
}

function formatSalesWindow(startDate, endDate) {
  if (!startDate && !endDate) {
    return "Not listed";
  }

  const startText = startDate ? shortDateTimeFormatter.format(new Date(startDate)) : "Start not listed";
  const endText = endDate ? shortDateTimeFormatter.format(new Date(endDate)) : "End not listed";
  return `${startText} - ${endText}`;
}

function normalizeName(name) {
  return (name || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function dedupeEvents(items) {
  const seen = new Set();

  return items.filter((event) => {
    const key = [
      normalizeName(event.name).slice(0, 80),
      normalizeName(event.venue.name).slice(0, 50),
      event.startDateTime || `${event.localDate}-${event.localTime}`
    ].join("|");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildPanelSources(sources) {
  return sources
    .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`)
    .join("");
}

function buildGoogleMapsLink(mode, event) {
  const destination = encodeURIComponent(
    `${event.venue.name}, ${event.venue.address}, ${event.venue.city}, ${event.venue.state} ${event.venue.postalCode}`
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=${mode}`;
}

function buildUberLink(event) {
  return `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${event.venue.latitude}&dropoff[longitude]=${event.venue.longitude}&dropoff[nickname]=${encodeURIComponent(event.venue.name)}`;
}

function buildLyftLink(event) {
  return `https://ride.lyft.com/?destination[latitude]=${event.venue.latitude}&destination[longitude]=${event.venue.longitude}`;
}

function compactText(text, fallback = "Not listed", maxLength = 180) {
  if (!text) {
    return fallback;
  }

  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1)}…`;
}

function hasRealText(text) {
  if (!text) {
    return false;
  }

  const normalized = String(text).trim().toLowerCase();
  return normalized !== "" && normalized !== "undefined" && normalized !== "not listed";
}

function buildTrafficOutlook(event) {
  const eventStart = event.startDateTime ? new Date(event.startDateTime) : null;
  const eventEnd = event.endDateTime ? new Date(event.endDateTime) : null;
  const now = new Date();
  const millisUntilStart = eventStart ? eventStart.getTime() - now.getTime() : null;
  const eventFinished = eventEnd ? now.getTime() > eventEnd.getTime() : eventStart ? now.getTime() > eventStart.getTime() + (3 * 60 * 60 * 1000) : false;

  if (eventFinished) {
    return {
      title: "Event has finished",
      copy: "Arrival traffic guidance is no longer relevant because this event is already over.",
      level: "Event complete",
      bestLeave: "No arrival trip needed",
      rideshare: "If you are still nearby, pickup traffic may remain elevated just after the show.",
      transit: "Check local service for post-event schedules before heading back."
    };
  }

  let level = "Moderate";
  let bestLeave = "90 minutes before start";

  if (millisUntilStart !== null) {
    const hoursUntilStart = millisUntilStart / (1000 * 60 * 60);

    if (hoursUntilStart <= 1.5) {
      level = "High";
      bestLeave = "Leave now or as soon as possible";
    } else if (hoursUntilStart <= 3.5) {
      level = "Moderate";
      bestLeave = "Leave about 90 minutes before start";
    } else {
      level = "Low to moderate";
      bestLeave = "Leave 60 to 90 minutes before start";
    }
  }

  const urbanCities = new Set(["New York", "Chicago", "Nashville", "Los Angeles", "San Francisco", "Boston", "Seattle"]);
  const rideshare = urbanCities.has(event.venue.city)
    ? "Pickups can be slower right near the venue. A nearby cross street usually works better."
    : "Ride share should be straightforward, but pickup zones can still get busy after doors open.";
  const transit = urbanCities.has(event.venue.city)
    ? "Transit is often the most reliable arrival option in this area."
    : "Driving will usually be the easier option unless the venue provides a strong shuttle setup.";

  return {
    title: `${level} arrival traffic expected`,
    copy: "This outlook is a planning aid based on event timing, venue setting, and city context. Check your live navigation app before leaving.",
    level,
    bestLeave,
    rideshare,
    transit
  };
}

function toEventPageSource(event) {
  return [{ label: "Event page", url: event.url }];
}

function getCuratedSnapshot() {
  if (getCentralDateKey() !== CURATED_DATE_KEY) {
    return null;
  }

  return {
    version: SNAPSHOT_VERSION,
    dateKey: CURATED_DATE_KEY,
    generatedAt: new Date().toISOString(),
    curated: true,
    events: CURATED_EVENTS
  };
}

function sanitizeEvent(rawEvent) {
  const venue = rawEvent._embedded?.venues?.[0] || {};
  const classification = rawEvent.classifications?.[0] || {};
  const genre = classification.genre?.name || classification.segment?.name || "Concert";
  const promoterName = rawEvent.promoter?.name || rawEvent.promoters?.[0]?.name || "Ticketmaster partner";

  return {
    id: rawEvent.id,
    name: rawEvent.name,
    url: rawEvent.url,
    image: rawEvent.images?.[0]?.url || "",
    status: rawEvent.dates?.status?.code || "onsale",
    statusLabel: rawEvent.dates?.status?.code ? rawEvent.dates.status.code.toUpperCase() : "ONSALE",
    startDateTime: rawEvent.dates?.start?.dateTime || "",
    endDateTime: rawEvent.dates?.end?.dateTime || "",
    localDate: rawEvent.dates?.start?.localDate || "",
    localTime: rawEvent.dates?.start?.localTime || "",
    timezone: rawEvent.dates?.timezone || venue.timezone || "Local venue time",
    genre,
    promoter: promoterName,
    info: compactText(rawEvent.info, "Use the event page for venue rules.", 1200),
    pleaseNote: compactText(rawEvent.pleaseNote, "See the event page for restrictions.", 1200),
    displayDateTime: formatEventDateTime(
      rawEvent.dates?.start?.dateTime,
      rawEvent.dates?.start?.localDate,
      rawEvent.dates?.start?.localTime,
      rawEvent.dates?.timezone || venue.timezone
    ),
    doorsTime: formatMaybeDateTime(
      rawEvent.doorsTimes?.dateTime || rawEvent.dates?.access?.startDateTime,
      rawEvent.dates?.timezone || venue.timezone
    ),
    ticketing: rawEvent.ticketing?.safeTix?.enabled ? "SafeTix / digital ticketing enabled" : "Standard ticket delivery",
    ageGuidance:
      rawEvent.ageRestrictions?.legalAgeEnforced
        ? "Age restriction enforced"
        : compactText(rawEvent.pleaseNote, "See event page", 1200),
    salesWindow: formatSalesWindow(rawEvent.sales?.public?.startDateTime, rawEvent.sales?.public?.endDateTime),
    publicSale: rawEvent.sales?.public?.startDateTime
      ? shortDateTimeFormatter.format(new Date(rawEvent.sales.public.startDateTime))
      : "Not listed",
    venue: {
      name: venue.name || "Venue not listed",
      address: venue.address?.line1 || "Address not listed",
      city: venue.city?.name || "City not listed",
      state: venue.state?.stateCode || venue.state?.name || "State not listed",
      postalCode: venue.postalCode || "Postal code not listed",
      latitude: Number(venue.location?.latitude),
      longitude: Number(venue.location?.longitude)
    },
    summary: `${genre} event listed by Ticketmaster for the current Central Time day.`,
    sourceLinks: [
      {
        label: "Ticketmaster event page",
        kind: "Primary event listing",
        url: rawEvent.url
      }
    ]
  };
}

async function fetchTodayConcerts() {
  const { startMs, endMs } = getCentralDayBoundsMs();
  const response = await fetch(getEventsApiUrl());

  if (!response.ok) {
    throw new Error(`Ticketmaster request failed with status ${response.status}.`);
  }

  const payload = await response.json();
  const rawEvents = payload._embedded?.events || [];
  const inRangeEvents = rawEvents.filter((rawEvent) => {
    const startDateTime = rawEvent.dates?.start?.dateTime;

    if (!startDateTime) {
      return false;
    }

    const startMsForEvent = new Date(startDateTime).getTime();
    return !(Number.isNaN(startMsForEvent) || startMsForEvent < startMs || startMsForEvent >= endMs);
  });

  const preferredEvents = inRangeEvents
    .filter((rawEvent) => {
      const startDateTime = rawEvent.dates?.start?.dateTime;
      const statusCode = rawEvent.dates?.status?.code || "";
      const lowerName = (rawEvent.name || "").toLowerCase();

      if (!startDateTime) {
        return false;
      }

      const startMsForEvent = new Date(startDateTime).getTime();

      if (statusCode === "cancelled" || statusCode === "offsale") {
        return false;
      }

      if (lowerName.includes("all shows") || lowerName.includes("i'm on the list") || lowerName.includes("entry to all")) {
        return false;
      }

      return !Number.isNaN(startMsForEvent);
    })
    .map(sanitizeEvent)
    .filter((event) => Number.isFinite(event.venue.latitude) && Number.isFinite(event.venue.longitude));

  if (preferredEvents.length) {
    return dedupeEvents(preferredEvents).slice(0, 40);
  }

  return dedupeEvents(
    inRangeEvents
    .map(sanitizeEvent)
    .filter((event) => Number.isFinite(event.venue.latitude) && Number.isFinite(event.venue.longitude))
  ).slice(0, 40);
}

function loadSnapshotFromStorage() {
  const saved = window.localStorage.getItem(DAILY_REFRESH_KEY);
  if (!saved) {
    return null;
  }

  try {
    const parsed = JSON.parse(saved);
    if (
      parsed.version === SNAPSHOT_VERSION &&
      parsed.dateKey === getCentralDateKey() &&
      Array.isArray(parsed.events)
    ) {
      return parsed;
    }
  } catch (error) {
    console.warn("Sonara could not read the saved Ticketmaster snapshot.", error);
  }

  return null;
}

function saveSnapshot(items) {
  const nextSnapshot = {
    version: SNAPSHOT_VERSION,
    dateKey: getCentralDateKey(),
    generatedAt: new Date().toISOString(),
    events: items
  };

  window.localStorage.setItem(DAILY_REFRESH_KEY, JSON.stringify(nextSnapshot));
  snapshot = nextSnapshot;
  events = items;
}

function setKeyStatus(message) {
  keyStatus.textContent = message;
}

function renderTransport(selectedEvent) {
  const options = [
    {
      kind: "Drive",
      label: "Open driving directions",
      detail: "Google Maps route to the venue",
      url: buildGoogleMapsLink("driving", selectedEvent)
    },
    {
      kind: "Transit",
      label: "Open transit directions",
      detail: "Google Maps public transit route",
      url: buildGoogleMapsLink("transit", selectedEvent)
    },
    {
      kind: "Ride Share",
      label: "Open Uber",
      detail: "Set the venue as your drop-off",
      url: buildUberLink(selectedEvent)
    },
    {
      kind: "Ride Share",
      label: "Open Lyft",
      detail: "Set the venue in Lyft",
      url: buildLyftLink(selectedEvent)
    }
  ];

  transportList.innerHTML = "";

  options.forEach((option) => {
    const anchor = document.createElement("a");
    anchor.className = "transport-item";
    anchor.href = option.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.innerHTML = `
      <span class="transport-kind">${option.kind}</span>
      <strong>${option.label}</strong>
      <span class="today-meta">${option.detail}</span>
      <span class="transport-link">Open link</span>
    `;
    transportList.appendChild(anchor);
  });
}

function createCircleGeoJson(longitude, latitude, radiusKm = 1.2, points = 48) {
  const coordinates = [];
  const earthRadiusKm = 6371;
  const angularDistance = radiusKm / earthRadiusKm;
  const latRad = (latitude * Math.PI) / 180;
  const lngRad = (longitude * Math.PI) / 180;

  for (let index = 0; index <= points; index += 1) {
    const bearing = (2 * Math.PI * index) / points;
    const pointLat = Math.asin(
      Math.sin(latRad) * Math.cos(angularDistance) +
        Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
    );
    const pointLng =
      lngRad +
      Math.atan2(
        Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
        Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(pointLat)
      );

    coordinates.push([(pointLng * 180) / Math.PI, (pointLat * 180) / Math.PI]);
  }

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [coordinates]
    },
    properties: {}
  };
}

function ensureMap() {
  if (map || !mapboxToken || !window.mapboxgl) {
    return;
  }

  mapboxgl.accessToken = mapboxToken;
  map = new mapboxgl.Map({
    container: "event-map",
    style: "mapbox://styles/mapbox/standard",
    center: [activeEvent.venue.longitude, activeEvent.venue.latitude],
    zoom: 13
  });

  map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

  map.on("load", () => {
    renderMapArea(activeEvent);
  });
}

function renderMapArea(selectedEvent) {
  if (!mapboxToken) {
    mapNote.textContent = "Add a Mapbox token in config.js to load the venue-area map.";
    return;
  }

  ensureMap();

  if (!map) {
    return;
  }

  const center = [selectedEvent.venue.longitude, selectedEvent.venue.latitude];
  const areaFeature = createCircleGeoJson(selectedEvent.venue.longitude, selectedEvent.venue.latitude);

  mapNote.textContent = `Map centered on ${selectedEvent.venue.name}. The highlighted area shows the immediate venue footprint for today’s concert.`;
  mapSources.innerHTML = buildPanelSources(selectedEvent.mapSources || toEventPageSource(selectedEvent));

  const drawLayers = () => {
    if (map.getSource(areaSourceId)) {
      map.getSource(areaSourceId).setData(areaFeature);
    } else {
      map.addSource(areaSourceId, {
        type: "geojson",
        data: areaFeature
      });

      map.addLayer({
        id: areaSourceId,
        type: "fill",
        source: areaSourceId,
        paint: {
          "fill-color": "#2dd4bf",
          "fill-opacity": 0.15
        }
      });

      map.addLayer({
        id: areaOutlineId,
        type: "line",
        source: areaSourceId,
        paint: {
          "line-color": "#2dd4bf",
          "line-width": 2
        }
      });
    }

    if (marker) {
      marker.remove();
    }

    marker = new mapboxgl.Marker({ color: "#ff6b3d" })
      .setLngLat(center)
      .setPopup(
        new mapboxgl.Popup({ offset: 18 }).setHTML(
          `<strong>${selectedEvent.name}</strong><br>${selectedEvent.venue.name}`
        )
      )
      .addTo(map);

    map.flyTo({
      center,
      zoom: 13,
      essential: true
    });
  };

  if (map.loaded()) {
    drawLayers();
  } else {
    map.once("load", drawLayers);
  }
}

function renderEvent(selectedEvent) {
  activeEvent = selectedEvent;
  eventSelect.value = selectedEvent.id;

  eventName.textContent = selectedEvent.name;
  eventMeta.textContent = `${selectedEvent.venue.name} • ${selectedEvent.venue.city}, ${selectedEvent.venue.state}`;
  startTime.textContent = selectedEvent.displayDateTime || formatEventDateTime(
    selectedEvent.startDateTime,
    selectedEvent.localDate,
    selectedEvent.localTime
  );
  eventStatus.textContent = `${selectedEvent.venue.city}, ${selectedEvent.venue.state}`;
  eventGenre.textContent = selectedEvent.genre;

  snapshotTitle.textContent = selectedEvent.name;
  snapshotCopy.textContent = selectedEvent.summary;
  promoter.textContent = selectedEvent.promoter;
  salesWindow.textContent = selectedEvent.salesWindow;
  publicSale.textContent = selectedEvent.publicSale;
  eventTimezone.textContent = selectedEvent.timezone;

  venueName.textContent = selectedEvent.venue.name;
  venueAddress.textContent = selectedEvent.venue.address;
  venueCity.textContent = selectedEvent.venue.city;
  venueState.textContent = selectedEvent.venue.state;
  venuePostal.textContent = selectedEvent.venue.postalCode;
  venueSource.textContent = selectedEvent.venueSourceLabel || "Ticketmaster venue data";

  const traffic = buildTrafficOutlook(selectedEvent);
  rulesTitle.textContent = selectedEvent.venue.name;
  rulesCopy.textContent = selectedEvent.rulesCopy || "Event start uses Ticketmaster's event start time. Doors Open uses Ticketmaster door or access timing when it is listed.";
  doorsTime.textContent = selectedEvent.doorsTime;
  ticketingInfo.textContent = selectedEvent.ticketing;
  faqInfo.textContent = selectedEvent.info;
  restrictionsInfo.textContent = selectedEvent.pleaseNote;

  trafficTitle.textContent = traffic.title;
  trafficCopy.textContent = traffic.copy;
  trafficLevel.textContent = traffic.level;
  bestLeaveTime.textContent = traffic.bestLeave;
  rideshareNote.textContent = traffic.rideshare;
  transitNote.textContent = traffic.transit;

  snapshotSources.innerHTML = buildPanelSources(selectedEvent.sourceLinks || toEventPageSource(selectedEvent));
  venueSources.innerHTML = buildPanelSources(selectedEvent.venueSources || [
    { label: "Venue page", url: selectedEvent.url }
  ]);
  transportSources.innerHTML = buildPanelSources(selectedEvent.transportSources || [
    { label: "Directions", url: buildGoogleMapsLink("driving", selectedEvent) },
    { label: "Transit", url: buildGoogleMapsLink("transit", selectedEvent) }
  ]);
  rulesSources.innerHTML = buildPanelSources(selectedEvent.rulesSources || [
    { label: "Entry details", url: selectedEvent.url }
  ]);
  trafficSources.innerHTML = buildPanelSources(selectedEvent.trafficSources || [
    { label: "Live traffic", url: buildGoogleMapsLink("driving", selectedEvent) },
    { label: "Event page", url: selectedEvent.url }
  ]);
  renderTransport(selectedEvent);
  renderMapArea(selectedEvent);
}

function populateSelect() {
  eventSelect.innerHTML = "";

  if (!events.length) {
    const option = document.createElement("option");
    option.textContent = "No concerts loaded";
    eventSelect.appendChild(option);
    return;
  }

  events.forEach((event) => {
    const option = document.createElement("option");
    option.value = event.id;
    option.textContent = `${event.name.slice(0, 80)} • ${event.venue.city}, ${event.venue.state}`;
    eventSelect.appendChild(option);
  });
}

function renderBoardMeta() {
  const generatedAt = snapshot?.generatedAt ? new Date(snapshot.generatedAt) : new Date();
  dailyStatus.textContent = `Current Central Time day: ${dayFormatter.format(generatedAt)}`;
  refreshStatus.textContent = `Ticketmaster feed refreshes at 12:00 AM CT and repulls the current day’s U.S. concert events. Last fetch: ${ctTimeFormatter.format(generatedAt)}.`;
  keyStatus.textContent = `${events.length} concerts loaded for today. Open the dropdown and scroll to browse the full list.`;
}

function renderMissingKeyState() {
  events = [];
  populateSelect();
  setKeyStatus("A Ticketmaster API key is required for live current-day concert loading.");
  dailyStatus.textContent = "Live current-day concert feed is waiting for API keys.";
  refreshStatus.textContent = "Once keys are added, Sonara will repull today’s U.S. concerts every day at 12:00 AM CT.";
  eventName.textContent = "Add API keys to start";
  eventMeta.textContent = "Ticketmaster powers the event feed and Mapbox powers the venue map.";
  startTime.textContent = "Pending";
  eventStatus.textContent = "Pending";
  eventGenre.textContent = "Pending";
  snapshotTitle.textContent = "Live event feed is not configured";
  snapshotCopy.textContent = "This app has been rewired for real current-day concerts, but it needs your API keys to fetch Ticketmaster events and draw the Mapbox venue area.";
  promoter.textContent = "Pending";
  salesWindow.textContent = "Pending";
  publicSale.textContent = "Pending";
  eventTimezone.textContent = "Pending";
  venueName.textContent = "Waiting for Ticketmaster";
  venueAddress.textContent = "Venue details will appear after the first successful fetch.";
  venueCity.textContent = "Pending";
  venueState.textContent = "Pending";
  venuePostal.textContent = "Pending";
  venueSource.textContent = "Pending";
  rulesTitle.textContent = "Ticket and entry details will appear here";
  rulesCopy.textContent = "Sale timing and access guidance will populate from the selected event.";
  doorsTime.textContent = "Pending";
  ticketingInfo.textContent = "Pending";
  faqInfo.textContent = "Pending";
  restrictionsInfo.textContent = "Pending";
  trafficTitle.textContent = "Traffic outlook will appear here";
  trafficCopy.textContent = "Traffic guidance will be estimated from the selected event time and venue context.";
  trafficLevel.textContent = "Pending";
  bestLeaveTime.textContent = "Pending";
  rideshareNote.textContent = "Pending";
  transitNote.textContent = "Pending";
  transportList.innerHTML = "";
  mapNote.textContent = "Mapbox will render the selected event area here after a token is added.";
  snapshotSources.innerHTML = "";
  venueSources.innerHTML = "";
  transportSources.innerHTML = "";
  mapSources.innerHTML = "";
  rulesSources.innerHTML = "";
  trafficSources.innerHTML = "";
}

async function initializeApp(forceRefresh = false) {
  if (!ticketmasterApiKey) {
    renderMissingKeyState();
    return;
  }

  setKeyStatus(
    mapboxToken
      ? "Live event mode is active. Pulling Ticketmaster concerts for the current Central Time day."
      : "Ticketmaster live mode is active. Add a Mapbox token in config.js to enable the venue-area map."
  );

  const stored = !forceRefresh ? loadSnapshotFromStorage() : null;

  if (stored?.events?.length) {
    snapshot = stored;
    events = stored.events;
  } else {
    const items = await fetchTodayConcerts();
    saveSnapshot(items);
  }

  if (!events.length) {
    setKeyStatus("Ticketmaster returned no same-day concerts after filtering. Try refreshing later today.");
    dailyStatus.textContent = `Current Central Time day: ${dayFormatter.format(new Date())}`;
    refreshStatus.textContent = "The live feed responded, but no qualifying same-day concerts were available after filtering.";
    eventName.textContent = "No same-day concerts found";
    eventMeta.textContent = "Ticketmaster responded, but there were no qualifying current-day events to show.";
    startTime.textContent = "Unavailable";
    eventStatus.textContent = "Unavailable";
    eventGenre.textContent = "Unavailable";
    snapshotTitle.textContent = "Feed responded with no qualifying concerts";
    snapshotCopy.textContent = "This means the API worked, but the returned listings did not survive the same-day concert filter.";
    promoter.textContent = "Unavailable";
    salesWindow.textContent = "Unavailable";
    publicSale.textContent = "Unavailable";
    eventTimezone.textContent = "Unavailable";
    venueName.textContent = "Unavailable";
    venueAddress.textContent = "No venue currently selected.";
    venueCity.textContent = "Unavailable";
    venueState.textContent = "Unavailable";
    venuePostal.textContent = "Unavailable";
    venueSource.textContent = "Ticketmaster";
    rulesTitle.textContent = "No ticket details available";
    rulesCopy.textContent = "There is no selected event with ticket and access details right now.";
    doorsTime.textContent = "Unavailable";
    ticketingInfo.textContent = "Unavailable";
    faqInfo.textContent = "Unavailable";
    restrictionsInfo.textContent = "Unavailable";
    trafficTitle.textContent = "No traffic outlook available";
    trafficCopy.textContent = "Traffic guidance needs a selected concert listing.";
    trafficLevel.textContent = "Unavailable";
    bestLeaveTime.textContent = "Unavailable";
    rideshareNote.textContent = "Unavailable";
    transitNote.textContent = "Unavailable";
    transportList.innerHTML = "";
    snapshotSources.innerHTML = "";
    venueSources.innerHTML = "";
    transportSources.innerHTML = "";
    mapSources.innerHTML = "";
    rulesSources.innerHTML = "";
    trafficSources.innerHTML = "";
    return;
  }

  populateSelect();
  renderBoardMeta();
  renderEvent(events[0]);
  scheduleNextMidnightRefresh();
}

eventSelect.addEventListener("change", (event) => {
  const selected = events.find((item) => item.id === event.target.value);
  if (selected) {
    renderEvent(selected);
  }
});

initializeApp().catch((error) => {
  console.error(error);
  renderMissingKeyState();
  setKeyStatus(`Live fetch failed: ${error.message}`);
});
