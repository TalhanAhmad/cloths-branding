const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');

/**
 * USER REVIEWS ROUTES
 * Customers can view reviews (public) and create reviews (authenticated)
 */

// GET /api/reviews/:productId
// Get all reviews for a product (public)
router.get('/:productId', (req, res) => {
  // const { getReviews } = require('../../controllers/user/reviewController');
  // return getReviews(req, res);
  res.json({ message: 'Get product reviews' });
});

// POST /api/reviews
// Create new review (authenticated users only)
router.post('/', authMiddleware, (req, res) => {
  // const { createReview } = require('../../controllers/user/reviewController');
  // return createReview(req, res);
  res.json({ message: 'Create review', success: true });
});

// GET /api/reviews/rating/:productId
// Get average rating for product (public)
router.get('/rating/:productId', (req, res) => {
  res.json({ message: 'Get product rating' });
});

module.exports = router;
