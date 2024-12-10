<template>
  <div class="review-form">
    <h2>Submit a Review</h2>
    <RouterLink class="home-link" to="/home">Return Home</RouterLink>
    <RouterLink class="review-link" to="/reviews">All Reviews</RouterLink>


    <form @submit.prevent="submitReview">
      <div class="form-group">
        <label for="targetName">Professor or Course Name</label>
        <input
          id="targetName"
          v-model="review.targetName"
          type="text"
          placeholder="Enter professor or course name"
          required
        />
      </div>
      <div class="form-group">
        <label for="reviewText">Review</label>
        <textarea
          id="reviewText"
          v-model="review.reviewText"
          placeholder="Write your review"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="rating">Rating</label>
        <input
          id="rating"
          v-model.number="review.rating"
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          required
        />
      </div>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      review: {
        targetName: "",
        reviewText: "",
        rating: 1,
      },
      error: null,
    };
  },
  methods: {
    async submitReview() {
      try {
        const response = await axios.post(
          "http://localhost:8080/reviews",
          this.review
        );
        alert("Review submitted successfully!");
        this.$router.push("/reviews");
        this.review.targetName = "";
        this.review.reviewText = "";
        this.review.rating = 1;
      } catch (error) {
        this.error = error.response?.data?.error || "An error occurred.";
      }
    },
  },
};
</script>

<style scoped>
.review-form {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.submit-btn:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
}

.home-link {
  display: flex;
  justify-content: center;
  color: #FFD700;
  text-decoration: underline;
  font-size: 1.3rem;
}
.review-link {
  display: flex;
  justify-content: center;
  color: black;
  text-decoration: underline;
  font-size: 1.3rem;
}
</style>
