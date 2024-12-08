// MAIN ROUTER
const router = require("express").Router();
const controller = require("./student.controller");
const middleware = require("../middleware/authorization");

// Routes for students
router.get("/", controller.getStudents); // Fetch all students with optional filters
router.get("/:id", controller.getStudentById); // Fetch a student by ID
router.post("/register", controller.registerStudent); // Register a new student
router.post("/login", controller.loginStudent); // Student login
router.put("/:id", middleware.verifyToken, controller.updateStudent); // Update student details

module.exports = router;
