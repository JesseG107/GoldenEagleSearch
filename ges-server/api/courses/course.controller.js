const Course = require("./course.model");
const Professor = require("../professors/professor.model");

// Get all courses with optional populated professors and reviews
const getAllCourses = async (req, res) => {
  try {
    // Fetch all courses
    const courses = await Course.find().populate(
      "professors",
      "name email degree department"
    );
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  getAllCourses,
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

  try {
    // Create the course
    const newCourse = new Course({
      name,
      description,
      department,
      prerequisites,
      capacity,
      professors,
    });

    const savedCourse = await newCourse.save();

    // Update each professor's coursesTaught array
    if (professors && professors.length > 0) {
      await Promise.all(
        professors.map(async (professorId) => {
          await Professor.findByIdAndUpdate(
            professorId,
            { $push: { coursesTaught: savedCourse._id } },
            { new: true }
          );
        })
      );
    }

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
