const dal = require("../data-access-layer/dal");
const uuid = require("uuid");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");

// register the user into DB with uuid and hashed and salted password
async function registerUserAsync(user) {
  user.password = cryptoHelper.hash(user.password);
  user.userUuid = uuid.v4();
  const sql = `INSERT INTO users (userUuid , userName , firstName , lastName , password) VALUES( ?, ?, ?, ?, ? )`;

  const info = await dal.executeAsync(sql, [
    user.userUuid,
    user.userName,
    user.firstName,
    user.lastName,
    user.password,
  ]);

  delete user.password;

  user.token = jwtHelper.getNewToken(user);

  return user;
}
// check if login params are correct and return the user
async function loginAsync(credentials) {
  credentials.password = cryptoHelper.hash(credentials.password);
  const sql = `SELECT userUuid , userName , firstName , lastName ,isAdmin  FROM users WHERE password = ? AND userName = ?`;
  const users = await dal.executeAsync(sql, [
    credentials.password,
    credentials.userName,
  ]);
  if (users.length === 0) return null;

  const user = users[0];

  user.token = jwtHelper.getNewToken(user);
  return user;
}

module.exports = { registerUserAsync, loginAsync };
