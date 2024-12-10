// 1. run: npm install
// 2. use: the thunder client JSON file and import into Thunder Client Collections
// 3. run: npm run start

const express = require("express");
const cors = require("cors");
const mongo = require("./mongo/index"); // MongoDB connection utility
const app = express();

const PORT = 8080;
const options = { exposedHeaders: ["Authorization"] };

// Middleware
app.use(cors(options));
app.use(express.json());

// Require in resource routes
const students = require("./api/students/student.routes.js");
const professors = require("./api/professors/professor.routes.js");
const reviews = require("./api/reviews/reviews.routes.js");
const courses = require("./api/courses/courses.routes.js");
//const questions = require("./api/questions/questions.routes.js");
const question = require("./api/questions/question.routes");
const answers = require("./api/answers/answer.routes.js");

// Add the resource routes to our express app
// API endpoints:
// localhost:8080/students
app.use("/students", students);
// localhost:8080/professors
app.use("/professors", professors);
// localhost:8080/reviews
app.use("/reviews", reviews);
// localhost:8080/courses
app.use("/courses", courses);
// localhost:8080/questions
//app.use("/questions", questions);
// localhost:8080/answers
app.use("/answers", answers);

// Start server and connect to MongoDB
app.listen(PORT, async () => {
  try {
    await mongo.connectDB(); // Connect to MongoDB
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
  }
});
