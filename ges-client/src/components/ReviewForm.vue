<template>
  <div class="review-form">
    <h2>Submit a Review</h2>
    <form @submit.prevent="submitReview">
      <input
        v-model="review.targetName"
        type="text"
        placeholder="Professor or Course Name"
        required
      />
      <textarea
        v-model="review.reviewText"
        placeholder="Write your review"
        required
      ></textarea>
      <input
        v-model.number="review.rating"
        type="number"
        min="1"
        max="5"
        placeholder="Rating (1-5)"
        required
      />
      <button type="submit">Submit</button>
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
  margin: 0 auto;
}
textarea {
  width: 100%;
  min-height: 100px;
}
button {
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
