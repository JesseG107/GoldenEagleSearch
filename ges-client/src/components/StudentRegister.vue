<template>
  <div class="wrapper">
    <div class="header">
      <h1>Golden Eagle Search</h1>
      <h2>Student Registration</h2>
    </div>
    <div>
      <form class="two-column-form" @submit.prevent="registerStudent">
        <div class="column">
          <input
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
          />
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
            v-model="form.major"
            type="text"
            placeholder="Major"
            required
          />
          <select v-model="form.status" required>
            <option disabled value="">Select Status</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
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
  name: "StudentRegister",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        major: "",
        status: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async registerStudent() {
      try {
        await axios.post("http://localhost:8080/students/register", this.form);
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

input,
select {
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
