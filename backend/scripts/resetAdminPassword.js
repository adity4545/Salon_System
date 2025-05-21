const mongoose = require('mongoose');
const User = require('../models/userModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/salon_management';

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const adminEmail = 'admin@salon.com';
    const newPassword = 'admin1234';
    const admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      console.log('Admin user not found!');
      process.exit(1);
    }
    admin.password = newPassword;
    await admin.save();
    console.log('Admin password reset successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error resetting admin password:', err);
    process.exit(1);
  }
};

resetAdminPassword(); 