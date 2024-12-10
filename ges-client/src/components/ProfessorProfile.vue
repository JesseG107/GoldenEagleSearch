<template>
  <header class="header">
    <img src="/logo.png" alt="Golden Eagle Logo" class="logo" />
    <div class="auth-links">
      <RouterLink class="login-link" to="/afterloginhomeprofessor">Home</RouterLink>
    </div>
  </header>
  <div class="professor-profile">
    <div class="profile-container">
      <h2>Professor Profile</h2>
      <div v-if="professor">
        <div class="professor-info">
          <p><strong>Name:</strong> {{ professor.name }}</p>
          <p><strong>Email:</strong> {{ professor.email }}</p>
          <p><strong>Degree:</strong> {{ professor.degree }}</p>
          <p><strong>Department:</strong> {{ professor.department }}</p>
        </div>
        <h3>Courses Taught</h3>
        <ul v-if="professor.coursesTaught.length" class="courses-list">
          <li v-for="course in professor.coursesTaught" :key="course._id" class="course-item">
            <p><strong>Course Name:</strong> {{ course.name }}</p>
            <p><strong>Description:</strong> {{ course.description }}</p>
            <h4>Reviews</h4>
            <ul v-if="course.reviews.length" class="reviews-list">
              <li v-for="review in course.reviews" :key="review._id" class="review-item">
                <p><strong>Review:</strong> {{ review.reviewText }}</p>
                <p><strong>By Student:</strong> {{ review.student_id.username }}</p>
              </li>
            </ul>
            <p v-else class="no-reviews">No reviews available for this course yet.</p>
          </li>
        </ul>
        <p v-else class="no-courses">You are not teaching any courses yet.</p>
      </div>
      <p v-else class="loading">Loading professor profile...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfessorProfile",
  data() {
    return {
      professor: null,
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/professors/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      this.professor = response.data;
    } catch (error) {
      console.error(
        "Error fetching professor profile:",
        error.response?.data?.error || error.message
      );
    }
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #1a1a2e;
  gap: 10px;
}

.logo {
  width: 350px;
  height: auto;
}

.auth-links {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.login-link {
  color: #ffd700;
  font-size: 1.4rem;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease, text-decoration-color 0.3s ease;
}

.login-link:hover {
  color: #fff68f;
  text-decoration-color: #fff68f;
}
.login-link {
  display: flex;
  justify-content: center;
  color: #FFF68F;
  text-decoration: underline;
}
.login-link:hover {
  color: #FFD700;
  text-decoration-color: #FFD700;
}

.professor-profile {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 60px);
  background-color: #1a1a2e;
  font-family: Arial, sans-serif;
}

.profile-container {
  margin-top: 20px;
  max-width: 600px;
  width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.professor-info p {
  margin: 10px 0;
  color: #555;
}

h3 {
  text-align: center;
  margin-top: 20px;
  color: #333;
}

.courses-list,
.reviews-list {
  list-style-type: none;
  padding: 0;
}

.course-item,
.review-item {
  background: #f1f1f1;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.no-courses,
.no-reviews,
.loading {
  text-align: center;
  color: #888;
  margin-top: 20px;
}
</style>
