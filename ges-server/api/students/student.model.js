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
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
