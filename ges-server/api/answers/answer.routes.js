const router = require("express").Router();
const controller = require("./answer.controller");
const { verifyToken } = require("../../middleware/authorization");

router.post("/", verifyToken, controller.createAnswer);
router.get("/:question_id", controller.getAnswersByQuestion);
router.delete("/:id", verifyToken, controller.deleteAnswer);

module.exports = router;
