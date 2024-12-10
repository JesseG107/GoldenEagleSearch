<template>
  <div class="professors">
    <h2>California State University - Los Angeles Directory of Professors</h2>
    <RouterLink class="home-link" to="/home">Return Home</RouterLink>
    <ul class="professor-list">
      <li class="professor-card" v-for="professor in professors" :key="professor._id">
        <h3 class="professor-name">{{ professor.name }}</h3>
        <p class="professor-detail"><strong>Email:</strong> {{ professor.email }}</p>
        <p class="professor-detail"><strong>Degree:</strong> {{ professor.degree }}</p>
        <p class="professor-detail"><strong>Department:</strong> {{ professor.department }}</p>
        <div v-if="professor.coursesTaught && professor.coursesTaught.length">
          <strong>Courses Taught:</strong>
          <ul class="courses-taught">
            <li v-for="course in professor.coursesTaught" :key="course._id">
              {{ course.name }}
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

ul.professor-list {
  list-style-type: none;
  padding: 0;
}

li.professor-card {
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3.professor-name {
  margin: 0 0 10px;
  font-size: 20px;
  color: #222;
}

p.professor-detail {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}

ul.courses-taught {
  margin: 10px 0 0;
  padding-left: 20px;
  list-style-type: disc;
}

ul.courses-taught li {
  margin: 5px 0;
  font-size: 15px;
  color: #444;
}

.home-link {
  display: flex;
  justify-content: center;
  color: black;
  text-decoration: underline;
  font-size: 1.3rem;
}

@media (max-width: 600px) {
  .professors {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  h3.professor-name {
    font-size: 18px;
  }

  p.professor-detail,
  ul.courses-taught li {
    font-size: 14px;
  }
}
</style>
