/**
 * ADMIN PRODUCT CONTROLLER
 * Create, Update, Delete operations (admin only)
 */

// Create new product
const createProduct = async (req, res) => {
  try {
    // const { name, price, images, category, description, sizes, colors } = req.body;
    // const Product = require('../../models/Product');

    // Validate required fields
    // if (!name || !price || !category) {
    //   return res.status(400).json({ success: false, message: 'Required fields missing' });
    // }

    // const product = new Product({
    //   name,
    //   price,
    //   images,
    //   category,
    //   description,
    //   sizes,
    //   colors,
    //   createdBy: req.user._id,
    // });

    // await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    // const { id } = req.params;
    // const updates = req.body;
    // const Product = require('../../models/Product');

    // const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    // if (!product) {
    //   return res.status(404).json({ success: false, message: 'Product not found' });
    // }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    // const { id } = req.params;
    // const Product = require('../../models/Product');

    // const product = await Product.findByIdAndDelete(id);
    // if (!product) {
    //   return res.status(404).json({ success: false, message: 'Product not found' });
    // }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Bulk upload products
const bulkUploadProducts = async (req, res) => {
  try {
    // const products = req.body; // Array of product objects
    // const Product = require('../../models/Product');

    // const result = await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: 'Products uploaded',
      count: 0,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUploadProducts,
};
