const router = require("express").Router();
const controller = require("./student.controller");
const middleware = require("../middleware/authorization");

// Fetch all students
router.get("/", controller.getStudents);

// Fetch a single student by ID
router.get("/:id", controller.getStudentById);

// Register a new student
router.post("/register", controller.registerStudent);

// Student login
router.post("/login", controller.loginStudent);

// Update student details
router.put("/:id", middleware.verifyToken, controller.updateStudent);

module.exports = router;
