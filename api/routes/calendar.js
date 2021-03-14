import { GoogleCalendarAuth, CALENDAR_TOKEN_PATH } from "../googleCalendar";

const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
import { readFile } from "../googleCalendar";

const gCal = new GoogleCalendarAuth();
/**
 * Auth endpoint for google calendar
 */
router.get("/auth-url", async (req, res, next) => {
  const url = gCal.getAccessToken();
  res.send(url);
});

router.get("/authorize", async (req, res, next) => {
  gCal.authorize();
  res.send(true);
});

router.get("/authorized", async (req, res, next) => {
  readFile(CALENDAR_TOKEN_PATH)
    .then((tk) => {
      res.send(true);
    })
    .catch((err) => {
      res.status(401).send(false);
    });
});

/**
 * Google Oauth Callback, sets token
 */
router.post("/oauth2callback", async (req, res, next) => {
  const code = req.query.code;
  gCal.writeToken(code);
  res.send("Google Token added");
});

/**
 * Removes token, remove credentials
 */
router.get("/reset", async (req, res, next) => {
  gCal.reset();
  res.send("oAuth reset done.");
});

/**
 * List upcoming events from next month
 */
router.get("/list", async (req, res, next) => {
  const auth = gCal.oAuth2Client;
  const calendar = google.calendar({ version: "v3", auth });
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: nextMonth.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, response) => {
      if (err) {
        res.status(401).json({
          errors: "Forbidden, googleCalendar is not authorized.",
        });
        console.log("The API returned an error: " + err);
        return;
      }
      const events = response.data.items;

      res.json(events);
    }
  );
});

/**
 * Cancels and event in calendar
 */
router.post("/cancelevent", async (req, res, next) => {
  const event = req.body;
  event.status = "cancelled";

  const auth = gCal.oAuth2Client;
  const calendar = google.calendar({ version: "v3", auth });

  calendar.events.update(
    {
      calendarId: "primary",
      eventId: event.id,
      requestBody: event,
    },
    (err, response) => {
      if (err) {
        res.json({
          error: "Forbidden, googleCalendar is not authorized.",
        });
        console.log("The API returned an error: " + err);
        return;
      }

      res.json(event.eventId);
    }
  );
});

module.exports = router;
