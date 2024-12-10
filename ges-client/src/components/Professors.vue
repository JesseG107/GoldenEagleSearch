<template>
  <div class="professors">
    <h2>Our Professors</h2>
    <ul>
      <li v-for="professor in professors" :key="professor._id">
        <h3>{{ professor.name }}</h3>
        <p><strong>Email:</strong> {{ professor.email }}</p>
        <p><strong>Degree:</strong> {{ professor.degree }}</p>
        <p><strong>Department:</strong> {{ professor.department }}</p>
        <p v-if="professor.coursesTaught && professor.coursesTaught.length">
          <strong>Courses Taught:</strong>
          <ul>
            <li v-for="course in professor.coursesTaught" :key="course._id">
              {{ course.name }}
            </li>
          </ul>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      professors: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8080/professors");
      this.professors = response.data;
    } catch (error) {
      console.error("Error fetching professors:", error);
    }
  },
};
</script>

<style scoped>
.professors {
  max-width: 800px;
  margin: 0 auto;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
h3 {
  margin-bottom: 5px;
}
</style>
