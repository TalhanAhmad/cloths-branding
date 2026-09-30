const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const adminMiddleware = require('../../middleware/adminMiddleware');

/**
 * Authentication Routes
 * Shared by both User and Admin
 * Public endpoints - no middleware needed
 */

// POST /api/auth/register
// Register a new user account
router.post('/register', (req, res) => {
  // Import from controller
  // const { registerUser } = require('../../controllers/shared/authController');
  // return registerUser(req, res);
  res.json({ message: 'Register endpoint' });
});

// POST /api/auth/login
// Login user (returns JWT token)
router.post('/login', (req, res) => {
  // Import from controller
  // const { loginUser } = require('../../controllers/shared/authController');
  // return loginUser(req, res);
  res.json({ message: 'Login endpoint' });
});

// POST /api/auth/logout
// Logout user (optional - token-based logout)
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logout successful', success: true });
});

module.exports = router;
