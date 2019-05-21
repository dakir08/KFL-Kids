const {
  mongoose,
  uniqueValidator,
  jwt
} = require("../config/packagerequirement");
const { JWTKEY } = require("../config/envconfig");

const userSchema = new mongoose.Schema({
  userName: {
    type: String
  },
  userAccount: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: [60, "This is Hashed password"],
    maxlength: 60
  },
  teamName: {
    type: String
  },
  DOB: {
    type: String
  },
  isUnder18: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    {
      id: this._id,
      userAccount: this.userAccount,
      email: this.email,
      password: this.password,
      teamName: this.teamName,
      DOB: this.DOB,
      isUnder18: this.isUnder18,
      isAdmin: this.isAdmin
    },
    JWTKEY
  );
};

userSchema.plugin(uniqueValidator);

module.exports = {
  userSchema,
  User: mongoose.model("user", userSchema)
};
