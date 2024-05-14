const server = require("./app");

module.exports = (server) => {
  const user = {};
  const rooms = {};

  const io = require("socket.io")(server, {
    pingTimeout: 6000,
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("Connected to socket");

    socket.on("setup", (userId) => {
      socket.join(userId);
      user[socket.id] = userId._id;
      socket.emit("userJoined", userId);
      console.log("Socket User Connected", userId);
    });

    socket.on("chatRoom", (roomId) => {
      socket.join(roomId._id);
      rooms[socket.id] = roomId._id;
      console.log("Chat room creted" + roomId._id);
    });
    socket.on("videocall", (message) => {
      console.log("Event from video call emitter", message);
    });
    socket.on("voiceCall", (callDetails) => {
      console.log("Voice call ", callDetails);
      socket.in(callDetails?.to).emit("IncomingVoiceCall", callDetails);
    });
  });
};
