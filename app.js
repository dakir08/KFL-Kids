//Setting up
const { express, winston, path } = require("./config/packagerequirement");
const app = express();
const { PORT } = require("./config/envconfig");

//require("./config/logging")();
require("express-async-errors");

require("./config/router")(app);
require("./config/db")();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/auth", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/auth.html"));
});

app.get("/logout", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/logout.html"));
});

app.get("/myteam", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/myteam.html"));
});

app.get("/dashboard", (req, res) => {
  // if (!token) return res.sendFile(path.join(__dirname + "/views/index.html"));
  res.sendFile(path.join(__dirname + "/views/dashboard.html"));
});
app.get("/qrcode", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/qrcode.html"));
});

app.listen(PORT, () => {
  winston.info(`listening on port ${PORT}`);
  //console.log(`listening on port ${PORT}`);
});
