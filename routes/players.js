const { express, mongoose, _ } = require("../config/packagerequirement");
const router = express.Router();
const { Player } = require("../models/player");

const cMiddleware = require("../config/custommiddleware");

router.get("/", cMiddleware.auth, async (req, res) => {
  //throw new Error("Could not get the players");
  const player = await Player.find().sort({ rank: 1 });
  res.send(player);
});

router.get("/:id", cMiddleware.auth, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id) == false)
    return res.status(400).send("Wrong id types");
  try {
    const player = await Player.findOne({ _id: req.params.id });

    if (!player) return res.status(404).send("cannot find players");
    res.send(player);
  } catch (error) {
    console.log(error.message);
  }
});

router.post(
  "/addplayer",
  [cMiddleware.auth, cMiddleware.adminRole],
  async (req, res) => {
    try {
      const newPlayer = new Player(
        _.pick(req.body, [
          "rank",
          "playerName",
          "team",
          "price",
          "gamePlayed",
          "totalPoint",
          "averagePoint",
          "value",
          "img"
        ])
      );
      await newPlayer.save();
      res.send(newPlayer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);
module.exports = router;
