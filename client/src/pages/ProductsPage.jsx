import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import { FaFilter, FaSync, FaSearch } from 'react-icons/fa';

const COLLECTIONS = [
  {
    id: 'all',
    name: 'All Products',
    description: 'Browse our complete collection',
    filter: ''
  },
  {
    id: 'formal',
    name: 'Formal Wear',
    description: 'Elegant pieces for special occasions',
    filter: 'Formal Wear'
  },
  {
    id: 'casual',
    name: 'Casual Wear',
    description: 'Comfortable everyday styles',
    filter: 'Casual Wear'
  },
  {
    id: 'luxury',
    name: 'Luxury Collection',
    description: 'Premium and exclusive designs',
    filter: 'Luxury Collection'
  }
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAll(filters);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectionClick = (collectionId) => {
    setSelectedCollection(collectionId);
    const collection = COLLECTIONS.find(c => c.id === collectionId);
    setFilters(prev => ({
      ...prev,
      category: collection.filter
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-2">Shop Our Collection</h1>
          <p className="text-gray-300 text-lg">
            Discover our exclusive selection of premium clothing
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Collections Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-black">Browse Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {COLLECTIONS.map(collection => (
              <div
                key={collection.id}
                onClick={() => handleCollectionClick(collection.id)}
                className={`cursor-pointer rounded-lg overflow-hidden transition transform hover:scale-105 shadow-md hover:shadow-lg ${
                  selectedCollection === collection.id ? 'ring-2 ring-gold' : ''
                }`}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white text-center hover:from-gold hover:to-yellow-600 transition h-40 flex flex-col justify-center items-center">
                  <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                  <p className="text-sm text-gray-300">{collection.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg h-fit shadow-md sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <FaFilter className="text-gold" />
              <h3 className="font-bold text-lg">Filters</h3>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Search Products</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gold text-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gold text-sm"
              >
                <option value="">All Categories</option>
                <option value="Formal Wear">Formal Wear</option>
                <option value="Casual Wear">Casual Wear</option>
                <option value="Luxury Collection">Luxury Collection</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Price Range (Rs.)</label>
              <div className="space-y-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gold text-sm"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gold text-sm"
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '', search: '' })}
              className="w-full bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2 text-sm"
            >
              <FaSync size={14} />
              Reset Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block">
                  <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 font-semibold">Loading products...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-red-50 rounded-lg">
                <p className="text-red-600 font-semibold mb-4">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Try Again
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg">
                <p className="text-gray-600 mb-2 text-lg font-semibold">No products found</p>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => setFilters({ category: '', minPrice: '', maxPrice: '', search: '' })}
                  className="bg-gold hover:bg-yellow-400 text-black px-6 py-2 rounded-lg transition font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600 font-semibold">
                    Showing <span className="text-gold">{products.length}</span> products
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
