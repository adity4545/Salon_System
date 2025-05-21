const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/salon_management';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const adminEmail = 'admin@salon.com';
    const adminPassword = 'admin1234';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = new User({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        photo: 'https://ibb.co/b3FSQ52',
        phone: '',
        bio: 'Admin user',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created:', adminEmail);
    } else {
      console.log('Admin user already exists:', adminEmail);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin user:', err);
    process.exit(1);
  }
};

seedAdmin(); 