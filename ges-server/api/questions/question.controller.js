const Question = require("./question.model");
const Answer = require("../answers/answer.model");
const Course = require("../courses/course.model");

// Students can create a question
const createQuestion = async (req, res) => {
  const { questionText, student_id, course_id } = req.body;

  if (!questionText || !student_id || !course_id) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    const newQuestion = new Question({
      questionText,
      student_id,
      course_id,
    });

    const savedQuestion = await newQuestion.save();
    res
      .status(201)
      .json({
        message: "Question created successfully",
        question: savedQuestion,
      });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Professors can answer a question
const addAnswerByProfessor = async (req, res) => {
  const { question_id } = req.params;
  const { answerText } = req.body;
  const { id: professor_id } = req.user; // Extract professor ID from token

  if (!answerText) {
    return res.status(400).json({ error: "Answer text is required." });
  }

  try {
    const question = await Question.findById(question_id).populate("course_id");
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    // Check if the professor teaches this course
    const course = question.course_id;
    const teachesCourse = course.professors.some((prof) =>
      prof.equals(professor_id)
    );
    if (!teachesCourse) {
      return res
        .status(403)
        .json({ error: "You are not authorized to answer this question." });
    }

    // Save the answer
    const newAnswer = new Answer({
      answerText,
      question_id,
      responder_id: professor_id,
      responderRole: "Professor",
    });

    const savedAnswer = await newAnswer.save();

    // Link the answer to the question
    question.answers.push(savedAnswer._id);
    await question.save();

    res
      .status(201)
      .json({ message: "Answer added successfully", answer: savedAnswer });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Fetch all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("student_id", "username")
      .populate("answers");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Fetch a question by ID
const getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id)
      .populate("student_id", "username")
      .populate("answers");
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found." });
    }
    res.json({ message: "Question deleted successfully", removed: id });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  createQuestion,
  addAnswerByProfessor,
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
};
