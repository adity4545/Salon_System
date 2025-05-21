const mongoose = require('mongoose');
const Product = require('../models/productModel');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Professional Hair Dryer",
    category: "Hair Tools",
    quantity: "10",
    price: "2999",
    description: "High-quality professional hair dryer with multiple heat settings and cool shot button. Perfect for salon use.",
    image: {
      fileName: "hair-dryer.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "100KB"
    }
  },
  {
    name: "Salon Styling Chair",
    category: "Furniture",
    quantity: "5",
    price: "12999",
    description: "Comfortable and durable salon styling chair with hydraulic lift and 360-degree rotation.",
    image: {
      fileName: "styling-chair.jpg",
      filePath: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "120KB"
    }
  },
  {
    name: "Professional Hair Color Kit",
    category: "Hair Color",
    quantity: "20",
    price: "2499",
    description: "Complete hair coloring kit with developer, color, gloves, and application tools.",
    image: {
      fileName: "hair-color-kit.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "90KB"
    }
  },
  {
    name: "Salon Shampoo",
    category: "Hair Care",
    quantity: "30",
    price: "799",
    description: "Professional salon shampoo for all hair types. Sulfate-free formula with natural ingredients.",
    image: {
      fileName: "shampoo.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "80KB"
    }
  },
  {
    name: "Professional Scissors Set",
    category: "Tools",
    quantity: "15",
    price: "3999",
    description: "High-quality professional hair cutting scissors set with case and maintenance tools.",
    image: {
      fileName: "scissors-set.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "95KB"
    }
  },
  {
    name: "Professional Hair Straightener",
    category: "Hair Tools",
    quantity: "8",
    price: "3499",
    description: "Advanced ceramic hair straightener with adjustable temperature settings and quick heat-up time.",
    image: {
      fileName: "straightener.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "85KB"
    }
  },
  {
    name: "Salon Wash Basin",
    category: "Furniture",
    quantity: "3",
    price: "15999",
    description: "Professional salon wash basin with comfortable neck support and adjustable height.",
    image: {
      fileName: "wash-basin.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "110KB"
    }
  },
  {
    name: "Hair Treatment Kit",
    category: "Hair Care",
    quantity: "25",
    price: "1999",
    description: "Complete hair treatment kit with deep conditioning mask, serum, and heat protectant.",
    image: {
      fileName: "treatment-kit.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "95KB"
    }
  },
  {
    name: "Professional Curling Iron Set",
    category: "Hair Tools",
    quantity: "12",
    price: "4499",
    description: "Set of 3 professional curling irons with different barrel sizes for versatile styling options.",
    image: {
      fileName: "curling-iron.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "105KB"
    }
  },
  {
    name: "Salon Trolley",
    category: "Furniture",
    quantity: "6",
    price: "8999",
    description: "Mobile salon trolley with multiple drawers and compartments for organized storage.",
    image: {
      fileName: "trolley.jpg",
      filePath: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      fileType: "image/jpeg",
      fileSize: "115KB"
    }
  }
];

const addSampleProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/salon_management");
    console.log("Connected to MongoDB");

    // Add sample products
    for (const product of sampleProducts) {
      const newProduct = new Product({
        ...product,
        user: "65f7c7b9c4b8a3d2e1f0c8b9", // Replace with a valid user ID from your database
        sku: `${product.category.slice(0, 3).toUpperCase()}-${Date.now()}`,
      });
      await newProduct.save();
      console.log(`Added product: ${product.name}`);
    }

    console.log("All sample products added successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error adding sample products:", error);
    process.exit(1);
  }
};

addSampleProducts(); 