import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../utils/api';
import { FaTruck, FaSync, FaCrown, FaWhatsapp } from 'react-icons/fa';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll({ isNew: true });
      setNewArrivals(response.data.slice(0, 6));
      const allResponse = await productAPI.getAll({});
      setProducts(allResponse.data.slice(0, 12));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-50">
          <img
            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=800&fit=crop"
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fadeIn">
            New Luxury Collection <span className="text-gold">2026</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Elegance meets modernity. Discover premium clothing for modern women.
          </p>
          <Link
            to="/products"
            className="inline-block bg-gold text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition transform hover:scale-105"
          >
            👗 Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Formal Wear', 'Casual Wear', 'Luxury Collection'].map((category, i) => (
              <Link
                key={i}
                to={`/products?category=${category}`}
                className="group relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={[
                    'https://images.unsplash.com/photo-1595777707802-1b0e4b0ce10e?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515552726519-7a1fa2fb2e4d?w=600&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1595959316594-4e100b78aedd?w=600&h=400&fit=crop'
                  ][i]}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition flex items-center justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-lightBg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">New Arrivals</h2>
            <Link to="/products" className="text-gold hover:text-black transition font-semibold">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaTruck, title: 'Fast Delivery', desc: 'Same day delivery available in Peshawar' },
              { icon: FaSync, title: 'Easy Exchange', desc: '30-day hassle-free exchange policy' },
              { icon: FaCrown, title: 'Premium Quality', desc: 'Handpicked luxury collections' }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-lg bg-lightBg hover:bg-gold hover:bg-opacity-20 transition">
                <item.icon className="text-5xl text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Style Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Customer Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group">
                <img
                  src={`https://images.unsplash.com/photo-159${500 + i}?w=400&h=400&fit=crop`}
                  alt={`Customer ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
        <p className="text-xl mb-8 text-gray-300">
          Chat with us on WhatsApp for instant support and personalized styling advice
        </p>
        <a
          href="https://wa.me/923001234567"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
        >
          <FaWhatsapp size={24} />
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
}
