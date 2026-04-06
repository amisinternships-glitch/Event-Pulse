import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// --- Netlify Schedule: 5:00 UTC = 12:00 AM CT ---
// netlify-schedule: 0 5 * * *

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function handler() {
  try {
    // fetch today's events
    const res = await fetch("https://your-site.com/api/events/today");
    const todayEvents = await res.json();

    // upload to Supabase public bucket
    const { error } = await supabase.storage
      .from("events") // your bucket name
      .upload("today-events.json", JSON.stringify(todayEvents), {
        contentType: "application/json",
        upsert: true,
      });

    if (error) throw error;

    return { statusCode: 200, body: "Today's events updated!" };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
