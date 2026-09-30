/**
 * USER PRODUCT CONTROLLER
 * Read-only operations for customers
 */

// Get all products with filtering, pagination
const getProducts = async (req, res) => {
  try {
    // const { category, sortBy, page = 1, limit = 12, minPrice, maxPrice, search } = req.query;
    // const Product = require('../../models/Product');

    // let query = { isActive: true };

    // if (category) query.category = category;
    // if (search) query.name = { $regex: search, $options: 'i' };
    // if (minPrice || maxPrice) {
    //   query.price = {};
    //   if (minPrice) query.price.$gte = minPrice;
    //   if (maxPrice) query.price.$lte = maxPrice;
    // }

    // const products = await Product.find(query)
    //   .sort(sortBy === 'price' ? { price: 1 } : { createdAt: -1 })
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Products fetched',
      data: [],
      // pagination: { page, limit, total }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    // const { id } = req.params;
    // const Product = require('../../models/Product');

    // const product = await Product.findById(id);
    // if (!product) {
    //   return res.status(404).json({ success: false, message: 'Product not found' });
    // }

    res.status(200).json({
      success: true,
      message: 'Product fetched',
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search products
const searchProducts = async (req, res) => {
  try {
    // const { q } = req.query;
    // const Product = require('../../models/Product');

    // const products = await Product.find({
    //   $or: [
    //     { name: { $regex: q, $options: 'i' } },
    //     { description: { $regex: q, $options: 'i' } },
    //   ],
    //   isActive: true,
    // });

    res.status(200).json({
      success: true,
      message: 'Search results',
      data: [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  searchProducts,
};
