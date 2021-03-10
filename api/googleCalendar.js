const express = require("express");
const fs = require("fs");
const { google } = require("googleapis");
const open = require("opn");

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const CALENDAR_CREDENTIALS = "calendar-credentials.json";
export const CALENDAR_TOKEN_PATH = "calendar-token.json";
const DEBUG = false;

/**
 * Authorizes a user with oAuth2
 */
export class GoogleCalendarAuth {
  constructor() {
    let _credentials;

    readFile(CALENDAR_CREDENTIALS).then((secret) => {
      _credentials = JSON.parse(secret);
      const { client_secret, client_id, redirect_uris } = _credentials.web;

      // Creating client
      this.oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );

      debugMessage(
        `1️⃣ oAuth client created, ${JSON.stringify(this.oAuth2Client)}`
      );
    });
  }

  authorize() {
    const client = this.oAuth2Client;
    debugMessage(`2️⃣ authorize ${JSON.stringify(client)}`);
    authorizeToken(client);
  }

  /**
   * Write a new token in file system.
   * @param {string} code token from google oAuth's callback
   */
  writeToken(code) {
    const client = this.oAuth2Client;

    client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      // Store the token to disk for later program executions
      fs.writeFile(CALENDAR_TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(`🔥 ${err}`);
        console.log("✅  Token saved to: ", CALENDAR_TOKEN_PATH);

        client.setCredentials(token);

        debugMessage(`5️⃣  After Write token ${JSON.stringify(client)}`);
      });
    });
  }

  reset() {
    this.oAuth2Client
      .revokeCredentials()
      .then(() => console.log("✅  Google credentials revoked"))
      .catch((err) => console.log("🔥 Error: No access token to revoke"));

    deleteToken();
  }
}

/**
 * Helpers
 */

/**
 * Read file
 * @param {string} path File path to read
 */
export async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
}

/**
 * Authorize user
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
function authorizeToken(oAuth2Client) {
  debugMessage(`3️⃣ authorizeToken ${JSON.stringify(oAuth2Client)}`);
  fs.readFile(CALENDAR_TOKEN_PATH, (err, token) => {
    // Require a new accessToken if we don't have a stored token
    if (err) return getAccessToken(oAuth2Client);

    // SetToken from stored value
    oAuth2Client.setCredentials(JSON.parse(token));
    console.log("✅  Google calendar token set from system");
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client) {
  console.log(`4️⃣ getAccessToken ${JSON.stringify(oAuth2Client)}`);
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("🅾️ Opening OAuth dialog in browser...");
  open(authUrl);
}

/**
 * Delete token from File system
 */
function deleteToken() {
  fs.unlink(CALENDAR_TOKEN_PATH, (err) => {
    if (err) {
      console.log("🔥 Error: token file doesn't exist.");
      return;
    }

    console.log("✅  Google Calendar Token removed");
  });
}

/**
 * Debug Function
 * @param {*} message
 */
function debugMessage(message) {
  return DEBUG && console.log(message);
}
