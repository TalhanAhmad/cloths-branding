import React from 'react';
import { FaTruck, FaSync, FaCrown, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About LORA</h1>
          <p className="text-xl text-gray-300">
            Where Luxury Meets Simplicity. Crafted for Modern Women.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                LORA was founded with a simple mission: to bring premium fashion to every woman who deserves to feel confident and elegant.
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                Based in the heart of Peshawar at Mall of KPK, we started as a small boutique with big dreams. Today, we're proud to serve thousands of satisfied customers who trust us for quality, style, and exceptional service.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our commitment to excellence has made LORA a name synonymous with luxury, affordability, and customer satisfaction in Pakistan.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1496991620965-09c26e9cf81a?w=600&h=700&fit=crop"
                alt="LORA Store"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-lightBg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaCrown,
                title: "Premium Quality",
                description: "We never compromise on quality. Every piece is handpicked and inspected for excellence."
              },
              {
                icon: FaSync,
                title: "Customer First",
                description: "Your satisfaction is our priority. Easy exchanges, hassle-free returns, and 24/7 support."
              },
              {
                icon: FaTruck,
                title: "Fast Delivery",
                description: "Quick shipping across Pakistan. Same-day delivery available in Peshawar."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <value.icon className="text-5xl text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose LORA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Curated Collections", desc: "Handpicked pieces from trusted designers." },
              { title: "Affordable Luxury", desc: "Premium quality at reasonable prices." },
              { title: "Expert Staff", desc: "Knowledgeable team to help you find perfect fit." },
              { title: "30-Day Exchange", desc: "Change your mind within 30 days, no questions." },
              { title: "Authentic Products", desc: "100% genuine, no counterfeits ever." },
              { title: "Personal Styling", desc: "WhatsApp us for free styling advice." }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-lightBg rounded-lg">
                <div className="text-gold text-3xl">✓</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Meet the Team</h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            Passionate fashion enthusiasts dedicated to your style
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Fatima Khan", role: "Founder & Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
              { name: "Amna Ahmed", role: "Fashion Manager", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
              { name: "Zainab Hassan", role: "Customer Care", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-gold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-lightBg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5K+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "24/7", label: "Support" },
              { number: "100%", label: "Authentic" }
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-gold mb-2">{stat.number}</p>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Shop?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Discover our exclusive collections today
        </p>
        <a
          href="/products"
          className="inline-block bg-gold text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition"
        >
          Explore Collection
        </a>
      </section>
    </div>
  );
}
