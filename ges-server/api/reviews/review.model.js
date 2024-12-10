const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  targetName: { type: String, required: true, trim: true }, // Name of professor or course
  reviewText: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the review was created
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
