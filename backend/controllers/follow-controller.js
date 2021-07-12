const express = require("express");
const userLogic = require("../bussiness-logic/followers-logic");
const router = express.Router();
const errorHandler = require("../helpers/error-handler");

router.get("/:uuid", async (req, res) => {
  try {
    const uuid = +req.params.id;
    const user = await userLogic.getUserById(uuid);
    res.json(user);
  } catch (err) {
    res.status(401).send(errorHandler.getError(err));
  }
});
// delete or add a new follower for vacation
router.delete("/:userUuid/:vacationUuid", async (req, res) => {
  try {
    const vacationUuid = req.params.vacationUuid;
    const userUuid = req.params.userUuid;
    await userLogic.deleteUserFollowAsync(userUuid, vacationUuid);
    res.status(204).send("removed User follow or added");
  } catch (err) {
    res.status(500).send(errorHandler.getError(err));
  }
});
module.exports = router;
