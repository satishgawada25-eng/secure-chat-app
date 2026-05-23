const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("send-message", (data) => {
        socket.broadcast.emit("receive-message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});