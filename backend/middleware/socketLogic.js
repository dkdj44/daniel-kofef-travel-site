const io = require("socket.io");

let socketsManager;

function start(listener) {
  // Connect once to socket.io library:
  socketsManager = io(listener, { cors: { origin: "http://localhost:3000" } });
  // socketsManager = io(listener, { cors: { origin: "*" } });

  // Listen to any client connection:
  socketsManager.sockets.on("connection", (socket) => {
    console.log("One client has been connected.");

    socket.on("disconnect", () => {
      console.log("One client disconnect.");
    });

    socket.on("admin-updated-vacation", (vacation) => {
      socketsManager.sockets.emit("updated-vacation-from-server", vacation);
    });
  });
}

module.exports = {
  start,
};
