<template>
  <div>
    <h2>All Reviews for California State University - Los Angeles</h2>

    <RouterLink class="home-link" to="/home">Return Home</RouterLink>
    
    <RouterLink class="review-link" to="/reviews/add">Submit a Review</RouterLink>

    <ul class="review-list">
      <li class="review-item" v-for="review in reviews" :key="review._id">
        <p class="review-target">
          <strong>Course or Professor:</strong> {{ review.targetName }}
        </p>
        <p class="review-text">{{ review.reviewText }}</p>
        <p class="review-rating">
          <strong>Rating:</strong> {{ review.rating }}/5
        </p>
        <p class="review-date">
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
/* Container styles */
h2 {
  text-align: center;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 20px;
}

/* Review list */
.review-list {
  list-style-type: none;
  padding: 0;
  margin: 0 auto;
  max-width: 800px;


}

/* Review item */
.review-item {
  background-color: #f9f9f9;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.review-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}


/* Review details */
.review-target,
.review-text,
.review-rating,
.review-date {
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
}

.review-target strong,
.review-rating strong,
.review-date strong {
  color: #222;
  font-weight: bold;
}

.home-link {
  display: flex;
  justify-content: center;
  color: #FFD700;
  text-decoration: underline;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.review-link{
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: underline;
  font-size: 1.3rem;
  margin-bottom: 10px;

}
/* Responsive Design */
@media (max-width: 600px) {
  .review-item {
    padding: 10px;
  }

  .review-target,
  .review-text,
  .review-rating,
  .review-date {
    font-size: 0.9rem;
  }
}
</style>
