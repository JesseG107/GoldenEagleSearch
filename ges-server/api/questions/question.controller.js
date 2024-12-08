const Question = require("./question.model");
const Answer = require("../answers/answer.model");
const Course = require("../courses/course.model");

const addAnswerByProfessor = async (req, res) => {
  const { question_id } = req.params;
  const { answerText } = req.body;
  const { id: professor_id } = req.user; // Extract professor ID from token

  if (!answerText) {
    return res.status(400).json({ error: "Answer text is required." });
  }

  try {
    const question = await Question.findById(question_id);
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    // Validate professor teaches the course
    const course = await Course.findById(question.course_id);
    if (
      !course ||
      !course.professors.some((prof) => prof.equals(professor_id))
    ) {
      return res.status(403).json({
        error: "You are not authorized to answer questions for this course.",
      });
    }

    // Save the answer
    const newAnswer = new Answer({
      answerText,
      question_id,
      responder_id: professor_id,
      responderRole: "Professor",
    });

    const savedAnswer = await newAnswer.save();

    // Link answer to the question
    question.answers.push(savedAnswer._id);
    await question.save();

    res.status(201).json(savedAnswer);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

module.exports = { addAnswerByProfessor };
