const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
  pin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = {Test};
