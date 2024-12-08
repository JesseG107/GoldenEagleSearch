// MAIN ROUTER FUNCTION
const router = require("express").Router();
const controller = require("./review.controller");

router.get("/", controller.getReviews);
router.get("/:id", controller.getReviewById);
router.post("/", controller.createReview);
router.delete("/:id", controller.deleteReview);

module.exports = router;
