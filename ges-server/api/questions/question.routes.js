const router = require("express").Router();
const controller = require("./question.controller");
const { verifyToken, isProfessor } = require("../../middleware/authorization");

// Allow professors to answer questions
router.post(
  "/:question_id/answer",
  verifyToken,
  isProfessor, // Ensure the user is a professor
  controller.addAnswerByProfessor
);

module.exports = router;
