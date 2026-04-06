const { getEventsPayload } = require("../../lib/events-feed");

exports.handler = async function handler(event) {
  try {
    const payload = await getEventsPayload(event?.queryStringParameters?.date);
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        error: "Unable to load events feed.",
        detail: error.message,
      }),
    };
  }
};
