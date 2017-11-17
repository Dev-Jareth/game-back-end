var io = require("socket.io")(3300);
io.sockets.on("connection", socket => {
  console.log("Socket connected: ", socket.id);

  socket.on("clientPlayerMove", packet => {
    console.log("ClientMove:", packet);
    socket.emit("serverPlayerMove",packet)
  });
});
