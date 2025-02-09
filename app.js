const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const PORT = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("send-location", (data) => {
        io.emit("recieve-location", {id: socket.id, ...data});
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(PORT, () => {
    console.log("Server connected", PORT);
});