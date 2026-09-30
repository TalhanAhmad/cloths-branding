import React, { useState } from 'react';
import { FaEye, FaHeart, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();
  const [showQuickView, setShowQuickView] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: selectedSize || (product.sizes?.[0] || 'One Size'),
      selectedColor: selectedColor || (product.colors?.[0] || 'Default')
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const sizeInfo = selectedSize ? ` (Size: ${selectedSize})` : '';
    const colorInfo = selectedColor ? ` (Color: ${selectedColor})` : '';
    const message = `Hi, I'm interested in: ${product.name}${sizeInfo}${colorInfo}\nPrice: Rs. ${product.price}`;
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 h-80">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300x400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </span>
        )}

        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => setShowQuickView(true)}
            className="bg-white p-3 rounded-full hover:bg-gold transition shadow-lg"
            title="Quick View"
          >
            <FaEye className="text-black" size={18} />
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="bg-white p-3 rounded-full hover:bg-gold transition shadow-lg"
            title="Add to Wishlist"
          >
            <FaHeart className={isWishlisted ? 'text-red-500' : 'text-black'} size={18} />
          </button>
          <button
            onClick={handleAddToCart}
            className={`p-3 rounded-full transition shadow-lg flex items-center justify-center ${
              isAdded ? 'bg-green-500' : 'bg-gold hover:bg-yellow-400'
            }`}
            title="Add to Cart"
          >
            {isAdded ? <FaCheck className="text-white" /> : <FaShoppingCart className="text-black" />}
          </button>
        </div>

        {isAdded && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-90 flex items-center justify-center">
            <div className="text-center text-white">
              <FaCheck size={40} className="mx-auto mb-2" />
              <p className="font-bold">Added to Cart!</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-black mb-1 line-clamp-2 h-10">{product.name}</h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-1">{product.category}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-gold text-sm">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(product.rating || 4) ? 'text-gold' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-gray-600 text-xs">({product.reviewCount || 12})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-black">Rs. {product.price?.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">
              Rs. {product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition font-semibold text-sm ${
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-gold hover:bg-yellow-500 text-black'
            }`}
          >
            <FaShoppingCart size={14} />
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition font-semibold text-sm"
          >
            Order on WhatsApp
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-96 overflow-y-auto">
            <button
              onClick={() => setShowQuickView(false)}
              className="float-right text-2xl text-gray-500 hover:text-black transition"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 clear-right">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/300x400'}
                alt={product.name}
                className="w-full rounded-lg object-cover h-64"
              />
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <p className="text-3xl font-bold text-gold mb-4">Rs. {product.price?.toLocaleString()}</p>
                
                <div className="space-y-3 mb-4">
                  {product.sizes && product.sizes.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-2"><strong>Available Sizes:</strong></p>
                      <div className="flex gap-2 flex-wrap">
                        {product.sizes.map((size, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-1 rounded border transition ${
                              selectedSize === size
                                ? 'bg-gold text-black border-gold'
                                : 'bg-white text-black border-gray-300 hover:border-gold'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.colors && product.colors.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold mb-2"><strong>Available Colors:</strong></p>
                      <div className="flex gap-2 flex-wrap">
                        {product.colors.map((color, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1 rounded border transition ${
                              selectedColor === color
                                ? 'bg-gold text-black border-gold'
                                : 'bg-white text-black border-gray-300 hover:border-gold'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleAddToCart();
                      setTimeout(() => setShowQuickView(false), 500);
                    }}
                    className="w-full bg-gold hover:bg-yellow-500 text-black py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition font-semibold"
                  >
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
