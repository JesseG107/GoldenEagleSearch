const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    prerequisites: {
      type: [String],
      default: [],
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    professors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professor",
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Virtual for reviews associated with this course
CourseSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "course_id",
});

// Virtual for questions associated with this course
CourseSchema.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "course_id",
});

// Post-hook to clean up reviews and questions when a course is deleted
CourseSchema.post("findOneAndDelete", async function (doc) {
  const Review = mongoose.model("Review");
  const Question = mongoose.model("Question");
  try {
    if (doc) {
      await Review.deleteMany({ course_id: doc._id });
      await Question.deleteMany({ course_id: doc._id });
      console.log(
        `All reviews and questions for course ${doc.name} have been deleted.`
      );
    }
  } catch (error) {
    console.log(
      `Error deleting associated reviews/questions: ${error.message}`
    );
  }
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
