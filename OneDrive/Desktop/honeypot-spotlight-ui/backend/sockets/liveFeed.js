const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Dashboard connected");

    socket.on("disconnect", () => {
      console.log("Dashboard disconnected");
    });
  });
};

export default initSocket;
