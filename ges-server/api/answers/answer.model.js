const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answerText: {
    type: String,
    required: true,
    trim: true,
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  responder_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "responderRole", // Dynamically reference either Student or Professor
  },
  responderRole: {
    type: String,
    enum: ["Student", "Professor"], // Valid roles
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
