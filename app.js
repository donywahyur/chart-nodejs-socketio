const express = require("express");
const groupBy = require("json-groupby");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;
const model = require("./models/model");

//middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

//routing
app.get("/", (req, res) => {
  res.sendFile("public/views/index.html", { root: __dirname });
});

//just for test
app.get("/data", function (req, res) {
  const data = model.getData();
  const group = groupBy(data, ["jk"], ["nama"]);
  res.json(group);
});

//setup socket
io.on("connection", (socket) => {
  socket.on("join", () => {
    const data = model.getData();
    const group = groupBy(data, ["jk"], ["nama"]);
    io.emit("data", group);
  });
  socket.on("input", (param) => {
    model.simpanData(param.nama, param.jk);
    const data = model.getData();
    const group = groupBy(data, ["jk"], ["nama"]);
    io.emit("data", group);
  });
});

server.listen(port);
