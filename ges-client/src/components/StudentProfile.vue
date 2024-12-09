<template>
  <div class="student-profile">
    <h2>Student Profile</h2>
    <div v-if="student">
      <p><strong>Username:</strong> {{ student.username }}</p>
      <p><strong>Email:</strong> {{ student.email }}</p>
      <p><strong>Major:</strong> {{ student.major }}</p>
      <p><strong>Status:</strong> {{ student.status }}</p>
      <h3>Your Reviews:</h3>
      <ul v-if="student.reviews.length">
        <li v-for="review in student.reviews" :key="review._id">
          <p><strong>Course:</strong> {{ review.course_id.name }}</p>
          <p><strong>Review:</strong> {{ review.reviewText }}</p>
        </li>
      </ul>
      <p v-else>You have not left any reviews yet.</p>
    </div>
    <p v-else>Loading...</p>
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
.student-profile {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
h2,
h3 {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}
</style>
