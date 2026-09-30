/**
 * Global error handling middleware
 * Catch and format all errors in one place
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
      success: false,
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired',
      success: false,
    });
  }

  // Validation Errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      success: false,
      errors: Object.values(err.errors).map(e => e.message),
    });
  }

  // Duplicate Key Error (MongoDB)
  if (err.code === 11000) {
    return res.status(400).json({
      message: 'Duplicate entry',
      success: false,
      field: Object.keys(err.keyValue)[0],
    });
  }

  // Default error
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    success: false,
  });
};

module.exports = errorHandler;
