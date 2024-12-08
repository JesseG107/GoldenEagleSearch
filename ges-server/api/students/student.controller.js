const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("./student.model");
const config = require("../../config.json");

// Fetch all students with optional query filters
const getStudents = async (req, res) => {
  const { username, major, status } = req.query;
  let filter = {};

  if (username) filter.username = { $regex: username, $options: "i" };
  if (major) filter.major = { $regex: major, $options: "i" };
  if (status) filter.status = status.toLowerCase();

  try {
    const students = await Student.find(filter)
      .select("-password")
      .populate({
        path: "reviews",
        select: "reviewText course_id",
        populate: {
          path: "course_id",
          select: "name professor_id",
          populate: { path: "professor_id", select: "name email" },
        },
      });

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Fetch a single student by ID with their reviews
const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id)
      .select("-password")
      .populate({
        path: "reviews",
        select: "reviewText course_id",
        populate: {
          path: "course_id",
          select: "name professor_id",
          populate: { path: "professor_id", select: "name email" },
        },
      });

    if (!student) {
      return res.status(404).json({ error: `No student found with ID: ${id}` });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Register a new student
const registerStudent = async (req, res) => {
  const { username, email, password, major, status } = req.body;

  if (!username || !email || !password || !major || !status) {
    return res.status(400).json({
      error:
        "All fields (username, email, password, major, status) are required",
    });
  }

  try {
    // Check for duplicate email or username
    const existingStudent = await Student.findOne({
      $or: [{ email }, { username }],
    });
    if (existingStudent) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create student
    const student = new Student({
      username,
      email,
      password: hashedPassword,
      major,
      status: status.toLowerCase(),
    });

    const savedStudent = await student.save();
    const response = savedStudent.toObject();
    delete response.password; // Do not expose the password
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Login a student
const loginStudent = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and Password are required." });
  }

  try {
    const student = await Student.findOne({ username: username.toLowerCase() });
    if (!student) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: student._id, username: student.username, role: "student" },
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

// Update a student's information
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // Prevent password updates via this endpoint
  if (updateData.password) delete updateData.password;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");
    if (!updatedStudent) {
      return res.status(404).json({ error: `No student found with ID: ${id}` });
    }
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  registerStudent,
  loginStudent,
  updateStudent,
};
