import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300">
            We'd love to hear from you. Get in touch with us today!
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {/* Address */}
            <div className="text-center p-6 bg-lightBg rounded-lg hover:shadow-lg transition">
              <FaMapMarkerAlt className="text-4xl text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Address</h3>
              <p className="text-gray-600">
                Mall of KPK<br />
                Peshawar, Pakistan<br />
                <span className="text-sm">Shop #45</span>
              </p>
            </div>

            {/* Phone */}
            <div className="text-center p-6 bg-lightBg rounded-lg hover:shadow-lg transition">
              <FaPhone className="text-4xl text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Phone</h3>
              <p className="text-gray-600">
                <a href="tel:+923001234567" className="hover:text-gold transition">
                  +92 300 1234567
                </a>
                <br />
                <a href="tel:+923001234568" className="text-sm hover:text-gold transition">
                  +92 300 1234568
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="text-center p-6 bg-lightBg rounded-lg hover:shadow-lg transition">
              <FaEnvelope className="text-4xl text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Email</h3>
              <p className="text-gray-600">
                <a href="mailto:info@lora.pk" className="hover:text-gold transition">
                  info@lora.pk
                </a>
                <br />
                <a href="mailto:orders@lora.pk" className="text-sm hover:text-gold transition">
                  orders@lora.pk
                </a>
              </p>
            </div>

            {/* Hours */}
            <div className="text-center p-6 bg-lightBg rounded-lg hover:shadow-lg transition">
              <FaClock className="text-4xl text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Hours</h3>
              <p className="text-gray-600">
                Mon - Sat: 10 AM - 10 PM<br />
                Sunday: 12 PM - 8 PM<br />
                <span className="text-sm">WhatsApp 24/7</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your phone"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                    rows="5"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-yellow-400 text-black py-3 rounded-lg font-bold transition"
                >
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Quick Contact */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Quick Contact</h2>
              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 hover:shadow-lg transition">
                  <div className="flex items-center gap-4">
                    <FaWhatsapp className="text-4xl text-green-500" />
                    <div>
                      <h3 className="font-bold text-lg">Chat on WhatsApp</h3>
                      <p className="text-gray-600 mb-3">Instant replies for orders</p>
                      <a
                        href="https://wa.me/923001234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                      >
                        Open WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-lightBg rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    <details className="cursor-pointer">
                      <summary className="font-semibold hover:text-gold">Do you offer international shipping?</summary>
                      <p className="text-gray-600 mt-2">Currently, we ship across Pakistan only.</p>
                    </details>
                    <details className="cursor-pointer">
                      <summary className="font-semibold hover:text-gold">What is your exchange policy?</summary>
                      <p className="text-gray-600 mt-2">30-day hassle-free exchange for any reason.</p>
                    </details>
                    <details className="cursor-pointer">
                      <summary className="font-semibold hover:text-gold">How long does delivery take?</summary>
                      <p className="text-gray-600 mt-2">Same-day in Peshawar, 2-3 days for other cities.</p>
                    </details>
                    <details className="cursor-pointer">
                      <summary className="font-semibold hover:text-gold">Do you have brick-and-mortar store?</summary>
                      <p className="text-gray-600 mt-2">Yes! Visit us at Mall of KPK, Peshawar.</p>
                    </details>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-black text-white rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com/lorapakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition"
                    >
                      <FaFacebook size={24} />
                    </a>
                    <a
                      href="https://instagram.com/lorapakistan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition"
                    >
                      <FaInstagram size={24} />
                    </a>
                    <a
                      href="https://wa.me/923001234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition"
                    >
                      <FaWhatsapp size={24} />
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    Follow us for latest collections, offers, and fashion tips!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-lightBg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Visit Our Store</h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-6xl text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Mall of KPK, Peshawar<br />
                <span className="text-sm">Embed Google Maps or similar</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
