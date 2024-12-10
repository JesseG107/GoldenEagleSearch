const router = require("express").Router();
const controller = require("./question.controller");
const { verifyToken, isProfessor } = require("../middleware/authorization");

// Professors can answer questions
router.post(
  "/:question_id/answer",
  verifyToken,
  isProfessor, // Ensure the user is a professor
  controller.addAnswerByProfessor
);

// Students can create questions
router.post("/", controller.createQuestion);

// Retrieve questions
router.get("/", controller.getAllQuestions);
router.get("/:id", controller.getQuestionById);

// Delete a question
router.delete("/:id", controller.deleteQuestion);

module.exports = router;
