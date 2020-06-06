const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on('connection', (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on('play/pause', (msg) => {
    console.log("play/pause: ", msg);
    io.emit('play/pause', msg);
  });
});




server.listen(port, () => console.log(`Listening on port ${port}`));