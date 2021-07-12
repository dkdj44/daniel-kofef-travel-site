const express = require("express");
const verifyLoggedIn = require("../middleware/verify-LoggedIn");
const verifyAdmin = require("../middleware/verify-admin");
const vacationLogic = require("../bussiness-logic/vacation-logic");
const vacationModel = require("../models/vacationModel");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const errorHandler = require("../helpers/error-handler");

// get the image from the folder
router.get("/images/:name", (req, res) => {
  try {
    const name = req.params.name;
    let absolutePath = path.join(__dirname, "..", "images", name);
    if (!fs.existsSync(absolutePath)) {
      absolutePath = path.join(
        __dirname,
        "..",
        "images",
        "image-not-found.jpg"
      );
    }
    res.sendFile(absolutePath);
  } catch (err) {
    res.status(500).send(errorHandler.getError(err));
  }
});
// get total followers per vacation
router.get("/followers/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const totalFollwers = await vacationLogic.getAllFollowersAsync(uuid);
    res.json(totalFollwers);
  } catch (err) {
    res.status(500).send(errorHandler.getError(err));
  }
});
// block the routes from non logged in users
router.use(verifyLoggedIn);

// get all vacations
router.get("/", async (req, res) => {
  try {
    const vacations = await vacationLogic.getAllVacationAsync();
    res.json(vacations);
  } catch (err) {
    res.status(500).send(errorHandler.getError(err));
  }
});
// block the routes from users that are not admins
router.use(verifyAdmin);

// post a new vacation
router.post("/Admin", async (req, res) => {
  try {
    const vacation = new vacationModel(req.body);

    const errors = vacation.validatePost();
    if (errors) {
      res.status(400).send(errors);
      return;
    }

    if (req.files === undefined) {
      return res.status(400).send("missing image");
    }
    const image = req.files.vacationImageName;

    const addedVacation = await vacationLogic.addNewVacationAsync(
      vacation,
      image
    );
    res.status(200).send(addedVacation);
  } catch (err) {
    res.status(400).send(errorHandler.getError(err));
  }
});
// update an exsisting vacation
router.patch("/Admin/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const vacation = new vacationModel(req.body);

    vacation.vacationUuid = uuid;

    const errors = vacation.validatePatch();
    if (errors) {
      res.status(400).send(errors);
      console.log(errors);
      return;
    }
    const image =
      req.files && req.files.vacationImageName
        ? req.files.vacationImageName
        : null;
    const updatedVacation = await vacationLogic.updatePartialVacationAsync(
      vacation,
      image
    );
    if (!updatedVacation)
      return res.status(400).send("could not find the vacation");
    res.json(updatedVacation);
  } catch (err) {
    res.status(500).send(errorHandler.getError(err));
  }
});
// delete a vacation
router.delete("/Admin/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    await vacationLogic.deleteVacationAsync(uuid);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(errorHandler.getError(err));
  }
});

module.exports = router;
