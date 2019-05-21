const express = require("express");
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const helmet = require("helmet");
const compression = require("compression");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const winston = require("winston");
const _ = require("lodash");
const path = require("path");
const bodyParser = require("body-parser");
var uniqueValidator = require("mongoose-unique-validator");

module.exports = {
  express,
  Joi,
  mongoose,
  uniqueValidator,
  helmet,
  compression,
  jwt,
  bcrypt,
  cors,
  winston,
  _,
  bodyParser,
  path
};
