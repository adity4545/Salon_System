const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logOut,
  getUser,
  LoginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/userContraller");
const protect = require("../middleware/authMiddleware");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/authMiddleware');
const passport = require('passport');
require('../passport');

router.post("/register", registerUser);
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { email: user.email, role: user.role } });
});
router.get("/logout", logOut);
router.get("/user", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});
router.get("/loggedin", LoginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);

router.get('/google', (req, res, next) => {
  const redirectUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/callback';
  console.log('Google OAuth will redirect to:', redirectUrl);
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  const redirectUrl = `${process.env.FRONTEND_URL}/google-success?token=${token}&email=${req.user.email}&role=${req.user.role}`;
  console.log("Redirecting to:", redirectUrl);
  res.redirect(redirectUrl);
});

module.exports = router;
