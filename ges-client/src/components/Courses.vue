<template>
  <div class="courses">
    <h2>Available Courses</h2>
    <ul>
      <li v-for="course in courses" :key="course._id">
        <h3>{{ course.name }}</h3>
        <p><strong>Department:</strong> {{ course.department }}</p>
        <p><strong>Description:</strong> {{ course.description }}</p>
        <p><strong>Prerequisites:</strong> {{ course.prerequisites.join(", ") || "None" }}</p>
        <p><strong>Capacity:</strong> {{ course.capacity }}</p>
        <p v-if="course.professors && course.professors.length">
          <strong>Professors:</strong>
          <ul>
            <li v-for="professor in course.professors" :key="professor._id">
              {{ professor.name }} ({{ professor.degree }})
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
      courses: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8080/courses");
      this.courses = response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  },
};
</script>

<style scoped>
.courses {
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
