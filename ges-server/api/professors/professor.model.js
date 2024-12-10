const mongoose = require("mongoose");

const ProfessorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    coursesTaught: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Course model
        ref: "Course",
      },
    ],
    ratings: {
      type: Number, // Single numeric rating (e.g., average rating)
      default: 0,
    },
    reviews: [
      {
        studentName: {
          type: String,
          required: true,
        },
        personalRating: {
          type: String, // Individual rating given by the student
          required: true,
          min: 1, // Minimum rating value
          max: 5, // Maximum rating value
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Virtual to populate courses taught by the professor
ProfessorSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "professors",
});

const Professor = mongoose.model("Professor", ProfessorSchema);

module.exports = Professor;
