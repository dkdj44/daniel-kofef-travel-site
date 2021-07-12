const dal = require("../data-access-layer/dal");
const uuid = require("uuid");
const path = require("path");
const imageHelper = require("../helpers/safe-delete");

// get how much followers are for the vacation
async function getAllFollowersAsync(uuid) {
  const sql = `SELECT COUNT(*) as totalFollowers FROM followers WHERE vacationUuid = ?
  `;
  const totalFollwers = await dal.executeAsync(sql, [uuid]);
  return totalFollwers;
}
// get all the vacations
async function getAllVacationAsync() {
  const sql = `SELECT * FROM vacations`;
  const vacations = await dal.executeAsync(sql);

  return vacations;
}

async function getOneVacation(uuid) {
  const sql = `SELECT * FROM vacations WHERE vacationUuid =?`;
  const vacation = await dal.executeAsync(sql, [uuid]);
  return vacation[0];
}
// add new vacation into the DB
async function addNewVacationAsync(vacation, image) {
  vacation.vacationUuid = uuid.v4();

  const uploadedImageName = vacation.vacationUuid + ".jpg";
  vacation.imageName = uploadedImageName;

  const absolutePath = path.join(__dirname, "..", "images", uploadedImageName);
  await image.mv(absolutePath);

  const sql = `INSERT INTO vacations  VALUES (?, ? , ? , ?, ?  , ? , ? )`;

  const info = await dal.executeAsync(sql, [
    vacation.vacationUuid,
    vacation.destination,
    vacation.vactionStart,
    vacation.vactaionEnds,
    vacation.price,
    vacation.description,
    vacation.imageName,
  ]);
  vacation.vacationUuid = info.insertedId;

  return vacation;
}
// update the vacation
async function updateVacationAsync(vacation) {
  const sql = `UPDATE vacations SET
  destination = ?, 
  price = ?  ,
  description = ? , 
  vactionStart = ? , 
  vactaionEnds = ? ,
  imageName = ?
  WHERE vacationUuid = ? `;

  const info = await dal.executeAsync(sql, [
    vacation.destination,
    vacation.price,
    vacation.description,
    vacation.vactionStart,
    vacation.vactaionEnds,
    vacation.imageName,
    vacation.vacationUuid,
  ]);

  return info.affectedRows === 0 ? null : vacation;
}
// update the vacation partially
async function updatePartialVacationAsync(vacation, image) {
  if (image) {
    const uploadedImageName = vacation.vacationUuid + ".jpg";
    vacation.imageName = uploadedImageName;
    const absolutePath = path.join(
      __dirname,
      "..",
      "images",
      uploadedImageName
    );
    await image.mv(absolutePath);
  }
  const vacationToUpdate = await getOneVacation(vacation.vacationUuid);
  if (!vacationToUpdate) return null;
  // loop to check what props was send what was not send will remain the same as before
  for (const prop in vacation)
    if (vacation[prop] !== "") {
      vacationToUpdate[prop] = vacation[prop];
    }
  return await updateVacationAsync(vacationToUpdate);
}
// delete the vacation from the DB
async function deleteVacationAsync(uuid) {
  // delete all the followers for that vacation
  deleteAllFollowersFromVacation(uuid);
  const sql = `DELETE FROM vacations WHERE vacations.vacationUuid = ?`;
  await dal.executeAsync(sql, [uuid]);
  const fileName = uuid + ".jpg";

  const absolutePath = path.join(__dirname, "..", "images", fileName);
  imageHelper.safeDelete(absolutePath);
}
// delete followers for that vacation
async function deleteAllFollowersFromVacation(uuid) {
  const sql = `DELETE FROM followers WHERE vacationUuid = ?`;
  await dal.executeAsync(sql, [uuid]);
}

module.exports = {
  getAllVacationAsync,
  addNewVacationAsync,
  deleteVacationAsync,
  updatePartialVacationAsync,
  getAllFollowersAsync,
};
