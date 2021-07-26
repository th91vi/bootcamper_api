const express = require("express");
const {
  getCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect, authorizeRoles } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorizeRoles("publisher", "admin"), addCourse);
router
  .route("/:id")
  .get(getSingleCourse)
  .put(protect, authorizeRoles("publisher", "admin"), updateCourse)
  .delete(protect, authorizeRoles("publisher", "admin"), deleteCourse);

module.exports = router;
