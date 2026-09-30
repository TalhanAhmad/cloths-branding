/**
 * API Testing Script - Test Shop Endpoints
 * 
 * Usage:
 * 1. Ensure backend is running (npm start in server/)
 * 2. Run: node apiTest.js
 * 3. Check the output for API responses
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(title, data, color = 'blue') {
  console.log(`\n${colors[color]}${colors.bright}${title}${colors.reset}`);
  console.log(JSON.stringify(data, null, 2));
}

async function testAPIs() {
  try {
    // Test 1: Get all products
    log('1️⃣ FETCHING ALL PRODUCTS', 'Testing GET /api/products');
    const productsResponse = await axios.get(`${API_BASE_URL}/products`);
    log('✓ Products Fetched:', {
      totalProducts: productsResponse.data.length,
      firstProduct: productsResponse.data[0]
    }, 'green');

    if (productsResponse.data.length === 0) {
      log('⚠️ NO PRODUCTS FOUND', 'Run: node server/seeds/sampleProducts.js', 'yellow');
      return;
    }

    // Test 2: Get products by category
    log('2️⃣ FILTERING BY FORMAL WEAR', 'Testing GET /api/products?category=Formal%20Wear');
    const formalResponse = await axios.get(`${API_BASE_URL}/products?category=Formal Wear`);
    log('✓ Formal Wear Products:', {
      count: formalResponse.data.length,
      products: formalResponse.data.map(p => p.name)
    }, 'green');

    // Test 3: Create an order (guest checkout)
    log('3️⃣ CREATING A GUEST ORDER', 'Testing POST /api/orders');
    
    const orderPayload = {
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      customerPhone: '03001234567',
      products: [
        {
          productId: productsResponse.data[0]._id,
          name: productsResponse.data[0].name,
          price: productsResponse.data[0].price,
          quantity: 2,
          size: 'M',
          color: productsResponse.data[0].colors[0]
        }
      ],
      subtotal: productsResponse.data[0].price * 2,
      tax: (productsResponse.data[0].price * 2) * 0.17,
      shippingCost: (productsResponse.data[0].price * 2) > 5000 ? 0 : 300,
      totalPrice: 0, // Will be calculated
      shippingAddress: '123 Main Street, Karachi',
      paymentMethod: 'COD'
    };

    // Calculate total
    orderPayload.totalPrice = orderPayload.subtotal + orderPayload.tax + orderPayload.shippingCost;

    const orderResponse = await axios.post(`${API_BASE_URL}/orders`, orderPayload);
    log('✓ Order Created:', {
      orderId: orderResponse.data.data._id,
      customerName: orderResponse.data.data.customerName,
      totalPrice: orderResponse.data.data.totalPrice,
      orderStatus: orderResponse.data.data.orderStatus,
      paymentMethod: orderResponse.data.data.paymentMethod
    }, 'green');

    const createdOrderId = orderResponse.data.data._id;

    // Test 4: Get the created order
    log('4️⃣ FETCHING CREATED ORDER', `Testing GET /api/orders/${createdOrderId}`);
    const getOrderResponse = await axios.get(`${API_BASE_URL}/orders/${createdOrderId}`);
    log('✓ Order Retrieved:', {
      orderId: getOrderResponse.data.data._id,
      customerName: getOrderResponse.data.data.customerName,
      status: getOrderResponse.data.data.orderStatus,
      taxAmount: getOrderResponse.data.data.tax,
      shippingCost: getOrderResponse.data.data.shippingCost
    }, 'green');

    // Test 5: Get all orders
    log('5️⃣ FETCHING ALL ORDERS', 'Testing GET /api/orders');
    const allOrdersResponse = await axios.get(`${API_BASE_URL}/orders`);
    log('✓ All Orders:', {
      totalOrders: allOrdersResponse.data.totalOrders,
      count: allOrdersResponse.data.data.length,
      latestOrder: allOrdersResponse.data.data[0]?.customerName
    }, 'green');

    // Test 6: Update order status
    log('6️⃣ UPDATING ORDER STATUS', `Testing PUT /api/orders/${createdOrderId}`);
    const updateResponse = await axios.put(`${API_BASE_URL}/orders/${createdOrderId}`, {
      orderStatus: 'Confirmed',
      paymentStatus: 'Paid',
      adminNotes: 'Order verified and payment received'
    });
    log('✓ Order Updated:', {
      orderId: updateResponse.data.data._id,
      orderStatus: updateResponse.data.data.orderStatus,
      paymentStatus: updateResponse.data.data.paymentStatus,
      adminNotes: updateResponse.data.data.adminNotes
    }, 'green');

    // Test 7: Search products
    log('7️⃣ SEARCHING PRODUCTS', 'Testing GET /api/products?search=Evening');
    const searchResponse = await axios.get(`${API_BASE_URL}/products?search=Evening`);
    log('✓ Search Results:', {
      found: searchResponse.data.length,
      products: searchResponse.data.map(p => p.name)
    }, 'green');

    log('✅ ALL TESTS PASSED!', 'Your shop system is working correctly', 'green');

  } catch (error) {
    if (error.response) {
      log('❌ API ERROR', {
        status: error.response.status,
        message: error.response.data?.message || error.response.statusText,
        data: error.response.data
      }, 'red');
    } else if (error.code === 'ECONNREFUSED') {
      log('❌ CONNECTION ERROR', 'Backend server is not running. Start with: npm start (in server/)', 'red');
    } else {
      log('❌ ERROR', error.message, 'red');
    }
  }
}

// Run tests
console.log(`${colors.bright}${colors.blue}
╔════════════════════════════════════╗
║  🛍️  SHOP API TESTING SCRIPT      ║
║                                    ║
║  Testing all endpoints...          ║
╚════════════════════════════════════╝
${colors.reset}`);

testAPIs().then(() => {
  console.log(`\n${colors.brightColors[blue]}Done!${colors.reset}\n`);
  process.exit(0);
});
