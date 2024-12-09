<template>
  <div class="courses-page">
    <h1>Courses</h1>

    <!-- Course List -->
    <div v-if="courses.length" class="course-list">
      <h2>Available Courses</h2>
      <ul>
        <li
          v-for="course in courses"
          :key="course._id"
          @click="selectCourse(course._id)"
        >
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
        </li>
      </ul>
    </div>
    <p v-else>Loading courses...</p>

    <!-- Selected Course Details -->
    <div v-if="selectedCourse" class="course-details">
      <h2>Course Details: {{ selectedCourse.name }}</h2>
      <p><strong>Description:</strong> {{ selectedCourse.description }}</p>
      <p><strong>Department:</strong> {{ selectedCourse.department }}</p>

      <!-- Reviews Section -->
      <h3>Reviews</h3>
      <ul v-if="reviews.length">
        <li v-for="review in reviews" :key="review._id">
          <p>
            <strong>Student:</strong>
            {{ review.studentDetails?.username || "N/A" }}
          </p>
          <p><strong>Review:</strong> {{ review.reviewText }}</p>
        </li>
      </ul>
      <p v-else>No reviews available for this course.</p>

      <!-- Questions and Answers -->
      <h3>Questions</h3>
      <ul v-if="questions.length">
        <li v-for="question in questions" :key="question._id">
          <p><strong>Question:</strong> {{ question.questionText }}</p>
          <ul>
            <li v-for="answer in question.answers" :key="answer._id">
              <p><strong>Answer:</strong> {{ answer.answerText }}</p>
              <p>
                <em>
                  By {{ answer.responderRole }}: {{ answer.responder_id }}
                </em>
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <p v-else>No questions posted for this course.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Courses",
  data() {
    return {
      courses: [],
      selectedCourse: null,
      reviews: [],
      questions: [],
    };
  },
  async created() {
    await this.fetchCourses();
  },
  methods: {
    // Fetch all courses
    async fetchCourses() {
      try {
        const response = await axios.get("http://localhost:8080/courses");
        this.courses = response.data;
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error.response?.data || error.message
        );
      }
    },

    // Fetch a specific course with its details
    async selectCourse(courseId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/${courseId}?includeReviews=true&includeQuestions=true`
        );
        this.selectedCourse = response.data;

        // Fetch reviews for the selected course
        const reviewsResponse = await axios.get(
          `http://localhost:8080/reviews?course_id=${courseId}`
        );
        this.reviews = reviewsResponse.data;

        // Fetch answers for each question
        const questionsWithAnswers = await Promise.all(
          this.selectedCourse.questions.map(async (question) => {
            const answersResponse = await axios.get(
              `http://localhost:8080/answers/${question._id}`
            );
            return { ...question, answers: answersResponse.data };
          })
        );
        this.questions = questionsWithAnswers;
      } catch (error) {
        console.error(
          "Error fetching course details:",
          error.response?.data || error.message
        );
      }
    },
  },
};
</script>

<style scoped>
.courses-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.course-list ul,
.course-details ul {
  list-style: none;
  padding: 0;
}
.course-list li,
.course-details li {
  cursor: pointer;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}
.course-list li:hover {
  background-color: #f9f9f9;
}
.course-details {
  margin-top: 20px;
}
h1,
h2,
h3 {
  text-align: center;
}
</style>
