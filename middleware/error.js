const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message

  // Log to console for dev
  console.log(err.name.red);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicated fieds
  if (err.code === 11000) {
    const message = "Duplicated fields value entered";
    error = new Error(message);
  }

  // Mogoose validation error ( missing required fields )
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(error => error.message);
    error = new ErrorResponse(message, 400);
  }


  res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server error' })
}

module.exports = errorHandler;