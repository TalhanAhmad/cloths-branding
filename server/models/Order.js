const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // User reference (optional for guest checkout)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Customer Information (required for all checkouts)
  customerName: {
    type: String,
    required: true
  },
  customerEmail: String,
  customerPhone: {
    type: String,
    required: true
  },
  
  // Order Items
  products: [{
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String
  }],
  
  // Pricing
  subtotal: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  
  // Shipping
  shippingAddress: {
    type: String,
    required: true
  },
  
  // Status
  orderStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['WhatsApp', 'Bank Transfer', 'COD'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  
  // Tracking
  trackingNumber: String,
  estimatedDelivery: Date,
  
  // Notes
  adminNotes: String,
  customerNotes: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt before saving
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
