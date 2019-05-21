const { winston } = require("./packagerequirement");
require("winston-mongodb");
require("express-async-errors");
module.exports = function() {
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: false
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/KFL",
      level: "info"
    })
  );

  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtException.log" })
  );

  process.on("uncaughtException", err => {
    console.log("UNCAUGHT EXCEPTION!!!!");
    winston.error(err.message);
  });

  process.on("unhandledRejection", err => {
    console.log("UNHANDLED REJECTION !!!!");
    winston.error(err.message);
  });
};
