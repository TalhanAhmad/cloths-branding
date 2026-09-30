import React, { useState, useEffect } from 'react';
import { productAPI, orderAPI } from '../utils/api';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Formal Wear',
    sizes: 'S,M,L,XL',
    colors: 'Black,White,Red',
    images: '',
    isNew: true
  });

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll({});
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        sizes: formData.sizes.split(',').map(s => s.trim()),
        colors: formData.colors.split(',').map(c => c.trim()),
        images: formData.images.split(',').map(i => i.trim())
      };

      if (editingId) {
        await productAPI.update(editingId, data);
        alert('Product updated successfully!');
      } else {
        await productAPI.create(data);
        alert('Product created successfully!');
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'Formal Wear',
      sizes: 'S,M,L,XL',
      colors: 'Black,White,Red',
      images: '',
      isNew: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      sizes: product.sizes.join(','),
      colors: product.colors.join(','),
      images: product.images.join(','),
      isNew: product.isNew
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await productAPI.delete(id);
        alert('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      await orderAPI.updateStatus(orderId, status);
      alert('Order status updated!');
      fetchOrders();
    } catch (error) {
      alert('Error updating order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'products'
                ? 'bg-gold text-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-gold text-black'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Orders
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="mb-6 bg-gold hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition"
            >
              <FaPlus /> Add Product
            </button>

            {/* Form */}
            {showForm && (
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Product Name"
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                    />
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                    >
                      <option>Formal Wear</option>
                      <option>Casual Wear</option>
                      <option>Luxury Collection</option>
                    </select>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      placeholder="Price (Rs.)"
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                    />
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="Original Price (optional)"
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                    />
                  </div>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Description"
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold resize-none"
                  />

                  <input
                    type="text"
                    name="sizes"
                    value={formData.sizes}
                    onChange={handleChange}
                    placeholder="Sizes (comma-separated: S,M,L,XL)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                  />

                  <input
                    type="text"
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    placeholder="Colors (comma-separated)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                  />

                  <input
                    type="text"
                    name="images"
                    value={formData.images}
                    onChange={handleChange}
                    placeholder="Image URLs (comma-separated)"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gold"
                  />

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>Mark as New Arrival</span>
                  </label>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gold hover:bg-yellow-400 text-black py-3 rounded-lg font-bold transition disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-3 rounded-lg font-bold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Product</th>
                    <th className="px-6 py-3 text-left font-semibold">Category</th>
                    <th className="px-6 py-3 text-left font-semibold">Price</th>
                    <th className="px-6 py-3 text-left font-semibold">Stock</th>
                    <th className="px-6 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0] || 'https://via.placeholder.com/50'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold">{product.name}</p>
                            {product.isNew && <span className="text-xs bg-gold px-2 py-1 rounded">NEW</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3">{product.category}</td>
                      <td className="px-6 py-3 font-semibold">Rs. {product.price}</td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          product.inStock
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Order ID</th>
                  <th className="px-6 py-3 text-left font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left font-semibold">Total</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 font-mono text-sm">{order._id.slice(-8)}</td>
                    <td className="px-6 py-3">{order.userId?.name || 'N/A'}</td>
                    <td className="px-6 py-3 font-semibold">Rs. {order.totalPrice}</td>
                    <td className="px-6 py-3">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
