// import
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.set("view engine", "ejs");

// index page
app.get("/", (req, res) => {
  res.render("pages/index");
});

// port no
const port = process.env.PORT || 4000;
// port connection
server.listen(port, () => {
  console.log(`Server running... on ${port} port`);
});

io.on("connection", (socket) => {
  console.log("User connected " + socket.id);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});
