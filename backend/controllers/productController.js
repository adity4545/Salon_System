const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const { response } = require("express");
const cloudinary = require("cloudinary").v2;

//----------------------Create Product--------------------
const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  // validation
  if (!name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedfile;
    try {
      uploadedfile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Pinvent App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("image Could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedfile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // create product

  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    let products;
    if (req.user && req.user.id) {
      // If user is authenticated, fetch products for the user
      products = await Product.find({ user: req.user.id }).sort("-createdAt");
    } else {
      // If user is not authenticated, fetch all products (without user filter)
      products = await Product.find().sort("-createdAt");
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});



const getProduct = asyncHandler(async (req, res) => {
  let productQuery;
  
  // Check if a product ID is provided in the request
  if (req.params.id) {
    productQuery = { _id: req.params.id };
  } else {
    // If no product ID is provided, you can customize how you fetch the product
    // For example, you might fetch the first product or any other criteria you want
    productQuery = {}; // Customize this query as needed
  }

  try {
    const product = await Product.findOne(productQuery);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



// ---------------------Delete Product----------------
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  // if product doesn't exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match product to its user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await product.deleteOne();
  res.status(200).json({ message: "Product deleted." });
});

//-----------Update Product-------------------

const updateProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, description } = req.body;
    const productId = req.params.id;

    if (!productId) {
      throw new Error("Product ID is missing");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        category,
        quantity,
        price,
        description,
      },
      {
        new: true, // Return the updated product
        runValidators: true, // Run validation on update
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
