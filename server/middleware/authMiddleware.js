const jwt = require('jsonwebtoken');

/**
 * Verify JWT token from request headers
 * Used for protected user routes
 */
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'No token provided. Please login first.',
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid or expired token',
      success: false,
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
