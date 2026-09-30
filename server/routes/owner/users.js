const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middleware/adminMiddleware');

/**
 * ADMIN USERS ROUTES
 * Admin only - Manage user accounts
 * All routes protected with adminMiddleware
 */

// GET /api/admin/users
// Get all users with pagination and filtering
router.get('/', adminMiddleware, (req, res) => {
  // const { getAllUsers } = require('../../controllers/owner/userController');
  // return getAllUsers(req, res);
  res.json({ message: 'Get all users' });
});

// GET /api/admin/users/:id
// Get user details
router.get('/:id', adminMiddleware, (req, res) => {
  res.json({ message: 'Get user details' });
});

// PUT /api/admin/users/:id/role
// Change user role (User → Admin or Admin → User)
router.put('/:id/role', adminMiddleware, (req, res) => {
  // const { changeUserRole } = require('../../controllers/owner/userController');
  // return changeUserRole(req, res);
  res.json({ message: 'User role changed', success: true });
});

// DELETE /api/admin/users/:id
// Deactivate/Delete user account
router.delete('/:id', adminMiddleware, (req, res) => {
  res.json({ message: 'User deleted', success: true });
});

module.exports = router;
