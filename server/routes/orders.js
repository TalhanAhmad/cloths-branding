const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

/**
 * POST /api/orders
 * Create a new order (guest or authenticated checkout)
 */
router.post('/', async (req, res) => {
  try {
    const { customerName, customerPhone, products, totalPrice, shippingAddress, paymentMethod, customerEmail } = req.body;

    // Validation
    if (!customerName || !customerPhone || !products || !totalPrice || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: customerName, customerPhone, products, totalPrice, shippingAddress'
      });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Products array is required and must not be empty'
      });
    }

    // Create order object
    const orderData = {
      customerName,
      customerPhone,
      customerEmail: customerEmail || '',
      products,
      totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      orderStatus: 'Pending',
      paymentStatus: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add userId if user is authenticated (optional)
    if (req.body.userId) {
      orderData.userId = req.body.userId;
    }

    const order = new Order(orderData);
    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: savedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

/**
 * GET /api/orders/user/:userId
 * Get orders for a specific user
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    
    if (orders.length === 0) {
      return res.json({
        success: true,
        message: 'No orders found',
        data: []
      });
    }

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user orders',
      error: error.message
    });
  }
});

/**
 * GET /api/orders
 * Get all orders (admin only)
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('userId', 'name email');
    
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

/**
 * GET /api/orders/:id
 * Get specific order details
 */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});

/**
 * PUT /api/orders/:id
 * Update order status
 */
router.put('/:id', async (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber, adminNotes } = req.body;

    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (adminNotes) updateData.adminNotes = adminNotes;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order updated successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
});

/**
 * DELETE /api/orders/:id
 * Cancel order (soft delete)
 */
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: 'Cancelled' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling order',
      error: error.message
    });
  }
});

module.exports = router;
