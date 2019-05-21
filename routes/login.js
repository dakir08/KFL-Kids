const { express, bcrypt } = require("../config/packagerequirement");
const router = express.Router();
const { User } = require("../models/user");
const { validateUserLogin } = require("../modules/validation");

router.post("/", async (req, res) => {
  //validate
  //console.log(req.body);
  const { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ userAccount: req.body.userAccount });
    if (!user) return res.status(500).send("Wrong account or password");
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordMatched == false)
      return res.status(500).send("Wrong account or password");
    const token = user.generateAuthToken();
    res
      .header("x-token-auth", token)
      .send({ token: token, time: 600, status: "Login sucessful" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
