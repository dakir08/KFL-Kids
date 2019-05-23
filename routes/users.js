const { express, bcrypt, _ } = require("../config/packagerequirement");
const router = express.Router();
const { User } = require("../models/user");
const { Player } = require("../models/player");
const cMiddleware = require("../config/custommiddleware");
const {
  validateUserModify,
  validateUserRegister
} = require("../modules/validation");
const { formatDate } = require("../modules/customfunction");

router.get("/", [cMiddleware.auth, cMiddleware.adminRole], async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.get("/:userAccount", cMiddleware.auth, async (req, res) => {
  const userAccount = req.params.userAccount;
  const user = await User.findOne({ userAccount: userAccount });
  if (!user) return res.status(404).send("Cannot find user");
  res.send(user);
});

//Addplayer for collection

router.put("/collection/:userAccount", cMiddleware.auth, async (req, res) => {
  //Find user
  const user = await User.findOne({ userAccount: req.params.userAccount });
  if (!user) return res.status(404).send("Cannot find user");
  console.log(req.body);
  if (!req.body.players) res.status(500).send("There is no player to select");
  const playersArray = req.body.players;

  for (let playerId of playersArray) {
    console.log(playerId);
    const player = await Player.findOne({ _id: playerId });
    if (user.players.length === 5)
      return res.status(500).send("you can add only 5 players");
    else if (_.findIndex(user.players, { _id: player._id }) == -1)
      user.players.push(player);
  }

  user.save();
  res.send(user);

  //   try {
  //     user.players.concat(playersArray);
  //     user.save();
  //   } catch (error) {
  //     res.status(400).send(error.message);
  //   }
});

router.delete(
  "/collection/:userAccount",
  cMiddleware.auth,
  async (req, res) => {
    //Find user
    const user = await User.findOne({ userAccount: req.params.userAccount });
    if (!user) return res.status(404).send("Cannot find user");

    if (!req.body.players) res.status(400).send("There is no player to select");
    const playersArray = req.body.players;

    playersArray.forEach(async playerId => {
      let isDuplicatePlayer = false;
      const player = await Player.findOne({ _id: playerId });
      const index = _.findIndex(user.players, { _id: player._id });
      user.players.splice(index, 1);

      console.log(_.findIndex(user.players, { _id: player._id }));
    });
    user.save();
    res.send(user);

    //   try {
    //     user.players.concat(playersArray);
    //     user.save();
    //   } catch (error) {
    //     res.status(400).send(error.message);
    //   }
  }
);

//Register user
router.post("/", async (req, res) => {
  //validate
  if (req.body.DOB) {
    console.log(formatDate(req.body.DOB));
  }
  const { error } = validateUserRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Create password
  const hashedPassword = await bcrypt.hash(req.body.password, 7);

  //insert

  try {
    const newUser = new User({
      userName: req.body.userName,
      userAccount: req.body.userAccount,
      email: req.body.email,
      password: hashedPassword,
      teamName: req.body.teamName,
      DOB: req.body.DOB,
      isOver18: req.body.isUnder18
    });
    await newUser.save();
    //Create Token
    const token = newUser.generateAuthToken();
    res
      .header("x-header-token", token)
      .send({ token: token, time: 600, status: "Register sucessful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:userAccount", async (req, res) => {
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 7);
  }

  const userAccount = req.params.userAccount;
  const user = await User.findOne({ userAccount: userAccount });
  if (!user) return res.status(404).send("Cannot find user");

  const { error } = validateUserModify(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const modifyUser = await User.update(
      { userAccount: userAccount },
      req.body
    );
    res.send(modifyUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete(
  "/:userAccount",
  [cMiddleware.auth, cMiddleware.adminRole],
  async (req, res) => {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 7);
    }

    const userAccount = req.params.userAccount;
    const user = await User.findOne({ userAccount: userAccount });
    if (!user) return res.status(404).send("Cannot find user");
    try {
      const deleteUser = await User.findOneAndDelete({
        userAccount: userAccount
      });
      res.send(deleteUser);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

module.exports = router;
