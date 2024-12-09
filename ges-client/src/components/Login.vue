<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label>Username:</label>
        <input type="text" v-model="form.username" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="form.password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <p>
      Don't have an account?
      <router-link to="/register/student">Register as a Student</router-link> or
      <router-link to="/register/professor"
        >Register as a Professor</router-link
      >
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(
          "http://localhost:8080/login",
          this.form
        );
        const { token, role, id } = response.data;

        localStorage.setItem("token", token);

        // Redirect based on role
        if (role === "Student") {
          this.$router.push(`/profile/student/${id}`);
        } else if (role === "Professor") {
          this.$router.push(`/profile/professor/${id}`);
        } else {
          alert("Unknown role detected.");
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.error || "Login failed.";
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.error {
  color: red;
}
</style>
