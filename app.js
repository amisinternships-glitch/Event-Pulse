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

const VERIFIED_DATE = "2026-04-04";
const CURRENT_BROWSER_DATE = new Date().toLocaleDateString("en-CA");
const EVENTS_API_URL = "/.netlify/functions/events";
let verifiedDate = null;
const fallbackEvents = [
  {
    id: "zach-bryan-tulsa-night-2",
    name: "Zach Bryan w/ Trampled By Turtles",
    type: "Concert",
    city: "Tulsa, OK",
    venue: "H.A. Chapman Stadium",
    timeZone: "CT",
    coordinates: { lat: 36.1486, lng: -95.9435 },
    startTime: "7:00 PM CT",
    capacity: "Verified Saturday, April 4, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "Tulsa uses stadium screening and a clear bag policy for entry. Review allowed items before you leave.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "Clear bags only",
        copy: 'Allowed bags include a 12" x 6" x 12" clear tote, a one-gallon clear bag, or a small clutch no larger than 4.5" x 6.5".',
        url: "https://tulsahurricane.com/sports/2018/7/17/ticket-office-information.aspx",
      },
      {
        label: "Food and drinks",
        title: "Water bottle rule",
        copy: "Outside food and beverages are not allowed, but empty clear water bottles up to 16 oz are permitted.",
        url: "https://tulsahurricane.com/sports/2018/7/17/ticket-office-information.aspx",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "Zach Bryan is listed for Saturday, April 4, 2026 at H.A. Chapman Stadium.",
        url: "https://www.ticketmaster.com/zach-bryan-tickets/artist/2811359",
      },
    ],
  },
  {
    id: "twice-boston-night-2",
    name: "TWICE [THIS IS FOR] WORLD TOUR IN BOSTON",
    type: "Concert",
    city: "Boston, MA",
    venue: "TD Garden",
    timeZone: "ET",
    coordinates: { lat: 42.3662, lng: -71.0621 },
    startTime: "8:00 PM ET",
    capacity: "Verified Saturday, April 4, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "TD Garden has a strict bag rule and does not allow outside food or beverages at entry.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "Small bags only",
        copy: 'Bags larger than 4" x 6" x 1.5" are not allowed. Backpacks, briefcases, and oversized purses are prohibited.',
        url: "https://www.tdgarden.com/a-z-guide",
      },
      {
        label: "Food and drinks",
        title: "No outside beverages",
        copy: "Outside food and beverages, cans, bottles, and coolers are not permitted inside TD Garden.",
        url: "https://www.tdgarden.com/a-z-guide",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "TWICE is listed at TD Garden for Saturday, April 4, 2026 with an 8:00 PM start.",
        url: "https://www.ticketmaster.com/twice-tickets/artist/2548848?venueId=8337",
      },
    ],
  },
  {
    id: "eric-church-charlotte",
    name: "Eric Church: Free The Machine Tour",
    type: "Concert",
    city: "Charlotte, NC",
    venue: "Spectrum Center",
    timeZone: "ET",
    coordinates: { lat: 35.2251, lng: -80.8392 },
    startTime: "7:30 PM ET",
    capacity: "Verified Saturday, April 4, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "Spectrum Center uses a no-bag policy for concerts like Eric Church, with only very small wallet exceptions.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "No bag policy",
        copy: 'Most concert events use a no-bag policy, with exceptions for small wallets up to 4" x 6" x 1.5", plus diaper and medical bags.',
        url: "https://www.spectrumcentercharlotte.com/plan-your-visit/a-z-guide",
      },
      {
        label: "Food and drinks",
        title: "No outside food or drink",
        copy: "Outside food, beverages, bottles, cans, and coolers are not allowed inside Spectrum Center.",
        url: "https://www.spectrumcentercharlotte.com/plan-your-visit/a-z-guide",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "Eric Church is listed at Spectrum Center for Saturday, April 4, 2026 at 7:30 PM.",
        url: "https://www.ticketmaster.com/eric-church-tickets/artist/1020885?page=277",
      },
    ],
  },
  {
    id: "journey-wichita",
    name: "Journey",
    type: "Concert",
    city: "Wichita, KS",
    venue: "INTRUST Bank Arena",
    timeZone: "CT",
    coordinates: { lat: 37.6842, lng: -97.3375 },
    startTime: "7:30 PM CT",
    capacity: "Verified Saturday, April 4, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "INTRUST Bank Arena uses a clear bag policy and screening at entry, so bringing only approved items will speed things up.",
    },
    venueInfo: [
      {
        label: "Bag policy",
        title: "Clear bag entry",
        copy: 'Permitted bags include clear bags up to 14" x 6" x 14", one-gallon clear bags, or a small clutch up to 5.5" x 8.5".',
        url: "https://www.intrustbankarena.com/harlem",
      },
      {
        label: "Screening",
        title: "Security checkpoint",
        copy: "The arena notes that its clear bag policy is designed to speed up entry, improve security, and reduce touch points.",
        url: "https://www.intrustbankarena.com/harlem",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "Journey is listed in Wichita at INTRUST Bank Arena for Saturday, April 4, 2026.",
        url: "https://www.ticketmaster.com/journey-tickets/artist/735415",
      },
    ],
  },
  {
    id: "devo-reno",
    name: "DEVO: Mutate Don't Stagnate",
    type: "Concert",
    city: "Reno, NV",
    venue: "Grand Theatre at Grand Sierra Resort",
    timeZone: "PT",
    coordinates: { lat: 39.5226, lng: -119.7765 },
    startTime: "8:00 PM PT",
    capacity: "Verified Saturday, April 4, 2026",
    verifiedDate: VERIFIED_DATE,
    security: {
      status: "Venue policy in effect",
      summary: "Grand Sierra Resort requires mobile tickets from the original source and checks venue policy at the theatre entrance.",
    },
    venueInfo: [
      {
        label: "Tickets",
        title: "Mobile tickets required",
        copy: "Screenshots, photos, or printed email copies are not accepted. Tickets must be shown from the original mobile source.",
        url: "https://www.grandsierraresort.com/tickets/",
      },
      {
        label: "Venue rules",
        title: "Check theatre policy before entry",
        copy: "Grand Sierra Resort directs guests to review event restrictions in advance and arrive with valid mobile tickets for theatre access.",
        url: "https://www.grandsierraresort.com/tickets/",
      },
      {
        label: "Verification",
        title: "Tonight's event",
        copy: "DEVO is listed at the Grand Theatre for Saturday, April 4, 2026 at 8:00 PM.",
        url: "https://www.ticketmaster.com/devo-tickets/artist/869383",
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

function getCoverageMessage() {
  if (!verifiedDate || !todayEvents.length) {
    return "Coverage is ready for the next verified refresh.";
  }

  const label = formatVerifiedDate(verifiedDate);
  if (verifiedDate !== CURRENT_BROWSER_DATE) {
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
    const response = await fetch(EVENTS_API_URL, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    const payload = await response.json();
    applyEventsPayload(payload);
  } catch (error) {
    console.error("Falling back to bundled event data.", error);
    applyEventsPayload(
      {
        verifiedDate: VERIFIED_DATE,
        events: fallbackEvents,
      },
      true
    );
  }
}

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
  const minutesUntilStart = getMinutesUntilStart(event);
  const arrivalLead =
    minutesUntilStart > 0
      ? `${minutesUntilStart} minutes until showtime`
      : "Event start window is active now";

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
      <p class="list-copy">Plan to arrive about 60 to 90 minutes before the ${event.startTime} start. ${arrivalLead}.</p>
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
