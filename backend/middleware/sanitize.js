const stripTags = require("striptags"); // npm i striptags

function sanitize(req, res, next) {
  for (const prop in req.body) {
    if (typeof req.body[prop] === "string") {
      req.body[prop] = stripTags(req.body[prop]);
    }
  }
  next();
}

module.exports = sanitize;
