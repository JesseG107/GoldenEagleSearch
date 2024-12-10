<template>
  <div class="courses">
    <h2>California State University - Los Angeles Directory of Courses</h2>
    <RouterLink class="home-link" to="/home">Return Home</RouterLink>

    <ul class="course-list">
      <li class="course-card" v-for="course in courses" :key="course._id">
        <h3 class="course-name">{{ course.name }}</h3>
        <p class="course-detail"><strong>Department:</strong> {{ course.department }}</p>
        <p class="course-detail"><strong>Description:</strong> {{ course.description }}</p>
        <p class="course-detail">
          <strong>Prerequisites:</strong> {{ course.prerequisites.join(", ") || "None" }}
        </p>
        <p class="course-detail"><strong>Capacity:</strong> {{ course.capacity }}</p>
        <div v-if="course.professors && course.professors.length">
          <strong>Professors:</strong>
          <ul class="professor-list">
            <li v-for="professor in course.professors" :key="professor._id">
              {{ professor.name }} ({{ professor.degree }})
            </li>
          </ul>
        </div>
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
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

ul.course-list {
  list-style-type: none;
  padding: 0;
}

li.course-card {
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3.course-name {
  margin: 0 0 10px;
  font-size: 20px;
  color: #222;
}

p.course-detail {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}

ul.professor-list {
  margin: 10px 0 0;
  padding-left: 20px;
  list-style-type: disc;
}

ul.professor-list li {
  margin: 5px 0;
  font-size: 15px;
  color: #444;
}

@media (max-width: 600px) {
  .courses {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  h3.course-name {
    font-size: 18px;
  }

  p.course-detail,
  ul.professor-list li {
    font-size: 14px;
  }
}

.home-link {
  display: flex;
  justify-content: center;
  color: black;
  text-decoration: underline;
  font-size: 1.3rem;
}
</style>
