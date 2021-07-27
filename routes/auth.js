const express = require("express");
const {
  registerUser,
  loginUser,
  getLoggedUser,
  forgotPassword,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(protect, getLoggedUser);

router.route("/forgotpassword").post(forgotPassword);

module.exports = router;
