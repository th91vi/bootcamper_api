const express = require("express");
const { getReviews } = require("../controllers/reviews");

const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorizeRoles } = require("../middleware/auth");

router.route("/").get(
  advancedResults(Review, {
    path: "bootcamp",
    select: "name text",
  }),
  getReviews
);
router.route("/:id");

module.exports = router;
