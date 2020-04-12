const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    err.message = Object.values(err.errors).map((val) => val.message);
    err.status = 400;
  }

  res.status(err.status || 500).json({
    success: false,
    message: String(err.message) || 'Internal Server Error',
  });
};

module.exports = errorHandler;
