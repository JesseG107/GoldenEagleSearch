const Answer = require("./answer.model");
const Question = require("../questions/question.model");

// Create a new answer
const createAnswer = async (req, res) => {
  const { answerText, question_id } = req.body;
  const { id: responder_id, role: responderRole } = req.user; // Extract from token

  if (!answerText || !question_id) {
    return res
      .status(400)
      .json({ error: "Answer text and question ID are required." });
  }

  try {
    const question = await Question.findById(question_id).populate("course_id");
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    // If responder is a professor, ensure they are teaching the course
    if (responderRole === "Professor") {
      const teachesCourse = question.course_id.professors.some((prof) =>
        prof.equals(responder_id)
      );
      if (!teachesCourse) {
        return res.status(403).json({ error: "You do not teach this course." });
      }
    }

    const newAnswer = new Answer({
      answerText,
      question_id,
      responder_id,
      responderRole,
    });

    const savedAnswer = await newAnswer.save();
    await Question.findByIdAndUpdate(question_id, {
      $push: { answers: savedAnswer._id },
    });

    res.status(201).json(savedAnswer);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Get all answers for a specific question
const getAnswersByQuestion = async (req, res) => {
  const { question_id } = req.params;

  try {
    const answers = await Answer.find({ question_id }).populate(
      "student_id",
      "username major status"
    );
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Delete an answer
const deleteAnswer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnswer = await Answer.findByIdAndDelete(id);
    if (!deletedAnswer) {
      return res.status(404).json({ error: `No answer found with ID: ${id}` });
    }

    // Remove the answer reference from the related question
    await Question.findByIdAndUpdate(deletedAnswer.question_id, {
      $pull: { answers: id },
    });

    res.json({ message: "Answer successfully deleted", removed: id });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  createAnswer,
  getAnswersByQuestion,
  deleteAnswer,
};
