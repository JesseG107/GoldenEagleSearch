// MAIN ROUTER FUNCTION
const router = require("express").Router();
const controller = require("./review.controller");

router.get("/", controller.getReviews);

router.post("/", controller.createReview);

module.exports = router;
