const { getEventsPayload } = require("../../lib/events-feed");

module.exports = async function handler(req, res) {
  try {
    const payload = await getEventsPayload();
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({
      error: "Unable to load events feed.",
      detail: error.message,
    });
  }
};
