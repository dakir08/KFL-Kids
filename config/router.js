const {
  express,
  helmet,
  cors,
  compression,
  bodyParser
} = require("./packagerequirement");
const users = require("../routes/users");
const login = require("../routes/login");
const players = require("../routes/players");
const { errorMessage } = require("../config/custommiddleware");

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(express.static("public"));
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use("/api/players", players);
  app.use(errorMessage);
};
