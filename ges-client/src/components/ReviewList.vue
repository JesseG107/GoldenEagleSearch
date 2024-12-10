<template>
  <div>
    <h2>All Reviews</h2>
    <ul>
      <li v-for="review in reviews" :key="review._id">
        <p><strong>Course or Professor:</strong> {{ review.targetName }}</p>
        <p>{{ review.reviewText }}</p>
        <p><strong>Rating:</strong> {{ review.rating }}/5</p>
        <p>
          <strong>Reviewed At:</strong>
          {{ new Date(review.createdAt).toLocaleString() }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reviews: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8080/reviews");
      this.reviews = response.data;
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
</style>
