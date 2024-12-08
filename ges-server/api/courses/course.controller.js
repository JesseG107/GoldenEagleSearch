const Course = require("./course.model");

// Get all courses with optional populated professors and reviews
const getAllCourses = async (req, res) => {
  const { query } = req;

  const includeProfessors = query.includeProfessors === "true";
  const includeReviews = query.includeReviews === "true";

  try {
    let queryBuilder = Course.find();

    if (includeProfessors) {
      queryBuilder = queryBuilder.populate(
        "professors",
        "name email department"
      );
    }

    if (includeReviews) {
      queryBuilder = queryBuilder.populate("reviews", "reviewText student_id");
    }

    const courses = await queryBuilder;
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Get a specific course by ID with optional populated professors and reviews
const getCourseById = async (req, res) => {
  const { id } = req.params;
  const { query } = req;

  const includeProfessors = query.includeProfessors === "true";
  const includeReviews = query.includeReviews === "true";
  const includeQuestions = query.includeQuestions === "true";

  try {
    let queryBuilder = Course.findById(id);

    if (includeProfessors) {
      queryBuilder = queryBuilder.populate(
        "professors",
        "name email department"
      );
    }

    if (includeReviews) {
      queryBuilder = queryBuilder.populate("reviews", "reviewText student_id");
    }

    if (includeQuestions) {
      queryBuilder = queryBuilder.populate(
        "questions",
        "questionText student_id"
      );
    }

    const course = await queryBuilder;

    if (!course) {
      return res.status(404).json({ error: `No course found with ID: ${id}` });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  const { name, description, department, prerequisites, capacity, professors } =
    req.body;

  if (!name || !department || !capacity) {
    return res.status(400).json({
      error: 'Fields "name", "department", and "capacity" are required',
    });
  }

  try {
    const newCourse = new Course({
      name,
      description,
      department,
      prerequisites: prerequisites || [],
      capacity,
      professors: professors || [],
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Update an existing course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: `No course found with ID: ${id}` });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findOneAndDelete({ _id: id });
    if (!deletedCourse) {
      return res.status(404).json({ error: `No course found with ID: ${id}` });
    }
    res.json({ message: "Course successfully deleted", removed: id });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
