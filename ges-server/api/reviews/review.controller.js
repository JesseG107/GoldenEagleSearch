const Review = require("./review.model");
const mongoose = require("mongoose");

// Create a new review
const createReview = async (req, res) => {
  const { targetName, reviewText, rating } = req.body;

  // Validate input
  if (!targetName || !reviewText || !rating) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Create a new review
    const newReview = new Review({ targetName, reviewText, rating });
    const savedReview = await newReview.save();

    res.status(201).json(savedReview); // Return the saved review
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Get all reviews
const getReviews = async (req, res) => {
  try {
    // Fetch all reviews
    const reviews = await Review.find({});
    res.status(200).json(reviews); // Return the list of reviews
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

module.exports = {
  createReview,
  getReviews,
};
