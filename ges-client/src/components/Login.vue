<template>
  <div class="wrapper">
    <div class="header">
      <h1>Golden Eagle Search</h1>
      <h2>Login</h2>
    </div>
    <div class="form-container">
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <input
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <div class="register-links">
        <p>Don't have an account?</p>
        <router-link to="/register/student" class="register-link">
          Register as a Student
        </router-link>
        <router-link to="/register/professor" class="register-link">
          Register as a Professor
        </router-link>
      </div>
    </div>
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
/* Wrapper and Header Styling */
.wrapper {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #1e1e2e;
  color: #f8f8ff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.header h1 {
  font-size: 28px;
  margin-bottom: 5px;
}

.header h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

/* Form Container */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input {
  font-family: "Saira Extra Condensed", sans-serif;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}

input:focus {
  border-color: #6a5acd;
  outline: none;
}

button {
  width: 100%;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

/* Register Links */
.register-links {
  margin-top: 10px;
}

.register-links p {
  margin: 10px 0;
  color: #f8f8ff;
}

.register-link {
  display: block;
  color: #b492ad;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 5px;
}

.register-link:hover {
  text-decoration: underline;
  color: #d9a7e2;
}

/* Error Styling */
.error {
  color: #eb8b7a;
  font-size: 14px;
  text-transform: uppercase;
  margin-top: 5px;
}
</style>
