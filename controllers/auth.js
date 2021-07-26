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

  sendTokenResponse(user, 200, res);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 401));
  }

  // Check for user
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if user entered password matches to hashed password in database
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    sucess: true,
    data: user,
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    succes: true,
    token,
  });
};
