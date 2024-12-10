const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String, // Add this field
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["freshman", "sophomore", "junior", "senior", "graduate"],
      lowercase: true,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review", // Reference to the Review model
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
