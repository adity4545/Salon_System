const mongoose = require('mongoose');
const Service = require('../models/serviceModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/salon_management';

const sampleServices = [
  {
    s_name: 'Hair Cut',
    s_desc: 'Professional hair cutting and styling for men and women.',
    s_duration: '30 min',
    s_price: '1000',
  },
  {
    s_name: 'Hair Color',
    s_desc: 'Vibrant hair coloring and highlights by expert stylists.',
    s_duration: '1 hour',
    s_price: '2500',
  },
  {
    s_name: 'Facial',
    s_desc: 'Relaxing facial treatments for glowing skin.',
    s_duration: '45 min',
    s_price: '2000',
  },
  {
    s_name: 'Manicure & Pedicure',
    s_desc: 'Pamper your hands and feet with our manicure and pedicure services.',
    s_duration: '1 hour',
    s_price: '1800',
  },
  {
    s_name: 'Makeup',
    s_desc: 'Professional makeup for all occasions.',
    s_duration: '1 hour',
    s_price: '3000',
  },
];

const seedServices = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Service.deleteMany({});
    await Service.insertMany(sampleServices);
    console.log('Sample services seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding services:', err);
    process.exit(1);
  }
};

seedServices(); 