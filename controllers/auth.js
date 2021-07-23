const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    succes: true,
    data: {
      name,
      email,
      role,
      token,
    },
  });
});