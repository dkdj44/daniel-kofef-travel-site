const dal = require("../data-access-layer/dal");

async function getUserById(uuid) {
  const sql = `SELECT firstName , lastName , userName FROM users WHERE userId = ?`;
  const user = await dal.executeAsync(sql, [uuid]);
  return user;
}
// an function to add the user to follow the vacation
async function addUserFollowAsync(userUuid, vacationUuid) {
  const sql = `INSERT INTO followers (vacationUuid , userUuid) VALUES (?, ?);`;
  await dal.executeAsync(sql, [vacationUuid, userUuid]);

  return;
}
// delete the follow from the vacation
async function deleteUserFollowAsync(userUuid, vacationUuid) {
  const sql = `DELETE FROM followers WHERE vacationUuid = ? AND userUuid = ?`;
  const info = await dal.executeAsync(sql, [vacationUuid, userUuid]);
  // if you dont find this user following this vacation add the user to follow it
  if (info.affectedRows === 0) {
    addUserFollowAsync(userUuid, vacationUuid);
  }
  return;
}
module.exports = { getUserById, deleteUserFollowAsync, addUserFollowAsync };
