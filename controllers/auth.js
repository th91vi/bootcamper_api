const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

exports.registerUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
