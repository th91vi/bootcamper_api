const errorhandler = (error, req, res, next) => {
  res.status(500).json({
    success: false,
    error: error.message,
  });
};

module.exports = errorhandler;
