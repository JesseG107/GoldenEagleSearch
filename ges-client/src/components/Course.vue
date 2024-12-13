<template>
    <div class="course-detail-page">
      <h2>{{ course.name }}</h2>
      <RouterLink class="home-link" to="/home">Return Home</RouterLink>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="course-card">
          <p><strong>Department:</strong> {{ course.department }}</p>
          <p><strong>Description:</strong> {{ course.description }}</p>
          <p><strong>Prerequisites:</strong> 
            {{ (course.prerequisites && course.prerequisites.length)
               ? course.prerequisites.join(", ")
               : "None" }}
          </p>
          <p><strong>Capacity:</strong> {{ course.capacity }}</p>
          
          <div v-if="course.professors && course.professors.length">
            <strong>Professors:</strong>
            <ul>
              <li v-for="professor in course.professors" :key="professor._id">
                <RouterLink :to="{ name: 'Professor', params: { id: professor._id } }">
                    {{ professor.name }} ({{ professor.degree }})
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  
  export default {
    setup() {
      const route = useRoute()
      const course = ref(null)
      const loading = ref(true)
      const error = ref(null)
  
      onMounted(async () => {
        try {
          const { id } = route.params
          const response = await axios.get(`http://localhost:8080/courses/${id}`)
          course.value = response.data
        } catch (err) {
          error.value = 'Error fetching course details'
        } finally {
          loading.value = false
        }
      })
  
      return { course, loading, error }
    }
  }
  </script>
  
  <style scoped>
  .course-detail-page {
    max-width: 600px;
    margin: 40px auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }
  
  .course-card {
    background: #fff;
    padding: 15px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .home-link {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    text-decoration: underline;
    color: black;
  }
  
  .loading, .error {
    text-align: center;
    font-size: 1.2em;
    margin-top: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    margin: 5px 0;
  }
  
  ul li a {
    text-decoration: underline;
    color: #333;
  }
  </style>
  