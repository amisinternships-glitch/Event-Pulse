//
//  refresh-events.js
//  
//
//  Created by Ami on 4/5/26.
//
const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  const API_KEY = process.env.TICKETMASTER_API_KEY;

  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
    .toISOString()
    .split("T")[0];

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&startDateTime=${today}T00:00:00Z&endDateTime=${today}T23:59:59Z&size=20&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const events = (data._embedded?.events || []).map((e) => ({
      id: e.id,
      name: e.name,
      venue: e._embedded?.venues?.[0]?.name,
      city: e._embedded?.venues?.[0]?.city?.name,
      coordinates: {
        lat: parseFloat(e._embedded?.venues?.[0]?.location?.latitude),
        lng: parseFloat(e._embedded?.venues?.[0]?.location?.longitude),
      },
      startTime: e.dates?.start?.localTime || "TBD",
    }));

    // Save to file
    const filePath = path.join(__dirname, "../../data/events.json");
    fs.writeFileSync(filePath, JSON.stringify({ events, date: today }));

    return {
      statusCode: 200,
      body: "Events refreshed",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Failed to refresh events",
    };
  }
};
