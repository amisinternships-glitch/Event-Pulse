// Load events from your Netlify function and display them
async function loadEventsData() {
  const container = document.getElementById("events");

  // Show loading state
  if (container) {
    container.innerHTML = "<p>Loading events...</p>";
  }

  try {
    const res = await fetch("/.netlify/functions/events");

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    console.log("Loaded data:", data);

    // Validate data
    if (!data || !data.events || data.events.length === 0) {
      throw new Error("No events found");
    }

    // Clear container
    container.innerHTML = "";

    // Render events
    data.events.forEach((event) => {
      const div = document.createElement("div");
      div.className = "event-card";

      div.innerHTML = `
        <h3>${event.name || "No title"}</h3>
        <p><strong>City:</strong> ${event.city || "Unknown"}</p>
        <p><strong>Venue:</strong> ${event.venue || "Unknown"}</p>
        <p><strong>Time:</strong> ${event.startTime || "TBD"}</p>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error("Error loading events:", error);

    // Fallback UI (so page never looks broken)
    if (container) {
      container.innerHTML = `
        <h3>⚠️ Unable to load events</h3>
        <p>Please try again later.</p>
      `;
    }
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadEventsData();
});
