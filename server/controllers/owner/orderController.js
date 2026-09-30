/**
 * ADMIN ORDER CONTROLLER
 * Manage all customer orders
 */

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    // const { status, page = 1, limit = 20 } = req.query;
    // const Order = require('../../models/Order');

    // let query = {};
    // if (status) query.orderStatus = status;

    // const orders = await Order.find(query)
    //   .populate('user', 'name email phone')
    //   .sort({ createdAt: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    // const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      message: 'Orders fetched',
      data: [],
      pagination: { page: 1, limit: 20, total: 0 },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    // const { id } = req.params;
    // const { status } = req.body;
    // const Order = require('../../models/Order');

    // const order = await Order.findByIdAndUpdate(
    //   id,
    //   { orderStatus: status, updatedAt: new Date() },
    //   { new: true }
    // );

    // if (!order) {
    //   return res.status(404).json({ success: false, message: 'Order not found' });
    // }

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    // const { id } = req.params;
    // const Order = require('../../models/Order');

    // const order = await Order.findById(id);
    // if (!order) {
    //   return res.status(404).json({ success: false, message: 'Order not found' });
    // }

    // if (order.orderStatus !== 'Pending') {
    //   return res.status(400).json({ success: false, message: 'Can only cancel pending orders' });
    // }

    // order.orderStatus = 'Cancelled';
    // await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
};
