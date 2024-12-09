<template>
  <div class="professor-profile">
    <h2>Professor Profile</h2>
    <div v-if="professor">
      <p><strong>Name:</strong> {{ professor.name }}</p>
      <p><strong>Email:</strong> {{ professor.email }}</p>
      <p><strong>Degree:</strong> {{ professor.degree }}</p>
      <p><strong>Department:</strong> {{ professor.department }}</p>
      <h3>Courses Taught:</h3>
      <ul v-if="professor.coursesTaught.length">
        <li v-for="course in professor.coursesTaught" :key="course._id">
          <p><strong>Course Name:</strong> {{ course.name }}</p>
          <p><strong>Description:</strong> {{ course.description }}</p>
          <h4>Reviews:</h4>
          <ul>
            <li v-for="review in course.reviews" :key="review._id">
              <p><strong>Review:</strong> {{ review.reviewText }}</p>
              <p>
                <strong>By Student:</strong> {{ review.student_id.username }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <p v-else>You are not teaching any courses yet.</p>
    </div>
    <p v-else>Loading...</p>
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
.professor-profile {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
h2,
h3,
h4 {
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
