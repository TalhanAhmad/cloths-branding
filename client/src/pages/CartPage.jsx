import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaWhatsapp, FaArrowLeft, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import { orderAPI } from '../utils/api';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const shippingCost = calculateSubtotal() > 5000 ? 0 : 300;
  const tax = calculateSubtotal() * 0.17; // 17% tax for Pakistan
  const total = calculateSubtotal() + tax + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async (method) => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      // Create order in backend
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        products: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          size: item.selectedSize || 'One Size',
          color: item.selectedColor || 'Default'
        })),
        totalPrice: total,
        paymentMethod: method,
        orderStatus: 'Pending'
      };

      // Call backend API to save order
      const response = await orderAPI.create(orderData);

      if (response.data.success || response.status === 201) {
        // If WhatsApp, send order details
        if (method === 'WhatsApp') {
          const cartSummary = cart.map(item => 
            `${item.name} (${item.selectedSize || 'One Size'}) x${item.quantity || 1}`
          ).join('\n');
          
          const message = `*Order Confirmation*\n\nCustomer: ${formData.name}\nPhone: ${formData.phone}\n\n*Items:*\n${cartSummary}\n\n*Subtotal:* Rs. ${calculateSubtotal().toLocaleString()}\n*Tax (17%):* Rs. ${tax.toFixed(0).toLocaleString()}\n*Shipping:* Rs. ${shippingCost.toLocaleString()}\n*TOTAL:* Rs. ${total.toFixed(0).toLocaleString()}\n\n*Address:* ${formData.address}, ${formData.city}, ${formData.zipCode}\n\nPlease confirm this order.`;
          
          window.open(`https://wa.me/923001234567?text=${encodeURIComponent(message)}`, '_blank');
        }

        setOrderPlaced(true);
        clearCart();
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed!</h1>
            <p className="text-gray-600 mb-2">Thank you for your order.</p>
            <p className="text-gray-600 mb-6">We'll contact you soon to confirm delivery details.</p>
            <Link 
              to="/"
              className="inline-block bg-gold hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-gold hover:text-yellow-500 font-semibold mb-6 transition"
        >
          <FaArrowLeft /> Back to Shopping
        </button>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart & Checkout</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-md">
            <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
            <Link to="/shop" className="inline-block text-gold hover:text-yellow-500 font-bold text-lg">
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items and Checkout Form */}
            <div className="lg:col-span-2">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Order Items</h2>
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item._id} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <img
                        src={item.images?.[0] || 'https://via.placeholder.com/120'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.category}</p>
                        <p className="text-sm text-gray-700 mt-1">
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && ' • '}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <p className="font-bold">Rs. {(item.price * (item.quantity || 1)).toLocaleString()}</p>
                        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                            className="px-2 py-1 hover:bg-gray-100 transition"
                          >
                            −
                          </button>
                          <span className="px-2 font-semibold">{item.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                            className="px-2 py-1 hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 3XX XXXXXXX"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Karachi"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2">Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address, apartment, etc."
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="75000"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Payment Method</label>
                    <div className="space-y-2">
                      {['COD', 'WhatsApp', 'Bank Transfer'].map(method => (
                        <label key={method} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gold hover:bg-opacity-10 transition">
                          <input
                            type="radio"
                            value={method}
                            checked={paymentMethod === method}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4"
                          />
                          <span className="font-semibold">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">Rs. {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (17%)</span>
                    <span className="font-semibold">Rs. {tax.toFixed(0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shippingCost === 0 ? 'font-semibold text-green-600' : 'font-semibold'}>
                      {shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold mb-6 text-gold">
                  <span>Total</span>
                  <span>Rs. {total.toFixed(0).toLocaleString()}</span>
                </div>

                <div className="space-y-3">
                  {paymentMethod === 'WhatsApp' ? (
                    <button
                      onClick={() => handleCheckout('WhatsApp')}
                      disabled={loading}
                      className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                    >
                      <FaWhatsapp size={18} />
                      {loading ? 'Processing...' : 'Order on WhatsApp'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCheckout(paymentMethod)}
                      disabled={loading}
                      className="w-full bg-gold hover:bg-yellow-500 disabled:bg-gray-400 text-black py-3 rounded-lg font-bold transition"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-600 text-center mt-4">
                  Free shipping on orders above Rs. 5,000
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
