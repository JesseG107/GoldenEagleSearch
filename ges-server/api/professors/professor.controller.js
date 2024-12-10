const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Professor = require("./professor.model");
const Course = require("../courses/course.model");
const config = require("../../config.json"); // Import the config file

// Register a new professor
const registerProfessor = async (req, res) => {
  const { name, email, password, degree, department, coursesTaught } = req.body;

  if (!name || !email || !password || !degree || !department) {
    return res.status(400).json({
      error:
        "All fields (name, email, password, degree, department) are required.",
    });
  }

  try {
    const existingProfessor = await Professor.findOne({ email });
    if (existingProfessor) {
      return res
        .status(400)
        .json({ error: `Professor with email ${email} already exists.` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const professor = new Professor({
      name,
      email,
      password: hashedPassword,
      degree,
      department,
      coursesTaught: coursesTaught || [],
    });

    const savedProfessor = await professor.save();
    res.status(201).json({
      message: "Professor registered successfully",
      id: savedProfessor._id,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Login a professor
const loginProfessor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required." });
  }

  try {
    const professor = await Professor.findOne({ email: email.toLowerCase() });
    if (!professor) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, professor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: professor._id, email: professor.email, role: "professor" },
      config.jwtsecret,
      { expiresIn: "24h" }
    );

    res
      .header("Authorization", `Bearer ${token}`)
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Get all professors with their courses
const getAllProfessors = async (req, res) => {
  try {
    const professors = await Professor.find().populate({
      path: "coursesTaught",
      select: "name description department capacity",
    });
    res.json(professors);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Get a single professor by ID with their courses
const getProfessorById = async (req, res) => {
  const { id } = req.params;

  try {
    const professor = await Professor.findById(id).populate({
      path: "coursesTaught",
      select: "name description department capacity",
    });

    if (!professor) {
      return res
        .status(404)
        .json({ error: `No professor found with ID: ${id}` });
    }

    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Update a professor's information
const updateProfessor = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (updateData.password) {
      delete updateData.password; // Prevent password updates
    }

    const updatedProfessor = await Professor.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate({
      path: "coursesTaught",
      select: "name description department capacity",
    });

    if (!updatedProfessor) {
      return res
        .status(404)
        .json({ error: `No professor found with ID: ${id}` });
    }

    res.json(updatedProfessor);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Add a course to professor's list of courses taught
const addCourseToProfessor = async (req, res) => {
  const { id } = req.params; // Professor ID
  const { courseId } = req.body; // Course ID to add

  try {
    const professor = await Professor.findById(id);
    if (!professor) {
      return res.status(404).json({ error: "Professor not found." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    // Add course if not already added
    if (!professor.coursesTaught.includes(courseId)) {
      professor.coursesTaught.push(courseId);
      await professor.save();
    }

    res
      .status(200)
      .json({ message: "Course added to professor successfully", professor });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Delete a professor
const deleteProfessor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProfessor = await Professor.findByIdAndDelete(id);
    if (!deletedProfessor) {
      return res
        .status(404)
        .json({ error: `No professor found with ID: ${id}` });
    }

    res.json({ message: "Professor successfully deleted", removed: id });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  registerProfessor,
  loginProfessor,
  getAllProfessors,
  getProfessorById,
  updateProfessor,
  addCourseToProfessor,
  deleteProfessor,
};
