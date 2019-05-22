const { mongoose, uniqueValidator } = require("../config/packagerequirement");

const playerSchema = new mongoose.Schema({
  rank: {
    type: Number
  },
  playerName: {
    type: String
  },
  team: {
    type: String
  },
  price: {
    type: Number
  },
  gamePlayed: {
    type: Number
  },
  totalPoint: {
    type: Number
  },
  averagePoint: {
    type: Number
  },
  value: {
    type: Number
  },
  img: {
    type: String,
    default:
      "https://4.bp.blogspot.com/-zKaLdtxHmH0/XNfK7Rve0YI/AAAAAAAACvk/2ZrpCCQ0bgooCN8Qf4_qthNactLGbFopwCLcBGAs/s1600/default.jpg"
  }
});

playerSchema.plugin(uniqueValidator);

module.exports = {
  playerSchema,
  Player: mongoose.model("player", playerSchema)
};
