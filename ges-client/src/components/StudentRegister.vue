<template>
  <div class="register-page">
    <h2>Student Registration</h2>
    <form @submit.prevent="registerStudent">
      <div>
        <label>Username:</label>
        <input type="text" v-model="form.username" required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="form.email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="form.password" required />
      </div>
      <div>
        <label>Major:</label>
        <input type="text" v-model="form.major" required />
      </div>
      <div>
        <label>Status:</label>
        <select v-model="form.status" required>
          <option value="freshman">Freshman</option>
          <option value="sophomore">Sophomore</option>
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
          <option value="graduate">Graduate</option>
        </select>
      </div>
      <button type="submit">Register</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <p>
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentRegister",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        major: "",
        status: "freshman",
      },
      errorMessage: "",
    };
  },
  methods: {
    async registerStudent() {
      try {
        const response = await axios.post(
          "http://localhost:8080/students/register",
          this.form
        );
        alert("Student registration successful!");
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage =
          error.response?.data?.error || "Registration failed.";
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: auto;
}
.error {
  color: red;
}
</style>
