import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// Supabase credentials from Netlify environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function handler() {
  try {
    // 1️⃣ Fetch today's events
    const res = await fetch("https://your-site.com/api/events/today");
    if (!res.ok) throw new Error("Failed to fetch today's events");
    const todayEvents = await res.json();

    // 2️⃣ Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("events") // your bucket name
      .upload("today-events.json", JSON.stringify(todayEvents), {
        contentType: "application/json",
        upsert: true, // replace existing file
      });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Today's events updated!" }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
