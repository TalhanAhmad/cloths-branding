/**
 * Sample Products for LUXE Clothing Brand
 * This file contains sample product data to populate the database
 * 
 * Usage:
 * 1. Ensure MongoDB is running
 * 2. Update MONGODB_URL in .env
 * 3. Run: node server/seeds/sampleProducts.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('../models/Product');

const sampleProducts = [
  // ========== FORMAL WEAR ==========
  {
    name: 'Elegant Black Evening Gown',
    description: 'A stunning black evening gown perfect for formal events. Features elegant draping and sophisticated design.',
    price: 15999,
    originalPrice: 19999,
    category: 'Formal Wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy'],
    images: [
      'https://images.unsplash.com/photo-1566422814453-1556febcf7a0?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595777712802-6b2ecef04588?w=500&h=600&fit=crop'
    ],
    isNew: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 234
  },
  {
    name: 'Premium Silk Formal Saree',
    description: 'Luxurious silk formal saree with intricate embroidery. Perfect for weddings and celebrations.',
    price: 12999,
    originalPrice: 16999,
    category: 'Formal Wear',
    sizes: ['Free Size'],
    colors: ['Gold', 'Maroon', 'Deep Purple'],
    images: [
      'https://images.unsplash.com/photo-1562070503-6f91c5a8a17a?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1614613535308-eb5fbd8e2c58?w=500&h=600&fit=crop'
    ],
    isNew: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 189
  },
  {
    name: 'Classic White Formal Shirt',
    description: 'Timeless white formal shirt made from premium cotton. Perfect for both professional and formal events.',
    price: 4999,
    originalPrice: 6999,
    category: 'Formal Wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Cream'],
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1598886029697-4efd87e8cefd?w=500&h=600&fit=crop'
    ],
    isNew: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 456
  },
  {
    name: 'Designer Lehenga Choli',
    description: 'Exquisite designer lehenga choli with heavy embroidery. A statement piece for special occasions.',
    price: 18999,
    originalPrice: 24999,
    category: 'Formal Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Pink', 'Orange'],
    images: [
      'https://images.unsplash.com/photo-1606421927238-91abb5a3bcb3?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1617401132602-2f5b9f1c0b1e?w=500&h=600&fit=crop'
    ],
    isNew: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 312
  },

  // ========== CASUAL WEAR ==========
  {
    name: 'Comfortable Cotton T-Shirt',
    description: 'Soft and comfortable cotton t-shirt perfect for everyday wear. Available in multiple colors.',
    price: 1499,
    originalPrice: 2499,
    category: 'Casual Wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-ec6b89a42ec2?w=500&h=600&fit=crop'
    ],
    isNew: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 892
  },
  {
    name: 'Trendy Denim Jeans',
    description: 'Classic denim jeans with a modern fit. Perfect for casual outings and everyday style.',
    price: 3999,
    originalPrice: 5499,
    category: 'Casual Wear',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542272604-a5f36b9be001?w=500&h=600&fit=crop'
    ],
    isNew: false,
    inStock: true,
    rating: 4.5,
    reviewCount: 567
  },
  {
    name: 'Casual Summer Dress',
    description: 'Light and airy summer dress. Perfect for hot weather and casual occasions.',
    price: 2999,
    originalPrice: 4499,
    category: 'Casual Wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Floral', 'Pastel Pink', 'Light Blue'],
    images: [
      'https://images.unsplash.com/photo-1595607774223-ef52624120d2?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595607825220-c0da7fbef5e2?w=500&h=600&fit=crop'
    ],
    isNew: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 234
  },
  {
    name: 'Comfortable Hoodie',
    description: 'Cozy and comfortable hoodie perfect for casual wear and cold seasons.',
    price: 2499,
    originalPrice: 3999,
    category: 'Casual Wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray', 'Maroon'],
    images: [
      'https://images.unsplash.com/photo-1556821552-5f63b1c88f45?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516685038519-ce366d4646db?w=500&h=600&fit=crop'
    ],
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 445
  },

  // ========== LUXURY COLLECTION ==========
  {
    name: 'Silk Luxury Abaya',
    description: 'Luxurious silk abaya with intricate embroidery. Perfect for sophisticated occasions.',
    price: 24999,
    originalPrice: 32999,
    category: 'Luxury Collection',
    sizes: ['Free Size'],
    colors: ['Black', 'Navy', 'Maroon'],
    images: [
      'https://images.unsplash.com/photo-1559618254-5a1b3d7e9e2b?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=600&fit=crop'
    ],
    isNew: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 98
  },
  {
    name: 'Premium Designer Kurti',
    description: 'Handcrafted designer kurti with premium fabrics and exquisite detailing.',
    price: 8999,
    originalPrice: 12999,
    category: 'Luxury Collection',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Mustard', 'Emerald', 'Wine'],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1599643478519-e3ec0a37f86c?w=500&h=600&fit=crop'
    ],
    isNew: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 156
  },
  {
    name: 'Luxury Velvet Blazer',
    description: 'Premium velvet blazer with tailored fit. Perfect for luxury fashion enthusiasts.',
    price: 16999,
    originalPrice: 22999,
    category: 'Luxury Collection',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Burgundy', 'Deep Purple', 'Hunter Green'],
    images: [
      'https://images.unsplash.com/photo-1539533057440-7814a9d790ff?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539533114241-c578dd8f2014?w=500&h=600&fit=crop'
    ],
    isNew: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 123
  },
  {
    name: 'Cashmere Luxury Sweater',
    description: 'Ultra-soft cashmere sweater. The epitome of luxury and comfort.',
    price: 11999,
    originalPrice: 16999,
    category: 'Luxury Collection',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Camel', 'Charcoal'],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop',
      'https://images.unsplash.com/photo-1591195853827-11db59a44f7c?w=500&h=600&fit=crop'
    ],
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 87
  }
];

/**
 * Seed the database with sample products
 */
async function seedProducts() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clothing-brand';
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing products (optional - uncomment to clear)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✓ Successfully created ${createdProducts.length} products`);

    // Show summary
    const byCategory = {};
    createdProducts.forEach(product => {
      byCategory[product.category] = (byCategory[product.category] || 0) + 1;
    });

    console.log('\nProducts by category:');
    Object.entries(byCategory).forEach(([category, count]) => {
      console.log(`  • ${category}: ${count} products`);
    });

    console.log('\n✓ Sample products seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedProducts();
