import React from 'react';
import { FaShoppingCart, FaUser, FaHeart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Header() {
  const { cart, user } = useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-black">
            LORA<span className="text-gold">.</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex gap-8 text-gray-700">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <Link to="/products" className="hover:text-gold transition">Shop</Link>
            <Link to="/about" className="hover:text-gold transition">About</Link>
            <Link to="/contact" className="hover:text-gold transition">Contact</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex gap-6 items-center">
            <button className="hover:text-gold transition">
              <FaSearch size={20} />
            </button>
            <Link to="/wishlist" className="hover:text-gold transition">
              <FaHeart size={20} />
            </Link>
            <Link to="/cart" className="relative hover:text-gold transition">
              <FaShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link to={user ? '/profile' : '/login'} className="hover:text-gold transition">
              <FaUser size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3 text-gray-700">
            <Link to="/" className="hover:text-gold">Home</Link>
            <Link to="/products" className="hover:text-gold">Shop</Link>
            <Link to="/about" className="hover:text-gold">About</Link>
            <Link to="/contact" className="hover:text-gold">Contact</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
