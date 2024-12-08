const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    reviewText: {
      type: String,
      required: true,
      trim: true,
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    professor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professor",
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Virtual to reference associated data, if needed in the future
ReviewSchema.virtual("studentDetails", {
  ref: "Student",
  localField: "student_id",
  foreignField: "_id",
});

ReviewSchema.virtual("courseDetails", {
  ref: "Course",
  localField: "course_id",
  foreignField: "_id",
});

ReviewSchema.virtual("professorDetails", {
  ref: "Professor",
  localField: "professor_id",
  foreignField: "_id",
});

// Example of a hook to handle cascading deletions (if needed later)
ReviewSchema.post("findOneAndDelete", async function (doc) {
  // Placeholder: Add logic if other data needs to be removed when a review is deleted
  console.log(`Review with ID ${doc._id} was deleted.`);
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
