<template>
  <div class="wrapper">
    <!-- Header -->
    <div class="header">
      <h1>Golden Eagle Search</h1>
      <h1>Professor Login</h1>
      <RouterLink class="login-link" to="/home">Home</RouterLink>

    </div>

    <!-- Login -->
    <div>
      <form>
        <input v-model="professor.email" type="email" placeholder="Email" />
        <input
          v-model="professor.password"
          type="password"
          placeholder="Password"
        />
        <p class="error">{{ error }}</p>
        <button @click="login" type="button">Login</button>
        <p class="register">Not Registered?</p>
        <RouterLink class="register-link" to="/register/professor">
          Register Now
        </RouterLink>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      professor: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:8080/professors/login",
          this.professor
        );

        // Set the authorization token in local storage
        const token = response.headers.authorization;

        localStorage.setItem("authToken", token);

        // Redirect to the professor profile
        this.$router.push(`/profile/professor/${response.data._id}`);
        localStorage.setItem("professorId", response.data._id);
      } catch (error) {
        this.error = error.response?.data?.error || "An error occurred.";
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  color: #f8f8ff;
  padding-bottom: 20px;
}

h1.header {
  font-size: 18px;
}

form {
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

input {
  font-family: "Saira Extra Condensed", sans-serif;
  color: #333;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 300px;
  font-size: 1.1rem;
}

button {
  width: 100%;
  cursor: pointer;
}

.register {
  display: flex;
  justify-content: center;
  color: #f8f8ff;
  font-size: 1.1rem;
}

.register-link {
  display: flex;
  justify-content: center;
  color: #FFD700;
  text-decoration: underline;
}
.register-link:hover {
  color: #FFF68F;
  text-decoration-color: #FFF68F;
}

.error {
  display: flex;
  justify-content: center;
  color: #eb8b7a;
  text-transform: uppercase;
}
</style>
