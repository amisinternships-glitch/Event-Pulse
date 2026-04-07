export async function handler() {
  const API_KEY = process.env.TICKETMASTER_API_KEY;
  const today = new Date().toISOString().split("T")[0];

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&startDateTime=${today}T00:00:00Z&endDateTime=${today}T23:59:59Z&size=10&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const events = (data._embedded?.events || []).map((e) => ({
      id: e.id,
      name: e.name,
      type: "Concert",
      city: e._embedded?.venues?.[0]?.city?.name || "Unknown",
      venue: e._embedded?.venues?.[0]?.name || "Unknown venue",
      timeZone: "ET",
      coordinates: {
        lat: parseFloat(e._embedded?.venues?.[0]?.location?.latitude),
        lng: parseFloat(e._embedded?.venues?.[0]?.location?.longitude),
      },
      startTime: e.dates?.start?.localTime || "TBD",
      capacity: `Verified ${today}`,
      verifiedDate: today,
      security: {
        status: "Venue policy in effect",
        summary: "Check venue website for latest entry and bag policies.",
      },
      venueInfo: [],
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        verifiedDate: today,
        events: events,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch events" }),
    };
  }
}
