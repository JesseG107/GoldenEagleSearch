const Review = require("./review.model");
const mongoose = require("mongoose");

// Get all reviews with optional filtering by course or professor
const getReviews = async (req, res) => {
  const { query } = req;
  const course_id = query.course_id;
  const professor_id = query.professor_id;

  let filter = {};
  if (course_id) {
    filter.course_id = course_id;
  }
  if (professor_id) {
    filter.professor_id = professor_id;
  }

  try {
    const reviews = await Review.find(filter)
      .populate("studentDetails", "username major status")
      .populate("courseDetails", "title")
      .populate("professorDetails", "name email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// Get a single review by ID with optional details populated
const getReviewById = async (req, res) => {
  const { params, query } = req;
  const id = params.id;

  try {
    let review = await Review.findOne({ _id: id });
    if (review) {
      if (query.includeStudent) {
        review = await review.populate(
          "studentDetails",
          "username major status"
        );
      }
      if (query.includeCourse) {
        review = await review.populate("courseDetails", "title");
      }
      if (query.includeProfessor) {
        review = await review.populate("professorDetails", "name email");
      }
      res.json(review);
    } else {
      res.status(404).json({ error: `No review found with ID: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// Create a new review
const createReview = async (req, res) => {
  const { reviewText, student_id, course_id, professor_id } = req.body;

  if (!reviewText || !student_id || !course_id || !professor_id) {
    return res
      .status(400)
      .json({
        error:
          "All fields (reviewText, student_id, course_id, professor_id) are required",
      });
  }

  try {
    const reviewDoc = new Review({
      reviewText,
      student_id,
      course_id,
      professor_id,
    });
    const review = await reviewDoc.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findOneAndDelete({ _id: id });
    if (deletedReview) {
      res.json({
        message: "Review successfully deleted",
        review: deletedReview._id,
      });
    } else {
      res.status(404).json({ error: `No review found with ID: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  deleteReview,
};
