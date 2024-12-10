const mongoose = require("mongoose");
const { username, password, projectname } = require("./config.json");

const mongoURL = `mongodb+srv://${username}:${password}@cluster0.j5wvs.mongodb.net/${projectname}?retryWrites=true&w=majority`;

const Student = require("./api/students/student.model");
const Professor = require("./api/professors/professor.model");

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Dummy Data
const students = [
  {
    username: "student1",
    email: "student1@mail.com",
    password: "test123", // Plaintext for testing only
    major: "Computer Science",
    status: "freshman",
  },
  {
    username: "student2",
    email: "student2@mail.com",
    password: "test123",
    major: "Mathematics",
    status: "junior",
  },
];

const professors = [
  {
    name: "Dr. Smith",
    email: "drsmith@mail.com",
    password: "test123",
    degree: "PhD",
    department: "Computer Science",
  },
  {
    name: "Dr. Johnson",
    email: "drjohnson@mail.com",
    password: "test123",
    degree: "PhD",
    department: "Mathematics",
  },
];

// Insert Dummy Data
const insertData = async () => {
  try {
    await Student.insertMany(students);
    console.log("Successfully inserted student data.");

    await Professor.insertMany(professors);
    console.log("Successfully inserted professor data.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

// Run the Script
(async () => {
  await connectDB();
  await insertData();
})();
