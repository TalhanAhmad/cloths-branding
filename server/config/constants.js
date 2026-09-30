/**
 * App-wide constants
 */

module.exports = {
  // HTTP Status Codes
  STATUS_OK: 200,
  STATUS_CREATED: 201,
  STATUS_BAD_REQUEST: 400,
  STATUS_UNAUTHORIZED: 401,
  STATUS_FORBIDDEN: 403,
  STATUS_NOT_FOUND: 404,
  STATUS_CONFLICT: 409,
  STATUS_SERVER_ERROR: 500,

  // Product Categories
  CATEGORIES: ['Formal Wear', 'Casual Wear', 'Luxury Collection', 'Summer Collection'],

  // Order Status
  ORDER_STATUS: {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
  },

  // Payment Methods
  PAYMENT_METHODS: {
    COD: 'Cash on Delivery',
    WHATSAPP: 'WhatsApp Order',
  },

  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  DEFAULT_PAGE: 1,

  // Price Ranges
  PRICE_FILTERS: [
    { label: 'Under 5,000', min: 0, max: 5000 },
    { label: '5,000 - 10,000', min: 5000, max: 10000 },
    { label: '10,000 - 20,000', min: 10000, max: 20000 },
    { label: 'Above 20,000', min: 20000, max: 100000 },
  ],

  // WhatsApp Configuration
  WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || '923001234567',
  WHATSAPP_COUNTRY: 'PK',

  // Email Configuration
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@luxeclothing.com',
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || 'support@luxeclothing.com',

  // JWT Config
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRY: '7d',

  // API Response Messages
  MESSAGES: {
    SUCCESS: 'Operation successful',
    ERROR: 'Something went wrong',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access denied',
    VALIDATION_ERROR: 'Validation failed',
    DUPLICATE_ENTRY: 'This entry already exists',
  },
};
