const { winston } = require("../config/packagerequirement");
module.exports = function(err, req, res, next) {
  // winston.error(err.message);
  //res.status(500).send('Could not get players!!!!');
  console.log(err.message);
};
