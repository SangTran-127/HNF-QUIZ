const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  incorrect_answers: Array,
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = {Quiz};