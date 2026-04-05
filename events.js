const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  try {
    const filePath = path.join(__dirname, "../../data/events.json");
    const data = fs.readFileSync(filePath);

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
      },
      body: data.toString(),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No stored events yet" }),
    };
  }
};
