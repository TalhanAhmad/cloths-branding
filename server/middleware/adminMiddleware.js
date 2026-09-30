const jwt = require('jsonwebtoken');

/**
 * Verify JWT token AND check if user is admin
 * Used for admin-only routes
 */
const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'No token provided. Please login first.',
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin
    if (!decoded.isAdmin) {
      return res.status(403).json({
        message: 'Access denied. Admin privileges required.',
        success: false,
      });
    }

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

module.exports = adminMiddleware;
