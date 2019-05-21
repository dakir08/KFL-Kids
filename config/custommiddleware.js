const auth = require("../middleware/auth");
const adminRole = require("../middleware/admin");
const errorMessage = require("../middleware/error");
//const asyncMiddleware = require('../middleware/async');

module.exports = {
  auth,
  adminRole,
  errorMessage
};
