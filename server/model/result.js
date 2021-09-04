const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  pin: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = {Result};
