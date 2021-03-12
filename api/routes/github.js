import { GraphQLClient } from "graphql-request";
import { readFile } from "../googleCalendar";
import { viewerRepos } from "../queries/github.queries";

const express = require("express");
const app = express();
const router = express.Router();
const config = require("../github-config.js");
const request = require("superagent");
const fs = require("fs");

// this should be loaded from auth token.
const API_KEY = process.env.GITHUB_API_KEY;
const GITHUB_USER_TOKEN_PATH = "github-token.json";
const githubGraphQLUrl = "https://api.github.com/graphql";

// Github v4 API client.
let client;

// Read token file and initializes client
readFile(GITHUB_USER_TOKEN_PATH)
  .then((tk) => {
    const gitHubToken = JSON.parse(tk);

    client = new GraphQLClient(githubGraphQLUrl, {
      headers: {
        Authorization: `Bearer ${gitHubToken.access_token}`,
        "Content-Type": "application/json",
      },
    });
  })
  .catch((err) => {
    console.log(
      "🔥 There's no token file for github: " + GITHUB_USER_TOKEN_PATH
    );
    return;
  });

router.get("/debug", async (req, res, next) => {});

router.get("/authorized", async (req, res, next) => {
  readFile(GITHUB_USER_TOKEN_PATH)
    .then((tk) => {
      res.send(true);
    })
    .catch((err) => {
      res.send(false);
    });
});

router.post("/oauth2callback", async (req, res, next) => {
  const { query } = req;
  const { code } = query;
  let errors = {
    token: null,
  };
  let response = {
    authorized: false,
  };

  if (!code) {
    errors.token = "There was an error processing the token from github";
  }

  request
    .post("https://github.com/login/oauth/access_token")
    .send({
      client_id: config.GITHUB_KEY,
      client_secret: config.GITHUB_SECRET,
      code: code,
    })
    .set("Accept", "application/json")
    .then((result) => {
      const token = result.body;
      if (token.error) {
        console.log(`🔥 Token request error: ${JSON.stringify(token.error)}`);
        errors.token = "The code passed is incorrect or expired.";
        response.errors = errors;
      } else {
        response.authorized = true;
        // Write new token
        fs.writeFile(GITHUB_USER_TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(`🔥 ${err}`);
          console.log("✅  Token saved to: ", GITHUB_USER_TOKEN_PATH);
        });
      }
      res.send(response);
    })
    .catch((err) => console.log(err));
});

router.post("/repos", async (req, res, next) => {
  // const variables = req.body;
  // .request(viewerRepos, variables)
  try {
    const data = await client.request(viewerRepos);
    res.json(data.viewer.repositories.nodes);
  } catch (err) {
    next({ error: err.message });
  }
});

module.exports = router;
