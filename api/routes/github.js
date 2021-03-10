import { GraphQLClient } from "graphql-request";
import { repositoriesByUsername } from "../queries/github.queries";

const express = require("express");
const router = express.Router();

const API_KEY = process.env.GITHUB_API_KEY;
const githubApiUrl = "https://api.github.com/graphql";

const client = new GraphQLClient(githubApiUrl, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

router.get("/debug", async (req, res, next) => {
  res.send(repositoriesByUsername);

  res.status(200);
});

router.post("/repos", async (req, res, next) => {
  const variables = req.body;

  if (variables.username && variables.count) {
    try {
      const data = await client.request(repositoriesByUsername, variables);
      res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  } else {
    res.status(400);
    res.json({
      error: "A body with {username: string, count: number} must be suplied",
    });
  }
});

module.exports = router;
