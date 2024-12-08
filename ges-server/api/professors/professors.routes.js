const router = require("express").Router();
const controller = require("./professor.controller");

router.post("/register", controller.registerProfessor);
router.post("/login", controller.loginProfessor);
router.get("/", controller.getAllProfessors);
router.get("/:id", controller.getProfessorById);
router.put("/:id", controller.updateProfessor);
router.put("/:id/add-course", controller.addCourseToProfessor); // Add course to professor
router.delete("/:id", controller.deleteProfessor);

module.exports = router;
