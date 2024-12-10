<template>
  <header class="header">
    <img src="/logo.png" alt="Golden Eagle Logo" class="logo" />
    <div class="auth-links">
      <RouterLink class="login-link" to="/afterloginhomestudent">Home</RouterLink>
      <RouterLink class="login-link" to="/home">Log-Out</RouterLink>


    </div>
  </header>
  <div class="student-profile">
    <div class="profile-container">
      <h2>Student Profile</h2>
      <div v-if="student">
        <div class="student-info">
          <p><strong>Username:</strong> {{ student.username }}</p>
          <p><strong>Email:</strong> {{ student.email }}</p>
          <p><strong>Major:</strong> {{ student.major }}</p>
          <p><strong>Status:</strong> {{ student.status }}</p>
        </div>
        <h3>Your Reviews</h3>
        <ul v-if="student.reviews.length" class="reviews-list">
          <li v-for="review in student.reviews" :key="review._id" class="review-item">
            <p><strong>Course:</strong> {{ review.course_id.name }}</p>
            <p><strong>Review:</strong> {{ review.reviewText }}</p>
          </li>
        </ul>
        <p v-else class="no-reviews">You have not left any reviews yet.</p>
      </div>
      <p v-else class="loading">Loading student profile...</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "StudentProfile",
  data() {
    return {
      student: null,
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/students/${this.$route.params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      this.student = response.data;
    } catch (error) {
      console.error(
        "Error fetching student profile:",
        error.response?.data?.error || error.message
      );
    }
  },
};
</script>

<style scoped>

.header {
  display: flex;
  flex-direction: column; /* Keep the layout vertical */
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  padding: 10px; /* Reduce padding to minimize extra space */
  background-color: #1a1a2e;
  gap: 10px; /* Use gap instead of margin-bottom on the logo */
}

.logo {
  width: 350px; /* Adjust width to prevent excessive height */
  height: auto;
}

.auth-links {
  display: flex;
  gap: 20px; /* Add space only between links */
  justify-content: center;
}

.login-link {
  color: #FFD700;
  font-size: 1.4rem; /* Adjust font size for consistency */
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease, text-decoration-color 0.3s ease;
}

.login-link:hover {
  color: #FFF68F;
  text-decoration-color: #FFF68F;
}

/* Adjust profile container spacing */
.student-profile {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to start to reduce unnecessary space */
  min-height: calc(100vh - 60px); /* Subtract header height */
  background-color: #1a1a2e;
  font-family: Arial, sans-serif;
}

.profile-container {
  margin-top: 20px; /* Add a small margin to separate from header */
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

.student-info p {
  margin: 10px 0;
  color: #555;
}

h3 {
  text-align: center;
  margin-top: 20px;
  color: #333;
}

.reviews-list {
  list-style-type: none;
  padding: 0;
}

.review-item {
  background: #f1f1f1;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.no-reviews,
.loading {
  text-align: center;
  color: #888;
  margin-top: 20px;
}
</style>

