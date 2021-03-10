import { GoogleCalendarAuth } from "../googleCalendar";

const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

const gCal = new GoogleCalendarAuth();
/**
 * Auth endpoint for google calendar
 */
router.get("/authorize", async (req, res, next) => {
  gCal.authorize();
  res.send("🅾️ Auth process...");
});

/**
 * Google Oauth Callback
 */
router.get("/oauth2callback", async (req, res, next) => {
  const code = req.query.code;
  gCal.writeToken(code);
  res.send("Authorized, close this tab and click refresh button in the app");
});

router.delete("/", async (req, res, next) => {
  gCal.reset();
  res.send("oAuth reset done.");
});

router.get("/list", async (req, res, next) => {
  const auth = gCal.oAuth2Client;
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, response) => {
      if (err) {
        res.json({
          error: "Forbidden, googleCalendar is not authorized.",
        });
        console.log("The API returned an error: " + err);
        return;
      }
      const events = response.data.items;

      res.json(events);
    }
  );
});

module.exports = router;
