<template>
  <div class="wrapper">
    <div class="header">
      <h1>Golden Eagle Search</h1>
      <h2>Professor Registration</h2>
    </div>
    <div>
      <form class="two-column-form" @submit.prevent="registerProfessor">
        <div class="column">
          <input v-model="form.name" type="text" placeholder="Name" required />
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="column">
          <input
            v-model="form.degree"
            type="text"
            placeholder="Degree"
            required
          />
          <input
            v-model="form.department"
            type="text"
            placeholder="Department"
            required
          />
          <p class="error">{{ errorMessage }}</p>
          <button type="submit">Register</button>
          <p class="login">Already Registered?</p>
          <RouterLink class="login-link" to="/login">Login</RouterLink>
        </div>
      </form>
    </div>
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
        await axios.post(
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
.header {
  text-align: center;
  color: #f8f8ff;
  padding-bottom: 20px;
}

h1,
h2 {
  font-size: 24px;
}

.two-column-form {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.two-column-form .column {
  flex: 1;
  padding: 0 10px;
}

form {
  margin: 0px auto;
  width: 90%;
}

input {
  font-family: "Saira Extra Condensed", sans-serif;
  color: #333;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

button {
  width: 100%;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

.login {
  display: flex;
  justify-content: center;
  color: #f8f8ff;
}

.login-link {
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
