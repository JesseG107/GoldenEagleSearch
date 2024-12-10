<template>
  <div class="wrapper">
    <!-- Header -->
    <div class="header">
      <h1>Student Login</h1>
    </div>

    <!-- Login -->
    <div>
      <form>
        <input v-model="student.email" type="email" placeholder="Email" />
        <input
          v-model="student.password"
          type="password"
          placeholder="Password"
        />
        <p class="error">{{ error }}</p>
        <button @click="login" type="button">Login</button>
        <p class="register">Not Registered?</p>
        <RouterLink class="register-link" to="/students/register">
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
      student: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const student = this.student;

        const response = await axios.post(
          "http://localhost:8080/students/login",
          student
        );

        // Set the authorization token in local storage
        const token = response.headers.authorization;

        localStorage.setItem("authToken", token);

        // Redirect to the student profile
        this.$router.push(`/profile/student/${response.data._id}`);
      } catch (error) {
        this.error = error.response.data.error;
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
}

button {
  width: 100%;
  cursor: pointer;
}

.register {
  display: flex;
  justify-content: center;
  color: #f8f8ff;
}

.register-link {
  display: flex;
  justify-content: center;
  color: #b492ad;
  text-decoration: underline;
}

.error {
  display: flex;
  justify-content: center;
  color: #eb8b7a;
  text-transform: uppercase;
}
</style>
