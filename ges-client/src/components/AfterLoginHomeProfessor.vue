<script setup>
import { ref } from 'vue'

const searchTerm = ref('')
const professorId = ref(localStorage.getItem("professorId"));

</script>

<template>
  <div class="wrapper">
    <header>
      <img src="/logo.png" alt="Golden Eagle Logo" class="logo" />
      <div class="auth-links">
        <RouterLink
          class="profile-link"
          :to="`/profile/professor/${professorId}`"
        >
          View Your Professor Profile
        </RouterLink>
      </div>
      <div class="view-links">
      <RouterLink class="view-link" to="/professorsAll">View All Professors</RouterLink>
      <RouterLink class="view-link" to="/coursesAll">View All Courses</RouterLink>
      <RouterLink class="view-link" to="/reviews">View All Reviews</RouterLink>
      <RouterLink class="view-link" to="/reviews/add">Submit A Review</RouterLink>
    </div>
    </header>
    <div class="search-bar">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search professors, courses, and more..."
      />
      <RouterLink
        :to="{ name: 'SearchResults', query: { query: searchTerm.trim() } }"
        v-if="searchTerm.trim().length > 0"
      >
        <button>Search</button>
      </RouterLink>
      <button v-else disabled>Search</button>
    </div>
    <p class="welcome-text">
      Welcome to Golden Eagle Search, home to all the information you need about
      CSULA's professors and courses.
    </p>
    <p class="welcome-text">
      To start exploring, simply search a professor or course in the search bar
      above.
    </p>
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #1a1a2e; /* Global background */
}

/* Ensure the wrapper fills the entire viewport */
.wrapper {
  background-color: #1a1a2e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f8f8ff;
  padding: 20px;
  text-align: center;
  box-shadow: none;
  outline: none;
  margin-top: -100px;
}

.logo {
  width: 350px;
  height: auto;
  margin-bottom: 10px;
  margin-top: 80px;
}

.auth-links {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.link-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}

.login-link,
.register-link {
  color: #FFD700;
  font-size: 1.5rem;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease, text-decoration-color 0.3s ease;
}

.login-link:hover,
.register-link:hover {
  color: #FFF68F;
  text-decoration-color: #FFF68F;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 50px;
}

.search-bar input {
  width: 350px;
  padding: 10px;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

.search-bar button {
  padding: 8px 30px;
  font-size: 1.2em;
  color: black;
  background-color: #FFF68F;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #FFD700;
}

.welcome-text {
  font-size: 1.5em;
}
.profile-link,
.register-link {
  color: white;
  font-size: 1.5rem;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s ease, text-decoration-color 0.3s ease;
}

.profile-link:hover,
.register-link:hover {
  color: #FFF68F;
  text-decoration-color: #FFF68F;
}
</style>
