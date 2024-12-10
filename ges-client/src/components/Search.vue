<template>
    <div class="search-results">
      <h2>Search Results for "{{ queryTerm }}"</h2>
      <RouterLink class="home-link" to="/home">Return Home</RouterLink>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <div v-if="filteredProfessors.length || filteredCourses.length">
          <div v-if="filteredProfessors.length">
            <h1>Professors</h1>
            <ul class="professor-list">
              <li class="professor-card" v-for="professor in filteredProfessors" :key="professor._id">
                <h3 class="professor-name">{{ professor.name }}</h3>
                <p class="professor-detail"><strong>Email:</strong> {{ professor.email }}</p>
                <p class="professor-detail"><strong>Degree:</strong> {{ professor.degree }}</p>
                <p class="professor-detail"><strong>Department:</strong> {{ professor.department }}</p>
  
                <p class="professor-detail"><strong>Courses Taugh:</strong> {{ professor.courses }}</p>

  
                <div v-if="professor.ratings">
                  <p class="professor-detail"><strong>Rating:</strong> {{ professor.ratings }}</p>
                </div>
  
                <div v-if="professor.reviews && professor.reviews.length">
                  <strong>Reviews:</strong>
                  <ul class="reviews-list">
                    <li v-for="(review, index) in professor.reviews" :key="index">
                      {{ review }}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
  
          <div v-if="filteredCourses.length">
            <h1>Courses</h1>
            <ul class="course-list">
              <li class="course-card" v-for="course in filteredCourses" :key="course._id">
                <h3 class="course-name">{{ course.name }}</h3>
                <p class="course-detail"><strong>Department:</strong> {{ course.department }}</p>
                <p class="course-detail"><strong>Description:</strong> {{ course.description }}</p>
                <p class="course-detail">
                  <strong>Prerequisites:</strong> {{ course.prerequisites }}
                </p>
                <p class="course-detail"><strong>Capacity:</strong> {{ course.capacity }}</p>
                <p class="course-detail">
                  <strong>Syllabus:</strong>
                  <a :href="course.syllabus" target="_blank" rel="noopener noreferrer">View Syllabus</a>
                </p>
                <p class="course-detail"><strong>Rating:</strong> {{ course.rating }}</p>
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
        </div>
        <div v-else>
          <p>No results found for "{{ queryTerm }}". Please try another search.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { onMounted, ref, computed } from "vue";
  import { useRoute } from "vue-router";
  
  export default {
    setup() {
      const route = useRoute();
      const queryTerm = computed(() => route.query.query || "");
  
      const professors = ref([]);
      const courses = ref([]);
      const loading = ref(true);
  
      onMounted(async () => {
  try {
    const [profResponse, courseResponse] = await Promise.all([
      axios.get("http://localhost:8080/professors"),
      axios.get("http://localhost:8080/courses"),
    ]);

    professors.value = profResponse.data.map((professor) => {
      // Convert review objects to strings, excluding `_id` and `id`
      professor.reviews = professor.reviews.map((review) => {
        if (typeof review === "object") {
          const { _id, id, ...content } = review; // Exclude `_id` and `id`
          return Object.values(content).join("");
        }
        return review; // If already a string, return as is
      });
      return professor;
    });

    courses.value = courseResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
});
  
      // Filter logic
      const filteredProfessors = computed(() => {
        const q = queryTerm.value.toLowerCase().trim();
        return professors.value.filter((p) => p.name.toLowerCase().includes(q));
      });
  
      const filteredCourses = computed(() => {
        const q = queryTerm.value.toLowerCase().trim();
        return courses.value.filter((c) => c.name.toLowerCase().includes(q));
      });
  
      return {
        queryTerm,
        professors,
        courses,
        loading,
        filteredProfessors,
        filteredCourses,
      };
    },
  };
  </script>
  
  <style scoped>
  .search-results {
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
  
  ul.professor-list,
  ul.course-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li.professor-card,
  li.course-card {
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h3.professor-name,
  h3.course-name {
    margin: 0 0 10px;
    font-size: 20px;
    color: #222;
  }
  
  p.professor-detail,
  p.course-detail {
    margin: 5px 0;
    font-size: 16px;
    color: #555;
  }
  
  ul.courses-taught,
  ul.reviews-list {
    margin: 10px 0 0;
    padding-left: 20px;
    list-style-type: disc;
  }
  
  ul.courses-taught li,
  ul.reviews-list li {
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
    margin-bottom: 20px;
  }
  
  .loading {
    text-align: center;
    font-size: 1.5em;
  }
  
  @media (max-width: 600px) {
    .search-results {
      padding: 15px;
    }
  
    h2 {
      font-size: 20px;
    }
  
    h3.professor-name,
    h3.course-name {
      font-size: 18px;
    }
  
    p.professor-detail,
    p.course-detail,
    ul.courses-taught li,
    ul.reviews-list li {
      font-size: 14px;
    }
  }
  </style>
  