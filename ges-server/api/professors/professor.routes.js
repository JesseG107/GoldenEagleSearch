const router = require("express").Router();
const controller = require("./professor.controller");

// POST /professor/register
router.post("/register", controller.registerProfessor);

// POST /professor/login
router.post("/login", controller.loginProfessor);

//
router.get("/", controller.getAllProfessors);

// GET /professor/:id
router.get("/:id", controller.getProfessorById);

// PUT /professor/:id
router.put("/:id", controller.updateProfessor);

// Add course to professor
router.put("/:id/add-course", controller.addCourseToProfessor);

router.delete("/:id", controller.deleteProfessor);

module.exports = router;
