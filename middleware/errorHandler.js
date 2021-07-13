const errorhandler = (error, req, res, next) => {
  console.log(error.stack.red);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

module.exports = errorhandler;
