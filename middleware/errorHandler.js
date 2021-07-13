const ErrorResponse = require("../utils/errorResponse");

const errorhandler = (error, req, res, next) => {
  let message;
  let err = { ...error };
  err.message = error.message;

  console.log(error.stack.red);

  switch (err) {
    // Mongoose bad Object Id
    case err.name === "CastError":
      message = `Resource not found with id of ${req.params.id}`;
      err = new ErrorResponse(message, 404);
      break;

    // Mongoose duplicate key
    case err.code === 11000:
      message = "Duplicate field value entered";
      err = new ErrorResponse(message, 400);
      break;

    // Mongoose validation error
    case err.name === "ValidationError":
      message = Object.values(err.errors).map((error) => error.message);
      err = new ErrorResponse(message, 400);
      break;

    default:
      res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Server error",
      });
  }
};

module.exports = errorhandler;
