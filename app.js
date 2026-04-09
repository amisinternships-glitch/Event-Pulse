const TIME_ZONE = "America/Chicago";
const DAILY_REFRESH_KEY = "conceriousTicketmasterSnapshotV1";
const DAILY_EVENT_LIMIT = 100;
const SNAPSHOT_VERSION = 4;
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
const artistTitle = document.getElementById("artist-title");
const artistCopy = document.getElementById("artist-copy");
const artistAlbumLink = document.getElementById("artist-album-link");
const artistSongList = document.getElementById("artist-song-list");

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

const CURATED_EVENTS = [
  {
    id: "opry-country-classics-opry-house-2026-04-09",
    name: "Opry Country Classics",
    url: "https://www.opry.com/events/filtered/2026/April",
    image: "",
    status: "onsale",
    statusLabel: "VERIFIED",
    startDateTime: "2026-04-10T00:00:00Z",
    endDateTime: "",
    localDate: "April 9, 2026",
    localTime: "7:00 PM CDT",
    displayDateTime: "Thursday, April 9, 2026 at 7:00 PM CDT",
    timezone: "America/Chicago",
    genre: "Country",
    promoter: "Grand Ole Opry and AXS",
    info: "Bag policy: oversized bags are not allowed unless medically necessary, and all bags are subject to search. Bottle policy: outside food and beverages, including water, cans, and bottles, are not permitted inside the Opry House. Entry restrictions: every guest goes through metal-detector screening, prohibited items can be denied at entry, and AXS mobile tickets are the official ticket format for Thursday, April 9, 2026.",
    pleaseNote: "Official Opry parking guidance says evening-show parking starts at 5:00 PM in the Opry Mills area, with Opry House paid-parking signs posted for drivers. Opry's visit pages also promote Lyft as the official rideshare partner for Thursday, April 9, 2026 arrivals.",
    doorsTime: "Official Opry and AXS pages list doors at 6:00 PM and showtime at 7:00 PM CDT on Thursday, April 9, 2026.",
    ticketing: "Official Opry and AXS pages show Opry Country Classics at the Opry House on Thursday, April 9, 2026, featuring The Oak Ridge Boys, John Foster, The Gatlin Brothers, The Isaacs, and Jaelee Roberts.",
    ageGuidance: "AXS lists Opry Country Classics on Thursday, April 9, 2026 as an all-ages event, and Opry's FAQ says children under 4 may attend shows free when seated with a guardian.",
    publicSale: "Opry Country Classics Thursday, April 9, 2026 Nashville listing verified on official Opry and AXS pages.",
    rulesCopy: "Venue rules verified from Opry's official FAQ, safety, and parking pages for Thursday, April 9, 2026.",
    venueSourceLabel: "Official Opry pages",
    venue: {
      name: "Opry House",
      address: "600 Opry Mills Drive",
      city: "Nashville",
      state: "TN",
      postalCode: "37214",
      latitude: 36.2067,
      longitude: -86.6925
    },
    summary: "Opry Country Classics is listed at the Opry House on Thursday, April 9, 2026 at 7:00 PM CDT.",
    sourceLinks: [
      { label: "Opry April calendar", kind: "Official venue event page", url: "https://www.opry.com/events/filtered/2026/April" },
      { label: "AXS ticket page", kind: "Official ticketing", url: "https://www.axs.com/events/1088105/opry-country-classics-tickets" }
    ],
    venueSources: [
      { label: "Opry House know before you go", url: "https://www.opry.com/plan-your-visit/opry-house" },
      { label: "Directions, parking, and transportation", url: "https://www.opry.com/plan-your-visit/opry-house/directions-parking-transportation" }
    ],
    rulesSources: [
      { label: "Opry House FAQs", url: "https://www.opry.com/plan-your-visit/opry-house-faqs" },
      { label: "Safety and security", url: "https://www.opry.com/plan-your-visit/safety-and-security" }
    ],
    transportSources: [
      { label: "Directions, parking, and transportation", url: "https://www.opry.com/plan-your-visit/opry-house/directions-parking-transportation" },
      { label: "Opry House know before you go", url: "https://www.opry.com/plan-your-visit/opry-house" }
    ],
    mapSources: [
      { label: "Directions, parking, and transportation", url: "https://www.opry.com/plan-your-visit/opry-house/directions-parking-transportation" }
    ],
    trafficSources: [
      { label: "Directions, parking, and transportation", url: "https://www.opry.com/plan-your-visit/opry-house/directions-parking-transportation" },
      { label: "Opry April calendar", url: "https://www.opry.com/events/filtered/2026/April" }
    ]
  },
  {
    id: "mercyme-rio-rancho-events-center-2026-04-09",
    name: "MercyMe – Awe + Wonder Tour",
    url: "https://www.rioranchoeventscenter.com/events/mercyme-awe-wonder-tour/",
    image: "",
    status: "onsale",
    statusLabel: "VERIFIED",
    startDateTime: "2026-04-10T01:00:00Z",
    endDateTime: "",
    localDate: "April 9, 2026",
    localTime: "7:00 PM MDT",
    displayDateTime: "Thursday, April 9, 2026 at 7:00 PM MDT",
    timezone: "America/Denver",
    genre: "Christian",
    promoter: "Rio Rancho Events Center and Ticketmaster",
    info: "Bag policy: Rio Rancho allows clear bags, diaper bags, and medical bags of any size; other bags must be clear and no larger than 12 x 6 x 12 inches, one clear one-gallon plastic bag is allowed, and a small clutch can be no larger than 4.5 x 8.5 inches. Bottle policy: outside food and beverages plus bottles, cans, coolers, and liquid containers are prohibited. Entry restrictions: venue screening is required, mobile Ticketmaster tickets must be shown on a phone, screenshots are not allowed, and the building enforces no re-entry.",
    pleaseNote: "Official Rio Rancho guidance says the venue sits near Paseo del Volcan and Unser, roughly 30 to 45 minutes from downtown Albuquerque, with abundant parking that is usually free, east-side accessible parking near the main entrance, and best-available lots if you arrive early.",
    doorsTime: "Official Rio Rancho and Ticketmaster pages list doors at 5:30 PM and showtime at 7:00 PM MDT on Thursday, April 9, 2026.",
    ticketing: "Official Rio Rancho and Ticketmaster pages both show MercyMe – Awe + Wonder Tour at Rio Rancho Events Center on Thursday, April 9, 2026.",
    ageGuidance: "Ticketmaster lists MercyMe - Wonder & Awe Tour on Thursday, April 9, 2026 as an all-ages event.",
    publicSale: "MercyMe – Awe + Wonder Tour Thursday, April 9, 2026 Rio Rancho listing verified on official venue and Ticketmaster pages.",
    rulesCopy: "Venue rules verified from Rio Rancho's official arena policies, know-before-you-go, and directions pages for Thursday, April 9, 2026.",
    venueSourceLabel: "Official Rio Rancho Events Center pages",
    venue: {
      name: "Rio Rancho Events Center",
      address: "3001 Civic Center Circle NE",
      city: "Rio Rancho",
      state: "NM",
      postalCode: "87144",
      latitude: 35.3092,
      longitude: -106.6868
    },
    summary: "MercyMe – Awe + Wonder Tour is listed at Rio Rancho Events Center on Thursday, April 9, 2026 at 7:00 PM MDT.",
    sourceLinks: [
      { label: "Rio Rancho event page", kind: "Official venue event page", url: "https://www.rioranchoeventscenter.com/events/mercyme-awe-wonder-tour/" },
      { label: "Ticketmaster event page", kind: "Official ticketing", url: "https://www.ticketmaster.com/mercyme-wonder-awe-tour-rio-rancho-new-mexico-04-09-2026/event/1E006344DC1A5960" }
    ],
    venueSources: [
      { label: "Know before you go", url: "https://www.rioranchoeventscenter.com/know-before-you-go/" },
      { label: "Directions and parking", url: "https://www.rioranchoeventscenter.com/plan-your-visit/directions/" }
    ],
    rulesSources: [
      { label: "Arena policies", url: "https://www.rioranchoeventscenter.com/plan-your-visit/arena-policies/" },
      { label: "Know before you go", url: "https://www.rioranchoeventscenter.com/know-before-you-go/" }
    ],
    transportSources: [
      { label: "Directions and parking", url: "https://www.rioranchoeventscenter.com/plan-your-visit/directions/" },
      { label: "Know before you go", url: "https://www.rioranchoeventscenter.com/know-before-you-go/" }
    ],
    mapSources: [
      { label: "Directions and parking", url: "https://www.rioranchoeventscenter.com/plan-your-visit/directions/" }
    ],
    trafficSources: [
      { label: "Know before you go", url: "https://www.rioranchoeventscenter.com/know-before-you-go/" },
      { label: "Directions and parking", url: "https://www.rioranchoeventscenter.com/plan-your-visit/directions/" }
    ]
  },
  {
    id: "cleveland-orchestra-schubert-shostakovich-severance-2026-04-09",
    name: "The Cleveland Orchestra: Schubert & Shostakovich",
    url: "https://www.clevelandorchestra.com/attend/concerts-and-events/2526/severance/wk-20-schubert/",
    image: "",
    status: "onsale",
    statusLabel: "VERIFIED",
    startDateTime: "2026-04-09T23:30:00Z",
    endDateTime: "",
    localDate: "April 9, 2026",
    localTime: "7:30 PM EDT",
    displayDateTime: "Thursday, April 9, 2026 at 7:30 PM EDT",
    timezone: "America/New_York",
    genre: "Classical",
    promoter: "The Cleveland Orchestra",
    info: "Bag policy: all bags and backpacks are subject to search, and large bags, backpacks, and instrument cases must be checked at coat check before entering the hall. Bottle policy: alcoholic or outside beverages are prohibited, and food and beverages are generally not allowed inside Mandel Concert Hall. Entry restrictions: Open Gate Security checks are in place at all entrances, backpacks must be checked, and photography plus video or audio recording during performances is prohibited.",
    pleaseNote: "Official Severance parking guidance points drivers to Case Western Reserve University's Lot 29 Campus Center Garage directly beside Severance Music Center, with additional event parking in CWRU Lot 1A, Lot 63, and the Cleveland Botanical Garden garage. Concert previews start one hour before the performance if you want an earlier arrival target.",
    doorsTime: "Official Cleveland Orchestra guest-services guidance says Severance opens two hours before most performances and Mandel Concert Hall usually opens 30 minutes before curtain, which places Thursday, April 9, 2026 arrival windows around 5:30 PM and 7:00 PM EDT for this 7:30 PM concert.",
    ticketing: "Official Cleveland Orchestra pages show Schubert & Shostakovich in Mandel Concert Hall at Severance Music Center on Thursday, April 9, 2026, performed by The Cleveland Orchestra with Santtu-Matias Rouvali and Sol Gabetta.",
    ageGuidance: "The official Cleveland Orchestra concert and guest-services pages for Thursday, April 9, 2026 do not list a separate age restriction.",
    publicSale: "Schubert & Shostakovich Thursday, April 9, 2026 Cleveland listing verified on official Cleveland Orchestra concert and venue pages.",
    rulesCopy: "Venue rules verified from The Cleveland Orchestra's official guest-services, venue, and parking pages for Thursday, April 9, 2026.",
    venueSourceLabel: "Official Cleveland Orchestra pages",
    venue: {
      name: "Mandel Concert Hall at Severance Music Center",
      address: "11001 Euclid Avenue",
      city: "Cleveland",
      state: "OH",
      postalCode: "44106",
      latitude: 41.5046,
      longitude: -81.6117
    },
    summary: "Schubert & Shostakovich is listed at Mandel Concert Hall at Severance Music Center on Thursday, April 9, 2026 at 7:30 PM EDT.",
    sourceLinks: [
      { label: "Cleveland Orchestra concert page", kind: "Official venue event page", url: "https://www.clevelandorchestra.com/attend/concerts-and-events/2526/severance/wk-20-schubert/" },
      { label: "Season listing", kind: "Official ticketing", url: "https://www.clevelandorchestra.com/posts/schubert-and-shostakovich" }
    ],
    venueSources: [
      { label: "Severance Music Center", url: "https://www.clevelandorchestra.com/visit/severance-music-center" },
      { label: "Parking and directions", url: "https://www.clevelandorchestra.com/visit/severance-music-center/parking--directions" }
    ],
    rulesSources: [
      { label: "Guest services and code of conduct", url: "https://www.clevelandorchestra.com/help/guest-services/" },
      { label: "Severance Music Center", url: "https://www.clevelandorchestra.com/visit/severance-music-center" }
    ],
    transportSources: [
      { label: "Parking and directions", url: "https://www.clevelandorchestra.com/visit/severance-music-center/parking--directions" },
      { label: "Severance Music Center", url: "https://www.clevelandorchestra.com/visit/severance-music-center" }
    ],
    mapSources: [
      { label: "Parking and directions", url: "https://www.clevelandorchestra.com/visit/severance-music-center/parking--directions" }
    ],
    trafficSources: [
      { label: "Parking and directions", url: "https://www.clevelandorchestra.com/visit/severance-music-center/parking--directions" },
      { label: "Cleveland Orchestra concert page", url: "https://www.clevelandorchestra.com/attend/concerts-and-events/2526/severance/wk-20-schubert/" }
    ]
  },
  {
    id: "angelique-kidjo-strathmore-2026-04-09",
    name: "Angélique Kidjo",
    url: "https://www.strathmore.org/events-tickets/in-the-music-center/angelique-kidjo/",
    image: "",
    status: "onsale",
    statusLabel: "VERIFIED",
    startDateTime: "2026-04-10T00:00:00Z",
    endDateTime: "",
    localDate: "April 9, 2026",
    localTime: "8:00 PM EDT",
    displayDateTime: "Thursday, April 9, 2026 at 8:00 PM EDT",
    timezone: "America/New_York",
    genre: "World / International",
    promoter: "Strathmore Presents",
    info: "Bag policy: one bag per person is allowed if it is no larger than 14 x 10 x 13 inches, while backpacks, diaper bags, duffel bags, and suitcases are not permitted. Bottle policy: all outside food and beverages, including alcohol, are prohibited, but Strathmore says plastic bottled water is permitted in the Concert Hall and drinks served in Strathmore reusable cups with lids may be brought to seats. Entry restrictions: security screening may include bag checks and handheld or walkthrough metal detectors, and guests consent to screening on entry.",
    pleaseNote: "Official Strathmore directions say ticketed Concert Hall parking uses the Grosvenor-Strathmore Metro garage off Tuckerman Lane, Strathmore covers the main-garage cost for Strathmore Presents events, the exit gates open for 30 minutes after the show, and the venue sits directly on Metro's Red Line with a sky-bridge into the Music Center.",
    doorsTime: "Official Strathmore policies say lobby doors typically open 90 minutes before showtime and house doors 30 minutes before showtime, placing Thursday, April 9, 2026 arrival windows around 6:30 PM and 7:30 PM EDT for this 8:00 PM concert.",
    ticketing: "Official Strathmore pages show Angélique Kidjo at the Music Center on Thursday, April 9, 2026, with ticketed entry handled through Strathmore's own purchase flow.",
    ageGuidance: "The official Strathmore event page for Thursday, April 9, 2026 does not list a separate age restriction.",
    publicSale: "Angélique Kidjo Thursday, April 9, 2026 North Bethesda listing verified on official Strathmore pages.",
    rulesCopy: "Venue rules verified from Strathmore's official Music Center policies and directions pages for Thursday, April 9, 2026.",
    venueSourceLabel: "Official Strathmore pages",
    venue: {
      name: "The Music Center at Strathmore",
      address: "5301 Tuckerman Lane",
      city: "North Bethesda",
      state: "MD",
      postalCode: "20852",
      latitude: 39.0264,
      longitude: -77.1041
    },
    summary: "Angélique Kidjo is listed at the Music Center at Strathmore on Thursday, April 9, 2026 at 8:00 PM EDT.",
    sourceLinks: [
      { label: "Strathmore event page", kind: "Official venue event page", url: "https://www.strathmore.org/events-tickets/in-the-music-center/angelique-kidjo/" },
      { label: "Strathmore ticket policies", kind: "Official ticketing", url: "https://www.strathmore.org/events-tickets/ticket-policies/" }
    ],
    venueSources: [
      { label: "Directions and parking", url: "https://www.strathmore.org/your-visit/directions-parking/" },
      { label: "Your visit", url: "https://www.strathmore.org/your-visit/" }
    ],
    rulesSources: [
      { label: "Music Center policies", url: "https://www.strathmore.org/your-visit/music-center-policies/" },
      { label: "Your visit", url: "https://www.strathmore.org/your-visit/" }
    ],
    transportSources: [
      { label: "Directions and parking", url: "https://www.strathmore.org/your-visit/directions-parking/" },
      { label: "Your visit", url: "https://www.strathmore.org/your-visit/" }
    ],
    mapSources: [
      { label: "Directions and parking", url: "https://www.strathmore.org/your-visit/directions-parking/" }
    ],
    trafficSources: [
      { label: "Directions and parking", url: "https://www.strathmore.org/your-visit/directions-parking/" },
      { label: "Strathmore event page", url: "https://www.strathmore.org/events-tickets/in-the-music-center/angelique-kidjo/" }
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
let artistRequestToken = 0;

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

function quoteDisplayText(text, fallback = "Not listed") {
  const value = hasRealText(text) ? cleanRestrictionText(text) : fallback;
  return `“${value}”`;
}

function cleanRestrictionText(text) {
  return String(text)
    .replace(/[_-]{3,}/g, ". ")
    .replace(/\s+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]{2,})([A-Z][a-z])/g, "$1 $2")
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    .replace(/([A-Za-z])([$])/g, "$1 $2")
    .replace(/\s*([:;,])\s*/g, "$1 ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function inferArtistName(name) {
  if (!name) {
    return "Selected artist";
  }

  let cleaned = name.replace(/\([^)]*\)/g, " ").trim();
  cleaned = cleaned.replace(/\s+(featuring|feat\.?|with|special guest|plus)\s+.*$/i, "");
  cleaned = cleaned.replace(/\s+[–-]\s+(tour|live|with|featuring|feat\.?).*$/i, "");
  cleaned = cleaned.replace(/\s{2,}/g, " ").trim();
  return cleaned || name;
}

function renderArtistLoading(event) {
  const artistName = event.artistName || inferArtistName(event.name);
  artistTitle.textContent = artistName;
  artistCopy.textContent = "Loading artist listening details.";
  artistAlbumLink.href = `https://open.spotify.com/search/${encodeURIComponent(artistName)}`;
  artistAlbumLink.classList.remove("is-hidden");
  artistSongList.innerHTML = "";
}

function renderArtistFallback(event) {
  const artistName = event.artistName || inferArtistName(event.name);
  artistTitle.textContent = artistName;
  artistCopy.textContent = "Spotify details are approximate here, and the match may not exactly reflect the event artist.";
  artistAlbumLink.href = `https://open.spotify.com/search/${encodeURIComponent(artistName)}`;
  artistAlbumLink.classList.remove("is-hidden");
  artistSongList.innerHTML = "";
}

async function renderArtistGuide(event) {
  const requestToken = ++artistRequestToken;
  const artistName = event.artistName || inferArtistName(event.name);

  renderArtistLoading({ ...event, artistName });

  try {
    const response = await fetch(`/api/artist-guide?artist=${encodeURIComponent(artistName)}`);

    if (!response.ok) {
      throw new Error(`Artist guide failed with status ${response.status}`);
    }

    const payload = await response.json();

    if (requestToken !== artistRequestToken) {
      return;
    }

    artistTitle.textContent = payload.artistName || artistName;
    artistCopy.textContent = `Navigate to ${(payload.artistName || artistName)} on Spotify and preview five songs below. Spotify matches may not exactly reflect the event artist.`;
    artistAlbumLink.href = payload.spotifyUrl;
    artistAlbumLink.classList.remove("is-hidden");
    artistSongList.innerHTML = (payload.topSongs?.length ? payload.topSongs : ["No songs were returned for this artist."])
      .map((song) => `<li>${song}</li>`)
      .join("");
  } catch (error) {
    if (requestToken !== artistRequestToken) {
      return;
    }

    renderArtistFallback({ ...event, artistName });
  }
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
    artistName: inferArtistName(rawEvent._embedded?.attractions?.[0]?.name || rawEvent.name),
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
      console.warn("Concerious could not read the saved Ticketmaster snapshot.", error);
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
  faqInfo.textContent = quoteDisplayText(selectedEvent.info);
  restrictionsInfo.textContent = quoteDisplayText(selectedEvent.pleaseNote);

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
  renderArtistGuide(selectedEvent);
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
  refreshStatus.textContent = "Once keys are added, Concerious will repull today’s U.S. concerts every day at 12:00 AM CT.";
  eventName.textContent = "Add API keys to start";
  eventMeta.textContent = "Ticketmaster powers the event feed and Mapbox powers the venue map.";
  startTime.textContent = "Pending";
  eventStatus.textContent = "Pending";
  eventGenre.textContent = "Pending";
  snapshotTitle.textContent = "Live event feed is not configured";
  snapshotCopy.textContent = "This app has been rewired for real current-day concerts, but it needs your API keys to fetch Ticketmaster events and draw the Mapbox venue area.";
  promoter.textContent = "Pending";
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
  artistTitle.textContent = "Artist guide will appear here";
  artistCopy.textContent = "Choose an event to load artist listening details.";
  artistAlbumLink.href = "#";
  artistAlbumLink.classList.add("is-hidden");
  artistSongList.innerHTML = "";
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
    artistTitle.textContent = "No artist guide available";
    artistCopy.textContent = "Artist info needs a selected concert listing.";
    artistAlbumLink.href = "#";
    artistAlbumLink.classList.add("is-hidden");
    artistSongList.innerHTML = "";
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
