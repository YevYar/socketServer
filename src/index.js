const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let lastUserId = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("a user connected");
  socket.emit("id", lastUserId++);
  socket.on("message", msg => {
    console.log(msg);
    socket.broadcast.emit("message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
