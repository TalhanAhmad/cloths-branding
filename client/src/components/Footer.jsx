import React from 'react';
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">LORA<span className="text-gold">.</span></h3>
            <p className="text-gray-400">Luxury clothing for modern women.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gold">Formal Wear</a></li>
              <li><a href="#" className="hover:text-gold">Casual Wear</a></li>
              <li><a href="#" className="hover:text-gold">Luxury Collection</a></li>
              <li><a href="#" className="hover:text-gold">Sale</a></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-4">Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gold">About Us</a></li>
              <li><a href="#" className="hover:text-gold">Exchange Policy</a></li>
              <li><a href="#" className="hover:text-gold">Shipping Info</a></li>
              <li><a href="#" className="hover:text-gold">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gold" />
                <span className="text-gray-400">Mall of KPK, Peshawar</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gold" />
                <span className="text-gray-400">+92 XXX XXXXXXX</span>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="https://wa.me/923001234567" className="text-gold hover:text-white transition">
                  <FaWhatsapp size={24} />
                </a>
                <a href="#" className="text-gold hover:text-white transition">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-gold hover:text-white transition">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom */}
        <div className="flex justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2026 LORA. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

hello
hello