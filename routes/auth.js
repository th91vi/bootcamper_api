const express = require("express");
const {
  registerUser,
  loginUser,
  getLoggedUser,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updateUserPassword,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(protect, getLoggedUser);

router.route("/updateuserdetails").put(protect, updateUserDetails);

router.route("/updateuserpassword").put(protect, updateUserPassword);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetPassword/:resettoken").put(resetPassword);

module.exports = router;
