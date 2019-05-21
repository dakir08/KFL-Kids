const { winston, mongoose } = require("./packagerequirement");
const { DB, DB_TEST } = require("./envconfig");
module.exports = function() {
  mongoose
    .connect(DB, { useNewUrlParser: true })
    .then(() => winston.info(`Connect to ${DB}`));
};
