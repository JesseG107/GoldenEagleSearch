<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div>
        <label for="role">Login as</label>
        <select v-model="role" id="role" required>
          <option value="student">Student</option>
          <option value="professor">Professor</option>
        </select>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      role: "student", // Default role is student
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        // Determine the login endpoint based on the role
        const endpoint =
          this.role === "student"
            ? "http://localhost:8080/students/login"
            : "http://localhost:8080/professors/login";

        // Make the login request
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        const result = await response.json();

        if (!response.ok) {
          this.error = result.error;
          return;
        }

        // Store the token and redirect
        localStorage.setItem("token", result.token);
        this.$router.push("/dashboard"); // Adjust route as per your application
      } catch (err) {
        this.error = "An error occurred. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  font-weight: bold;
}

input,
select {
  margin-bottom: 15px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
