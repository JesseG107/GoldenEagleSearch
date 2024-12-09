<template>
  <div class="register-page">
    <h2>Professor Registration</h2>
    <form @submit.prevent="registerProfessor">
      <div>
        <label>Name:</label>
        <input type="text" v-model="form.name" required />
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
        <label>Degree:</label>
        <input type="text" v-model="form.degree" required />
      </div>
      <div>
        <label>Department:</label>
        <input type="text" v-model="form.department" required />
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
  name: "ProfessorRegister",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        degree: "",
        department: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async registerProfessor() {
      try {
        const response = await axios.post(
          "http://localhost:8080/professors/register",
          this.form
        );
        alert("Professor registration successful!");
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
