var express = require("express");
var router = express.Router();
const USER_CREDENTIALS_PATH = "user-credentials.json";
const fs = require("fs");
const { readFile } = require("../googleCalendar");

/**
 * Authorizes from LocalStorage in frontend
 */
router.post("/authorize", function (req, res, next) {
  const body = req.body;

  readFile(USER_CREDENTIALS_PATH).then((content) => {
    const credentials = JSON.parse(content);
    let errors = {
      username: null,
      password: null,
    };
    let response = {};

    if (credentials.username !== body.username) {
      errors.username = "Invalid username";
    }
    if (credentials.password !== body.password) {
      errors.password = "Invalid password";
    }

    if (errors.username || errors.password) {
      response = {
        authorized: false,
        errors,
      };
    } else {
      response = {
        authorized: true,
      };
    }

    res.send(response);
  });
});

router.post("/register", function (req, res, next) {
  fs.writeFile(USER_CREDENTIALS_PATH, JSON.stringify(req.body), (err) => {
    if (err) return console.error(`🔥 ${err}`);
    console.log("✅  User credentials saved to: ", USER_CREDENTIALS_PATH);
    console.log(req.body.username);
    res.send(req.body.username);
  });
});

router.delete("/", function (req, res, next) {
  fs.unlink(USER_CREDENTIALS_PATH, (err) => {
    if (err) {
      console.log("🔥 Error: credendials file doesn't exist.");
      res.status(500).send({ error: "credentials file not found" });
      return;
    }

    res.send("User credentials removed");
  });
});

module.exports = router;
