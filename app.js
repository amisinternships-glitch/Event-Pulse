const eventSelect = document.getElementById("event-select");
const lastUpdated = document.getElementById("last-updated");
const coverageNote = document.getElementById("coverage-note");
const directionsLink = document.getElementById("directions-link");
const gettingThereLink = document.getElementById("getting-there-link");
const uberLink = document.getElementById("uber-link");
const lyftLink = document.getElementById("lyft-link");
const travelModeToggle = document.getElementById("travel-mode-toggle");

const nodes = {
  eventName: document.getElementById("event-name"),
  venueName: document.getElementById("venue-name"),
  eventLocation: document.getElementById("event-location"),
  eventTime: document.getElementById("event-time"),
  eventCapacity: document.getElementById("event-capacity"),
  crowdLevel: document.getElementById("crowd-level"),
  crowdSummary: document.getElementById("crowd-summary"),
  waitTime: document.getElementById("wait-time"),
  waitSummary: document.getElementById("wait-summary"),
  securityStatus: document.getElementById("security-status"),
  securitySummary: document.getElementById("security-summary"),
  arrivalStrategy: document.getElementById("arrival-strategy"),
  gettingThere: document.getElementById("getting-there"),
  venueInfo: document.getElementById("venue-info"),
};

let map;
let venueMarker;
let liveEstimateTimer;
let selectedTravelMode = "drive";
let mapIsLoaded = false;

const MAPBOX_TOKEN =
  window.EVENT_PULSE_MAPBOX_TOKEN ||
  "pk.eyJ1IjoiYW1pZGhvIiwiYSI6ImNtbmp1cHN5bTAwc3cyd3B6dDVsZnhnajgifQ.Lyc1XC_CbCBCDooIAdMuPQ";
const MAPBOX_TRAFFIC_SOURCE = "mapbox-traffic";
const MAPBOX_TRAFFIC_LAYER = "event-pulse-traffic";
const ARRIVAL_ZONE_SOURCE = "arrival-zones";
const ARRIVAL_ZONE_FILL_LAYER = "arrival-zones-fill";
const ARRIVAL_ZONE_LINE_LAYER = "arrival-zones-line";

const VERIFIED_DATE = "2026-04-06";
let verifiedDate = null;
const fallbackEvents = [
  {
    id: "twice-chicago-night-1",
    name: "TWICE [THIS IS FOR] WORLD TOUR IN CHICAGO",
    type: "Concert",
    city: "Chicago, IL",
    venue: "United Center",
    timeZone: "CT",
    coordinates: { lat: 41.8807, lng: -87.6742 },
    startTime: "8:00 PM CT",
    capacity: "Verified Monday, April 6, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "United Center is using a small-bag rule, no outside food or beverages, and metal-detector entry screening for Monday, April 6, 2026.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "Small bags only",
        copy: 'Guests may bring a small purse or personal bag up to 10" x 6" x 2". Backpacks and larger bags are not allowed, except approved medical bags.',
        url: "https://www.unitedcenter.com/venue/frequently-asked-questions/",
      },
      {
        label: "Bottle policy",
        title: "No outside food or bottles",
        copy: "Outside food or beverages are not permitted inside the arena, and bottles or cans are listed among prohibited items.",
        url: "https://www.unitedcenter.com/venue/frequently-asked-questions/",
      },
      {
        label: "Entry restrictions",
        title: "Mobile ticketing and screened entry",
        copy: "United Center uses fully digital tickets, screenshots and print-at-home tickets are not valid, and all guests pass through visual inspection, bag check, and metal detection with no re-entry during the event.",
        url: "https://www.unitedcenter.com/venue/mobile-ticketing-guide/",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "TWICE is listed at United Center for Monday, April 6, 2026 at 8:00 PM, with gates opening at 6:30 PM.",
        url: "https://www.unitedcenter.com/events/2026/04/06/twice-this-is-for-world-tour/",
      },
    ],
  },
  {
    id: "boys-like-girls-detroit",
    name: "BOYS LIKE GIRLS - The Soundtrack Of Your Life Tour",
    type: "Concert",
    city: "Detroit, MI",
    venue: "The Fillmore Detroit",
    timeZone: "ET",
    coordinates: { lat: 42.3388, lng: -83.0518 },
    startTime: "7:00 PM ET",
    capacity: "Verified Monday, April 6, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "The Fillmore Detroit is using bag checks, mobile-only tickets, and a no re-entry rule for Monday, April 6, 2026.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "12 x 6 x 12 bag limit",
        copy: 'Bags up to 12" x 6" x 12" are allowed. All bags are searched before entry, and non-clear bags receive additional screening.',
        url: "https://www.thefillmoredetroit.com/visit",
      },
      {
        label: "Bottle policy",
        title: "No outside food or drink",
        copy: "Outside food or drink is prohibited, and unsealed liquids are listed among the venue's prohibited items.",
        url: "https://www.thefillmoredetroit.com/visit",
      },
      {
        label: "Entry restrictions",
        title: "Mobile entry and no re-entry",
        copy: "All events use mobile entry, tickets are not available for print, and guests who leave cannot re-enter without a new ticket.",
        url: "https://www.thefillmoredetroit.com/visit",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "BOYS LIKE GIRLS is listed at The Fillmore Detroit for Monday, April 6, 2026 with doors at 6:00 PM and show at 7:00 PM.",
        url: "https://www.ticketmaster.com/boys-like-girls-the-soundtrack-of-detroit-michigan-04-06-2026/event/08006356ADA62DDF",
      },
    ],
  },
  {
    id: "don-bloom-phoenix",
    name: "DON BLOOM",
    type: "Concert",
    city: "Phoenix, AZ",
    venue: "The Rebel Lounge",
    timeZone: "MT",
    coordinates: { lat: 33.4954, lng: -112.0327 },
    startTime: "8:00 PM MT",
    capacity: "Verified Monday, April 6, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "The Rebel Lounge is enforcing bag searches, no outside food or beverages, and 21+ ID checks for Monday, April 6, 2026.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "No backpacks",
        copy: "The Rebel Lounge does not allow backpacks, does not publish a strict size limit for smaller bags, and searches bags at entry.",
        url: "https://therebellounge.com/faq/",
      },
      {
        label: "Bottle policy",
        title: "No outside food or beverages",
        copy: "Outside food and beverages are not permitted at The Rebel Lounge.",
        url: "https://therebellounge.com/faq/",
      },
      {
        label: "Entry restrictions",
        title: "21+ with limited re-entry",
        copy: "DON BLOOM is listed as a 21+ show. A valid non-expired government photo ID is required for 21+ entry, under-21 guests are not eligible for re-entry, and guests over 21 should not expect re-entry except when staff allows it.",
        url: "https://therebellounge.com/faq/",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "DON BLOOM is listed at The Rebel Lounge for Monday, April 6, 2026 with doors at 7:30 PM and show at 8:00 PM.",
        url: "https://therebellounge.com/events/",
      },
    ],
  },
  {
    id: "eliza-mclamb-san-diego",
    name: "Eliza McLamb - Good Story Tour",
    type: "Concert",
    city: "San Diego, CA",
    venue: "Voodoo Room at the House of Blues San Diego",
    timeZone: "PT",
    coordinates: { lat: 32.7137, lng: -117.1591 },
    startTime: "8:00 PM PT",
    capacity: "Verified Monday, April 6, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "House of Blues San Diego is enforcing a clear-bag rule, no outside drinks, and no re-entry for Monday, April 6, 2026.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "Clear bags or small clutch only",
        copy: 'Clear plastic, vinyl, or PVC totes up to 12" x 6" x 12" are allowed, along with small clutches up to 4.5" x 6.5". All bags are searched before entry.',
        url: "https://sandiego.houseofblues.com/faq",
      },
      {
        label: "Bottle policy",
        title: "No outside food or beverage",
        copy: "Outside food and beverages are prohibited at the venue.",
        url: "https://sandiego.houseofblues.com/faq",
      },
      {
        label: "Entry restrictions",
        title: "No re-entry after entry",
        copy: "The venue does not allow re-entry once guests enter, and the Ticketmaster listing notes the show is all ages with under-18 guests needing an accompanying adult age 25 or older.",
        url: "https://sandiego.houseofblues.com/faq",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "Eliza McLamb is listed at the Voodoo Room for Monday, April 6, 2026 with doors at 7:00 PM and show at 8:00 PM.",
        url: "https://www.ticketmaster.com/eliza-mclamb-good-story-tour-san-diego-california-04-06-2026/event/0A006307A0DA6288",
      },
    ],
  },
  {
    id: "sticky-fingers-san-francisco",
    name: "Sticky Fingers - Live in North America",
    type: "Concert",
    city: "San Francisco, CA",
    venue: "The Masonic",
    timeZone: "PT",
    coordinates: { lat: 37.7923, lng: -122.4147 },
    startTime: "8:00 PM PT",
    capacity: "Verified Monday, April 6, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "The Masonic is enforcing bag checks, mobile entry, and no re-entry for Monday, April 6, 2026.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "12 x 6 x 12 bag limit",
        copy: 'Bags must not exceed 12" x 6" x 12". All bags are subject to inspection, and the venue recommends leaving bags at home for faster entry.',
        url: "https://www.sfmasonic.com/visit?linkId=100000356286802",
      },
      {
        label: "Bottle policy",
        title: "One sealed water bottle allowed",
        copy: "Outside food and drink are not allowed, but guests may bring one factory-sealed bottle of water. Camelbacks and hard-sided containers are not permitted.",
        url: "https://www.sfmasonic.com/faq",
      },
      {
        label: "Entry restrictions",
        title: "Mobile entry and no re-entry",
        copy: "The Masonic uses mobile entry, and re-entry is not permitted once you leave the building.",
        url: "https://www.sfmasonic.com/visit?linkId=100000356286802",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "Sticky Fingers is listed at The Masonic for Monday, April 6, 2026 at 8:00 PM with doors at 7:00 PM.",
        url: "https://www.livenation.com/event/G5vYZbVSJPtsw/sticky-fingers-live-in-north-america",
      },
    ],
  },
];
let events = fallbackEvents.slice();
let todayEvents = [];
let selectedEventId = "";

function formatVerifiedDate(dateString) {
  if (!dateString) {
    return "unknown date";
  }

  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getLocalDateString() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];
}

function getCoverageMessage() {
  if (!verifiedDate || !todayEvents.length) {
    return "Coverage is ready for the next verified refresh.";
  }

  const label = formatVerifiedDate(verifiedDate);
  if (verifiedDate !== getLocalDateString()) {
    return `Showing ${todayEvents.length} U.S. events verified for ${label}. Daily refresh is still pending for the current browser date.`;
  }

  return `Showing ${todayEvents.length} U.S. events verified for ${label}.`;
}

function applyEventsPayload(payload, useFallback = false) {
  verifiedDate = payload?.verifiedDate || (useFallback ? VERIFIED_DATE : null);
  events = Array.isArray(payload?.events)
    ? payload.events
    : useFallback
      ? fallbackEvents.slice()
      : [];
  todayEvents = verifiedDate ? events.filter((event) => event.verifiedDate === verifiedDate) : [];
  selectedEventId = todayEvents[0]?.id || "";
}

async function loadEventsData() {
  try {
    const response = await fetch("https://zmegfwpueygurhnpmycr.supabase.co/storage/v1/object/public/events/refresh-today-events.swift");
    if (!response.ok) {
      throw new Error(`Events feed returned ${response.status}`);
    }

    const payload = await response.json();
    applyEventsPayload(payload, false);
  } catch (error) {
    console.error("Events feed failed, using fallback data.", error);
    applyEventsPayload(
      {
        verifiedDate: VERIFIED_DATE,
        events: fallbackEvents,
      },
      true
    );
  }
}
// existing loadEvents function
async function loadEvents() {
  const res = await fetch("https://zmegfwpueygurhnpmycr.supabase.co/storage/v1/object/public/events/today-events.json");
  const events = await res.json();

  const container = document.getElementById("events-container");
  container.innerHTML = events.map(e => `<div>${e.title}</div>`).join("");
}

// call it initially
loadEvents();

// --- Auto-refresh at midnight CT ---
function refreshAtMidnightCT() {
  const now = new Date();
  const ctOffset = -5; // CDT UTC-5
  const hoursCT = (now.getUTCHours() + ctOffset + 24) % 24;
  const msUntilMidnight =
    ((24 - hoursCT) * 3600 - now.getUTCMinutes() * 60 - now.getUTCSeconds()) * 1000 - now.getUTCMilliseconds();

  setTimeout(() => location.reload(), msUntilMidnight);
}

refreshAtMidnightCT();
function populateEvents() {
  eventSelect.innerHTML = "";
  eventSelect.disabled = false;

  if (!todayEvents.length) {
    const option = document.createElement("option");
    option.textContent = "No verified events available";
    option.value = "";
    eventSelect.appendChild(option);
    eventSelect.disabled = true;
    return;
  }

  todayEvents.forEach((event) => {
    const option = document.createElement("option");
    option.value = event.id;
    option.textContent = `${event.name} • ${event.city}`;
    eventSelect.appendChild(option);
  });
}

function getEventData(id) {
  return todayEvents.find((event) => event.id === id) || todayEvents[0];
}

function parseStartMinutes(startTime) {
  const match = startTime.match(/(\d{1,2}):(\d{2})\s([AP]M)/i);
  if (!match) return 0;

  let hour = Number(match[1]) % 12;
  const minutes = Number(match[2]);
  const meridiem = match[3].toUpperCase();

  if (meridiem === "PM") {
    hour += 12;
  }

  return hour * 60 + minutes;
}

function getTimeZoneOffsetHours(zone) {
  const offsets = {
    ET: -4,
    CT: -5,
    MT: -6,
    PT: -7,
  };

  return offsets[zone] ?? -5;
}

function getVenueNow(event) {
  const now = new Date();
  const utcMillis = now.getTime() + now.getTimezoneOffset() * 60000;
  const localMillis = utcMillis + getTimeZoneOffsetHours(event.timeZone) * 3600000;
  return new Date(localMillis);
}

function getMinutesUntilStart(event) {
  const venueNow = getVenueNow(event);
  const currentMinutes = venueNow.getHours() * 60 + venueNow.getMinutes();
  return parseStartMinutes(event.startTime) - currentMinutes;
}

function getTrafficState(event) {
  const minutesUntilStart = getMinutesUntilStart(event);

  if (minutesUntilStart > 150) {
    return {
      label: "Light",
      message: "Traffic is light, good time to leave.",
      tone: "good",
    };
  }

  if (minutesUntilStart > 75) {
    return {
      label: "Building",
      message: "Traffic is building near the venue.",
      tone: "medium",
    };
  }

  return {
    label: "Heavy",
    message: "Heavy congestion expected, consider alternate routes.",
    tone: "alert",
  };
}

function getBestArrivalWindow(event) {
  const startMinutes = parseStartMinutes(event.startTime);
  const earliest = startMinutes - 90;
  const latest = startMinutes - 60;

  return `${formatMinutes(earliest)} to ${formatMinutes(latest)} ${event.timeZone}`;
}

function formatMinutes(totalMinutes) {
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
  const hours24 = Math.floor(wrapped / 60);
  const minutes = wrapped % 60;
  const meridiem = hours24 >= 12 ? "PM" : "AM";
  const hour12 = hours24 % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, "0")} ${meridiem}`;
}

function getRecommendedMode(event, trafficState) {
  const transitFriendlyCities = new Set(["Boston, MA", "Inglewood, CA"]);

  if (trafficState.label === "Heavy") {
    if (transitFriendlyCities.has(event.city)) {
      return {
        mode: "transit",
        title: "Transit",
        copy: "Transit helps you avoid the heaviest arrival backups close to the venue.",
      };
    }

    return {
      mode: "rideshare",
      title: "Rideshare",
      copy: "Rideshare reduces parking delays and keeps the final approach simpler.",
    };
  }

  if (trafficState.label === "Building") {
    return {
      mode: "rideshare",
      title: "Rideshare",
      copy: "Rideshare keeps drop-off flexible as curb activity starts to increase.",
    };
  }

  return {
    mode: "drive",
    title: "Drive",
    copy: "Driving is fastest right now while approach traffic is still moving well.",
  };
}

function getModeLabel(mode) {
  const labels = {
    drive: "Drive",
    transit: "Transit",
    walk: "Walk",
    rideshare: "Rideshare",
  };

  return labels[mode] ?? "Drive";
}

function getModeSummary(mode, trafficState) {
  const summaries = {
    drive:
      trafficState.label === "Heavy"
        ? "Driving still works, but leaving earlier will make parking and final entry smoother."
        : "Driving gives you the most direct arrival path at the moment.",
    transit: "Transit helps reduce final approach stress and keeps arrival timing steadier.",
    walk: "Walking works best if you are already parked or staying close to the venue district.",
    rideshare: "Rideshare avoids parking friction and is a good option during busier arrival windows.",
  };

  return summaries[mode] ?? summaries.drive;
}

// ===== SMART EVENT ESTIMATES =====
function getCrowdLevel() {
  const hour = new Date().getHours();

  if (hour < 16) return "Low";
  if (hour < 18) return "Building";
  if (hour < 20) return "High";
  return "Peak";
}

function getEntryCondition(crowd) {
  switch (crowd) {
    case "Low":
      return {
        status: "Smooth",
        message: "Early arrival window — entry is moving smoothly at most gates.",
      };
    case "Building":
      return {
        status: "Moderate",
        message: "Arrival flow is building — expect some screening at the main gates.",
      };
    case "High":
      return {
        status: "Heavy",
        message: "Peak arrival window — expect delays at main gates.",
      };
    case "Peak":
      return {
        status: "Heavy",
        message: "Peak arrival window — expect delays at main gates.",
      };
    default:
      return {
        status: "Moderate",
        message: "Entry is active near the main gate lanes.",
      };
  }
}

function getSecurityMessage(crowd) {
  if (crowd === "Peak") {
    return {
      status: "Heavy",
      message: "Peak arrival window — security screening is moving slower at the main gates.",
    };
  }

  if (crowd === "High") {
    return {
      status: "Active",
      message: "Security checks are steady right now, with moderate delays near the main entrances.",
    };
  }

  return {
    status: "Smooth",
    message: "Security screening is moving smoothly for most guests approaching the venue.",
  };
}

function updateLastVerifiedLabel() {
  const now = new Date();

  lastUpdated.textContent = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(now);
}

function updateLiveData(event) {
  if (!event) {
    return;
  }

  const crowd = getCrowdLevel();
  const entryCondition = getEntryCondition(crowd);
  const security = getSecurityMessage(crowd);
  const trafficState = getTrafficState(event);

  nodes.crowdLevel.innerText = crowd;
  nodes.crowdSummary.innerText = "Live estimate based on event timing";
  nodes.waitTime.innerText = entryCondition.status;
  nodes.waitSummary.innerText = entryCondition.message;
  nodes.securityStatus.innerText = security.status;
  nodes.securitySummary.innerText = security.message;

  renderArrivalStrategy(event, trafficState);
  renderGettingThere(event, trafficState);
  updateTrafficZones(event, trafficState);
  updateDirectionsLink(event);
  syncTravelModeButtons();
  updateLastVerifiedLabel();
}

function ensureMap() {
  if (map || !document.getElementById("map") || typeof mapboxgl === "undefined") {
    return;
  }

  mapboxgl.accessToken = MAPBOX_TOKEN;
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v11",
    center: [-98.5795, 39.8283],
    zoom: 3.8,
    attributionControl: true,
  });

  map.addControl(new mapboxgl.NavigationControl(), "top-left");

  map.on("load", () => {
    mapIsLoaded = true;
    addTrafficLayer();
    addArrivalZoneLayers();

    const currentEvent = getEventData(selectedEventId);
    if (currentEvent) {
      refreshMap(currentEvent, getTrafficState(currentEvent));
    }
  });
}

function updateTrafficZones(event, trafficState = getTrafficState(event)) {
  if (!map || !mapIsLoaded || !event?.coordinates) {
    return;
  }

  const features = createArrivalZoneFeatures(event.coordinates, trafficState);
  map.getSource(ARRIVAL_ZONE_SOURCE)?.setData({
    type: "FeatureCollection",
    features,
  });
}

function refreshMap(event, trafficState = getTrafficState(event)) {
  if (!map || !mapIsLoaded || !event?.coordinates) {
    return;
  }

  const [lng, lat] = [event.coordinates.lng, event.coordinates.lat];

  updateTrafficZones(event, trafficState);
  updateVenueMarker(event);
  map.easeTo({
    center: [lng, lat],
    zoom: 13.7,
    duration: 1200,
    essential: true,
  });
}

function updateVenueMarker(event) {
  if (!map || !mapIsLoaded || !event?.coordinates) {
    return;
  }

  const markerNode = document.createElement("div");
  markerNode.className = "mapbox-marker";

  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnMove: false,
    offset: 18,
  }).setHTML(
    `<strong>${event.name}</strong><br>${event.venue}<br>${event.city}`
  );

  venueMarker?.remove();
  venueMarker = new mapboxgl.Marker(markerNode)
    .setLngLat([event.coordinates.lng, event.coordinates.lat])
    .setPopup(popup)
    .addTo(map);

  venueMarker.togglePopup();
}

function addTrafficLayer() {
  if (!map || map.getSource(MAPBOX_TRAFFIC_SOURCE)) {
    return;
  }

  map.addSource(MAPBOX_TRAFFIC_SOURCE, {
    type: "vector",
    url: "mapbox://mapbox.mapbox-traffic-v1",
  });

  map.addLayer({
    id: MAPBOX_TRAFFIC_LAYER,
    type: "line",
    source: MAPBOX_TRAFFIC_SOURCE,
    "source-layer": "traffic",
    minzoom: 7,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-width": [
        "interpolate",
        ["linear"],
        ["zoom"],
        7,
        1.5,
        10,
        3,
        14,
        5,
      ],
      "line-color": [
        "match",
        ["get", "congestion"],
        "low",
        "#74c69d",
        "moderate",
        "#f2c14e",
        "heavy",
        "#ef8354",
        "severe",
        "#d00000",
        "#4b5563",
      ],
      "line-opacity": 0.9,
      "line-offset": 1.5,
    },
  });
}

function addArrivalZoneLayers() {
  if (!map || map.getSource(ARRIVAL_ZONE_SOURCE)) {
    return;
  }

  map.addSource(ARRIVAL_ZONE_SOURCE, {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  });

  map.addLayer({
    id: ARRIVAL_ZONE_FILL_LAYER,
    type: "fill",
    source: ARRIVAL_ZONE_SOURCE,
    paint: {
      "fill-color": ["get", "zoneColor"],
      "fill-opacity": ["get", "zoneOpacity"],
    },
  });

  map.addLayer({
    id: ARRIVAL_ZONE_LINE_LAYER,
    type: "line",
    source: ARRIVAL_ZONE_SOURCE,
    paint: {
      "line-color": ["get", "zoneColor"],
      "line-width": 1.8,
      "line-opacity": 0.85,
    },
  });
}

function createArrivalZoneFeatures(coordinates, trafficState) {
  const zoneColor =
    trafficState.label === "Light"
      ? "#74c69d"
      : trafficState.label === "Building"
        ? "#f2c14e"
        : "#ef8354";

  return [220, 420, 620].map((radius, index) => ({
    type: "Feature",
    properties: {
      zoneColor,
      zoneOpacity: [0.18, 0.12, 0.08][index],
    },
    geometry: {
      type: "Polygon",
      coordinates: [createCircleCoordinates(coordinates.lng, coordinates.lat, radius)],
    },
  }));
}

function createCircleCoordinates(lng, lat, radiusMeters, points = 64) {
  const coordinates = [];
  const earthRadius = 6378137;
  const latRadians = (lat * Math.PI) / 180;

  for (let i = 0; i <= points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const dx = radiusMeters * Math.cos(angle);
    const dy = radiusMeters * Math.sin(angle);
    const deltaLng = (dx / (earthRadius * Math.cos(latRadians))) * (180 / Math.PI);
    const deltaLat = (dy / earthRadius) * (180 / Math.PI);
    coordinates.push([lng + deltaLng, lat + deltaLat]);
  }

  return coordinates;
}

function getGoogleTravelMode(mode) {
  const mapping = {
    drive: "driving",
    rideshare: "driving",
    transit: "transit",
    walk: "walking",
  };

  return mapping[mode] ?? "driving";
}

function updateDirectionsLink(event) {
  if (!event?.coordinates) {
    directionsLink.href = "#";
    gettingThereLink.href = "#";
    uberLink.href = "#";
    lyftLink.href = "#";
    directionsLink.setAttribute("aria-disabled", "true");
    gettingThereLink.setAttribute("aria-disabled", "true");
    uberLink.setAttribute("aria-disabled", "true");
    lyftLink.setAttribute("aria-disabled", "true");
    return;
  }

  const destination = encodeURIComponent(`${event.venue}, ${event.city}`);
  const rideName = encodeURIComponent(`${event.venue}`);
  const travelmode = getGoogleTravelMode(selectedTravelMode);
  const href = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=${travelmode}`;
  directionsLink.href = href;
  gettingThereLink.href = href;
  uberLink.href = `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${event.coordinates.lat}&dropoff[longitude]=${event.coordinates.lng}&dropoff[nickname]=${rideName}`;
  lyftLink.href = `https://ride.lyft.com/?destination[latitude]=${event.coordinates.lat}&destination[longitude]=${event.coordinates.lng}`;
  directionsLink.removeAttribute("aria-disabled");
  gettingThereLink.removeAttribute("aria-disabled");
  uberLink.removeAttribute("aria-disabled");
  lyftLink.removeAttribute("aria-disabled");
}

function restartLiveEstimateLoop(event) {
  window.clearInterval(liveEstimateTimer);
  updateLiveData(event);
  liveEstimateTimer = window.setInterval(() => {
    const currentEvent = getEventData(selectedEventId);
    updateLiveData(currentEvent);
  }, 30000);
}

function renderArrivalStrategy(event, trafficState) {
  nodes.arrivalStrategy.innerHTML = `
    <div class="travel-stat pulse-in">
      <div class="list-topline">
        <p class="travel-title">Traffic Outlook</p>
        <span class="pill ${trafficState.tone}">${trafficState.label}</span>
      </div>
      <p class="list-copy">${trafficState.message}</p>
    </div>
    <div class="travel-stat pulse-in">
      <p class="list-label">Best Arrival Window</p>
      <p class="travel-title">${getBestArrivalWindow(event)}</p>
      <p class="list-copy">Plan to arrive about 60 to 90 minutes before the ${event.startTime} start.</p>
    </div>
  `;
}

function renderGettingThere(event, trafficState) {
  const recommended = getRecommendedMode(event, trafficState);
  const activeMode = getModeLabel(selectedTravelMode);

  nodes.gettingThere.innerHTML = `
    <div class="travel-stat pulse-in">
      <p class="list-label">Recommended Travel Method</p>
      <p class="travel-title">${recommended.title}</p>
      <p class="list-copy">${recommended.copy}</p>
    </div>
    <div class="travel-stat pulse-in">
      <p class="list-label">Selected Mode</p>
      <p class="travel-title">${activeMode}</p>
      <p class="list-copy">${getModeSummary(selectedTravelMode, trafficState)}</p>
    </div>
  `;
}

function syncTravelModeButtons() {
  travelModeToggle.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === selectedTravelMode);
  });
}

function makeVenueMarkup(items) {
  return items
    .map(
      (item) => `
        <div class="venue-item pulse-in">
          <p class="list-label">${item.label}</p>
          <p class="venue-rule-title">${item.title}</p>
          <p class="venue-copy">${item.copy}</p>
          <p class="source-link"><a href="${item.url}" target="_blank" rel="noreferrer">Open source</a></p>
        </div>
      `
    )
    .join("");
}

function renderEvent(id) {
  const event = getEventData(id);

  if (!event) {
    nodes.eventName.textContent = "No verified events loaded";
    nodes.venueName.textContent = "Daily refresh required";
    nodes.eventLocation.textContent = "";
    nodes.eventTime.textContent = "";
    nodes.eventCapacity.textContent = "";
    nodes.crowdLevel.textContent = "Unavailable";
    nodes.crowdSummary.textContent = "Add fresh verified data for the current day to populate this dashboard.";
    nodes.waitTime.textContent = "Unavailable";
    nodes.waitSummary.textContent = "No same-day verified event records are loaded.";
    nodes.securityStatus.textContent = "Unavailable";
    nodes.securitySummary.textContent = "No same-day public security information has been loaded.";
    nodes.arrivalStrategy.innerHTML = "";
    nodes.gettingThere.innerHTML = "";
    nodes.venueInfo.innerHTML = "";
    ensureMap();
    venueMarker?.remove();
    venueMarker = null;
    if (mapIsLoaded) {
      map.getSource(ARRIVAL_ZONE_SOURCE)?.setData({
        type: "FeatureCollection",
        features: [],
      });
    }
    updateDirectionsLink(null);
    window.clearInterval(liveEstimateTimer);
    lastUpdated.textContent =
      verifiedDate ? formatVerifiedDate(verifiedDate) : "No current-day verification loaded";
    coverageNote.textContent = getCoverageMessage();
    return;
  }

  nodes.eventName.textContent = `${event.name} ${event.type}`;
  nodes.venueName.textContent = event.venue;
  nodes.eventLocation.textContent = event.city;
  nodes.eventTime.textContent = event.startTime;
  nodes.eventCapacity.textContent = event.capacity;
  nodes.crowdLevel.textContent = "Loading...";
  nodes.crowdSummary.textContent = "";
  nodes.waitTime.textContent = "--";
  nodes.waitSummary.textContent = "";
  nodes.securityStatus.textContent = "--";
  nodes.securitySummary.textContent = event.security.summary;
  selectedTravelMode = getRecommendedMode(event, getTrafficState(event)).mode;
  nodes.arrivalStrategy.innerHTML = "";
  nodes.gettingThere.innerHTML = "";
  nodes.venueInfo.innerHTML = makeVenueMarkup(event.venueInfo);
  coverageNote.textContent = getCoverageMessage();
  ensureMap();
  updateDirectionsLink(event);
  if (mapIsLoaded) {
    refreshMap(event, getTrafficState(event));
  }
  restartLiveEstimateLoop(event);
}

eventSelect.addEventListener("change", (event) => {
  selectedEventId = event.target.value;
  renderEvent(selectedEventId);
});

travelModeToggle.addEventListener("click", (event) => {
  const button = event.target.closest(".mode-button");
  if (!button) {
    return;
  }

  const currentEvent = getEventData(selectedEventId);
  if (!currentEvent) {
    return;
  }

  selectedTravelMode = button.dataset.mode;
  renderGettingThere(currentEvent, getTrafficState(currentEvent));
  updateDirectionsLink(currentEvent);
  syncTravelModeButtons();
});

async function initializeApp() {
  await loadEventsData();
  populateEvents();
  eventSelect.value = selectedEventId;
  renderEvent(selectedEventId);
}

initializeApp();
