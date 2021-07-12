const logic = require("../bussiness-logic/auth-logic");
const svgCaptcha = require("svg-captcha");
const cryptoHelper = require("../helpers/crypto-helper");
const express = require("express");
const userModel = require("../models/userModel");
const errorHandler = require("../helpers/error-handler");

const router = express.Router();

// register the user into the DB
router.post("/register", async (req, res) => {
  try {
    const newUser = new userModel(req.body);

    const errors = newUser.validatePost();
    if (errors) {
      res.status(400).send(errorHandler.getError(errors));
      return;
    }

    const addedUser = await logic.registerUserAsync(newUser);
    res.status(201).json(addedUser);
  } catch (err) {
    res.status(500).send(errorHandler.getError(err));
  }
});
// route to login the user
router.post("/login", async (req, res) => {
  try {
    const loggedInUser = await logic.loginAsync(req.body);
    if (!loggedInUser)
      return res.status(401).send("incorrect username or password");
    res.json(loggedInUser);
  } catch (err) {
    res.status(500).send(errorHandler.getError(err));
  }
});

module.exports = router;
