global.config = require(process.env.NODE_ENV === "production"
  ? "./prod-config.json"
  : "./dev-conifg.json");
const vacationsController = require("./controllers/vacationController");
const followController = require("./controllers/follow-controller");
const express = require("express");
const fileUpload = require("express-fileupload");
const server = express();
const path = require("path");
const authController = require("./controllers/auth-controller");
socketLogic = require("./middleware/socketLogic");
const cors = require("cors");
const sanitize = require("./middleware/sanitize");

server.use(cors());
server.use(express.json());
server.use(fileUpload());

server.use(sanitize);
server.use(express.static(path.join(__dirname, "frontend")));

server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/user", followController);

server.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const listener = server.listen(3001, () =>
  console.log("listeing on port 3001")
);
socketLogic.start(listener);
