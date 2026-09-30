// Sample data to seed the database
// Run in MongoDB shell or use MongoDB Atlas UI

const sampleProducts = [
  {
    name: "Premium Formal Gown",
    description: "Elegant black formal gown perfect for weddings and special occasions. Made with premium fabric with intricate embroidery.",
    price: 7999,
    originalPrice: 9999,
    category: "Formal Wear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy Blue", "Emerald Green"],
    images: [
      "https://images.unsplash.com/photo-1595895917930-dd5b1cc4c0b4?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1595777707802-1b0e4b0ce10e?w=800&h=1000&fit=crop"
    ],
    inStock: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 24
  },
  {
    name: "Casual Denim Dress",
    description: "Comfortable and stylish casual denim dress. Perfect for everyday wear with a modern twist.",
    price: 2499,
    originalPrice: 3499,
    category: "Casual Wear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    images: [
      "https://images.unsplash.com/photo-1515552726519-7a1fa2fb2e4d?w=800&h=1000&fit=crop"
    ],
    inStock: true,
    isNew: false,
    rating: 4.3,
    reviewCount: 18
  },
  {
    name: "Luxury Silk Dress",
    description: "Premium silk dress from our luxury collection. Handcrafted with finest quality silk and pearls.",
    price: 15999,
    originalPrice: 19999,
    category: "Luxury Collection",
    sizes: ["S", "M", "L"],
    colors: ["Gold", "Silver", "Rose Gold"],
    images: [
      "https://images.unsplash.com/photo-1595959316594-4e100b78aedd?w=800&h=1000&fit=crop"
    ],
    inStock: true,
    isNew: true,
    rating: 5,
    reviewCount: 8
  },
  {
    name: "Chiffon Maxi Dress",
    description: "Flowing chiffon maxi dress perfect for casual outings. Lightweight and breathable fabric.",
    price: 3999,
    originalPrice: 5499,
    category: "Casual Wear",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blush Pink", "Lavender", "White"],
    images: [
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=1000&fit=crop"
    ],
    inStock: true,
    isNew: true,
    rating: 4.6,
    reviewCount: 15
  },
  {
    name: "Party Wear Sequin Dress",
    description: "Glamorous sequin dress for parties and celebrations. Stunning full-body sequin design.",
    price: 6999,
    originalPrice: 9499,
    category: "Formal Wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gold", "Silver", "Rose Gold"],
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop"
    ],
    inStock: true,
    isNew: false,
    rating: 4.7,
    reviewCount: 22
  },
  {
    name: "Casual Cotton T-Shirt Dress",
    description: "Simple yet stylish cotton dress. Perfect for casual daily wear. Available in multiple colors.",
    price: 1999,
    originalPrice: 2799,
    category: "Casual Wear",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray", "Navy"],
    images: [
      "https://images.unsplash.com/photo-1503252947848-1c8d4f7c3f5a?w=800&h=1000&fit=crop"
    ],
    inStock: true,
    isNew: false,
    rating: 4.2,
    reviewCount: 31
  }
];

// MongoDB Insert Command
// db.products.insertMany(sampleProducts);
