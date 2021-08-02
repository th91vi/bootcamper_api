const express = require("express");
const {
  getReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorizeRoles } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name text",
    }),
    getReviews,
  )
  .post(protect, authorizeRoles("user", "admin"), createReview);

router
  .route("/:id")
  .get(getSingleReview)
  .put(protect, authorizeRoles("user", "admin"), updateReview)
  .delete(protect, authorizeRoles("user", "admin"), deleteReview);

module.exports = router;
