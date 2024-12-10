<template>
    <div class="professor-detail-page">
      <h2>{{ professor.name }}</h2>
      <RouterLink class="home-link" to="/home">Return Home</RouterLink>
  
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <div class="professor-card">
          <p><strong>Email:</strong> {{ professor.email }}</p>
          <p><strong>Degree:</strong> {{ professor.degree }}</p>
          <p><strong>Department:</strong> {{ professor.department }}</p>
          <p v-if="professor.bio"><strong>Bio:</strong> {{ professor.bio }}</p>
          
          <div v-if="professor.coursesTaught && professor.coursesTaught.length">
            <strong>Courses Taught:</strong>
            <ul>
              <li v-for="course in professor.coursesTaught" :key="course._id">
                <RouterLink :to="{ name: 'Course', params: { id: course._id } }">
                    {{ course.name }}
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
      const professor = ref(null)
      const loading = ref(true)
      const error = ref(null)
  
      onMounted(async () => {
        try {
          const { id } = route.params
          const response = await axios.get(`http://localhost:8080/professors/${id}`)
          professor.value = response.data
        } catch (err) {
          error.value = 'Error fetching professor details'
        } finally {
          loading.value = false
        }
      })
  
      return { professor, loading, error }
    }
  }
  </script>
  
  <style scoped>
  .professor-detail-page {
    max-width: 600px;
    margin: 40px auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
  }
  
  .professor-card {
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
  
  .strong {
    font-weight: bold;
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
  